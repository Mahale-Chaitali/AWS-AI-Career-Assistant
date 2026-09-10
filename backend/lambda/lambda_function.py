"""
AWS AI Career Assistant - Lambda Function (Part 2)
---------------------------------------------------
This is the backend entry point that will be triggered by Amazon API Gateway.
It accepts a student's profile information, validates it, and returns a
success response. Future versions will add DynamoDB, Bedrock (AI), S3, etc.

Runtime: Python 3.12 (compatible with 3.9+, 3.10, 3.11)
Dependencies: Only Python standard library (no external packages needed yet)
Handler (in Lambda console): lambda_function.lambda_handler
"""

import json
import logging

# ------------------------------------------------------------------
# Logging setup
# ------------------------------------------------------------------
# AWS Lambda automatically sends logs to CloudWatch. Using the
# standard `logging` module makes them searchable and structured.
logger = logging.getLogger()
logger.setLevel(logging.INFO)


# ------------------------------------------------------------------
# CORS headers (needed so the React frontend can call API Gateway)
# ------------------------------------------------------------------
# When the frontend (localhost:3000 or a deployed domain) makes a
# request to API Gateway, the browser enforces CORS. These headers
# tell the browser the request is allowed. For production you should
# restrict Access-Control-Allow-Origin to your real frontend domain.
CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
}


# ------------------------------------------------------------------
# List of fields that the student profile must contain
# ------------------------------------------------------------------
REQUIRED_FIELDS = [
    "name",
    "education",
    "branch",
    "skills",
    "interests",
    "target_job_role",
]

# Fields that must be lists (arrays) of strings
LIST_FIELDS = ["skills", "interests"]

# Fields that must be plain strings
STRING_FIELDS = ["name", "education", "branch", "target_job_role"]


# ==================================================================
# 1. Helpers
# ==================================================================
def _build_response(status_code: int, body: dict) -> dict:
    """
    Build a standard Lambda proxy integration response for API Gateway.

    NOTE: API Gateway expects `body` to be a JSON-encoded string,
          not a Python dict. That's why we use json.dumps() here.
    """
    return {
        "statusCode": status_code,
        "headers": CORS_HEADERS,
        "body": json.dumps(body, default=str),
    }


def _parse_event_body(event: dict) -> dict:
    """
    Extract and decode the JSON body from the incoming API Gateway event.

    API Gateway can send the body as a plain string OR base64 encoded,
    depending on configuration. This helper handles both cases.
    """
    body = event.get("body", "{}")

    # If the body is already a dict (e.g. when testing with the Lambda
    # console "Test" tab using a raw JSON payload), return it directly.
    if isinstance(body, dict):
        return body

    # If API Gateway says it's base64 encoded, decode it first.
    if event.get("isBase64Encoded"):
        import base64

        try:
            body = base64.b64decode(body).decode("utf-8")
        except Exception as exc:
            raise ValueError(f"Failed to decode base64 body: {exc}")

    # Parse the JSON string into a Python dict
    try:
        return json.loads(body) if body else {}
    except json.JSONDecodeError as exc:
        raise ValueError(f"Invalid JSON payload: {exc.msg} (line {exc.lineno}, col {exc.colno})")


def _validate_student_data(data: dict) -> list:
    """
    Validate the student profile payload.

    Returns a list of human-readable error messages. An empty list
    means "everything is valid".
    """
    errors = []

    # --- Missing required fields? ---
    for field in REQUIRED_FIELDS:
        if field not in data or data[field] is None:
            errors.append(f"Missing required field: '{field}'")

    # Skip deeper checks if required keys aren't even present.
    # We only validate the fields that DO exist so we can surface
    # all problems in one response instead of one at a time.
    for field in STRING_FIELDS:
        value = data.get(field)
        if value is None:
            continue  # already reported above
        if not isinstance(value, str):
            errors.append(f"Field '{field}' must be a string (got {type(value).__name__}).")
        elif not value.strip():
            errors.append(f"Field '{field}' cannot be empty or blank.")

    for field in LIST_FIELDS:
        value = data.get(field)
        if value is None:
            continue  # already reported above
        if not isinstance(value, list):
            errors.append(f"Field '{field}' must be an array (list) of strings (got {type(value).__name__}).")
            continue
        if len(value) == 0:
            errors.append(f"Field '{field}' cannot be empty. Please provide at least one item.")
            continue
        for idx, item in enumerate(value):
            if not isinstance(item, str):
                errors.append(
                    f"Field '{field}' item #{idx + 1} must be a string "
                    f"(got {type(item).__name__})."
                )
            elif not item.strip():
                errors.append(f"Field '{field}' item #{idx + 1} cannot be blank.")

    return errors


# ==================================================================
# 2. HTTP Verb handlers
# ==================================================================
def _handle_preflight() -> dict:
    """
    Respond to CORS preflight (OPTIONS) request.

    Browsers send an OPTIONS request *before* the real POST when the
    frontend and API are on different origins. We just need to echo
    back the CORS headers with a 200.
    """
    return _build_response(200, {"message": "CORS preflight OK"})


def _handle_post(event: dict) -> dict:
    """
    Process POST /student-profile (or whatever route API Gateway uses).
    """
    # ----- Step 1: Parse the JSON body -----
    try:
        student_data = _parse_event_body(event)
    except ValueError as exc:
        logger.warning("Bad request - parse failure: %s", exc)
        return _build_response(400, {
            "success": False,
            "message": str(exc),
            "data": None,
        })

    logger.info("Received student profile keys: %s", list(student_data.keys()))

    # ----- Step 2: Validate fields -----
    validation_errors = _validate_student_data(student_data)
    if validation_errors:
        logger.warning("Validation failed: %s", validation_errors)
        return _build_response(400, {
            "success": False,
            "message": "Validation failed. Please fix the errors and try again.",
            "errors": validation_errors,
            "data": None,
        })

    # ----- Step 3: Success response -----
    # (In a later step we'll save to DynamoDB, call Bedrock AI, etc.)
    response_body = {
        "success": True,
        "message": "Student profile received successfully",
        "data": {
            "name": student_data["name"],
            "target_job_role": student_data["target_job_role"],
        },
    }

    logger.info(
        "Profile accepted for student=%s target_role=%s",
        student_data["name"],
        student_data["target_job_role"],
    )

    return _build_response(200, response_body)


def _handle_method_not_allowed(method: str) -> dict:
    """Return a 405 for any HTTP verb we don't support."""
    return _build_response(405, {
        "success": False,
        "message": f"HTTP method '{method}' is not allowed on this endpoint.",
        "allowed_methods": ["OPTIONS", "POST"],
        "data": None,
    })


# ==================================================================
# 3. Lambda entry point
# ==================================================================
def lambda_handler(event: dict, context) -> dict:
    """
    AWS Lambda handler.

    Parameters
    ----------
    event : dict
        The event payload from Amazon API Gateway (Lambda Proxy
        integration format). Includes keys like `httpMethod`,
        `headers`, `body`, `queryStringParameters`, etc.
    context : LambdaContext
        Runtime metadata (request ID, timeout, etc.). We don't use it
        in this version but it must remain in the signature.

    Returns
    -------
    dict
        A Lambda proxy response with `statusCode`, `headers`, `body`.
    """
    method = None
    try:
        # --- Extract HTTP method (works for API Gateway REST & HTTP APIs) ---
        method = (
            event.get("httpMethod")
            or event.get("requestContext", {}).get("http", {}).get("method")
            or "GET"
        ).upper()

        logger.info("Incoming request: method=%s requestId=%s",
                    method, getattr(context, "aws_request_id", "unknown"))

        # --- Route by method ---
        if method == "OPTIONS":
            return _handle_preflight()

        if method == "POST":
            return _handle_post(event)

        return _handle_method_not_allowed(method)

    # ------------------------------------------------------------------
    # Safety net: catch anything that slipped through and log it,
    # but NEVER leak stack traces to the frontend.
    # ------------------------------------------------------------------
    except Exception as exc:  # pragma: no cover - defensive only
        logger.exception(
            "Unhandled error during request method=%s: %s",
            method,
            exc,
        )
        return _build_response(500, {
            "success": False,
            "message": (
                "An unexpected error occurred on the server. "
                "Please try again later or contact support."
            ),
            "data": None,
        })

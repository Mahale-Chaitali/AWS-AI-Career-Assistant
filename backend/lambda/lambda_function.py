"""
AWS AI Career Assistant - Lambda Function
DynamoDB + Amazon Bedrock Nova Lite Integration

Runtime: Python 3.12
Handler: lambda_function.lambda_handler
"""

import json
import logging
import uuid
import base64
from datetime import datetime, timezone

import boto3
from botocore.config import Config


# ------------------------------------------------------------------
# Logging setup
# ------------------------------------------------------------------

logger = logging.getLogger()
logger.setLevel(logging.INFO)


# ------------------------------------------------------------------
# DynamoDB setup
# ------------------------------------------------------------------

TABLE_NAME = "StudentProfiles"

dynamodb = boto3.resource("dynamodb")
student_table = dynamodb.Table(TABLE_NAME)


# ------------------------------------------------------------------
# Amazon Bedrock setup
# ------------------------------------------------------------------

BEDROCK_REGION = "ap-south-1"

# Nova Lite through the APAC geographic cross-region inference profile
BEDROCK_MODEL_ID = "apac.amazon.nova-lite-v1:0"

# AWS recommends increasing the SDK read timeout for Nova inference.
bedrock_config = Config(
    connect_timeout=10,
    read_timeout=3600,
    retries={
        "max_attempts": 3,
        "mode": "standard",
    },
)

bedrock_runtime = boto3.client(
    "bedrock-runtime",
    region_name=BEDROCK_REGION,
    config=bedrock_config,
)


# ------------------------------------------------------------------
# CORS headers
# ------------------------------------------------------------------

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": (
        "Content-Type,Authorization,X-Amz-Date,X-Api-Key,"
        "X-Amz-Security-Token"
    ),
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
}


# ------------------------------------------------------------------
# Required student profile fields
# ------------------------------------------------------------------

REQUIRED_FIELDS = [
    "name",
    "education",
    "branch",
    "skills",
    "interests",
    "target_job_role",
]


LIST_FIELDS = [
    "skills",
    "interests",
]


STRING_FIELDS = [
    "name",
    "education",
    "branch",
    "target_job_role",
]


# ==================================================================
# 1. Response helper
# ==================================================================

def _build_response(status_code: int, body: dict) -> dict:
    """
    Build a standard Lambda proxy response for API Gateway.
    """

    return {
        "statusCode": status_code,
        "headers": CORS_HEADERS,
        "body": json.dumps(body, default=str),
    }


# ==================================================================
# 2. Parse request body
# ==================================================================

def _parse_event_body(event: dict) -> dict:
    """
    Extract and decode JSON body from API Gateway event.
    """

    body = event.get("body", "{}")

    # Lambda console test may provide a dictionary directly
    if isinstance(body, dict):
        return body

    # Decode base64 body if required
    if event.get("isBase64Encoded"):
        try:
            body = base64.b64decode(body).decode("utf-8")
        except Exception as exc:
            raise ValueError(
                f"Failed to decode base64 body: {exc}"
            )

    # Parse JSON
    try:
        return json.loads(body) if body else {}
    except json.JSONDecodeError as exc:
        raise ValueError(
            f"Invalid JSON payload: {exc.msg} "
            f"(line {exc.lineno}, col {exc.colno})"
        )


# ==================================================================
# 3. Validate student profile
# ==================================================================

def _validate_student_data(data: dict) -> list:
    """
    Validate the student profile payload.

    Returns a list of validation errors.
    An empty list means the data is valid.
    """

    errors = []

    # Check required fields
    for field in REQUIRED_FIELDS:
        if field not in data or data[field] is None:
            errors.append(
                f"Missing required field: '{field}'"
            )

    # Validate string fields
    for field in STRING_FIELDS:

        value = data.get(field)

        if value is None:
            continue

        if not isinstance(value, str):
            errors.append(
                f"Field '{field}' must be a string "
                f"(got {type(value).__name__})."
            )

        elif not value.strip():
            errors.append(
                f"Field '{field}' cannot be empty or blank."
            )

    # Validate list fields
    for field in LIST_FIELDS:

        value = data.get(field)

        if value is None:
            continue

        if not isinstance(value, list):

            errors.append(
                f"Field '{field}' must be an array "
                f"(list) of strings "
                f"(got {type(value).__name__})."
            )

            continue

        if len(value) == 0:

            errors.append(
                f"Field '{field}' cannot be empty. "
                f"Please provide at least one item."
            )

            continue

        for idx, item in enumerate(value):

            if not isinstance(item, str):

                errors.append(
                    f"Field '{field}' item #{idx + 1} "
                    f"must be a string "
                    f"(got {type(item).__name__})."
                )

            elif not item.strip():

                errors.append(
                    f"Field '{field}' item #{idx + 1} "
                    f"cannot be blank."
                )

    return errors


# ==================================================================
# 4. Save student profile to DynamoDB
# ==================================================================

def _save_student_profile(student_data: dict) -> str:
    """
    Save validated student profile to DynamoDB.

    Returns generated student_id.
    """

    student_id = str(uuid.uuid4())

    item = {
        "student_id": student_id,
        "name": student_data["name"],
        "education": student_data["education"],
        "branch": student_data["branch"],
        "skills": student_data["skills"],
        "interests": student_data["interests"],
        "target_job_role": student_data["target_job_role"],
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    student_table.put_item(Item=item)

    logger.info(
        "Student profile saved successfully. student_id=%s",
        student_id,
    )

    return student_id


# ==================================================================
# 5. Build AI prompt
# ==================================================================

def _build_career_prompt(student_data: dict) -> str:
    """
    Build a structured JSON-output prompt for Amazon Nova Lite.
    """

    skills = ", ".join(student_data["skills"])
    interests = ", ".join(student_data["interests"])

    prompt = f"""
You are an AI Career Assistant for engineering students.

Analyze the following student profile and provide a practical,
personalized career recommendation.

If a resume image is provided, analyze the resume along with the
student profile. Use relevant information visible in the resume
to improve the career recommendation.

STUDENT PROFILE

Name: {student_data["name"]}
Education: {student_data["education"]}
Branch: {student_data["branch"]}
Current Skills: {skills}
Interests: {interests}
Target Job Role: {student_data["target_job_role"]}

Return your answer as ONLY valid JSON.

Do NOT use Markdown.
Do NOT use ```json.
Do NOT add any text before or after the JSON.

Use exactly this JSON structure:

{{
  "career_suitability": "Explain how suitable the student's current profile is for the target role.",

  "skill_gaps": [
    "Important skill the student currently lacks"
  ],

  "recommended_skills": [
    "Important skill to learn"
  ],

  "learning_roadmap": [
    {{
      "phase": "Phase 1",
      "duration": "Example duration",
      "topics": [
        "Topic 1",
        "Topic 2"
      ]
    }}
  ],

  "projects": [
    {{
      "title": "Project title",
      "description": "Short project description",
      "skills": [
        "Skill 1",
        "Skill 2"
      ]
    }}
  ],

  "suitable_roles": [
    "Suitable job role"
  ],

  "final_advice": "Practical final career advice for the student."
}}

Requirements:

1. career_suitability must explain the student's suitability for the target role.
2. skill_gaps must contain important missing skills.
3. recommended_skills must contain practical skills to learn.
4. learning_roadmap must contain clear phases, durations, and topics.
5. projects must contain 3 realistic projects.
6. suitable_roles must contain relevant job roles.
7. final_advice must be concise and practical.
8. Base the recommendation on the student's actual education, skills,
   interests, target job role, and resume when available.
9. Return valid JSON only.
"""

    return prompt.strip()


# ==================================================================
# 6. Call Amazon Nova Lite
# ==================================================================

def _generate_career_recommendation(
    student_data: dict,
    image_base64: str = None,
    image_format: str = None,
) -> dict:
    """
    Send the student profile to Amazon Nova Lite using Converse API.

    Optional image support:
    image_base64 can contain a base64 encoded image.
    image_format can be png, jpeg, jpg, gif, or webp.
    """

    prompt = _build_career_prompt(student_data)

    content = [
        {
            "text": prompt
        }
    ]

    # --------------------------------------------------------------
    # Optional image input
    # --------------------------------------------------------------

    if image_base64:

        if not image_format:
            image_format = "png"

        image_format = image_format.lower()

        if image_format == "jpg":
            image_format = "jpeg"

        allowed_formats = {
            "png",
            "jpeg",
            "gif",
            "webp",
        }

        if image_format not in allowed_formats:

            raise ValueError(
                "Unsupported image format. "
                "Use png, jpeg, gif, or webp."
            )

        try:
            image_bytes = base64.b64decode(
                image_base64
            )

        except Exception as exc:

            raise ValueError(
                f"Invalid image base64 data: {exc}"
            )

        content.insert(
            0,
            {
                "image": {
                    "format": image_format,
                    "source": {
                        "bytes": image_bytes
                    },
                }
            }
        )

    # --------------------------------------------------------------
    # Converse API request
    # --------------------------------------------------------------

    response = bedrock_runtime.converse(
        modelId=BEDROCK_MODEL_ID,

        system=[
            {
                "text": (
                    "You are a professional AI Career Assistant. "
                    "Give accurate, practical and personalized "
                    "career guidance."
                )
            }
        ],

        messages=[
            {
                "role": "user",
                "content": content,
            }
        ],

        inferenceConfig={
            "maxTokens": 2500,
            "temperature": 0.4,
            "topP": 0.9,
        },
    )

    # --------------------------------------------------------------
    # Extract generated text
    # --------------------------------------------------------------

    response_content = (
        response
        .get("output", {})
        .get("message", {})
        .get("content", [])
    )

    text_parts = []

    for item in response_content:

        if "text" in item:
            text_parts.append(item["text"])

    recommendation_text = "\n".join(text_parts).strip()

    if not recommendation_text:
        raise RuntimeError(
            "Amazon Nova Lite returned an empty response."
        )

    # --------------------------------------------------------------
    # Convert AI JSON text into Python dictionary
    # --------------------------------------------------------------

    try:
        recommendation = json.loads(
            recommendation_text
        )

    except json.JSONDecodeError as exc:

        logger.error(
            "Nova Lite returned invalid JSON: %s",
            recommendation_text
        )

        raise RuntimeError(
            f"Amazon Nova Lite returned invalid JSON: {exc}"
        )

    # Make sure the parsed result is an object/dictionary
    if not isinstance(recommendation, dict):

        raise RuntimeError(
            "Amazon Nova Lite returned valid JSON, "
            "but the response was not a JSON object."
        )

    logger.info(
        "Career recommendation generated successfully."
    )

    return recommendation


# ==================================================================
# 7. Save AI recommendation to DynamoDB
# ==================================================================

def _save_career_recommendation(
    student_id: str,
    recommendation: dict,
) -> None:
    """
    Add the generated AI recommendation to the student's
    existing DynamoDB item.
    """

    student_table.update_item(
        Key={
            "student_id": student_id
        },

        UpdateExpression=(
            "SET career_recommendation = :recommendation, "
            "recommendation_created_at = :created_at"
        ),

        ExpressionAttributeValues={
            ":recommendation": recommendation,
            ":created_at": datetime.now(
                timezone.utc
            ).isoformat(),
        },
    )

    logger.info(
        "Career recommendation saved. student_id=%s",
        student_id,
    )


# ==================================================================
# 8. CORS preflight
# ==================================================================

def _handle_preflight() -> dict:
    """
    Respond to CORS preflight OPTIONS request.
    """

    return _build_response(
        200,
        {
            "message": "CORS preflight OK"
        },
    )


# ==================================================================
# 9. POST handler
# ==================================================================

def _handle_post(event: dict) -> dict:
    """
    Process POST /student-profile.

    Flow:

    1. Parse request
    2. Validate student profile
    3. Save profile to DynamoDB
    4. Send profile + optional resume image to Amazon Nova Lite
    5. Save recommendation to DynamoDB
    6. Return profile + AI recommendation
    """

    # --------------------------------------------------------------
    # Step 1: Parse JSON body
    # --------------------------------------------------------------

    try:

        student_data = _parse_event_body(event)

    except ValueError as exc:

        logger.warning(
            "Bad request - parse failure: %s",
            exc,
        )

        return _build_response(
            400,
            {
                "success": False,
                "message": str(exc),
                "data": None,
            },
        )

    logger.info(
        "Received student profile keys: %s",
        list(student_data.keys()),
    )

    # --------------------------------------------------------------
    # Step 2: Validate
    # --------------------------------------------------------------

    validation_errors = _validate_student_data(
        student_data
    )

    if validation_errors:

        logger.warning(
            "Validation failed: %s",
            validation_errors,
        )

        return _build_response(
            400,
            {
                "success": False,
                "message": (
                    "Validation failed. "
                    "Please fix the errors and try again."
                ),
                "errors": validation_errors,
                "data": None,
            },
        )

    # --------------------------------------------------------------
    # Step 3: Save student profile
    # --------------------------------------------------------------

    try:

        student_id = _save_student_profile(
            student_data
        )

    except Exception as exc:

        logger.exception(
            "Failed to save student profile "
            "to DynamoDB: %s",
            exc,
        )

        return _build_response(
            500,
            {
                "success": False,
                "message": (
                    "Student profile was valid, "
                    "but it could not be saved "
                    "to the database."
                ),
                "data": None,
            },
        )

    # --------------------------------------------------------------
    # Step 4: Optional resume image
    # --------------------------------------------------------------

    image_base64 = student_data.get(
        "image_base64"
    )

    image_format = student_data.get(
        "image_format"
    )

    # image_base64 and image_format are not required fields.
    # Only the selected student profile fields are stored in
    # the DynamoDB profile item.

    # --------------------------------------------------------------
    # Step 5: Generate AI recommendation
    # --------------------------------------------------------------

    try:

        recommendation = _generate_career_recommendation(
            student_data=student_data,
            image_base64=image_base64,
            image_format=image_format,
        )

    except Exception as exc:

        logger.exception(
            "Amazon Nova Lite invocation failed: %s",
            exc,
        )

        return _build_response(
            502,
            {
                "success": False,
                "message": (
                    "Student profile was saved, "
                    "but the AI career recommendation "
                    "could not be generated."
                ),
                "data": {
                    "student_id": student_id
                },
            },
        )

    # --------------------------------------------------------------
    # Step 6: Save recommendation
    # --------------------------------------------------------------

    try:

        _save_career_recommendation(
            student_id,
            recommendation,
        )

    except Exception as exc:

        logger.exception(
            "Failed to save career recommendation: %s",
            exc,
        )

        # The AI result is still available, so return it.
        logger.warning(
            "Returning AI recommendation even though "
            "DynamoDB update failed."
        )

    # --------------------------------------------------------------
    # Step 7: Final response
    # --------------------------------------------------------------

    response_body = {
        "success": True,
        "message": (
            "Student profile processed successfully "
            "and career recommendation generated."
        ),

        "data": {
            "student_id": student_id,
            "name": student_data["name"],
            "target_job_role": student_data[
                "target_job_role"
            ],
            "career_recommendation": recommendation,
        },
    }

    logger.info(
        "Career assistant completed successfully. "
        "student=%s target_role=%s",
        student_data["name"],
        student_data["target_job_role"],
    )

    return _build_response(
        200,
        response_body,
    )


# ==================================================================
# 10. Method not allowed
# ==================================================================

def _handle_method_not_allowed(method: str) -> dict:
    """
    Return 405 for unsupported HTTP methods.
    """

    return _build_response(
        405,
        {
            "success": False,
            "message": (
                f"HTTP method '{method}' is not allowed "
                "on this endpoint."
            ),
            "allowed_methods": [
                "OPTIONS",
                "POST"
            ],
            "data": None,
        },
    )


# ==================================================================
# 11. Lambda entry point
# ==================================================================

def lambda_handler(event: dict, context) -> dict:
    """
    AWS Lambda handler.
    """

    method = None

    try:

        # Works with API Gateway REST API and HTTP API
        method = (
            event.get("httpMethod")
            or event.get("requestContext", {})
            .get("http", {})
            .get("method")
            or "GET"
        ).upper()

        logger.info(
            "Incoming request: method=%s requestId=%s",
            method,
            getattr(
                context,
                "aws_request_id",
                "unknown",
            ),
        )

        # OPTIONS request
        if method == "OPTIONS":
            return _handle_preflight()

        # POST request
        if method == "POST":
            return _handle_post(event)

        # Other methods
        return _handle_method_not_allowed(
            method
        )

    except Exception as exc:

        logger.exception(
            "Unhandled error during request "
            "method=%s: %s",
            method,
            exc,
        )

        return _build_response(
            500,
            {
                "success": False,
                "message": (
                    "An unexpected error occurred "
                    "on the server. Please try again later "
                    "or contact support."
                ),
                "data": None,
            },
        )
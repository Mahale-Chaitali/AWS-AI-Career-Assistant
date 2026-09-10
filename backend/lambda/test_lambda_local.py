"""
Quick local test for lambda_function.py (no AWS account needed).

Run:
    python test_lambda_local.py
"""
import json
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from lambda_function import lambda_handler


class FakeContext:
    aws_request_id = "test-req-12345"


def pprint_response(label, resp):
    print(f"\n{'='*60}")
    print(f"TEST: {label}")
    print(f"statusCode = {resp['statusCode']}")
    print(f"headers    = {resp['headers']}")
    body = json.loads(resp["body"])
    print(f"body       = {json.dumps(body, indent=2)}")
    return body


# ------------------------------------------------------------------
# Test 1: Valid POST (happy path) - matches user's example
# ------------------------------------------------------------------
valid_event = {
    "httpMethod": "POST",
    "headers": {"Content-Type": "application/json"},
    "body": json.dumps({
        "name": "Rahul",
        "education": "B.Tech",
        "branch": "Information Technology",
        "skills": ["Python", "SQL", "HTML"],
        "interests": ["Web Development", "Cloud"],
        "target_job_role": "Software Developer",
    }),
}

result = pprint_response("1. Valid POST (happy path)", lambda_handler(valid_event, FakeContext()))
assert result["success"] is True, "Test 1 failed: success should be True"
assert result["data"]["name"] == "Rahul"
assert result["data"]["target_job_role"] == "Software Developer"
print("  -> PASS")


# ------------------------------------------------------------------
# Test 2: Missing required field -> 400
# ------------------------------------------------------------------
missing_event = {
    "httpMethod": "POST",
    "headers": {"Content-Type": "application/json"},
    "body": json.dumps({
        "name": "Rahul",
        # education, branch, skills, interests, target_job_role missing
    }),
}

result = pprint_response("2. Missing required fields", lambda_handler(missing_event, FakeContext()))
assert result["success"] is False, "Test 2 failed: success should be False"
assert "errors" in result, "Test 2 failed: errors key missing"
print(f"  -> Got {len(result['errors'])} validation error(s) as expected")
print("  -> PASS")


# ------------------------------------------------------------------
# Test 3: Invalid JSON -> 400
# ------------------------------------------------------------------
bad_json_event = {
    "httpMethod": "POST",
    "headers": {"Content-Type": "application/json"},
    "body": "{not valid json",
}

result = pprint_response("3. Invalid JSON payload", lambda_handler(bad_json_event, FakeContext()))
assert result["success"] is False
print("  -> PASS")


# ------------------------------------------------------------------
# Test 4: Wrong type (skills is a string, not list) -> 400
# ------------------------------------------------------------------
wrong_type_event = {
    "httpMethod": "POST",
    "headers": {"Content-Type": "application/json"},
    "body": json.dumps({
        "name": "Rahul",
        "education": "B.Tech",
        "branch": "IT",
        "skills": "Python",   # <-- wrong type, should be a list
        "interests": ["Cloud"],
        "target_job_role": "Dev",
    }),
}

result = pprint_response("4. Wrong type (skills is string not list)", lambda_handler(wrong_type_event, FakeContext()))
assert result["success"] is False
assert any("skills" in e and ("array" in e or "list" in e) for e in result.get("errors", [])), \
    f"Expected skills error, got {result.get('errors')}"
print("  -> PASS")


# ------------------------------------------------------------------
# Test 5: OPTIONS (CORS preflight) -> 200
# ------------------------------------------------------------------
options_event = {"httpMethod": "OPTIONS"}
resp = lambda_handler(options_event, FakeContext())
result = pprint_response("5. CORS preflight (OPTIONS)", resp)
assert resp["statusCode"] == 200, "OPTIONS should return 200"
assert "preflight" in result.get("message", "").lower()
print("  -> PASS")


# ------------------------------------------------------------------
# Test 6: Wrong method (GET) -> 405
# ------------------------------------------------------------------
get_event = {"httpMethod": "GET"}
result = pprint_response("6. Wrong HTTP method (GET)", lambda_handler(get_event, FakeContext()))
assert result["success"] is False
print("  -> PASS")


# ------------------------------------------------------------------
# Test 7: Body already a dict (Lambda test console format)
# ------------------------------------------------------------------
body_as_dict_event = {
    "httpMethod": "POST",
    "body": {
        "name": "Anjali",
        "education": "MBA",
        "branch": "Marketing",
        "skills": ["SEO", "Analytics"],
        "interests": ["Branding"],
        "target_job_role": "Digital Marketer",
    },
}
result = pprint_response("7. Body is already a dict (Lambda console test)",
                         lambda_handler(body_as_dict_event, FakeContext()))
assert result["success"] is True
assert result["data"]["name"] == "Anjali"
print("  -> PASS")


print("\n" + "="*60)
print("ALL 7 TESTS PASSED - Lambda handler is ready to deploy!")
print("="*60)

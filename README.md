# ☁️ AWS AI Career Assistant

An AI-powered career guidance platform that analyzes a student's **education, skills, interests, target role, and resume** to generate a personalized career roadmap.

Instead of giving generic career advice, the application identifies skill gaps and provides actionable recommendations such as **skills to learn, project ideas, learning roadmaps, and suitable career roles**.

---

## 🎯 Problem Statement

Technology students often know what career they want but are unsure about what to learn next.

Most career advice is either:

* Too generic
* Difficult to personalize
* Focused only on courses
* Missing a clear skill-gap analysis
* Not connected to the student's existing skills and interests

The **AWS AI Career Assistant** addresses this problem by using Generative AI and AWS serverless services to provide personalized career guidance based on an individual student profile.

---

## 💡 Solution

The application collects a student's:

* Education
* Branch / specialization
* Current skills
* Interests
* Target career role
* Resume information

The profile is processed through an AWS serverless backend and analyzed using **Amazon Bedrock** to generate a structured career recommendation.

The result is displayed on an interactive React dashboard.

---

# ✨ Features

### 👤 Student Profile

Students can enter:

* Full name
* Education
* Branch
* Current skills
* Interests
* Target job role
* Resume information

### 📊 Skill Gap Analysis

The AI analyzes the student's current skills against the requirements of the selected target role and identifies areas that need improvement.

### 📚 Personalized Learning Roadmap

Provides an ordered learning path based on the student's current level and career goal.

### 💻 Project Recommendations

Suggests projects that can help students develop the skills required for their target role.

### 🎯 Career Recommendations

Identifies career roles that align with the student's profile, skills, and interests.

### 🤖 Generative AI

Uses **Amazon Bedrock with Amazon Nova Lite** to generate personalized recommendations from the submitted profile.

### ☁️ Serverless Architecture

The backend uses AWS managed services, eliminating the need for continuously running servers.

---

# 🛠️ Tech Stack

## Frontend

* **React.js**
* JavaScript
* HTML
* CSS

## Backend

* **Python**
* **AWS Lambda**

## API

* **Amazon API Gateway**
* HTTP API
* REST-style `POST` endpoint

## Database

* **Amazon DynamoDB**

Used to store student profile information.

## Generative AI

* **Amazon Bedrock**
* **Amazon Nova Lite**
* Bedrock Converse API

## Cloud & Security

* **Amazon S3** — Static frontend hosting
* **AWS IAM** — Permissions and access control
* **Amazon CloudWatch** — Monitoring and logging

## Development Tools

* Git
* GitHub
* VS Code
* Postman

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      Student         │
                    │                      │
                    │  Profile Information │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      React.js        │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Amazon S3          │
                    │ Static Web Hosting   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Amazon API Gateway  │
                    │     HTTP API         │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     AWS Lambda       │
                    │ Python Backend       │
                    └───────┬───────┬──────┘
                            │       │
                  ┌─────────┘       └──────────┐
                  ▼                            ▼
        ┌──────────────────┐        ┌──────────────────┐
        │ Amazon DynamoDB  │        │ Amazon Bedrock   │
        │ Profile Storage  │        │   Nova Lite      │
        └──────────────────┘        └────────┬─────────┘
                                             │
                                             ▼
                                  ┌─────────────────────┐
                                  │ Career Recommendation│
                                  └──────────┬──────────┘
                                             │
                                             ▼
                                  ┌─────────────────────┐
                                  │   React Dashboard   │
                                  └─────────────────────┘

        IAM → Permissions & Access Control
        CloudWatch → Monitoring & Logs
```

---

# 🔄 How It Works

### 1. Student Profile Submission

The student enters their personal career information through the React frontend.

```text
Education
Skills
Interests
Target Role
Resume
       ↓
React Application
```

### 2. API Request

The frontend sends the profile to the backend through an **Amazon API Gateway HTTP API**.

```text
React
  ↓
POST /student-profile
  ↓
API Gateway
```

### 3. Lambda Processing

AWS Lambda receives the request and:

* Parses the request
* Validates required fields
* Processes the submitted profile
* Communicates with AWS services

### 4. Profile Storage

The validated student profile is stored in **Amazon DynamoDB**.

Example information:

```text
StudentId
FullName
Education
Branch
Skills
Interests
TargetRole
Resume
Timestamp
```

### 5. AI Analysis

Lambda prepares a structured prompt containing the student's profile and sends it to **Amazon Bedrock**.

Amazon Nova Lite generates recommendations covering areas such as:

```text
Skill Gaps
       ↓
Skills to Learn
       ↓
Project Ideas
       ↓
Learning Roadmap
       ↓
Suitable Career Roles
```

### 6. Recommendation Response

The generated recommendation is returned through the backend and API Gateway to the React application.

### 7. Dashboard

The React dashboard displays the recommendation in an organized format so the student can easily understand their next steps.

---

# 🔐 AWS Security

**AWS IAM** is used to control permissions between AWS services.

The Lambda execution role is configured to provide the permissions required for the application, such as:

* DynamoDB access
* Bedrock runtime access
* CloudWatch logging

The project follows the principle of **least privilege**, where permissions should be limited to what the application actually needs.

---

# 📈 Monitoring

**Amazon CloudWatch** is used for:

* Lambda execution logs
* Error investigation
* Debugging
* Monitoring application behavior

CloudWatch helps identify issues such as:

* Invalid requests
* Lambda errors
* DynamoDB failures
* Bedrock API errors

Sensitive information such as complete resume contents should not be unnecessarily written to application logs.

---

# ⚡ Why Serverless?

The application uses a serverless architecture because the backend only needs to execute when a student interacts with the application.

### Benefits

* No server management
* Automatic scaling
* Pay-per-use AWS services
* Easy integration between AWS services
* Reduced infrastructure maintenance
* Clear separation between frontend, processing, storage, and AI

---

# 📂 Project Structure

```text
aws-ai-career-assistant/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│
```

# VR Policy Clarifier Demo Script

## 0:00-0:30 | Introduction

Hello, my Build v1 artifact is the VR Policy Clarifier. This is a Tier 1 prompt-template artifact for Vocational Rehabilitation policy interpretation. The business problem is that counselors often face gray-area policy and documentation questions, and they need a structured way to ask an AI tool for decision support without treating the AI as a final authority.

## 0:30-1:15 | Artifact Overview

This is a static web interface that wraps the reusable prompt template. It does not call an AI API, does not use a database, does not require login, and does not store or transmit data. The top of the page highlights the key guardrails: Tier 1 prompt template, decision support only, human-in-the-loop, and no data stored.

I also included a prominent warning that users must enter de-identified information only. The tool is designed around the policy text that the counselor provides, so it does not retrieve policy or access case records.

## 1:15-2:30 | Sample Scenario and Prompt Generation

For the sample test, I select `Load Sample Scenario`. The page fills in a de-identified counselor question, de-identified case context, a short policy summary, and the documentation action being considered.

The sample asks whether Counseling & Guidance and Person-Centered Practices should be documented as one Actual Service or two, and whether a Case Note is still needed.

Next, I select `Generate Prompt`. The tool combines the four inputs with the base prompt template. The generated prompt tells the AI to use only the policy text provided, not invent policy, protect confidentiality, and return a structured answer.

## 2:30-3:30 | AI Response Review

After copying the prompt into the approved AI tool for the course, I review the response against the expected format. The key sections are Direct Answer, Policy Basis, Reasoning, Gray Area or Ambiguity, Counselor Action Steps, Documentation Needed, Supervisor or Leadership Review Flag, Confidence Level, and Clarifying Questions.

For this sample, the expected pattern is that two Actual Services are likely needed if both services were actually provided, and a Customer Contact Case Note is also needed. The policy basis should come only from the provided policy summary.

## 3:30-4:30 | Guardrails and Human Review

The tool is intentionally limited. It does not make a final case decision, authorize a service, determine eligibility, close a case, or replace supervisor review. It simply formats a safer prompt.

There are also lightweight checks built into the page. If required fields are blank, the page warns the user. If the case context appears to include something like an SSN, phone number, email address, street address, DOB, or date of birth wording, the page shows a de-identification warning. That warning is non-blocking, but it reminds the user to remove identifying information before copying the prompt.

## 4:30-5:00 | Next Steps

Before the final submission, I would expand the test set with unsupported policy text, high-cost service questions, vague facts, and accidental identifying information. I would also ask reviewers whether the workflow feels realistic for a VR counselor environment and whether the artifact should remain Tier 1 or eventually evolve into a Tier 2 configured assistant.

# VR Policy Clarifier

Tier 1 prompt-template artifact for BUAD 583 | AI Literacy & Strategy for Managers.

## Description

The VR Policy Clarifier is a static web interface for building a reusable prompt that helps Vocational Rehabilitation counselors interpret gray-area policy questions. The tool collects a de-identified counselor question, de-identified case context, provided policy/manual/memo/FAQ/procedure text, and the action being considered. It then formats those inputs into a structured prompt for use in an approved AI tool.

This is decision support only. It does not replace a supervisor, Policy Program Coordinator, official manual, leadership approval, or legal guidance.

## Build Tier

Tier 1 Prompt Template with a polished static web interface.

## How to Run Locally

1. Download or open this project folder.
2. Open `index.html` in a web browser.
3. Select `Load Sample Scenario` or enter de-identified content.
4. Select `Generate Prompt`.

No server, package manager, build step, or external dependency is required.

## GitHub Pages Deployment

1. Create a GitHub repository for the build artifact.
2. Upload these files to the repository root:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
   - `demo-script.md`
   - `evaluation-plan.md`
   - `.nojekyll`
3. In GitHub, go to `Settings` > `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select the `main` branch and the `/root` folder.
6. Save the settings.
7. Use the published Pages URL as the Build v1 artifact link.

The link will usually follow this pattern:

`https://<your-github-username>.github.io/<repository-name>/`

## Privacy Note

No data is stored or transmitted. The page runs entirely in the browser. It does not use analytics, tracking scripts, remote APIs, databases, accounts, or browser storage for entered content.

Users should enter de-identified information only. Do not enter customer names, Social Security numbers, addresses, phone numbers, medical details, employer names tied to a specific customer, or other identifying information.

## Scope Limits

- The site is not an AI chatbot.
- The site does not call OpenAI, Anthropic, or any other AI API.
- The site does not retrieve policy or access case records.
- The site does not make final decisions, authorize services, determine eligibility, close cases, or communicate with customers.
- The generated prompt must still be reviewed by a human against the actual policy.
- Supervisor or leadership review is required for high-risk, unsupported, exception-based, eligibility-related, service-authorization, closure, due-process, or customer-rights issues.

## Suggested Demo Steps

1. Introduce the business problem: counselors need structured help interpreting gray-area VR policy questions.
2. Explain the Tier 1 scope: this is a reusable prompt template, not a live AI system.
3. Show the warning and privacy note.
4. Load the sample scenario.
5. Generate the prompt.
6. Copy the generated prompt into the approved AI tool for the course.
7. Review the expected output sections and compare the AI response against the provided policy text.
8. Explain the human-in-the-loop workflow, risk register, and evaluation plan.

## Additional Submission Files

- `submission-checklist.md` provides final submission, GitHub Pages, demo, and common-mistake checks.
- `sample-ai-response.md` provides a de-identified sample response for the Counseling & Guidance / Person-Centered Practices test scenario.

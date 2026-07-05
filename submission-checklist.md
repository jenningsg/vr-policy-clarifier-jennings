# VR Policy Clarifier Build v1 Submission Checklist

Use this checklist before submitting the Capstone Early Checkpoint.

## Run the Site Locally

1. Open the `vr-policy-clarifier` folder.
2. Double-click `index.html`, or open it from your browser.
3. Confirm the page title says `VR Policy Clarifier`.
4. Select `Load Sample Scenario`.
5. Select `Generate Prompt`.
6. Confirm the generated prompt appears and includes the counselor question, case context, policy text, and action being considered.

## Publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload these files to the repository root:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
   - `demo-script.md`
   - `evaluation-plan.md`
   - `submission-checklist.md`
   - `sample-ai-response.md`
   - `.nojekyll`
3. In GitHub, open `Settings`.
4. Select `Pages`.
5. Under `Build and deployment`, choose `Deploy from a branch`.
6. Select the `main` branch and `/root` folder.
7. Save the settings and wait for GitHub to publish the site.

## Verify the Build v1 Link Works

1. Open the GitHub Pages URL in a private or incognito browser window.
2. Confirm the site loads without asking for login.
3. Confirm the buttons work:
   - `Load Sample Scenario`
   - `Generate Prompt`
   - `Copy Generated Prompt`
   - `Download Prompt as .txt`
   - `Reset`
   - `Print / Save as PDF`
4. Confirm the privacy warning is visible near the top of the page.
5. Confirm no real customer-identifying information appears anywhere on the page or in the sample content.

## Record the Demo Video

1. Open the published Build v1 link.
2. Introduce the artifact as a Tier 1 prompt-template build.
3. Explain that it does not call an AI API, retrieve policy, store data, or make final VR decisions.
4. Show the privacy warning and human-in-the-loop guardrails.
5. Click `Load Sample Scenario`.
6. Click `Generate Prompt`.
7. Copy the generated prompt into the approved AI tool for the course.
8. Review the AI response against the expected response pattern.
9. Close by explaining next evaluation steps before final submission.

Use `demo-script.md` if you want a 3-5 minute narration guide.

## What to Paste Into the Capstone Early Checkpoint Document

Build v1 artifact link:

`https://<your-github-username>.github.io/<repository-name>/`

Demo video link:

`<paste your Panopto, Zoom, Google Drive, Canvas Studio, or approved video link here>`

Short artifact description:

`VR Policy Clarifier is a Tier 1 prompt-template artifact that helps VR counselors structure de-identified, source-grounded policy interpretation questions for use in an approved AI tool. It supports counselor reasoning and human review, but does not call an AI API, retrieve policy, store data, or make final VR decisions.`

## Common Mistakes to Avoid

- Do not submit a local file path as the Build v1 link. Submit the GitHub Pages URL.
- Do not upload only `index.html`; upload the CSS, JavaScript, Markdown files, and `.nojekyll` too.
- Do not paste real customer-identifying information into the demo.
- Do not describe the artifact as an AI chatbot or automated decision-maker.
- Do not claim the tool verifies official policy currency or completeness.
- Do not forget to test the GitHub Pages link in a private or incognito window.
- Do not forget to make the demo video shareable to the instructor or course review audience.

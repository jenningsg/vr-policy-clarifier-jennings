const fields = {
  counselorQuestion: {
    label: "Counselor question",
    element: document.getElementById("counselorQuestion")
  },
  caseContext: {
    label: "De-identified case context",
    element: document.getElementById("caseContext")
  },
  policyText: {
    label: "Policy/manual/memo/FAQ/procedure text",
    element: document.getElementById("policyText")
  },
  decisionAction: {
    label: "Decision or documentation action being considered",
    element: document.getElementById("decisionAction")
  }
};

const form = document.getElementById("promptForm");
const validationMessages = document.getElementById("validationMessages");
const statusMessage = document.getElementById("statusMessage");
const generatedPrompt = document.getElementById("generatedPrompt");
const copyPromptButton = document.getElementById("copyPrompt");
const downloadPromptButton = document.getElementById("downloadPrompt");
const loadSampleButton = document.getElementById("loadSample");
const resetFormButton = document.getElementById("resetForm");
const printPageButton = document.getElementById("printPage");

const emptyPromptText = "Generated prompt will appear here after you complete all fields and select Generate Prompt.";

const sampleScenario = {
  counselorQuestion: "If Counseling & Guidance and Person-Centered Practices are both discussed during one customer meeting, should staff document one Actual Service or two? Is a Case Note still needed?",
  caseContext: "During one customer meeting, the counselor discussed adjustment to disability, informed choice, the customer’s employment goals, and next steps for services. The counselor wants to know whether this should be documented as Counseling & Guidance, Person-Centered Practices, both services, or only a case management contact. No identifying information is included.",
  policyText: "De-identified policy summary for testing: Counseling & Guidance and Person-Centered Practices are treated as distinct services when both services are actually provided. Staff should not enter an Actual Service unless the activity meets the service definition. A Customer Contact Case Note is required when an Actual Service is entered for Counseling & Guidance or Person-Centered Practices. Routine scheduling, administrative follow-up, or general case management alone may not meet the definition of either service.",
  decisionAction: "The counselor is considering whether to document one Actual Service, two Actual Services, and/or a Customer Contact Case Note for the same meeting date."
};

function getFieldValues() {
  return Object.fromEntries(
    Object.entries(fields).map(([key, field]) => [key, field.element.value.trim()])
  );
}

function getMissingFields(values) {
  return Object.entries(fields)
    .filter(([key]) => !values[key])
    .map(([, field]) => field.label);
}

function findPossibleIdentifiers(text) {
  const patterns = [
    { label: "possible SSN", regex: /\b\d{3}[-.\s]?\d{2}[-.\s]?\d{4}\b/ },
    { label: "possible phone number", regex: /\b(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/ },
    { label: "email address", regex: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i },
    { label: "possible street address", regex: /\b\d{1,6}\s+[A-Za-z0-9.'-]+(?:\s+[A-Za-z0-9.'-]+){0,4}\s+(?:Street|St\.?|Avenue|Ave\.?|Road|Rd\.?|Boulevard|Blvd\.?|Drive|Dr\.?|Lane|Ln\.?|Court|Ct\.?|Way|Terrace|Ter\.?|Circle|Cir\.?)\b/i },
    { label: "DOB/date of birth/SSN wording", regex: /\b(DOB|date of birth|SSN|social security number)\b/i }
  ];

  return patterns
    .filter((pattern) => pattern.regex.test(text))
    .map((pattern) => pattern.label);
}

function setValidationMessage(message, type) {
  validationMessages.innerHTML = message
    ? `<div class="message ${type}">${message}</div>`
    : "";
}

function setStatus(message, type = "info") {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;
}

function setPromptGenerated(isGenerated) {
  copyPromptButton.disabled = !isGenerated;
  downloadPromptButton.disabled = !isGenerated;
  generatedPrompt.classList.toggle("empty", !isGenerated);
}

function buildPrompt(values) {
  return `You are a Vocational Rehabilitation Policy Clarifier and decision-support assistant. Your job is to help VR counselors interpret policy language and decide the most defensible next step. You are not a supervisor, legal authority, Policy Program Coordinator, or final approver.

Use only the policy text, memo text, FAQ text, procedure text, or manual text I provide. Do not invent policy. If the answer is not supported by the provided text, say: “Not enough policy basis provided.”

Protect confidentiality. Do not ask for or repeat customer-identifying information. If identifying information appears, ignore or generalize it.

INPUTS:
1. Counselor question:
${values.counselorQuestion}

2. Case context, using no customer-identifying information:
${values.caseContext}

3. Policy/manual/memo/FAQ/procedure text:
${values.policyText}

4. Decision or documentation action being considered:
${values.decisionAction}

REQUIRED OUTPUT FORMAT:
1. Direct Answer:
Give the clearest answer possible: Yes, No, Likely Yes, Likely No, It Depends, or Not Enough Policy Basis Provided.

2. Policy Basis:
Identify the relevant policy language, document title, section, memo, or FAQ used. Quote or paraphrase only from the provided text.

3. Reasoning:
Explain how the policy applies to the counselor’s question in plain language.

4. Gray Area / Ambiguity:
Identify what makes the situation unclear, incomplete, high-risk, or interpretation-dependent.

5. Counselor Action Steps:
List the practical next steps the counselor should take.

6. Documentation Needed:
State what should be documented and where, based only on the provided text.

7. Supervisor / Leadership Review Flag:
State Yes, No, or Maybe. Require review when the issue is high-cost, exception-based, outside normal procedure, unsupported by the provided policy text, or likely to affect eligibility, service authorization, closure, due process, or customer rights.

8. Confidence Level:
High, Medium, or Low, with a one-sentence explanation.

9. Clarifying Questions:
Ask only the questions needed to resolve uncertainty.

TONE:
Be concise, professional, and practical. The answer should help a counselor understand the issue quickly without pretending that AI has final authority.`;
}

function generatePrompt() {
  const values = getFieldValues();
  const missingFields = getMissingFields(values);

  if (missingFields.length > 0) {
    setValidationMessage(`Please complete the following field${missingFields.length > 1 ? "s" : ""}: ${missingFields.join(", ")}.`, "error");
    setStatus("");
    generatedPrompt.textContent = emptyPromptText;
    setPromptGenerated(false);
    return;
  }

  const identifierWarnings = findPossibleIdentifiers(values.caseContext);
  if (identifierWarnings.length > 0) {
    setValidationMessage(`Review the case context before copying. It may include ${identifierWarnings.join(", ")}. Use de-identified information only.`, "warning");
  } else {
    setValidationMessage("");
  }

  generatedPrompt.textContent = buildPrompt(values);
  setPromptGenerated(true);
  setStatus("Prompt generated. Review it before copying into an approved AI tool.", "success");
}

async function copyGeneratedPrompt() {
  const text = generatedPrompt.textContent.trim();
  if (!text || generatedPrompt.classList.contains("empty")) {
    setStatus("Generate a prompt before copying.", "info");
    return;
  }

  function fallbackCopy() {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.left = "-9999px";
    document.body.appendChild(helper);
    helper.select();
    try {
      document.execCommand("copy");
      return true;
    } catch (error) {
      return false;
    } finally {
      document.body.removeChild(helper);
    }
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      fallbackCopy();
    }
    setStatus("Generated prompt copied.", "success");
  } catch (error) {
    if (fallbackCopy()) {
      setStatus("Generated prompt copied.", "success");
    } else {
      setStatus("Copy did not complete. Select the generated prompt text and copy it manually.", "info");
    }
  }
}

function downloadGeneratedPrompt() {
  const text = generatedPrompt.textContent.trim();
  if (!text || generatedPrompt.classList.contains("empty")) {
    setStatus("Generate a prompt before downloading.", "info");
    return;
  }

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "vr-policy-clarifier-prompt.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  setStatus("Prompt downloaded as a .txt file.", "success");
}

function loadSampleScenario() {
  Object.entries(sampleScenario).forEach(([key, value]) => {
    fields[key].element.value = value;
  });
  setValidationMessage("");
  setStatus("Sample scenario loaded. Select Generate Prompt to build the reusable prompt.", "success");
}

function resetBuilder() {
  form.reset();
  generatedPrompt.textContent = emptyPromptText;
  setPromptGenerated(false);
  setValidationMessage("");
  setStatus("Builder reset. No data was stored.", "success");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  generatePrompt();
});

copyPromptButton.addEventListener("click", copyGeneratedPrompt);
downloadPromptButton.addEventListener("click", downloadGeneratedPrompt);
loadSampleButton.addEventListener("click", loadSampleScenario);
resetFormButton.addEventListener("click", resetBuilder);
printPageButton.addEventListener("click", () => window.print());

setPromptGenerated(false);

const API_BASE = "https://aimeetingnotessummarizer.onrender.com/api/summary";

async function generateSummary() {
  const transcript = document.getElementById("transcript").value;
  const instruction = document.getElementById("instruction").value;
  const summaryBox = document.getElementById("summary");
  const generateBtn = document.querySelector("button[onclick='generateSummary()']");

  // Disable button and show loading state
  generateBtn.disabled = true;
  generateBtn.textContent = "Generating...";
  generateBtn.classList.add("loading");
  summaryBox.value = "Generating summary...";

  try {
    const res = await fetch(`${API_BASE}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript, instruction })
    });

    const data = await res.json();
    summaryBox.value = data.summary || "Error generating summary";
  } catch (err) {
    summaryBox.value = "Error: Failed to generate summary.";
  } finally {
    // Re-enable button
    generateBtn.disabled = false;
    generateBtn.textContent = "Generate Summary";
    generateBtn.classList.remove("loading");
  }
}

async function sendEmail() {
  const summary = document.getElementById("summary").value;
  const recipients = document.getElementById("recipients").value.split(",");
  const sendBtn = document.querySelector("button[onclick='sendEmail()']");

  // Disable button while sending
  sendBtn.disabled = true;
  sendBtn.textContent = "Sending...";
  sendBtn.classList.add("loading");

  try {
    const res = await fetch(`${API_BASE}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipients, summary })
    });

    const data = await res.json();
    alert(data.message || data.error);
  } catch (err) {
    alert("Error: Failed to send email.");
  } finally {
    // Re-enable button
    sendBtn.disabled = false;
    sendBtn.textContent = "Send via Email";
    sendBtn.classList.remove("loading");
  }
}

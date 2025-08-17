const API_BASE = "http://localhost:8000/api/summary";

async function generateSummary() {
  const transcript = document.getElementById("transcript").value;
  const instruction = document.getElementById("instruction").value;

  const res = await fetch(`${API_BASE}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript, instruction })
  });

  const data = await res.json();
  document.getElementById("summary").value = data.summary || "Error generating summary";
}

async function sendEmail() {
  const summary = document.getElementById("summary").value;
  const recipients = document.getElementById("recipients").value.split(",");

  const res = await fetch(`${API_BASE}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ recipients, summary })
  });

  const data = await res.json();
  alert(data.message || data.error);
}

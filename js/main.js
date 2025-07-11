document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const sendBtn = document.getElementById("sendBtn");
  const responseMsg = document.getElementById("responseMsg");

  sendBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();

    if (!email || !validateEmail(email)) {
      responseMsg.textContent = "Please enter a valid email address.";
      responseMsg.style.color = "red";
      return;
    }

    try {
      const response = await fetch("/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      responseMsg.textContent = result.message;
      responseMsg.style.color = "green";
    } catch (error) {
      console.error("Error sending email:", error);
      responseMsg.textContent = "Failed to send email.";
      responseMsg.style.color = "red";
    }
  });

  function validateEmail(email) {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});

let shareCount = 0;
const maxShares = 5;

// Show default counter or success state
if (localStorage.getItem("submitted") === "true") {
  document.getElementById("registrationForm").style.display = "none";
  document.getElementById("successMessage").style.display = "block";
} else {
  document.getElementById("shareCounter").innerText = `Click count: ${shareCount}/5`;
}

function shareOnWhatsApp() {
  if (shareCount < maxShares) {
    const message = encodeURIComponent(
      `🚀 Hey Buddy!\n\nJoin the *Tech For Girls* community and be part of something amazing!\n\nRegister here: https://script.google.com/macros/s/AKfycbwAFxkDtk1AD2UmWjT9jt1lXvTe2T9mWQAUAZwv6i7i5ULNTODF0OsYq-eQ5bMikXxerA/exec`
    );

    const url = `https://wa.me/?text=${message}`;
    console.log("Opening WhatsApp with URL:", url); // For debugging
    window.open(url, "_blank");

    shareCount++;
    document.getElementById("shareCounter").innerText = `Click count: ${shareCount}/5`;

    if (shareCount === maxShares) {
      alert("✅ Sharing complete. You can now submit the form.");
    }
  }
}

document.getElementById("registrationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (shareCount < maxShares) {
    alert("⚠️ Please complete sharing on WhatsApp before submitting (5/5).");
    return;
  }

  // Collect form data
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const college = document.getElementById("college").value.trim();

  // Your working Google Apps Script URL
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwAFxkDtk1AD2UmWjT9jt1lXvTe2T9mWQAUAZwv6i7i5ULNTODF0OsYq-eQ5bMikXxerA/exec';

  // Send to Google Sheets
  fetch(scriptURL, {
    method: 'POST',
    body: new URLSearchParams({
      'Name': name,
      'Phone': phone,
      'Email': email,
      'College': college
    })
  })
  .then(response => {
    document.getElementById("registrationForm").style.display = "none";
    document.getElementById("successMessage").style.display = "block";
    localStorage.setItem("submitted", "true");
  })
  .catch(error => {
    alert("❌ Submission failed. Please try again.");
    console.error("Error!", error.message);
  });
});

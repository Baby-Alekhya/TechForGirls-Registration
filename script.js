let clickCount = 0;
const shareBtn = document.getElementById("shareBtn");
const shareCountDisplay = document.getElementById("shareCount");

if (localStorage.getItem("submitted")) {
  document.querySelectorAll("input, button").forEach(el => el.disabled = true);
  document.getElementById("message").innerText = "🎉 You already submitted. Thanks!";
}

shareBtn.addEventListener("click", () => {
  if (clickCount < 5) {
    clickCount++;
    shareCountDisplay.innerText = `Click count: ${clickCount}/5`;
    const text = "Hey Buddy, Join Tech For Girls Community";
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    if (clickCount === 5) {
      alert("Sharing complete. Please continue.");
    }
  }
});

document.getElementById("registrationForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  if (clickCount < 5) {
    alert("Please complete WhatsApp sharing (5/5) before submitting.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const screenshotFile = document.getElementById("screenshot").files[0];

  if (!screenshotFile) {
    alert("Please upload your screenshot.");
    return;
  }

  const formData = new FormData();
  formData.append("file", screenshotFile);
  formData.append("upload_preset", "your_upload_preset"); // For Cloudinary or similar

  const upload = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
    method: "POST",
    body: formData
  });

  const uploadResult = await upload.json();

  const data = {
    name,
    phone,
    email,
    college,
    screenshot: uploadResult.secure_url
  };

  await fetch("https://script.google.com/macros/s/AKfycbx-LrnuvrdSO2xkrDlsm5b9Lk5H84nza-4PnE1QjIIPRBUCuSHDBi0TzAxKQ37bEabl/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  });

  localStorage.setItem("submitted", "true");
  document.getElementById("registrationForm").reset();
  document.getElementById("message").innerText = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
  document.querySelectorAll("input, button").forEach(el => el.disabled = true);
});

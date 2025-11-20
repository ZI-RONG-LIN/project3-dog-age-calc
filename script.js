// --- 頁面載入時，檢查 localStorage 是否已有生日 ---
window.addEventListener("DOMContentLoaded", function () {
  const savedBirthday = localStorage.getItem("dogBirthday");
  if (savedBirthday) {
    document.getElementById("dogBirthday").value = savedBirthday;
  }
});

// --- 按下換算按鈕 ---
document.getElementById("calculateBtn").addEventListener("click", function () {
  const birthdayInput = document.getElementById("dogBirthday").value;
  const resultDiv = document.getElementById("result");

  if (!birthdayInput) {
    resultDiv.textContent = "請先輸入狗狗的生日 🐶";
    return;
  }

  // 👉 儲存到 localStorage
  localStorage.setItem("dogBirthday", birthdayInput);

  const birthday = new Date(birthdayInput);
  const today = new Date();

  const diffTime = today - birthday;
  const dogYears = diffTime / (1000 * 60 * 60 * 24 * 365.25); // 轉成年

  if (dogYears <= 0) {
    resultDiv.textContent = "生日不能超過今天，請重新確認！";
    return;
  }

  if (dogYears < 1) {
    resultDiv.textContent = "狗狗未滿 1 歲，BBC 的換算公式無法適用喔。";
    return;
  }

  // BBC 科學公式：人類年齡 = 16 × ln(狗年齡) + 31
  const humanYears = 16 * Math.log(dogYears) + 31;

  resultDiv.textContent = `相當於人類約：${humanYears.toFixed(1)} 歲`;
});

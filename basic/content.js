const userIdInput = document.querySelector('#IdInput');
if (userIdInput) userIdInput.value = 'seohyun8646';

const passwordSubmitButton = document.querySelector('input[type="submit"][value="비밀번호 인증"]');
if (passwordSubmitButton) passwordSubmitButton.click();

setTimeout(() => {
  const passwordInput = document.querySelector('#passwordInput');
  if (passwordInput) {
    passwordInput.value = '1111';
    const loginButton = document.querySelector('input[type="submit"].loginbtn');
    if (loginButton) loginButton.click();
  }
}, 1000); // Adjust timing as needed

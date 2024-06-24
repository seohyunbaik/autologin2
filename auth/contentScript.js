// Listen for the DOM to be fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
  // Trigger the login process immediately after the page loads
  automateLoginProcess();
});

// This function automates the login steps on the KLMS website
function automateLoginProcess() {
  // Enter username
  const usernameInput = document.querySelector('#IdInput');
  if (usernameInput) {
    usernameInput.value = 'seohyun8646';
    const submitUsername = document.querySelector('input[type="submit"][value="비밀번호 인증"]');
    submitUsername && submitUsername.click(); // Submit to proceed to password entry
  }

  // Set a delay to allow page components to load
  setTimeout(() => {
    // Enter password
    const passwordInput = document.querySelector('#passwordInput');
    if (passwordInput) {
      passwordInput.value = '!@SHbike21Kai';  //
      const loginButton = document.querySelector('input[type="submit"].loginbtn');
      loginButton && loginButton.click();  // Submit to log in
    }

    // Another delay to handle multi-factor authentication or additional steps
    setTimeout(() => {
      // Normally, you would handle additional steps here such as MFA, but since this is a simulation,
      // we assume this is where you would check for and insert the verification code.
      // Listener for background message passing (e.g., receiving the verification code from Gmail)
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'insertCode' && request.code) {
          const emailVerificationInput = document.querySelector('input[type="password"][placeholder="외부 메일 인증번호 입력"]');
          if (emailVerificationInput) {
            emailVerificationInput.value = request.code;  // Insert the code received from the background
            const finalLoginButton = document.querySelector('input[type="submit"][value="로그인"]');
            finalLoginButton && finalLoginButton.click();  // Click to finalize login
          }
        }
      });
    }, 1000);
  }, 1000);
}

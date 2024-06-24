function automateLoginProcess() {
  // Wait for the page to load completely
  window.addEventListener('DOMContentLoaded', (event) => {
    // Step 1: Enter username
    const usernameInput = document.querySelector('#IdInput');
    if (usernameInput) {
      usernameInput.value = 'seohyun8646';
    }

    // Step 2: Submit to proceed to password
    const submitUsername = document.querySelector('input[type="submit"][value="비밀번호 인증"]');
    submitUsername && submitUsername.click();

    // Delay for next elements to potentially load/render
    setTimeout(() => {
      // Step 3: Enter password
      const passwordInput = document.querySelector('#passwordInput');
      if (passwordInput) {
        passwordInput.value = '1111'; // This should be handled more securely
      }

      // Step 4: Click login button
      const loginButton = document.querySelector('input[type="submit"].loginbtn');
      loginButton && loginButton.click();

      // Additional delay for possible next steps
      setTimeout(() => {
        // Step 5: Click on external email button
        const emailButton = document.querySelector('input[type="submit"]#email');
        emailButton && emailButton.click();

        setTimeout(() => {
          // Step 6: Enter external email verification code and login
          const emailVerificationInput = document.querySelector('input[type="password"][placeholder="외부 메일 인증번호 입력"]');
          if (emailVerificationInput) {
            emailVerificationInput.value = '111111'; // This should also be handled more securely
          }

          const finalLoginButton = document.querySelector('input[type="submit"][value="로그인"]');
          finalLoginButton && finalLoginButton.click();
        }, 1000); // Adjust timing based on actual page behavior
      }, 1000);
    }, 1000);
  });
}

// Call the function to execute the script
automateLoginProcess();

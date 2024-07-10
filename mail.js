window.addEventListener('load', async function() {
    console.log("Script loaded and executing.");
    await waitForPageSetup();

    if (!await setUsername()) {
        console.log("Username input not found.");
        return;
    }

    if (!await clickSubmitUsername()) {
        console.log("Submit username button not found.");
        return;
    }

    if (!await setPassword()) {
        console.log("Password input not found.");
        return;
    }

    if (!await clickLogin()) {
        console.log("Login button not found.");
        return;
    }

    if (!await clickEmailButton()) {
        console.log("Email button not found.");
        return;
    }

    if (!await setVerificationCode()) {
        console.log("setVerificationCode button not found.");
        return;
    }

    if (!await clickFinalLoginButton()) {
        console.log("clickFinalLoginButton button not found.");
        return;
    }

    // Implement additional steps as needed
});

async function delay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

async function waitForPageSetup() {
    await delay(1000); // Adjust time based on page load speed
}

async function setInputValue(selector, value) {
    const inputField = document.querySelector(selector);
    if (inputField) {
        inputField.value = value;
        inputField.dispatchEvent(new Event('input', { bubbles: true }));
        inputField.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
    }
    return false;
}

async function setUsername() {
    return setInputValue('#IdInput', 'seohyun8646');
}

async function clickSubmitUsername() {
    await delay(500); // Wait for username submission to process
    const submitUsername = document.querySelector('input[type="submit"][value="비밀번호 인증"]');
    if (submitUsername) {
        submitUsername.click();
        return true;
    }
    return false;
}

async function setPassword() {
    await delay(1000); // Wait for password field to become interactive
    return setInputValue('#passwordInput', '!@SHbike21Kai'); // Handle more securely
}

async function clickLogin() {
    await delay(500); // Wait for login button to become interactive
    const loginButton = document.querySelector('input[type="submit"].loginbtn');
    if (loginButton) {
        loginButton.click();
        return true;
    }
    return false;
}

async function clickEmailButton() {
    await delay(500); // Wait for email button to load
    const emailButton = document.querySelector('input[type="submit"]#email');
    if (emailButton) {
        emailButton.click();
        return true;
    }
    return false;
}



async function setVerificationCode() {
    return setInputValue('input[type="password"][placeholder="외부 메일 인증번호 입력"]', '111111');
}


async function clickFinalLoginButton() {
    await delay(500);
    const finalLoginButton = document.querySelector('input[data-v-2b5faeb0][type="submit"][value="로그인"]');
    if (finalLoginButton) {
        finalLoginButton.click();
        return true;
    }
    return false;
}

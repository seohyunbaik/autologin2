
// as you can see, right now the verification code is the placeholder value of 111111. however, as you can see from the background.js "chrome.action.onClicked.addListener(() => {
  console.log("Opening login page and checking for emails...");

  chrome.tabs.create({ url: 'https://iam2.kaist.ac.kr/#/commonLogin' }, (tab) => {
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
      });

      console.log("Starting email check...");

      function handleToken(token) {
          let intervalId = null;
          let timeoutId = setTimeout(() => {
              console.log("Timeout reached, stopping checks.");
              clearInterval(intervalId);
          }, 60000); // Stop after 1 minute

          function checkForEmails() {
              const query = from:iamps@kaist.ac.kr;

              fetch(https://www.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(query)}, {
                  method: 'GET',
                  headers: {
                      'Authorization': Bearer ${token},
                  }
              })
              .then(response => response.json())
              .then(data => {
                  if (data.messages && data.messages.length > 0) {
                      console.log("Email from iamps@kaist.ac.kr found:", data.messages.length, "emails");
                      data.messages.forEach(message => {
                          fetchMessageContent(message.id, token);
                      });
                  } else {
                      console.log("No emails from iamps@kaist.ac.kr found");
                  }
              })
              .catch(error => {
                  console.error("Failed to fetch emails:", error);
              });
          }

          function fetchMessageContent(messageId, token) {
              fetch(https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}, {
                  method: 'GET',
                  headers: {
                      'Authorization': Bearer ${token},
                  }
              })
              .then(response => response.json())
              .then(email => {
                  const parts = email.payload.parts || [];
                  let bodyText = "";
                  if (parts.length) {
                      bodyText = atob(parts[0].body.data.replace(/-/g, '+').replace(/_/g, '/'));
                  } else if (email.payload.body.data) {
                      bodyText = atob(email.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
                  }

                  // Extract 6-digit code from the email content
                  const codeMatch = bodyText.match(/\b\d{6}\b/);
                  if (codeMatch) {
                      console.log("Extracted Code:", codeMatch[0]);
                      clearInterval(intervalId);
                      clearTimeout(timeoutId);
                      chrome.tabs.sendMessage(tab.id, { code: codeMatch[0] });
                  } else {
                      console.log("No 6-digit code found in the email.");
                  }
              })
              .catch(error => {
                  console.error("Failed to fetch email content:", error);
              });
          }

          intervalId = setInterval(checkForEmails, 500); // Check every 0.5 seconds
          checkForEmails(); // Also initiate the first check immediately
      }

      function refreshToken() {
          chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
              if (chrome.runtime.lastError) {
                  console.error("Silent token refresh failed, error:", chrome.runtime.lastError.message);
                  chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
                      if (!chrome.runtime.lastError) {
                          console.log('Interactively refreshed token:', token);
                          handleToken(token);
                      } else {
                          console.error("Interactive token refresh also failed:", chrome.runtime.lastError.message);
                      }
                  });
              } else {
                  console.log('Silently refreshed token:', token);
                  handleToken(token);
              }
          });
      }

      refreshToken();
  });
});", the code is obtained in the background.js. Change this so that the obtained code is used instead of the placeholder value

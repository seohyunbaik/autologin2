chrome.runtime.onInstalled.addListener(() => {
  chrome.identity.getAuthToken({ interactive: true }, function(token) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }

    window.gapi_onload = () => authorize(token);
    loadScript('https://apis.google.com/js/client.js');
  });
});

function loadScript(url) {
  var script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script);
}

function authorize(token) {
  gapi.auth.setToken({ access_token: token });
  gapi.client.load('gmail', 'v1', () => console.log('Gmail API loaded'));
}

function checkInbox() {
  gapi.client.gmail.users.threads.list({
    userId: 'me',
    q: 'from:iamp.kaist.ac.kr'
  }).then(response => {
    if (response.result.threads) {
      getThreadDetails(response.result.threads);
    }
  });
}

function getThreadDetails(threads) {
  var batch = gapi.client.newBatch();
  threads.forEach(thread => {
    batch.add(gapi.client.gmail.users.threads.get({
      userId: 'me',
      id: thread.id
    }));
  });
  batch.then(batchResponse => {
    batchResponse.result.forEach(response => {
      const code = extractCodeFromMessage(response.result.messages[0]);
      if (code) {
        sendEmailWithCode(code);
      }
    });
  });
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
  console.log('Extracted code:', code);
}

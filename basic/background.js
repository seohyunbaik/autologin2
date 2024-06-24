chrome.action.onClicked.addListener(function(tab) {
  chrome.tabs.create({ url: 'https://iam2.kaist.ac.kr/#/commonLogin' });
});

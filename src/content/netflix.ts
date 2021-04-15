chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request == 'title') {
      sendResponse(window.document.querySelector('.video-title')?.textContent)
    }
  }
)
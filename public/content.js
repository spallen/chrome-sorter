// Content script that runs on YouTube pages

console.log("YouTube Watchlist Sorter content script loaded");

// Function to extract watchlist videos from the page
function extractWatchlistVideos() {
  const videos = [];

  // This selector would need to be updated based on YouTube's current DOM structure
  const videoElements = document.querySelectorAll('ytd-playlist-video-renderer');

  videoElements.forEach((element) => {
    try {
      const titleElement = element.querySelector('#video-title');
      const channelElement = element.querySelector('#channel-name');
      const thumbnailElement = element.querySelector('img');
      const durationElement = element.querySelector('.ytd-thumbnail-overlay-time-status-renderer');

      if (titleElement) {
        videos.push({
          id: element.getAttribute('data-video-id') || '',
          title: titleElement.textContent.trim(),
          channel: channelElement ? channelElement.textContent.trim() : '',
          thumbnail: thumbnailElement ? thumbnailElement.src : '',
          duration: durationElement ? durationElement.textContent.trim() : '',
          url: titleElement.href || '',
        });
      }
    } catch (error) {
      console.error('Error extracting video data:', error);
    }
  });

  return videos;
}

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'EXTRACT_WATCHLIST') {
    const videos = extractWatchlistVideos();
    sendResponse({ success: true, videos });
  }

  return true;
});

// Observe DOM changes to detect when watchlist is loaded
const observer = new MutationObserver((mutations) => {
  // Notify that the page has been updated
  chrome.runtime.sendMessage({
    type: 'PAGE_UPDATED',
    url: window.location.href,
  });
});

// Start observing the document
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

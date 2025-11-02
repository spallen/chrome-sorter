// Background service worker for Chrome extension

// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log("YouTube Watchlist Sorter installed");
});

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_WATCHLIST") {
    // In a real implementation, this would fetch the actual watchlist from YouTube
    // For now, we'll return mock data
    sendResponse({ success: true, data: [] });
  }

  if (request.type === "MOVE_TO_PLAYLIST") {
    // Handle moving videos to a playlist
    console.log("Moving videos to playlist:", request.playlistId);
    sendResponse({ success: true });
  }

  return true; // Keep the message channel open for async response
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  // The popup will automatically open due to manifest.json configuration
  console.log("Extension icon clicked");
});

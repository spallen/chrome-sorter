# YouTube Watchlist Sorter - Implementation Approaches

## Approach 1: Content Script Scraping (Current Setup - Recommended)

### How It Works
- Reads YouTube's DOM directly when you're on YouTube pages
- Uses your existing browser session (no separate login needed)
- Extracts video information from the HTML

### Pros
- ✅ No authentication setup required
- ✅ No API quotas or limits
- ✅ Free to use
- ✅ Simpler implementation
- ✅ Works immediately with existing YouTube session
- ✅ Can interact directly with YouTube UI (select videos, move to playlists)

### Cons
- ❌ Breaks if YouTube changes their HTML structure
- ❌ Only works when YouTube page is open
- ❌ Can't access data if not on YouTube
- ❌ Less reliable than API
- ❌ Requires more DOM manipulation

### Implementation Steps
1. Analyze YouTube's current DOM structure for Watch Later playlist
2. Update `content.js` to extract video data (title, thumbnail, dates, etc.)
3. Set up message passing between content script and popup
4. Store extracted data in Chrome storage
5. Implement playlist operations by simulating user interactions

### Authentication
**NONE REQUIRED** - Uses your existing YouTube login session in Chrome

---

## Approach 2: YouTube Data API v3 (Alternative)

### How It Works
- Uses official YouTube Data API v3
- Requires OAuth 2.0 authentication
- Makes API calls to fetch watchlist and manage playlists

### Pros
- ✅ More reliable (official API)
- ✅ Works even when YouTube page isn't open
- ✅ Structured, predictable data format
- ✅ Won't break with UI changes
- ✅ Can access additional metadata

### Cons
- ❌ Requires OAuth 2.0 setup
- ❌ API quotas (10,000 units/day - might be limiting)
- ❌ Requires Google Cloud Console project
- ❌ User must grant permissions
- ❌ More complex implementation
- ❌ Some operations cost many quota units

### Implementation Steps
1. Create project in Google Cloud Console
2. Enable YouTube Data API v3
3. Set up OAuth 2.0 credentials
4. Implement OAuth flow in extension
5. Use API endpoints:
   - `playlistItems.list` - Get Watch Later videos
   - `playlistItems.insert` - Add to playlist
   - `playlistItems.delete` - Remove from playlist

### Authentication Required
```javascript
// OAuth 2.0 flow needed
chrome.identity.getAuthToken({
  interactive: true
}, function(token) {
  // Use token for API calls
});
```

### API Quota Costs
- List playlist items: 1 unit
- Insert playlist item: 50 units
- Delete playlist item: 50 units
- Moving 100 videos = 10,000 units (entire daily quota!)

---

## Recommendation: Hybrid Approach

**Use Approach 1 (Content Script) as the primary method** because:
- No authentication complexity
- No quota limits
- Faster to implement
- Better user experience (no permission prompts)

**Consider adding Approach 2 as an optional feature** for users who:
- Want more reliability
- Don't mind granting API access
- Need offline access to their watchlist

---

## What's Currently Implemented

The scaffolded code is set up for **Approach 1** with:
- `content.js` - Basic content script structure
- `background.js` - Service worker for message handling
- Mock data in the UI to demonstrate functionality

## Next Steps to Make It Functional

1. **Update content.js** to extract real data from YouTube DOM
2. **Implement message passing** between content script and popup
3. **Add Chrome storage** to persist data
4. **Implement playlist operations** via DOM manipulation
5. **Add error handling** for when user isn't logged in

Would you like me to implement the functional version using the content script approach?

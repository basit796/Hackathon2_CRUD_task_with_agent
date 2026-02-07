# Voice Feature Troubleshooting Guide

**Issue**: Microphone button not visible in chat interface

## Diagnostic Steps Added (T059 - COMPLETE)

I've added comprehensive debugging to help identify why the microphone button isn't showing. The changes include:

### 1. Console Logging
The app now logs detailed information to the browser console:
- Web Speech API availability detection
- Browser compatibility checks
- Voice recognition initialization status
- Button click events and state changes

### 2. Visual Debug Indicator
A debug status line now appears above the chat input showing:
- `Voice Support: ✅ Enabled` - Button should be visible
- `Voice Support: ❌ Not Available` - Browser doesn't support Web Speech API

## Testing Instructions

### Step 1: Start the Frontend Server
```bash
cd frontend
npm run dev
```

The server should start on http://localhost:3000

### Step 2: Open Browser Console
1. Open your browser (Chrome, Edge, or Safari recommended)
2. Navigate to http://localhost:3000
3. Press F12 to open Developer Tools
4. Click the "Console" tab

### Step 3: Open Chat Interface
1. Log in to the app
2. Click the floating chat button (bottom-right)
3. Look for console messages starting with `[Voice Debug]`

## Expected Console Output

### ✅ Success (Button Should Appear):
```
[Voice Debug] Checking Web Speech API support...
[Voice Debug] SpeechRecognition available: true
[Voice Debug] window.webkitSpeechRecognition: true
[Voice Debug] ✅ Web Speech API is SUPPORTED - initializing...
[Voice Debug] Recognition initialized successfully
```

**You should see**: 
- Debug line: "Voice Support: ✅ Enabled"
- Microphone button next to the send button

### ❌ Failure (Button Won't Appear):
```
[Voice Debug] Checking Web Speech API support...
[Voice Debug] SpeechRecognition available: false
[Voice Debug] ❌ Web Speech API NOT supported in this browser
[Voice Debug] Browser: [your browser info]
```

**You should see**:
- Debug line: "Voice Support: ❌ Not Available"
- No microphone button (expected behavior)

## Common Issues & Solutions

### Issue 1: Firefox Browser
**Problem**: Firefox doesn't support Web Speech API by default
**Solution**: 
- Use Chrome, Edge, or Safari instead
- OR enable in Firefox: `about:config` → set `media.webspeech.recognition.enable` to `true`

### Issue 2: HTTP (Not HTTPS)
**Problem**: Some browsers require HTTPS for microphone access
**Solution**: 
- localhost should work over HTTP
- Production deployment must use HTTPS

### Issue 3: Frontend Not Reloaded
**Problem**: Changes haven't been picked up by hot-reload
**Solution**:
```bash
# Stop the server (Ctrl+C)
cd frontend
npm run dev
# Hard refresh browser (Ctrl+Shift+R)
```

### Issue 4: Server-Side Rendering
**Problem**: Component tries to access `window` during SSR
**Solution**: Already handled - code checks `typeof window !== 'undefined'`

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Yes | Best support |
| Edge | ✅ Yes | Chromium-based, same as Chrome |
| Safari | ✅ Yes | iOS 14.5+ |
| Firefox | ⚠️ Manual | Requires flag enable |
| Opera | ✅ Yes | Chromium-based |

## Testing the Microphone Button

Once visible, test the button:

1. **Click microphone** → Should turn red and pulse
2. **Speak**: "Create a task called test"
3. **Check input field** → Should show transcribed text
4. **Click send** → Agent should respond

### Console Output During Use:
```
[Voice Debug] toggleVoiceRecognition called
[Voice Debug] Starting recognition...
[Voice Debug] ✅ Recognition started successfully
[Voice Debug] Transcription result: create a task called test
[Voice Debug] Recognition ended
```

## What I Changed (Technical Details)

### File: `frontend/src/components/CopilotChat.tsx`

1. **Enhanced useEffect (lines 29-60)**:
   - Added detailed console logging for API detection
   - Logs both standard and webkit-prefixed APIs
   - Shows browser user agent if unsupported

2. **Debug UI Indicator (line 293)**:
   - Shows real-time voice support status
   - Remove this line after testing if desired

3. **Enhanced toggleVoiceRecognition (lines 152-170)**:
   - Logs every state transition
   - Shows recognition initialization status
   - Better error reporting

## Next Steps

1. **Start frontend**: `cd frontend && npm run dev`
2. **Open browser console**: F12
3. **Report findings**: Share the console output showing what you see
4. **Try different browser**: If current browser doesn't support it

## If Button Still Not Visible

Please provide:
1. Browser name and version
2. Operating system
3. Full console output (copy/paste the [Voice Debug] messages)
4. Screenshot of the debug status line above input field

This information will help identify the exact issue!

---

**Status**: T059 ✅ COMPLETE - Debugging tools added, awaiting user testing results

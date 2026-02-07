# Quick Start Guide: Testing Bonus Features

**Feature**: Multi-Language Support (Urdu) + Voice Commands  
**Version**: 1.0  
**Last Updated**: 2026-02-07

---

## Prerequisites

Before testing the bonus features, ensure you have:

✅ **Backend running** on `http://localhost:8000`  
✅ **Frontend running** on `http://localhost:3000`  
✅ **User account created** (sign up if needed)  
✅ **Chrome, Edge, or Safari browser** (for voice commands)  
✅ **Microphone connected** (for voice testing)  
✅ **Urdu keyboard or input method** (optional, for typing Urdu)

---

## Quick Test: 30 Seconds

### Test 1: Multi-Language Support (Urdu)

1. **Open chat interface** (click the floating chat button)
2. **Type an Urdu message**: `کام بنائیں` (create a task)
3. **Verify**: Agent responds in Urdu
4. **Type an English message**: `show my tasks`
5. **Verify**: Agent responds in English

✅ **Success**: Agent detects and responds in user's language

---

### Test 2: Voice Commands

1. **Click the microphone button** (🎤 icon in chat input)
2. **Grant microphone permission** (browser will prompt)
3. **Speak**: "Create a task to buy groceries tomorrow"
4. **Verify**: Your speech appears as text in the input field
5. **Click send** (or press Enter)
6. **Verify**: Agent processes the task

✅ **Success**: Voice recognition working

---

## Full Test Suite: 5 Minutes

### Scenario 1: English → Urdu Language Switch

**Steps**:
1. Open chat
2. Type: `create a task for tomorrow`
3. Wait for English response
4. Type: `میرے تمام کام دکھائیں` (show my tasks)
5. Wait for Urdu response

**Expected Result**:
- Step 3: English response like "I'll help you create a task..."
- Step 5: Urdu response listing tasks

---

### Scenario 2: Urdu Recurring Task

**Steps**:
1. Type: `ہر پیر کو میٹنگ کا کام بنائیں` (create meeting task every Monday)
2. Wait for response

**Expected Result**:
- Urdu confirmation message
- Task created with `recurrence: "every_monday"`
- Check "All Tasks" tab to verify recurring icon

---

### Scenario 3: Voice Command (English)

**Steps**:
1. Click microphone button
2. Say: "Show me all my completed tasks"
3. Verify transcription in input field
4. Click send

**Expected Result**:
- Accurate transcription
- Agent lists completed tasks
- Response in English

---

### Scenario 4: Voice Command (Urdu)

**Steps**:
1. Click microphone button
2. Say: "کل شام چھ بجے کا کام بنائیں" (create task for tomorrow 6pm)
3. Review transcription
4. Edit if needed
5. Click send

**Expected Result**:
- Urdu transcription (quality may vary by browser)
- Agent responds in Urdu
- Task created with correct deadline

---

### Scenario 5: Mixed Language Conversation

**Steps**:
1. Type: `create a task`
2. Wait for English response
3. Type: `نہیں، کام بنانے کی ضرورت نہیں` (no, don't need to create task)
4. Wait for Urdu response
5. Use voice (English): "Delete all completed tasks"
6. Wait for English response

**Expected Result**:
- Language switches naturally per message
- Voice and text inputs work interchangeably

---

## Browser Compatibility Check

### Chrome / Edge (Recommended)

✅ Full support for all features  
✅ Best Urdu voice recognition  
✅ No configuration needed

**Test**: 
```
1. Open in Chrome/Edge
2. Try all scenarios above
3. All should work perfectly
```

---

### Safari

✅ Full support for all features  
⚠️ Urdu voice may be less accurate  

**Test**:
```
1. Open in Safari
2. Try English voice first
3. Try Urdu voice (may need editing)
4. Text chat works perfectly
```

---

### Firefox

⚠️ Limited voice support (requires flag)  
✅ Text chat (English + Urdu) works perfectly  

**How to Enable Voice in Firefox**:
1. Type `about:config` in address bar
2. Search for `media.webspeech.recognition.enable`
3. Set to `true`
4. Restart Firefox

**Test**:
```
1. Without flag: Microphone button disabled (expected)
2. With flag: Voice recognition works
3. Text chat always works
```

---

## Common Issues & Fixes

### Issue 1: Microphone Button Not Showing

**Cause**: Browser doesn't support Web Speech API

**Fix**:
- Use Chrome, Edge, or Safari
- In Firefox, enable the config flag (see above)
- Text input still works as fallback

---

### Issue 2: "Microphone Permission Denied"

**Cause**: User denied permission or no microphone found

**Fix**:
- Browser settings → Permissions → Allow microphone for localhost:3000
- Check microphone is connected and working
- Text input still works as fallback

---

### Issue 3: Urdu Transcription Inaccurate

**Cause**: Browser's Urdu language model quality varies

**Fix**:
- Edit transcription before sending (this is expected workflow)
- Chrome has best Urdu support (use if possible)
- Ensure Urdu language pack installed on OS

---

### Issue 4: Agent Responds in Wrong Language

**Cause**: Mixed language message, unclear dominant language

**Fix**:
- Send a clear message in desired language
- Language detection works per message (not session-based)
- Next message can be in different language

---

### Issue 5: Chat History Lost on Refresh

**Cause**: Session storage is temporary

**Fix**:
- This is expected behavior (by design)
- Use "Clear History" button to clear intentionally
- Tasks persist in database (not affected)

---

## Performance Benchmarks

### Expected Performance

| Action | Expected Time | Status |
|--------|---------------|--------|
| Voice transcription | <3 seconds | ✅ Normal |
| Language detection | Instant | ✅ Normal |
| Urdu response | 1-2 seconds | ✅ Normal |
| English response | 1-2 seconds | ✅ Normal |
| Button feedback | <200ms | ✅ Normal |

### If Performance is Slow

**Symptoms**: 
- Voice takes >5 seconds to transcribe
- AI responses take >5 seconds

**Possible Causes**:
- Slow internet connection
- Google API rate limits
- Server overload

**Fix**:
- Check network connection
- Verify backend logs for errors
- Wait a moment and retry

---

## Testing Checklist

### Multi-Language Support
- [ ] English message gets English response
- [ ] Urdu message gets Urdu response
- [ ] Language switches between messages
- [ ] Mixed language messages handled
- [ ] Recurring tasks work in Urdu
- [ ] All CRUD operations work in Urdu
- [ ] Urdu text displays correctly (RTL)

### Voice Commands
- [ ] Microphone button visible (supported browser)
- [ ] Permission request on first click
- [ ] Visual feedback while listening (red pulse)
- [ ] English speech transcribed accurately
- [ ] Urdu speech transcribed (some editing OK)
- [ ] Transcription editable before sending
- [ ] Voice + text can be mixed in conversation
- [ ] Error messages clear and helpful

### Error Handling
- [ ] Permission denied: Clear error message
- [ ] Unsupported browser: Button disabled/hidden
- [ ] Silent audio: "No speech detected" message
- [ ] Network error: Error displayed, retry possible
- [ ] Text fallback always available

---

## Advanced Testing

### Test Case: Multilingual Code-Switching

**Input**:
```
"Please میرے tasks دکھائیں tomorrow کے لیے"
(Mixed English-Urdu-English)
```

**Expected**:
- Agent detects dominant language (Urdu in this case)
- Responds primarily in Urdu
- Handles English words appropriately

---

### Test Case: Long Voice Input

**Input**:
Speak for 30+ seconds with a complex task description

**Expected**:
- Browser may auto-stop at ~60 seconds
- Transcription should capture most content
- User can edit to add missed parts

---

### Test Case: Voice in Noisy Environment

**Input**:
Try voice recognition with background noise

**Expected**:
- May fail with "speech not recognized"
- User can retry or use text input
- Error message explains issue

---

## Success Criteria

After testing, you should be able to confirm:

✅ **All 16 success criteria from spec.md are met**  
✅ **No breaking changes to existing functionality**  
✅ **Both features work independently and together**  
✅ **Error handling is graceful and helpful**  
✅ **Performance is acceptable (<3 sec for voice, <2 sec for responses)**  

---

## Next Steps

After successful testing:

1. ✅ **Mark features as validated**
2. 📝 **Document any issues found** (if applicable)
3. 🚀 **Ready for production deployment** (Render + Vercel)
4. 📊 **Monitor usage metrics** post-deployment
5. 🔄 **Gather user feedback** for future improvements

---

## Getting Help

**Documentation**:
- Full details: `/specs/001-bonus-features/plan.md`
- Testing guide: `TESTING_GUIDE.md`
- Feature overview: `BONUS_FEATURES.md`

**Common Commands**:
```bash
# Start backend
cd backend && python -m uvicorn src.main:app --reload

# Start frontend
cd frontend && npm run dev

# Check backend logs
# (Look for language detection and tool execution logs)

# Check browser console
# (Look for Web Speech API errors)
```

---

**Quick Start Status**: ✅ READY - Follow steps above to test both bonus features in under 5 minutes.

---

## One-Command Test Script

For the impatient, here's a rapid test sequence:

```
1. Click chat bubble
2. Type: "کام بنائیں" → Verify Urdu response
3. Click mic 🎤 → Say "show my tasks" → Verify transcription
4. Send → Verify English response
5. Done! ✅
```

**Time**: 30 seconds  
**Coverage**: Both features validated

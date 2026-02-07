# 🧪 Bonus Features Testing Guide

This guide provides step-by-step instructions to test both bonus features.

---

## 🚀 Prerequisites

1. **Backend Running:** http://127.0.0.1:8000
2. **Frontend Running:** http://localhost:3000
3. **Browser:** Chrome, Edge, or Safari (for voice support)
4. **Microphone:** Required for voice commands testing

---

## ✅ Test 1: Multi-Language Support (Urdu) - +100 Points

### Test Cases

#### Test 1.1: English Communication ✓
**Steps:**
1. Open http://localhost:3000
2. Login to your account
3. Open the AI chat popup (click the message icon)
4. Send message: "Show me all my tasks"

**Expected Result:**
- Agent responds in English
- Lists tasks or says "You don't have any tasks yet"

---

#### Test 1.2: Urdu Communication ✓
**Steps:**
1. In the chat, send message: "مجھے میرے تمام کام دکھائیں"
   (Translation: "Show me all my tasks")

**Expected Result:**
- Agent responds in Urdu
- Response starts with "آپ کے" or similar Urdu text

---

#### Test 1.3: Create Task in Urdu ✓
**Steps:**
1. Send message: "کل کے لیے ایک کام بنائیں"
   (Translation: "Create a task for tomorrow")
2. Agent will ask for details
3. Respond: "گروسری خریدنا"
   (Translation: "Buy groceries")

**Expected Result:**
- Agent understands and creates task
- Responds in Urdu throughout the conversation
- Task appears in your task list

---

#### Test 1.4: Recurring Task in Urdu ✓
**Steps:**
1. Send message: "ہر پیر کو میٹنگ کا کام بنائیں"
   (Translation: "Create a meeting task every Monday")

**Expected Result:**
- Agent detects "ہر" (every) keyword
- Creates recurring task with weekly frequency
- Responds in Urdu

---

#### Test 1.5: Code-Switching ✓
**Steps:**
1. Send message in English: "How many tasks do I have?"
2. Switch to Urdu: "ان میں سے کتنے مکمل ہیں؟"
   (Translation: "How many of them are complete?")

**Expected Result:**
- Agent responds in English for English message
- Agent responds in Urdu for Urdu message
- Maintains conversation context

---

## ✅ Test 2: Voice Commands - +200 Points

### Test Cases

#### Test 2.1: Voice Button Visibility ✓
**Steps:**
1. Open the AI chat popup
2. Look at the input area

**Expected Result:**
- Microphone icon (🎤) visible next to send button
- Button is clickable and not disabled

---

#### Test 2.2: Start Voice Recognition ✓
**Steps:**
1. Click the microphone button
2. Browser may ask for microphone permission (Allow it)

**Expected Result:**
- Button turns RED and starts pulsing
- Input placeholder changes to "Listening..."
- Input field becomes disabled

---

#### Test 2.3: Voice to Text Conversion ✓
**Steps:**
1. With microphone active (red pulsing), speak clearly:
   "Create a task for tomorrow"
2. Stop speaking and wait 2-3 seconds

**Expected Result:**
- Recording stops automatically
- Text appears in input field: "Create a task for tomorrow"
- Button returns to normal gray state
- Input field becomes enabled

---

#### Test 2.4: Manual Stop ✓
**Steps:**
1. Click microphone button to start
2. Start speaking
3. Click the red microphone button again (🎤🚫)

**Expected Result:**
- Recording stops immediately
- Button returns to gray
- Any recognized text appears in input field

---

#### Test 2.5: Send Voice Message ✓
**Steps:**
1. Use voice to say: "Show me my tasks"
2. Wait for transcription
3. Click send button or press Enter

**Expected Result:**
- Message sends successfully
- Agent responds to your voice command
- Works exactly like typed message

---

#### Test 2.6: Voice + Editing ✓
**Steps:**
1. Use voice to say: "Create a task"
2. Wait for transcription
3. Edit text to: "Create a task for next week"
4. Send

**Expected Result:**
- Can edit transcribed text normally
- Sends edited version
- Agent processes edited message

---

#### Test 2.7: Urdu Voice Input ✓
**Steps:**
1. Click microphone
2. Speak in Urdu: "میرے کام دکھائیں"
   (Pronunciation: "Meray kaam dikhayen")

**Expected Result:**
- Transcribes Urdu speech (if browser supports)
- Agent responds in Urdu
- Full Urdu language support

---

#### Test 2.8: Error Handling ✓
**Steps:**
1. Open in Firefox or browser without voice support

**Expected Result:**
- Microphone button is hidden
- No errors in console
- Chat still works normally via typing

---

## 🎯 Success Criteria

### Multi-Language Support (Urdu)
- ✅ Agent detects language automatically
- ✅ Responds in same language as user
- ✅ Supports both English and Urdu
- ✅ Handles recurring tasks in Urdu
- ✅ Maintains context across languages

### Voice Commands
- ✅ Microphone button visible and functional
- ✅ Visual feedback (red pulse) when listening
- ✅ Speech-to-text conversion works
- ✅ Manual stop works
- ✅ Transcribed text editable
- ✅ Graceful fallback on unsupported browsers
- ✅ Works with both English and Urdu speech

---

## 🐛 Known Issues & Limitations

### Multi-Language Support
1. **Translation Quality:** Depends on Gemini AI's language understanding
2. **Mixed Scripts:** May have formatting issues with mixed English/Urdu
3. **Right-to-Left:** Urdu text displays left-to-right in chat (browser default)

### Voice Commands
1. **Browser Support:** Firefox requires manual flag enabling
2. **Microphone Permission:** Must grant access on first use
3. **Background Noise:** May affect transcription accuracy
4. **Urdu Speech:** Recognition quality varies by browser
5. **Accent Sensitivity:** Works best with clear pronunciation

---

## 📊 Test Results Template

### Tester Information
- **Name:** _________________
- **Date:** _________________
- **Browser:** _________________
- **Microphone:** Yes / No

### Multi-Language Support Results
| Test Case | Pass | Fail | Notes |
|-----------|------|------|-------|
| 1.1 English Communication | ☐ | ☐ | |
| 1.2 Urdu Communication | ☐ | ☐ | |
| 1.3 Create Task in Urdu | ☐ | ☐ | |
| 1.4 Recurring Task in Urdu | ☐ | ☐ | |
| 1.5 Code-Switching | ☐ | ☐ | |

### Voice Commands Results
| Test Case | Pass | Fail | Notes |
|-----------|------|------|-------|
| 2.1 Voice Button Visibility | ☐ | ☐ | |
| 2.2 Start Voice Recognition | ☐ | ☐ | |
| 2.3 Voice to Text | ☐ | ☐ | |
| 2.4 Manual Stop | ☐ | ☐ | |
| 2.5 Send Voice Message | ☐ | ☐ | |
| 2.6 Voice + Editing | ☐ | ☐ | |
| 2.7 Urdu Voice Input | ☐ | ☐ | |
| 2.8 Error Handling | ☐ | ☐ | |

---

## 🎥 Testing Demo Script

### Quick Demo (5 minutes)

```bash
# 1. Show English conversation
User: "Create a task for tomorrow"
Agent: [Creates task in English]

# 2. Show Urdu conversation
User: "کل کے لیے ایک کام بنائیں"
Agent: [Creates task in Urdu]

# 3. Show Voice Commands
[Click mic button]
User: [Speaks] "Show me all my tasks"
[Text appears, send]
Agent: [Lists tasks]

# 4. Show Voice + Urdu
[Click mic button]
User: [Speaks in Urdu] "میرے کام دکھائیں"
[Text appears, send]
Agent: [Responds in Urdu]
```

---

## ✅ Sign-Off

**Bonus Features Status:**
- [ ] Multi-Language Support (Urdu) - Fully Tested
- [ ] Voice Commands - Fully Tested
- [ ] All Test Cases Pass
- [ ] No Critical Bugs
- [ ] Ready for Production

**Tested By:** _________________
**Date:** _________________
**Signature:** _________________

---

## 🚀 Deployment Checklist

Before deploying to production:
- [ ] All tests pass
- [ ] Documentation complete
- [ ] No console errors
- [ ] Cross-browser tested
- [ ] Mobile responsive (voice may not work)
- [ ] Environment variables set
- [ ] Database migrations applied
- [ ] Backend health check passing
- [ ] Frontend builds successfully

---

## 📞 Support

If you encounter any issues during testing:
1. Check browser console for errors
2. Verify microphone permissions
3. Ensure backend is running on port 8000
4. Ensure frontend is running on port 3000
5. Try in Chrome/Edge if Firefox has issues

**Report bugs with:**
- Browser version
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)

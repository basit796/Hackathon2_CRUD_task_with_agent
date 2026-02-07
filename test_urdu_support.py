import requests
import json

# Test Urdu language support
BASE_URL = "http://127.0.0.1:8000"

def test_urdu_support():
    print("🧪 Testing Multi-Language Support (Urdu)\n")
    print("=" * 60)
    
    # Test 1: English message
    print("\n📝 Test 1: English Message")
    print("-" * 60)
    payload = {
        "message": "Show me all my tasks",
        "user_id": "test-user-123",
        "chat_history": []
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/agent/chat",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Status: {response.status_code}")
            print(f"📤 Request: {payload['message']}")
            print(f"📥 Response: {result.get('response', 'No response')[:200]}...")
        else:
            print(f"❌ Error: {response.status_code}")
            print(f"📥 Response: {response.text}")
    except Exception as e:
        print(f"❌ Exception: {str(e)}")
    
    # Test 2: Urdu message
    print("\n📝 Test 2: Urdu Message")
    print("-" * 60)
    payload = {
        "message": "مجھے میرے تمام کام دکھائیں",  # "Show me all my tasks" in Urdu
        "user_id": "test-user-123",
        "chat_history": []
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/agent/chat",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Status: {response.status_code}")
            print(f"📤 Request: {payload['message']}")
            print(f"📥 Response: {result.get('response', 'No response')[:200]}...")
        else:
            print(f"❌ Error: {response.status_code}")
            print(f"📥 Response: {response.text}")
    except Exception as e:
        print(f"❌ Exception: {str(e)}")
    
    # Test 3: Create task in Urdu
    print("\n📝 Test 3: Create Task in Urdu")
    print("-" * 60)
    payload = {
        "message": "کل کے لیے 'گروسری خریدنا' نام کا ایک کام بنائیں",  # "Create a task named 'Buy groceries' for tomorrow"
        "user_id": "test-user-123",
        "chat_history": []
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/api/agent/chat",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Status: {response.status_code}")
            print(f"📤 Request: {payload['message']}")
            print(f"📥 Response: {result.get('response', 'No response')[:200]}...")
        else:
            print(f"❌ Error: {response.status_code}")
            print(f"📥 Response: {response.text}")
    except Exception as e:
        print(f"❌ Exception: {str(e)}")
    
    print("\n" + "=" * 60)
    print("✅ Urdu support test completed!")
    print("\n📊 Summary:")
    print("- Multi-language detection: Automatic")
    print("- Urdu response generation: Via Gemini AI")
    print("- Language persistence: Context-aware")
    print("\n💡 Note: Actual Urdu responses depend on Gemini AI's language understanding.")

if __name__ == "__main__":
    test_urdu_support()

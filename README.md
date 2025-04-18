# 🃏 Pocket Poker Pal Client App

**Pocket Poker Pal** is a mobile AI assistant designed to help poker players quickly get answers to rules and best practices — using either voice or text input. It uses industry-standard poker rulebooks and retrieval-augmented generation (RAG) to deliver reliable answers in real-time.

## 📱 Features

- 🎙️ **Voice and Text Chat**: Ask poker questions using voice-to-text or manual typing
- 🧠 **AI-Powered Responses**: Backed by OpenAI and Pinecone for semantic search over rulebooks
- 🎯 **Trained on Official Rulebooks**: Including TDA and Seminole rules
- 💬 **Typing and Listening Feedback**: Real-time typing and recording status indicators
- 🔄 **Reset Conversation**: One-tap to start fresh
- ✨ **Clean, Dark Mode UI**: Minimal and mobile-friendly design
- 📦 **Expo + React Native** with EAS Build support for Android deployment

## 🚀 Tech Stack

| Layer         | Tech                               |
|---------------|------------------------------------|
| Frontend      | React Native + Expo Router         |
| Voice Input   | `@react-native-voice/voice`        |
| Backend       | Java Spring Boot                   |
| AI / Search   | OpenAI API + Pinecone Vector DB    |
| Styling       | Tailwind-style classes (custom)    |
| Deployment    | Android Studio / EAS / Play Store  |

## 🛠️ Getting Started

### 1. Install Dependencies

```bash
npm install
npm install -D react-native-dotenv
npm i @react-native-voice/voice --save
npx expo install expo
npx expo install expo-av
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

### 2. Start Development Server

```bash
npx expo start
```

### 3. Create .env File For Backend URL

```env
API_BASE_URL=https://your-deployed-backend-url.com
```

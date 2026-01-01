const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// IMPORTANT: Replace with the actual path to your service account key file
// You can download this file from your Firebase project settings.
const serviceAccount = require("./serviceAccountKey.json"); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://global-trotter-6p38a-default-rtdb.firebaseio.com"
});

// IMPORTANT: Set your API key as an environment variable
// You can do this in the Firebase console:
// `firebase functions:config:set gemini.key="YOUR_API_KEY"`
const genAI = new GoogleGenerativeAI(functions.config().gemini.key);

// Example Cloud Function:
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.generateChatResponse = functions.https.onCall(async (data, context) => {
  // Ensure the user is authenticated
  // if (!context.auth) {
  //   throw new functions.https.HttpsError(
  //     'unauthenticated',
  //     'The function must be called while authenticated.'
  //   );
  // }

  const userMessage = data.message;
  if (!userMessage) {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with one argument "message" containing the message to be sent.'
    );
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();
    return { response: text };
  } catch (error) {
    console.error("Error generating chat response:", error);
    throw new functions.https.HttpsError(
      'internal',
      'An error occurred while generating the chat response.'
    );
  }
});

import firebaseAdmin from "firebase-admin";

// initialise service account for firebase for Mocking
var serviceAccount = require("./../../firebase-service.json");
firebaseAdmin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

export async function getCustomToken(address, nonce, signature) {
	// TODO verify nonce signature

	// MOCK get custom token rn
	return firebaseAdmin.auth().createCustomToken(address);
}

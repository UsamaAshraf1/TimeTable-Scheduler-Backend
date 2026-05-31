const fs = require('fs')
const path = require('path')

const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json')

const loadFirebaseCredentials = () => {
	if (process.env.FIREBASE_SERVICE_ACCOUNT) {
		const credentials = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)

		if (credentials.private_key) {
			credentials.private_key = credentials.private_key.replace(/\\n/g, '\n')
		}

		return credentials
	}

	if (
		process.env.FIREBASE_PROJECT_ID &&
		process.env.FIREBASE_CLIENT_EMAIL &&
		process.env.FIREBASE_PRIVATE_KEY
	) {
		return {
			project_id: process.env.FIREBASE_PROJECT_ID,
			client_email: process.env.FIREBASE_CLIENT_EMAIL,
			private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		}
	}

	if (fs.existsSync(serviceAccountPath)) {
		return require(serviceAccountPath)
	}

	throw new Error(
		'Firebase credentials are missing. Set FIREBASE_SERVICE_ACCOUNT or FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.'
	)
}

module.exports = loadFirebaseCredentials

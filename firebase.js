
const admin = require('firebase-admin');
require('dotenv').config()

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)),
    databaseURL: 'https://planb-52462.firebaseio.com/'
});

const db = admin.database();

async function getUserById(id) {
    const snapshot = await db.ref("users/" + id).once("value");
    return snapshot.val();
}

function onSessionCreated(callback) {
    let newItems = false

    db.ref("bandSpace/-MRaX4WC3FCPJL_NDvnr/sessions")
        .on("child_added", async (childSnapshot, prevChildKey) => {
            if (!newItems) {
                return;
            }
            const session = childSnapshot.val();
            const user = await getUserById(session.proposer);
            callback(session, user);
        });

    db.ref('bandSpace/-MRaX4WC3FCPJL_NDvnr/sessions').once('value', () => {
        newItems = true
    });
}

exports.onSessionCreated = onSessionCreated;

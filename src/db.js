import env from "./env";
import Firebase from "./utils/firebase";

//  About these CREDENTIALS;
//  You can get these credentials by generating a private key in your firebase console > project settings > service accounts.
//   | GO here: https://console.firebase.google.com/u/1/project/showjsonbot/settings/serviceaccounts/adminsdk
//  which comes with all the data you need to setup this bot. Get values of PROJECT_ID, DATABASE_ID, PRIVATE_KEY, and CLIENT_ID,
//  and set them in the Environmental variables on key values, respectively.

// Creating the database;
const db = new Firebase();

if (env.DB_ENABLE === true) {
  if (
    process.env.PROJECT_ID === undefined ||
    process.env.PRIVATE_KEY === undefined ||
    process.env.CLIENT_EMAIL === undefined ||
    process.env.DB_URL === undefined
  ) {
    db.db = false;
    console.log(
      "ENV values required for Firebase Database are not valid. Disabled the database."
    );
  } else {
    db.db = true;
    db.databaseURL = process.env.DB_URL;
    db.credential = {
      projectId: process.env.PROJECT_ID,
      privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
      clientEmail: process.env.CLIENT_EMAIL,
    };
    // Initializing the connection to the database;
    db.initialize();
  }
}

export default db;

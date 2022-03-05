import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA57IN7AD50-2C4t0BYY-JxRveUlZSrUw4",
  authDomain: "jerwin-project.firebaseapp.com",
  projectId: "jerwin-project",
  storageBucket: "jerwin-project.appspot.com",
  messagingSenderId: "36125608300",
  appId: "1:36125608300:web:b9187f1fbf044d2f74cb49",
};

// initialze firebase app
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore(app);
// collection ref
const todosRef = collection(db, "todos");

export default db;
export { todosRef };

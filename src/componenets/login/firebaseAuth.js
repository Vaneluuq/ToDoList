import  { fb, db, google } from '../initializers/firebase'


//firebase auth 

const handleLogout = () => fb.auth().signOut();


const loginUser = (email, password) => fb.auth().signInWithEmailAndPassword(email, password);

const loginWithGoogle = () => fb.auth().signInWithPopup(google)

const createUser = (email, password) => fb.auth().createUserWithEmailAndPassword(email, password);

const authListener = (callback) => fb.auth().onAuthStateChanged(callback);

// const listenToAuthState = (onLogIn, onLogOut, callback) => 
// fb.auth().onAuthStateChanged(callback)



// firestore 

const createTasks =(notesObj)=> db.collection('tasks').doc().set(notesObj);
const createPhrases =(notesObj)=> db.collection('phrases').doc().set(notesObj);


const getTasks = (callback) => db.collection('tasks').onSnapshot(callback);
const getPhrases = (callback) => db.collection('phrases').onSnapshot(callback);


const editingTask = (id, notesObj) => db.collection('tasks').doc(id).update(notesObj);

const deleteTask = (id) => db.collection('tasks').doc(id).delete();
const deletePhrase = (id) => db.collection('phrases').doc(id).delete();

const getIdTask =(id) => db.collection("tasks").doc(id).get();


export { handleLogout, loginUser, authListener, createUser,
getTasks, createTasks, editingTask , deleteTask, getIdTask, createPhrases, getPhrases, deletePhrase, loginWithGoogle}

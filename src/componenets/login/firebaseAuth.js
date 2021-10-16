import  { fb, db } from '../initializers/firebase'

//firebase auth 

const handleLogout = () => fb.auth().signOut();

const loginUser = (email, password) => fb.auth().signInWithEmailAndPassword(email, password);

const createUser = (email, password) => fb.auth().createUserWithEmailAndPassword(email, password);

const authListener = (callback) => fb.auth().onAuthStateChanged(callback);

// const listenToAuthState = (onLogIn, onLogOut, callback) => 
// fb.auth().onAuthStateChanged(callback)



// firestore 

const createTasks =(notesObj)=> db.collection('tasks').doc().set(notesObj);
const createPhrases =(notesObj)=> db.collection('phrases').doc().set(notesObj);

const getTasks = (callback) => db.collection('tasks').onSnapshot(callback);


const editingTask = (id, notesObj) => db.collection('tasks').doc(id).update(notesObj);

const deleteTask = (id) => db.collection('tasks').doc(id).delete();

const getIdTask =(id) => db.collection("tasks").doc(id).get();


export { handleLogout, loginUser, authListener, createUser,
getTasks, createTasks, editingTask , deleteTask, getIdTask, createPhrases}

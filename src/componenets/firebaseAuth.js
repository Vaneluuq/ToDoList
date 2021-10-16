import  { fb } from '../firebase'

//firebase auth 

const handleLogout = () => fb.auth().signOut() 

const loginUser = (email, password) => fb.auth().signInWithEmailAndPassword(email, password)

const createUser = (email, password) => fb.auth().createUserWithEmailAndPassword(email, password)

const authListener = (callback) => fb.auth().onAuthStateChanged(callback)

const listenToAuthState = (onLogIn, onLogOut, callback) => 
fb.auth().onAuthStateChanged(callback)



export { handleLogout, loginUser, authListener, createUser, listenToAuthState}
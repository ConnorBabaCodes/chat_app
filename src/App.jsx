import React from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';




import { useAuthState } from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {getAuth, signInAnonymously} from 'firebase/auth';



firebase.initializeApp ({
  apiKey: "AIzaSyC_9SoTNzMscQB51k6wxrsVKdbxCjlvhow",
  authDomain: "chatapp-13c12.firebaseapp.com",
  projectId: "chatapp-13c12",
  storageBucket: "chatapp-13c12.appspot.com",
  messagingSenderId: "153525367282",
  appId: "1:153525367282:web:f4e38e3fa2ff1b08f67b6b"
})

const auth = firebase.auth();
const firestore = firebase.firestore();



function App() {
 

const [user] = useAuthState(auth);


  return (
    <div className="App">
      <header>
        <h1>React Chat Room</h1>
      <SignOut />
      </header>

      <section>
      { user ? <ChatRoom /> : <SignIn />}
      
      </section>

    </div>
  )
}

function SignIn() {

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  function guestSignIn() {
signInAnonymously(auth)
  .then(() => {
   const provider = new firebase.auth();
  })
  }

  return (
    <div>
      <h1 className="welcomeText">Welcome to React Chat Room</h1>
      <h2 className="welcomeText">This is a single room chatroom app built in React with a firebase backend.</h2>
    <button onClick={signInWithGoogle}>Sign in with Google</button>
    <div>
    <button onClick={guestSignIn} className="guest">Continue as guest</button>
    </div>
    
    </div>
  )
  
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

  const dummy = React.useRef();

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = React.useState('');

  const sendMessage = async(e) => {

    e.preventDefault();
    const{uid, photoURL} = auth.currentUser;
    
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })
    setFormValue('');

    dummy.current.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      
      <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
    <button type="submit">Send</button>
      </form>
    
    </>
  )
}

function ChatMessage(props) {
  const {text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved'
  return (
  <div className={`message ${messageClass}`}>
    <img src={photoURL ? photoURL : 'dist/assets/logo.32ebf3e6.png'} />
    <p>{text}</p>
  </div>
  )
}

export default App

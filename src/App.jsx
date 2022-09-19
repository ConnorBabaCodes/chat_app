import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';




import { useAuthState } from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';



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

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
  
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField: 'id'});
  return (
    <>
    <h1>chatroom test</h1>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>
    
    </>
  )
}

function ChatMessage(props) {
  const {text, uid } = props.message;

  return <p>{text}</p>
}

export default App

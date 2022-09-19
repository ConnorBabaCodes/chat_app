import { useState } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';


firebase.initializeApp ({

})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
 

  return (
    <div className="App">
      test
      <h1>test</h1>
    </div>
  )
}

export default App

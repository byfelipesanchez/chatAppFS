import React, { useRef, useState } from 'react';
import './App.css';

// import bird1 from './bird1.png'; // with import
import GithubCorner from "react-github-corner";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBQdi16SG0I3FvjuxZfugSb6ehzkwl_a0k",
  authDomain: "chatappfs-d67d2.firebaseapp.com",
  projectId: "chatappfs-d67d2",
  storageBucket: "chatappfs-d67d2.appspot.com",
  messagingSenderId: "1083313394887",
  appId: "1:1083313394887:web:1e4efd455819853a7adae2",
  measurementId: "G-3ZB01VMQL4"})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();
// const delet = db.collection("messages").delete().then(() => {
//   console.log("Document successfully deleted!");
// }).catch((error) => {
//   console.error("Error removing document: ", error);
// });


function App() {

  
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1> Let's Chat! 📌 </h1>
        <SignOut />
        <GithubCorner
                    href="https://github.com/byfelipesanchez?tab=repositories"
                    bannerColor="#64CEAA"
                    octoColor="#fff"
                    width={80}
                    height={80}
                    direction="right"
                />
        {/* <DeleteAll /> */}
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  // const signInWithGithub = () => {
  //   const provider = new firebase.auth.GithubAuthProvider();
  //   auth.signInWithPopup(provider);
  // }

  return (
    <>

      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <div>
        <br />
        <hr  />  
        <br />
      </div>
      <p className='p-intro'>Chat App FS</p>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />        <br />
        <br />
        <br />
        <br />
        <p className='p-intro2'>@byfelipesanchez on GitHub</p>
         </div>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

// function DeleteAll(){
//   return delet() && (
//     <button className='delete-messages' onClick={() => delet.DeleteAll()}> Delete </button>
//   )
// }

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  // const deleteMessages = authenticated &&

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type here..." />

      <button type="submit"  disabled={!formValue}>🚀</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p className='p-class'>{text}</p>
    </div>
  </>)
}


export default App;
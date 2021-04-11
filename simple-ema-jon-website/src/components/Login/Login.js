import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { userContext } from "../../App";
import {createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword} from "./LoginManager"


const Login = () => {
    
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
      isSignedIn: false,
      name: '',
      photo: '',
      email: ''
  
    })

    initializeLoginFramework()

    const googleSignIn = () => {
        handleGoogleSignIn()
        .then(res => {
            setResponse(res, true)
        })
    }

    const signOut = () => {
        handleSignOut()
        .then(res => {
            setResponse(res, false)
        })
    }
    
    const fbSignIn = () => {
        handleFbSignIn()
        .then(res => {
            setResponse(res, true)
        })
    }

    const setResponse = (res, redirect) => {
            setUser(res);
            setLoggedInUser(res);
            if(redirect) {
                history.replace(from);
            }
    }
    const handleBlur = (e) => {
      let isFormValid = true;
      if (e.target.name === "email") {
        const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
        isFormValid = isEmailValid;
      }
      if (e.target.name === "password") {
        const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(e.target.value);
        isFormValid = isPasswordValid;
      }
      if (isFormValid) {
        const newUser = { ...user };
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
      }
    }

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
  
    const handleSubmit = (e) => {
      if (newUser && user.email && user.password) {
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
            setResponse(res, true)
        })
      }
  
      if (!newUser && user.email && user.password) {
        signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
            setResponse(res, true)
        })
      }
  
      e.preventDefault();
    }
  
    return (
      <div style={{textAlign:'center'}}>
        {
          user.isSignedIn ? <button onClick={signOut}>Sign out</button> : <button onClick={googleSignIn}>Sign in</button>
        }
        {
          user.isSignedIn && <div>
            <p>Welcome {user.name}</p>
            <p>Your email : {user.email}</p>
            <img src={user.photo} alt="" />
          </div>
        }
        <br />
        <button onClick={fbSignIn}>Sign in using Facebook</button>
        <br />
        <br />
        <form>
          <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
          <label htmlFor="newUser">Are you new?</label>
          <br />
          {
            newUser && <input type="text" name="name" id="" onBlur={handleBlur} placeholder="your name" />
          }
          <br />
          <input type="text" name="email" id="" onBlur={handleBlur} placeholder="Your email" required />
          <br />
          <input type="password" name="password" id="" onBlur={handleBlur} placeholder="Your password" required />
          <br />
          <input type="submit" onClick={handleSubmit} value={newUser ? "Sign up" : "Sign in"} />
        </form>
        <p style={{ color: 'red' }}>{user.error}</p>
        {
          user.success &&
          <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'login'} Successfully!</p>
        }
      </div>
    );
  }

export default Login;
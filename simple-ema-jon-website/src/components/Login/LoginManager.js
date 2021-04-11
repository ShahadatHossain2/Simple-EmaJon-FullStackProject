import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./Firebase.config";

export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
      }
}


export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
      .then(result => {
        const { displayName, email, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
        }

        steUserToken();

        return signedInUser;
      })
      .catch(err => {
        console.log(err);
      })
  }

  const steUserToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      sessionStorage.setItem('token', idToken);
    })
    .catch(function(error) {
      // Handle error
    });
  }

 export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        user.success = true;
        return user;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage);
      });
  }

 export const handleSignOut = () => {
    return firebase.auth().signOut()
      .then(result => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: '',
          error: '',
          success: false
        }

        return signedOutUser;
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUser(name);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      const newUserInfo = {};
      newUserInfo.error = errorMessage;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      const newUserInfo = {};
      newUserInfo.error = errorMessage;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }
 
 
  const updateUser = (name) => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    })
      .then(function () {
        console.log("Updated name successfully")
      })
      .catch(function (error) {
        console.log(error)
      });
  }
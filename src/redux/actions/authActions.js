import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleAuthProvider } from "../../firebase";
import { getUserById, addUserToDB } from "../../services/firebase";
import { ActionTypes } from "../constants/action-types";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { renameFile } from "../../helper/utils";

//register user
const registerStart = () => ({ type: ActionTypes.REGISTER_START });
const registerSuccess = (user) => ({
  type: ActionTypes.REGISTER_SUCCESS,
  payload: user,
});
const registerFail = (error) => ({
  type: ActionTypes.REGISTER_FAIL,
  payload: error,
});

//login user
const loginStart = () => ({ type: ActionTypes.LOGIN_START });
const loginSuccess = (user) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload: user,
});
const loginFail = (error) => ({
  type: ActionTypes.LOGIN_FAIL,
  payload: error,
});

//logout user
const logoutStart = () => ({ type: ActionTypes.LOGOUT_START });
const logoutSuccess = () => ({
  type: ActionTypes.LOGOUT_SUCCESS,
});
const logoutFail = (error) => ({
  type: ActionTypes.LOGOUT_FAIL,
  payload: error,
});

//set user
export const setUser = (user) => ({
  type: ActionTypes.SET_USER,
  payload: user,
});

//google login
const googleLoginStart = () => ({ type: ActionTypes.GOOGLE_LOGIN_START });
const googleLoginSuccess = (user) => ({
  type: ActionTypes.GOOGLE_LOGIN_SUCCESS,
  payload: user,
});
const googleLoginFail = (error) => ({
  type: ActionTypes.GOOGLE_LOGIN_FAIL,
  payload: error,
});

//forgot password
const forgotPasswordStart = () => ({ type: ActionTypes.FORGOT_PASSWORD_START });
const forgotPasswordSuccess = () => ({
  type: ActionTypes.FORGOT_PASSWORD_SUCCESS,
});
const forgotPasswordFail = (error) => ({
  type: ActionTypes.FORGOT_PASSWORD_FAIL,
  payload: error,
});

//initiate
export const registerInitiate =
  (email, password, displayName, file) => (dispatch) => {
    dispatch(registerStart());

    const metadata = { contentType: file.type };
    const storageRef = ref(storage, "users/" + renameFile(file.name));
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        if (error) {
          dispatch(registerFail("Not able to upload image!!"));
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          if (downloadURL) {
            createUserWithEmailAndPassword(auth, email, password)
              .then(async ({ user }) => {
                await updateProfile(auth.currentUser, {
                  displayName,
                  photoURL: downloadURL,
                });

                const docRef = doc(db, "users", user.uid);
                const userRef = await setDoc(docRef, {
                  custom_id: user.uid,
                  name: user.displayName,
                  email: user.email,
                  photoURL: downloadURL,
                  followers: [],
                  following: [],
                  createdAt: serverTimestamp(),
                });
                console.log("Document written with ID: ", userRef.id);

                dispatch(registerSuccess(user));
              })
              .catch((error) => {
                dispatch(registerFail(error.message));
              });
          }
        });
      }
    );
  };

export const loginInitiate = (email, password) => (dispatch) => {
  dispatch(loginStart());
  signInWithEmailAndPassword(auth, email, password)
    .then(async ({ user }) => {
      dispatch(loginSuccess(user));
    })
    .catch((error) => {
      dispatch(loginFail(error.message));
    });
};

export const logoutInitiate = () => (dispatch) => {
  dispatch(logoutStart());
  signOut(auth)
    .then(() => dispatch(logoutSuccess()))
    .catch((error) => {
      dispatch(logoutFail(error.message));
    });
};

export const googleSignInitiate = () => (dispatch) => {
  dispatch(googleLoginStart());
  signInWithPopup(auth, googleAuthProvider)
    .then(({ user }) => {
      getUserById(user.uid).then((isFound) => {
        if (!isFound) {
          addUserToDB(user);
        }
      });
      dispatch(googleLoginSuccess(user));
    })
    .catch((error) => {
      dispatch(googleLoginFail(error.message));
    });
};

export const forgotPasswordInitiate = (email) => (dispatch) => {
  dispatch(forgotPasswordStart());
  sendPasswordResetEmail(auth, email)
    .then(() => dispatch(forgotPasswordSuccess()))
    .catch((error) => {
      dispatch(forgotPasswordFail(error.message));
    });
};

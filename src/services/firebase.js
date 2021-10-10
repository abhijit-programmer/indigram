import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { renameFile } from "../helper/utils";
import {
  addPostStart,
  addPostSuccess,
  addPostFail,
} from "../redux/actions/postActions";

//save user
export const addUserToDB = async (user) => {
  const docRef = doc(db, "users", user.uid);
  const userRef = await setDoc(docRef, {
    custom_id: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    followers: [],
    following: [],
    createdAt: serverTimestamp(),
  });
  return userRef;
};

//get user by id
export const getUserById = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
};

//upload file
export const addPost = (payload, dispatch) => {
  const { file, caption, user } = payload;
  const metadata = {
    contentType: file.type,
  };
  const storageRef = ref(storage, "posts/" + renameFile(file.name));
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      dispatch(addPostStart());
    },
    (error) => {
      if (error) {
        dispatch(addPostFail("Not able to upload file!!"));
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log("File available at", downloadURL);
        if (downloadURL) {
          const docRef = await addDoc(collection(db, "posts"), {
            caption,
            user,
            imageURL: downloadURL,
            likes: [],
            comments: [],
            createdAt: serverTimestamp(),
          });
          console.log("Document written with ID: ", docRef.id);
          if (docRef.id) dispatch(addPostSuccess());
        }
      });
    }
  );
};

//handle like or unlike
export const handleLike = async (userId, postId, likesList) => {
  const docRef = doc(db, "posts", postId);
  console.log(userId, postId, likesList);

  if (likesList.includes(userId)) {
    await updateDoc(docRef, {
      likes: arrayRemove(userId),
    });
  } else {
    await updateDoc(docRef, {
      likes: arrayUnion(userId),
    });
  }

  return;
};

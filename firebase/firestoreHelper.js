import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { database } from "./firebaseSetup";

//WRITING RULES HAVE NOT BEEN CHANGED, NEED TO UPDATE ON NEXT ITERTAION.
export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
  } catch (err) {
    console.error("write to db", err);
  }
}

export async function deleteFromDB(deletedID, collectionName) {
  try {
    await deleteDoc(doc(database, collectionName, deletedID));
  } catch (err) {
    console.error("delete from db", err);
  }
}

export async function updateDB(updatedID, data, collectionName) {
  try {
    await setDoc(doc(database, collectionName, updatedID), data, {
      merge: true,
    });
    console.log("Document updated with ID: ", updatedID);
  } catch (err) {
    console.log("update db", err);
  }
}

export async function deleteAllFromDB(collectionName) {
  try {
    // get all the documents in the collection
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach((docSnapshot) => {
      deleteDoc(doc(database, collectionName, docSnapshot.id));
    });
  } catch (err) {
    console.error("delete all", err);
  }
}

export async function getAllDocuments(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    const data = [];
    if (!querySnapshot.empty) {
      querySnapshot.forEach((docSnapShot) => {
        data.push(docSnapShot.data());
      });
    }
    return data;
  } catch (err) {
    console.log("get all docs", err);
  }
}

export async function removeImageFromDB(imageUrl, collectionName, documentId) {
  try {
    const docRef = doc(database, collectionName, documentId);
    await updateDoc(docRef, {
      photos: arrayRemove(imageUrl),
    });
    console.log("Image successfully removed from db:", imageUrl);
  } catch (err) {
    console.error("Error removing image from db:", err);
  }
}

export async function addImageToDB(imageUrl, collectionName, documentId) {
  try {
    const docRef = doc(database, collectionName, documentId);
    await updateDoc(docRef, {
      photos: arrayUnion(imageUrl),
    });
    console.log("Image successfully added to db:", imageUrl);
  } catch (err) {
    console.error("Error adding image to db:", err);
  }
}

export async function getPhotosFromDB(collectionName, documentId) {
  try {
    const docRef = doc(database, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().photos;
    }
  } catch (err) {
    console.error("Error getting photos from db:", err);
  }
}

export async function getOneDocument(id, collectionName) {
  try {
    const docSnapshot = await getDoc(doc(database, collectionName, id));
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    }
    return null;
  } catch (err) {
    console.log("get one doc", err);
  }
}

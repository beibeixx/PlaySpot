import { collection, addDoc, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
  } catch (err) {
    console.error('write to db', err);
  }
}

export async function deleteFromDB(deletedID, collectionName) {
  try {
    await deleteDoc(doc(database, collectionName, deletedID));
  } catch (err) {
    console.error('delete from db', err);
  }
}

export async function updateDB(goalId, data, collectionName) {
  try {
    await setDoc(doc(database, collectionName, goalId), data, { merge: true });
  } catch (err) {
    console.log('update db', err);
  }
}

export async function deleteAllFromDB(collectionName) {
  try {
    // get all the documents in the collection
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach((docSnapshot) => {
      deleteDoc(doc(database, collectionName, docSnapshot.id));
    });
  }
  catch (err) {
    console.error('delete all', err);
  }
}

import { collection, addDoc, getDocs, setDoc, doc, deleteDoc, query, where} from "firebase/firestore";
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

export async function checkInDB(itemId, collectionName) {
  try {
    const q = query(
      collection(database, collectionName),
      where("itemId", "==", itemId)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty ? querySnapshot.docs[0].id : null;
  } catch (err) {
    console.error('Check favorite error:', err);
    return null;
  }
}
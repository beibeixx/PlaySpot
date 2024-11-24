import { collection, addDoc, getDocs, setDoc, doc, deleteDoc, query, where} from "firebase/firestore";
import { database } from "./firebaseSetup";

//WRITING RULES HAVE NOT BEEN CHANGED, NEED TO UPDATE ON NEXT ITERTAION.
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

export async function updateDB(updatedID, data, collectionName) {
  try {
    await setDoc(doc(database, collectionName, updatedID), data, { merge: true });
    console.log('Document updated with ID: ', updatedID);
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

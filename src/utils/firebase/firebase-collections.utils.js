import { collection, writeBatch, doc, query, getDocs } from "firebase/firestore";

import { db } from "./firebase.utils";

export const addCollectionAndDocuments = async (
  collectionName,
  collectionData
) => {
  const collectionRef = collection(db, collectionName);
  const batch = writeBatch(db);

  collectionData.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshop = await getDocs(q);
    return querySnapshop.docs.map( q => q.data() );
}
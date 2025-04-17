/* // hooks/useFirestoreDocument.js
import { useState } from 'react';
import { collection, getDoc, getDocs, doc, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export function useFirestoreDocument() {
  const [document, setDocument] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función getColId optimizada
  const getColId = async (targetTitle) => {
    try {
      const collections = ["foods", "users", "books"];
      
      for (const collectionName of collections) {
        console.log(`Procesando colección: ${collectionName}`);
        
        const querySnapshot = await getDocs(
          query(collection(db, collectionName), where("title", "==", targetTitle))
        );
        
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const objectid = doc.data().objectid;
          return objectid || collectionName;
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error en getColId:", error);
      return null;
    }
  };

  // Función getId optimizada
  const getId = async (titleid, colId) => {
    try {
      if (!colId) {
        colId = await getColId(titleid);
        
        if (!colId) {
          return null;
        }
      }
      
      const querySnapshot = await getDocs(
        query(collection(db, colId), where("title", "==", titleid))
      );
      
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id;
      }
      
      return null;
    } catch (error) {
      console.error("Error en getId:", error);
      return null;
    }
  };

  // Función getData modificada para ser más reutilizable
  const getData = async (titleInput) => {
    setLoading(true);
    setError(null);
    
    try {
      if (!titleInput || titleInput.trim() === "") {
        throw new Error("El título de búsqueda está vacío");
      }
      
      const colId = await getColId(titleInput);
      if (!colId) {
        throw new Error("No se pudo determinar la colección del documento");
      }
      
      const docId = await getId(titleInput, colId);
      console.log("docID:", docId);
      
      if (!docId) {
        throw new Error(`No se encontró documento con título "${titleInput}"`);
      }
      
      const docRef = doc(db, colId, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDocument(data);
        return data;
      } else {
        console.log(`Documento existe en ruta (${colId}/${docId}) pero no tiene datos`);
        setDocument({});
        return {};
      }
    } catch (error) {
      console.error("Error obteniendo datos:", error);
      setError(error.message || "Error desconocido");
      setDocument({});
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { document, loading, error, getData };
} */
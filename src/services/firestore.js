import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export const getDocument = async (col, id = "main") => {
  const snap = await getDoc(doc(db, col, id));
  return snap.exists() ? snap.data() : null;
};

export const getCollection = async (col) => {
  const snap = await getDocs(collection(db, col));
  const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return docs.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
};

export const getImages = async () => {
  const snap = await getDoc(doc(db, "settings", "images"));
  return snap.exists() ? snap.data() : {};
};

// Converts any Google Drive share link to a working image URL
export const driveUrl = (url) => {
  if (!url) return null;
  // Extract file ID from any Drive URL format
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  if (match) {
    // lh3.googleusercontent.com works without CORS blocking
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return url;
};

import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDwGmR3KDQ0yiOdihR7yl46_dmCY4lmJoY',
  authDomain: 'skillverse-5f7bf.firebaseapp.com',
  projectId: 'skillverse-5f7bf',
  storageBucket: 'skillverse-5f7bf.firebasestorage.app',
  messagingSenderId: '572411567008',
  appId: '1:572411567008:web:42afcbdeff2ec4d76362c5',
  measurementId: 'G-FCLBTTCEPD',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const uploadImage = async (file, path) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
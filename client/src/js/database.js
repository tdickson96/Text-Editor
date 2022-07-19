import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('PUT to the database');
  const notesDB = await openDB('jate', 1);
  const tx = notesDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 0, text: text });
  const result = await request;
  console.log('Text saved to database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('GET from the database');
  const notesDB = await openDB('jate', 1);
  const tx = notesDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('Notes saved to database', result);
  if (!result.length) return null;
  return result[0].content;
}

initdb();

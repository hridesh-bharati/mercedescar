// cleanup-services.js
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, get, remove } from "firebase/database";

// 1. Firebase Initialization (aapki di gayi config ke mutabiq)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyA2z6VFbLem6hLXuXAAFcdVrEMTvQ5zrRw",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dubaicar-cef9d.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://dubaicar-cef9d-default-rtdb.firebaseio.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dubaicar-cef9d",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const database = getDatabase(app);

async function removeDuplicateServices() {
  try {
    console.log("🔄 Fetching services from Firebase Realtime Database...");
    const servicesRef = ref(database, 'services');
    const snapshot = await get(servicesRef);

    if (!snapshot.exists()) {
      console.log("❌ No services found in the database.");
      process.exit(0);
    }

    const data = snapshot.val();
    const seenTitles = new Set();
    let totalCount = 0;
    let deletedCount = 0;

    console.log("🧹 Scanning for duplicate entries based on 'title'...");

    // Firebase Realtime Database objects return karta hai jisme keys hoti hain (IDs)
    for (const [id, item] of Object.entries(data)) {
      totalCount++;
      if (!item || !item.title) continue;

      // Title ko normalize karna (extra spaces aur uppercase/lowercase ki galti hatane ke liye)
      const normalizedTitle = item.title.trim().toLowerCase();

      if (seenTitles.has(normalizedTitle)) {
        // Agar ye title pehle aa chuka hai, toh yeh duplicate hai -> Delete karo
        const duplicateRef = ref(database, `services/${id}`);
        await remove(duplicateRef);
        deletedCount++;
        console.log(`🗑️ Removed Duplicate -> Title: "${item.title}" (ID: ${id})`);
      } else {
        // Pehli baar mila hua unique title set mein add karo
        seenTitles.add(normalizedTitle);
      }
    }

    console.log("\n==========================================");
    console.log(`✅ Cleanup Complete!`);
    console.log(`Total services scanned: ${totalCount}`);
    console.log(`Duplicate services removed: ${deletedCount}`);
    console.log(`Unique services remaining: ${totalCount - deletedCount}`);
    console.log("==========================================");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error during duplicate removal:", error);
    process.exit(1);
  }
}

removeDuplicateServices();
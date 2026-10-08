import { database } from "@/lib/firebase";
import { ref, set, get, push, update, remove, child } from "firebase/database";

export const dbService = {
  // 1. Create (Push new item with auto ID)
  async create(path, data) {
    try {
      const dbRef = ref(database, path);
      const newRef = push(dbRef);
      const payload = { ...data, id: newRef.key, updatedAt: Date.now() };
      await set(newRef, payload);
      return { success: true, id: newRef.key, data: payload };
    } catch (error) {
      console.error(`[DB Create Error] ${path}:`, error);
      return { success: false, error: error.message };
    }
  },

  // 2. Read (Fetch all or specific node, optimized with once caching)
  async getAll(path) {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, path));
      if (snapshot.exists()) {
        const rawData = snapshot.val();
        // Convert object to array for easy mapping in UI
        const formattedData = Object.keys(rawData).map((key) => ({
          id: key,
          ...rawData[key],
        }));
        return { success: true, data: formattedData };
      }
      return { success: true, data: [] };
    } catch (error) {
      console.error(`[DB ReadAll Error] ${path}:`, error);
      return { success: false, error: error.message };
    }
  },

  // Read Single Item by ID
  async getById(path, id) {
    try {
      const dbRef = ref(database, `${path}/${id}`);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        return { success: true, data: snapshot.val() };
      }
      return { success: false, error: "Item not found" };
    } catch (error) {
      console.error(`[DB ReadById Error] ${path}/${id}:`, error);
      return { success: false, error: error.message };
    }
  },

  // 3. Update (Partial or Full update)
  async update(path, id, updates) {
    try {
      const dbRef = ref(database, `${path}/${id}`);
      const payload = { ...updates, updatedAt: Date.now() };
      await update(dbRef, payload);
      return { success: true };
    } catch (error) {
      console.error(`[DB Update Error] ${path}/${id}:`, error);
      return { success: false, error: error.message };
    }
  },

  // 4. Delete
  async remove(path, id) {
    try {
      const dbRef = ref(database, `${path}/${id}`);
      await remove(dbRef);
      return { success: true };
    } catch (error) {
      console.error(`[DB Delete Error] ${path}/${id}:`, error);
      return { success: false, error: error.message };
    }
  },
};
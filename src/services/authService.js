import { auth, database } from "@/lib/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { ref, set, get, child } from "firebase/database";

const ADMIN_EMAIL = "hridesh027@gmail.com";

export const authService = {
  // Signup User
  async signup(email, password, name) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Determine role: Only hridesh027@gmail.com is admin
      const role = email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? "admin" : "user";

      // Save user profile in Realtime Database
      const userRef = ref(database, `users/${user.uid}`);
      const userData = {
        uid: user.uid,
        name,
        email,
        role,
        createdAt: Date.now(),
      };
      await set(userRef, userData);

      return { success: true, user: userData };
    } catch (error) {
      console.error("Signup Error:", error);
      return { success: false, error: error.message };
    }
  },

  // Login User
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user role from Database
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `users/${user.uid}`));
      
      let role = "user";
      if (snapshot.exists()) {
        role = snapshot.val().role;
      }

      // Force strict check for admin email
      if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        role = "admin";
      }

      return { success: true, user: { uid: user.uid, email: user.email, role } };
    } catch (error) {
      console.error("Login Error:", error);
      return { success: false, error: error.message };
    }
  },

  // Logout
  async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
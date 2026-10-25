// src/services/authService.js
import { auth, database } from "@/lib/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { ref, set, get, child } from "firebase/database";

const ADMIN_EMAIL = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || '').toLowerCase();
export const authService = {
  // Signup User with Name & Mobile
  async signup(email, password, name, mobile = "") {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const role = email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? "admin" : "user";

      const userRef = ref(database, `users/${user.uid}`);
      const userData = {
        uid: user.uid,
        name: name || "User",
        email,
        mobile: mobile || "",
        about: "Automotive enthusiast & car service client.",
        profilePic: "",
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

      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `users/${user.uid}`));
      
      let role = "user";
      let userData = { uid: user.uid, email: user.email, role: "user" };

      if (snapshot.exists()) {
        userData = snapshot.val();
        role = userData.role || "user";
      }

      if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        role = "admin";
        userData.role = "admin";
      }

      return { success: true, user: userData };
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
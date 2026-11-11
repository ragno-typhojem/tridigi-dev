import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
const config={apiKey:import.meta.env.VITE_FIREBASE_API_KEY,authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,appId:import.meta.env.VITE_FIREBASE_APP_ID,messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET};
export const configured=Boolean(config.apiKey && config.projectId && config.appId);
const app=configured?(getApps()[0]??initializeApp(config)):null;
export const auth=app?getAuth(app):null;
export const functions=app?getFunctions(app):null;
export async function ensureUser(){if(!auth)return null;return (auth.currentUser??(await signInAnonymously(auth)).user).uid;}
export async function saveRun(payload:unknown){if(!functions)return;await ensureUser();await httpsCallable(functions,'saveRun')(payload);}

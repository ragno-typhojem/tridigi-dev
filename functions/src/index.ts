import {onCall,HttpsError} from 'firebase-functions/v2/https';
import {initializeApp} from 'firebase-admin/app';
import {getFirestore,FieldValue} from 'firebase-admin/firestore';
initializeApp();
// Only accepts bounded, well-shaped turn records; never trusts client scores.
export const saveRun=onCall({maxInstances:10},async request=>{
 if(!request.auth)throw new HttpsError('unauthenticated','Sign in first');
 const data=request.data as {scenarioId?:unknown;turns?:unknown};
 if(!data||typeof data.scenarioId!=='string'||!['monetary','fiscal','crisis'].includes(data.scenarioId)||!Array.isArray(data.turns)||data.turns.length!==4)throw new HttpsError('invalid-argument','Invalid run');
 const allowed=['growth','inflation','unemployment','interest','debt','budget','exchange','confidence'];
 const validEconomy=(x:any)=>x&&typeof x==='object'&&allowed.every(k=>typeof x[k]==='number'&&Number.isFinite(x[k])&&Math.abs(x[k])<=1000);
 const validPolicy=(x:any)=>x&&typeof x.interest==='number'&&x.interest>=0&&x.interest<=25&&typeof x.tax==='number'&&x.tax>=0&&x.tax<=50&&typeof x.spending==='number'&&x.spending>=0&&x.spending<=100;
 for(let i=0;i<4;i++){const t=data.turns[i];if(!t||t.turn!==i+1||!validEconomy(t.before)||!validEconomy(t.after)||!validPolicy(t.policy)||typeof t.shock!=='number'||![0,2].includes(t.shock))throw new HttpsError('invalid-argument','Invalid turn');}
 const ref=await getFirestore().collection('users').doc(request.auth.uid).collection('runs').add({scenarioId:data.scenarioId,turns:data.turns,createdAt:FieldValue.serverTimestamp(),verified:false});
 return {id:ref.id};
});

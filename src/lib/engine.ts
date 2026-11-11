// Illustrative teaching model only. Replace coefficients after economics-team review.
export type Economy = { growth:number; inflation:number; unemployment:number; interest:number; debt:number; budget:number; exchange:number; confidence:number };
export type Policy = { interest:number; tax:number; spending:number };
export const initialEconomy:Economy = {growth:2.2,inflation:6.5,unemployment:8.4,interest:7,debt:48,budget:-3,exchange:1,confidence:55};
const clamp=(n:number,min:number,max:number)=>Math.min(max,Math.max(min,n));
const round=(n:number)=>Math.round(n*100)/100;
export function simulate(state:Economy, policy:Policy, shock=0):Economy {
 const rateEffect=(policy.interest-state.interest);
 const demand=(policy.spending-50)*0.045-(policy.tax-20)*0.055-rateEffect*0.22-shock*0.7;
 const growth=clamp(state.growth*0.65+demand+0.7,-12,15);
 const inflation=clamp(state.inflation*0.82+1.05+growth*0.11-rateEffect*0.17+shock*0.9,-2,45);
 const unemployment=clamp(state.unemployment-(growth-state.growth)*0.16+(2-growth)*0.07,0,35);
 const budget=clamp((policy.tax-20)*0.17-(policy.spending-50)*0.11-2.5,-25,20);
 return {growth:round(growth),inflation:round(inflation),unemployment:round(unemployment),interest:round(policy.interest),debt:round(clamp(state.debt-budget*0.22,0,200)),budget:round(budget),exchange:round(clamp(state.exchange*(1+(inflation-state.inflation)*0.009),0.2,10)),confidence:round(clamp(state.confidence+growth*0.6-inflation*0.13-shock*3,0,100))};
}
export function stabilityIndex(e:Economy){return Math.round(clamp(100-Math.abs(e.inflation-2)*3-e.unemployment*2-Math.abs(e.budget)*1.2-Math.max(0,e.debt-60)*0.4,0,100));}
export const defaultPolicy:Policy={interest:7,tax:20,spending:50};

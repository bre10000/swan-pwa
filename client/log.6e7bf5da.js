import{Y as t,a2 as a}from"./client.9bda2085.js";async function e(e,i,o,s){let r=await t("user");try{let t=await a({path:"activity-logs",data:{data:{date:new Date,type:e,data:i,action:o,entityID:s,users_permissions_user:r?.id}}});console.log("Create Activity Log ",t)}catch(t){console.log("Error Create Activity Log ",t)}}export{e as c};

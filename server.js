const express=require('express');
const path=require('path');
const app=express();
app.use(express.json({limit:'50mb'}));
app.use(express.static(path.join(__dirname)));
app.get('/api/health',(req,res)=>res.json({ok:true,name:'Ava Pro'}));
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'index.html')));
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log(`Ava Pro running on http://localhost:${PORT}`));

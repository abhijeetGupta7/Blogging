const express=require('express');
const { PORT, CLIENT_URL } = require('./config/server-config');
const { connecToDB } = require('./config/db-config');
const cors=require('cors');
const apiRouter = require('./routes/api.router');
const cookieParser = require('cookie-parser');
const app=express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: CLIENT_URL,
    credentials:true
}));

app.use('/api',apiRouter);

app.get('/', (req,res)=>{
    res.status(200).json({
        msg:'Api is working'
    })
})

app.listen(PORT, async()=>{
    console.log(`Server is listening at PORT ${PORT}`);
    await connecToDB();;
})
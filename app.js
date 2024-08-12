const express=require('express')
const app=express();
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyParser=require('body-parser')
require('dotenv').config();
const cors=require('cors');
const authRoutes = require('./Routes/authRoutes')
const userRoutes = require('./Routes/userRoutes')
const jobTypeRoutes = require('./Routes/jobTypeRoutes')
const jobRoutes = require('./Routes/jobRoutes');
const cookieParser = require('cookie-parser');
const errorHandler=require('./middleware/Error')


//error middleware

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({
    limit:'5mb',
    extended:true
}));

app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));


app.use(express.json());

const fileupload = require('express-fileupload');
app.use(fileupload({ useTempFiles : true,tempFileDir : '/tmp/'}));

app.post("/completion", async (req, res) => {
    const API_KEY = process.env.OPENAI_API_KEY;
  
     const options ={
      method:"POST",
      headers:{
          "Authorization":`Bearer ${API_KEY}`,
          "Content-type":"application/json"
      },
      body:JSON.stringify({
          model:"gpt-3.5-turbo",
          messages:[{role:"user",content:req.body.message}],
          max_tokens:100,
      })
  
  }
//   try{
//      const response = await fetch('https://api.openai.com/v1/chat/completions',options)
//      const data = await response.json()
//      res.send(data)
  
//   }
//   catch(error){
//       console.error(error)
//     }
    
try {
    const fetch = await import('node-fetch');
    const response = await fetch.default('https://api.openai.com/v1/chat/completions', options);
    const data = await response.json();
    res.send(data);
} catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while processing your request." });
}
});

//port 
const port = process.env.PORT || 8000;


mongoose.connect(process.env.DATABASE).then(()=>console.log("database connected successfully"))
    .catch(err=>console.log("error occurred",err));

    //cloud connection
const cloudinary = require('./config/cloudinary');
cloudinary.CloudinaryConnect();

    //routes
    app.use('/api', authRoutes);
    app.use('/api', userRoutes);
    app.use('/api',jobTypeRoutes);
    app.use('/api',jobRoutes);
    app.use(errorHandler)


app.listen(port,()=>{
    console.log("server is running on port : ", port);
})

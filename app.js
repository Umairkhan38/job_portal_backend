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

//port 
const port = process.env.PORT || 8000;


mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    }).then(()=>console.log("database connected successfully"))
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

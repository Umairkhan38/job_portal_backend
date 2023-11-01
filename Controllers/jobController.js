const Job = require('../models/jobModel')
const jobType = require('../models/jobTypeModel')
const ErrorResponse = require('../utils/errorResponse')


//create a job category
exports.createJob = async (req,res,next)=>{

    try{
        const job = await Job.create({
            title:req.body.title,
            description:req.body.description,
            salary:req.body.salary,
            location:req.body.location,
            jobType:req.body.jobType,
            user:req.user.id
        })
        

        res.status(201).json({
            success:true,
            job
        })
    }
    catch(err){
        next(err)
    }
}


//Single Job
exports.singleJob = async(req,res,next)=>{
    try{
        const job = await Job.findById(req.params.id);
        res.status(200).json({
            success:true,
            job
        })

    }
    catch(err){
        next(err)
    }
}

//update joob by id
exports.updateJob = async(req,res,next)=>{
    try{
        const job = await Job.findByIdAndUpdate(req.params.job_id,req.body,{new:true}).populate('jobType','jobTypeName').populate('user','firstName');
        res.status(200).json({
            success:true,
            job
        })

    }
    catch(err){
        next(err)
    }
}



//display posted jobs
exports.showJobs=async(req,res,next)=>{

    //filter jobs by category
    let ids=[];
    const jobTypeCategory = await jobType.find({}, {_id:1});
    
    jobTypeCategory.forEach(cat=>{
        ids.push(cat._id);
    })


    //enable search
    const keyword = req.query.keyword ? {
        title:{
            $regex:req.query.keyword,
            $options:'i'
        }
    } : {};

    
    let cat = req.query.cat;
    let categ= cat !== '' ? cat : ids;

    //jobs by location
    let locations = [];
    const jobByLocation = await Job.find({},{location:1});

    jobByLocation.forEach(val=>{
        locations.push(val.location);
    })

    let setUniqueLocation = [...new Set(locations)];
    let locationFilter = locations !== '' ? locations : setUniqueLocation; 

    const pageSize=5;
    const page = Number(req.query.pageNumber) || 1; 
    // const count = await Job.find({}).estimatedDocumentCount();  //count of job object
   
    const count = await Job.find({ ...keyword, jobType:categ, location:locationFilter }).countDocuments(); 


    try{
       const jobs = await Job.find({...keyword , jobType:categ, location:locationFilter }).sort({ createdAt: -1 }).populate('jobType', 'jobTypeName').populate('user', 'firstName').skip(pageSize * (page - 1)).limit(pageSize);
        res.status(200).json({
            success:true,
            jobs,
            page,
            pages:Math.ceil(count / pageSize),
            count,
            setUniqueLocation
        })

    }
    catch(err){
        next(err)
    }

}



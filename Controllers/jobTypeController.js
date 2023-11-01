const JobType = require('../models/jobTypeModel')
const ErrorResponse = require('../utils/errorResponse')



//create a job category
exports.createJobType = async (req,res,next)=>{

    try{
        const job = await JobType.create({
            jobTypeName:req.body.jobTypeName,
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

//Get All job categories
exports.allJobType = async (req,res,next)=>{

    try{
        const jobT = await JobType.find();
        res.status(200).json({
            success:true,
            jobT
        })
    }
    catch(err){
        next(err)
    }

}

//Update job types
exports.updateJobType = async (req,res,next)=>{

    try{
        const job = await JobType.findByIdAndUpdate(req.params.type_id,req.body,{new:true});
        res.status(200).json({
            success:true,
            job
        })
    }
    catch(err){
        next(err)
    }

}


//delete job type 

exports.deleteJobType=async(req,res,next)=>{

    try{
        const jobT= await JobType.findByIdAndRemove(req.params.type_id);
        res.status(200).json({
            success:true,
            message:"job type deleted",
            
        })
    }
    catch(err){
        next(new ErrorResponse("Server Error",500));
    }

}
const express = require("express");
const { StatusCode, FAILED_MESSAGE } = require("../constants/Constant");
const RegisterService = require("../services/RegisterService");
const router = express.Router();

router.post("/createRegister", async (req, res) => {
 try{
        const result = await RegisterService.createRegister(req.body);
        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result.data });
    }catch(err){
     console.log("create register error",err);
       return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: FAILED_MESSAGE.SERVER_ERROR });
    }
});
router.get("/getAllRegister", async (req, res) => {
    try{
        const result = await RegisterService.fetchAllRegister();
        console.log("response register data:",result);
        
        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result?.data });
    }catch(err){
     console.log("get all register data",err);
       return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: FAILED_MESSAGE.SERVER_ERROR });
    }
  
});
router.get("/getAllRegisterForAdmin", async (req, res) => {
    try{
        const result = await RegisterService.fetchAllRegisterForAdmin();
        console.log("response register data:",result);
        
        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result?.data });
    }catch(err){
     console.log("get all register data",err);
       return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: FAILED_MESSAGE.SERVER_ERROR });
    }
  
});
router.get("/getRegisterById/:id", async (req, res) => {
   try{
        const result = await RegisterService.fetchRegisterById(req.params.id);
        console.log("response register data:",result);

        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result?.data });
    }catch(err){
     console.log("get register data by id ",err);
       return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: FAILED_MESSAGE.SERVER_ERROR });
    }
});

router.put("/updateRegisterById/:id", async (req, res) => {
   try{
        const result =  await RegisterService.updateRegister(req.params.id, req.body);
        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result.data });
    }catch(err){
     console.log("update register error",err);
       return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: FAILED_MESSAGE.SERVER_ERROR });
    }
});

router.delete("/deleteRegisterById/:id", async (req, res) => {
    try{
        const result = await RegisterService.removeRegister(req.params.id);
        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result.data });
    }catch(err){
     console.log("update register error",err);
       return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: FAILED_MESSAGE.SERVER_ERROR });
    }
});

module.exports = router;

const express = require("express");
const { StatusCode, FAILED_MESSAGE } = require("../constants/Constant");
const AuthService = require("../services/AuthService");
const router = express.Router();

router.post("/login", async (req, res) => {
 try{
        const result = await AuthService.login(req.body);
        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result.data });
    }catch(err){
     console.log("create login error",err);
       return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: FAILED_MESSAGE.SERVER_ERROR });
    }
});
router.post("/change-password", async (req, res) => {
    try{
        const result = await AuthService.changePassword(req.body.userId, req.body.oldPassword, req.body.newPassword);
        console.log("response login data:",result);
        
        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result?.data });
    }catch(err){
     console.log("get all login data",err);
       return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: FAILED_MESSAGE.SERVER_ERROR });
    }
  
});
router.get("//forgot-password", async (req, res) => {
   try{
        const result = await AuthService.forgotPassword(req.body.username);
        console.log("response login data:",result);
        
        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result?.data });
    }catch(err){
     console.log("get login data by id ",err);
       return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: FAILED_MESSAGE.SERVER_ERROR });
    }
});

module.exports = router;

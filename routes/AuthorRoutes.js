const express = require("express");
const router = express.Router();
const { StatusCode, FAILED_MESSAGE } = require("../constants/Constant");
const AuthorService = require("../services/AuthorServices");

router.post("/createAuthor", async (req, res) => {
    try {
        const result = await AuthorService.createAuthor(req.body);

        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result.data });
    } catch (err) {
        console.log("author create error", err);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: FAILED_MESSAGE.INTERNAL_SERVER_ERROR,
        });
    }
});
router.get("/getAuthors", async (req, res) => {
    try {
        const result = await AuthorService.getAuthors();

        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result.data });
    } catch (err) {
        console.log("author get error", err);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: FAILED_MESSAGE.INTERNAL_SERVER_ERROR,
        });
    }
});
// UPDATE AUTHOR
router.put("/updateAuthor/:id", async (req, res) => {
    try {
        const result = await AuthorService.updateAuthor(
            req.params.id,
            req.body
        );
        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result.data });
    } catch (err) {
        console.log("update author error", err);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: FAILED_MESSAGE.INTERNAL_SERVER_ERROR,
        });
    }
});

// DELETE AUTHOR
router.delete("/deleteAuthor/:id", async (req, res) => {
    try {
        const result = await AuthorService.deleteAuthor(req.params.id);
        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result.data });
    } catch (err) {
        console.log("delete author error", err);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: FAILED_MESSAGE.INTERNAL_SERVER_ERROR,
        });
    }
});
router.get("/getAllNoOfAuthors", async (req, res) => {
    try{
        const result = await AuthorService.fetchTotalAuthors();
        
        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: result.success, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: result.success, message: result.message, data: result?.data });
    }catch(err){
       return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: FAILED_MESSAGE.SERVER_ERROR });
    }
  
});
module.exports = router;
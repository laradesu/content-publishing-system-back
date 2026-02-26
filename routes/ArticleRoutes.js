const express = require("express");
const router = express.Router();
const { StatusCode, FAILED_MESSAGE } = require("../constants/Constant");
const ArticleServices = require("../services/ArticleServices");
router.post("/createArticle", async (req, res) => {
    try {
        const result = await ArticleServices.createArticle(req.body);
        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }

        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result.data });
    } catch (err) {
        console.log("article create error", err);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: FAILED_MESSAGE.SERVER_ERROR,
        });
    }
});
router.get("/get_all_articles", async (req, res) => {
    try {
        const result = await ArticleServices.getAllArticles();
        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result.data });
    } catch (err) {
        console.log("get all articles error", err);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: FAILED_MESSAGE.SERVER_ERROR,
        });
    }
});
router.get("/articles/published", async (req, res) => {
    try {
        const result = await ArticleServices.getAllArticlesonlyPublished();
        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result.data });
    } catch (err) {
        console.log("get all articles error", err);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: FAILED_MESSAGE.SERVER_ERROR,
        });
    }
});
router.get("/article/:id", async (req, res) => {
    try {
        const result = await ArticleServices.getArticleById(req.params.id);

        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result.data });
    } catch (err) {
        console.log("article get error", err);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: FAILED_MESSAGE.SERVER_ERROR,
        });
    }
});


// UPDATE ARTICLE
router.put("/update_article/:id", async (req, res) => {
    try {
        const result = await ArticleServices.updateArticles(
            req.params.id,
            req.body
        );
        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result.data });
    } catch (err) {
        console.log("update article error", err);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: FAILED_MESSAGE.SERVER_ERROR,
        });
    }
});

// DELETE ARTICLE
router.delete("/delete_article/:id", async (req, res) => {
    try {
        const result = await ArticleServices.deleteArticle(req.params.id);
        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: false, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: true, message: result.message, data: result.data });
    } catch (err) {
        console.log("delete article error", err);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: FAILED_MESSAGE.SERVER_ERROR,
        });
    }
});
router.patch("/publish_article/:id", async (req, res) => {
    try {
        const { is_published } = req.body; // true/false
        const result = await ArticleServices.updateArticleStatus(req.params.id, is_published);
        if (!result.success) return res.status(StatusCode.BAD_REQUEST).json(result);
        return res.status(StatusCode.SUCCESS).json(result);
    } catch (err) {
        console.error(err);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: FAILED_MESSAGE.SERVER_ERROR });
    }
});
router.get("/articles/tag/:tag", async (req, res) => {
    try {
        const tag = req.params.tag;
        const result = await ArticleServices.getArticlesByTag(tag);
        if (!result.success) return res.status(StatusCode.BAD_REQUEST).json(result);
        return res.status(StatusCode.SUCCESS).json(result);
    } catch (err) {
        console.error(err);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: FAILED_MESSAGE.SERVER_ERROR });
    }
});
router.get("/getAllNoOfArticles", async (req, res) => {
    try{
        const result = await ArticleServices.fetchTotalArticles();
        
        if (!result.success) {
            return res.status(StatusCode.BAD_REQUEST).json({ success: result.success, message: result.message });
        }
        return res.status(StatusCode.SUCCESS).json({ success: result.success, message: result.message, data: result?.data });
    }catch(err){
       return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ success: false, message: FAILED_MESSAGE.SERVER_ERROR });
    }
  
});
module.exports = router;

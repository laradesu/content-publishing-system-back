const { articleSchema } = require("../utils/Validation");
const { FAILED_MESSAGE, SUCCESS_MESSAGE } = require("../constants/Constant");
const { Article, Author } = require("../models/");
class ArticleServices {
    static async createArticle(data) {
        console.log("request of article create:", data);

        try {
            const { error, value } = articleSchema.validate(data, { abortEarly: false });
            if (error) {
                return {
                    success: false,
                    message: error.details.map(d => d.message).join(", ") // return all validation errors
                };
            }
            // Map fields to DB
            const mappedData = {
                title: value.title,
                body: value.body,
                tags: value.tags,
                is_published: value.is_published !== undefined ? value.is_published : false,
                author_id: value.author_id,
            };

            const created = await Article.create(mappedData);
            if (!created) {
                return { success: false, message: FAILED_MESSAGE.NOT_CREATED_ARTICLE, data: "" };
            }
            return { success: true, message: SUCCESS_MESSAGE.CREATED_ARTICLE, data: created };
        } catch (err) {
            console.log("create article error", err);
            return { success: false, message: FAILED_MESSAGE.INTERNAL_SERVER_ERROR };
        }
    }
    static async getAllArticles() {
        try {
            const authors = await Author.findAll({
                include: [
                    {
                        model: Article,
                        as: "articles",
                        attributes: ["id", "title", "body", "tags", "is_published", "author_id"],
                    },
                ],
                order: [
                    ["id", "ASC"],
                    [{ model: Article, as: "articles" }, "id", "ASC"],
                ],
            });

            // Transform tags to arrays
            const formattedAuthors = authors.map(author => ({
                ...author.toJSON(),
                articles: author.articles.map(article => ({
                    ...article.toJSON(),
                    tags: article.tags
                        ? article.tags.replace(/[{}"]/g, '').split(',').map(t => t.trim())
                        : [],
                })),
            }));

            return {
                success: true,
                message: "Fetched articles",
                data: formattedAuthors,
            };
        } catch (err) {
            console.error("Error fetching articles:", err);
            return { success: false, message: FAILED_MESSAGE.INTERNAL_SERVER_ERROR };
        }
    }
    static async getAllArticlesonlyPublished() {
        try {
            const authors = await Author.findAll({
                include: [
                    {
                        model: Article,
                        as: "articles",
                        attributes: ["id", "title", "body", "tags", "is_published", "author_id"],
                        where: { is_published: true }
                    },
                ],
                order: [
                    ["id", "ASC"],
                    [{ model: Article, as: "articles" }, "id", "ASC"],
                ],
            });
            if (authors.length === 0) {
                return {
                    success: false,
                    message: "No published articles found",
                    data: "",
                };
            }

            return {
                success: true,
                message: "Fetched articles",
                data: authors,
            };
        } catch (err) {
            console.error("Error fetching articles:", err);
            return { success: false, message: FAILED_MESSAGE.INTERNAL_SERVER_ERROR };
        }
    }
    static async updateArticles(id, data) {
        try {
            const member = await Article.findByPk(id);
            if (!member) {
                return { success: false, message: FAILED_MESSAGE.NOT_FOUND_ARTICLE };
            }
            const updateBoradMember = await member.update(data);
            if (!updateBoradMember) {
                return { success: false, message: FAILED_MESSAGE.NOT_UPDATED, data: member };
            }
            return { success: true, message: SUCCESS_MESSAGE.UPDATED, data: updateBoradMember };
        } catch (err) {
            return { success: false, message: FAILED_MESSAGE.INTERNAL_SERVER_ERROR };
        }
    }

    static async deleteArticle(id) {
        try {
            const member = await Article.findByPk(id);
            if (!member) {
                return { success: false, message: FAILED_MESSAGE.NOT_FOUND_ARTICLE };
            }
            const deleteBoradMember = await member.destroy();
            if (!deleteBoradMember) {
                return { success: false, message: FAILED_MESSAGE.UNABLE_ARTICLE_DELETE };
            }
            return { success: true, message: SUCCESS_MESSAGE.DELETED_ARTICLE };
        } catch (err) {
            return { success: false, message: FAILED_MESSAGE.INTERNAL_SERVER_ERROR };
        }
    }
    static async updateArticleStatus(id, is_published) {
        try {
            const article = await Article.findByPk(id);
            if (!article) return { success: false, message: FAILED_MESSAGE.NOT_FOUND_ARTICLE };
            await article.update({ is_published });
            return { success: true, message: SUCCESS_MESSAGE.UPDATED, data: article };
        } catch (err) {
            console.error(err);
            return { success: false, message: FAILED_MESSAGE.INTERNAL_SERVER_ERROR };
        }
    }
    static async getArticlesByTag(tag) {
        try {
            const articles = await Article.findAll({
                where: { tags: tag, is_published: true },
            });
            if (!articles.length) return { success: false, message: "No articles found for this tag" };
            return { success: true, message: "Fetched articles", data: articles };
        } catch (err) {
            console.error(err);
            return { success: false, message: FAILED_MESSAGE.INTERNAL_SERVER_ERROR };
        }
    }
      static async fetchTotalArticles() {
        try {
            const totalMembers = await Article.count();
            if (totalMembers === 0) {
                return {
                    success: false, 
                    message: "No articles found",
                    data: 0
                };
            }
            return {
                success: true,
                message: "Total articles fetched successfully",
                data: totalMembers
            };
        } catch (error) {
            console.log("Error counting articles:", error);
            return {
                success: false,
                message: "Something Went Wrong"
            };
        }
    }



}

module.exports = ArticleServices;

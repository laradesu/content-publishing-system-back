const Joi = require("joi");
const authorSchema = Joi.object({
    name: Joi.string().optional().allow(''),
    email: Joi.string().email().required(),
});
const articleSchema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).optional(),
    is_published: Joi.boolean().default(false),
    author_id: Joi.number().integer().required(),
});
const registerSchema = Joi.object({
    title: Joi.string().optional().allow(''),
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    is_active: Joi.boolean().optional(),
});
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});
module.exports = { authorSchema, articleSchema,registerSchema,loginSchema };
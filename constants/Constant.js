const StatusCode = {
    BAD_REQUEST: 400,
    NOT_FPUND: 404,
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500
}
const FAILED_MESSAGE = {

    NOT_CREATED_AUTHOR: "Author not created successfully",
    NOT_UPDATED_AUTHOR: "Author not updated successfully",
    NOT_DELETED_AUTHOR: "Author not deleted successfully",
    NOT_FETCH_AUTHOR: "Author not fetched successfully",
    NOT_FOUND_AUTHOR: "Author not found",

    NOT_CREATED_ARTICLE: "Article not created successfully",
    NOT_UPDATED_ARTICLE: "Article not updated successfully",
    NOT_DELETED_ARTICLE: "Article not deleted successfully",
    NOT_FETCH_ARTICLE: "Article not fetched successfully",
    NOT_FOUND_ARTICLE: "Article not found",
    INTERNAL_SERVER_ERROR: "Something went wrong, please try again later",
    NOT_CREATED_REGISTER: "register not created successfully",
    NOT_UPDATED_REGISTER: "register not updated successfully",
    NOT_DELETED_REGISTER: "register not deleted successfully",
    NOT_FETCH_REGISTER: "register not fetched successfully",
    NOT_FOUND_REGISTER: "register not found",
    
    NOT_CREATED_LOGIN: "login not created successfully",
    NOT_UPDATED_LOGIN: "login not updated successfully",
    NOT_DELETED_LOGIN: "login not deleted successfully",
    NOT_FETCH_LOGIN: "login not fetched successfully",
    NOT_FOUND_LOGIN: "login not found",
}
const SUCCESS_MESSAGE = {
    CREATED_AUTHOR: "Author created successfully",
    UPDATED_AUTHOR: "Author updated successfully",
    DELETED_AUTHOR: "Author deleted successfully",
    FETCH_AUTHOR: "Author fetched successfully",
    FOUND_AUTHOR: "Author found",
    CREATED_ARTICLE: "Article created successfully",
    UPDATED_ARTICLE: "Article updated successfully",
    DELETED_ARTICLE: "Article deleted successfully",
    FETCH_ARTICLE: "Article fetched successfully",
    FOUND_ARTICLE: "Article found",
      CREATED_REGISTER: "register created successfully",
    UPDATED_REGISTER: "register updated successfully",
    DELETED_REGISTER: "register deleted successfully",
    FETCH_REGISTER: "register fetched successfully",
    FOUND_REGISTER: "register found",
     CREATED_LOGIN: "login  created successfully",
    UPDATED_LOGIN: "login  updated successfully",
    DELETED_LOGIN: "login  deleted successfully",
    FETCH_LOGIN: "login  fetched successfully",
    FOUND_LOGIN: "login  found",

}
module.exports = { StatusCode, FAILED_MESSAGE, SUCCESS_MESSAGE }
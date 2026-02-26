const { FAILED_MESSAGE, SUCCESS_MESSAGE } = require("../constants/Constant");
const { authorSchema } = require("../utils/Validation");
const {Author} = require("../models");

class AuthorService {
  static async createAuthor(data) {
    try {
      console.log("create author request",data);
      
      const { error } = authorSchema.validate(data);
      if (error) {
        return { success: false, message: error.details[0].message };
      }
      const created = await Author.create(data);
      if (!created) {
        return { success: false, message: FAILED_MESSAGE.NOT_CREATED_AUTHOR, data: "" };
      }
      return { success: true, message: SUCCESS_MESSAGE.CREATED_AUTHOR, data: created };
    } catch (err) {
      console.log("create author error", err);
      return { success: false, message: FAILED_MESSAGE.INTERNAL_SERVER_ERROR };
    }
  }
  static async getAuthors() {
    try {
      const getAuthors = await Author.findAll({});
      if (!getAuthors) {
        return { success: false, message: FAILED_MESSAGE.NOT_FOUND_AUTHOR, data: "" };
      }
      return { success: true, message: SUCCESS_MESSAGE.FETCH_AUTHOR, data: getAuthors };
    } catch (err) {
      console.log("get authors error", err);
      return { success: false, message: FAILED_MESSAGE.INTERNAL_SERVER_ERROR };
    }
  }
  static async updateAuthor(id, data) {
    try {
      const author = await Author.findByPk(id);
      if (!author) {
        return { success: false, message: FAILED_MESSAGE.NOT_FOUND_AUTHOR, data: "" };
      }
      const updatedAuthor = await author.update(data);
      if (!updatedAuthor) {
        return { success: false, message: FAILED_MESSAGE.NOT_UPDATED_AUTHOR, data: "" };
      }
      return { success: true, message: SUCCESS_MESSAGE.UPDATED_AUTHOR, data: updatedAuthor };
    } catch (err) {
      console.log("update  author error", err);
      return { success: false, message: FAILED_MESSAGE.INTERNAL_SERVER_ERROR };
    }
  }
  static async deleteAuthor(id) {
    try {
      const author = await Author.findByPk(id);
      if (!author) {
        return { success: false, message: FAILED_MESSAGE.NOT_FOUND_AUTHOR };
      }
      const deletedAuthor = await author.destroy();
      if (!deletedAuthor) {
        return { success: false, message: FAILED_MESSAGE.NOT_DELETED_AUTHOR };
      }
      return { success: true, message: SUCCESS_MESSAGE.DELETED_AUTHOR };
    } catch (err) {
      console.log("delete author error", err);
      return { success: false, message: FAILED_MESSAGE.INTERNAL_SERVER_ERROR };
    }
  }
     static async fetchTotalAuthors() {
        try {
            const totalMembers = await Author.count();
            if (totalMembers === 0) {
                return {
                    success: false, 
                    message: "No authors found",
                    data: 0
                };
            }
            return {
                success: true,
                message: "Total autors fetched successfully",
                data: totalMembers
            };
        } catch (error) {
            console.log("Error counting authors:", error);
            return {
                success: false,
                message: "Something Went Wrong"
            };
        }
    }
  
}

module.exports = AuthorService;
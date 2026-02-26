const { FAILED_MESSAGE, SUCCESS_MESSAGE } = require("../constants/Constant");
const {registerSchema} = require("../utils/Validation");
const RegisterSchema = require("../models/RegisterSchema");
class RegisterService {
    static async createRegister(data) {
        try {
            const { error } = registerSchema.validate(data);
            if (error) {
                return { success: false, message: error.details[0].message, data: "" }
            }
            const createRegister = await RegisterSchema.create(data);
            if (!createRegister) {
                return { success: false, message: FAILED_MESSAGE.NOT_CREATED_MEMBER, data: "" }
            }
            return { success: true, message: SUCCESS_MESSAGE.CREATED_MEMBER, data: createRegister }
        } catch (error) {
            console.log("get register data", error);
            return { success: false, message: FAILED_MESSAGE.SERVER_ERROR };
        }
    }
    static async fetchAllRegister() {
        try {
            const getAllRegister= await RegisterSchema.findAll({where:{is_active:true}, order: [["id", "ASC"]], raw: true });
            if (getAllRegister.length===0) {
                return { success: false, message: FAILED_MESSAGE.NOT_FETCH_MEMBER, data: "" }
            }
            return { success: true, message: SUCCESS_MESSAGE.FETCH_MEMBER, data: getAllRegister }
        } catch (error) {
            console.log("get register data", error);
            return { success: false, message: FAILED_MESSAGE.SERVER_ERROR };
        }
    }
      static async fetchAllRegisterForAdmin() {
        try {
            const getAllRegister= await RegisterSchema.findAll({ order: [["id", "ASC"]], raw: true });
            if (getAllRegister.length===0) {
                return { success: false, message: FAILED_MESSAGE.NOT_FETCH_MEMBER, data: "" }
            }
            return { success: true, message: SUCCESS_MESSAGE.FETCH_MEMBER, data: getAllRegister }
        } catch (error) {
            console.log("get register data", error);
            return { success: false, message: FAILED_MESSAGE.SERVER_ERROR };
        }
    }
    static async fetchRegisterById(id) {
        try {
            const getRegisterById = await RegisterSchema.findByPk(id);
            if (!getRegisterById) {
                return { success: false, message: FAILED_MESSAGE.NOT_FETCH_VACANCY, data: "" }
            }
            return { success: true, message: SUCCESS_MESSAGE.FETCH_VACANCY, data: getRegisterById }
        } catch (error) {
            console.log("get register data", error);
            return { success: false, message: FAILED_MESSAGE.SERVER_ERROR };
        }
    }
    static async updateRegister(id, data) {
        try {
            // const { error } = memberSchema.validate(data);
            // if (error) {
            //     return { success: false, message: error.details[0].message, data: "" }
            // }
            const updateRegisterById = await RegisterSchema.findByPk(id);
            if (!updateRegisterById) {
                return { success: false, message: FAILED_MESSAGE.NOT_UPDATED_REGISTER, data: "" }
            }
            // ✅ await the update
            const updatedRegister= await updateRegisterById.update(data);
            if(!updatedRegister){
              return { success: true, message: FAILED_MESSAGE.NOT_UPDATED_REGISTER, data: "" }  
            }
            return {
                success: true,
                message: SUCCESS_MESSAGE.UPDATED_REGISTER,
                data: updatedRegister
            };
        } catch (error) {
            console.log("update register data", error);
            return { success: false, message: FAILED_MESSAGE.SERVER_ERROR };
        }
    }
    static async removeRegister(id) {
         try {
            const deleteRegisterById = await RegisterSchema.findByPk(id);
            if (!deleteRegisterById) {
                return { success: false, message: FAILED_MESSAGE.NOT_DELETED_REGISTER, data: "" }
            }
            // ✅ await the update
            const deletedRegister = await deleteRegisterById.destroy();
            if(!deletedRegister){
              return { success: true, message: FAILED_MESSAGE.NOT_DELETED_REGISTER, data: "" }  
            }
            return {
                success: true,
                message: SUCCESS_MESSAGE.DELETED_REGISTER,
                data: deletedRegister
            };
        } catch (error) {
            console.log("update register data", error);
            return { success: false, message: FAILED_MESSAGE.SERVER_ERROR };
        }
    }
}
module.exports = RegisterService

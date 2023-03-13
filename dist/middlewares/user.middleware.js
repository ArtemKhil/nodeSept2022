"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const mongoose_1 = require("mongoose");
const api_error_1 = require("../errors/api.error");
const User_model_1 = require("../models/User.model");
const validators_1 = require("../validators");
class UserMiddleware {
    async getByIdOrThrow(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await User_model_1.User.findById(userId);
            if (!user) {
                throw new api_error_1.ApiError("User not found", 422);
            }
            res.locals.user = user;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isUserIdValid(req, res, next) {
        try {
            if (!(0, mongoose_1.isObjectIdOrHexString)(req.params.userId)) {
                throw new api_error_1.ApiError("id is not valid", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isUserValidForCreate(req, res, next) {
        try {
            const { error, value } = validators_1.UserValidator.createUser.validate(req.body);
            if (error) {
                throw new api_error_1.ApiError(error.message, 400);
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isUserValidForUpdate(req, res, next) {
        try {
            const { error, value } = validators_1.UserValidator.updateUser.validate(req.body);
            if (error) {
                throw new api_error_1.ApiError(error.message, 400);
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();

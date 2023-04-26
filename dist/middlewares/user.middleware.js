"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const mongoose_1 = require("mongoose");
const errors_1 = require("../errors");
const models_1 = require("../models");
const validators_1 = require("../validators");
class UserMiddleware {
    async getByIdOrThrow(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await models_1.User.findById(userId);
            if (!user) {
                throw new errors_1.ApiError("User not found", 422);
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
                throw new errors_1.ApiError("id is not valid", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    getDynamicallyAndThrow(fieldName, from = "body", dbField = "email") {
        return async (req, res, next) => {
            try {
                const fieldValue = req[from][fieldName];
                const user = await models_1.User.findOne({ [dbField]: fieldValue });
                if (user) {
                    throw new errors_1.ApiError(`User with ${fieldName} ${fieldValue} already exist`, 409);
                }
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    getDynamicallyOrThrow(fieldName, from = "body", dbField = "email") {
        return async (req, res, next) => {
            try {
                const fieldValue = req[from][fieldName];
                const user = await models_1.User.findOne({ [dbField]: fieldValue });
                if (!user) {
                    throw new errors_1.ApiError(`User not found`, 422);
                }
                res.locals = { user };
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    async isUserValidForCreate(req, res, next) {
        try {
            const { error, value } = validators_1.UserValidator.createUser.validate(req.body);
            if (error) {
                throw new errors_1.ApiError(error.message, 400);
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
                throw new errors_1.ApiError(error.message, 400);
            }
            req.body = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isUserValidForLogin(req, res, next) {
        try {
            const { error } = validators_1.UserValidator.loginUser.validate(req.body);
            if (error) {
                throw new errors_1.ApiError(error.message, 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isUserValidForChangePassword(req, res, next) {
        try {
            const { error } = validators_1.UserValidator.changeUserPassword.validate(req.body);
            if (error) {
                throw new errors_1.ApiError(error.message, 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();

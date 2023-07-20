"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const mappers_1 = require("../mappers");
const models_1 = require("../models");
const services_1 = require("../services");
class UserController {
    async getAll(req, res, next) {
        try {
            const users = await services_1.userService.getAll();
            return res.json(users);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { user } = res.locals;
            const response = mappers_1.userMapper.toResponse(user);
            return res.json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const { userId } = req.params;
            const updatedUser = await models_1.User.findByIdAndUpdate(userId, { ...req.body }, { new: true });
            const response = mappers_1.userMapper.toResponse(updatedUser);
            return res.status(201).json(response);
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const { userId } = req.params;
            await models_1.User.deleteOne({ _id: userId });
            return res.sendStatus(204);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();

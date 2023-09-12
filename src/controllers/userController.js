"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const services_1 = require("../services");
const tsoa_1 = require("tsoa");
const notFoundError_1 = __importDefault(require("../types/notFoundError"));
let UserController = class UserController extends tsoa_1.Controller {
    createUser(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield services_1.userService.createUser(request.email, request.password, request.name, request.role);
            this.setStatus(http_status_1.default.CREATED);
            return user.id;
        });
    }
    // @Get('v1/get')
    // @Security("jwt", ["admin"])
    // @SuccessResponse('200', 'OK')
    // public async getUsers(
    //   @Query() name?: string,
    //   @Query() role?: Role,
    //   @Query() limit?: number,
    //   @Query() page?: number,
    //   @Query() sortBy?: string
    // ): Promise<void> {
    //   console.log('we call get endpoint!')
    //   // const filter = pick(queryParams, ['name', 'role']);
    //   // const options = pick(queryParams, ['sortBy', 'limit', 'page']);
    //   // const result = await userService.queryUsers();
    //   // return result.map(x=>x.id);
    // }
    //
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield services_1.userService.getUserById(id);
            if (!user) {
                throw new notFoundError_1.default('User not found');
            }
            return user;
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, tsoa_1.Post)('v1/create'),
    (0, tsoa_1.SuccessResponse)('201', 'CREATED'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, tsoa_1.Get)('v1/get-by-id')
    // @Security("jwt")
    ,
    (0, tsoa_1.SuccessResponse)('200', 'OK'),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)('/user')
], UserController);
//# sourceMappingURL=userController.js.map
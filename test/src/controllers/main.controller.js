"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
const common_1 = require("@nestjs/common");
let MainController = (() => {
    let _classDecorators = [(0, common_1.Controller)('main')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getHello_decorators;
    let _getHello2_decorators;
    let _getHello3_decorators;
    let _getUser_decorators;
    let _getAliasUser_decorators;
    let _getUnionUser_decorators;
    let _getIntersectionUser_decorators;
    let _createUser_decorators;
    let _updateUser_decorators;
    var MainController = _classThis = class {
        // Example
        getHello() {
            return 'hello';
        }
        // Example
        // Example
        getHello2() {
            return 'hello2';
        }
        // Example
        /* Example */
        getHello3() {
            return 'hello3';
        }
        /** Example */
        getUser(_userId) {
            return {
                id: _userId,
                name: `name-${_userId}`,
            };
        }
        /**
         * alias-type 반환 테스트
         */
        getAliasUser() {
            return __awaiter(this, void 0, void 0, function* () {
                return {
                    name: 'KEVIN',
                };
            });
        }
        /**
         * 유니온 타입 응답값 테스트
         */
        getUnionUser() {
            return __awaiter(this, void 0, void 0, function* () {
                return {
                    a: 1,
                    b: 2,
                    c: 3,
                };
            });
        }
        /**
         * 유니온 타입 응답값 테스트
         */
        getIntersectionUser() {
            return __awaiter(this, void 0, void 0, function* () {
                return {
                    a: 1,
                    b: 2,
                    c: 3,
                };
            });
        }
        /**
         * 일반적인 POST 메소드 케이스 테스트.
         *
         * Create Comment.
         *
         * Lorem Ipsum is simply dummy text of the printing and typesetting industry.
         * Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
         */
        createUser(body) {
            return __awaiter(this, void 0, void 0, function* () {
                return {
                    id: 1,
                    name: body.name,
                };
            });
        }
        /** 주석이 조금 다른 PUT 메소드 케이스 테스트.
         * Update Comment.
         * Lorem Ipsum is simply dummy text of the printing and typesetting industry.
         * Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
         * @Todo to do
         * @param {string} userId user.id
         */
        updateUser(userId, query, body, _user) {
            console.log(userId);
            console.log(query);
            console.log(body);
            return {
                id: 1,
                name: 'name1',
            };
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    __setFunctionName(_classThis, "MainController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getHello_decorators = [(0, common_1.Get)()];
        _getHello2_decorators = [(0, common_1.Get)()];
        _getHello3_decorators = [(0, common_1.Get)()];
        _getUser_decorators = [(0, common_1.Get)('users/:userId')];
        _getAliasUser_decorators = [(0, common_1.Version)('2'), (0, common_1.Get)('alias-users')];
        _getUnionUser_decorators = [(0, common_1.Version)('2'), (0, common_1.Get)('union-users')];
        _getIntersectionUser_decorators = [(0, common_1.Version)('2'), (0, common_1.Post)('intersection-users')];
        _createUser_decorators = [(0, common_1.Version)('2'), (0, common_1.Post)('users')];
        _updateUser_decorators = [(0, common_1.Put)('users/:userId')];
        __esDecorate(_classThis, null, _getHello_decorators, { kind: "method", name: "getHello", static: false, private: false, access: { has: obj => "getHello" in obj, get: obj => obj.getHello }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getHello2_decorators, { kind: "method", name: "getHello2", static: false, private: false, access: { has: obj => "getHello2" in obj, get: obj => obj.getHello2 }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getHello3_decorators, { kind: "method", name: "getHello3", static: false, private: false, access: { has: obj => "getHello3" in obj, get: obj => obj.getHello3 }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUser_decorators, { kind: "method", name: "getUser", static: false, private: false, access: { has: obj => "getUser" in obj, get: obj => obj.getUser }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAliasUser_decorators, { kind: "method", name: "getAliasUser", static: false, private: false, access: { has: obj => "getAliasUser" in obj, get: obj => obj.getAliasUser }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUnionUser_decorators, { kind: "method", name: "getUnionUser", static: false, private: false, access: { has: obj => "getUnionUser" in obj, get: obj => obj.getUnionUser }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getIntersectionUser_decorators, { kind: "method", name: "getIntersectionUser", static: false, private: false, access: { has: obj => "getIntersectionUser" in obj, get: obj => obj.getIntersectionUser }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createUser_decorators, { kind: "method", name: "createUser", static: false, private: false, access: { has: obj => "createUser" in obj, get: obj => obj.createUser }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateUser_decorators, { kind: "method", name: "updateUser", static: false, private: false, access: { has: obj => "updateUser" in obj, get: obj => obj.updateUser }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MainController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MainController = _classThis;
})();
exports.MainController = MainController;

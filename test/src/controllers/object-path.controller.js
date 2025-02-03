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
exports.ObjectPathController = void 0;
const common_1 = require("@nestjs/common");
let ObjectPathController = (() => {
    let _classDecorators = [(0, common_1.Controller)({ path: 'main', version: '3' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getPostList_decorators;
    let _getPost_decorators;
    let _getPostLinkedTags_decorators;
    var ObjectPathController = _classThis = class {
        /**
         * Query DTO 인터페이스 정의 없이 코드 분석만으로
         * Query-Parameter의 alias type을 정의 테스트
         */
        getPostList(_page, _limit, _aliasQuery, _query) {
            return __awaiter(this, void 0, void 0, function* () {
                return {
                    status: 200,
                    payload: [
                        {
                            id: '1',
                            title: '제에목',
                            desc: '내에용',
                        },
                    ],
                };
            });
        }
        getPost(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return {
                    id: id,
                    title: '제에목',
                    desc: '내에용',
                };
            });
        }
        /**
         * Alias 타입 유형 추론
         */
        getPostLinkedTags(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return {
                    status: 200,
                    payload: {
                        nature: '자연',
                        technique: '기술',
                    },
                };
            });
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    __setFunctionName(_classThis, "ObjectPathController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getPostList_decorators = [(0, common_1.Get)('posts')];
        _getPost_decorators = [(0, common_1.Get)('posts/:id')];
        _getPostLinkedTags_decorators = [(0, common_1.Get)('/posts/:id/linked-tags')];
        __esDecorate(_classThis, null, _getPostList_decorators, { kind: "method", name: "getPostList", static: false, private: false, access: { has: obj => "getPostList" in obj, get: obj => obj.getPostList }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPost_decorators, { kind: "method", name: "getPost", static: false, private: false, access: { has: obj => "getPost" in obj, get: obj => obj.getPost }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPostLinkedTags_decorators, { kind: "method", name: "getPostLinkedTags", static: false, private: false, access: { has: obj => "getPostLinkedTags" in obj, get: obj => obj.getPostLinkedTags }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ObjectPathController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ObjectPathController = _classThis;
})();
exports.ObjectPathController = ObjectPathController;

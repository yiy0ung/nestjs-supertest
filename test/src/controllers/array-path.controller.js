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
exports.ArrayPathController = void 0;
const common_1 = require("@nestjs/common");
const _structures_1 = require("@structures");
let ArrayPathController = (() => {
    let _classDecorators = [(0, common_1.Controller)(['main', 'v1', 'array'])];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _getArrayData_decorators;
    let _getGenericData1_decorators;
    let _getGenericData2_decorators;
    var ArrayPathController = _classThis = class {
        /**
         * 동기 함수 테스트
         */
        getArrayData() {
            return {
                data: [1, 2, 3, 4],
            };
        }
        /**
         * 제네릭 응답 + Enum
         */
        getGenericData1() {
            return __awaiter(this, void 0, void 0, function* () {
                return {
                    status: 200,
                    payload: {
                        data: [_structures_1.PostType.Normal],
                    },
                };
            });
        }
        /**
         * 제네릭 응답 + Enum 필드
         */
        getGenericData2() {
            return __awaiter(this, void 0, void 0, function* () {
                return {
                    status: 200,
                    payload: {
                        data: [_structures_1.PostType2.Normal],
                    },
                };
            });
        }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    __setFunctionName(_classThis, "ArrayPathController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getArrayData_decorators = [(0, common_1.Get)()];
        _getGenericData1_decorators = [(0, common_1.Get)()];
        _getGenericData2_decorators = [(0, common_1.Get)()];
        __esDecorate(_classThis, null, _getArrayData_decorators, { kind: "method", name: "getArrayData", static: false, private: false, access: { has: obj => "getArrayData" in obj, get: obj => obj.getArrayData }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getGenericData1_decorators, { kind: "method", name: "getGenericData1", static: false, private: false, access: { has: obj => "getGenericData1" in obj, get: obj => obj.getGenericData1 }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getGenericData2_decorators, { kind: "method", name: "getGenericData2", static: false, private: false, access: { has: obj => "getGenericData2" in obj, get: obj => obj.getGenericData2 }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ArrayPathController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ArrayPathController = _classThis;
})();
exports.ArrayPathController = ArrayPathController;

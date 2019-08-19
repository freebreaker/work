"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var prisma_client_1 = require("../generated/prisma-client");
var AuthError = /** @class */ (function (_super) {
    __extends(AuthError, _super);
    function AuthError() {
        return _super.call(this, 'Not authorized') || this;
    }
    return AuthError;
}(Error));
exports.APP_SECRET = 'secret';
exports.getUserId = function (Authorization) { return __awaiter(_this, void 0, void 0, function () {
    var token, verifiedToken, AdminUsers, adminUserId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!Authorization) return [3 /*break*/, 2];
                token = Authorization;
                verifiedToken = jsonwebtoken_1.verify(token, exports.APP_SECRET);
                return [4 /*yield*/, prisma_client_1.prisma.adminUsers({
                        where: {
                            name: verifiedToken.name,
                            pwd: verifiedToken.admin
                        }
                    })];
            case 1:
                AdminUsers = _a.sent();
                adminUserId = AdminUsers[0].id;
                return [2 /*return*/, {
                        token: token,
                        verifiedToken: verifiedToken,
                        adminUserId: adminUserId
                    }];
            case 2: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvd29yay9zZXJ2ZS91dGlsL2luZGV4LnRzIiwic291cmNlcyI6WyIvaG9tZS93b3JrL3NlcnZlL3V0aWwvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQXlDQTs7QUF6Q0EsNkNBQW1DO0FBQ25DLDREQUFvRDtBQUVwRDtJQUF3Qiw2QkFBSztJQUN6QjtlQUNFLGtCQUFNLGdCQUFnQixDQUFDO0lBQ3pCLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUFKRCxDQUF3QixLQUFLLEdBSTVCO0FBRVksUUFBQSxVQUFVLEdBQUcsUUFBUSxDQUFBO0FBRXJCLFFBQUEsU0FBUyxHQUFHLFVBQU8sYUFBaUI7Ozs7O3FCQUV6QyxhQUFhLEVBQWIsd0JBQWE7Z0JBRVQsS0FBSyxHQUFHLGFBQWEsQ0FBQTtnQkFFckIsYUFBYSxHQUFPLHFCQUFNLENBQUMsS0FBSyxFQUFFLGtCQUFVLENBQUMsQ0FBQTtnQkFFaEMscUJBQU0sc0JBQU0sQ0FBQyxVQUFVLENBQUM7d0JBRXpDLEtBQUssRUFBRTs0QkFFTCxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUk7NEJBRXhCLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSzt5QkFFekI7cUJBRUYsQ0FBQyxFQUFBOztnQkFWSSxVQUFVLEdBQUcsU0FVakI7Z0JBRUksV0FBVyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7Z0JBRXBDLHNCQUFPO3dCQUNMLEtBQUssRUFBQyxLQUFLO3dCQUNYLGFBQWEsRUFBQyxhQUFhO3dCQUMzQixXQUFXLEVBQUMsV0FBVztxQkFDeEIsRUFBQTs7OztLQUdOLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3ZlcmlmeX0gZnJvbSAnanNvbndlYnRva2VuJ1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnLi4vZ2VuZXJhdGVkL3ByaXNtYS1jbGllbnQnO1xuXG5jbGFzcyBBdXRoRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcignTm90IGF1dGhvcml6ZWQnKVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IEFQUF9TRUNSRVQgPSAnc2VjcmV0J1xuXG5leHBvcnQgY29uc3QgZ2V0VXNlcklkID0gYXN5bmMgKEF1dGhvcml6YXRpb246YW55KT0+e1xuXG4gICAgaWYgKEF1dGhvcml6YXRpb24pIHtcbiAgICAgICAgXG4gICAgICBjb25zdCB0b2tlbiA9IEF1dGhvcml6YXRpb25cbiAgICAgIFxuICAgICAgY29uc3QgdmVyaWZpZWRUb2tlbjphbnkgPSB2ZXJpZnkodG9rZW4sIEFQUF9TRUNSRVQpXG5cbiAgICAgIGNvbnN0IEFkbWluVXNlcnMgPSBhd2FpdCBwcmlzbWEuYWRtaW5Vc2Vycyh7XG5cbiAgICAgICAgd2hlcmU6IHtcbiAgXG4gICAgICAgICAgbmFtZTogdmVyaWZpZWRUb2tlbi5uYW1lLFxuICBcbiAgICAgICAgICBwd2Q6IHZlcmlmaWVkVG9rZW4uYWRtaW5cbiAgXG4gICAgICAgIH1cbiAgXG4gICAgICB9KVxuXG4gICAgICBjb25zdCBhZG1pblVzZXJJZCA9IEFkbWluVXNlcnNbMF0uaWRcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW46dG9rZW4sXG4gICAgICAgIHZlcmlmaWVkVG9rZW46dmVyaWZpZWRUb2tlbixcbiAgICAgICAgYWRtaW5Vc2VySWQ6YWRtaW5Vc2VySWRcbiAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==
"use strict";
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
var crypto_1 = require("./../util/crypto");
var index_1 = require("./../util/index");
var express = require("express");
var prisma_client_1 = require("../generated/prisma-client");
var jwt = require("jsonwebtoken");
var redis_1 = require("../util/redis");
var router = express.Router();
router.get("/list", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_client_1.prisma.adminUsers().$fragment("\n        fragment admin on adminUser {\n            id\n            name\n            realName\n            phone\n            role {\n                id\n            }\n            createdAt\n            lastLoginAt\n        }\n    ")];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); });
router.post("/add", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, name, pwd, realName, phone, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, pwd = _a.pwd, realName = _a.realName, phone = _a.phone;
                return [4 /*yield*/, prisma_client_1.prisma.createAdminUser({
                        name: name,
                        pwd: crypto_1.cryptoPwd(pwd),
                        realName: realName,
                        phone: phone
                    })];
            case 1:
                result = _b.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); });
router.post("/delete", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var ids, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ids = req.body.ids;
                return [4 /*yield*/, prisma_client_1.prisma.deleteManyAdminUsers({
                        id_in: ids
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); });
router.post("/edit", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, id, name, pwd, realName, phone, cryptoPwdString, Authorization, _b, adminUserId, verifiedToken, result, token;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, id = _a.id, name = _a.name, pwd = _a.pwd, realName = _a.realName, phone = _a.phone;
                cryptoPwdString = undefined;
                if (pwd) {
                    cryptoPwdString = crypto_1.cryptoPwd(pwd);
                }
                Authorization = req.headers['authorization'];
                return [4 /*yield*/, index_1.getUserId(Authorization)];
            case 1:
                _b = _c.sent(), adminUserId = _b.adminUserId, verifiedToken = _b.verifiedToken;
                return [4 /*yield*/, prisma_client_1.prisma.updateAdminUser({
                        where: {
                            id: id
                        },
                        data: {
                            name: name,
                            pwd: cryptoPwdString,
                            realName: realName,
                            phone: phone
                        }
                    })];
            case 2:
                result = _c.sent();
                if (id === adminUserId) {
                    token = jwt.sign({
                        name: name,
                        admin: cryptoPwdString
                    }, 'secret', { expiresIn: "1 days" });
                    // client.set(token, name)
                    redis_1.client.set(name, token);
                    redis_1.client.expire(name, 3600);
                    return [2 /*return*/, res.json({
                            success: true,
                            token: token
                        })];
                }
                return [2 /*return*/, res.json(result)];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvd29yay9zZXJ2ZS9yb3V0ZXMvYWRtaW51c2Vycy50cyIsInNvdXJjZXMiOlsiL2hvbWUvd29yay9zZXJ2ZS9yb3V0ZXMvYWRtaW51c2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkEyR3VCOztBQTNHdkIsMkNBQTZDO0FBQzdDLHlDQUE0QztBQUM1QyxpQ0FBa0M7QUFDbEMsNERBQW9EO0FBQ3BELGtDQUFtQztBQUNuQyx1Q0FBdUM7QUFFdkMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBRS9CLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQU8sR0FBRyxFQUFFLEdBQUc7Ozs7b0JBRWhCLHFCQUFNLHNCQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsU0FBUyxDQUFDLDRPQVlsRCxDQUFDLEVBQUE7O2dCQVpJLE1BQU0sR0FBRyxTQVliO2dCQUVGLHNCQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUE7OztLQUMxQixDQUFDLENBQUE7QUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFPLEdBQUcsRUFBRSxHQUFHOzs7OztnQkFFekIsS0FBa0MsR0FBRyxDQUFDLElBQUksRUFBeEMsSUFBSSxVQUFBLEVBQUUsR0FBRyxTQUFBLEVBQUcsUUFBUSxjQUFBLEVBQUcsS0FBSyxXQUFBLENBQVk7Z0JBRWpDLHFCQUFNLHNCQUFNLENBQUMsZUFBZSxDQUFDO3dCQUN4QyxJQUFJLEVBQUUsSUFBSTt3QkFDVixHQUFHLEVBQUUsa0JBQVMsQ0FBQyxHQUFHLENBQUM7d0JBQ25CLFFBQVEsRUFBQyxRQUFRO3dCQUNqQixLQUFLLEVBQUMsS0FBSztxQkFDZCxDQUFDLEVBQUE7O2dCQUxJLE1BQU0sR0FBRyxTQUtiO2dCQUVGLHNCQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUE7OztLQUUxQixDQUFDLENBQUE7QUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRyxVQUFNLEdBQUcsRUFBRyxHQUFHOzs7OztnQkFFNUIsR0FBRyxHQUFJLEdBQUcsQ0FBQyxJQUFJLElBQVosQ0FBWTtnQkFFUCxxQkFBTSxzQkFBTSxDQUFDLG9CQUFvQixDQUFDO3dCQUM3QyxLQUFLLEVBQUUsR0FBRztxQkFDYixDQUFDLEVBQUE7O2dCQUZJLE1BQU0sR0FBRyxTQUViO2dCQUVGLHNCQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUE7OztLQUMxQixDQUFDLENBQUE7QUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRyxVQUFNLEdBQUcsRUFBQyxHQUFHOzs7OztnQkFFekIsS0FNRixHQUFHLENBQUMsSUFBSSxFQUxSLEVBQUUsUUFBQSxFQUNGLElBQUksVUFBQSxFQUNKLEdBQUcsU0FBQSxFQUNILFFBQVEsY0FBQSxFQUNSLEtBQUssV0FBQSxDQUNHO2dCQUVSLGVBQWUsR0FBRyxTQUFTLENBQUE7Z0JBRS9CLElBQUcsR0FBRyxFQUFDO29CQUNILGVBQWUsR0FBRyxrQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2lCQUNuQztnQkFFSyxhQUFhLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtnQkFFWCxxQkFBTSxpQkFBUyxDQUFDLGFBQWEsQ0FBQyxFQUFBOztnQkFBL0QsS0FBaUMsU0FBOEIsRUFBN0QsV0FBVyxpQkFBQSxFQUFFLGFBQWEsbUJBQUE7Z0JBRW5CLHFCQUFNLHNCQUFNLENBQUMsZUFBZSxDQUFDO3dCQUN4QyxLQUFLLEVBQUM7NEJBQ0YsRUFBRSxFQUFDLEVBQUU7eUJBQ1I7d0JBQ0QsSUFBSSxFQUFDOzRCQUNELElBQUksRUFBQyxJQUFJOzRCQUNULEdBQUcsRUFBQyxlQUFlOzRCQUNuQixRQUFRLEVBQUMsUUFBUTs0QkFDakIsS0FBSyxFQUFDLEtBQUs7eUJBQ2Q7cUJBQ0osQ0FBQyxFQUFBOztnQkFWSSxNQUFNLEdBQUcsU0FVYjtnQkFFRixJQUFHLEVBQUUsS0FBSyxXQUFXLEVBQUM7b0JBRVosS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7d0JBQ25CLElBQUksRUFBRSxJQUFJO3dCQUNWLEtBQUssRUFBRSxlQUFlO3FCQUN6QixFQUFFLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO29CQUVyQywwQkFBMEI7b0JBRTFCLGNBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO29CQUV2QixjQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtvQkFFekIsc0JBQU8sR0FBRyxDQUFDLElBQUksQ0FBQzs0QkFDWixPQUFPLEVBQUMsSUFBSTs0QkFDWixLQUFLLEVBQUMsS0FBSzt5QkFDZCxDQUFDLEVBQUE7aUJBQ0w7Z0JBRUQsc0JBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQTs7O0tBQzFCLENBQUMsQ0FBQTtBQUNGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3J5cHRvUHdkIH0gZnJvbSAnLi8uLi91dGlsL2NyeXB0byc7XG5pbXBvcnQgeyBnZXRVc2VySWQgfSBmcm9tICcuLy4uL3V0aWwvaW5kZXgnO1xuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnLi4vZ2VuZXJhdGVkL3ByaXNtYS1jbGllbnQnO1xuaW1wb3J0ICogYXMgand0IGZyb20gJ2pzb253ZWJ0b2tlbidcbmltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4uL3V0aWwvcmVkaXMnO1xuXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpXG5cbnJvdXRlci5nZXQoYC9saXN0YCwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBwcmlzbWEuYWRtaW5Vc2VycygpLiRmcmFnbWVudChgXG4gICAgICAgIGZyYWdtZW50IGFkbWluIG9uIGFkbWluVXNlciB7XG4gICAgICAgICAgICBpZFxuICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgcmVhbE5hbWVcbiAgICAgICAgICAgIHBob25lXG4gICAgICAgICAgICByb2xlIHtcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgICAgICBsYXN0TG9naW5BdFxuICAgICAgICB9XG4gICAgYClcblxuICAgIHJldHVybiByZXMuanNvbihyZXN1bHQpXG59KVxuXG5yb3V0ZXIucG9zdChgL2FkZGAsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIFxuICAgIGNvbnN0IHsgbmFtZSwgcHdkICwgcmVhbE5hbWUgLCBwaG9uZX0gPSByZXEuYm9keVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcHJpc21hLmNyZWF0ZUFkbWluVXNlcih7XG4gICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgIHB3ZDogY3J5cHRvUHdkKHB3ZCksXG4gICAgICAgIHJlYWxOYW1lOnJlYWxOYW1lLFxuICAgICAgICBwaG9uZTpwaG9uZVxuICAgIH0pXG5cbiAgICByZXR1cm4gcmVzLmpzb24ocmVzdWx0KVxuXG59KVxuXG5yb3V0ZXIucG9zdChgL2RlbGV0ZWAgLCBhc3luYyhyZXEgLCByZXMpPT57XG5cbiAgICBjb25zdCB7aWRzfSA9IHJlcS5ib2R5XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBwcmlzbWEuZGVsZXRlTWFueUFkbWluVXNlcnMoe1xuICAgICAgICBpZF9pbjogaWRzXG4gICAgfSlcblxuICAgIHJldHVybiByZXMuanNvbihyZXN1bHQpXG59KVxuXG5yb3V0ZXIucG9zdChgL2VkaXRgICwgYXN5bmMocmVxLHJlcyk9PntcblxuICAgIGNvbnN0IHtcbiAgICAgICAgaWQsXG4gICAgICAgIG5hbWUsXG4gICAgICAgIHB3ZCxcbiAgICAgICAgcmVhbE5hbWUsXG4gICAgICAgIHBob25lXG4gICAgfSA9IHJlcS5ib2R5XG4gICAgXG4gICAgbGV0IGNyeXB0b1B3ZFN0cmluZyA9IHVuZGVmaW5lZFxuXG4gICAgaWYocHdkKXtcbiAgICAgICAgY3J5cHRvUHdkU3RyaW5nID0gY3J5cHRvUHdkKHB3ZClcbiAgICB9XG5cbiAgICBjb25zdCBBdXRob3JpemF0aW9uID0gcmVxLmhlYWRlcnNbJ2F1dGhvcml6YXRpb24nXVxuICBcbiAgICBjb25zdCB7IGFkbWluVXNlcklkICx2ZXJpZmllZFRva2VuIH0gPSBhd2FpdCBnZXRVc2VySWQoQXV0aG9yaXphdGlvbilcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHByaXNtYS51cGRhdGVBZG1pblVzZXIoe1xuICAgICAgICB3aGVyZTp7XG4gICAgICAgICAgICBpZDppZFxuICAgICAgICB9LFxuICAgICAgICBkYXRhOntcbiAgICAgICAgICAgIG5hbWU6bmFtZSAsXG4gICAgICAgICAgICBwd2Q6Y3J5cHRvUHdkU3RyaW5nLFxuICAgICAgICAgICAgcmVhbE5hbWU6cmVhbE5hbWUsXG4gICAgICAgICAgICBwaG9uZTpwaG9uZVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGlmKGlkID09PSBhZG1pblVzZXJJZCl7XG5cbiAgICAgICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbih7XG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgYWRtaW46IGNyeXB0b1B3ZFN0cmluZ1xuICAgICAgICB9LCAnc2VjcmV0JywgeyBleHBpcmVzSW46IFwiMSBkYXlzXCIgfSlcbiAgICBcbiAgICAgICAgLy8gY2xpZW50LnNldCh0b2tlbiwgbmFtZSlcbiAgICBcbiAgICAgICAgY2xpZW50LnNldChuYW1lLCB0b2tlbilcbiAgICBcbiAgICAgICAgY2xpZW50LmV4cGlyZShuYW1lLCAzNjAwKVxuXG4gICAgICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICAgICAgICBzdWNjZXNzOnRydWUsXG4gICAgICAgICAgICB0b2tlbjp0b2tlblxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiByZXMuanNvbihyZXN1bHQpXG59KVxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXIiXX0=
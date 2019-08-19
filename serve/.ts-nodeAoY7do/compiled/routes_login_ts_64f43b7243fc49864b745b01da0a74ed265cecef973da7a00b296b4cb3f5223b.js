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
var qiniu_1 = require("./../util/qiniu");
var redis_1 = require("./../util/redis");
var express = require("express");
var prisma_client_1 = require("../generated/prisma-client");
var jwt = require("jsonwebtoken");
var qiniu = require("qiniu");
var crypto = require('crypto');
var router = express.Router();
router.post("/login", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, name, pwd, cryptoPwdString, result, payload, secret, token, promise, putPolicy, uploadToken;
    var _this = this;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, pwd = _a.pwd;
                cryptoPwdString = crypto_1.cryptoPwd(pwd);
                return [4 /*yield*/, prisma_client_1.prisma.adminUsers({
                        where: {
                            name: name,
                            pwd: cryptoPwdString
                        }
                    })];
            case 1:
                result = _b.sent();
                payload = {
                    name: name,
                    admin: cryptoPwdString
                };
                secret = 'secret';
                token = jwt.sign(payload, secret, { expiresIn: "1 days" });
                if (!result[0]) return [3 /*break*/, 3];
                redis_1.client.on("error", function (err) {
                    console.log("Error " + err);
                });
                promise = new Promise(function (resolve, reject) {
                    redis_1.client.get(name, function (err, reply) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (reply) {
                                redis_1.client.del(name);
                                console.log("已在其他地方登录");
                            }
                            // client.set(token, name)
                            redis_1.client.set(name, token);
                            redis_1.client.expire(name, 7200);
                            resolve(reply);
                            return [2 /*return*/];
                        });
                    }); });
                });
                // let Reply = await promise
                // if (Reply) {
                //   return res.json({ status: 200, token: token, msg: "已在其他地方登录" })
                // } else {
                //   await prisma.updateChongduAdmin({
                //     where: {
                //       id: result[0].id
                //     },
                //     data: {
                //       lastLoginTime: new Date().getTime().toString(),
                //       ip: getClientIp(req)
                //     }
                //   })
                //   const putPolicy = new qiniu.rs.PutPolicy(options);
                //   const uploadToken = putPolicy.uploadToken(mac);
                //   return res.json({ status: 200, token: result[0] ? token : "", msg: "登录成功", uploadToken: uploadToken })
                // }
                return [4 /*yield*/, prisma_client_1.prisma.updateAdminUser({
                        where: {
                            id: result[0].id
                        },
                        data: {
                            name: name
                        }
                    })];
            case 2:
                // let Reply = await promise
                // if (Reply) {
                //   return res.json({ status: 200, token: token, msg: "已在其他地方登录" })
                // } else {
                //   await prisma.updateChongduAdmin({
                //     where: {
                //       id: result[0].id
                //     },
                //     data: {
                //       lastLoginTime: new Date().getTime().toString(),
                //       ip: getClientIp(req)
                //     }
                //   })
                //   const putPolicy = new qiniu.rs.PutPolicy(options);
                //   const uploadToken = putPolicy.uploadToken(mac);
                //   return res.json({ status: 200, token: result[0] ? token : "", msg: "登录成功", uploadToken: uploadToken })
                // }
                _b.sent();
                putPolicy = new qiniu.rs.PutPolicy(qiniu_1.options);
                uploadToken = putPolicy.uploadToken(qiniu_1.mac);
                return [2 /*return*/, res.json({
                        status: 200,
                        token: result[0] ? token : "",
                        msg: "登录成功",
                        uploadToken: uploadToken,
                        adminId: result[0].id
                    })];
            case 3: return [2 /*return*/, res.json({ status: 200, token: result[0] ? token : "", msg: "用户名或密码错误" })];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvd29yay9zZXJ2ZS9yb3V0ZXMvbG9naW4udHMiLCJzb3VyY2VzIjpbIi9ob21lL3dvcmsvc2VydmUvcm91dGVzL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQW9JdUI7O0FBcEl2QiwyQ0FBNkM7QUFDN0MseUNBQStDO0FBQy9DLHlDQUF5QztBQUN6QyxpQ0FBa0M7QUFDbEMsNERBQW9EO0FBQ3BELGtDQUFtQztBQUduQyw2QkFBK0I7QUFFL0IsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUUvQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFPLEdBQUcsRUFBRSxHQUFHOzs7Ozs7Z0JBRTdCLEtBQWdCLEdBQUcsQ0FBQyxJQUFJLEVBQXRCLElBQUksVUFBQSxFQUFFLEdBQUcsU0FBQSxDQUFjO2dCQUV6QixlQUFlLEdBQUcsa0JBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFFdkIscUJBQU0sc0JBQU0sQ0FBQyxVQUFVLENBQUM7d0JBRXJDLEtBQUssRUFBRTs0QkFFTCxJQUFJLEVBQUUsSUFBSTs0QkFFVixHQUFHLEVBQUUsZUFBZTt5QkFFckI7cUJBRUYsQ0FBQyxFQUFBOztnQkFWSSxNQUFNLEdBQUcsU0FVYjtnQkFFSSxPQUFPLEdBQUc7b0JBRWQsSUFBSSxFQUFFLElBQUk7b0JBRVYsS0FBSyxFQUFFLGVBQWU7aUJBRXZCLENBQUE7Z0JBRUssTUFBTSxHQUFHLFFBQVEsQ0FBQTtnQkFFakIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO3FCQUc1RCxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQVQsd0JBQVM7Z0JBRVgsY0FBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxHQUFRO29CQUVuQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFFOUIsQ0FBQyxDQUFDLENBQUM7Z0JBRUMsT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07b0JBRXhDLGNBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQU8sR0FBRyxFQUFFLEtBQUs7OzRCQUVoQyxJQUFJLEtBQUssRUFBRTtnQ0FFVCxjQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO2dDQUVoQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBOzZCQUV4Qjs0QkFFQywwQkFBMEI7NEJBRTVCLGNBQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBOzRCQUV2QixjQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTs0QkFFekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBOzs7eUJBRWYsQ0FBQyxDQUFBO2dCQUVKLENBQUMsQ0FBQyxDQUFBO2dCQUVGLDRCQUE0QjtnQkFFNUIsZUFBZTtnQkFFZixvRUFBb0U7Z0JBRXBFLFdBQVc7Z0JBRVgsc0NBQXNDO2dCQUN0QyxlQUFlO2dCQUNmLHlCQUF5QjtnQkFDekIsU0FBUztnQkFDVCxjQUFjO2dCQUNkLHdEQUF3RDtnQkFDeEQsNkJBQTZCO2dCQUM3QixRQUFRO2dCQUNSLE9BQU87Z0JBRVAsdURBQXVEO2dCQUV2RCxvREFBb0Q7Z0JBRXBELDJHQUEyRztnQkFFM0csSUFBSTtnQkFFSixxQkFBTSxzQkFBTSxDQUFDLGVBQWUsQ0FBQzt3QkFDM0IsS0FBSyxFQUFFOzRCQUNMLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTt5QkFDakI7d0JBQ0QsSUFBSSxFQUFFOzRCQUNKLElBQUksRUFBQyxJQUFJO3lCQUNWO3FCQUNGLENBQUMsRUFBQTs7Z0JBakNGLDRCQUE0QjtnQkFFNUIsZUFBZTtnQkFFZixvRUFBb0U7Z0JBRXBFLFdBQVc7Z0JBRVgsc0NBQXNDO2dCQUN0QyxlQUFlO2dCQUNmLHlCQUF5QjtnQkFDekIsU0FBUztnQkFDVCxjQUFjO2dCQUNkLHdEQUF3RDtnQkFDeEQsNkJBQTZCO2dCQUM3QixRQUFRO2dCQUNSLE9BQU87Z0JBRVAsdURBQXVEO2dCQUV2RCxvREFBb0Q7Z0JBRXBELDJHQUEyRztnQkFFM0csSUFBSTtnQkFFSixTQU9FLENBQUE7Z0JBRUksU0FBUyxHQUFHLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsZUFBTyxDQUFDLENBQUM7Z0JBRTVDLFdBQVcsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLFdBQUcsQ0FBQyxDQUFDO2dCQUUvQyxzQkFBTyxHQUFHLENBQUMsSUFBSSxDQUFDO3dCQUNkLE1BQU0sRUFBRSxHQUFHO3dCQUNYLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTt3QkFDN0IsR0FBRyxFQUFFLE1BQU07d0JBQ1gsV0FBVyxFQUFFLFdBQVc7d0JBQ3hCLE9BQU8sRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtxQkFDckIsQ0FBQyxFQUFBO29CQUlGLHNCQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFBOzs7S0FHbkYsQ0FBQyxDQUFBO0FBR0YsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcnlwdG9Qd2QgfSBmcm9tICcuLy4uL3V0aWwvY3J5cHRvJztcbmltcG9ydCB7IG9wdGlvbnMsIG1hYyB9IGZyb20gJy4vLi4vdXRpbC9xaW5pdSc7XG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLy4uL3V0aWwvcmVkaXMnO1xuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnLi4vZ2VuZXJhdGVkL3ByaXNtYS1jbGllbnQnO1xuaW1wb3J0ICogYXMgand0IGZyb20gJ2pzb253ZWJ0b2tlbidcbmltcG9ydCBnZXRDbGllbnRJcCBmcm9tICcuLi91dGlsL2dldElwJztcblxuaW1wb3J0ICogYXMgcWluaXUgZnJvbSAncWluaXUnO1xuXG5jb25zdCBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcblxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKVxuXG5yb3V0ZXIucG9zdChgL2xvZ2luYCwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG5cbiAgY29uc3QgeyBuYW1lLCBwd2QgfSA9IHJlcS5ib2R5O1xuXG4gIGNvbnN0IGNyeXB0b1B3ZFN0cmluZyA9IGNyeXB0b1B3ZChwd2QpXG5cbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcHJpc21hLmFkbWluVXNlcnMoe1xuXG4gICAgd2hlcmU6IHtcblxuICAgICAgbmFtZTogbmFtZSxcblxuICAgICAgcHdkOiBjcnlwdG9Qd2RTdHJpbmdcblxuICAgIH1cblxuICB9KVxuXG4gIGNvbnN0IHBheWxvYWQgPSB7XG5cbiAgICBuYW1lOiBuYW1lLFxuXG4gICAgYWRtaW46IGNyeXB0b1B3ZFN0cmluZ1xuXG4gIH1cblxuICBjb25zdCBzZWNyZXQgPSAnc2VjcmV0J1xuXG4gIGNvbnN0IHRva2VuID0gand0LnNpZ24ocGF5bG9hZCwgc2VjcmV0LCB7IGV4cGlyZXNJbjogXCIxIGRheXNcIiB9KVxuICAvLyDlpoLmnpznlKjmiLflrZjlnKjvvIzlsIZ0b2tlbuWtmOWFpXJlZGlzXG5cbiAgaWYgKHJlc3VsdFswXSkge1xuXG4gICAgY2xpZW50Lm9uKFwiZXJyb3JcIiwgZnVuY3Rpb24gKGVycjogYW55KSB7XG5cbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgXCIgKyBlcnIpO1xuXG4gICAgfSk7XG5cbiAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgY2xpZW50LmdldChuYW1lLCBhc3luYyAoZXJyLCByZXBseSkgPT4ge1xuXG4gICAgICAgIGlmIChyZXBseSkge1xuICAgICAgICAgIFxuICAgICAgICAgIGNsaWVudC5kZWwobmFtZSlcblxuICAgICAgICAgIGNvbnNvbGUubG9nKFwi5bey5Zyo5YW25LuW5Zyw5pa555m75b2VXCIpXG5cbiAgICAgICAgfVxuXG4gICAgICAgICAgLy8gY2xpZW50LnNldCh0b2tlbiwgbmFtZSlcblxuICAgICAgICBjbGllbnQuc2V0KG5hbWUsIHRva2VuKVxuXG4gICAgICAgIGNsaWVudC5leHBpcmUobmFtZSwgNzIwMClcblxuICAgICAgICByZXNvbHZlKHJlcGx5KVxuXG4gICAgICB9KVxuXG4gICAgfSlcblxuICAgIC8vIGxldCBSZXBseSA9IGF3YWl0IHByb21pc2VcblxuICAgIC8vIGlmIChSZXBseSkge1xuXG4gICAgLy8gICByZXR1cm4gcmVzLmpzb24oeyBzdGF0dXM6IDIwMCwgdG9rZW46IHRva2VuLCBtc2c6IFwi5bey5Zyo5YW25LuW5Zyw5pa555m75b2VXCIgfSlcblxuICAgIC8vIH0gZWxzZSB7XG5cbiAgICAvLyAgIGF3YWl0IHByaXNtYS51cGRhdGVDaG9uZ2R1QWRtaW4oe1xuICAgIC8vICAgICB3aGVyZToge1xuICAgIC8vICAgICAgIGlkOiByZXN1bHRbMF0uaWRcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAgZGF0YToge1xuICAgIC8vICAgICAgIGxhc3RMb2dpblRpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKCksXG4gICAgLy8gICAgICAgaXA6IGdldENsaWVudElwKHJlcSlcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfSlcblxuICAgIC8vICAgY29uc3QgcHV0UG9saWN5ID0gbmV3IHFpbml1LnJzLlB1dFBvbGljeShvcHRpb25zKTtcblxuICAgIC8vICAgY29uc3QgdXBsb2FkVG9rZW4gPSBwdXRQb2xpY3kudXBsb2FkVG9rZW4obWFjKTtcblxuICAgIC8vICAgcmV0dXJuIHJlcy5qc29uKHsgc3RhdHVzOiAyMDAsIHRva2VuOiByZXN1bHRbMF0gPyB0b2tlbiA6IFwiXCIsIG1zZzogXCLnmbvlvZXmiJDlip9cIiwgdXBsb2FkVG9rZW46IHVwbG9hZFRva2VuIH0pXG5cbiAgICAvLyB9XG5cbiAgICBhd2FpdCBwcmlzbWEudXBkYXRlQWRtaW5Vc2VyKHtcbiAgICAgIHdoZXJlOiB7XG4gICAgICAgIGlkOiByZXN1bHRbMF0uaWRcbiAgICAgIH0sXG4gICAgICBkYXRhOiB7XG4gICAgICAgIG5hbWU6bmFtZVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBwdXRQb2xpY3kgPSBuZXcgcWluaXUucnMuUHV0UG9saWN5KG9wdGlvbnMpO1xuXG4gICAgY29uc3QgdXBsb2FkVG9rZW4gPSBwdXRQb2xpY3kudXBsb2FkVG9rZW4obWFjKTtcblxuICAgIHJldHVybiByZXMuanNvbih7IFxuICAgICAgc3RhdHVzOiAyMDAsIFxuICAgICAgdG9rZW46IHJlc3VsdFswXSA/IHRva2VuIDogXCJcIiwgXG4gICAgICBtc2c6IFwi55m75b2V5oiQ5YqfXCIsIFxuICAgICAgdXBsb2FkVG9rZW46IHVwbG9hZFRva2VuICxcbiAgICAgIGFkbWluSWQ6cmVzdWx0WzBdLmlkXG4gICAgfSlcblxuICB9IGVsc2Uge1xuXG4gICAgcmV0dXJuIHJlcy5qc29uKHsgc3RhdHVzOiAyMDAsIHRva2VuOiByZXN1bHRbMF0gPyB0b2tlbiA6IFwiXCIsIG1zZzogXCLnlKjmiLflkI3miJblr4bnoIHplJnor69cIiB9KVxuXG4gIH1cbn0pXG5cblxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXIiXX0=
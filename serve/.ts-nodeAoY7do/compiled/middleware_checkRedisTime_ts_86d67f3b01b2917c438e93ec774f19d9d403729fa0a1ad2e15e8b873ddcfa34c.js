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
var redis_1 = require("./../util/redis");
var index_1 = require("./../util/index");
exports.checkRedisTime = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
    var Authorization, _a, verifiedToken, token, name, promise, Reply;
    var _this = this;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                Authorization = req.headers['authorization'];
                if (!Authorization) {
                    return [2 /*return*/, res.json({
                            status: 410,
                            success: false,
                            data: null,
                            msg: "该账号已在异地登陆"
                        })];
                }
                return [4 /*yield*/, index_1.getUserId(Authorization)];
            case 1:
                _a = _b.sent(), verifiedToken = _a.verifiedToken, token = _a.token;
                process.on('unhandledRejection', function (reason) {
                    next(reason);
                });
                name = verifiedToken.name;
                if (!name) return [3 /*break*/, 3];
                redis_1.client.on("error", function (err) {
                    res.end("redis close");
                });
                promise = new Promise(function (resolve, reject) {
                    redis_1.client.get(name, function (err, reply) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            resolve(reply);
                            return [2 /*return*/];
                        });
                    }); });
                });
                return [4 /*yield*/, promise];
            case 2:
                Reply = _b.sent();
                if (Reply) {
                    if (Reply === token) {
                        redis_1.client.expire(name, 7200);
                        next();
                    }
                    else {
                        return [2 /*return*/, res.json({
                                status: 409,
                                success: false,
                                data: null,
                                msg: "该账号已在异地登陆"
                            })];
                    }
                }
                else {
                    return [2 /*return*/, res.json({
                            status: 409,
                            success: false,
                            data: null,
                            msg: "闲置超时，请重新登陆"
                        })];
                }
                return [3 /*break*/, 4];
            case 3:
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("token error");
                _b.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvd29yay9zZXJ2ZS9taWRkbGV3YXJlL2NoZWNrUmVkaXNUaW1lLnRzIiwic291cmNlcyI6WyIvaG9tZS93b3JrL3NlcnZlL21pZGRsZXdhcmUvY2hlY2tSZWRpc1RpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUJBd0VDOztBQXhFRCx5Q0FBeUM7QUFDekMseUNBQTRDO0FBRS9CLFFBQUEsY0FBYyxHQUFHLFVBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJOzs7Ozs7Z0JBRXpDLGFBQWEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO2dCQUVsRCxJQUFHLENBQUMsYUFBYSxFQUFDO29CQUNkLHNCQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7NEJBQ1osTUFBTSxFQUFDLEdBQUc7NEJBQ1YsT0FBTyxFQUFDLEtBQUs7NEJBQ2IsSUFBSSxFQUFDLElBQUk7NEJBQ1QsR0FBRyxFQUFDLFdBQVc7eUJBQ2xCLENBQUMsRUFBQTtpQkFDTDtnQkFFK0IscUJBQU0saUJBQVMsQ0FBQyxhQUFhLENBQUMsRUFBQTs7Z0JBQXhELEtBQTBCLFNBQThCLEVBQXRELGFBQWEsbUJBQUEsRUFBQyxLQUFLLFdBQUE7Z0JBRTNCLE9BQU8sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsVUFBQyxNQUFNO29CQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQ2hCLENBQUMsQ0FBQyxDQUFDO2dCQUVHLElBQUksR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFBO3FCQUUzQixJQUFJLEVBQUosd0JBQUk7Z0JBRUosY0FBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxHQUFRO29CQUVqQyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBO2dCQUUxQixDQUFDLENBQUMsQ0FBQztnQkFFQyxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtvQkFFdEMsY0FBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBTyxHQUFHLEVBQUUsS0FBSzs7NEJBRWhDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTs7O3lCQUVmLENBQUMsQ0FBQTtnQkFFTixDQUFDLENBQUMsQ0FBQTtnQkFFWSxxQkFBTSxPQUFPLEVBQUE7O2dCQUFyQixLQUFLLEdBQUcsU0FBYTtnQkFFM0IsSUFBRyxLQUFLLEVBQUM7b0JBQ0wsSUFBRyxLQUFLLEtBQUssS0FBSyxFQUFDO3dCQUNmLGNBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFBO3dCQUN4QixJQUFJLEVBQUUsQ0FBQTtxQkFDVDt5QkFBSTt3QkFDRCxzQkFBTyxHQUFHLENBQUMsSUFBSSxDQUFDO2dDQUNaLE1BQU0sRUFBQyxHQUFHO2dDQUNWLE9BQU8sRUFBQyxLQUFLO2dDQUNiLElBQUksRUFBQyxJQUFJO2dDQUNULEdBQUcsRUFBQyxXQUFXOzZCQUNsQixDQUFDLEVBQUE7cUJBQ0w7aUJBQ0o7cUJBQUk7b0JBQ0Qsc0JBQU8sR0FBRyxDQUFDLElBQUksQ0FBQzs0QkFDWixNQUFNLEVBQUMsR0FBRzs0QkFDVixPQUFPLEVBQUMsS0FBSzs0QkFDYixJQUFJLEVBQUMsSUFBSTs0QkFDVCxHQUFHLEVBQUMsWUFBWTt5QkFDbkIsQ0FBQyxFQUFBO2lCQUNMOzs7Z0JBSUQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztnQkFFckQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7Ozs7S0FHOUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4vLi4vdXRpbC9yZWRpcyc7XG5pbXBvcnQgeyBnZXRVc2VySWQgfSBmcm9tICcuLy4uL3V0aWwvaW5kZXgnO1xuXG5leHBvcnQgY29uc3QgY2hlY2tSZWRpc1RpbWUgPSBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcblxuICAgIGNvbnN0IEF1dGhvcml6YXRpb24gPSByZXEuaGVhZGVyc1snYXV0aG9yaXphdGlvbiddXG5cbiAgICBpZighQXV0aG9yaXphdGlvbil7XG4gICAgICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICAgICAgICBzdGF0dXM6NDEwLFxuICAgICAgICAgICAgc3VjY2VzczpmYWxzZSxcbiAgICAgICAgICAgIGRhdGE6bnVsbCxcbiAgICAgICAgICAgIG1zZzpcIuivpei0puWPt+W3suWcqOW8guWcsOeZu+mZhlwiXG4gICAgICAgIH0pICAgIFxuICAgIH1cblxuICAgIGNvbnN0IHsgdmVyaWZpZWRUb2tlbix0b2tlbiB9ID0gYXdhaXQgZ2V0VXNlcklkKEF1dGhvcml6YXRpb24pXG5cbiAgICBwcm9jZXNzLm9uKCd1bmhhbmRsZWRSZWplY3Rpb24nLCAocmVhc29uKT0+e1xuICAgICAgICBuZXh0KHJlYXNvbilcbiAgICB9KTtcblxuICAgIGNvbnN0IG5hbWUgPSB2ZXJpZmllZFRva2VuLm5hbWVcbiAgICAgXG4gICAgaWYgKG5hbWUpIHtcbiAgICAgICAgXG4gICAgICAgIGNsaWVudC5vbihcImVycm9yXCIsIGZ1bmN0aW9uIChlcnI6IGFueSkge1xuXG4gICAgICAgICAgICByZXMuZW5kKFwicmVkaXMgY2xvc2VcIikgICAgICAgICBcbiAgICAgIFxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHsgXG5cbiAgICAgICAgICAgIGNsaWVudC5nZXQobmFtZSwgYXN5bmMgKGVyciwgcmVwbHkpID0+IHtcbiAgICAgIFxuICAgICAgICAgICAgICByZXNvbHZlKHJlcGx5KVxuICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBjb25zdCBSZXBseSA9IGF3YWl0IHByb21pc2VcblxuICAgICAgICBpZihSZXBseSl7XG4gICAgICAgICAgICBpZihSZXBseSA9PT0gdG9rZW4pe1xuICAgICAgICAgICAgICAgIGNsaWVudC5leHBpcmUobmFtZSw3MjAwKVxuICAgICAgICAgICAgICAgIG5leHQoKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOjQwOSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczpmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTpudWxsLFxuICAgICAgICAgICAgICAgICAgICBtc2c6XCLor6XotKblj7flt7LlnKjlvILlnLDnmbvpmYZcIlxuICAgICAgICAgICAgICAgIH0pICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICAgICAgICAgICAgc3RhdHVzOjQwOSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOmZhbHNlLFxuICAgICAgICAgICAgICAgIGRhdGE6bnVsbCxcbiAgICAgICAgICAgICAgICBtc2c6XCLpl7Lnva7otoXml7bvvIzor7fph43mlrDnmbvpmYZcIlxuICAgICAgICAgICAgfSkgICAgICBcbiAgICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICByZXMud3JpdGVIZWFkKDIwMCwgeyBcIkNvbnRlbnQtVHlwZVwiOiBcInRleHQvcGxhaW5cIiB9KTtcblxuICAgICAgICByZXMuZW5kKFwidG9rZW4gZXJyb3JcIik7XG5cbiAgICB9XG59Il19
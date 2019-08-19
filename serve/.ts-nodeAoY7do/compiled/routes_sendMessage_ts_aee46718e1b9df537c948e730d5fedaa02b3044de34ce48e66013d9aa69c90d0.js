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
var express = require("express");
var prisma_client_1 = require("../generated/prisma-client");
var util_1 = require("../util");
var router = express.Router();
router.post("/list", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_client_1.prisma.msgs().$fragment("\n        fragment msg on msgs {\n            id\n            name\n            phone\n            message\n            createdAt\n            remarks\n            deal\n            cuser{\n                id\n                name\n                realName\n            }\n            dealTime\n        }\n    ")];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json({
                        data: result
                    })];
        }
    });
}); });
router.post("/add", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, name, phone, message, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, phone = _a.phone, message = _a.message;
                return [4 /*yield*/, prisma_client_1.prisma.createMsg({
                        name: name,
                        phone: phone,
                        message: message
                    })];
            case 1:
                result = _b.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); });
router.post('/delete', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var ids, idsNum, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ids = req.body.ids;
                idsNum = ids.map(Number);
                return [4 /*yield*/, prisma_client_1.prisma.deleteManyMsgs({
                        id_in: idsNum
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); });
router.post('/deal', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, id, remark, deal, Authorization, adminUserId, Id, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, remark = _a.remark, deal = _a.deal;
                Authorization = req.headers['authorization'];
                return [4 /*yield*/, util_1.getUserId(Authorization)];
            case 1:
                adminUserId = (_b.sent()).adminUserId;
                Id = parseInt(id, 10);
                return [4 /*yield*/, prisma_client_1.prisma.updateMsg({
                        where: {
                            id: Id
                        },
                        data: {
                            remarks: remark,
                            deal: deal,
                            dealTime: new Date(),
                            cuser: {
                                connect: {
                                    id: adminUserId
                                }
                            }
                        }
                    })];
            case 2:
                result = _b.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvd29yay9zZXJ2ZS9yb3V0ZXMvc2VuZE1lc3NhZ2UudHMiLCJzb3VyY2VzIjpbIi9ob21lL3dvcmsvc2VydmUvcm91dGVzL3NlbmRNZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQXlGdUI7O0FBekZ2QixpQ0FBa0M7QUFDbEMsNERBQW9EO0FBQ3BELGdDQUFvQztBQUVwQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7QUFFL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBTyxHQUFHLEVBQUUsR0FBRzs7OztvQkFFakIscUJBQU0sc0JBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsd1RBZ0I1QyxDQUFDLEVBQUE7O2dCQWhCSSxNQUFNLEdBQUcsU0FnQmI7Z0JBRUYsc0JBQU8sR0FBRyxDQUFDLElBQUksQ0FBQzt3QkFDWixJQUFJLEVBQUUsTUFBTTtxQkFDZixDQUFDLEVBQUE7OztLQUNMLENBQUMsQ0FBQTtBQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQU8sR0FBRyxFQUFFLEdBQUc7Ozs7O2dCQUV6QixLQUEyQixHQUFHLENBQUMsSUFBSSxFQUFqQyxJQUFJLFVBQUEsRUFBRSxLQUFLLFdBQUEsRUFBRSxPQUFPLGFBQUEsQ0FBYTtnQkFFMUIscUJBQU0sc0JBQU0sQ0FBQyxTQUFTLENBQUM7d0JBQ2xDLElBQUksRUFBRSxJQUFJO3dCQUNWLEtBQUssRUFBRSxLQUFLO3dCQUNaLE9BQU8sRUFBRSxPQUFPO3FCQUNuQixDQUFDLEVBQUE7O2dCQUpJLE1BQU0sR0FBRyxTQUliO2dCQUVGLHNCQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUE7OztLQUMxQixDQUFDLENBQUE7QUFHRixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFPLEdBQUcsRUFBRSxHQUFHOzs7OztnQkFFMUIsR0FBRyxHQUFLLEdBQUcsQ0FBQyxJQUFJLElBQWIsQ0FBYTtnQkFFbEIsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBRWYscUJBQU0sc0JBQU0sQ0FBQyxjQUFjLENBQUM7d0JBQ3ZDLEtBQUssRUFBRSxNQUFNO3FCQUNoQixDQUFDLEVBQUE7O2dCQUZJLE1BQU0sR0FBRyxTQUViO2dCQUVGLHNCQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUE7OztLQUUxQixDQUFDLENBQUE7QUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFPLEdBQUcsRUFBRSxHQUFHOzs7OztnQkFFMUIsS0FBdUIsR0FBRyxDQUFDLElBQUksRUFBN0IsRUFBRSxRQUFBLEVBQUUsTUFBTSxZQUFBLEVBQUUsSUFBSSxVQUFBLENBQWE7Z0JBRS9CLGFBQWEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO2dCQUV6QixxQkFBTSxnQkFBUyxDQUFDLGFBQWEsQ0FBQyxFQUFBOztnQkFBL0MsV0FBVyxHQUFNLENBQUEsU0FBOEIsQ0FBQSxZQUFwQztnQkFFYixFQUFFLEdBQUcsUUFBUSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQTtnQkFFWCxxQkFBTSxzQkFBTSxDQUFDLFNBQVMsQ0FBQzt3QkFDbEMsS0FBSyxFQUFFOzRCQUNILEVBQUUsRUFBRSxFQUFFO3lCQUNUO3dCQUNELElBQUksRUFBRTs0QkFDRixPQUFPLEVBQUUsTUFBTTs0QkFDZixJQUFJLEVBQUUsSUFBSTs0QkFDVixRQUFRLEVBQUMsSUFBSSxJQUFJLEVBQUU7NEJBQ25CLEtBQUssRUFBQztnQ0FDRixPQUFPLEVBQUM7b0NBQ0osRUFBRSxFQUFDLFdBQVc7aUNBQ2pCOzZCQUNKO3lCQUNKO3FCQUNKLENBQUMsRUFBQTs7Z0JBZEksTUFBTSxHQUFHLFNBY2I7Z0JBRUYsc0JBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQTs7O0tBRTFCLENBQUMsQ0FBQTtBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnLi4vZ2VuZXJhdGVkL3ByaXNtYS1jbGllbnQnO1xuaW1wb3J0IHsgZ2V0VXNlcklkIH0gZnJvbSAnLi4vdXRpbCc7XG5cbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKClcblxucm91dGVyLnBvc3QoYC9saXN0YCwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBwcmlzbWEubXNncygpLiRmcmFnbWVudChgXG4gICAgICAgIGZyYWdtZW50IG1zZyBvbiBtc2dzIHtcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBuYW1lXG4gICAgICAgICAgICBwaG9uZVxuICAgICAgICAgICAgbWVzc2FnZVxuICAgICAgICAgICAgY3JlYXRlZEF0XG4gICAgICAgICAgICByZW1hcmtzXG4gICAgICAgICAgICBkZWFsXG4gICAgICAgICAgICBjdXNlcntcbiAgICAgICAgICAgICAgICBpZFxuICAgICAgICAgICAgICAgIG5hbWVcbiAgICAgICAgICAgICAgICByZWFsTmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVhbFRpbWVcbiAgICAgICAgfVxuICAgIGApXG5cbiAgICByZXR1cm4gcmVzLmpzb24oe1xuICAgICAgICBkYXRhOiByZXN1bHRcbiAgICB9KVxufSlcblxucm91dGVyLnBvc3QoYC9hZGRgLCBhc3luYyAocmVxLCByZXMpID0+IHtcblxuICAgIGNvbnN0IHsgbmFtZSwgcGhvbmUsIG1lc3NhZ2UgfSA9IHJlcS5ib2R5XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBwcmlzbWEuY3JlYXRlTXNnKHtcbiAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgcGhvbmU6IHBob25lLFxuICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgfSlcblxuICAgIHJldHVybiByZXMuanNvbihyZXN1bHQpXG59KVxuXG5cbnJvdXRlci5wb3N0KCcvZGVsZXRlJywgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG5cbiAgICBjb25zdCB7IGlkcyB9ID0gcmVxLmJvZHlcblxuICAgIGNvbnN0IGlkc051bSA9IGlkcy5tYXAoTnVtYmVyKVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcHJpc21hLmRlbGV0ZU1hbnlNc2dzKHtcbiAgICAgICAgaWRfaW46IGlkc051bVxuICAgIH0pXG5cbiAgICByZXR1cm4gcmVzLmpzb24ocmVzdWx0KVxuXG59KVxuXG5yb3V0ZXIucG9zdCgnL2RlYWwnLCBhc3luYyAocmVxLCByZXMpID0+IHtcblxuICAgIGNvbnN0IHsgaWQsIHJlbWFyaywgZGVhbCB9ID0gcmVxLmJvZHlcblxuICAgIGNvbnN0IEF1dGhvcml6YXRpb24gPSByZXEuaGVhZGVyc1snYXV0aG9yaXphdGlvbiddXG4gIFxuICAgIGNvbnN0IHsgYWRtaW5Vc2VySWQgIH0gPSBhd2FpdCBnZXRVc2VySWQoQXV0aG9yaXphdGlvbilcblxuICAgIGNvbnN0IElkID0gcGFyc2VJbnQoaWQsMTApXG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBwcmlzbWEudXBkYXRlTXNnKHtcbiAgICAgICAgd2hlcmU6IHtcbiAgICAgICAgICAgIGlkOiBJZFxuICAgICAgICB9LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICByZW1hcmtzOiByZW1hcmssXG4gICAgICAgICAgICBkZWFsOiBkZWFsLFxuICAgICAgICAgICAgZGVhbFRpbWU6bmV3IERhdGUoKSxcbiAgICAgICAgICAgIGN1c2VyOntcbiAgICAgICAgICAgICAgICBjb25uZWN0OntcbiAgICAgICAgICAgICAgICAgICAgaWQ6YWRtaW5Vc2VySWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlcy5qc29uKHJlc3VsdClcblxufSlcblxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZXIiXX0=
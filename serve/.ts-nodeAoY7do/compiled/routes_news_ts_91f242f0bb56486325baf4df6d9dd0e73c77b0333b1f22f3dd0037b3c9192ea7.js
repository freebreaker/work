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
router.get("/list", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_client_1.prisma.newses({
                    orderBy: "createdAt_DESC"
                }).$fragment("\n    fragment News on news {\n        id\n        title\n        content\n        cuser {\n            id\n            name\n        }\n        createdAt\n    }\n")];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); });
router.post('/add', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, title, content, userMsgs, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, content = _a.content;
                return [4 /*yield*/, util_1.getUserId(req.headers['authorization'])];
            case 1:
                userMsgs = _b.sent();
                return [4 /*yield*/, prisma_client_1.prisma.createNews({
                        title: title,
                        content: content,
                        cuser: {
                            connect: {
                                id: userMsgs.adminUserId
                            }
                        }
                    })];
            case 2:
                result = _b.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); });
router.post('/edit', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, id, title, content, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, title = _a.title, content = _a.content;
                return [4 /*yield*/, prisma_client_1.prisma.updateNews({
                        where: {
                            id: id
                        },
                        data: {
                            title: title,
                            content: content
                        }
                    })];
            case 1:
                result = _b.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); });
router.post('/delete', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var ids, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ids = req.body.ids;
                return [4 /*yield*/, prisma_client_1.prisma.deleteManyNewses({
                        id_in: ids
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvd29yay9zZXJ2ZS9yb3V0ZXMvbmV3cy50cyIsInNvdXJjZXMiOlsiL2hvbWUvd29yay9zZXJ2ZS9yb3V0ZXMvbmV3cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkErRXVCOztBQS9FdkIsaUNBQWtDO0FBQ2xDLDREQUFvRDtBQUNwRCxnQ0FBb0M7QUFFcEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBRS9CLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQU8sR0FBRyxFQUFFLEdBQUc7Ozs7b0JBRWhCLHFCQUFNLHNCQUFNLENBQUMsTUFBTSxDQUFDO29CQUMvQixPQUFPLEVBQUMsZ0JBQWdCO2lCQUMzQixDQUFDLENBQUMsU0FBUyxDQUFDLHFLQVdoQixDQUFDLEVBQUE7O2dCQWJRLE1BQU0sR0FBRyxTQWFqQjtnQkFFRSxzQkFBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzs7S0FFMUIsQ0FBQyxDQUFBO0FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUcsVUFBTyxHQUFHLEVBQUMsR0FBRzs7Ozs7Z0JBRXpCLEtBQW9CLEdBQUcsQ0FBQyxJQUFJLEVBQTNCLEtBQUssV0FBQSxFQUFHLE9BQU8sYUFBQSxDQUFZO2dCQUVqQixxQkFBTSxnQkFBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBQTs7Z0JBQXhELFFBQVEsR0FBRyxTQUE2QztnQkFFL0MscUJBQU0sc0JBQU0sQ0FBQyxVQUFVLENBQUM7d0JBQ25DLEtBQUssRUFBQyxLQUFLO3dCQUNYLE9BQU8sRUFBQyxPQUFPO3dCQUNmLEtBQUssRUFBQzs0QkFDRixPQUFPLEVBQUM7Z0NBQ0osRUFBRSxFQUFDLFFBQVEsQ0FBQyxXQUFXOzZCQUMxQjt5QkFDSjtxQkFDSixDQUFDLEVBQUE7O2dCQVJJLE1BQU0sR0FBRyxTQVFiO2dCQUVGLHNCQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUE7OztLQUUxQixDQUFDLENBQUE7QUFHRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRyxVQUFPLEdBQUcsRUFBQyxHQUFHOzs7OztnQkFFMUIsS0FBd0IsR0FBRyxDQUFDLElBQUksRUFBL0IsRUFBRSxRQUFBLEVBQUcsS0FBSyxXQUFBLEVBQUUsT0FBTyxhQUFBLENBQVk7Z0JBRXZCLHFCQUFNLHNCQUFNLENBQUMsVUFBVSxDQUFDO3dCQUNuQyxLQUFLLEVBQUM7NEJBQ0YsRUFBRSxFQUFDLEVBQUU7eUJBQ1I7d0JBQ0QsSUFBSSxFQUFDOzRCQUNELEtBQUssRUFBQyxLQUFLOzRCQUNYLE9BQU8sRUFBQyxPQUFPO3lCQUNsQjtxQkFDSixDQUFDLEVBQUE7O2dCQVJJLE1BQU0sR0FBRyxTQVFiO2dCQUVGLHNCQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUE7OztLQUUxQixDQUFDLENBQUE7QUFHRixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRyxVQUFPLEdBQUcsRUFBRyxHQUFHOzs7OztnQkFFNUIsR0FBRyxHQUFLLEdBQUcsQ0FBQyxJQUFJLElBQWIsQ0FBYTtnQkFFVCxxQkFBTSxzQkFBTSxDQUFDLGdCQUFnQixDQUFDO3dCQUN6QyxLQUFLLEVBQUMsR0FBRztxQkFDWixDQUFDLEVBQUE7O2dCQUZJLE1BQU0sR0FBRyxTQUViO2dCQUVGLHNCQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUE7OztLQUUxQixDQUFDLENBQUE7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcydcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJy4uL2dlbmVyYXRlZC9wcmlzbWEtY2xpZW50JztcbmltcG9ydCB7IGdldFVzZXJJZCB9IGZyb20gJy4uL3V0aWwnO1xuXG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpXG5cbnJvdXRlci5nZXQoYC9saXN0YCwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBwcmlzbWEubmV3c2VzKHtcbiAgICAgICAgb3JkZXJCeTpcImNyZWF0ZWRBdF9ERVNDXCJcbiAgICB9KS4kZnJhZ21lbnQoYFxuICAgIGZyYWdtZW50IE5ld3Mgb24gbmV3cyB7XG4gICAgICAgIGlkXG4gICAgICAgIHRpdGxlXG4gICAgICAgIGNvbnRlbnRcbiAgICAgICAgY3VzZXIge1xuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgICAgICBjcmVhdGVkQXRcbiAgICB9XG5gKVxuXG4gICAgcmV0dXJuIHJlcy5qc29uKHJlc3VsdClcblxufSlcblxucm91dGVyLnBvc3QoJy9hZGQnICwgYXN5bmMgKHJlcSxyZXMpPT57XG5cbiAgICBjb25zdCB7dGl0bGUgLCBjb250ZW50fSA9IHJlcS5ib2R5XG5cbiAgICBjb25zdCB1c2VyTXNncyA9IGF3YWl0IGdldFVzZXJJZChyZXEuaGVhZGVyc1snYXV0aG9yaXphdGlvbiddKVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcHJpc21hLmNyZWF0ZU5ld3Moe1xuICAgICAgICB0aXRsZTp0aXRsZSxcbiAgICAgICAgY29udGVudDpjb250ZW50LFxuICAgICAgICBjdXNlcjp7XG4gICAgICAgICAgICBjb25uZWN0OntcbiAgICAgICAgICAgICAgICBpZDp1c2VyTXNncy5hZG1pblVzZXJJZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiByZXMuanNvbihyZXN1bHQpXG5cbn0pXG5cblxucm91dGVyLnBvc3QoJy9lZGl0JyAsIGFzeW5jIChyZXEscmVzKT0+e1xuXG4gICAgY29uc3Qge2lkICwgdGl0bGUgLGNvbnRlbnR9ID0gcmVxLmJvZHlcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHByaXNtYS51cGRhdGVOZXdzKHtcbiAgICAgICAgd2hlcmU6e1xuICAgICAgICAgICAgaWQ6aWRcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICB0aXRsZTp0aXRsZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6Y29udGVudFxuICAgICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiByZXMuanNvbihyZXN1bHQpXG5cbn0pXG5cblxucm91dGVyLnBvc3QoJy9kZWxldGUnICwgYXN5bmMgKHJlcSAsIHJlcyk9PntcbiAgICBcbiAgICBjb25zdCB7IGlkcyB9ID0gcmVxLmJvZHlcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHByaXNtYS5kZWxldGVNYW55TmV3c2VzKHtcbiAgICAgICAgaWRfaW46aWRzXG4gICAgfSlcblxuICAgIHJldHVybiByZXMuanNvbihyZXN1bHQpXG5cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gcm91dGVyIl19
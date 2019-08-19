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
var multer = require("multer");
var path = require("path");
var fs = require("fs");
var util_1 = require("../util");
var router = express.Router();
var upload = multer({ dest: path.join(__dirname, '../build/app/') });
router.post("/list", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var type, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                type = req.body.type;
                return [4 /*yield*/, prisma_client_1.prisma.picses().$fragment("\n        fragment pic on pics{\n            createdAt\n            id\n            imgSrc\n            lastModifiedAt\n            page\n            text\n            title\n            type\n            cuser {\n                id\n                name\n                realName\n            }\n        }\n    ")];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); });
router.post("/add", upload.array('files'), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, type, page, title, content, Type, Page, PageNameList, TypeNameList, userMsgs, _loop_1, i;
    var _this = this;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, type = _a.type, page = _a.page, title = _a.title, content = _a.content;
                Type = parseInt(type, 10);
                Page = parseInt(page, 10);
                PageNameList = ["page1", "page2",];
                TypeNameList = ["top", "middle", "bottom"];
                return [4 /*yield*/, util_1.getUserId(req.headers['authorization'])];
            case 1:
                userMsgs = _b.sent();
                if (req.files instanceof Array) {
                    _loop_1 = function (i) {
                        var Time = new Date().getTime();
                        var ext = req.files[i].originalname.split('.')[1];
                        var temp_path = req.files[i].path;
                        var target_path = req.files[i].destination + (PageNameList[Page - 1] + "_" + TypeNameList[Type - 1] + "_" + Time + "_" + i + "." + ext);
                        console.log(target_path);
                        fs.rename(temp_path, target_path, function (error) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!!error) return [3 /*break*/, 2];
                                        console.log('上传成功');
                                        return [4 /*yield*/, prisma_client_1.prisma.createPics({
                                                type: Type,
                                                page: Page,
                                                title: title,
                                                text: content,
                                                cuser: {
                                                    connect: {
                                                        id: userMsgs.adminUserId
                                                    }
                                                },
                                                imgSrc: PageNameList[Page - 1] + "_" + TypeNameList[Type - 1] + "_" + Time + "_" + i + "." + ext
                                            })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                    };
                    for (i = 0; i < req.files.length; i++) {
                        _loop_1(i);
                    }
                }
                return [2 /*return*/, res.json({
                        success: true
                    })];
        }
    });
}); });
router.post("/edit", upload.single('files'), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, editId, type, page, title, content, imgSrc, Type, Page, Id, userMsgs, temp_path, target_path;
    var _this = this;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, editId = _a.editId, type = _a.type, page = _a.page, title = _a.title, content = _a.content, imgSrc = _a.imgSrc;
                Type = parseInt(type, 10);
                Page = parseInt(page, 10);
                Id = parseInt(editId, 10);
                return [4 /*yield*/, util_1.getUserId(req.headers['authorization'])];
            case 1:
                userMsgs = _b.sent();
                return [4 /*yield*/, prisma_client_1.prisma.updatePics({
                        where: {
                            id: Id
                        },
                        data: {
                            type: Type,
                            page: Page,
                            title: title,
                            text: content,
                            cuser: {
                                connect: {
                                    id: userMsgs.adminUserId
                                }
                            }
                        }
                    })];
            case 2:
                _b.sent();
                if (req.file) {
                    temp_path = req.file.path;
                    target_path = req.file.destination + imgSrc;
                    fs.rename(temp_path, target_path, function (error) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (!error) {
                            }
                            return [2 /*return*/];
                        });
                    }); });
                }
                return [2 /*return*/, res.json({
                        success: true
                    })];
        }
    });
}); });
router.post('/delete', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var ids, idsNum, deletedPics, i, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ids = req.body.ids;
                idsNum = ids.map(Number);
                return [4 /*yield*/, prisma_client_1.prisma.picses({ where: { id_in: ids } })];
            case 1:
                deletedPics = _a.sent();
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < deletedPics.length)) return [3 /*break*/, 5];
                return [4 /*yield*/, fs.unlinkSync(path.join(__dirname, '../build/app/') + ("" + deletedPics[i].imgSrc))];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5: return [4 /*yield*/, prisma_client_1.prisma.deleteManyPicses({
                    id_in: idsNum
                })];
            case 6:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvd29yay9zZXJ2ZS9yb3V0ZXMvcGljcy50cyIsInNvdXJjZXMiOlsiL2hvbWUvd29yay9zZXJ2ZS9yb3V0ZXMvcGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkE0SnVCOztBQTVKdkIsaUNBQWtDO0FBQ2xDLDREQUFvRDtBQUNwRCwrQkFBZ0M7QUFDaEMsMkJBQTZCO0FBQzdCLHVCQUF3QjtBQUN4QixnQ0FBb0M7QUFDcEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBRS9CLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7QUFHdkUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBTyxHQUFHLEVBQUUsR0FBRzs7Ozs7Z0JBRXhCLElBQUksR0FBSyxHQUFHLENBQUMsSUFBSSxLQUFiLENBQWE7Z0JBRVYscUJBQU0sc0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsMFRBZ0I5QyxDQUFDLEVBQUE7O2dCQWhCSSxNQUFNLEdBQUcsU0FnQmI7Z0JBRUYsc0JBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQTs7O0tBQzFCLENBQUMsQ0FBQTtBQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBTyxHQUFHLEVBQUUsR0FBRzs7Ozs7O2dCQUVoRCxLQUFpQyxHQUFHLENBQUMsSUFBSSxFQUF2QyxJQUFJLFVBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxLQUFLLFdBQUEsRUFBRSxPQUFPLGFBQUEsQ0FBYTtnQkFFekMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7Z0JB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RUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFBOztnQkFBNUQsV0FBVyxHQUFHLFNBQThDO2dCQUV6RCxDQUFDLEdBQUcsQ0FBQzs7O3FCQUFFLENBQUEsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUE7Z0JBQ2xDLHFCQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLElBQUcsS0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBUSxDQUFBLENBQUMsRUFBQTs7Z0JBQXZGLFNBQXVGLENBQUE7OztnQkFEbkQsQ0FBQyxFQUFFLENBQUE7O29CQUk1QixxQkFBTSxzQkFBTSxDQUFDLGdCQUFnQixDQUFDO29CQUN6QyxLQUFLLEVBQUUsTUFBTTtpQkFDaEIsQ0FBQyxFQUFBOztnQkFGSSxNQUFNLEdBQUcsU0FFYjtnQkFFRixzQkFBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFBOzs7S0FFMUIsQ0FBQyxDQUFBO0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tICcuLi9nZW5lcmF0ZWQvcHJpc21hLWNsaWVudCc7XG5pbXBvcnQgKiBhcyBtdWx0ZXIgZnJvbSAnbXVsdGVyJ1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IHsgZ2V0VXNlcklkIH0gZnJvbSAnLi4vdXRpbCc7XG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpXG5cbmNvbnN0IHVwbG9hZCA9IG11bHRlcih7IGRlc3Q6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9idWlsZC9hcHAvJykgfSk7XG5cblxucm91dGVyLnBvc3QoYC9saXN0YCwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG5cbiAgICBjb25zdCB7IHR5cGUgfSA9IHJlcS5ib2R5XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBwcmlzbWEucGljc2VzKCkuJGZyYWdtZW50KGBcbiAgICAgICAgZnJhZ21lbnQgcGljIG9uIHBpY3N7XG4gICAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgICBpbWdTcmNcbiAgICAgICAgICAgIGxhc3RNb2RpZmllZEF0XG4gICAgICAgICAgICBwYWdlXG4gICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICB0aXRsZVxuICAgICAgICAgICAgdHlwZVxuICAgICAgICAgICAgY3VzZXIge1xuICAgICAgICAgICAgICAgIGlkXG4gICAgICAgICAgICAgICAgbmFtZVxuICAgICAgICAgICAgICAgIHJlYWxOYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBgKVxuXG4gICAgcmV0dXJuIHJlcy5qc29uKHJlc3VsdClcbn0pXG5cbnJvdXRlci5wb3N0KGAvYWRkYCwgdXBsb2FkLmFycmF5KCdmaWxlcycpLCBhc3luYyAocmVxLCByZXMpID0+IHtcblxuICAgIGNvbnN0IHsgdHlwZSwgcGFnZSwgdGl0bGUsIGNvbnRlbnQgfSA9IHJlcS5ib2R5XG5cbiAgICBjb25zdCBUeXBlID0gcGFyc2VJbnQodHlwZSwgMTApXG5cbiAgICBjb25zdCBQYWdlID0gcGFyc2VJbnQocGFnZSwgMTApXG5cbiAgICBjb25zdCBQYWdlTmFtZUxpc3QgPSBbXCJwYWdlMVwiLCBcInBhZ2UyXCIsXVxuXG4gICAgY29uc3QgVHlwZU5hbWVMaXN0ID0gW1widG9wXCIsIFwibWlkZGxlXCIsIFwiYm90dG9tXCJdXG5cbiAgICBjb25zdCB1c2VyTXNncyA9IGF3YWl0IGdldFVzZXJJZChyZXEuaGVhZGVyc1snYXV0aG9yaXphdGlvbiddKVxuXG4gICAgaWYgKHJlcS5maWxlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXEuZmlsZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgY29uc3QgVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG5cbiAgICAgICAgICAgIGNvbnN0IGV4dCA9IHJlcS5maWxlc1tpXS5vcmlnaW5hbG5hbWUuc3BsaXQoJy4nKVsxXTtcblxuICAgICAgICAgICAgY29uc3QgdGVtcF9wYXRoID0gcmVxLmZpbGVzW2ldLnBhdGg7XG5cbiAgICAgICAgICAgIGNvbnN0IHRhcmdldF9wYXRoID0gcmVxLmZpbGVzW2ldLmRlc3RpbmF0aW9uICsgYCR7UGFnZU5hbWVMaXN0W1BhZ2UgLSAxXX1fJHtUeXBlTmFtZUxpc3RbVHlwZSAtIDFdfV8ke1RpbWV9XyR7aX0uJHtleHR9YFxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0YXJnZXRfcGF0aClcblxuICAgICAgICAgICAgZnMucmVuYW1lKHRlbXBfcGF0aCwgdGFyZ2V0X3BhdGgsIGFzeW5jIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5LiK5Lyg5oiQ5YqfJylcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcHJpc21hLmNyZWF0ZVBpY3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2U6IFBhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBjb250ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB1c2VyTXNncy5hZG1pblVzZXJJZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWdTcmM6IGAke1BhZ2VOYW1lTGlzdFtQYWdlIC0gMV19XyR7VHlwZU5hbWVMaXN0W1R5cGUgLSAxXX1fJHtUaW1lfV8ke2l9LiR7ZXh0fWBcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICAgIHN1Y2Nlc3M6IHRydWVcbiAgICB9KVxufSlcblxucm91dGVyLnBvc3QoYC9lZGl0YCwgdXBsb2FkLnNpbmdsZSgnZmlsZXMnKSwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG5cbiAgICBjb25zdCB7IGVkaXRJZCwgdHlwZSwgcGFnZSwgdGl0bGUsIGNvbnRlbnQsIGltZ1NyYyB9ID0gcmVxLmJvZHlcblxuICAgIGNvbnN0IFR5cGUgPSBwYXJzZUludCh0eXBlLCAxMClcblxuICAgIGNvbnN0IFBhZ2UgPSBwYXJzZUludChwYWdlLCAxMClcblxuICAgIGNvbnN0IElkID0gcGFyc2VJbnQoZWRpdElkLCAxMClcblxuICAgIGNvbnN0IHVzZXJNc2dzID0gYXdhaXQgZ2V0VXNlcklkKHJlcS5oZWFkZXJzWydhdXRob3JpemF0aW9uJ10pXG5cbiAgICBhd2FpdCBwcmlzbWEudXBkYXRlUGljcyh7XG4gICAgICAgIHdoZXJlOiB7XG4gICAgICAgICAgICBpZDogSWRcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdHlwZTogVHlwZSxcbiAgICAgICAgICAgIHBhZ2U6IFBhZ2UsXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICB0ZXh0OiBjb250ZW50LFxuICAgICAgICAgICAgY3VzZXI6IHtcbiAgICAgICAgICAgICAgICBjb25uZWN0OiB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB1c2VyTXNncy5hZG1pblVzZXJJZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAocmVxLmZpbGUpIHtcblxuICAgICAgICBjb25zdCB0ZW1wX3BhdGggPSByZXEuZmlsZS5wYXRoO1xuXG4gICAgICAgIGNvbnN0IHRhcmdldF9wYXRoID0gcmVxLmZpbGUuZGVzdGluYXRpb24gKyBpbWdTcmNcblxuICAgICAgICBmcy5yZW5hbWUodGVtcF9wYXRoLCB0YXJnZXRfcGF0aCwgYXN5bmMgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgICAgc3VjY2VzczogdHJ1ZVxuICAgIH0pXG5cbn0pXG5cbnJvdXRlci5wb3N0KCcvZGVsZXRlJywgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG5cbiAgICBjb25zdCB7IGlkcyB9ID0gcmVxLmJvZHlcblxuICAgIGNvbnN0IGlkc051bSA9IGlkcy5tYXAoTnVtYmVyKVxuXG4gICAgY29uc3QgZGVsZXRlZFBpY3MgPSBhd2FpdCBwcmlzbWEucGljc2VzKHsgd2hlcmU6IHsgaWRfaW46IGlkcyB9IH0pXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlbGV0ZWRQaWNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGF3YWl0IGZzLnVubGlua1N5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL2J1aWxkL2FwcC8nKSArIGAke2RlbGV0ZWRQaWNzW2ldLmltZ1NyY31gKVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHByaXNtYS5kZWxldGVNYW55UGljc2VzKHtcbiAgICAgICAgaWRfaW46IGlkc051bVxuICAgIH0pXG5cbiAgICByZXR1cm4gcmVzLmpzb24ocmVzdWx0KVxuXG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlciJdfQ==
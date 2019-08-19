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
var checkRedisTime_1 = require("./middleware/checkRedisTime");
var index_1 = require("./routes/index");
var path = require('path');
var connectHistoryApiFallback = require("connect-history-api-fallback");
var prisma_client_1 = require("./generated/prisma-client");
var app = express();
var bodyParser = require('body-parser');
app.use('/', connectHistoryApiFallback());
app.use(express.static(path.join(__dirname, 'build')));
app.set('trust proxy', true);
process.setMaxListeners(0);
process.on('uncaughtException', function (err) {
    console.log(err.stack);
    console.log('NOT exit...');
});
app.use(bodyParser.json());
app.post("/login", index_1.login);
app.use("/logout", index_1.logout);
app.use('/picsList', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var page, Page1Top, Page1Middle, Page1Bottom;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = req.body.page;
                return [4 /*yield*/, prisma_client_1.prisma.picses({
                        where: {
                            page: page,
                            type: 1
                        }
                    })];
            case 1:
                Page1Top = _a.sent();
                return [4 /*yield*/, prisma_client_1.prisma.picses({
                        where: {
                            page: page,
                            type: 2
                        }
                    })];
            case 2:
                Page1Middle = _a.sent();
                return [4 /*yield*/, prisma_client_1.prisma.picses({
                        where: {
                            page: page,
                            type: 3
                        }
                    })];
            case 3:
                Page1Bottom = _a.sent();
                return [2 /*return*/, res.json({
                        page1: {
                            banner: Page1Top,
                            middle: Page1Middle,
                            bottom: Page1Bottom
                        }
                    })];
        }
    });
}); });
app.use(checkRedisTime_1.checkRedisTime);
app.use("/adminusers", index_1.adminusers);
app.use('/pics', index_1.pics);
app.use('/message', index_1.message);
app.use('/news', index_1.news);
app.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    return res.json({
        status: 500,
        success: false,
        data: null,
        msg: "服务器出错了：" + err
    });
});
app.listen(80, function () {
    return console.log('Server is running on http://localhost:80');
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvd29yay9zZXJ2ZS9pbmRleC50cyIsInNvdXJjZXMiOlsiL2hvbWUvd29yay9zZXJ2ZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkFvR0E7O0FBcEdBLGlDQUFrQztBQUVsQyw4REFBNkQ7QUFFN0Qsd0NBQThFO0FBSTlFLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUU1Qix3RUFBMEU7QUFDMUUsMkRBQW1EO0FBRW5ELElBQU0sR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFBO0FBRXJCLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUV6QyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSx5QkFBeUIsRUFBRSxDQUFDLENBQUM7QUFFMUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUV0RCxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUU3QixPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTNCLE9BQU8sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsVUFBUyxHQUFHO0lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDN0IsQ0FBQyxDQUFDLENBQUM7QUFHSCxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBRTFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGFBQUssQ0FBQyxDQUFBO0FBRXpCLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFDLGNBQU0sQ0FBQyxDQUFBO0FBRXpCLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFHLFVBQU0sR0FBRyxFQUFHLEdBQUc7Ozs7O2dCQUU1QixJQUFJLEdBQUksR0FBRyxDQUFDLElBQUksS0FBWixDQUFZO2dCQUVOLHFCQUFNLHNCQUFNLENBQUMsTUFBTSxDQUFDO3dCQUNuQyxLQUFLLEVBQUM7NEJBQ0osSUFBSSxFQUFDLElBQUk7NEJBQ1QsSUFBSSxFQUFDLENBQUM7eUJBQ1A7cUJBQ0YsQ0FBQyxFQUFBOztnQkFMSSxRQUFRLEdBQUcsU0FLZjtnQkFFa0IscUJBQU0sc0JBQU0sQ0FBQyxNQUFNLENBQUM7d0JBQ3RDLEtBQUssRUFBQzs0QkFDSixJQUFJLEVBQUMsSUFBSTs0QkFDVCxJQUFJLEVBQUMsQ0FBQzt5QkFDUDtxQkFDRixDQUFDLEVBQUE7O2dCQUxJLFdBQVcsR0FBRyxTQUtsQjtnQkFFa0IscUJBQU0sc0JBQU0sQ0FBQyxNQUFNLENBQUM7d0JBQ3RDLEtBQUssRUFBQzs0QkFDSixJQUFJLEVBQUMsSUFBSTs0QkFDVCxJQUFJLEVBQUMsQ0FBQzt5QkFDUDtxQkFDRixDQUFDLEVBQUE7O2dCQUxJLFdBQVcsR0FBRyxTQUtsQjtnQkFFRixzQkFBTyxHQUFHLENBQUMsSUFBSSxDQUFDO3dCQUNkLEtBQUssRUFBQzs0QkFDSixNQUFNLEVBQUMsUUFBUTs0QkFDZixNQUFNLEVBQUMsV0FBVzs0QkFDbEIsTUFBTSxFQUFDLFdBQVc7eUJBQ25CO3FCQUNGLENBQUMsRUFBQTs7O0tBRUgsQ0FBQyxDQUFBO0FBRUYsR0FBRyxDQUFDLEdBQUcsQ0FBQywrQkFBYyxDQUFDLENBQUE7QUFFdkIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsa0JBQVUsQ0FBQyxDQUFBO0FBRWxDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFDLFlBQUksQ0FBQyxDQUFBO0FBRXJCLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFDLGVBQU8sQ0FBQyxDQUFBO0FBRTNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFHLFlBQUksQ0FBQyxDQUFBO0FBRXZCLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO0lBRTFCLElBQUksR0FBRyxDQUFDLFdBQVcsRUFBRTtRQUNuQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQjtJQUNELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztRQUNaLE1BQU0sRUFBQyxHQUFHO1FBQ1YsT0FBTyxFQUFDLEtBQUs7UUFDYixJQUFJLEVBQUMsSUFBSTtRQUNULEdBQUcsRUFBQyxTQUFTLEdBQUUsR0FBRztLQUNyQixDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO0lBRWIsT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDO0FBQXZELENBQXVELENBRXhELENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnXG5cbmltcG9ydCB7IGNoZWNrUmVkaXNUaW1lIH0gZnJvbSAnLi9taWRkbGV3YXJlL2NoZWNrUmVkaXNUaW1lJztcblxuaW1wb3J0IHsgbG9naW4sIGFkbWludXNlcnMsIGxvZ291dCAscGljcywgbWVzc2FnZSwgbmV3c30gZnJvbSAnLi9yb3V0ZXMvaW5kZXgnXG5cbmltcG9ydCB7IGNoZWNrQXBpQXV0aCB9IGZyb20gJy4vbWlkZGxld2FyZS9jaGVja0FwaUF1dGgnO1xuXG5jb25zdCBwYXRoID0gcmVxdWlyZSgncGF0aCcpXG5cbmltcG9ydCAqIGFzIGNvbm5lY3RIaXN0b3J5QXBpRmFsbGJhY2sgZnJvbSAnY29ubmVjdC1oaXN0b3J5LWFwaS1mYWxsYmFjayc7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tICcuL2dlbmVyYXRlZC9wcmlzbWEtY2xpZW50JztcblxuY29uc3QgYXBwID0gZXhwcmVzcygpXG5cbmNvbnN0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpXG5cbmFwcC51c2UoJy8nLCBjb25uZWN0SGlzdG9yeUFwaUZhbGxiYWNrKCkpO1xuXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICdidWlsZCcpKSlcblxuYXBwLnNldCgndHJ1c3QgcHJveHknLCB0cnVlKTtcblxucHJvY2Vzcy5zZXRNYXhMaXN0ZW5lcnMoMCk7XG5cbnByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgZnVuY3Rpb24oZXJyKSB7XG4gIGNvbnNvbGUubG9nKGVyci5zdGFjayk7XG4gIGNvbnNvbGUubG9nKCdOT1QgZXhpdC4uLicpO1xufSk7XG5cblxuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSlcblxuYXBwLnBvc3QoYC9sb2dpbmAsIGxvZ2luKVxuXG5hcHAudXNlKGAvbG9nb3V0YCxsb2dvdXQpXG5cbmFwcC51c2UoJy9waWNzTGlzdCcgLCBhc3luYyhyZXEgLCByZXMpPT57XG5cbiAgY29uc3Qge3BhZ2V9ID0gcmVxLmJvZHlcblxuICBjb25zdCBQYWdlMVRvcCA9IGF3YWl0IHByaXNtYS5waWNzZXMoe1xuICAgIHdoZXJlOntcbiAgICAgIHBhZ2U6cGFnZSxcbiAgICAgIHR5cGU6MVxuICAgIH1cbiAgfSlcblxuICBjb25zdCBQYWdlMU1pZGRsZSA9IGF3YWl0IHByaXNtYS5waWNzZXMoe1xuICAgIHdoZXJlOntcbiAgICAgIHBhZ2U6cGFnZSxcbiAgICAgIHR5cGU6MlxuICAgIH1cbiAgfSlcblxuICBjb25zdCBQYWdlMUJvdHRvbSA9IGF3YWl0IHByaXNtYS5waWNzZXMoe1xuICAgIHdoZXJlOntcbiAgICAgIHBhZ2U6cGFnZSxcbiAgICAgIHR5cGU6M1xuICAgIH1cbiAgfSlcblxuICByZXR1cm4gcmVzLmpzb24oe1xuICAgIHBhZ2UxOntcbiAgICAgIGJhbm5lcjpQYWdlMVRvcCxcbiAgICAgIG1pZGRsZTpQYWdlMU1pZGRsZSxcbiAgICAgIGJvdHRvbTpQYWdlMUJvdHRvbVxuICAgIH1cbiAgfSlcblxufSlcblxuYXBwLnVzZShjaGVja1JlZGlzVGltZSlcblxuYXBwLnVzZShgL2FkbWludXNlcnNgLCBhZG1pbnVzZXJzKVxuXG5hcHAudXNlKCcvcGljcycscGljcylcblxuYXBwLnVzZSgnL21lc3NhZ2UnLG1lc3NhZ2UpXG5cbmFwcC51c2UoJy9uZXdzJyAsIG5ld3MpXG5cbmFwcC51c2UoKGVyciwgcmVxLCByZXMsIG5leHQpID0+e1xuICBcbiAgaWYgKHJlcy5oZWFkZXJzU2VudCkge1xuICAgIHJldHVybiBuZXh0KGVycik7XG4gIH1cbiAgcmV0dXJuIHJlcy5qc29uKHtcbiAgICAgIHN0YXR1czo1MDAsXG4gICAgICBzdWNjZXNzOmZhbHNlLFxuICAgICAgZGF0YTpudWxsLFxuICAgICAgbXNnOlwi5pyN5Yqh5Zmo5Ye66ZSZ5LqG77yaXCIrIGVyclxuICB9KVxufSk7XG5cbmFwcC5saXN0ZW4oODAsICgpID0+XG5cbiAgY29uc29sZS5sb2coJ1NlcnZlciBpcyBydW5uaW5nIG9uIGh0dHA6Ly9sb2NhbGhvc3Q6ODAnKSxcblxuKVxuIl19
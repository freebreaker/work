"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var qiniu = require("qiniu");
var accessKey = '95uPoPWjcYHEt9hvT_IQ2kJiuYlyawbO3KbO6tx5';
var secretKey = 'jyNQ6tKB903NEmdsPtTpzhnMMej3Edap-2eUU-VT';
exports.mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
exports.options = {
    scope: "chongdu_ui",
    expires: 86400
};
// const putPolicy = new qiniu.rs.PutPolicy(options);
// export const uploadToken = putPolicy.uploadToken(mac);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvd29yay9zZXJ2ZS91dGlsL3Fpbml1LnRzIiwic291cmNlcyI6WyIvaG9tZS93b3JrL3NlcnZlL3V0aWwvcWluaXUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2QkFBK0I7QUFFL0IsSUFBTSxTQUFTLEdBQUcsMENBQTBDLENBQUM7QUFDN0QsSUFBTSxTQUFTLEdBQUcsMENBQTBDLENBQUM7QUFFaEQsUUFBQSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBRXRELFFBQUEsT0FBTyxHQUFHO0lBQ25CLEtBQUssRUFBRSxZQUFZO0lBQ25CLE9BQU8sRUFBRSxLQUFLO0NBQ2pCLENBQUM7QUFFRixxREFBcUQ7QUFFckQseURBQXlEIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBxaW5pdSBmcm9tICdxaW5pdSc7XG5cbmNvbnN0IGFjY2Vzc0tleSA9ICc5NXVQb1BXamNZSEV0OWh2VF9JUTJrSml1WWx5YXdiTzNLYk82dHg1JztcbmNvbnN0IHNlY3JldEtleSA9ICdqeU5RNnRLQjkwM05FbWRzUHRUcHpobk1NZWozRWRhcC0yZVVVLVZUJztcblxuZXhwb3J0IGNvbnN0IG1hYyA9IG5ldyBxaW5pdS5hdXRoLmRpZ2VzdC5NYWMoYWNjZXNzS2V5LCBzZWNyZXRLZXkpO1xuXG5leHBvcnQgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICBzY29wZTogXCJjaG9uZ2R1X3VpXCIsXG4gICAgZXhwaXJlczogODY0MDBcbn07XG5cbi8vIGNvbnN0IHB1dFBvbGljeSA9IG5ldyBxaW5pdS5ycy5QdXRQb2xpY3kob3B0aW9ucyk7XG5cbi8vIGV4cG9ydCBjb25zdCB1cGxvYWRUb2tlbiA9IHB1dFBvbGljeS51cGxvYWRUb2tlbihtYWMpO1xuXG5cbiJdfQ==
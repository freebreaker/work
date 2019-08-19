"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require('crypto');
exports.cryptoPwd = function (pwd) {
    var hmac = crypto.createHmac('sha256', 'login-secret-key');
    hmac.update(pwd);
    return hmac.digest('hex');
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvd29yay9zZXJ2ZS91dGlsL2NyeXB0by50cyIsInNvdXJjZXMiOlsiL2hvbWUvd29yay9zZXJ2ZS91dGlsL2NyeXB0by50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVwQixRQUFBLFNBQVMsR0FBRyxVQUFDLEdBQVU7SUFFaEMsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUU3RCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUU3QixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcblxuZXhwb3J0IGNvbnN0IGNyeXB0b1B3ZCA9IChwd2Q6c3RyaW5nKT0+e1xuXG4gICAgY29uc3QgaG1hYyA9IGNyeXB0by5jcmVhdGVIbWFjKCdzaGEyNTYnLCAnbG9naW4tc2VjcmV0LWtleScpO1xuXG4gICAgaG1hYy51cGRhdGUocHdkKTtcblxuICAgIHJldHVybiBobWFjLmRpZ2VzdCgnaGV4JylcblxufSJdfQ==
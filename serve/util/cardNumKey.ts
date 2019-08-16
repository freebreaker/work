
import * as NodeRSA from 'node-rsa'

const key = new NodeRSA('-----BEGIN PRIVATE KEY-----\n'+ 
"MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnsvL0Ts8FimNjWvG3WOQjlzwc\n" +
"mov2hFpjqWsNP6kchL9gfMU8xqqb5HJBfikoxJCOdV3Acq66VENVwHh+2jxc7C1xh5FJiUEET5GI\n" + 
"48q3lNhXOi3Kp5UgE9lJhv6xv0hHePGCebOhPV4+VjNlWVHaIqVxgz94qP4fUjY8GSBHpm8Tgb8X\n" +
"QIuYi+Gy53JfKs+hpbRQwblvhn2KXKVKs8RDbqKfX6keXkWFFM3NLNXCDIrabrdDm/B5gX0lK0K2\n" + 
"cMt2HxbPNKO3trXC4Zy+F0yAE9vP8d8hlcyb12IB5q1Tx6d26ckeEOFGwF312Mu01Jlr3wMjz2Aw\n" +
"0jwVu54CvcrNAgMBAAECggEAPQSpzicWwKdX/oDKzrGzYRfYMXgyUSJbWUP9xbZSLCRJFiyP/8sx\n" +
"rMN0p0vmYgUTrCIcWLfhx759Oahsr4tsx0rQRizTunQMiisBg1OPITkxdpueqcxMQH24ZD6QUdCN\n" +
"1iO1jIoHyDVyIzBuRwQ2+i39EM52u8qRnIfnX/qseiUID35YjkFaI3bd4E4LIaKlbBgOidRwDcBI\n" +
"64ZJmChb5rYDf8dYByu5qbe8G7yzANiLcEx3B1/mme9Dcp1jerx+Mw/2vmiBvyYO5D4rBzU6FWKX\n"+
"FKdw0ww2GQUu2xLF6Gf7B3RAlJ8Z/Ow6WdJk/u27mXvyq0PH+DYvgZuMEtn6aQKBgQDVkzg/aRam\n"+
"XqwuS669ewFFDRkz90KHgHaXwmLtHc1DOoouXzI9BlDpXp3FIQ62oI5vRC/7IrE5P/HBJ2ouhRB2\n"+
"pJ2dUQDsd5oeAghlI4tM6AtpZTxBDaFziOPC7KXi7pkAuPvocEvHP9ko7YAVAkVfYAEkilf70z/8\n" +
"SKvgX7+7dwKBgQDJAtO6rS1OGolk3ux9f88HfcCKYLjeIU0ExBkDJdDA0FwhvU1PFLoQiPWboFJE\n"+
"WFsr1NsYPckXnEP9rDKudiCH1qg15d9gKtX+z7dzc0uBvsJ3tPNwO11D020mMqwoNhjoPB9jwCGS\n" +
"ONI3WdfFWRpgFIC/aRDPsxxKPPqjWg302wKBgGke4iOL1QMkO/k5dRN8NJ7JGKuUOyG4oCaIHer5\n" +
"rSs26AZ1AqQ4tKB42ozJfZV0J0cqt7cTV0mHaLWacc/d3MGYup9Q3HSHVcsJUxp8yTacS+mfU23t\n"+
"iJb2PKyXj/rHV3WclxjMFPBIQ9m6ND2i9YRBG67hjPa8/pRtLHPujM93AoGBAIMz9jF+Afld9tpB\n"+
"a8mK1/5CxZ9M/L34rIX03YKhdz2zgr9/CWwZ0k0iqHXZUnlL1s6oVA3hnlVr6TE16arYbelcYlUz\n"+
"4vapXx7ARDT2R427jsGF+fQCu6Ce6zqojph8nwtO2wpICWGg9w2r9dvZig62s0a89H0tosSOQubG\n"+
"zB9LAoGAa5IXQSpSxdeLIYfx+Hglx9wW/ohxyKtQ+wvEdc/+MYMK0peF34onXXucJemi3mIBn6FR\n"+
"sJq6qIb6WzX7DTPOWuwNfKyQmhojnankUr/gZUk/8pnm+cd7phpYrmQOep7MKRXSS1m06/4Eaf8R\n"+
"cVNerbxGiwC9UKjKFXiPVE+ZNcI=\n" + 
'-----END PRIVATE KEY-----',"pkcs8",{
    environment:"node",
    encryptionScheme:"pkcs1"
});

// const decrypted = key.decrypt("HD+dCIIjX3kr/jv9xIAawKRbcq9aZkk8fT9MnhQ4QjcXgk40XyB6NqZHOtjVmEJ6DpMd4ErF9L+KXfft8DuDG6R/xsQpV8b52DqjwY/jjkWNfkbtb8aA5XZN55ugl1s1e5AeTZ2yfeP4MSI+eblHiMFVj843Ia0O68VqCOfThjtzAzwMZkqbI2Y8CBn7U4Akoib07hwSqVDNcEK/Hkl2KtwIbsLeYur6gkBT82c4x1ULK4sGde9PfaROa0CDG7oN/y724EjBRZP6BTuZcTRRw8GWI5TUocF3uibHgyLmwd4E/rrsBrLMaYpf9mKsk5WPaMltOkLsGS+Ui5Qr39PqlA==",'utf8');

// console.log(decrypted)

export default key
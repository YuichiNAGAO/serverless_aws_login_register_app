const registerFeature=require("./features/register")
const loginFeature=require("./features/login")
const verifyFeature=require("./features/verify")
const util = require('utils/util')
const healthPath = '/health';
const registerPath = '/register';
const loginPath = '/login';
const verifyPath = '/verify';


exports.handler = async (event) => {
    console.log('Request Event:  ', event);
    let response;
    switch(true){
        case event.httpMethod === 'GET' && event.path == healthPath:
            response  = util.buildResponse(200);
            break
        case event.httpMethod === 'POST' && event.path == registerPath:
            const resisterBody=JSON.parse(event.body);
            response = await registerFeature.register(resisterBody);
            break
        case event.httpMethod === 'POST' && event.path == loginPath:
            const loginBody=JSON.parse(event.body);
            response = await loginFeature.login(loginBody);
            break
        case event.httpMethod === 'POST' && event.path == verifyPath:
            const verifyBody=JSON.parse(event.body);
            response = await verifyFeature.verify(verifyBody);
            break
        default:
            response  = util.buildResponse(404, '404 Not Found');
    }
    return response
};

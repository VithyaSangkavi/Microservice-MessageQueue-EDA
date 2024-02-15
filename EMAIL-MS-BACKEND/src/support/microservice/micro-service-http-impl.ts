import axios, {Method} from "axios";
import MicroService from "./micro-service";


/*handle micro service http request*/
export default class MicroServiceHttp implements MicroService {
/*send http call for micro service
@param {string} path
@param {Method} method
@param {any} data
@param {any} headers
@return {any} return axios response..completely object will be return..not handling 404 or any status code..
*/
async call(path: string, method: Method, data: any, headers: any): Promise<any> {// send axios call
  const response = await axios({url: path, data: data, headers: headers, method: method});// return response
  return response;}
}
import { Method } from "axios";

export default abstract class MicroService {
  abstract call(path:string,method:Method,data:any,headers:any): Promise<any>;
}
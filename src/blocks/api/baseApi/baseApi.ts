import {httpService} from "../../httpService/httpService";

export default abstract class BaseApi {
  protected http: httpService;

  protected constructor(endpoint: string) {
    this.http = new httpService(endpoint)
  }

  public abstract create?(data: unknown): Promise<unknown>
  public abstract read?(data: unknown): Promise<unknown>
  public abstract update?(data: unknown): Promise<unknown>
  public abstract delete?(data: unknown): Promise<unknown>


}

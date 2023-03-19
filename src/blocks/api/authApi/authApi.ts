import BaseApi from "../baseApi/baseApi";
import {GetUserData, SigninData, SignupData} from "../interfaces/authApi";

export default class AuthApi extends BaseApi {
  constructor() {
    super('/auth');
  }

  signup(signupData: SignupData) {
    return this.http.post('/signup', signupData)
  }

  signin(signinData: SigninData) {
    return this.http.post('/signin', signinData)
  }

  logout() {
    return this.http.post('/logout')
  }

  getUser(): Promise<GetUserData> {
    return this.http.get('/user')
  }

  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}

import {SigninData, SignupData} from "../api/interfaces/authApi";
import AuthApi from "../api/authApi/authApi";
import store from "../store/Store";
import Router from "../router/router";

class AuthController {
  private api = new AuthApi()
  async signin(signup: SigninData) {
    try{
      await this.api.signin(signup);
      await this.api.getUser();
    } catch (e) {

    }

  };

  async signup(signup: SignupData) {
    try {
      await this.api.signup(signup);
      await this.api.getUser();
    } catch (e) {

    }

  };

  async logout() {
    try {
      await this.api.logout();
    } catch (e) {
    }
  };

  async getUser() {
    try {
      const user = await this.api.getUser();
      store.set('user', user);
      console.log('store.getState():', store.getState());

      Router.go('/profile-page');
    } catch (e) {
    }
  };
}

export default new AuthController();

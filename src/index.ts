import { AuthorizationPage } from "./pages/authorization/authorization";
import { MessengerPage } from "./pages/messenger/messenger";
import "./index.css";
import Router from "./blocks/router/router";
import { RegistrationPage } from "./pages/registration/registration";
import { ProfilePage } from "./pages/profile/profile";
import { EditProfilePage } from "./pages/editProfile/editProfile";
import { EditPasswordPage } from "./pages/editPassword/editPassword";

enum Routes {
  Index = '/',
  AuthorizationPage = '/authorization-page',
  RegistrationPage = '/registration-page',
  ProfilePage = '/profile-page',
  EditProfilePage = '/edit-profile-page',
  EditPasswordPage = '/edit-password-page',

}

window.addEventListener("DOMContentLoaded", () => {
  Router.use(Routes.Index, MessengerPage);
  Router.use(Routes.AuthorizationPage, AuthorizationPage);
  Router.use(Routes.RegistrationPage, RegistrationPage);
  Router.use(Routes.ProfilePage, ProfilePage);
  Router.use(Routes.EditProfilePage, EditProfilePage);
  Router.use(Routes.EditPasswordPage, EditPasswordPage);
  debugger

  try {
    Router.start();
  } catch (e) {

  }
});

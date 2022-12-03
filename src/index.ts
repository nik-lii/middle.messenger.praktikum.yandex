import { AuthorizationPage } from "./pages/authorization/authorization";
import "./index.css";
import { RegistrationPage } from "./pages/registration/registration";
import { goTo } from "./utils/goTo";
import { ProfilePage } from "./pages/profile/profile";

window.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#app")!;

  const authorizationPage = new AuthorizationPage({
    title: "Авторизация",
  });

  goTo(authorizationPage);

  // const registrationPage = new RegistrationPage({
  //   title: 'Регистрация'
  // });

  // root.append(authorizationPage.getContent())
  // authorizationPage.dispatchComponentDidMount()
});

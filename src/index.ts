import { AuthorizationPage } from "./pages/authorization/authorization";
import "./index.css";
import { goTo } from "./utils/goTo";

window.addEventListener("DOMContentLoaded", () => {
  const authorizationPage = new AuthorizationPage({
    title: "Авторизация",
  });

  goTo(authorizationPage);
});

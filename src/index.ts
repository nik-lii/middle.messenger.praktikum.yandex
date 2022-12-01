import {HomePage} from "./pages/home/home";
import {Button} from "./components/button/button";

window.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector('#app')!;

  setTimeout(() => {
    homePage.setProps(
      {
        title: 'Update'
      }
    )
  }, 1000)

  const homePage = new HomePage({
    title: "old"
  });
  root.append(homePage.getContent())
})

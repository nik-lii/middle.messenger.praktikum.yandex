// Временный метод для перехода между страницами
import {BaseBlock} from "../blocks/baseBlock/baseBlock";

export const goTo = (page:BaseBlock) => {
  const root = document.querySelector("#app")!;
  root.innerHTML = "";

  root.append(page.getContent());
};

// Временный метод для перехода между страницами
export const goTo = (page) => {
  const root = document.querySelector("#app")!;
  root.innerHTML = "";

  root.append(page.getContent());
};

import { BaseBlock } from "../../blocks/baseBlock/baseBlock";
import template from "./editPassword.hbs";
import { Input } from "../../components/input/input";
import { UserInfo } from "../../components/userInfo/userInfo";
import { Button } from "../../components/button/button";
import { UserAction } from "../../components/userAction/userAction";
import { FormValidator } from "../../blocks/formValidation/formValidation";
import Router from "../../blocks/router/router";

interface EditPasswordPageProps {
}

export class EditPasswordPage extends BaseBlock<EditPasswordPageProps> {
  constructor(props: any) {
    super("div", props);
  }

  init() {
    this.children.userInfo = new UserInfo({
      inputs: [
        new Input({
          labelText: "Старый пароль",
          inputType: "password",
          inputName: "old_password",
          inputClass: "input input_fullWidth",
          inputWrapperClass: "user-info__input",
        }),
        new Input({
          labelText: "Новый пароль",
          inputType: "password",
          inputName: "password",
          inputClass: "input input_fullWidth",
          inputWrapperClass: "user-info__input",
        }),
        new Input({
          labelText: "Новый пароль (ещё раз)",
          inputType: "password",
          inputName: "repeat_password",
          inputClass: "input input_fullWidth",
          inputWrapperClass: "user-info__input",
        }),
      ],
    });

    this.children.userAction = new UserAction({
      buttons: [
        new Button({
          text: "Сохранить",
          class: "button button_fullWidth user-info__action",
          events: {
            click: () => {
            },
          },
        }),
        new Button({
          text: "Отмена",
          link: true,
          class: "link user-info__action user-info__link",
          url: "../registration/registration.hbs",
          events: {
            click: (e) => {
              e.preventDefault();
              Router.go('/profile-page');
            },
          },
        }),
      ],
    });
  }

  addValidation(element: DocumentFragment) {
    const form = element.querySelector(".form") as HTMLFormElement;
    const formValidation = new FormValidator(form, ["old_password", "password", "repeat_password"], () =>
      Router.go('/profile-page'));
    formValidation.initialize();
  }

  render() {
    const element = this.compile(template, {});
    this.addValidation(element);

    return element;
  }
}

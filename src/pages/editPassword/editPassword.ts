import { BaseBlock } from "../../blocks/baseBlock/baseBlock";
import template from "./editPassword.hbs";
import { Input } from "../../components/input/input";
import { UserInfo } from "../../components/userInfo/userInfo";
import { Button } from "../../components/button/button";
import { UserAction } from "../../components/userAction/userAction";
import { FormValidator } from "../../blocks/formValidation/formValidation";
import { goTo } from "../../utils/goTo";
import { ProfilePage } from "../profile/profile";

interface EditPasswordPageProps {}

export class EditPasswordPage extends BaseBlock<EditPasswordPageProps> {
  constructor(props) {
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
            click: () => {},
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
              const profilePage = new ProfilePage({});
              goTo(profilePage);
            },
          },
        }),
      ],
    });
  }

  addValidation(element) {
    const profilePage = new ProfilePage({});
    const form = element.querySelector(".form");
    const formValidation = new FormValidator(form, ["old_password", "password", "repeat_password"], () =>
      goTo(profilePage)
    );
    formValidation.initialize();
  }

  render() {
    const element = this.compile(template, {});
    this.addValidation(element);

    return element;
  }
}

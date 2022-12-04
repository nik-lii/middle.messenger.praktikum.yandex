import { BaseBlock } from "../../blocks/baseBlock/baseBlock";
import template from "./registration.hbs";
import { Input } from "../../components/input/input";
import { UserInfo } from "../../components/userInfo/userInfo";
import { Button } from "../../components/button/button";
import { UserAction } from "../../components/userAction/userAction";
import { FormValidator } from "../../blocks/formValidation/formValidation";
import { goTo } from "../../utils/goTo";
import { ProfilePage } from "../profile/profile";

interface RegistrationPageProps {}

export class RegistrationPage extends BaseBlock<RegistrationPageProps> {
  constructor(props:any) {
    super("div", props);
  }

  init() {
    this.children.userInfo = new UserInfo({
      inputs: [
        new Input({
          labelText: "Имя",
          inputType: "text",
          inputName: "first_name",
          inputClass: "input input_fullWidth ",
          inputWrapperClass: "user-info__input",
        }),
        new Input({
          labelText: "Фамилия",
          inputType: "text",
          inputName: "second_name",
          inputClass: "input input_fullWidth ",
          inputWrapperClass: "user-info__input",
        }),
        new Input({
          labelText: "Логин",
          inputType: "text",
          inputName: "login",
          inputClass: "input input_fullWidth ",
          inputWrapperClass: "user-info__input",
        }),
        new Input({
          labelText: "Отображаемое имя",
          inputType: "text",
          inputName: "display_name",
          inputClass: "input input_fullWidth ",
          inputWrapperClass: "user-info__input",
        }),
        new Input({
          labelText: "Почта",
          inputType: "text",
          inputName: "email",
          inputClass: "input input_fullWidth ",
          inputWrapperClass: "user-info__input",
        }),
        new Input({
          labelText: "Телефон",
          inputType: "tel",
          inputName: "phone",
          inputClass: "input input_fullWidth ",
          inputWrapperClass: "user-info__input",
        }),
        new Input({
          labelText: "Пароль",
          inputType: "password",
          inputName: "password",
          inputClass: "input input_fullWidth",
          inputWrapperClass: "user-info__input",
        }),
        new Input({
          labelText: "Пароль (ещё раз)",
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
          text: "Зарегистрироваться",
          class: "button button_fullWidth user-info__action",
          events: {
            click: () => {},
          },
        }),
      ],
    });
  }

  addValidation(element: DocumentFragment) {
    const form = element.querySelector(".form") as HTMLFormElement;
    const profilePage = new ProfilePage({});
    const formValidation = new FormValidator(
      form,
      ["first_name", "second_name", "phone", "login", "email", "password", "repeat_password", "display_name"],
      () => goTo(profilePage)
    );
    formValidation.initialize();
  }

  render() {
    const element = this.compile(template, {});
    this.addValidation(element);

    return element;
  }
}

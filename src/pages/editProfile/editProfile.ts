import { BaseBlock } from "../../blocks/baseBlock/baseBlock";
import template from "./editProfile.hbs";
import { Input } from "../../components/input/input";
import { UserInfo } from "../../components/userInfo/userInfo";
import { Button } from "../../components/button/button";
import { UserAction } from "../../components/userAction/userAction";
import { FormValidator } from "../../blocks/formValidation/formValidation";
import { RegistrationPage } from "../registration/registration";
import { goTo } from "../../utils/goTo";
import { ProfilePage } from "../profile/profile";

interface editProfilePageProps {}

export class EditProfilePage extends BaseBlock<editProfilePageProps> {
  constructor(props) {
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
      ],
    });

    this.children.userAction = new UserAction({
      buttons: [
        new Button({
          text: "Сохранить",
          class: "button button_fullWidth user-info__action",
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
    const formValidation = new FormValidator(form, ["first_name", "second_name", "phone", "login", "email", "display_name"], () =>
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

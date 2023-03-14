import { BaseBlock } from "../../blocks/baseBlock/baseBlock";
import template from "./authorization.hbs";
import { Input } from "../../components/input/input";
import { UserInfo } from "../../components/userInfo/userInfo";
import { Button } from "../../components/button/button";
import { UserAction } from "../../components/userAction/userAction";
import { FormValidator } from "../../blocks/formValidation/formValidation";
import Router from "../../blocks/router/router";

interface AuthorizationPageProps {
  title: string;
}

export class AuthorizationPage extends BaseBlock<AuthorizationPageProps> {
  constructor(props:any) {
    super("div", props);
  }

  init() {
    this.children.userInfo = new UserInfo({
      inputs: [
        new Input({
          labelText: "Логин",
          inputType: "text",
          inputName: "login",
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
      ],
    });

    this.children.userAction = new UserAction({
      buttons: [
        new Button({
          text: "Войти",
          class: "button button_fullWidth user-info__action",
          events: {
            click: () => {},
          },
        }),
        new Button({
          text: "Зарегистрироваться",
          link: true,
          class: "link user-info__action user-info__link",
          url: "../registration/registration.hbs",
          events: {
            click: (e) => {
              e.preventDefault();
              Router.go('/registration-page');
            },
          },
        }),
      ],
    });
  }

  addValidation(element: DocumentFragment) {
    const form = element.querySelector(".form") as HTMLFormElement;

    const formValidation = new FormValidator(form, ["login", "password"], () => Router.go('/'));
    formValidation.initialize();
  }

  render() {
    const element = this.compile(template, { title: this.props.title });
    this.addValidation(element);

    return element;
  }
}

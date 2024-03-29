import { BaseBlock } from "../../blocks/baseBlock/baseBlock";
import template from "./profile.hbs";
import { UserInfo } from "../../components/userInfo/userInfo";
import { Button } from "../../components/button/button";
import { UserAction } from "../../components/userAction/userAction";
import { RegistrationPage } from "../registration/registration";
import { goTo } from "../../utils/goTo";
import { DataRow } from "../../components/dataRow/dataRow";
import { EditPasswordPage } from "../editPassword/editPassword";
import { EditProfilePage } from "../editProfile/editProfile";

// временное
const MOCK_DATA = {
  Почта: "email@example.com",
  Логин: "ivan",
  Имя: "Иван",
  Фамилия: "Иванов",
  "Имя в чате": "Иван",
  Телефон: "89100000000",
};

interface ProfilePageProps {}

export class ProfilePage extends BaseBlock<ProfilePageProps> {
  constructor(props:any) {
    super("div", props);
  }

  init() {
    this.children.userInfo = new UserInfo({
      dataRows: Object.entries(MOCK_DATA).map(([key, value]) => new DataRow({ key, value })),
    });

    this.children.userAction = new UserAction({
      buttons: [
        new Button({
          text: "Изменить данные",
          link: true,
          class: "link user-info__action user-info__link",
          events: {
            click: (e) => {
              e.preventDefault();
              const editProfilePage = new EditProfilePage({
                title: "Регистрация",
              });
              goTo(editProfilePage);
            },
          },
        }),
        new Button({
          text: "Изменить пароль",
          link: true,
          class: "link user-info__action user-info__link",
          url: "../registration/registration.hbs",
          events: {
            click: (e) => {
              e.preventDefault();
              const editPasswordPage = new EditPasswordPage({});
              goTo(editPasswordPage);
            },
          },
        }),
        new Button({
          text: "Выйти",
          link: true,
          class: "link user-info__action user-info__link",
          url: "../registration/registration.hbs",
          events: {
            click: (e) => {
              e.preventDefault();
              const registrationPage = new RegistrationPage({
                title: "Регистрация",
              });
              goTo(registrationPage);
            },
          },
        }),
      ],
    });
  }

  render() {
    return this.compile(template, {});
  }
}

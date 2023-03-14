import { BaseBlock } from "../../blocks/baseBlock/baseBlock";
import template from "./messenger.hbs";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import { FormValidator } from "../../blocks/formValidation/formValidation";
import { MessagePreview } from "../../components/messagePreview/messagePreview";
import "./messenger.css";
import { ProfilePage } from "../profile/profile";
import { goTo } from "../../utils/goTo";
import Router from "../../blocks/router/router";

interface MessengerPageProps {
  title: string;
}

export class MessengerPage extends BaseBlock<MessengerPageProps> {
  constructor(props: any) {
    super("div", props);
  }

  init() {
    this.children.messagePreviews = [
      new MessagePreview({
        previewMessage: "Ivan",
        previewTitle: "Hello, World",
        previewDate: "15:31",
        previewCount: 4,
      }),
      new MessagePreview({
        previewMessage: "Alex",
        previewTitle: "Привет",
        previewDate: "15:31",
      }),
    ];
    (this.children.profileLink = new Button({
      text: "Профиль >",
      link: true,
      class: "link chats__profile-link",
      events: {
        click: (e) => {
          e.preventDefault();
          Router.go('/profile-page');
        },
      },
    })),
    (this.children.searchInput = new Input({
      labelText: "Поиск",
      inputType: "text",
      inputName: "message",
      labelClass: "chats__search-label",
      inputClass: "input chats__search",
      inputPlaceholder: "Поиск чата 🔍",
    }));

    this.children.inputMessage = new Input({
      labelText: "Сообщение",
      inputType: "text",
      inputName: "message",
      inputClass: "input input_fullWidth chat__input",
    });
    this.children.buttons = [
      new Button({
        text: "Отправить",
        class: "button chat__footer-button",
        events: {
          click: () => {},
        },
      }),
      new Button({
        text: "+",
        url: "#",
        link: true,
        class: "button button_rounded chat__footer-button",
      }),
    ];
  }

  addValidation(element: DocumentFragment) {
    const form = element.querySelector(".form") as HTMLFormElement;
    const formValidation = new FormValidator(form, ["message"]);
    formValidation.initialize();
  }

  render() {
    const element = this.compile(template, {});
    this.addValidation(element);

    return element;
  }
}

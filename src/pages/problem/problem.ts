import { BaseBlock } from "../../blocks/baseBlock/baseBlock";
import template from "./problem.hbs";
import "./problem.css";
import { Button } from "../../components/button/button";
import { goTo } from "../../utils/goTo";
import { MessengerPage } from "../messenger/messenger";

interface ProblemPageProps {
  title: string;
  subtitle: string;
}

export class ProblemPage extends BaseBlock<ProblemPageProps> {
  constructor({ title = "404", subtitle = "не туда попали" }) {
    super("div", { title, subtitle });
  }
  protected init() {
    this.children.backLink = new Button({
      text: "Вернуть в чат",
      link: true,
      class: "link",
      events: {
        click: (e) => {
          e.preventDefault();
          const messengerPage = new MessengerPage({});
          goTo(messengerPage);
        },
      },
    });
  }
  render() {
    return this.compile(template, {});
  }
}

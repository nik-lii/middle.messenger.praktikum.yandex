import { BaseBlock } from "../../blocks/baseBlock/baseBlock";
import template from "./problem.hbs";
import "./problem.css";
import { Button } from "../../components/button/button";
import Router from "../../blocks/router/router";

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
          Router.go('/')
        },
      },
    });
  }
  render() {
    return this.compile(template, {});
  }
}

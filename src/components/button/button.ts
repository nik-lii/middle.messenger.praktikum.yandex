import { BaseBlock } from "../../blocks/baseBlock/baseBlock";
import template from "./button.hbs";
import "./button.css";

interface ButtonProps {
  text: string;
  class: string;
  link?: boolean;
  url?: string;
  events?: {
    click: (e:Event) => void;
  };
}

export class Button extends BaseBlock<ButtonProps> {
  constructor(props: ButtonProps) {
    super("button", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

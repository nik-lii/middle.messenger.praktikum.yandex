import {BaseBlock} from "../../blocks/baseBlock/baseBlock";
import template from "./button.hbs";

interface ButtonProps {
  label:string;
  events: {
    click: () => void
  }
}

export class Button extends BaseBlock<ButtonProps> {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  render() {
    setTimeout(()=>{this.setProps({ label: '123'
    })}, 1000)
    return this.compile(template, {label: this.props.label, events:this.props.events })
  }
}

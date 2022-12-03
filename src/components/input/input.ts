import { BaseBlock } from "../../blocks/baseBlock/baseBlock";
import template from "./input.hbs";
import "./input.css";

interface InputProps {
  labelClass?: string;
  labelText: string;
  inputType: string;
  inputValue?: string;
  inputName: string;
  inputPlaceholder?: string;
  inputClass: string;
  inputWrapperClass?: string;
}

export class Input extends BaseBlock<InputProps> {
  constructor(props: InputProps) {
    super("input", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

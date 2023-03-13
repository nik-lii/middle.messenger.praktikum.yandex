import { BaseBlock } from "../../blocks/baseBlock/baseBlock";
import template from "./userAction.hbs";
import { Button } from "../button/button";

interface UserActionProps {
  buttons: Button[];
}

export class UserAction extends BaseBlock<UserActionProps> {
  constructor(props: UserActionProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

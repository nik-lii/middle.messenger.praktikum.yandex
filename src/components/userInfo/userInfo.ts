import { BaseBlock } from "../../blocks/baseBlock/baseBlock";
import template from "./userInfo.hbs";
import { Input } from "../input/input";
import { DataRow } from "../dataRow/dataRow";
import './userInfo.css'

interface UserInfoProps {
  inputs?: Input[];
  dataRows?: DataRow[];
}

export class UserInfo extends BaseBlock<UserInfoProps> {
  constructor(props: UserInfoProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

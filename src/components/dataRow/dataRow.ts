import { BaseBlock } from "../../blocks/baseBlock/baseBlock";
import template from "./dataRow.hbs";
import "./dataRow.css";

interface DataRowProps {
  key: string;
  value: string;
}

export class DataRow extends BaseBlock<DataRowProps> {
  constructor(props: DataRowProps) {
    super("p", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

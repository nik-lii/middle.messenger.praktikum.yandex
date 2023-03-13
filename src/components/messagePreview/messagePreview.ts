import { BaseBlock } from "../../blocks/baseBlock/baseBlock";
import template from "./messagePreview.hbs";
import "./messagePreview.css";

interface MessagePreviewProps {
  previewTitle: string;
  previewDate: string;
  previewMessage: string;
  previewCount?: number;
}

export class MessagePreview extends BaseBlock<MessagePreviewProps> {
  constructor(props: MessagePreviewProps) {
    super("div", props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

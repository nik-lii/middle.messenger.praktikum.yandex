import {BaseBlock} from "../../blocks/baseBlock/baseBlock";
import template from "./home.hbs";
import {Button} from "../../components/button/button";
interface HomePageProps {
  title: string
}

export class HomePage extends BaseBlock<HomePageProps> {
  constructor(props) {
    super('div', props);
  }

  init() {
    this.children.button = new Button({
      label: 'Click me 2',
      events: {
        click: () => console.log('click')
      }
    })
  }

  render() {
    return this.compile(template, {title: this.props.title})
  }
}


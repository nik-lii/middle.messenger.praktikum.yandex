import {EventBus} from "./utils/eventBus";
import {nanoid} from "nanoid";

export class BaseBlock<P = any> {
  // Types
  _meta: {
    tagName: keyof HTMLElementTagNameMap;
    props: P
  }
  eventBus: () => EventBus;
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };
  _element: HTMLElement;
  public id = nanoid(6)
  protected props: P;
  protected children: Record<string, BaseBlock>

  constructor(tagName:keyof HTMLElementTagNameMap = "div",  propsWithChildren: P) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this._meta = {
      tagName,
      props: props as P
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;
    this.children = children;

    this._registerEvents(eventBus);
    eventBus.emit(BaseBlock.EVENTS.INIT);
  }

  private _registerEvents(eventBus) {
    eventBus.on(BaseBlock.EVENTS.INIT, this._init.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const {tagName} = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _init() {
    this._createResources();

    this.init();
    this.eventBus().emit(BaseBlock.EVENTS.FLOW_RENDER);
  }

  protected init() {

  }

  private _componentDidMount(props) {
    this.componentDidMount(props);
  }

  componentDidMount(oldProps) {
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(BaseBlock.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps, newProps) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(BaseBlock.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps, newProps) {
    if (oldProps !== newProps) {
      return true;
    }

  }

  setProps = nextProps => {
    if (!nextProps) {
      return;
    }
    console.log('setProps:', this.props, nextProps);

    Object.assign(this.props, nextProps);
    this.componentDidUpdate(this.props, nextProps)
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    this.element.innerHTML = ''
    this.element!.append(block)

    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
     this._addEvents();
  }

protected compile(template: (context: any) => string, context: any) {
    // debugger
    const contextAndStubs = { ...context };

  Object.entries(this.children).forEach(([name, component]) => {
      contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
    });

    const html = template(contextAndStubs);

  // return html;

  const temp = document.createElement('template');
    temp.innerHTML = html;


  Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);


      if (!stub) {
        return;
      }

      // component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    });

  return temp.content;

  }

  render():DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  private _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, BaseBlock>} {
    const props: Record<string, unknown> = {};
    const children: Record<string, BaseBlock> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof BaseBlock ) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as P, children };
  }

  private _makePropsProxy(props) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = {...target}
        target[prop] = value;

        self.eventBus().emit(BaseBlock.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  private _addEvents() {
    const {events = {}} = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }


  private _createDocumentElement(tagName) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}

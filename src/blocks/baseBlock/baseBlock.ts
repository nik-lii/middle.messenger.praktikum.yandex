import { EventBus } from "../eventBus/eventBus";
import { nanoid } from "nanoid";
import { FormValidator } from "../formValidation/formValidation";

export class BaseBlock<P = any> {
  // Types
  _meta: {
    tagName: keyof HTMLElementTagNameMap;
    props: P;
  };
  eventBus: () => EventBus;
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };
  _element: HTMLElement;
  public id = nanoid(6);
  protected props: P;
  protected children: Record<string, BaseBlock | BaseBlock[]>;

  constructor(tagName: keyof HTMLElementTagNameMap = "div", propsWithChildren: P) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this._meta = {
      tagName,
      props: props as P,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;
    this.children = children;

    this._registerEvents(eventBus);
    eventBus.emit(BaseBlock.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(BaseBlock.EVENTS.INIT, this._init.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {}

  private _init() {
    this._createResources();

    this.init();
    this.eventBus().emit(BaseBlock.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  private _componentDidMount(props: any) {
    this.componentDidMount(props);
  }

  componentDidMount(props:any) {
    return props;
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(BaseBlock.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(BaseBlock.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    if (oldProps !== newProps) {
      return true;
    }
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }
    ({ ...this.props, ...nextProps });
    this.componentDidUpdate(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
  }

  protected addValidation(element: DocumentFragment) {
    const form = element.querySelector(".form") as HTMLFormElement as HTMLFormElement;
    if (form) {
      const formValidation = new FormValidator(form, []);
      formValidation.initialize();
    }
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        component.forEach((val) => {
          if (!contextAndStubs[name]) {
            contextAndStubs[name] = `<div data-id='${val.id}'></div>`;
          } else {
            contextAndStubs[name] = `${contextAndStubs[name]}<div data-id='${val.id}'></div>`;
          }
        });
        return;
      }

      contextAndStubs[name] = `<div data-id='${component.id}'></div>`;
    });

    const html = template(contextAndStubs);

    const temp = document.createElement("template");
    temp.innerHTML = html;

    Object.entries(this.children).forEach(([_, component]) => {
      let stub;
      if (Array.isArray(component)) {
        component.forEach((item) => {
          stub = temp.content.querySelector(`[data-id='${item.id}']`);
          if (!stub) {
            return;
          }

          stub.replaceWith(item.getContent()!);
        });
      } else {
        stub = temp.content.querySelector(`[data-id='${component.id}']`);
        if (!stub) {
          return;
        }

        stub.replaceWith(component.getContent()!);
      }
    });

    return temp.content;
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  private _getChildrenAndProps(childrenAndProps: P): {
    children: Record<string, BaseBlock<any> | BaseBlock[]>;
    props: P;
  } {
    const props: Record<string, unknown> = {};
    const children: Record<string, BaseBlock | BaseBlock[]> = {};

    Object.entries(childrenAndProps as unknown as object).map(([key, value]) => {
      if (value instanceof BaseBlock) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every((item) => item instanceof BaseBlock)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as P, children };
  }

  private _makePropsProxy(props:any) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };
        target[prop] = value;

        self.eventBus().emit(BaseBlock.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  private _addEvents() {
    const { events = {} } = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const { events } = this.props as P & { events: Record<string, () => void> };

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}

export class FormValidator {
  fields: string[];
  form: HTMLFormElement;
  successCallback: () => void;
  allValidate: boolean;

  constructor(form, fields, successCallback?) {
    this.form = form;
    this.fields = fields;
    this.successCallback = successCallback;
    this.allValidate = true;
  }

  initialize() {
    this.validateOnBlur();
    this.validateOnSubmit();
  }

  validateOnSubmit() {
    let self = this;

    this.form.addEventListener("submit", (e) => {
      this.allValidate = true;

      e.preventDefault();
      const currentData = {};
      self.fields.forEach((field) => {
        const input = this.form.querySelector(`#${field}`) as HTMLInputElement;
        if (!input) {
          return;
        }
        currentData[field] = input.value;
        self.validateFields(input);
      });
      if (self.allValidate) {
        this.successCallback && this.successCallback();
        console.log(currentData);
      }
    });
  }

  validateOnBlur() {
    let self = this;
    this.fields.forEach((field) => {
      const input = this.form.querySelector(`#${field}`);
      if (!input) {
        return;
      }

      input.addEventListener("blur", (event) => {
        self.validateFields(input);
      });
    });
  }

  validateFields(field) {
    if (field.name === "first_name" || field.name === "second_name") {
      const re = /^[А-ЯA-Z]{1}[а-яa-z0-9_-]{3,15}$/;
      if (re.test(field.value)) {
        this.setStatus(field, null, "success");
      } else {
        this.setStatus(
          field,
          "Поле должно быть написано латиницой или кириллицой, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).",
          "error"
        );
      }
    }

    if (field.name === "login") {
      const re = /(?!^\d+$)^[a-zA-Z0-9_-]{3,20}$/;
      if (re.test(field.value)) {
        this.setStatus(field, null, "success");
      } else {
        this.setStatus(
          field,
          "Поле должно быть от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)",
          "error"
        );
      }
    }

    if (field.name === "phone") {
      const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/;
      if (re.test(field.value)) {
        this.setStatus(field, null, "success");
      } else {
        this.setStatus(
          field,
          "Поле должно быть от 10 до 15 символов, состоит из цифр, может начинается с плюса.",
          "error"
        );
      }
    }

    if (field.name === "email") {
      const re = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})$/;
      if (re.test(field.value)) {
        this.setStatus(field, null, "success");
      } else {
        this.setStatus(
          field,
          "Поле должно быть написано латиницей, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.",
          "error"
        );
      }
    }

    if (field.name === "message") {
      if (field.value) {
        this.setStatus(field, null, "success");
      } else {
        this.setStatus(field, "Поле не должно быть пустым.", "error");
      }
    }

    if (field.name === "password" || field.name === "repeat_password" || field.name === "old_password") {
      const re = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,40})$/;
      if (re.test(field.value)) {
        this.setStatus(field, null, "success");
      } else {
        this.setStatus(
          field,
          "Поле должно быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
          "error"
        );
      }
    }
  }

  setStatus(field, message, status) {
    if (status === "success") {
      field.parentElement.querySelector(".label-wrapper__error-info-text").innerText = "";
      field.parentElement.querySelector(".label-wrapper").classList.remove("label-wrapper_error");
      field.parentElement.querySelector(".input").classList.remove("input_error");
    }

    if (status === "error") {
      this.allValidate = false;
      field.parentElement.querySelector(".label-wrapper__error-info-text").innerText = message;
      field.parentElement.querySelector(".label-wrapper").classList.add("label-wrapper_error");
      field.parentElement.querySelector(".input").classList.add("input_error");
    }
  }
}

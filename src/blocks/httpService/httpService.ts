enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

interface Options {
  method: Methods;
  data?: any;
  timeout?: number;
  headers?: Record<string, string>;
}

type HTTPMethod = (url: string, options?:Omit<Options, "method">) => Promise<XMLHttpRequest | unknown>

export function queryStringify(data: any) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const params = new URLSearchParams(data);
  return `?${params.toString()}`;
}

export class httpService {
  private url: string
  static BASE_URL = 'https://ya-praktikum.tech/api/v2';

  constructor(endpoint: string) {
    this.url = `${httpService.BASE_URL}${endpoint}`;
  }
  get: HTTPMethod = (endpoint, options = {}) => (
    this.request(this.url + endpoint, { ...options, method: Methods.GET }, options.timeout)
  );

  post: HTTPMethod = (endpoint, data = {}) => (
    this.request(this.url + endpoint, { data, method: Methods.POST })
  );

  put: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: Methods.PUT }, options.timeout)
  );

  patch: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: Methods.PATCH }, options.timeout)
  );

  delete: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: Methods.DELETE }, options.timeout)
  );

  request(
    url: string,
    options: Options,
    timeout = 10000
  ): Promise<XMLHttpRequest | unknown> {
    const { headers = {}, method, data } = options;

    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open(method, method === Methods.GET && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onreadystatechange = () => {

        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Methods.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

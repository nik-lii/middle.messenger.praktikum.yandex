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
  get: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: Methods.GET }, options.timeout)
  );

  post: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: Methods.POST }, options.timeout)
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

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === Methods.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}

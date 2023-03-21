import { OpenAPIConfig, CancelablePromise } from "../openapi";
import { ApiRequestOptions } from "../openapi/core/ApiRequestOptions";

const axiosInstance = axios.create({
  // Your custom Axios instance config
});

export const request = <T>(config: OpenAPIConfig, options: ApiRequestOptions): CancelablePromise<T> => {
  return new CancelablePromise((resolve, reject, onCancel) => {
      // Get the request URL. Depending on your needs, this might need additional processing,
      // @see ./src/templates/core/functions/getUrl.hbs
      const url = `${config.BASE}${options.path}`;

      // Optional: Get and link the cancelation token, so the request can be aborted.
      const source = axiosInstance.CancelToken.source();
      onCancel(() => source.cancel('The user aborted a request.'));

      // Execute the request. This is a minimal example, in real world scenarios
      // you will need to add headers, process form data, etc.
      // @see ./src/templates/core/axios/request.hbs
      axiosInstance.request({
          url,
          data: options.body,
          method: options.method,
          cancelToken: source.token,
      }).then((data: any) => {
          resolve(data);
      }).catch((error: any) => {
          reject(error);
      });
  });
};
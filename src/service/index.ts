import CURequest from "./request/index";
import config from "./config/index";

export const loginRequest = new CURequest({
  ...config,
  interceptors: {
    requestOnFufilledCeptor(config) {
      return config;
    },
    requestOnRejectedCeptor(err) {
      return Promise.reject(err);
    },
    responseOnFufilledCeptor(res) {
      return res;
    },
    responseOnRejectedCeptor(err) {
      return Promise.reject(err);
    }
  }
});

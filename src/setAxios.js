import router from "./router";
import axios from "axios";
import store from "./store";

export default function setAxios() {
  // 请求拦截处理
  // 就是为了验证是否登录
  axios.interceptors.request.use(
    // config就是发送给服务器的请求
    config => {
      if (sessionStorage.getItem("token")) {
        config.headers.token = sessionStorage.getItem("token");
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );

  // 响应拦截处理
  axios.interceptors.response.use(
    // response就是从服务器发送过来的请求
    response => {
      if (response.status === 200) {
        const data = response.data;
        if (data.code === -1) {
          // 表示token已经过期，需要重新登录
          // 清空vuex中的token和本地sessionStorage中的token
          store.commit("setToken", "");
          sessionStorage.removeItem("token");
          // 跳转到登录界面
          router.replace({ path: "/user/login" });
        }
        return data;
      }
      return response;
    },
    err => {
      return Promise.reject(err);
    }
  );
}

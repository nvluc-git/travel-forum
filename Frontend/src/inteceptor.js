export const setup = (instance) => {
  instance.interceptors.request.use(
    function (config) {
      let token = localStorage.getItem("user");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};

export const authorization = (instance) => {
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      console.log(window.location.origin);

      if (error.response.data.errCode === 401) {
        window.location.replace(window.location.origin + "/welcome");
        localStorage.clear();
      }

      return Promise.reject(error);
    }
  );
};

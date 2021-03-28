import { useState, useEffect } from "react";

const HttpErrorHandler = axios => {
  const [error, setError] = useState(null);

  const reqInterceptor = axios.interceptors.request.use(req => {
    setError(null);
    return req;
  });
  const resInterceptor = axios.interceptors.response.use(
    res => res,
    err => {
      setError(err);
    }
  );

  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [
    reqInterceptor,
    resInterceptor,
    axios.interceptors.request,
    axios.interceptors.response,
  ]);

  const errorConfirmedHandler = () => {
    setError(null);
  };
  return [error, errorConfirmedHandler];
};
export default HttpErrorHandler;

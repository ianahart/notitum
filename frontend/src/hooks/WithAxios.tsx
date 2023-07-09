import { useMemo, useEffect, useState } from 'react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../util/client';
import { retreiveTokens } from '../util';
import { UserContext } from '../context/user';
import { IUserContext } from '../interfaces';

interface IProps {
  children: JSX.Element;
}

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const WithAxios: React.FC<IProps> = ({ children }): JSX.Element => {
  const navigate = useNavigate();
  const [isLoaded, setLoaded] = useState(false);
  const { stowTokens, logout } = useContext(UserContext) as IUserContext;
  useMemo(() => {
    const reqInterceptorId = http.interceptors.request.use(
      (config) => {
        if (retreiveTokens()?.token && config.url !== '/auth/refresh') {
          // @ts-ignore
          config.headers.Authorization = `Bearer ${retreiveTokens()?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const resInterceptorId = http.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;
        originalRequest.headers = JSON.parse(
          JSON.stringify(originalRequest?.headers || {})
        );
        const refreshToken = retreiveTokens()?.refreshToken;

        const handleError = (error: any) => {
          processQueue(error);
          logout();
          return Promise.reject(error);
        };

        if (
          refreshToken &&
          error.response?.status === 403 &&
          originalRequest?._retry !== true
        ) {
          if (isRefreshing) {
            return new Promise(function (resolve, reject) {
              failedQueue.push({ resolve, reject });
            })
              .then(() => {
                return http(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }
          isRefreshing = true;
          originalRequest._retry = true;
          return http
            .post('/auth/refresh', {
              refreshToken: refreshToken,
            })
            .then((res) => {
              const token: string = res.data.token;
              const tokens = retreiveTokens();
              tokens.token = token;
              localStorage.setItem('tokens', JSON.stringify(tokens));

              //@ts-ignore
              stowTokens({ refreshToken: tokens.refreshToken, token: token });

              processQueue(null);

              return http(originalRequest);
            }, handleError)
            .finally(() => {
              isRefreshing = false;
            });
        }

        // Refresh token missing or expired => logout user...
        if (
          error.response?.status === 403 &&
          error.response?.data?.message === 'TokenExpiredError'
        ) {
          return handleError(error);
        }

        return Promise.reject(error);
      }
    );
    return () => {
      http.interceptors.response.eject(resInterceptorId);
      http.interceptors.request.eject(reqInterceptorId);
    };
  }, [isLoaded, setLoaded]);
  useEffect(() => {
    if (isLoaded) {
      console.log('Are you running? You shouldnt be... WithAxios.tsx');
      navigate('/login');
      logout();
      setLoaded(false);
    }
  }, [navigate, isLoaded]);

  return children;
};

export default WithAxios;

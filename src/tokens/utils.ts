import { AsyncContext } from '@nestjs-steroids/async-context';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Logger } from 'winston';

export const INTERVAL = 'INTERVAL';
export const TIMEOUT = 'TIMEOUT';
export const CRON = 'CRON';
export const LIFECYCLE_ID = 'LIFECYCLE_ID';

export interface TokensContext {
  parentLifecycleToken: string;
  lifecycleToken: string;
}

export const tokensReqInterceptor = async (
  config: AxiosRequestConfig,
  asyncContext?: AsyncContext<string, TokensContext>,
  logger?: Logger,
) => {
  const tokens = asyncContext?.get(LIFECYCLE_ID);
  config.headers.lifecycle_token = tokens?.lifecycleToken || '';

  logger?.info(`REQUEST: ${config.method} ${config.url}`, {
    ...config,
  });

  return config;
};

export const tokensResInterceptor = async (
  config: AxiosResponse<any>,
  logger?: Logger,
) => {
  logger?.info(`RESPONSE: ${config.config.method} ${config.config.url}`, {
    ...config,
  });

  return config;
};

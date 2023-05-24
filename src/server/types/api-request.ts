import type { NextApiRequest } from 'next';
import type { Session } from 'next-auth';
export interface IApiRequest<T = undefined, TQuery = { [k: string]: string | string[] }>
  extends Omit<NextApiRequest, 'body' | 'query' | 'file' | 'files'> {
  body: T;
  query: TQuery;
}

export interface IAuthorizedApiRequest<T = undefined, TQuery = { [k: string]: string | string[] }>
  extends IApiRequest<T, TQuery> {
  session: Session;
}

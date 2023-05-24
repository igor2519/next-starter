import type { ScriptProps } from 'next/script';
import type {
  BaseHTMLAttributes,
  DetailedHTMLProps,
  LinkHTMLAttributes,
  MetaHTMLAttributes,
  ReactNode,
} from 'react';

export interface IStyleProps {
  children?: ReactNode;
  media?: string;
  type?: string;
}

export interface HeadScriptProps extends Omit<ScriptProps, 'id'> {
  id: string;
}

export interface IHtmlHeadProps {
  title?: string;
  rawTitle?: string;
  base?: DetailedHTMLProps<BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>;
  style?: IStyleProps[];
  link?: DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>[];
  meta?: DetailedHTMLProps<MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>[];
  script?: HeadScriptProps[];
}

import Head from 'next/head';
import { createElement } from 'react';

import useHtmlHead from './useHtmlHead';

import type { IHtmlHeadProps } from './types';

const HtmlHead = (props: IHtmlHeadProps) => {
  const children = useHtmlHead(props);
  return createElement(Head, undefined, children);
};
export default HtmlHead;

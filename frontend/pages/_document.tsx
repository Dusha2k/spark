import { ColorModeScript } from '@chakra-ui/color-mode';
import { Html, Head, Main, NextScript } from 'next/document';
import { theme } from '../src';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <NextScript />
      </body>
    </Html>
  );
}

import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import 'nprogress/nprogress.css';
import { MainLayout, theme, useNProgress } from '../src';
import '../src/app/styles/global.css';
import { useState } from 'react';

export default function App({ Component, pageProps, router }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  useNProgress(router);

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

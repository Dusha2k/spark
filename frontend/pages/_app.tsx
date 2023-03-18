import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { MainLayout, theme } from '../src';
import '../src/app/styles/global.css';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

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

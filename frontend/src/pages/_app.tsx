import { useNProgress } from '@/shared/configs';
import '@/styles/globals.css';
import { ChakraProvider, theme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import router from 'next/router';
import { useState } from 'react';
import 'nprogress/nprogress.css';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';

export default function App({ Component, pageProps, router }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  useNProgress(router);

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

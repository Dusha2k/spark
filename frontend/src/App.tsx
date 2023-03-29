import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { InitLayout } from './layouts/InitLayout';
import { Details, Homepage, Login, Main, Register } from './pages';
import { theme } from './shared/configs';
import { store } from './shared/configs/store';
import { ToastContainer } from './shared/lib/toast';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <ToastContainer />
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <InitLayout>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/app" element={<Main />} />
                <Route path="/app/:id" element={<Details />} />
              </Routes>
            </InitLayout>
          </BrowserRouter>
        </QueryClientProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default App;

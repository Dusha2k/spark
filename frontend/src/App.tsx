import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { InitLayout } from './layouts/InitLayout';
import { SocketsLayout } from './layouts/SocketsLayout';
import { Details, Homepage, Login, Main, Register } from './pages';
import { theme } from './shared/configs';
import { store } from './shared/configs/store';
import { ToastContainer } from './shared/lib/toast';
import { HeaderLayout } from './layouts/HeaderLayout';
import { Profile } from './modules/profile';
import { NetworkStatus } from './shared/lib/network-status';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <ToastContainer />
        <NetworkStatus />
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <InitLayout>
              <SocketsLayout>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/app"
                    element={
                      <HeaderLayout>
                        <Main />
                      </HeaderLayout>
                    }
                  />
                  <Route
                    path="/app/:id"
                    element={
                      <HeaderLayout>
                        <Details />
                      </HeaderLayout>
                    }
                  />
                  <Route
                    path="/app/profile"
                    element={
                      <HeaderLayout>
                        <Profile />
                      </HeaderLayout>
                    }
                  />
                </Routes>
              </SocketsLayout>
            </InitLayout>
          </BrowserRouter>
        </QueryClientProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default App;

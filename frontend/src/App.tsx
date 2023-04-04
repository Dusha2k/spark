import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { InitLayout } from './layouts/InitLayout';
import { SocketsLayout } from './layouts/SocketsLayout';
import { Details, Homepage, Login, Main, Register } from './pages';
import { store } from './shared/configs/store';
import { HeaderLayout } from './layouts/HeaderLayout';
import { Profile } from './modules/profile';
// import { NetworkStatus } from './shared/lib/network-status';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'dark' }}
      >
        <Notifications />
        {/* <NetworkStatus /> */}
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
      </MantineProvider>
    </Provider>
  );
}

export default App;

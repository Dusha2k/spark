import { useToast, ToastId } from '@chakra-ui/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { errorToast } from '../toast';

export const NetworkStatus = () => {
  const toastIdRef = useRef<ToastId | undefined>();
  const toast = useToast();
  const [isOnline, setStatusIsOnline] = useState(true);

  const changeStatusToOffline = useCallback(() => {
    toastIdRef.current = errorToast({
      isClosable: false,
      duration: null,
      position: 'top',
      description: 'Соединение разорвано, проверьте интернет 👾',
    });
    setStatusIsOnline(false);
  }, []);
  const changeStatusToOnline = useCallback(() => {
    if (toastIdRef?.current) {
      toast.close(toastIdRef.current);
    }
    setStatusIsOnline(true);
  }, []);

  useEffect(() => {
    window.addEventListener('online', changeStatusToOnline);
    window.addEventListener('offline', changeStatusToOffline);
    return () => {
      window.removeEventListener('online', changeStatusToOnline);
      window.removeEventListener('offline', changeStatusToOffline);
    };
  }, []);

  return <></>;
};

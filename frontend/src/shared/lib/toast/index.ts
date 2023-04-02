import { createStandaloneToast, UseToastOptions } from '@chakra-ui/toast';

const { ToastContainer, toast } = createStandaloneToast();

const defaultSettings: Pick<
  UseToastOptions,
  'position' | 'duration' | 'isClosable' | 'variant'
> = {
  position: 'top-right',
  duration: 3000,
  isClosable: true,
  //variant: 'subtitle',
};

const errorToast = (options?: UseToastOptions) =>
  toast({
    status: 'error',
    ...defaultSettings,
    ...options,
  });

const successToast = (options?: UseToastOptions) =>
  toast({
    status: 'success',
    ...defaultSettings,
    ...options,
  });

export { ToastContainer, successToast, errorToast };

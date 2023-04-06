import { NotificationProps, notifications } from '@mantine/notifications';

const defaultSettings: Pick<
  NotificationProps,
  'withCloseButton' | 'autoClose' | 'message'
> = {
  message: 'Без сообщения',
  autoClose: 3000,
  withCloseButton: true,
};

const errorToast = (options?: NotificationProps) =>
  notifications.show({
    ...defaultSettings,
    title: 'Ошибка!',
    color: 'red',
    ...options,
  });

const successToast = (options?: NotificationProps) =>
  notifications.show({
    ...defaultSettings,
    title: 'Успех!',
    color: 'teal',
    ...options,
  });

export { successToast, errorToast };

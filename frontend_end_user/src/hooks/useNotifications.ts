import { atom, useAtom } from 'jotai';

interface Notification {
  Component: React.FC;
  timeout: number | null;
  removeNotification: () => void;
  id: string;
}

const notificationsAtom = atom<Notification[]>([]);

const useNotifications = () => {
  const [notifications, setNotifications] = useAtom(notificationsAtom);

  const addNotification = (
    NotificationComponent: React.FC,
    timeout: number | null = null
  ): void => {
    // generate random id
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);

    const removeNotification = () => {
      setNotifications((currentNotifications) =>
        currentNotifications.filter((notification) => notification.id !== id)
      );
    };

    setNotifications((currentNotifications) => [
      ...currentNotifications,
      {
        Component: NotificationComponent,
        timeout,
        removeNotification,
        id,
      },
    ]);

    if (timeout) {
      setTimeout(removeNotification, timeout);
    }
  };

  const addNotifications = (notifications: Notification[]): void => {
    notifications.forEach((notification) =>
      addNotification(notification.Component, notification.timeout)
    );
  };

  return {
    notifications,
    addNotification,
    addNotifications,
    setNotifications,
  };
};

export default useNotifications;

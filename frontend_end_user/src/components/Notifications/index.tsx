import useNotifications from '../../hooks/useNotifications';

const Notifications = () => {
  const { notifications } = useNotifications();

  return (
    <>
      {notifications.length && (
        <div className="fixed z-50 bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center w-full max-w-max space-y-4 bg-transparent">
          {notifications.map((noti) => (
            <div key={noti.id}>
              <noti.Component />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Notifications;

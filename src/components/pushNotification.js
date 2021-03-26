import addNotification from 'react-push-notification';
 
const Page = () => {
 
    const buttonClick = () => {
        addNotification({
            title: 'Mark attendance',
            message: 'Hey, did you mark your attendance for today?',
            theme: 'darkblue',
            closeButton: 'Go away',
            duration: 1000,
            native: true // when using native, your OS will handle theming.
        });
    };
 
    return (
      <div className="page">
          <button onClick={buttonClick} className="button">
           Log attendance for today - BunkaLog
          </button>
      </div>
    );
};
 
export default Page;
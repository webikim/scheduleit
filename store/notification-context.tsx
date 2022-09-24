import React, { createContext, ReactNode, useState } from 'react';

interface Notification {
    message: string,
    status: string
}

interface NotificationContextInterface {
    notification: Notification,
    showNotification: (notification: Notification) => void,
    hideNotification: () => void
}

const NotificationContext = createContext<NotificationContextInterface>({
    notification: null,
    showNotification: (notification: Notification) => { },
    hideNotification: () => { }
})

interface Props {
    children?: ReactNode
}

export const NotificationContextProvider = (props: Props) => {
    const [notification, setNotification ] = useState<Notification>(null);

    const showNotificationHandler = (notification: Notification) => {
        setNotification(notification);
    }

    const hideNotificationHandler = () => {
        setNotification(null);
    }

    const context = {
        notification: notification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    }

    return (
        <NotificationContext.Provider value={context}>{ props.children }</NotificationContext.Provider>
    );
}

export default NotificationContext;

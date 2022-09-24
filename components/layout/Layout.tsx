import { Container } from '@mui/material';
import React, { ReactNode, useContext } from 'react'
import NotificationContext from '../../store/notification-context';
import NotificationBar from '../ui/NotificationBar';
import TopBar, { paddingAppSpace } from './TopBar';

interface LaytoutProps {
    children?: ReactNode;
}

const Layout = (props: LaytoutProps) => {
    const notificationCtx = useContext(NotificationContext);

    const handleNotificationClose = () => {
        notificationCtx.hideNotification();
    }

    const  message = (notificationCtx.notification) ? notificationCtx.notification.message : null;

    return (
        <>
            <TopBar />
            <main>
                <Container sx={{ marginTop: '2em', flexGrow: 1 }}>
                    {paddingAppSpace()}
                    {props.children}
                </Container>
            </main>
            <footer>
            </footer>
            <NotificationBar open={message !== null} onClose={handleNotificationClose} message={message}></NotificationBar>
        </>
    )
}

export default Layout;
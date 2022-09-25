import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/Layout';
import { NotificationContextProvider } from '../store/notification-context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <SessionProvider session={pageProps.session}>
            <NotificationContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </NotificationContextProvider>
        </SessionProvider>
    )
}

export default MyApp

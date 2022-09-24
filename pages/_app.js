import Layout from '../components/layout/Layout';
import { NotificationContextProvider } from '../store/notification-context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <NotificationContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </NotificationContextProvider>
    )
}

export default MyApp

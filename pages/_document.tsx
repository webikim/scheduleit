import Document, { Html, Head, Main, NextScript } from "next/document";
export default class CustomDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta
                        name="description"
                        content="schedule anything"
                    />
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                </Head>
                <body>
                    <Main />
                    <div id="notifications"></div>
                </body>
                <NextScript />
            </Html>
        )
    }
}
 
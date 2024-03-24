import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import { GoogleTagManager } from '@next/third-parties/google'

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }
    
    render() {
        return (
        <Html lang='en'>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
            <GoogleTagManager gtmId="G-82P19X1H2Y" />
        </Html>
        )
    }
}
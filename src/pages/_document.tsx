import Document, { Head, Html, Main, NextScript } from 'next/document';

import { AppConfig } from 'src/utils/AppConfig';

class MyDocument extends Document {
  render(): React.ReactElement {
    return (
      <Html lang={AppConfig.locale}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
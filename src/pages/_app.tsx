import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { Amplify } from 'aws-amplify';
import awsExports from '@/aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure({ ...awsExports, ssr: true });

function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default withAuthenticator(App);

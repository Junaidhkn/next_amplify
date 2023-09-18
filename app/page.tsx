'use client';

import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';

const Homepage = () => {
	return (
		<Authenticator>
			<div>Homepage</div>;
		</Authenticator>
	);
};

export default withAuthenticator(Homepage);

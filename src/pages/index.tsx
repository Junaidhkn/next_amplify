import { Button, Flex, Heading, useAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';

const Home = () => {
	const { user, signOut } = useAuthenticator((context) => [context.user]);

	return (
		<Flex
			alignContent={'center'}
			justifyContent={'space-between'}>
			<Heading level={1}>Hello, world!</Heading>
			<Button
				onClick={signOut}
				variation='primary'>
				Sign Out
			</Button>
		</Flex>
	);
};

export default Home;

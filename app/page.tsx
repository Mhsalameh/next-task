'use client';
import { ChakraProvider } from '@chakra-ui/react';

import Search from '@/components/search';

const Home = () => {
	return (
		<>
			<ChakraProvider>
				<Search />
			</ChakraProvider>
		</>
	);
};

export default Home;

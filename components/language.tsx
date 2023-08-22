import { Tag } from '@chakra-ui/react';
import React, { FC } from 'react';

type Props = {
	language: string;
};

const Language: FC<Props> = ({ language }) => {
	return (
		<Tag size="sm" colorScheme="blue">
			{language}
		</Tag>
	);
};

export default Language;

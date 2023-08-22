import { Stack } from '@chakra-ui/react';
import React, { FC } from 'react';
import Language from './language';

type Props = {
	languages: string[];
};

const Languages: FC<Props> = ({ languages }) => {
	return (
		<Stack direction="row" justify="center" align="center" spacing={1} wrap="wrap">
			{languages.map((language: string, indx: number) => {
				return <Language language={language} key={indx} />;
			})}
		</Stack>
	);
};

export default Languages;

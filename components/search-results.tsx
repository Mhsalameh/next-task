'use client';
import { FC } from 'react';

import { Data } from '@/utils/types';
import ResultCard from './resultCard';
type Props = {
	filteredResults: Data[];
	selectOption: string;
};

const SearchResults: FC<Props> = ({ filteredResults, selectOption }) => {
	return (
		<div>
			{filteredResults &&
				filteredResults?.map((result: Data, indx: number) => {
					return <ResultCard key={indx} name={result.name} avatarUrl={result.avatarUrl} htmlUrl={result.htmlUrl} selectOption={selectOption} fullName={result.fullName} />;
				})}
		</div>
	);
};

export default SearchResults;

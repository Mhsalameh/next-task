'use client';

import { Data } from '@/utils/types';
import ResultCard from './resultCard';
type Props = {
	filteredResults: Data[];
	selectOption: string;
};

const SearchResults = ({ filteredResults, selectOption }: Props) => {
	return (
		<div>
			{filteredResults &&
				filteredResults?.map((result: Data, indx: number) => {
					return (
						<ResultCard
							key={indx}
							name={result.name}
							avatarUrl={result.avatarUrl}
							forks={result.forks}
							htmlUrl={result.htmlUrl}
							languages={result.languages}
							selectOption={selectOption}
						/>
					);
				})}
		</div>
	);
};

export default SearchResults;

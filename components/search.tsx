'use client';
import { Data } from '@/utils/types';
import { useState, useEffect, useRef } from 'react';
import searchRepos from '@/utils/searchRepos';
import SearchBar from './searchBar';
import { Stack, Spinner, Button, Box, Flex, Text } from '@chakra-ui/react';
import SearchResults from './search-results';

const Search = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [searchText, setSearchText] = useState<string>('');
	const [selectOption, setSelectOption] = useState<string>('repositories');
	const [filteredResults, setFilteredResults] = useState<Data[]>([]);
	const [resultsFound, setResultsFound] = useState<boolean>(true);
	const [page, setPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [remaining, setRemaining] = useState<number>(Infinity);
	const [windowDimensions, setWindowDimensions] = useState({
		bodyHeight: 0,
		windowHeight: 0,
	});
	const [error, setError] = useState<unknown>('');

	const reset = () => {
		setFilteredResults([]);
		setPage(1);
		setRemaining(Infinity);
		setResultsFound(true);
	};

	const handleSearch = (v: string) => {
		setSearchText(v);
		reset();
	};

	const handleOptions = (v: string) => {
		setSelectOption(v);
		reset();
	};

	const loadSearchResults = async () => {
		if (loading) return;
		if (remaining <= 0 || filteredResults.length >= 50) return;
		if (searchText) {
			try {
				setLoading(true);
				const response = await searchRepos(searchText, selectOption, page);
				if (response.totalCount === 0) {
					setResultsFound(false);
				} else {
					setFilteredResults((prevResults) => [...prevResults, ...response.data]);
					setPage((prevPage) => prevPage + 1);
					setRemaining(response.totalCount - filteredResults.length);
				}
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		// Calculate and set window dimensions
		setWindowDimensions({
			bodyHeight: document.body.clientHeight,
			windowHeight: window.innerHeight,
		});
	}, []);

	useEffect(() => {
		// reset()
		const getData = setTimeout(() => {
			loadSearchResults();
		}, 500);

		return () => {
			clearTimeout(getData);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchText, selectOption]);

	useEffect(() => {
		const handleScroll = () => {
			const container = containerRef.current;
			if (container && container.scrollHeight - container.scrollTop === container.clientHeight && !loading) {
				loadSearchResults();
			}
		};
		const container = containerRef.current;
		container?.addEventListener('scroll', handleScroll);

		return () => {
			container?.removeEventListener('scroll', handleScroll);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	const { bodyHeight, windowHeight } = windowDimensions;

	return (
		<>
			<Stack>
				<SearchBar searchText={searchText} selectOption={selectOption} handleOptions={handleOptions} handleSearch={handleSearch} />
				{!error ? (
					<Box ref={containerRef} maxHeight="90vh" overflowY="auto">
						{resultsFound && <SearchResults filteredResults={filteredResults} selectOption={selectOption} />}
						{!resultsFound ? (
							<Text textAlign="center">No results found</Text>
						) : (
							<Flex justify="center" alignItems="center">
								{!loading && bodyHeight < windowHeight && filteredResults.length > 0 && remaining > 0 && filteredResults.length < 50 && (
									<Button onClick={loadSearchResults} disabled={loading} variant="outline" size="sm">
										Show More
									</Button>
								)}
								{loading && <Spinner />}
							</Flex>
						)}
					</Box>
				) : (
					<Text textAlign="center">An Error Occured</Text>
				)}
			</Stack>
		</>
	);
};

export default Search;

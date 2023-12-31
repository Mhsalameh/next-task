'use client';

import { useState, useEffect, useRef } from 'react';

import { NextPage } from 'next';

import { Data, Error } from '@/utils/types';

import SearchResults from './search-results';
import searchRepos from '@/utils/searchRepos';
import SearchBar from './searchBar';

import { Stack, Spinner, Button, Box, Flex, Text, Alert, Link, CloseButton } from '@chakra-ui/react';

const Search: NextPage = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [searchText, setSearchText] = useState<string>('');
	const [selectOption, setSelectOption] = useState<string>('repositories');
	const [filteredResults, setFilteredResults] = useState<Data[]>([]);
	const [resultsFound, setResultsFound] = useState<boolean>(true);
	const [page, setPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const [windowDimensions, setWindowDimensions] = useState({
		bodyHeight: 0,
		windowHeight: 0,
	});
	const [error, setError] = useState<Error | undefined>();

	const reset = () => {
		setFilteredResults([]);
		setPage(1);
		setResultsFound(true);
		setError(undefined);
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
		if (searchText) {
			try {
				setLoading(true);
				const response = await searchRepos(searchText, selectOption, page);
				setError(undefined);
				if (response.totalCount === 0) {
					setResultsFound(false);
				} else {
					setFilteredResults((prevResults) => [...prevResults, ...response.data]);
					setPage((prevPage) => prevPage + 1);
				}
			} catch (error) {
				const typedError = error as Error;
				setError(typedError);
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
		<Stack>
			<SearchBar searchText={searchText} selectOption={selectOption} handleOptions={handleOptions} handleSearch={handleSearch} />

			<Box ref={containerRef} maxHeight="90vh" overflowY="auto">
				{(resultsFound || filteredResults.length > 0) && <SearchResults filteredResults={filteredResults} selectOption={selectOption} />}
				{!resultsFound ? (
					<Text textAlign="center">No results found</Text>
				) : (
					<Flex justify="center" alignItems="center">
						{!loading && !error && bodyHeight < windowHeight && filteredResults.length > 0 && (
							<Button onClick={loadSearchResults} disabled={loading} variant="outline" size="sm">
								Show More
							</Button>
						)}
						{error && (
							<Alert status="error" justifyContent="center">
								<Link textAlign="center" href={error?.url}>
									{error?.message}
								</Link>
								<CloseButton
									onClick={() => {
										setError(undefined);
									}}
								/>
							</Alert>
						)}
						{loading && <Spinner />}
					</Flex>
				)}
			</Box>
		</Stack>
	);
};

export default Search;

'use client';
import { Avatar, Card, Stack, Link, Tag, CardBody, Heading, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Data, Fork } from '@/utils/types';
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
						<Card backgroundColor="white" mb={4} key={indx}>
							<CardBody>
								<Stack direction="column" align="center" spacing={4} justify="space-around">
									<Stack direction="row" spacing={4}>
										{selectOption === 'users' && <Avatar name={result.name} src={result.avatarUrl} size="sm" />}
										<Link href={result.htmlUrl} isExternal fontWeight="bold">
											<Heading as="h5" size="md">
												{result.name}
												<ExternalLinkIcon ml={1} />
											</Heading>
										</Link>
									</Stack>
									{selectOption === 'repositories' && result.forks?.length > 0 && (
										<Stack direction="row" align="center" spacing={1}>
											<Text> Forked By:</Text>
											{result.forks.map((fork: Fork) => {
												return (
													<Link key={fork.id} href={`https://github.com/${fork.full_name}`} isExternal>
														<Avatar name={fork.owner.name} src={fork.owner.avatar_url} size="sm" ml={1} />
													</Link>
												);
											})}
										</Stack>
									)}
									{selectOption === 'repositories' && result.languages && (
										<Stack direction="row" justify="center" align="center" spacing={1} wrap="wrap">
											{result.languages.map((language, indx) => {
												return (
													<Tag key={indx} size="sm" colorScheme="blue">
														{language}
													</Tag>
												);
											})}
										</Stack>
									)}
								</Stack>
							</CardBody>
						</Card>
					);
				})}
		</div>
	);
};

export default SearchResults;

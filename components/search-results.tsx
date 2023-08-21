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
				filteredResults?.map((result: Data) => {
					return (
						<Card backgroundColor="white" mb={4} key={result.id}>
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
										{result.language && (
											<Tag size="sm" colorScheme="blue">
												{result.language}
											</Tag>
										)}
									</Stack>
									{selectOption === 'repositories' && result.forks?.length > 0 && (
										<Stack direction="row" align="center" spacing={1}>
											<Text> Forked By:</Text>
											{result.forks.map((fork: Fork) => {
												return (
													<Link key={fork.id} href={fork.owner.html_url} isExternal>
														<Avatar name={fork.owner.name} src={fork.owner.avatar_url} size="sm" ml={1} />
													</Link>
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

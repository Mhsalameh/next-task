import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Avatar, Card, CardBody, Heading, Link, Stack, Text } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import Language from './language';
import ForkComponent from './fork';
import { Fork } from '@/utils/types';

type Props = {
	forks: Fork[];
	name: string;
	avatarUrl: string;
	htmlUrl: string;
	selectOption: string;
	languages: string[];
};

const ResultCard: FC<Props> = ({ forks, name, avatarUrl, htmlUrl, selectOption, languages }) => {
	const result = useMemo(() => {
		return (
			<Card backgroundColor="white" mb={4}>
				<CardBody>
					<Stack direction="column" align="center" spacing={4} justify="space-around">
						<Stack direction="row" spacing={4}>
							{selectOption === 'users' && <Avatar name={name} src={avatarUrl} size="sm" />}
							<Link href={htmlUrl} isExternal fontWeight="bold">
								<Heading as="h5" size="md">
									{name}
									<ExternalLinkIcon ml={1} />
								</Heading>
							</Link>
						</Stack>
						{selectOption === 'repositories' && forks?.length > 0 && (
							<Stack direction="row" align="center" spacing={1}>
								<Text> Forked By:</Text>
								{forks.map((fork: Fork, indx) => {
									return <ForkComponent key={indx} id={fork.id} name={fork.owner.name} fullName={fork.full_name} avatarUrl={fork.owner.avatar_url} />;
								})}
							</Stack>
						)}
						{selectOption === 'repositories' && languages && (
							<Stack direction="row" justify="center" align="center" spacing={1} wrap="wrap">
								{languages.map((language: string, indx: number) => {
									return <Language language={language} key={indx} />;
								})}
							</Stack>
						)}
					</Stack>
				</CardBody>
			</Card>
		);
	}, [avatarUrl, forks, htmlUrl, languages, name, selectOption]);

	return <>{result}</>;
};

export default ResultCard;

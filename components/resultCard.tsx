import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Alert, Avatar, Button, Card, CardBody, CloseButton, Heading, Link, Spinner, Stack } from '@chakra-ui/react';
import { FC, useMemo, useState } from 'react';
import ForksComponent from './forks';
import { Fork, Error } from '@/utils/types';
import { getForks, getLanguages } from '@/utils/searchRepos';
import Languages from './languages';

type Props = {
	name: string;
	avatarUrl: string;
	htmlUrl: string;
	selectOption: string;
	fullName: string;
};

const ResultCard: FC<Props> = ({ name, avatarUrl, htmlUrl, selectOption, fullName }) => {
	const [forks, setForks] = useState<Fork[]>([]);
	const [languages, setLanguages] = useState<string[]>([]);
	const [showMoreInfo, setshowMoreInfo] = useState<boolean>(false);
	const [clickedBefore, setClickedBefore] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | undefined>();

	const result = useMemo(() => {
		return (
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
				</Stack>
			</CardBody>
		);
	}, [avatarUrl, htmlUrl, name, selectOption]);

	const forksResults = useMemo(() => {
		return <ForksComponent forks={forks} />;
	}, [forks]);

	const languagesResults = useMemo(() => {
		return <Languages languages={languages} />;
	}, [languages]);

	const handleShowMoreInfo = async () => {
		setshowMoreInfo(true);
		if (loading) return;
		if (clickedBefore) return;
		try {
			setLoading(true);
			const forksData = await getForks(fullName);
			const languagesData = await getLanguages(fullName);
			setError(undefined);
			setForks(forksData);
			setLanguages(Object.keys(languagesData));
			setClickedBefore(true);
		} catch (error) {
			const typedError = error as Error;
			setError(typedError);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card backgroundColor="white" mb={4}>
			{result}
			{selectOption === 'repositories' &&
				(!showMoreInfo ? (
					<Button
						onClick={() => {
							handleShowMoreInfo();
						}}
						variant="link"
						size="xs"
						color="blue.200"
					>
						more info..
					</Button>
				) : (
					<Stack direction="column" justify="center" align="center">
						{loading ? (
							<Spinner />
						) : error ? (
							<Alert status="error" textAlign="center" justifyContent="center">
								<Link href={error?.url}>{error?.message}</Link>
								<CloseButton
									alignSelf="flex-start"
									position="relative"
									right={-1}
									top={-1}
									onClick={() => {
										setError(undefined);
										setshowMoreInfo(false);
									}}
								/>
							</Alert>
						) : (
							<>
								{forksResults}
								{languagesResults}
							</>
						)}
						<Button
							onClick={() => {
								setshowMoreInfo(false);
							}}
							variant="link"
							size="xs"
						>
							less info
						</Button>
					</Stack>
				))}
		</Card>
	);
};

export default ResultCard;

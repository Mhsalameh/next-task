import { Fork } from '@/utils/types';
import { Stack, Text } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import ForkComponent from './fork';

type Props = {
	forks: Fork[];
};

const ForksComponent: FC<Props> = ({ forks }) => {
	const ForksMemo = useMemo(() => {
		return (
			<>
				<Text> Forked By:</Text>
				{forks?.map((fork: Fork, indx) => {
					return <ForkComponent key={indx} id={fork.id} name={fork.owner.name} fullName={fork.full_name} avatarUrl={fork.owner.avatar_url} />;
				})}
			</>
		);
	}, [forks]);

	return (
		<Stack direction="row" align="center" spacing={1}>
			{ForksMemo}
		</Stack>
	);
};

export default ForksComponent;

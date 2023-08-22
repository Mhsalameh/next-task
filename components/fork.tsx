import { Avatar, Link } from '@chakra-ui/react';
import { FC } from 'react';

type Props = {
	id: number;
	name: string;
	avatarUrl: string;
	fullName: string;
};

const ForkComponent: FC<Props> = ({ id, name, avatarUrl, fullName }) => {
	return (
		<Link key={id} href={`https://github.com/${fullName}`} isExternal>
			<Avatar name={name} src={avatarUrl} size="sm" ml={1} />
		</Link>
	);
};

export default ForkComponent;

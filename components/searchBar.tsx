'use client';
import { InputGroup, Input, InputRightAddon, RadioGroup, Radio, Stack } from '@chakra-ui/react';

type Props = {
	searchText: string;
	selectOption: string;
	handleSearch: (v: string) => void;
	handleOptions: (v: string) => void;
};

const SearchBar = ({ searchText, selectOption, handleOptions, handleSearch }: Props) => {
	return (
		<InputGroup flexDirection="column" borderRadius={5} size="sm">
			<Input
				textAlign="center"
				onChange={({ target }) => {
					handleSearch(target.value);
				}}
				value={searchText}
				placeholder="Search"
				border="1px solid #949494"
			/>
			<InputRightAddon justifyContent="space-around" width="100%" p={0} border="none">
				<RadioGroup defaultValue={selectOption} onChange={(v) => handleOptions(v)}>
					<Stack direction="row" spacing={20} alignItems="center">
						<Radio value="repositories">Repositories</Radio>
						<Radio value="users">Users</Radio>
					</Stack>
				</RadioGroup>
			</InputRightAddon>
		</InputGroup>
	);
};

export default SearchBar;

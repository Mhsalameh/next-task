import '@testing-library/jest-dom';
import SearchBar from './searchBar';
import { render, fireEvent } from '@testing-library/react';

describe('SearchBar component', () => {
	it('should render correctly with initial props', () => {
		const handleOptions = jest.fn;
		const handleSearch = jest.fn;
		const { getByPlaceholderText, getByLabelText } = render(<SearchBar searchText="abc" selectOption="repositories" handleOptions={handleOptions} handleSearch={handleSearch} />);
		const inputElement = getByPlaceholderText('Search');
		expect(inputElement).toBeInTheDocument();
		expect(getByLabelText('Repositories')).toBeChecked();
		expect(getByLabelText('Users')).not.toBeChecked();
	});
	it('should call handleSearch when searchText changes', () => {
		const handleOptions = jest.fn();
		const handleSearch = jest.fn();
		const { getByPlaceholderText } = render(<SearchBar searchText="" selectOption="repositories" handleOptions={handleOptions} handleSearch={handleSearch} />);
		const input = getByPlaceholderText('Search');
		const searchValue = 'new search value';
		fireEvent.change(input, { target: { value: searchValue } });

		expect(handleSearch).toBeCalledWith(searchValue);
	});
	it('should call handleOptions when selectOption changes', () => {
		const handleOptions = jest.fn();
		const handleSearch = jest.fn();
		const { getByLabelText } = render(<SearchBar searchText="" selectOption="repositories" handleOptions={handleOptions} handleSearch={handleSearch} />);
		const radio = getByLabelText('Users');
		fireEvent.click(radio);

		expect(getByLabelText('Users')).toBeChecked();
	});
});

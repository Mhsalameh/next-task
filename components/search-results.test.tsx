import SearchResults from './search-results'; // Update the import path accordingly
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('search-result component', () => {
	it('should render user information when selectOption is "users"', () => {
		const filteredResults = [
			{
				id: 1,
				name: 'John Doe',
				avatarUrl: 'john-doe-avatar-url',
				htmlUrl: 'john-doe-html-url',
				forks: [],
				languages: [],
			},
		];
		const selectOption = 'users';

		const { getByText, getByRole } = render(<SearchResults filteredResults={filteredResults} selectOption={selectOption} />);
		expect(getByText('John Doe')).toBeInTheDocument();
		expect(getByRole('link', { name: 'John Doe' })).toBeInTheDocument();
		expect(getByRole('img', { name: 'John Doe' })).toBeInTheDocument();
	});
	it('should render repository information when selectOption is "repositories"', () => {
		const filteredResults = [
			{
				id: 1,
				name: 'My Repo',
				htmlUrl: 'my-repo-html-url',
				avatarUrl: '',
				forks: [
					{
						id: 1,
						full_name: 'Forked Repo',
						owner: {
							name: 'Fork Owner',
							html_url: 'fork-owner-html-url',
							avatar_url: 'fork-owner-avatar-url',
						},
					},
				],
				languages: ['JavaScript', 'CSS'],
			},
			// Add more data objects as needed for testing
		];
		const selectOption = 'repositories';

		const { getByText, getByRole } = render(<SearchResults filteredResults={filteredResults} selectOption={selectOption} />);

		// Check if the repository's name is rendered
		expect(getByText('My Repo')).toBeInTheDocument();

		// Check if the repository's link is rendered
		expect(getByRole('link', { name: 'My Repo' })).toBeInTheDocument();

		// Check if the fork owner's avatar is rendered
		expect(getByRole('img', { name: 'Fork Owner' })).toBeInTheDocument();

		// Check if the repository's languages are rendered
		expect(getByText('JavaScript')).toBeInTheDocument();
		expect(getByText('CSS')).toBeInTheDocument();
	});
});

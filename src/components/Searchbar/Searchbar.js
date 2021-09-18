import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SearchBarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';

import { ImSearch } from 'react-icons/im';
import toast from 'react-hot-toast';

class SearchBar extends Component {
  state = {
    searchName: '',
  };

  handleNameChange = event => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    // Проверка на пустоту
    if (this.state.searchName.trim() === '') {
      return toast.error('Enter search name !');
    }

    // В форму передали сабмит
    this.props.onSubmit(this.state.searchName);

    this.setState({ searchName: '' });
  };

  render() {
    return (
      <SearchBarHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <ImSearch />
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchName"
            value={this.state.searchName}
            onChange={this.handleNameChange}
          />
        </SearchForm>
      </SearchBarHeader>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;

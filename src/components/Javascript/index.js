import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import Table from '../Table/index.js';
import { Button, Loading } from '../Button/index.js';
import Search from '../Search/index.js';
import {
  DEFAULT_QUERY,
  DEFAULT_PAGE,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE
  } from '../../constants/index';

const withLoading = (Component) => ({isLoading, ...rest}) =>
  isLoading ? <Loading /> : <Component {...rest} />

const updateTopStories = (hits, page) => prevState => {
  const { searchKey, results } = prevState;
  const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
  const updatedHits = [...oldHits, ...hits];

  return { results: { ...results, [searchKey]: {hits: updatedHits, page} }, isLoading: false }
}

class Javascript extends Component {

  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: 'javascript',
      isLoading: false,
    }

    //bind it to the application
    this.removeItem = this.removeItem.bind(this);
    this.searchValue = this.searchValue.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.setTopStories = this.setTopStories.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setTopStories(result) {
    const { hits, page} = result;
    this.setState(updateTopStories(hits, page));
  }

  checkTopStoriesSearchTerm(searchTerm) {
    return !this.state.results[searchTerm];
  }

  fetchTopStories(searchTerm, page) {
    this.setState({ isLoading: true });
    fetch(`${PATH_BASE}${PATH_SEARCH}?${ PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
      .then(response => response.json())
      .then(result => this.setTopStories(result))
      .catch(e => e);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchTopStories(searchTerm, DEFAULT_PAGE);
  }

  onSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if(this.checkTopStoriesSearchTerm(searchTerm)) {
      this.fetchTopStories(searchTerm, DEFAULT_PAGE);
    }

    event.preventDefault();
  }

  removeItem(id) {
    const { results, searchKey } = this.state;
    const { hits, page } = results[searchKey];
    const updatedList = hits.filter(item => item.objectID !== id);
    this.setState({ results: {...results, [searchKey]: { hits: updatedList, page } } });
  }

  searchValue(event) {
    this.setState({ searchTerm : event.target.value });
  }

  render() {

    const {results, searchTerm, searchKey, isLoading} = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div>
        <Table
          list={ list }
          removeItem={ this.removeItem }
        />
      <div className="text-center alert col-sm-12">
        <ButtonWithLoading
          isLoading={ isLoading }
          className="btn btn-success"
          onClick={ () => this.fetchTopStories(searchTerm, page + 1) }
        >
        Load more
        </ButtonWithLoading>
      </div>
      </div>
    );
  }
}

const ButtonWithLoading = withLoading(Button);

export default Javascript;

import React, { Component } from 'react';
import propTypes from 'prop-types';
import { sortBy } from 'lodash';
import { Button, Sort } from '../Button/index.js';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
}


class Table extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false
    }
    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  render() {
    const { list, removeItem } = this.props;
    const { sortKey, isSortReverse } = this.state;
    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return(
      <div className="col-sm-10 col-sm-offset-1">
      <div className="text-center">
        <hr/>
        <Sort
          className="btn btn-xs btn-default sortBtn"
          sortKey={ 'NONE' }
          onSort={ this.onSort }
          activeSortKey={ sortKey }
        >Default</Sort>
        <Sort
          className="btn btn-xs btn-default sortBtn"
          sortKey={ 'TITLE' }
          onSort={ this.onSort }
          activeSortKey={ sortKey }
        >Title</Sort>
        <Sort
          className="btn btn-xs btn-default sortBtn"
          sortKey={ 'AUTHOR' }
          onSort={ this.onSort }
          activeSortKey={ sortKey }
        >Author</Sort>
        <Sort
          className="btn btn-xs btn-default sortBtn"
          sortKey={ 'COMMENTS' }
          onSort={ this.onSort }
          activeSortKey={ sortKey }
        >Comments</Sort>
        <Sort
          className="btn btn-xs btn-default sortBtn"
          sortKey={ 'POINTS' }
          onSort={ this.onSort }
          activeSortKey={ sortKey }
        >Points</Sort>
        <hr/>
      </div>
      {

        reverseSortedList.map(item =>
            <div key={ item.objectID }>
              <h1><a href={ item.url }>{ item.title }</a></h1>
              <h4>{ item.author } | { item.num_comments } Comments | { item.points } Points
              <Button
                className="btn btn-danger btn-xs"
                type="button"
                onClick={ () => removeItem(item.objectID) }>
                Remove Me!
              </Button>
              </h4> <hr/>
            </div>
        )
      }
      </div>
    )
  }
}

Table.propTypes = {
  list: propTypes.arrayOf(
    propTypes.shape({
      objectID: propTypes.string.isReqired,
      author: propTypes.string,
      url: propTypes.string,
      num_comments: propTypes.numeber,
      points: propTypes.number,
    })
  ).isRequired,
  removeItem: propTypes.func.isRequired,
}

export default Table;
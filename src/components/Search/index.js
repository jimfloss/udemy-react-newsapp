import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap';
//import propTypes from 'prop-types';
//import { Button } from '../Button/index.js';

class Search extends Component {
  componentDidMount() {
    this.input.focus();
  }
  render() {
    const { onChange, value, children, onSubmit } = this.props;
    return(
      <form onSubmit={ onSubmit }>
        <FormGroup>
          <h1 style={{ fontWeight: 'bold' }}>{ children }</h1>
          <hr style={{ border: '2px solid black', width: '100px' }}/>
          <div className="input-group">
            <input className="form-control width100 search-form"
              type="text"
              onChange={ onChange }
              value={ value }
              ref={ (node) => { this.input = node } }
            />
            <span className="input-group-btn">
              <button
                className="btn btn-primary search-button"
                type="submit"
              >
              Search
              </button>
            </span>
          </div>
        </FormGroup>
      </form>
    )
  }
}

export default Search;
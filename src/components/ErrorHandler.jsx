import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }

  componentDidCatch(error) {
    this.setState({error: error});
  }

  render() {
    if (this.state.error) return (
      <div>
        <h3>При загрузе страницы возникла ошибка:</h3>
        <p>{this.state.error.toString()}</p>
        <Link to='/' onClick={() => this.setState({error:null})}>Return to the main page</Link>
      </div>
    );
    return this.props.children;
  }
}

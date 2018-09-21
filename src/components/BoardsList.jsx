import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiLink } from '../constants';

export default class BoardsList extends Component {
  state = {
    boards: null,
    name: '',
    code: ''
  }

  componentDidMount = async () => {
    const request = await axios.get(`${apiLink}/getboards`);
    this.setState({boards: request.data.boards});
  }

  handeChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handeSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${apiLink}/createBoard`, {
      name: this.state.name,
      code: this.state.code
    });
    console.log(response);
    this.setState(({boards}) => ({boards: [...boards, response.data.board]}))
  }

  render() {
    if (!boards) return <p>Загрузка...</p>;
    return(
      <div>
        <form onSubmit={this.handeSubmit}>
          <p>Создать доску</p>
          <label>
            Название доски:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Код доски:
            <input
              type="text"
              name="code"
              value={this.state.code}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">
            Создать
          </button>
        </form>
        {this.state.boards.map(board => (
          <Link key={board._id} to={`/${board.code}`}>
            /{board.code}/ - {board.name}
          </Link>
        ))}
      </div>
    );
  }
}

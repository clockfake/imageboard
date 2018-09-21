import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiLink } from '../constants';

export default class BoardsList extends Component {
  state = {
    boards: null,
    error: false,
    name: '',
    code: ''
  }

  componentDidMount = async () => {
    const request = await axios.get(`${apiLink}/getboards`).catch(err => this.setState({error: 'Не удалось загрузить список досок'}));
    this.setState({boards: request.data.boards});
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${apiLink}/createBoard`, {
      name: this.state.name,
      code: this.state.code
    }).catch(err => console.log(err));
    // console.log(response);
    // this.setState(({boards}) => ({boards: [...boards, response.data.board]}))
  }

  render() {
    if (!this.state.boards) return <p>Загрузка...</p>;
    if (this.state.error) throw new Error(this.state.error);
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
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

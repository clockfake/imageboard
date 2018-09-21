import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiLink } from '../constants';

export default class ThreadsList extends Component {
  state = {
    threads: null,
    author: '',
    text: ''
  }

  componentDidMount = async () => {
    const request = await axios.get(`${apiLink}/boards/${this.props.match.params.boardId}`);
    this.setState({threads: request.data.threads});
  }

  handeChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handeSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${apiLink}/post/createPost`, {
      author: this.state.author,
      text: this.state.text,
      threadId: null,
      boardCode: this.props.match.params.boardId,
      OP: true
    });
    console.log(response);
    this.setState({shouldRedirect: response.data.post.postId});
  }

  render() {
    if (!boards) return <p>Загрузка...</p>;
    return(
      <div>
        <form onSubmit={this.handeSubmit}>
          <p>Создать тред</p>
          <label>
            Ваше имя:
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Текст:
            <input
              type="text"
              name="text"
              value={this.state.text}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">
            Создать
          </button>
        </form>
        {this.state.threads.map(thread => (
          <div>
            
          </div>
        ))}
      </div>
    );
  }
}

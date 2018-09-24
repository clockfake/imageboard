import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { apiLink } from '../constants';

export default class ThreadsList extends Component {
  state = {
    threads: null,
    error: false,
    author: '',
    text: '',
    shouldRedirect: false
  }

  componentDidMount = async () => {
    const request = await axios.get(`${apiLink}/boards/${this.props.match.params.boardId}`)
      .catch(err => this.setState({error: err.response && err.response.data.message}));
    this.setState({threads: request.data.threads});
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${apiLink}/post/createPost`, {
      author: this.state.author || 'Аноним',
      text: this.state.text,
      threadId: null,
      boardCode: this.props.match.params.boardId,
      OP: true
    }).catch(err => this.setState({error: err.response && err.response.data.message}));
    this.setState({shouldRedirect: response.data.post.postId});
  }

  render() {
    if (this.state.shouldRedirect) return <Redirect to={`/${this.props.match.params.boardId}/${this.state.shouldRedirect}`}/>
    if (this.state.error) throw new Error(this.state.error);
    if (!this.state.threads) return <p>Загрузка...</p>;
    return(
      <div>
        <Link to="/">На главную</Link>
        <form onSubmit={this.handleSubmit}>
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
          <div key={thread.postId}>
            <p>
            <span>{thread.date}</span>
            <span>{thread.author}</span>
            <span>{thread.postId}</span>
            <Link to={`/${this.props.match.params.boardId}/${thread.threadId}`}>Ответ</Link>
            </p>
            <p>
              {thread.text.slice(0, 1000)}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

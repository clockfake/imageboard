import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiLink } from '../constants';
import Post from './Post.jsx';
import '../css/thread.css';

export default class Thread extends Component {
  state = {
    posts: null,
    author: '',
    text: '',
    boardName: '',
    error: null
  }

  componentDidMount = async () => {
    const request = await axios.get(`${apiLink}/post/${this.props.match.params.threadId}`)
      .catch(err => this.setState({ error: err.response && err.response.data.message }));
    this.setState({posts: request.data.posts, boardName: request.data.boardName});
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${apiLink}/post/createPost`, {
      author: this.state.author || 'Аноним',
      text: this.state.text,
      threadId: this.props.match.params.threadId,
      boardCode: this.props.match.params.boardId,
      OP: false
    }).catch(err => this.setState({ error: err.response && err.response.data.message }));
    this.setState(({posts}) => ({posts: [...posts, response.data.post]}))
  }

  render() {
    if (!this.state.posts) return <p>Загрузка...</p>;
    if (this.state.error) throw new Error(this.state.error);
    return(
      <div>
        <Link to={`/${this.props.match.params.boardId}`}>{this.state.boardName}</Link>
        <form className="post-form" onSubmit={this.handleSubmit}>
          <p>Добавить пост</p>
          <label>
            Ваше имя:
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
              className="post-form__author"
            />
          </label>
          <label>
            Текст:
            <textarea
              value={this.state.text}
              onChange={this.handleChange}
              className="post-form__submit"
            />
          </label>
          <button type="submit">
            Создать
          </button>
        </form>
        {this.state.posts.map(Post)}
      </div>
    );
  }
}

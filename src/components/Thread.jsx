import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiLink } from '../constants';

export default class Thread extends Component {
  state = {
    posts: null,
    author: '',
    text: '',
    boardName: ''
  }

  componentDidMount = async () => {
    const request = await axios.get(`${apiLink}/post/${this.props.match.params.threadId}`).catch(err => console.log(err));
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
    }).catch(err => console.log(err));
    console.log(response);
    this.setState(({posts}) => ({posts: [...posts, response.data.post]}))
  }

  render() {
    if (!this.state.posts) return <p>Загрузка...</p>;
    return(
      <div>
        <Link to={`/${this.props.match.params.boardId}`}>{this.state.boardName}</Link>
        <form onSubmit={this.handleSubmit}>
          <p>Добавить пост</p>
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
        {this.state.posts.map(post => (
          <div key={post.postId}>
            <p>
            <span>{post.date}</span>
            <span>{post.author}</span>
            <span>{post.postId}</span>
            </p>
            <p>
              {post.text}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

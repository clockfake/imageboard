import React from 'react';

const Post = (post) => (
  <div key={post.postId} className="post__item">
    <p className="post__item-heading">
    <span>{post.author}</span>
    <span>{(new Date(post.date)).toLocaleString('ru')}</span>
    <span className="post__id">#{post.postId}</span>
    </p>
    <p className="post__item-text">
      {post.text}
    </p>
  </div>
);

export default Post;

import React from 'react';

const Post = (post) => (
  <div key={post.postId} className="post-list__item">
    <p>
    <span>{post.author}</span>
    <span>{post.date}</span>
    <span>{post.postId}</span>
    </p>
    <p>
      {post.text}
    </p>
  </div>
);

export default Post;

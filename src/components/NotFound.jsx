import React from 'react';
import {Link} from 'react-router-dom';

 const NotFound = () => (
  <div>
    <h2>Страница не найдена</h2>
    <Link to='/'>Вернуться на главную</Link>
  </div>
)

export default NotFound;

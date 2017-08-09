import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import UserProfileApp from './UserProfileApp';

ReactDOM.render(
  <UserProfileApp />,
  document.getElementById('root')
);

registerServiceWorker();

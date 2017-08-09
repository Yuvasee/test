import React, { Component } from 'react';

import 'normalize.css/normalize.css';
import './styles.css';

// должен отобразиться аватар пользователя, его полное имя, никнейм,
// и два подраздела со списком активностей и списком фото

class UserProfileApp extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      const FB = window.FB;
      FB.login(() => {
        FB.api('/me/picture', 'get', {type: 'square', width: 200, height: 200}, (res) => {
          this.setState({avatarUrl: res.data.url})
        });
      }, {scope: 'publish_actions'});
    }, 1000);
  }

  render() {
    const {avatarUrl} = this.state;

    return (
      <div className="profile-container">
        <div className="header">
          {avatarUrl &&
            <img className="avatar" src={avatarUrl} alt="Avatar" />
          }
        </div>
      </div>
    );
  }
}

export default UserProfileApp;

import React, { Component } from 'react';

import 'normalize.css/normalize.css';
import './styles.css';

class UserProfileApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabActive: 1
    };
  }

  componentDidUpdate() {
    this.refs.contentDiv.scrollTop = 0;
  }

  componentDidMount() {
    setTimeout(() => {
      const FB = window.FB;

      FB.login((response) => {
        if (response.authResponse) {
          FB.api('/me/picture', 'get', {type: 'square', width: 200, height: 200}, (res) => {
            this.setState({avatarUrl: res.data.url})
          });

          FB.api('/me', 'get', {}, (res) => {
            this.setState({fullName: res.name})
          });

          FB.api('/me/likes', 'get', {fields: 'name,link'}, (res) => {
            this.likes = this.makeList(res.data);
            this.setState({content: this.likes})
          });

          FB.api('/me/photos?type=uploaded', 'get', {fields: 'name,link'}, (res) => {
            this.photos = this.makeList(res.data);
          });

        } else {
          console.log('User cancelled login or did not fully authorize.');
          this.setState({fullName: 'No permission :('})
        }
      }, {scope: 'publish_actions,user_likes,user_photos,user_posts'});
    }, 1000);
  }

  makeList(arr) {
    const list = [];

    arr.forEach((item, i) => {
      let name = item.name || 'Без названия';
      name = (name.length > 100) ? name.substr(0, 99) + '\u2026' : name;
      list.push(<li key={i}><a href={item.link}>{name}</a></li>)
    });

    return <ul>{list}</ul>;
  }

  switchTabs() {
    switch (this.state.tabActive) {
      case 1:
        this.setState({
          tabActive: 2,
          content: this.photos
        });
        break;

      case 2:
        this.setState({
          tabActive: 1,
          content: this.likes
        });
        break;

      default:
    }
  }

  render() {
    const {avatarUrl, fullName, content} = this.state;

    return (
      <div className="profile-container">
        <div className="header">
          {fullName &&
            <div className="full-name"><div>{fullName}</div></div>
          }
          {avatarUrl &&
            <img className="avatar" src={avatarUrl} alt="Avatar" />
          }
        </div>
        <div className="tabs">
          <div
            className={this.state.tabActive !== 1 ? 'link-active' : ''}
            onClick={this.state.tabActive !== 1 ? this.switchTabs.bind(this) : ''}
          >
            Likes
          </div>
          <div
            className={this.state.tabActive !== 2 ? 'link-active' : ''}
            onClick={this.state.tabActive !== 2 ? this.switchTabs.bind(this) : ''}
          >
            Photos
          </div>
        </div>
        <div className="content" ref="contentDiv">
          {content}
        </div>
      </div>
    );
  }
}

export default UserProfileApp;

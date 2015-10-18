import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

@CSSModules(styles)
export default class Wrapper extends React.Component {
  state = {
    active: false
  };

  handleClick = () => {
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    let { active } = this.state;

    // return (
    //   <div styleName="layout">
    //     <a
    //       href="#"
    //       styleName={ !active ? 'menu-toggle-active' : 'menu-toggle' }
    //       onClick={this.handleClick}
    //     >
    //       <span styleName="menu-toggle-span"></span>
    //     </a>
    //     <div styleName={ active ? 'menu-active' : 'menu' }>
    //       <span onClick={this.handleClick} styleName="menu-heading">SIX-POLL</span>
    //       <ul styleName="menu-list">
    //           <li styleName="menu-item">
    //             <Link to={`/`} styleName="menu-link">
    //               Home
    //             </Link>
    //           </li>
    //           <li styleName="menu-item">
    //             <Link to={`/polls/new`} styleName="menu-link">
    //               Create
    //             </Link>
    //           </li>
    //       </ul>
    //     </div>
    //     <div styleName={ active ? 'content-active' : 'content' }>
    //       {this.props.children}
    //     </div>
    //   </div>
    // );

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

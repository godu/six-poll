// import './../../global.styl';
// import styles from './styles.styl';

import React, { PropTypes } from 'react';
// import marked from 'marked';
// import CSSModules from 'react-css-modules';

// @CSSModules(styles)
export default class PostEditor extends React.Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    poll: PropTypes.object
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      poll: {
        ...newProps.poll
      }
    });
  }

  state = {
    poll: { ...this.props.poll }
  }

  handleSave = (e) => {
    e.preventDefault();
    this.props.onSave(this.state.poll);
  }

  handleTitleChange = (e) => {
    this.setState({
      poll: {
        ...this.state.poll,
        title: e.target.value
      }
    });
  }

  handleAnswserChange = () => () => {
    this.setState({
      poll: {
        ...this.state.poll
      }
    });
  }

  render() {
    const poll = this.state.poll;
    const { title, answers = ['', ''] } = poll;

    return (
      <div styleName="wrapper">
        <div styleName="editor-container">
          <input
            styleName="input-title"
            value={title}
            onChange={this.handleTitleChange}
            type="text"
            placeholder="Poll title"
          />

          {answers.map((answser, index) => (
            <input
              key={index}
              value={answser}
              placeholder={`Answser ${index+1}`}

            />
          ))}

          <div styleName="btn-container">
            <button
              styleName="btn"
              onClick={this.handleSave}
            >Save</button>
          </div>
        </div>

        {/* <SinglePoll poll={poll}/> */}
      </div>
    );
  }
}

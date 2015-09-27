// import './../../global.styl';
// import styles from './styles.styl';

import React, { PropTypes } from 'react';
import _ from 'lodash';
// import marked from 'marked';
// import CSSModules from 'react-css-modules';

import SinglePoll from '../SinglePoll/SinglePoll';

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

  handleAnswserChange = (index) => (e) => {
    const poll = this.state.poll;
    let { answers } = poll;

    answers[index] = e.target.value;

    if(_.last(answers)) answers.push('');

    this.setState({
      poll: {
        ...this.state.poll,
        answers
      }
    });
  }

  render() {
    const poll = this.state.poll;
    const { title, answers = [''] } = poll;

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
              onChange={this.handleAnswserChange(index)}
            />
          ))}

          <div styleName="btn-container">
            <button
              styleName="btn"
              onClick={this.handleSave}
            >Save</button>
          </div>
        </div>

        <SinglePoll poll={poll}/>
      </div>
    );
  }
}

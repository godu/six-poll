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
        title: '',
        answers: [{
          _id: Math.random(),
          value: ''
        }],
        ...newProps.poll
      }
    });
  }

  state = {
    poll: {
      title: '',
      answers: [{
        _id: Math.random(),
        value: ''
      }],
      ...this.props.poll
    }
  }

  handleSave = (e) => {
    e.preventDefault();

    var poll = _.assign({}, this.state.poll, {
      answers: this.state.poll.answers.filter(a => a.value).map(a => _.omit(a, '_id'))
    });

    this.props.onSave(poll);
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
    let { answers = [] } = poll;

    answers[index].value = e.target.value;

    if(_.last(answers).value) {
      answers.push({
        _id: Math.random(),
        value: ''
      });
    }

    this.setState({
      poll: {
        ...this.state.poll,
        answers
      }
    });
  }

  render() {
    const poll = this.state.poll;
    const { title, answers } = poll;

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
              key={answser._id}
              value={answser.value}
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

        <SinglePoll poll={{
          ...poll,
          answers: poll.answers.filter(a => a.value)
        }}/>
      </div>
    );
  }
}

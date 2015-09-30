import React, { PropTypes } from 'react';
import _ from 'lodash';
import SinglePoll from '../SinglePoll/SinglePoll';

// import CSSModules from 'react-css-modules';
// import styles from './styles.css';
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
      <form
        onSubmit={this.handleSave}
      >
        <fieldset
        >
          <div
          >
            <label
              htmlFor="title"
            >
              Title
            </label>
          </div>
          <div
          >
            <input
              value={title}
              onChange={this.handleTitleChange}
              type="text"
              id="title"
              placeholder="Poll title"
            />
          </div>
        </fieldset>

        <fieldset
        >
        {answers.map((answser, index) => (
          <div
            key={answser._id}
          >
            <div
            >
              <label
                htmlFor={`answer-${index}`}
              >
                {`Answser ${index+1}`}
              </label>
            </div>
            <div
            >
              <input
                id={`answer-${index}`}
                value={answser.value}
                placeholder={`Answser ${index+1}`}
                onChange={this.handleAnswserChange(index)}
              />
            </div>
          </div>
        ))}
        </fieldset>

        <fieldset
        >
          <div
          />
          <div
          >
            <button
              type="submit"
            >
              Save
            </button>
            <button
              type="reset"
            >
              Cancel
            </button>
          </div>
        </fieldset>

        <SinglePoll
          poll={{
            ...poll,
            answers: poll.answers.filter(a => a.value)
          }}
        />
      </form>
    );
  }
}

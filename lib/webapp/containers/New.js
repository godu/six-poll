import React, { Component } from 'react';
import { connect } from 'react-redux';

class New extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: props.title || '',
      answers: props.answers || ['', '']
    };
  }
  render () {
    return (
      <form>
        <fieldset>
          <legend>Title</legend>
          <input
            name='title'
            type='text'
            value={ this.state.title }
            onChange={ this.changeTitle.bind(this) }
          />
        </fieldset>
        <fieldset>
          <legend>Answers</legend>
          { this.state.answers.map((answer, index) => {
            return (
              <fieldset key={index}>
                <input
                  name='answers[]'
                  type='text'
                  value={answer}
                  onChange={this.changeAnswer.bind(this, index)}
                />
                <a onClick={this.removeAnswer.bind(this, index)}>X</a>
              </fieldset>
            );
          }) }
          <a onClick={this.addAnswer.bind(this)}>Add</a>
        </fieldset>
      </form>
    );
  }
  changeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  changeAnswer(index, e) {
    var answers = this.state.answers;
    answers[index] = e.target.value;

    this.setState({
      answers: answers
    });
  }
  removeAnswer(index) {
    this.setState({
      answsers: this.state.answers.splice(index, 1)
    });
  }
  addAnswer() {
    this.setState({
      answers: this.state.answers.concat([''])
    });
  }
}

export default connect(state => state)(New);

import React from 'react';
import Question from '../components/Question';
import Textfield from '../components/Textfield';

class FAQContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedQuestion: null,
      questions: [],
      newQuestion: "",
      newAnswer: "",
      error: null
    }

    this.toggleQuestionSelect = this.toggleQuestionSelect.bind(this)
    this.handleQuestionChange = this.handleQuestionChange.bind(this)
    this.handleAnswerChange = this.handleAnswerChange.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
  }

  toggleQuestionSelect(id) {
    if (id === this.state.selectedQuestion) {
      this.setState({ selectedQuestion: null})
    } else {
      this.setState({ selectedQuestion: id })
    }
  }

  componentDidMount() {
    fetch('http://localhost:4567/api/v1/questions')


      .then(response => {
        if (response.ok) {
          return response;
        }else {
          let errorMessage = `${response.status} (${response.statusText})`
            error = new Error(errorMessage)
          throw(error)
        }
      })
      .then(response => response.json())
      .then(response => {
        this.setState({questions: response})
      })
  }

  handleQuestionChange(event) {
    this.setState({newQuestion: event.target.value})
  }

  handleAnswerChange(event) {
    this.setState({newAnswer: event.target.value})
  }

  handleClearForm(event) {
    this.setState({newQuestion: "", newAnswer: "", error: null})
  }

  handleSubmitForm(event) {
    event.preventDefault()
    if (this.state.newQuestion === ""|| this.state.newAnswer === ''){
      this.setState({error: "Please Complete All Form Fields!"})
    } else {
    let formPayload = {
      question: this.state.newQuestion,
      answer: this.state.newAnswer
    }
    fetch('http://localhost:4567/api/v1/questions', {
      method: 'POST',
      body: JSON.stringify(formPayload)
    })
    .then(body => {
    then(response => response.json())
      this.setState({questions: this.state.questions.concat(body)})
    })
    this.handleClearForm()
  }
  }

  render() {
    console.log(this.state)
    let questions = this.state.questions.map(question => {
      let selected;
      if (this.state.selectedQuestion === question.id) {
        selected = true
      }

      let handleClick = () => { this.toggleQuestionSelect(question.id) }

      return(
        <Question
          key={question.id}
          question={question.question}
          answer={question.answer}
          selected={selected}
          handleClick={handleClick}
        />
      )
    })

    return(
      <div className='page'>
        <h1>We Are Here To Help</h1>
        <div className='question-list'>
          {questions}
        </div>
          <p className='error'>{this.state.error}</p>
          <form className='newQuestion' onSubmit={this.handleSubmitForm}>
            <Textfield
              label='Question'
              name='question'
              content={this.state.newQuestion}
              handlerFunction={this.handleQuestionChange}
            />
            <Textfield
              label='Answer'
              name='answer'
              content={this.state.newAnswer}
              handlerFunction={this.handleAnswerChange}
            />
            <div className="button-group">
              <input className="button" type="submit" value="Submit" />
            </div>
          </form>
          <button className="button" onClick={this.handleClearForm}>Clear</button>
      </div>
    )
  }
}

export default FAQContainer;

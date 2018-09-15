import React, { Component } from "react";
import fire from "../../fire";
import _ from "lodash";

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = { quiz: [] };
  }

  componentDidMount() {
    const name = this.props.match.params.id;
    fire
      .database()
      .ref("tests")
      .orderByChild("name")
      .equalTo(name)
      .once("value")
      .then(snapshot => {
        console.log("quiz did mount", snapshot.val());
        this.setState({
          quiz: snapshot.val()
        });
      });
  }
  renderQuestion(question) {
    console.log("question", question);
    return (
      <div>
        <div>Pytanie: {question.pyt}</div>
        <div>Odpowiedz A: {question.odpa}</div>
        <div>Odpowiedz B: {question.odpb}</div>
        <div>Odpowiedz C: {question.odpc}</div>
        <div>Odpowiedz D: {question.odpd}</div>
      </div>
    );
  }

  renderTest() {
    if (!Array.isArray(this.state.quiz)) {
      const test = this.state.quiz[Object.keys(this.state.quiz)[0]];
      return _.map(test.pytania, obj => {
        return this.renderQuestion(obj);
      });
    }
  }

  render() {
    return <div>{this.renderTest()}</div>;
  }
}

export default Quiz;

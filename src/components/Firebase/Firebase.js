import React, {Component} from "react";
import fire from "../../fire";

export default class Firebase extends Component {
    constructor(props) {
        super(props);
        this.state = {messages: []};
    }

    componentWillMount() {
        let messagesRef = fire.database().ref("message");
        messagesRef.on("child_added", snapshot => {
            let message = {text: snapshot.val(), id: snapshot.key};
            this.setState({
                messages: [message].concat(this.state.messages)
            });
        });
    }

    addMessage(e) {
        e.preventDefault();
        fire
            .database()
            .ref("message")
            .push(this.inputEl.value);
        this.inputEl.value = "";
    }

    render() {
        return (
            <form onSubmit={this.addMessage.bind(this)}>
                <input type="text" ref={el => (this.inputEl = el)}/>
                <input type="submit"/>
                <ul>
                    {this.state.messages.map(message => (
                        <li key={message.id}>{message.text}</li>
                    ))}
                </ul>
            </form>
        );
    }
}

import React from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";


class MyMessages extends React.Component {
    state = {
        messages: [],
        read: 0
    }

    componentDidMount() {
        this.getAllMessages()
    }

    deleteMessage = (id) => {
        axios.get("http://localhost:8989/delete-message-by-id", {
            params: {
                id: id
            }
        })
            .then((response) => {
                this.getAllMessages()
            })

    }

    markAsRead = (id) => {
        axios.get("http://localhost:8989/read-message", {
            params: {
                id: id
            }
        })
            .then((response) => {
                this.getAllMessages()
            })
    }
    getAllMessages = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-messages", {
            params: {
                token: cookies.get("logged_in")
            }
        })
            .then((response) => {
                this.setState({
                    messages: response.data
                })
            })
    }

    render() {

        return (
            <div>
                {
                    this.state.messages.length == 0 &&
                    <div className="font-face-gm" >No Messages</div>
                }
                {
                    this.state.messages.map((message1, i) => {
                        return (
                            <div className={"messages"}>
                            <div className="font-face-gm"> <h3>Message Number: {i + 1}</h3></div>

                                <div className="font-face-gm2">
                                    <div>
                                <span className={"id"}>
                                   Message ID: {message1.id}
                                </span>
                                    </div>
                                    <span className={"details"}>
                                    Sender Phone Number: {message1.senderName}
                                </span>
                                    <div>
                                <span className={"details"}>
                                    Title: {message1.title}
                                </span>
                                    </div>
                                    <span className={"details"}>
                                    Content: {message1.content}
                                </span>
                                    <div>
                                        Status: {message1.readTime == null ? "No read" : "Read"}
                                    </div>
                                </div>

                                <button onClick={() => this.deleteMessage(message1.id)}>Delete Message</button>
                                <button onClick={() => this.markAsRead(message1.id)}
                                        disabled={message1.readTime == null ? false : true}>Mark As Read
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}


export default MyMessages;
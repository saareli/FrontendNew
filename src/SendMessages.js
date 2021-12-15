import React from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import {Link} from "react-router-dom";


class MessageSender extends React.Component {

    state = {
        receiver: "",
        title: "",
        content: "",
        success: ""
    }
    receiverChange = (e) => {
        let receiver = e.target.value;
        this.setState({
            receiver: receiver,
        })
    }
    titleChange = (e) => {
        let title = e.target.value;
        this.setState({
            title: title,

        })
    }
    contentChange = (e) => {
        let content = e.target.value;
        this.setState({
            content: content,
        })
    }
    sendMessage = () => {
        let cookies = new Cookies()
        let token = cookies.get("logged_in")
        axios.get("http://localhost:8989/get-username-by-token", {
            params: {
                token: token
            }
        })
            .then(response1 => {
                console.log(response1)
                axios.get("http://localhost:8989/send-message", {
                    params: {
                        sender: response1.data,
                        receiver: this.state.receiver,
                        title: this.state.title,
                        content: this.state.content,
                        token: token
                    }
                }).then(response => {
                    if (response.data) {
                        alert("Message Sent")
                    } else {
                        alert("The message was not sent")
                    }
                    this.resetInputs();
                })
            })
    }

    resetInputs = () => {
        this.setState({
            receiver: "",
            title: "",
            content: "",
        })

    }


    logOut = () => {

        let cookies = new Cookies();
        cookies.remove("token");
        window.location.reload();

    }

    render() {
        const button = {
            margin: "10px",
            width: "200px",
            backgroundColor: "#45a049",
            color: "black",
            borderRadius: "5px",
            marginTop: "20px",

        }
        return (
            <div>
                <h1 className="font-face-gm"> Send Message</h1>
                <div style={{
                    borderRadius: "10px",
                    backgroundColor: "#f2f2f2",
                    width: "110%",
                    height: "360px",
                    marginLeft: "5%"
                }}>
                    <div style={{marginLeft: "5%"}}>
                        <div className="font-face-gm3">
                            <p><label style={{fontWeight: "bold"}}>Message To:</label><br/>
                                <input type="text" pattern="\d*" onChange={this.receiverChange}
                                       value={this.state.receiver}
                                       placeholder="Enter Phone Number" maxLength="10"/></p>
                        </div>
                        <div className="font-face-gm3">
                            <label style={{fontWeight: "bold"}}>Title:</label><br/>
                            <input style={{width: "250px", height: "20px"}} type="text" onChange={this.titleChange}
                                   value={this.state.title}
                                   placeholder="Enter Title" maxLength="30"/>
                        </div>
                        <div className="font-face-gm3">
                            <p><label style={{fontWeight: "bold"}}>Content:</label><br/>
                                <input type="text" onChange={this.contentChange} value={this.state.body}
                                       placeholder="Enter Message " maxLength="300"
                                       style={{width: "250px", height: "100px"}}/></p>
                        </div>
                        <br/>
                        <button style={button} onClick={this.sendMessage}
                                disabled={(this.state.content.length <= 0) ||
                                (this.state.title.length <= 0) || (this.state.receiver <= 0)}>
                            SEND
                        </button>
                    </div>
                </div>
            </div>

        )

    }

}

export default MessageSender
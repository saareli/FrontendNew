import './App.css';
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {NavLink} from "react-router-dom";

class LoginPage extends React.Component {
    state = {
        username: "",
        password: "",
        showErr: false,
        response: ""
    }
    resetForm = () => {
        this.setState({
            username: '',
            password: '',
        })
    }

    onUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    };

    login = () => {
        axios.get("http://localhost:8989/sign-in", {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then((response) => {
                if (response.data == "This account not exist!" || response.data == "Wrong password!" ||
                    response.data == "Account blocked, please contact administrator") {
                    this.setState({
                        showErr: response.data
                    })
                } else {
                        const cookies = new Cookies();
                        cookies.set("logged_in", response.data);
                        window.location.reload();
                }
            })
    }

    render() {


        const inputStyle = {
            margin: "10px",
            width: "200px"
        }

        const buttonStyle = {
            margin: "10px",
            width: "200px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "5px"
        }

        const signUpButtonStyle = {
            margin: "10px",
            width: "200px",
            backgroundColor: "pink",
            color: "black",
            borderRadius: "5px",
            marginTop: "20px"
        }

        const hasRequiredDetails = !(this.state.username == "" || this.state.password == "");

        return (
            <div style={{margin: "auto", width: "50%", padding: "10px"}}>
                <fieldset style={{width: "300px"}}>
                    <legend>
                        <div className="font-face-gm" style={{fontSize: "20px"}}>
                            Login to your account
                        </div>
                    </legend>
                    <input style={inputStyle}
                           onChange={this.onUsernameChange}
                           value={this.state.username}
                           placeholder={"Enter username"}
                    />
                    <input type={"password"}
                           style={inputStyle}
                           onChange={this.onPasswordChange}
                           value={this.state.password}
                           placeholder={"Enter password"}
                    />
                    <div>
                        <button style={buttonStyle} onClick={this.login} disabled={!hasRequiredDetails}>Login</button>
                    </div>

                    {
                        this.state.showErr
                    }
                    <div>
                        {this.state.response}
                    </div>
                    <div className="font-face-gm">
                        Go to Sign Up Page Below-
                        <NavLink to={"/signUp"} className={"link"} activeClassName={"active"}>
                            <button style={signUpButtonStyle}>Sign Up</button>
                        </NavLink>
                    </div>
                    <div>
                        <button className="button--secondary" onClick={this.resetForm}>
                            Reset
                        </button>
                    </div>


                </fieldset>
                <div style={{color: "red"}}>{this.state.response}</div>
            </div>
        )
    }
}

export default LoginPage;

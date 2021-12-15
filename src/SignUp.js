import './App.css';
import * as React from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
class SignUp extends React.Component {
    state = {
        username: "",
        password: "",
        showErr: "",
        response:"",
        israeliNumber: "05",

    }

    checkPhone=()=> {
        let checkPhone = false;
        if (this.state.username.length == 10 &&this.state.username.startsWith(this.state.israeliNumber)){
            checkPhone = true
        }
        return checkPhone
    }
    checkLength = () => {
        const checkLengthPassword = this.state.password.length > 5
        return checkLengthPassword
    }

    checkNumbers =()=>{
        let matches =this.state.password.match(/\d+/g);
        const checkNumber = matches != null
        return checkNumber
        }

    checkForLetters = ()=> {
        let upperCases = this.state.password.match(/[A-Z]/);
        let lowerCases = this.state.password.match(/[a-z]/);
        const checkCases = upperCases != null || lowerCases != null
        return checkCases
    }

    onUsernameChange = (e) => {
        let username = e.target.value;
        this.setState({
            username: username
        })
    }
    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }


    SignUp = () => {
       if(this.checkForLetters() && this.checkLength() && this.checkNumbers() && this.checkPhone()) {
            axios.get("http://localhost:8989/create-account", {
                params: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
               .then((response) => {
                    console.log("enter: " +response.data);
                    if (response.data) {
                        this.setState({
                            showErr: "User Created!"
                        })
                    } else {
                        console.log(response)
                        this.setState({
                            showErr: "This Username already exist. Please Choose Other Username"
                        })
                    }
                })
        }else {
            this.setState({
                showErr: "Weak Password"
            })
        }
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

        return (
            <div style={{margin: "auto", width: "50%", padding: "10px"}}>
                <fieldset style={{width: "500px"}}>
                    <legend>
                        <div className="font-face-gm"  style={{fontSize: "20px"}}>
                            Sign Up to the website
                        </div>
                    </legend>
                    <div className="font-face-gm">Enter User Name And Password To Sign Up </div>
                    <input style={inputStyle}
                           onChange={this.onUsernameChange}
                           value={this.state.username}
                           placeholder={"Enter UserName- Phone Number"}
                    />
                    <input style={inputStyle}
                           onChange={this.onPasswordChange}

                           value={this.state.password}
                           placeholder={"Enter Password"}
                    />
                    <button style={buttonStyle} onClick={this.SignUp}>Sign Up</button>
                    <div>
                        {this.state.showErr}
                    </div>
                    <div className="font-face-gm">
                        <ul>
                            <u>UserName Conditions-</u>
                            <li > Enter proper phone number</li><br/>
                           <u>Password Conditions- </u>
                            <li> At least 6 characters</li>
                            <li> At least 1 digit</li>
                            <li> At least 1 letter</li>
                        </ul>
                    </div>
                    <div>
                        <NavLink to={"/"} className={"link"} activeClassName={"active"}>
                            <button >Back To Main Page</button>
                        </NavLink>

                    </div>
                </fieldset>
            </div>
        )
    }
}
export default SignUp;
import './App.css';
import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import NavigationBar from "./NavigationBar";
import LoginPage from "./LoginPage";
import Cookies from "universal-cookie";
import SignUp from "./SignUp";
import MyMessages from "./MyMessages";
import SendMessages from "./SendMessages";
import PostsPage from "./PostsPage";
import './fonts/static/SourceSans3-Regular.ttf'
import './fonts/static/SourceSans3-LightItalic.ttf'
import './fonts/static/SourceSans3-Medium.ttf'


class App extends React.Component {

    state = {
        isLoggedIn: false,
        token : ""
    }

    componentDidMount() {
        const cookies = new Cookies();
        if (cookies.get("logged_in")) {
            this.setState({
                isLoggedIn: true,
                token : cookies.get("logged_in")
            })
        }
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    {
                        this.state.isLoggedIn ?
                            <div style={{display: "flex", alignItems: "start", marginTop: "50px"}}>
                                <NavigationBar/>
                                <Route path={"/get-messages"} component={MyMessages}/>
                                <Route path={"/send-message"} component={SendMessages}/>
                            </div>
                            :
                            <div>

                                <Route path={"/"} component={LoginPage} exact={true}/>
                                <Route path={"/signup"} component={SignUp}/>
                            </div>
                    }
                </BrowserRouter>
                <div className="font-face-gm2">
                    Project By Saar Eli And Tal Hamo
                </div>

            </div>
        )
    }

}

export default App;

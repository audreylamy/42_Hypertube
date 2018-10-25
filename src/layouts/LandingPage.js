import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ReactComponent as Cycle} from '../assets/img/svg/cycle.svg';

import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

class LandingPage extends Component {   
    render() {
        console.log(this.props.hisory)
        return (
            <div className="landing">
                <div className="landing__langage">
                    <span className="landing__langage--en">EN</span> 
                        | 
                    <span className="landing__langage--fr">FR</span>
                </div>
    
                <div className="landing__heading">
                    <a>Hypertube</a>
                </div>
                <div className="form">
                    <label className="toggle" htmlFor="toggle-1">Swap</label>
                    <Cycle className="icon" fill='#fff'/>
                    <input type="checkbox" id="toggle-1"/>
                    <div className="card">
                        <SignIn 
                            history = {this.props.history}
                        />
                        <SignUp />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(LandingPage);
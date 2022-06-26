import React, { Component } from 'react'
import { withRouter } from "react-router";

class HeaderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {        
        }
    }


    SignOut(){
        localStorage.clear();
        this.props.history.push('/login');
    }
    render() {
        var retrievedObject = localStorage.getItem('data');
        const data = JSON.parse(retrievedObject);
        let firstName = data.first_name;
        let lastName = data.last_name;
        return (
            <div>
                <div className="top_nav">
                  <div className="nav_menu">
                      <div className="nav toggle">
                        <a id="menu_toggle"><i className="fa fa-bars"></i></a>
                      </div>
                      <nav className="nav navbar-nav">
                      <ul className=" navbar-right">
                        <li className="nav-item dropdown open" style={{paddingLeft: 15}}>
                          <a href="#" className="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
                            <img src="images/img.jpg" alt=""/>{firstName} {lastName}
                          </a>
                          <div className="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item"  href="#"> Profile</a>
                            <a className="dropdown-item" onClick={this.SignOut.bind(this)}><i className="fa fa-sign-out pull-right"></i> Log Out</a>
                          </div>
                        </li>     
                      </ul>
                    </nav>
                  </div>
                </div>
            </div>
        )
    }
}

export default withRouter(HeaderComponent);

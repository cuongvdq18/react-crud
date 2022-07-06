import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';

class PageNotFound extends Component {
    backHome(){
        return this.props.history.push("/");
    }
    render() {
        return (
            <>
                <div className="container body">
                    <div className="main_container">
                        <div className="col-md-12">
                            <div className="col-middle">
                                <div className="text-center text-center">
                                    <h1 className="error-number">404</h1>
                                    <h2>Sorry but we couldn't find this page</h2>
                                    <p>This page you are looking for does not exist <a href="#">Report this?</a>
                                    </p>
                                    <div className="mid_center">  
                                        <button className='btn btn-primary'  onClick={this.backHome.bind(this)}>Go back to Home</button> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default withRouter(PageNotFound);
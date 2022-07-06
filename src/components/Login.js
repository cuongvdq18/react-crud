import React, { Component } from 'react'
import axios from 'axios';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            messageError: "",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.changeMessageHandler = this.changeMessageHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        if (localStorage.getItem("token")) {
            return this.props.history.push('/products');
        }
    }
    changeMessageHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        this.setState({
            [target.name]: target.value,
        });
    }
    handleSubmit(event) {
        event.preventDefault();

        axios.post("http://34.124.251.21:8000/api/v1/auth/admin/tokens/create", this.state).then((res) => {
            if (res.data.meta === undefined) {
                let getMess = "";
          
                if (res.data.errors.username === undefined) {
                     getMess = res.data.errors.password[0]
                }
                if(res.data.errors.password === undefined) {
                     getMess = res.data.errors.username[0]
                }
                this.setState({
                    messageError: getMess
                })
            }
            else {
                localStorage.setItem("token", res.data.meta.token);
                var userObject = res.data.data;
                localStorage.setItem('data', JSON.stringify(userObject));
                this.props.history.replace('/products');
            }

        });
    }

    render() {

        return (
            <div className='backgroud-login' id="bg">
                <div className="container-login">
                    <div className="d-flex justify-content-center h-100">
                        <div className="card-login">
                            <div className="card-header">
                                <h3 className='text-center'>Sign In</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    {this.state.messageError && (
                                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                                            <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"></svg>
                                            <div>
                                                <i class="fa fa-warning"></i>
                                                <span>  {this.state.messageError}</span>
                                            </div>
                                        </div>)}
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input name="username"
                                            type="text"
                                            value={this.state.username}
                                            onChange={this.handleInputChange} className="form-control" placeholder="username" />
                                    </div>
                                    <div className="input-group form-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-key"></i></span>
                                        </div>
                                        <input name="password"
                                            type="password"
                                            value={this.state.password}
                                            onChange={this.handleInputChange} className="form-control" placeholder="password" />
                                    </div>
                                    <div className="row align-items-center remember">
                                        <input type="checkbox" />Remember Me
                                    </div>
                                    <div className="form-group ">
                                        <button type="submit" value="Login" className="btn float-right btn-warning">
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Login;

import React, { Component } from 'react'
import { Link } from 'react-router-dom';

 class LeftNavBar extends Component {
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
            <>
                <div className="col-md-3 left_col">
                    <div className="left_col scroll-view">
                        <div className="navbar nav_title" >
                            <a href="index.html" className="site_title"><i className="fa fa-paw"></i> <span>Gentelella Alela!</span></a>
                        </div>

                        <div className="clearfix"></div>

                        <div className="profile clearfix">
                            <div className="profile_pic">
                                <img src="../images/img.jpg" alt="..." className="img-circle profile_img" />
                            </div>
                            <div className="profile_info">
                                <span>Welcome,</span>
                                <h2>{firstName} {lastName}</h2>
                            </div>
                        </div>
                        <br />
                        <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                            <div className="menu_section">
                                <h3>General</h3>
                                <ul className="nav side-menu">
                                    <li><Link to="/products"><i className="fa fa-home"></i> Home</Link>
                                    </li>
                                    <li><a><i className="fa fa-edit"></i> Forms <span className="fa fa-chevron-down"></span></a>
                                        <ul className="nav child_menu">
                                            <li><a href="form.html">General Form</a></li>
                                            <li><a href="form_advanced.html">Advanced Components</a></li>
                                            <li><a href="form_validation.html">Form Validation</a></li>
                                            <li><a href="form_wizards.html">Form Wizard</a></li>
                                            <li><a href="form_upload.html">Form Upload</a></li>
                                            <li><a href="form_buttons.html">Form Buttons</a></li>
                                        </ul>
                                    </li>
                                    <li><a><i className="fa fa-desktop"></i> UI Elements <span className="fa fa-chevron-down"></span></a>
                                        <ul className="nav child_menu">
                                            <li><a href="general_elements.html">General Elements</a></li>
                                            <li><a href="media_gallery.html">Media Gallery</a></li>
                                            <li><a href="typography.html">Typography</a></li>
                                            <li><a href="icons.html">Icons</a></li>
                                            <li><a href="glyphicons.html">Glyphicons</a></li>
                                            <li><a href="widgets.html">Widgets</a></li>
                                            <li><a href="invoice.html">Invoice</a></li>
                                            <li><a href="inbox.html">Inbox</a></li>
                                            <li><a href="calendar.html">Calendar</a></li>
                                        </ul>
                                    </li>
                                    <li><a><i className="fa fa-table"></i> Tables <span className="fa fa-chevron-down"></span></a>
                                        <ul className="nav child_menu">
                                            <li><a href="tables.html">Tables</a></li>
                                            <li><a href="tables_dynamic.html">Table Dynamic</a></li>
                                        </ul>
                                    </li>
                                    <li><a><i className="fa fa-bar-chart-o"></i> Data Presentation <span className="fa fa-chevron-down"></span></a>
                                        <ul className="nav child_menu">
                                            <li><a href="chartjs.html">Chart JS</a></li>
                                            <li><a href="chartjs2.html">Chart JS2</a></li>
                                            <li><a href="morisjs.html">Moris JS</a></li>
                                            <li><a href="echarts.html">ECharts</a></li>
                                            <li><a href="other_charts.html">Other Charts</a></li>
                                        </ul>
                                    </li>
                                    <li><a><i className="fa fa-clone"></i>Layouts <span className="fa fa-chevron-down"></span></a>
                                        <ul className="nav child_menu">
                                            <li><a href="fixed_sidebar.html">Fixed Sidebar</a></li>
                                            <li><a href="fixed_footer.html">Fixed Footer</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>


                        </div>
                        <div className="sidebar-footer hidden-small">
                            <a data-toggle="tooltip" data-placement="top" title="Settings">
                                <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
                            </a>
                            <a data-toggle="tooltip" data-placement="top" title="FullScreen">
                                <span className="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
                            </a>
                            <a data-toggle="tooltip" data-placement="top" title="Lock">
                                <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                            </a>
                            <a data-toggle="tooltip" data-placement="top" title="Logout"  onClick={this.SignOut.bind(this)}>
                                <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
                            </a>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}

export default LeftNavBar;
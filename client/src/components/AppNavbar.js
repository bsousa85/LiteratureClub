import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,NavItem,
    Container
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { PropTypes } from 'prop-types';
import '../span.css';

class AppNavbar extends Component {

    componentDidMount() {
        // let user = this.props.user;
        // console.log("username : " + this.props.user);
        // const token = localStorage.getItem(this.props.user);
        // console.log("token : " + token);
        // if(this.props.auth) {
        //     this.props.checkUserStatus(user);
        // }
    }

    logout = (e) => {
        this.props.logoutUser();
    }
    
    navBarLink() {
        if (this.props.auth) {
            return(
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to="/newPost">create Post</Link>
                        <span> ... </span>
                        <Link to="Login">Welcome, {this.props.user} </Link>
                        <span> / </span>
                        <Link to="/" onClick={this.logout}>Log Out</Link>
                    </NavItem>
                </Nav>
            )
        }
        else {
            return(
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Link to="Login">Login</Link>
                        <span> / </span>
                        <Link to="Register">Register</Link>
                    </NavItem>
                </Nav>
            )
        }
    }
    

    render() {
        return(
                <div>
                    <Navbar color="dark" dark expand="sm" className="mb-5">
                        <Container>
                            <NavbarBrand href="/">Literature Club</NavbarBrand>
                            <NavbarToggler />
                            <Collapse navbar>
                                {this.navBarLink()}
                            </Collapse>
                        </Container>
                    </Navbar>
                </div>
        );
    }
}

AppNavbar.PropTypes = {
    logoutUser: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    auth: state.auth.authenticated,
    user: state.auth.username
});


export default connect(mapStateToProps, {logoutUser})(AppNavbar);

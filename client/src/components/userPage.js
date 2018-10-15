import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserPosts, deletePost } from '../actions/postActions';
import { updateUser, resetMessage, resetErrorMessage } from '../actions/authActions';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Col, Container, Form,
FormGroup, Label, Input, ListGroup, Alert } from 'reactstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Post from './Post';
import { Link } from 'react-router-dom';
import '../Styles/navbar.css';


export class userPage extends Component {

      state = {
        activeTab: '1',
        userPage: true
      };
   
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }
 
      componentDidMount() {
          this.props.getUserPosts(this.props.user.username);
      }

      deleteUserPost = (id) => {
          this.props.deletePost(id);
      }

      onChange = (e) => {
          this.setState({ [e.target.name] : e.target.value});
      }

      onSubmit = (e) => {
        e.preventDefault();
        const userID = this.props.user.userID;
        const userInfo = {
            password: this.state.password,
            email: this.state.email
        }
        this.props.updateUser(userID, userInfo);
      }

      showUserMessage = () => {
        if(this.props.message) {
          return(
            <div>
              <Alert color="success">{this.props.message}</Alert>
            </div>
          )
        }
        else if(this.props.errorMessage) {
          return(
            <div>
              <Alert color="danger">{this.props.errorMessage}</Alert>
            </div>
          )
        }
        else {
          return null;
        }
      }
 
  render() {
    const { userPosts } = this.props.post;
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              My Info
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { 
                this.toggle('2');
                this.props.message !== '' ? this.props.resetMessage() : null;
                this.props.errorMessage !== '' ? this.props.resetErrorMessage() : null }}
            >
              My Posts
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
          <Container>
            {this.showUserMessage()}
          <h3>Change your settings</h3>
          <Form className="form" onSubmit={this.onSubmit}>
            <Col>
              <FormGroup>
                  <Label>Password</Label>
                  <Input type="password" name="password" onChange={this.onChange} />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                  <Label>Email</Label>
                  <Input type="email" name="email" onChange={this.onChange} />
              </FormGroup>
            </Col>
            <Button>Submit</Button>
          </Form>
          </Container>
          </TabPane>
          <TabPane tabId="2">
            <Container>
                <ListGroup>
                    <TransitionGroup>
                    {userPosts.map((post) => (
                            <CSSTransition  timeout={500} classNames="fade">
                                <Container>
                                    <Post posts={post} comments={this.props.comments}  user={this.props.user} userPage={this.state.userPage} />
                                    <Button>
                                        <Link className="link" to={{pathname:"/editPost",
                                        state: {postInfo : post}}}>Edit</Link>
                                    </Button>
                                    <Button onClick={() => { 
                                      if(window.confirm('Are you sure you wish to delete this post?')) 
                                      this.deleteUserPost(post._id)}}>Delete</Button>
                                    <br />
                                    <br />
                                </Container>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}
 
userPage.PropTypes = {
    getUserPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    resetMessage: PropTypes.func.isRequired,
    resetErrorMessage: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    user: PropTypes.object,
    userMessage: PropTypes.object,
    errorUserMessage: PropTypes.object,
    postMessage: PropTypes.object,
    errorPostMessage: PropTypes.object,
}



const mapStateToProps = (state) => ({
    post: state.post,
    user: state.auth,
    message: state.auth.message,
    errorMessage: state.auth.errorMessage,
    comments: state.comment.comments
});

export default connect(mapStateToProps, { getUserPosts, deletePost, updateUser, resetMessage, resetErrorMessage })(userPage);



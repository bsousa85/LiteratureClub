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
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import '../Styles/my-form.css';
import '../Styles/my-tabs.css'


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

      showConfirm = (id) => {
        confirmAlert({
          title: 'Confirm to Submit',
          message: 'Are you sure you want to delete this post?',
          buttons: [
            {
              label: 'Confirm',
              onClick: () => { this.props.deletePost(id); }
            },
            {
              label: 'Go Back',
              onClick: () => {}
            }
          ]
        })
      };
 
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
      <div >
        <Nav tabs className="my-tabs">
          <NavItem className="my-item">
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              My Info
            </NavLink>
          </NavItem>
          <NavItem className="my-item">
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
          <Container className="my-form">
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
            <Container className="my-posts">
                <ListGroup>
                    <TransitionGroup>
                    {userPosts.map((post) => (
                            <CSSTransition key={post._id}  timeout={500} classNames="fade">
                                <Container>
                                    <Post posts={post}  comments={this.props.comments}  user={this.props.user} userPage={this.state.userPage} />
                                    <div className="my-buttons">
                                      <Button >
                                        <Link className="link" to={{pathname:"/editPost",
                                        state: {postInfo : post}}}>Edit</Link>
                                      </Button>
                                      <Button onClick={() => {this.showConfirm(post._id)}}>Delete</Button>
                                    </div>
                                    
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
 
userPage.propTypes = {
    getUserPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func,
    updateUser: PropTypes.func,
    resetMessage: PropTypes.func,
    resetErrorMessage: PropTypes.func,
    post: PropTypes.object.isRequired,
    user: PropTypes.object,
    message: PropTypes.string,
    errorMessage: PropTypes.string,
}



const mapStateToProps = (state) => ({
    post: state.post,
    user: state.auth,
    message: state.auth.message,
    errorMessage: state.auth.errorMessage,
    comments: state.comment.comments
});

export default connect(mapStateToProps, { getUserPosts, deletePost, updateUser, resetMessage, resetErrorMessage })(userPage);



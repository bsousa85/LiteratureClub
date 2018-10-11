import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 
import Post from './Post';
import { connect } from 'react-redux'
import { getPosts } from '../actions/postActions';
import PropTypes from 'prop-types';

class ShowPosts extends Component {

  componentDidMount() {
      this.props.getPosts();
  }

  render() {
    
    const { posts } = this.props.post;
    return (
      <Container>
          <ListGroup>
              <TransitionGroup>
                {posts.map((post) => (
                    <CSSTransition  timeout={500} classNames="fade">
                        <Container>
                            <Post posts={post} user={this.props.user} />
                            <br />
                            <br />
                        </Container>
                    </CSSTransition>
                ))}
              </TransitionGroup>
          </ListGroup>
      </Container>
    )
  }
}

ShowPosts.PropTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    post: state.post,
    user: state.auth.username
});


export default connect(mapStateToProps, { getPosts })(ShowPosts);

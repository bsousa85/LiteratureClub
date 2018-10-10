import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; 
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
              <TransitionGroup className="show-posts">
                {posts.map(({ id, title, text, category, votes, time, comment}) => (
                    <CSSTransition key={id} timeout={500} classNames="fade">
                        <Container>
                            <ListGroupItem>
                                {title}
                            </ListGroupItem>
                            <ListGroupItem>
                                {text}
                            </ListGroupItem>
                            <ListGroupItem>
                                {category}
                            </ListGroupItem>
                            <ListGroupItem>
                                {votes}
                            </ListGroupItem>
                            <ListGroupItem>
                                {time}
                            </ListGroupItem>
                            {comment.map(({user, text}) => (
                                <Container>
                                    <ListGroupItem>
                                        {user.username}
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        {text}
                                    </ListGroupItem>
                                </Container>
                            ))}
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
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post
});


export default connect(mapStateToProps, { getPosts })(ShowPosts);

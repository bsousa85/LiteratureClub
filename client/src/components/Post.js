import React, { Component } from 'react'
import '../Styles/post.css';
import { Card, CardSubtitle, CardBody, CardTitle, CardText, Button, Input } from 'reactstrap';


export class Post extends Component {
  

  render() {
    return (
          <div className="post">
            <Card>
              <CardBody>
                <CardTitle>{this.props.posts.title}</CardTitle>
                <CardSubtitle >{this.props.posts.category}</CardSubtitle>
                <CardSubtitle className="author">Author : {this.props.posts.author}</CardSubtitle>
              </CardBody>
              <CardBody>
                <CardText className="content">{this.props.posts.text}</CardText>
              </CardBody>
              <div className="like-section">
                <input className="like" type="image" src="images/likebtn.png" height="30" width="30" />
                <p id="votes">{this.props.posts.votes} people like this post</p>
                <p id="time">posted on, {this.props.posts.time}</p>
              </div>
                {this.props.posts.comment.map(({user, text}) => (
                  <div className="comment-section">
                      <p id="comment-user">{user.username} : </p>
                      <p id="comment-text">{text}</p>
                  </div>
                  
                ))}
            </Card>
          </div>
    )
  }
}

export default Post;

/*

<Container className="post">
            <Row>
              <Col>
                <h1>{this.props.posts.title}</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>{this.props.posts.category}</h5>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6>Author : {this.props.posts.author}</h6>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="content">{this.props.posts.text}</p>
              </Col>
            </Row>
              <p>{this.props.posts.votes}</p>
              <p>{this.props.posts.time}</p>
              {this.props.posts.comment.map(({user, text}) => (
                  <div> 
                    <p>{user.username}</p>
                    <p>{text}</p>
                  </div>
              ))}
          </Container>

          <input type="image" src="images/likebtn.pgn" height="30" width="30" />

          */
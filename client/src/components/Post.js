import React, { Component } from 'react'
import '../Styles/post.css';
import { Card, CardSubtitle, CardBody, CardTitle, CardText, Button, Input } from 'reactstrap';


export class Post extends Component {
  
  onClick = () => {
    this.props.onSubmit(this.props.posts._id);
  }

  showAddComment() {
    if(this.props.auth) {
      return (
                <div >
                    <p id="comment-user">{this.props.user}</p>
                    <textarea onChange={this.props.onChange} name="text" placeholder="Write some feedback!" />
                    <button onClick={this.onClick}>Submit</button>
                </div>
      )
    }
  }

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
                      <p id="comment-user">{user} : </p>
                      <p id="comment-text">{text}</p>
                  </div>
                ))}
                {this.showAddComment()}
            </Card>
          </div>
    )
  }
}

export default Post;

import React, { Component } from 'react';
import ShowPosts from './ShowPosts';
import { Jumbotron } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/jumbotron.css';

class Home extends Component {
  render() {
    return (
        <div className="App">
          <div className="jumbotron">
            <Jumbotron>
              <h1 className="display-3">Welcome to the Literature Club!</h1>
              <p className="lead">In here you can share your poetry and your short stories. Just create an account
              and start typing! </p>
            </Jumbotron>
          </div>
          <ShowPosts />
        </div>
    );
  }
}

export default Home;

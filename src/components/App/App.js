import React, { Component } from 'react';
import Container from 'components/Container';

class App extends Component {
  state = {};

  // Фазы жизненного цикла
  componentDidMount() {
    console.log('App componentDidMount');
  }

  // Фазы жизненного цикла
  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');
    // До обновления
    console.log('prevState', prevState);
    // После обновления
    console.log('state', this.state);
  }

  render() {
    return <Container></Container>;
  }
}

export default App;

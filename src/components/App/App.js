import React, { Component } from 'react';
import Container from 'components/Container';
import Searchbar from 'components/Searchbar';

class App extends Component {
  state = {
    photo: null,
    loading: false,
  };

  // Фазы жизненного цикла
  componentDidMount() {
    console.log('App componentDidMount');

    this.setState({ loaing: true });

    fetch(
      'https://pixabay.com/api/?q=cat&page=1&key=22659377-0dd97b237805bca735c774318&image_type=photo&orientation=horizontal&per_page=12',
    )
      .then(res => res.json())
      .then(photo => this.setState({ photo }))
      .finally(() => this.setState({ loading: false }));
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
    return (
      <Container>
        <Searchbar></Searchbar>
        {this.state.loading && <h1>Loading...</h1>}
        {this.state.photo && (
          <div>Тут будет фото после фетча и когда в стейт запишем</div>
        )}
      </Container>
    );
  }
}

export default App;

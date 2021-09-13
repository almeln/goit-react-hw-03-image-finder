import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'components/Container';
import Searchbar from 'components/Searchbar';

class App extends Component {
  state = {
    searchName: '',
  };
  // state = {
  //   photo: null,
  //   loading: false,
  // };

  // // Фазы жизненного цикла
  // componentDidMount() {
  //   console.log('App componentDidMount');

  //   this.setState({ loaing: true });

  //   fetch(
  //     'https://pixabay.com/api/?q=cat&page=1&key=22659377-0dd97b237805bca735c774318&image_type=photo&orientation=horizontal&per_page=12',
  //   )
  //     .then(res => res.json())
  //     .then(photo => this.setState({ photo }))
  //     .finally(() => this.setState({ loading: false }));
  // }

  // // Фазы жизненного цикла
  // componentDidUpdate(prevProps, prevState) {
  //   console.log('App componentDidUpdate');
  //   // До обновления
  //   console.log('prevState', prevState);
  //   // После обновления
  //   console.log('state', this.state);
  // }

  handleFormSubmit = searchName => {
    console.log(searchName);
    // При сабмите формы записываем значение инпута из Серчбар в Апп
    this.setState({ searchName });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
        <ToastContainer autoClose={3000} />
        {this.state.loading && <h1>Loading...</h1>}
        {this.state.photo && (
          <div>Тут будет фото после фетча и когда в стейт запишем</div>
        )}
      </Container>
    );
  }
}

export default App;

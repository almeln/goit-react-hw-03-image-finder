import React, { Component } from 'react';
import { Toaster } from 'react-hot-toast';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Container from 'components/Container';
import { Container } from './App.styled';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';

class App extends Component {
  state = {
    searchName: '',
    selectedPhoto: null,
    selectedAlt: null,
  };

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

  // Для выбора картинки
  handleSelectedPhoto = (imageURL, description) =>
    this.setState({
      selectedPhoto: imageURL,
      selectedAlt: description,
    });

  closeModal = () =>
    this.setState({
      selectedPhoto: null,
      selectedAlt: null,
    });

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
        {/* <ToastContainer autoClose={3000} /> */}
        <ImageGallery
          searchName={this.state.searchName}
          onSelect={this.handleSelectedPhoto}
        />
        {this.state.selectedPhoto && (
          <Modal onClose={this.closeModal}>
            <img src={this.state.selectedPhoto} alt={this.state.selectedAlt} />
          </Modal>
        )}
        <Toaster position="top-right" />
      </Container>
    );
  }
}

export default App;

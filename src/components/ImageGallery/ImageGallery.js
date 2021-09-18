import { Component } from 'react';
import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast';
import {
  NoNameDiv,
  ImageGalleryList,
  ImageGalleryListItem,
} from './ImageGallery.styled';

import ImageGalleryItem from 'components/ImageGalleryItem';
import PhotosLoader from 'components/Loader/Loader';
import { fetchPhotos } from '../../services/photos-api';
import Button from 'components/Button';

class ImageGallery extends Component {
  state = {
    photos: null,
    // loading: false,
    error: null,
    status: 'idle',
    page: 1,
  };

  // Когда компонент обновляется (обновляются или пропсы или стейт)
  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevPhotos = this.state.photos;
    // Внутри компонента componentDidUpdate всегда обязатлеьно должна быть проверка, чтобы он не зациклился
    if (prevName !== nextName) {
      try {
        console.log('Изменилось имя поиска');
        console.log('prevName', prevName);
        console.log('nextName', nextName);

        this.setState({ status: 'pending', page: 1 });

        await fetchPhotos(nextName, nextPage).then(photos =>
          this.setState({ photos: photos.hits, status: 'resolved' }),
        );
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
      if (this.state.photos.length === 0) {
        return toast.error('Ooops... There are no photos on this result!');
      }
      // console.log('Изменилось имя поиска');
      // console.log('prevName', prevName);
      // console.log('nextName', nextName);

      // this.setState({ status: 'pending' });

      // await fetchPhotos(nextName)
      //   .then(photos =>
      //     this.setState({ photos: photos.hits, status: 'resolved' }),
      //   )
      // .catch(error => this.setState({ error, status: 'rejected' }));

      //   fetch(
      //     `https://pixabay.com/api/?q=${nextName}&page=1&key=22659377-0dd97b237805bca735c774318&image_type=photo&orientation=horizontal&per_page=12`,
      //   )
      //     .then(response => {
      //       if (response.ok) {
      //         return response.json();
      //       }

      //       return Promise.reject(new Error(`No result with name ${nextName}`));
      //     })
      //     .then(photos =>
      //       this.setState({ photos: photos.hits, status: 'resolved' }),
      //     )
      //     .catch(error => this.setState({ error, status: 'rejected' }));
      //   // .finally(() => this.setState({ loading: false }));
    }

    if (prevPage !== nextPage) {
      try {
        console.log('Изменилась страница');
        console.log('prevPage', prevPage);
        console.log('nextPage', nextPage);

        this.setState({ status: 'pending' });

        await fetchPhotos(nextName, nextPage).then(photos =>
          this.setState({
            photos: [...prevPhotos, ...photos.hits],
            status: 'resolved',
          }),
        );
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  togleLoadMoreBtn = () => {
    console.log('btn-click');

    this.setState({
      page: this.state.page + 1,
    });

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { photos, status } = this.state;
    // const { searchName } = this.props;

    // State-машина
    if (status === 'idle') {
      return <NoNameDiv>Enter search name</NoNameDiv>;
    }

    if (status === 'pending') {
      return <PhotosLoader />;
    }

    if (status === 'rejected') {
      //   return <p>{error.message}</p>;
      return toast.error('Ooops... There are no photos on this result!');
    }

    if (status === 'resolved') {
      const { togleLoadMoreBtn } = this;

      return (
        <>
          <ImageGalleryList>
            {photos.map(({ id, largeImageURL, tags, webformatURL }) => (
              <ImageGalleryListItem
                key={id}
                onClick={() => this.props.onSelect(largeImageURL, tags)}
              >
                <ImageGalleryItem src={webformatURL} alt={tags} />
              </ImageGalleryListItem>
            ))}
          </ImageGalleryList>
          {photos.length >= 12 && <Button onClick={togleLoadMoreBtn}></Button>}
        </>
      );
    }

    // return (
    //   <div>
    //     {error && <h1>{error.message}</h1>}
    //     {loading && <div>Loading...</div>}
    //     {!searchName && <div>Введите критерий поиска</div>}
    //     {photos && (
    //       <ul className="GalleryList">
    //         {photos.map(photo => (
    //           <li className="ImageGalleryItem" key={photo.id}>
    //             <ImageGalleryItem src={photo.previewURL} alt={photo.tags} />
    //           </li>
    //         ))}
    //       </ul>
    //     )}
    //     <p>{searchName}</p>
    //   </div>
    // );
  }
}

ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ImageGallery;

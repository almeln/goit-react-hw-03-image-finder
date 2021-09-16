import { Component } from 'react';
import { toast } from 'react-toastify';

import ImageGalleryItem from 'components/ImageGalleryItem';
import PhotosLoader from 'components/Loader/Loader';
import { fetchPhotos } from '../../services/photos-api';

class ImageGallery extends Component {
  state = {
    photos: null,
    // loading: false,
    error: null,
    status: 'idle',
  };

  // Когда компонент обновляется (обновляются или пропсы или стейт)
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;
    // Внутри компонента componentDidUpdate всегда обязатлеьно должна быть проверка, чтобы он не зациклился
    if (prevName !== nextName) {
      console.log('Изменилось имя поиска');
      console.log('prevName', prevName);
      console.log('nextName', nextName);

      this.setState({ status: 'pending' });

      fetchPhotos(nextName)
        .then(photos =>
          this.setState({ photos: photos.hits, status: 'resolved' }),
        )
        .catch(error => this.setState({ error, status: 'rejected' }));

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
  }

  render() {
    const { photos, status } = this.state;
    // const { searchName } = this.props;

    // State-машина
    if (status === 'idle') {
      return <div>Enter search name</div>;
    }

    if (status === 'pending') {
      return <PhotosLoader />;
    }

    if (status === 'rejected') {
      //   return <p>{error.message}</p>;
      return toast.error('Ooops... There are no photos on this result!');
    }

    if (status === 'resolved') {
      return (
        <ul className="ImageGallery">
          {photos.map(photo => (
            <li className="ImageGalleryItem" key={photo.id}>
              <ImageGalleryItem src={photo.previewURL} alt={photo.tags} />
            </li>
          ))}
        </ul>
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

export default ImageGallery;

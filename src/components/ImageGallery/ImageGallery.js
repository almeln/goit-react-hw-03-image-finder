import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    photos: null,
    loading: false,
    error: null,
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

      this.setState({ loading: true, photos: null });

      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=1&key=22659377-0dd97b237805bca735c774318&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(new Error(`No result with name ${nextName}`));
        })
        .then(photos => this.setState({ photos: photos.hits }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { photos, loading, error } = this.state;
    const { searchName } = this.props;

    return (
      <div>
        {error && <h1>{error.message}</h1>}
        {loading && <div>Loading...</div>}
        {!searchName && <div>Введите критерий поиска</div>}
        {photos && (
          <ul className="GalleryList">
            {photos.map(photo => (
              <li className="ImageGalleryItem" key={photo.id}>
                <ImageGalleryItem src={photo.previewURL} alt={photo.tags} />
              </li>
            ))}
          </ul>
        )}
        <p>{searchName}</p>
      </div>
    );
  }
}

export default ImageGallery;

import { Component } from 'react';

class ImageGallery extends Component {
  state = {
    photos: null,
    loading: false,
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

      this.setState({ loading: true });

      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=1&key=22659377-0dd97b237805bca735c774318&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(res => res.json())
        .then(photos => this.setState({ photos: photos.hits }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  render() {
    const { photos, loading } = this.state;
    const { searchName } = this.props;

    return (
      <ul className="ImageGallery">
        {loading && <div>Loading...</div>}
        {!searchName && <div>Введите критерий поиска</div>}
        {photos && <div>{photos.id}</div>}
      </ul>
    );
  }
}

export default ImageGallery;

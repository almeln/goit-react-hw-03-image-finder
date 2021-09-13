import { Component } from 'react';

class ImageGallery extends Component {
  state = {};

  // Когда компонент обновляется (обновляются или пропсы или стейт)
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;
    // Внутри компонента componentDidUpdate всегда обязатлеьно должна быть проверка, чтобы он не зациклился
    if (prevName !== nextName) {
      console.log('Изменилось имя поиска');
      console.log('prevName', prevName);
      console.log('nextName', nextName);

      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=1&key=22659377-0dd97b237805bca735c774318&image_type=photo&orientation=horizontal&per_page=12`,
      )
        .then(res => res.json())
        .then(console.log);
    }
  }

  render() {
    return <ul className="ImageGallery"></ul>;
  }
}

export default ImageGallery;

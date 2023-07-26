import css from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({ images, onImageClick }) => {
  return images.map(image => {
    return (
      <li className={css.ImageGalleryItem} key={image.id}>
        <img
          className={css['ImageGalleryItem-image']}
          src={image.webformatURL}
          alt={image.tags}
          onClick={() => onImageClick(image.largeImageURL)}
        />
      </li>
    );
  });
};

export default ImageGalleryItem;

import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';
const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className={css.ImageGallery}>
      <ImageGalleryItem images={images} onImageClick={onImageClick} />
    </ul>
  );
};
export default ImageGallery;

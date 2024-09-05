import { ReactSVG } from 'react-svg';
import styles from './ImageGalleryWithTitle.module.scss';

const ImageGalleryWithTitle = (props) => {
  const { bannerList, clsName } = props;

  return (
    <>
      {bannerList
        ? bannerList.map((eachField) => (
            <div key={eachField.galleryImages.id} className={clsName}>
              <ReactSVG
                src={eachField.galleryImages.url}
                className={`svgWraper ${styles['acc-img-gallery-icon']}`}
              />
              <p className="pl-4">{eachField.imageDescription}</p>
            </div>
          ))
        : ''}
    </>
  );
};
export default ImageGalleryWithTitle;

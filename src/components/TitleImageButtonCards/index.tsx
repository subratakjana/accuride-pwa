import { Container, Row, Col, Button } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import { I18nLink } from '@Components/Utilities';
import Image from 'next/legacy/image';
import styles from './TitleImageButtonCards.module.scss';

const TitleImageButtonCardsSection = ({ content }) => {
  return (
    <Container className="section-padding">
      <Row
        xs={1}
        sm={1}
        md={2}
        lg={2}
        xl={3}
        className={`${styles['acc-title-image-cards-row']} justify-content-center mx-n1`}
      >
        {content?.map((item) => (
          <Col
            key={item.id}
            className={`${styles['acc-title-image-cards']} text-uppercase px-1`}
          >
            <div className="position-relative d-flex flex-column justify-content-between">
              <h3 className="font-family-secondary bg-primary px-3 py-2 d-flex align-items-center justify-content-center justify-content-md-start text-white font-weight-700 position-relative z-index-2 w-100 mb-0">
                <ReactSVG
                  src="/assets/images/icons/star_dingbat.svg"
                  className={`text-secondary flex-shrink-0 mr-2 ${styles['acc-star-dingbat']}`}
                />
                <span>{item.title}</span>
              </h3>
              <Image
                src={item.image.url}
                alt={item.image.fileName}
                objectFit="cover"
                objectPosition="center"
                className={styles['acc-title-image-cards-image']}
                priority={true}
                width={500}
                height={472}
              />
              <I18nLink href={item.buttonLink} isMagentoRoute={0}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="z-index-2 font-weight-500 position-absolute bottom right"
                >
                  {item.buttonText}
                </Button>
              </I18nLink>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default TitleImageButtonCardsSection;

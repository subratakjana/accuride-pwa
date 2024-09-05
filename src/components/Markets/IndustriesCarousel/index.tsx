import { useEffect, useState } from "react";
import { I18nLink } from "@Components/Utilities";
import { Container, Card, Button } from "react-bootstrap";
import Slider from "react-slick";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const IndustriesCarousel = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);

  const {
    title,
    description,
    data,
    customStyle,
    secCustomStyle,
    customSettings,
  } = props;
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  return (
    <section className={`section-padding text-center ${secCustomStyle}`}>
      <Container>
        <article className={`${customStyle}`}>
          {title ? <h1 className="m-0 pb-3">{title}</h1> : ""}
          {description ? <p className="m-0 pb-3">{description.text}</p> : ""}
          <Slider {...customSettings}>
            {data
              ? data.map((industries) => (
                  <Card key={`imgcs_${industries.id}`} className="border-0">
                    {industries.imageButtonLabel === null &&
                    industries.imageButtonLink ? (
                      <a
                        href={industries.imageButtonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="link"
                      >
                        <Card.Img
                          height={100}
                          alt={industries.fileName}
                          src={industries.galleryImages.url}
                        />
                      </a>
                    ) : (
                      <Card.Img
                        height={100}
                        alt={industries.fileName}
                        src={industries.galleryImages.url}
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{industries.imageTitle}</Card.Title>
                      {industries.imageDescription ? (
                        <Card.Text key={`artdesc_${industries.id}`}>
                          {industries.imageDescription}
                        </Card.Text>
                      ) : (
                        [
                          industries.imageDescription2 ? (
                            <HTMLContent
                              key={`arthtmldesc_${industries.id}`}
                              className="m-0"
                              content={industries.imageDescription2.html}
                            />
                          ) : (
                            ""
                          ),
                        ]
                      )}
                      {industries.imageButtonLabel ? (
                        <I18nLink
                          href={industries.imageButtonLink}
                          isMagentoRoute={0}
                        >
                          <Button
                            variant="primary"
                            className={`text-uppercase ${
                              windowObj && windowSize.width < 991
                                ? "btn-block"
                                : ""
                            }`}
                          >
                            {industries.imageButtonLabel}
                          </Button>
                        </I18nLink>
                      ) : (
                        ""
                      )}
                    </Card.Body>
                  </Card>
                ))
              : ""}
          </Slider>
        </article>
      </Container>
    </section>
  );
};
export default IndustriesCarousel;

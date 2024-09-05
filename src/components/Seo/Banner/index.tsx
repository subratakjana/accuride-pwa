import { useContext, useState } from "react";
import { useQuery } from "graphql-hooks";
import { LoadingIndicator, I18nLink } from "@Components/Utilities";
import { AuthContext } from "@Contexts/AuthContext";
import gql from "graphql-tag";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Button, Container, Modal } from "react-bootstrap";
import dynamic from "next/dynamic";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const Banner = (props) => {
  const [show, setShow] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    const getVideoUrl = e.target.getAttribute("data-url");
    setVideoUrl(getVideoUrl);
  };
  let bannerList = [];
  const { notify } = useContext(AuthContext);
  const { field, model } = props;
  const query = gql`
    {
        ${model}{
        ${field}{
            id
            bannerHeading
            bannerDescription
            bannerDescription2{
                html
                text
            }
            bannerImage {
                id
                fileName
                url
            }
            bannerButtonText
            bannerButtonLink
            bannerLinkType
            }
        }
    }`;

  const {
    loading: ACSLoading,
    error,
    data,
  } = useQuery(query, {
    variables: { field: props.field, model: props.model },
    operationName: { clientName: "graphCms" },
  });

  if (ACSLoading) return <LoadingIndicator />;
  if (data) {
    bannerList = data[model];
  }
  if (error) {
    notify(error.message, "error");
    return <h2>No data found</h2>;
  }

  return (
    <>
      {bannerList
        ? bannerList.map((banners) => (
            <section
              key={`banner_${banners[field].id}`}
              className={`acc-page-main-banner position-relative ${props.customStyle}`}
            >
              {banners[field].bannerImage
                ? banners[field].bannerImage.map((bannerimage) => (
                    <LazyLoadImage
                      key={bannerimage.id}
                      className="w-100"
                      src={bannerimage.url}
                      alt={bannerList.bannerHeading}
                    />
                  ))
                : ""}
              <Container>
                <article className="position-absolute acc-banner-caption">
                  {banners[field].bannerHeading ? (
                    <h2 className="text-white">
                      {banners[field].bannerHeading}
                    </h2>
                  ) : (
                    ""
                  )}
                  {banners[field].bannerDescription2 ? (
                    <HTMLContent
                      className="m-0"
                      content={banners[field].bannerDescription2.html}
                    />
                  ) : (
                    [
                      banners[field].bannerDescription ? (
                        <p className="text-white">
                          {banners[field].bannerDescription}
                        </p>
                      ) : (
                        ""
                      ),
                    ]
                  )}
                  {banners[field].bannerButtonText ? (
                    <>
                      {banners[field].bannerLinkType === "Video" ? (
                        <Button
                          variant="primary"
                          data-url={banners[field].bannerButtonLink}
                          onClick={handleShow}
                          className={`text-uppercase ${
                            props.windowObj && props.windowSize.width < 991
                              ? "btn-block"
                              : ""
                          }`}
                        >
                          {banners[field].bannerButtonText}
                        </Button>
                      ) : (
                        <I18nLink href={banners[field].bannerButtonLink}>
                          <Button
                            variant="primary"
                            className={`text-uppercase ${
                              props.windowObj && props.windowSize.width < 991
                                ? "btn-block"
                                : ""
                            }`}
                          >
                            {banners[field].bannerButtonText}
                          </Button>
                        </I18nLink>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </article>
                <Modal
                  size="md"
                  show={show}
                  onHide={handleClose}
                  className="acc-custom-modal"
                >
                  <Modal.Body className="text-center">
                    <iframe
                      width="100%"
                      height="420"
                      src={videoUrl}
                      title="video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </Modal.Body>
                </Modal>
              </Container>
            </section>
          ))
        : ""}
    </>
  );
};
export default Banner;

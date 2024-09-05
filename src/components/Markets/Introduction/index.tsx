import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import dynamic from "next/dynamic";
import { I18nLink } from "@Components/Utilities";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const Introduction = (props) => {
  const Introdution = props.dataobj;
  const { dataTitle, dataDesc } = props;
  const windowSize = props.winSize;
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  return (
    <>
      {Introdution ? (
        <section
          className={`section-padding text-center ${props.customStyle}`}
          id={`${props.customId}`}
        >
          <Container>
            {windowObj && windowSize.width > 1024 ? (
              <article className="w-75 mx-auto introduction-wrapper">
                <h1 className="m-0 pb-3 text-uppercase">
                  {Introdution.pageTitle}
                </h1>
                <HTMLContent
                  className="m-0"
                  content={Introdution.pageIntroduction.html}
                />
              </article>
            ) : (
              <article>
                <h1 className="m-0 pb-3 text-uppercase">
                  {Introdution.pageTitle}
                </h1>
                <HTMLContent
                  className="m-0"
                  content={Introdution.pageIntroduction.html}
                />
              </article>
            )}
          </Container>
        </section>
      ) : (
        <section
          className={`section-padding text-center ${props.customStyle}`}
          id={`${props.customId}`}
        >
          <Container>
            {windowObj && windowSize.width > 1024 ? (
              <article className="w-75 mx-auto">
                <h1 className="m-0 pb-3 text-uppercase">{dataTitle}</h1>
                {dataDesc ? (
                  <HTMLContent className="m-0" content={dataDesc} />
                ) : null}
              </article>
            ) : (
              <article>
                <h1 className="m-0 pb-3 text-uppercase">{dataTitle}</h1>
                {dataDesc ? (
                  <HTMLContent className="m-0" content={dataDesc} />
                ) : null}
              </article>
            )}
            {props.ifButton && (
              <div className="mt-3 mt-md-4 text-center">
                <I18nLink href={props.buttonLink}>
                  <Button
                    variant="primary"
                    size="lg"
                    className={`text-uppercase rounded px-5 px-md-3 ${
                      windowObj && windowSize.width < 576 ? "btn-block" : ""
                    }`}
                    type="submit"
                  >
                    {props.buttonText}
                  </Button>
                </I18nLink>
              </div>
            )}
          </Container>
        </section>
      )}
    </>
  );
};

export default Introduction;

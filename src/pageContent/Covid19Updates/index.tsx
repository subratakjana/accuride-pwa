import { Container } from "react-bootstrap";
import dynamic from "next/dynamic";

const HTMLContent = dynamic(
  () => import("@Components/Utilities/HTMLContent"),
);

const Covid19Update = ({ covid19Updatess }) => {
  return (
    <>
      {covid19Updatess
        ? covid19Updatess.map((rows) => (
            <div key={`cv_${rows.id}`}>
              <section className="section-padding">
                <Container>
                  <HTMLContent
                    className="m-0"
                    content={rows.description.html}
                  />
                </Container>
              </section>
            </div>
          ))
        : ""}
    </>
  );
};

export default Covid19Update;

import { Container, Form, Button, ProgressBar } from "react-bootstrap";
import useWindowDimensions from "@Hooks/windowDimention";
import { useEffect, useState } from "react";

const CreatePassword = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  return (
    <section className="section-padding">
      <Container>
        {/* header start */}
        <header className="mb-3 text-center text-md-left">
          <h1 className="text-uppercase">Set a New Password</h1>
        </header>
        {/* header end */}

        <Form
          className={`${windowObj && windowSize.width > 768 ? "w-50" : ""}`}
        >
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="New Password"
              className="mb-2"
              required
            />
            <ProgressBar>
              <ProgressBar striped variant="info" now={75} key={3} />
            </ProgressBar>
            <Form.Text className="text-info">
              Password Strength: Strong
            </Form.Text>
            <Form.Control.Feedback>Message</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              required
            />
            <Form.Control.Feedback>Message</Form.Control.Feedback>
          </Form.Group>
          <Button
            block
            variant="secondary"
            type="submit"
            className={`text-uppercase ${
              windowObj && windowSize.width <= 767 ? "btn-block" : "btn-lg"
            }`}
          >
            Set a New Password
          </Button>
        </Form>
      </Container>
    </section>
  );
};

export default CreatePassword;

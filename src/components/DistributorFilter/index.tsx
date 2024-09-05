import {
    Container, Row, Col, Form,
} from 'react-bootstrap';

const distributorFilterOptions = () => (
    <>
        <section>
            <Container>
                <Row>
                    <Col lg={4}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Control as="select">
                                <option>Miles From My Location</option>
                                <option>1</option>
                                <option>3</option>
                                <option>5</option>
                                <option>10</option>
                                <option>15</option>
                                <option>50</option>
                                <option>100</option>
                                <option>500</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
);

export default distributorFilterOptions;

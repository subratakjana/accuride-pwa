import {
    Container,
    Row,
    Col,
    Form,
    Button,
} from 'react-bootstrap';
import dynamic from 'next/dynamic';

const AccountSidebar = dynamic(() => import('@Components/Customer/Account/AccountSidebar'));

const GiftCard = () => (
    <Container className="section-padding pt-0">
        <Row>
            {/* account sidebar start */}
            <Col md className="acc-account-sidebar">
                <AccountSidebar />
            </Col>
            {/* account sidebar end */}

            {/* account content start */}
            <Col md className="acc-account-content">
                <header className="mb-3">
                    <h1 className="text-uppercase mb-0">Gift Card</h1>
                </header>

                <Form>
                    <Form.Row>
                        {/* gift card */}
                        <Form.Group as={Col} sm={12}>
                            <Form.Label>
                                Enter gift card code
                                <span className="text-danger"> *</span>
                            </Form.Label>
                            <Form.Control
                                requirde
                                type="text"
                            />
                            <Form.Control.Feedback>Error Message</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Button variant="secondary" block className="text-uppercase">Redeem Gift Card</Button>
                    <Button variant="primary" block className="text-uppercase">Check Status and Balance</Button>
                </Form>
            </Col>
            {/* account content end */}
        </Row>
    </Container>
);

export default GiftCard;

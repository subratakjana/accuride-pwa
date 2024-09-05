import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const GiftCard = (props) => {
    const [couponCode, setCoupon] = useState('');
    function handleChange(evt) {
        setCoupon(evt.target.value);
    }
    return (
        <>
            <Form className="text-center">
                <Form.Group
                    onSubmit={(e) => { e.preventDefault(); props.applyDiscountFn(couponCode); }}
                >
                    <Form.Control type="text" placeholder="Enter the gift card code" onChange={handleChange} />
                    <Form.Text className="text-danger d-none">Error text</Form.Text>
                </Form.Group>
                <Button variant="primary" disabled={couponCode === ''} type="submit" className="text-uppercase" onClick={(e) => { e.preventDefault(); props.applyGiftDiscountFn(couponCode); }}>Add Gift Card</Button>
            </Form>
        </>
    );
};

export default GiftCard;

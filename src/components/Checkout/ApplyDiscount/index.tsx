import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const ApplyDiscount = (props) => {
    const [couponCode, setCoupon] = useState('');
    function handleChange(evt) {
        setCoupon(evt.target.value);
    }
    return (
        <div className="acc-discount-code">
            {props.couponStatus !== '' ? (<p>{`You used coupon code "${props.couponStatus}"`}</p>) : ('')}
            <Form className="text-center" onSubmit={(e) => { e.preventDefault(); props.applyDiscountFn(couponCode); }}>
                <Form.Group className="mb-0 ml-0">
                    <InputGroup>
                        <Form.Control type="text" readOnly={props.couponStatus !== ''} defaultValue={props.couponStatus} onChange={handleChange} />
                        <InputGroup.Append>
                            {props.couponStatus !== '' ? (<Button variant="primary" type="submit" className="text-uppercase" onClick={(e) => { e.preventDefault(); props.rmDiscountFn(couponCode); }}>Remove Discount</Button>) : (<Button variant="primary" type="submit" disabled={couponCode === ''} className="text-uppercase" onClick={(e) => { e.preventDefault(); props.applyDiscountFn(couponCode); }}>Apply Discount</Button>)}
                        </InputGroup.Append>
                    </InputGroup>
                    <Form.Control.Feedback type="valid">Error text</Form.Control.Feedback>
                </Form.Group>
            </Form>
        </div>
    );
};

export default ApplyDiscount;

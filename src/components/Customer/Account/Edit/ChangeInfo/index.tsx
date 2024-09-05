import {
    Col,
    Form,
} from 'react-bootstrap';

const ChangeInfo = (props) => {
    const editAcconutObj = props.editMode;
    return (
        <>
            {/* change email start */}
            {editAcconutObj.editMode === 'email' ? (
                <div className="py-3">
                    <h3 className="mb-3 text-uppercase">Change Email</h3>
                    <Form.Row>
                        {/* email */}
                        <Form.Group as={Col} sm={6}>
                            <Form.Label>
                                Email
                                <span className="text-danger"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="email"
                                required
                                name="email"
                                onBlur={props.validationFormField}
                                onKeyUp={props.validationFormField}
                                defaultValue={editAcconutObj.customerAccountData.email}
                            />
                            <Form.Control.Feedback type="invalid">This is a required field.</Form.Control.Feedback>
                        </Form.Group>

                        {/* last name */}
                        <Form.Group as={Col} sm={6}>
                            <Form.Label>
                                Current Password
                                <span className="text-danger"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="password"
                                required
                                name="currentPassword"
                                onBlur={props.validationFormField}
                                onKeyUp={props.validationFormField}
                            />
                            <Form.Control.Feedback type="invalid">This is a required field.</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                </div>

            ) : ''}
            {/* change email end */}

            {/* change password start */}
            {editAcconutObj.editMode === 'password' ? (
                <div className="py-3">
                    <h3 className="mb-3 text-uppercase">Change Password</h3>
                    <Form.Row>
                        {/* current password */}
                        <Form.Group as={Col} sm={4}>
                            <Form.Label>
                                Current Password
                                <span className="text-danger"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="password"
                                required
                                name="currentPassword"
                                onBlur={props.validationFormField}
                                onKeyUp={props.validationFormField}
                            />
                            <Form.Control.Feedback type="invalid">This is a required field.</Form.Control.Feedback>
                        </Form.Group>

                        {/* new password */}
                        <Form.Group as={Col} sm={4}>
                            <Form.Label>
                                New Password
                                <span className="text-danger"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="password"
                                className="mb-2"
                                required
                                name="password"
                                onBlur={props.validationFormField}
                                onKeyUp={props.validationFormField}
                            />
                            <Form.Text className="text-muted">
                                Password should be minimum 8 characters.
                                It must contain at least 1 of each of the
                                following: Lower Case, Upper Case, Digits,
                                Special Characters ( !@#$%^&* ).
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Please enter a correct password format.
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* confirm new password */}
                        <Form.Group as={Col} sm={4}>
                            <Form.Label>
                                Confirm New Password
                                <span className="text-danger"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="password"
                                required
                                name="confirmPassword"
                                onBlur={props.validationFormField}
                                onKeyUp={props.validationFormField}
                            />
                            <Form.Control.Feedback type="invalid">
                                Password and confirm password will be same.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                </div>
            ) : ''}
            {/* change password end */}

            {/* change email and password start */}
            {editAcconutObj.editMode === 'booth' ? (
                <div className="py-3">
                    <h3 className="mb-3 text-uppercase">Change Email and Password</h3>
                    <Form.Row>
                        {/* email */}
                        <Form.Group as={Col} md={12}>
                            <Form.Label>
                                Email
                                <span className="text-danger"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="email"
                                required
                                name="email"
                                onBlur={props.validationFormField}
                                onKeyUp={props.validationFormField}
                                defaultValue={editAcconutObj.customerAccountData.email}
                            />
                            <Form.Control.Feedback type="invalid">This is a required field.</Form.Control.Feedback>
                        </Form.Group>

                        {/* current password */}
                        <Form.Group as={Col} sm={4}>
                            <Form.Label>
                                Current Password
                                <span className="text-danger"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="password"
                                required
                                name="currentPassword"
                                onBlur={props.validationFormField}
                                onKeyUp={props.validationFormField}
                            />
                            <Form.Control.Feedback type="invalid">This is a required field.</Form.Control.Feedback>
                        </Form.Group>

                        {/* new password */}
                        <Form.Group as={Col} sm={4}>
                            <Form.Label>
                                New Password
                                <span className="text-danger"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="password"
                                className="mb-2"
                                required
                                name="password"
                                onBlur={props.validationFormField}
                                onKeyUp={props.validationFormField}
                            />
                            <Form.Text className="text-muted">
                                Password should be minimum 8 characters.
                                It must contain at least 1 of each of the
                                following: Lower Case, Upper Case, Digits,
                                Special Characters ( !@#$%^&* ).
                            </Form.Text>
                            <Form.Control.Feedback type="invalid">
                                Please enter a correct password format.
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* confirm new password */}
                        <Form.Group as={Col} sm={4}>
                            <Form.Label>
                                Confirm New Password
                                <span className="text-danger"> *</span>
                            </Form.Label>
                            <Form.Control
                                type="password"
                                required
                                name="confirmPassword"
                                onBlur={props.validationFormField}
                                onKeyUp={props.validationFormField}
                            />
                            <Form.Control.Feedback type="invalid">
                                Password and confirm password will be same.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                </div>
            ) : ''}
            {/* change email and password end */}
        </>
    );
};

export default ChangeInfo;

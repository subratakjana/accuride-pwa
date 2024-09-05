import {
    Container,
    Row,
    Col,
    Form,
    Button,
} from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import { useMutation, useManualQuery, useQuery } from 'graphql-hooks';
import { createCustomerAccount } from '@Graphql/queries/createCustomerAccount.graphql';
import { getInvitationEmail } from '@Graphql/queries/getInvitationEmail.graphql';
import { mergeGuestOrderInAccount } from '@Graphql/queries/mergeGuestOrderInAccount.graphql';
import GET_INDUSTRY_LIST from '@Graphql/queries/getIndustryList.graphql';
import GET_CUSTOMER_CATEGORY from '@Graphql/queries/getCustomerCategory.graphql';
import { AuthContext } from '@Contexts/AuthContext';
import { LoadingIndicator } from '@Components/Utilities';
import WEB_FORM_DETAILS from '@Graphql/queries/getWebFormDetails.graphql';
import { getClientIpAPI } from '@Graphql/queries/getClientIP.graphql';
import { GET_HASH_KEY } from '@Graphql/queries/getHashKeyInSignUp.graphql';
import Head from 'next/head';
import useWindowDimensions from '@Hooks/windowDimention';
import { useRouter } from 'next/router';

const md5 = require('md5');

const CreateAccount = (props) => {
    const windowSize = useWindowDimensions();
    const [windowObj, updateWindowObj] = useState(false);
    const { token, isInvite } = props;
    const [validated, setValidated] = useState(false);
    const [userMdHasKey, setUserHasKey] = useState(false);
    const [userIpAdd, setUserIpAdd] = useState(false);
    const {
        notify,
        simpleRedirect,
        encode,
        decode,
    } = useContext(AuthContext);
    const [selectIndustry, setIndustry] = useState();
    const [formData, setFormdata] = useState();
    const [guestSignData, setGuestSigndata] = useState(false);
    const router = useRouter();
    const formId = process.env.CREATE_ACCOUNT_FORMID;

    const { data: userIp } = useQuery(getClientIpAPI.loc.source.body, {
        fetchPolicy: 'no-cache',
    });

    const [getCustomerHashKey] = useMutation(GET_HASH_KEY.loc.source.body);

    useEffect(() => {
        if (windowSize.width !== 0) updateWindowObj(true);
        if (localStorage.guestSignIn && 'guest' in router.query) {
            setGuestSigndata(JSON.parse(localStorage.guestSignIn));
        } else {
            localStorage.removeItem('guestSignIn');
        }
        if (userIp && userIp.getClientIp.ip) {
            getCustomerHashKey({
                variables: {
                    userIp: {
                        identifier: userIp.getClientIp.ip,
                    },
                },
            }).then((data) => {
                setUserHasKey(md5(data.data.getHashKey.hashkey));
                setUserIpAdd(userIp.getClientIp.ip);
            });
        }
    }, [userIp]);

    const inputFields = {
        email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    };

    /** on blur and on key each form field check validation */
    const validationFormField = (e) => {
        const targetObj = e.target;
        if (targetObj.required && targetObj.value.trim() === '' && (targetObj.type === 'text' || targetObj.type === 'textarea')) {
            targetObj.value = '';
        }
        const password = document.querySelector("input[name='password']").value;
        if (targetObj.value === '') {
            targetObj.classList.add('is-invalid');
        } else if (targetObj.name === 'password') {
            targetObj.value = targetObj.value.replace(/ /g, '');
            inputFields.password.test(password) ? targetObj.classList.remove('is-invalid') : targetObj.classList.add('is-invalid');
        } else if (targetObj.name === 'confirmPassword' && targetObj.value !== '') {
            const confirmPass = targetObj.value;
            if (password !== confirmPass) {
                targetObj.classList.add('is-invalid');
            } else {
                targetObj.classList.remove('is-invalid');
            }
        } else {
            targetObj.classList.remove('is-invalid');
        }
    };

    const [margeGuestOrderInAccountFn, { loading: margeOrderLoading }] = useMutation(mergeGuestOrderInAccount.loc.source.body);

    /**
     * marge guest order when login as a guest user with previous order id
     */
    const margeGuestOrder = (res) => {
        localStorage.removeItem('guestSignIn');
        margeGuestOrderInAccountFn({
            variables: {
                mergeOrderInput: {
                    order_id: guestSignData.orderId,
                    customer_id: res.data.createCustomer.customer.customer_id,
                },
            },
        }).then(() => {
            notify('You have successfully created a account', 'success');
            simpleRedirect('/customer/login');
        }).catch((error) => {
            const { graphQLErrors } = error;
            const gqlError = graphQLErrors.map((e) => e.message);
            notify(gqlError[0], 'error');
            setTimeout(() => {
                const isToastCloseBtn = document.getElementsByClassName('Toastify__close-button');
                if (isToastCloseBtn.length > 0) isToastCloseBtn[0].click();
                notify('You have successfully created a account', 'success');
                simpleRedirect('/customer/login');
            }, 2000);
        });
    };

    // API calling for login method
    const [createCustomerAccountFn, { loading }] = useMutation(createCustomerAccount.loc.source.body);

    /** subscription webform details */
    const { data: dataWebForm } = useQuery(WEB_FORM_DETAILS.loc.source.body, {
        variables: {
            formId,
        },
    });
    /**
     * ACTon form data submit
     * @param {*} actionFormData
     */
    const actOnDataSubmit = (actionFormData) => {
        const actOnLink = `${dataWebForm.getWebForms.act_on_url}${actionFormData}`;
        const actonIframe = document.getElementById('actonIframe');
        if (actonIframe) actonIframe.remove();
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = actOnLink;
        iframe.id = 'actonIframe';
        iframe.title = 'actonIframe';
        document.body.appendChild(iframe);
        setTimeout(() => {
            const isActonIframe = document.getElementById('actonIframe');
            if (isActonIframe) isActonIframe.remove();
        }, 4000);
    };

    /**
     * submit newsletter action data
     */
    const submitActonNewsletter = (newFormData) => {
        let actionFormData = `?submitForm_${dataWebForm.getWebForms.webform_id}=1&webform_id=${dataWebForm.getWebForms.webform_id}&form_key=${dataWebForm.getWebForms.form_key}&`;
        actionFormData += `email=${encodeURIComponent(decode(newFormData.email))}&`;
        dataWebForm.getWebForms.webformfields.map((item) => {
            if (item.field_type === 'hidden') {
                actionFormData += `${item.field_code}=${encodeURIComponent(item.field_hidden_value)}&`;
            }
            return item;
        });
        actOnDataSubmit(actionFormData);
    };


    const createAccountForm = (event) => {
        event.preventDefault();
        const confirmPassword = document.querySelector("input[name='confirmPassword']").value;
        const accountForm = event.currentTarget;
        let newFormData = {};
        let actionFormData = '?';
        for (let i = 0; i < accountForm.elements.length;) {
            const field = accountForm.elements[i];
            const formField = field.name;
            const fieldActionLabel = formField;
            if (field.type === 'checkbox') {
                newFormData = { ...newFormData, [formField]: field.checked };
                actionFormData += `${fieldActionLabel}=${!!field.checked}&`;
            } else if (formField === 'customer_category') {
                const multipleOptions = field.options;
                const multiplevalue = [];
                for (let p = 0; p < multipleOptions.length;) {
                    const opt = multipleOptions[p];
                    if (opt.selected) {
                        multiplevalue.push(Number(opt.value));
                    }
                    p += 1;
                }
                newFormData = { ...newFormData, [formField]: multiplevalue };
                actionFormData += `${fieldActionLabel}=${encodeURIComponent(multiplevalue)}&`;
            } else if (formField !== '' && formField !== 'confirmPassword') {
                newFormData = { ...newFormData, [formField]: field.value };
                if (formField !== 'password') {
                    actionFormData += `${fieldActionLabel}=${encodeURIComponent(field.value)}&`;
                }
            }
            i += 1;
        }
        let validateMode = false;
        if ((newFormData.password.length <= 7) || (newFormData.password !== confirmPassword)) {
            validateMode = false;
            setValidated(false);
        } else {
            validateMode = true;
            setValidated(true);
        }
        setFormdata(newFormData);

        if (accountForm.checkValidity() && validateMode) {
            // encode password
            const base64Pswd = encode(newFormData.password);
            newFormData.password = base64Pswd;
            // encode email
            const base64Email = encode(newFormData.email);
            newFormData.email = base64Email;
            createCustomerAccountFn({
                variables: {
                    customerInput: { ...newFormData, customer: userIpAdd, identifier: userMdHasKey },
                },
            }).then((data) => {
                actOnDataSubmit(actionFormData);
                if (newFormData.is_subscribed) {
                    submitActonNewsletter(newFormData);
                }
                if (guestSignData) {
                    margeGuestOrder(data);
                } else {
                    notify('You have successfully created a account', 'success');
                    simpleRedirect('/customer/login');
                }
            }).catch((error) => {
                const { graphQLErrors } = error;
                const gqlError = graphQLErrors.map((e) => e.message);
                notify(gqlError[0], 'error');
            });
        }
    };

    /**
    * Customer category list query function
    */
    const { loading: LoadCategory, data: customerCategoryLists } = useQuery(GET_CUSTOMER_CATEGORY.loc.source.body);

    /**
     * Industry list query function
     */
    const { loading: LoadIndustry, data: industryLists } = useQuery(GET_INDUSTRY_LIST.loc.source.body);

    /**
     * on change industry list
     * check if other open other field
    */
    const onChangeIndustry = (e) => {
        const currentValue = e.target.value;
        setIndustry(currentValue);
    };

    /** get email address for invitation user */
    const [getInvitationEmailFn,
        { loading: inivitationLoading, data: invitationEmail },
    ] = useManualQuery(getInvitationEmail.loc.source.body);
    useEffect(() => {
        if (token && isInvite) {
            getInvitationEmailFn({
                variables: { invitationToken: token },
            });
        }
    }, [token]);
    if (
        (loading || inivitationLoading || LoadCategory || LoadIndustry || margeOrderLoading)
    ) return <LoadingIndicator />;
    const industryList = industryLists.pickYourIndustry;
    const customercategoryList = customerCategoryLists.customercategory;
    return (
        <>
            <Head>
                <title>Create New Customer Account</title>
                <meta name="keywords" content="" />
                <meta name="description" content="" />
            </Head>
            <section className="section-padding">
                <Container>
                    {/* header start */}
                    <header className="mb-3 text-center text-md-left">
                        <h1 className="mb-0 text-uppercase">Create New Customer Account</h1>
                    </header>
                    {/* header end */}

                    <Form name="createAccount" validated={validated} onSubmit={createAccountForm} className={`${(windowObj && windowSize.width > 768) ? 'w-50' : ''}`}>
                        <Row>
                            {/* personal inpormation start */}
                            <Col sm={6} md={12}>
                                <h2 className={`mb-3 pb-2 text-uppercase text-center text-md-left ${(windowObj && windowSize.width >= 768) ? 'border-medium border-bottom' : ''}`}>Personal Information</h2>
                                <Form.Row>
                                    {/* first-name */}
                                    <Form.Group as={Col} lg={12}>
                                        <Form.Label>
                                            First Name
                                            <span className="text-danger"> *</span>
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            name="firstname"
                                            onBlur={validationFormField}
                                            onKeyUp={validationFormField}
                                            defaultValue={
                                                (guestSignData ? guestSignData.fName : '')
                                                || (formData ? formData.firstname : '')
                                            }
                                            disabled={guestSignData}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            This is a required field.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* last name */}
                                    <Form.Group as={Col} lg={12}>
                                        <Form.Label>
                                            Last Name
                                            <span className="text-danger"> *</span>
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            required
                                            name="lastname"
                                            onBlur={validationFormField}
                                            onKeyUp={validationFormField}
                                            defaultValue={
                                                (guestSignData ? guestSignData.lName : '')
                                                || (formData ? formData.lastname : '')
                                            }
                                            disabled={guestSignData}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            This is a required field.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* subscribe for newsletter */}
                                    <Form.Group as={Col} lg={12}>
                                        <Form.Check custom type="checkbox" id="newsletter">
                                            <Form.Check.Input
                                                type="checkbox"
                                                name="is_subscribed"
                                                defaultChecked={
                                                    formData ? formData.is_subscribed : false
                                                }
                                            />
                                            <Form.Check.Label>
                                                Subscribe for Newsletter
                                            </Form.Check.Label>
                                            <Form.Text>
                                                <em>
                                                    Yes, I want Accuride
                                                    to send me occasional emails
                                                </em>
                                            </Form.Text>
                                        </Form.Check>
                                    </Form.Group>

                                    {/* customer category */}
                                    <Form.Group as={Col} lg={12}>
                                        <Form.Label>
                                            Customer Category
                                            <span className="text-danger"> *</span>
                                        </Form.Label>
                                        <Form.Control
                                            name="customer_category"
                                            onBlur={validationFormField}
                                            onKeyUp={validationFormField}
                                            as="select"
                                            multiple
                                            required
                                            defaultValue={
                                                formData ? formData.customer_category : []
                                            }
                                        >
                                            {customercategoryList.map((industry) => (
                                                <option
                                                    key={industry.value}
                                                    value={industry.value}
                                                >
                                                    {industry.label}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            This is a required field.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* pick your industry */}
                                    <Form.Group as={Col} lg={12}>
                                        <Form.Label>
                                            Pick Your Industry
                                            <span className="text-danger"> *</span>
                                        </Form.Label>

                                        <Form.Control
                                            name="pick_your_industry"
                                            onBlur={validationFormField}
                                            onKeyUp={validationFormField}
                                            onChange={onChangeIndustry}
                                            as="select"
                                            required
                                            defaultValue={formData ? formData.pick_your_industry : ''}
                                        >
                                            <option value="">Select Your Industry</option>
                                            {industryList.map((industry) => (
                                                <option
                                                    key={industry.value}
                                                    value={industry.value}
                                                >
                                                    {industry.label}
                                                </option>
                                            ))}
                                        </Form.Control>

                                        {selectIndustry === '736' ? (
                                            <Form.Control
                                                className="mt-3"
                                                name="other_industry"
                                                type="text"
                                                required
                                                defaultValue={formData ? formData.other_industry : ''}
                                            />
                                        ) : ''}
                                        <Form.Control.Feedback type="invalid">
                                            This is a required field.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                            </Col>
                            {/* personal inpormation end */}

                            {/* sign-in information start */}
                            <Col sm={6} md={12} className="mt-3 mt-sm-0 mt-md-5">
                                <h2 className={`mb-3 pb-2 text-uppercase text-center text-md-left ${(windowObj && windowSize.width >= 768) ? 'border-medium border-bottom' : ''}`}>Sign-in Information</h2>
                                <Form.Row>
                                    {/* email */}
                                    <Form.Group as={Col} lg={12}>
                                        <Form.Label>
                                            Email
                                            <span className="text-danger"> *</span>
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            required
                                            name="email"
                                            defaultValue={
                                                (invitationEmail ? invitationEmail.emailByInvitation.email : '')
                                                || (guestSignData ? guestSignData.email : '')
                                                || (formData ? decode(formData.email) : '')
                                            }
                                            disabled={guestSignData}
                                            readOnly={invitationEmail}
                                            onBlur={validationFormField}
                                            onKeyUp={validationFormField}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            This is a required field.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* password */}
                                    <Form.Group as={Col} lg={12}>
                                        <Form.Label>
                                            Password
                                            <span className="text-danger"> *</span>
                                        </Form.Label>
                                        <Form.Control
                                            name="password"
                                            type="password"
                                            required
                                            onBlur={validationFormField}
                                            onKeyUp={validationFormField}
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

                                    {/* confirm password */}
                                    <Form.Group as={Col} lg={12}>
                                        <Form.Label>
                                            Confirm Password
                                            <span className="text-danger"> *</span>
                                        </Form.Label>
                                        <Form.Control
                                            name="confirmPassword"
                                            type="password"
                                            required
                                            onBlur={validationFormField}
                                            onKeyUp={validationFormField}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Password and confirm password will be same.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                            </Col>
                            {/* sign-in information end */}

                            <Col sm={12} className="text-right text-md-left">
                                <p className="text-danger pt-2 m-0 pb-4 d-none d-md-block">* Required Fields</p>
                                <Button variant="secondary" type="submit" className={`text-uppercase ${(windowObj && windowSize.width <= 767) ? 'btn-block' : 'btn-lg'}`}>Sign In</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </section>
        </>
    );
};

export default CreateAccount;

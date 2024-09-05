import { Container, Row, Col, Form, Button } from "react-bootstrap";
import React, { useEffect, useState, useContext } from "react";
import useWindowDimensions from "@Hooks/windowDimention";
import { useMutation } from "graphql-hooks";
import { createCompanyRole } from '@Graphql/queries/createCompanyRole.graphql';
import { AuthContext } from "@Contexts/AuthContext";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const AccountSidebar = dynamic(() =>
    import("@Components/Customer/Account/AccountSidebar")
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const AddCompanyRole = () => {
    const router = useRouter();
    const { notify } = useContext(AuthContext);
    const windowSize = useWindowDimensions();
    const [windowObj, updateWindowObj] = useState(false);
    const [createCompanyRoleFn] = useMutation(createCompanyRole.loc.source.body, {
        onSuccess: (data) => {
            if (data) {
                const response = data;
                if (response) {
                    if (response.data) {
                        notify("Company role successfully created..", "success");
                        router.push(`/${router.query.zone_lang}/customer/account/company/companyrole`);
                    }  
                }
            }
        },
    });
    useEffect(() => {
        if (windowSize.width !== 0) updateWindowObj(true);
    }, []);

    // Function for sidebar sticky issue start
    const [isSticky, setIsSticky] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 150) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    // Function for sidebar sticky issue end

    //breadcrumbs
    const pathSegments = router.asPath.split("/").filter((segment) => segment);
    const crumbs = [
        { url: `/${router.query.zone_lang}`, name: "Home" },
        {
            url: `/${router.query.zone_lang}/${pathSegments[1]}`,
            name: pathSegments[1],
            isClickable: false,
        },
        {
            url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`,
            name: pathSegments[2],
        },
        {
            url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[3]}`,
            name: pathSegments[3],
            isClickable: false,
        },
        {
            url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}/${pathSegments[4]}`,
            name: "Add Company Role",
        },
    ];
    const permissions = {
        "Magento_Company::index": "Company",
        "Magento_Company::view": "View",
        "Magento_Company::view_account": "View Account",
        "Magento_Company::edit_account": "Edit Account",
        "Magento_Company::view_address": "View Addreess",
        "Magento_Company::edit_address": "Edit Address",
        "Magento_Company::contacts": "Contacts",
        "Magento_Company::payment_information": "Payment Information",
        "Magento_Company::shipping_information": "Shipping Information",
        "Magento_Company::user_management": "User Management",
        "Magento_Company::roles_view": "Roles View",
        "Magento_Company::roles_edit": "Roles Edit",
        "Magento_Company::users_view": "Users View",
        "Magento_Company::users_edit": "Users Edit",
        "Magento_Company::credit": "Credit",
        "Magento_Company::credit_history": "Credit History",
    };

    // For Update Team Name and Description
    const AddRole = (event) => {
        event.preventDefault();
        const accountForm = event.currentTarget;
        let newFormData = {};
        for (let i = 0; i < accountForm.elements.length; ) {
            const field = accountForm.elements[i];
            const formField = field.name;
            if (formField === "permissions") {
                const multipleOptions = field.options;
                const multiplevalue = [];
                for (let p = 0; p < multipleOptions.length; ) {
                    const opt = multipleOptions[p];
                    if (opt.selected) {
                        multiplevalue.push(opt.value);
                    }
                    p += 1;
                }
                newFormData = { ...newFormData, [formField]: multiplevalue };
            } else if (formField.length > 0)
                newFormData = { ...newFormData, [formField]: field.value };
            i += 1;
        }
        createCompanyRoleFn({
            variables: { getInput: newFormData },
        }).then(({ error }) => {
            if (error) {
                if ((error.graphQLErrors) && (error.graphQLErrors).length > 0) {
                    notify(error.graphQLErrors[0].message, 'error');
                } else {
                    notify('Please check your network connection!', 'error');
                }
            }
        });
    };

    /** on blur and on key each form field check validation */
    const validationFormField = (e) => {
        const targetObj = e.target;
        if (
            targetObj.required &&
            targetObj.value.trim() === "" &&
            (targetObj.type === "text" || targetObj.type === "textarea")
        ) {
            targetObj.value = "";
        }
        if (targetObj.value.trim() === "") {
            targetObj.classList.add("is-invalid");
        } else {
            targetObj.classList.remove("is-invalid");
        }
    };
    return (
        <>
            <BreadCrumbs crumbs={crumbs} />
            <Container className="section-padding pt-0">
                <Row className="align-items-start">
                    {/* sidebar start */}
                    <Col
                        xl
                        className={`acc-account-sidebar pt-xl-5 ${
                            isSticky ? "sticky" : ""
                        }`}
                    >
                        <AccountSidebar />
                    </Col>
                    {/* sidebar end */}
                    {/* content start */}
                    <Col xl className="acc-account-content pt-xl-5">
                        <header className="mb-3">
                            <h1 className="text-uppercase mb-0">
                                Add Company Role
                            </h1>
                        </header>
                        <Form name="createCompanyRole" onSubmit={AddRole}>
                            <Form.Row>
                                <Form.Group as={Col} sm={6}>
                                    <Form.Label>
                                        Role Name
                                        <span className="text-danger"> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        name="name"
                                        type="text"
                                        required
                                        onBlur={validationFormField}
                                        onKeyUp={validationFormField}
                                    />
                                    <Form.Control.Feedback>
                                        Message
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} sm={12}>
                                    <Form.Label>
                                        Role Permission
                                        <span className="text-danger"> *</span>
                                    </Form.Label>
                                    <Form.Control
                                        name="permissions"
                                        required
                                        onBlur={validationFormField}
                                        onKeyUp={validationFormField}
                                        as="select"
                                        multiple
                                    >
                                        <option value="">Select Role</option>
                                        {Object.keys(permissions).map(
                                            (item) => (
                                                <option key={item} value={item}>
                                                    {permissions[item]}
                                                </option>
                                            )
                                        )}
                                    </Form.Control>
                                    <Form.Control.Feedback>
                                        Message
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Button
                                type="submit"
                                variant="primary"
                                className={`text-uppercase ${
                                    windowObj && windowSize.width < 480
                                        ? "btn-block"
                                        : "mt-0"
                                }`}
                            >
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    {/* content end */}
                </Row>
            </Container>
        </>
    );
};

export default AddCompanyRole;

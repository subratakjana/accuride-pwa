import { useEffect, useState, useContext } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import { AuthContext } from "@Contexts/AuthContext";
import { useMutation, useManualQuery } from "graphql-hooks";
import { deleteCustomerAddressQuery } from "@Graphql/queries/deleteCustomerAddressQuery.graphql";
import { getCustomerAddresses } from "@Graphql/queries/getCustomerAddresses.graphql";
import DataTable from "react-data-table-component";
import { LoadingIndicator } from "@Components/Utilities";
import { useRouter } from "next/router";
import useWindowDimensions from "@Hooks/windowDimention";
import { MdMoreVert } from "react-icons/md";

const AdditionalAddress = (props) => {
  const { notify } = useContext(AuthContext);
  const router = useRouter();
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [addressList, setAddressList] = useState(props.addresses);
  /**
   * filter addresslist and remove if default_billing or default_shipping address.
   */
  const newSplitAddressList = addressList.filter(
    (address) => !address.default_billing && !address.default_shipping,
  );

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  // delete modal state declare.
  const [addressModal, setAddressModal] = useState({ modalState: false });
  const handleClose = () => setAddressModal({ modalState: false });

  /**
   * delete address open confirm modal with address modal state handling.
   * @param {*} data
   */
  const deleteAddressModal = (data) => {
    setAddressModal({
      ...setAddressModal,
      modalState: true,
      deleteObj: data,
    });
  };

  const [getCustomerAddressesFn] = useManualQuery(
    getCustomerAddresses.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        setAddressList(data.customer.addresses);
      },
      skipCache: true,
    },
  );

  /**
   * remove addresss query function declare
   */
  const [
    removeAddress,
    { loading: removeAddressLoading, data: removeAddressData },
  ] = useMutation(deleteCustomerAddressQuery.loc.source.body, {
    onSuccess: () => {
      getCustomerAddressesFn();
    },
  });

  /**
   * delete address after confirm from modal box.
   * address delete permanently.
   */
  const deleteAddressConfirm = () => {
    setAddressModal({ ...setAddressModal, modalState: false });
    removeAddress({
      variables: { id: addressModal.deleteObj.id },
    }).then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, "error");
        } else {
          notify("Please check your network connection!", "error");
        }
      }
    });
  };

  /**
   * edit address function.
   * redirect edit addresss page with selected address data.
   * @param {*} editAddress;
   */
  const editAddressPage = (editAddress) => {
    const asPath = `${router.asPath.split("?")[0]}/editaddress`;
    const querySign = "?";
    const pageQuery = `id-${editAddress.id}`;
    router.push(
      {
        pathname: `${router.pathname}/editaddress`,
        query: { editAddressObj: JSON.stringify(editAddress) },
      },
      `${asPath}${querySign}${pageQuery}`,
      { shallow: true },
    );
  };

  // table columns settings or options
  const columns = [
    {
      name: "First Name",
      selector: "firstname",
      sortable: true,
      grow: 1,
    },
    {
      name: "Last Name",
      selector: "lastname",
      sortable: true,
      grow: 1,
      hide: "sm",
    },
    {
      name: "Street Address",
      selector: "street[0]",
      sortable: true,
      grow: 1,
      hide: "md",
    },
    {
      name: "City",
      selector: "city",
      sortable: true,
      grow: 1,
      hide: "md",
    },
    {
      name: "Country",
      selector: "country_code",
      sortable: true,
      grow: 1,
      hide: "sm",
    },
    {
      name: "State",
      selector: "region.region",
      sortable: true,
      grow: 1,
      hide: "md",
    },
    {
      name: "Zip/Postal Code",
      selector: "postcode",
      sortable: true,
      grow: 2,
      hide: "md",
      width: "120px",
    },
    {
      name: "Phone",
      selector: "telephone",
      sortable: true,
      grow: 1,
    },
    {
      name: "Actions",
      selector: "action",
      cell: (data) => (
        <Dropdown as={ButtonGroup} drop="left">
          <Dropdown.Toggle variant="light" className="btn-action">
            <MdMoreVert />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              eventKey="1"
              onClick={() => editAddressPage(data)}
              className="text-uppercase font-weight-500 text-primary py-2"
            >
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="2"
              onClick={() => deleteAddressModal(data)}
              className="text-uppercase font-weight-500 text-primary py-2"
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      allowOverflow: true,
      button: true,
      width: "65px",
    },
  ];

  // table expandable row content
  const ExpanableComponent = ({ data }) => (
    <Row>
      <Col sm={6} md={4} className="mb-2">
        <strong>First Name: </strong>
        <span>{data.firstname}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Last Name: </strong>
        <span>{data.lastname}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Street Address: </strong>
        <span>{data.street[0]}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>City: </strong>
        <span>{data.city}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Country Code: </strong>
        <span>{data.country_code}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>State: </strong>
        <span>{data.region.region}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Zip/Postal Code: </strong>
        <span>{data.postcode}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Phone: </strong>
        <span>{data.telephone}</span>
      </Col>
      <Col
        sm={12}
        className="my-2 d-flex align-items-center justify-content-center"
      >
        <Button
          variant="primary"
          block
          onClick={() => editAddressPage(data)}
          className="text-uppercase mr-2"
        >
          Edit
        </Button>
        <Button
          variant="primary"
          block
          className="text-uppercase ml-2 mt-0"
          onClick={() => deleteAddressModal(data)}
        >
          Delete
        </Button>
      </Col>
    </Row>
  );

  // table paginatyion
  const paginationOptions = {
    rowsPerPageText: "",
    rangeSeparatorText: "of",
  };
  const isExpanded = (row) => row.defaultExpanded;
  newSplitAddressList.map((item) => {
    const newItem = item;
    newItem.defaultExpanded = true;
    return newItem;
  });

  if (removeAddressLoading && !removeAddressData) return <LoadingIndicator />;
  return (
    <>
      {addressList.length > 0 ? (
        <section className="section-padding pb-0">
          <header
            className={`d-flex align-items-start justify-content-between mb-3 pb-xl-2 border-medium ${
              windowObj && windowSize.width > 1024 ? "border-bottom" : ""
            } `}
          >
            <h2 className="text-uppercase mb-0">Additional Address Entries</h2>
          </header>
          <DataTable
            noHeader
            columns={columns}
            data={newSplitAddressList}
            className="acc-custom-datatable"
            pagination={newSplitAddressList.length > 12}
            paginationPerPage={12}
            highlightOnHover
            expandableRows={!(windowObj && windowSize.width > 1024)}
            expandableRowDisabled={(row) => row.disabled}
            expandableRowsComponent={<ExpanableComponent />}
            expandableRowExpanded={isExpanded}
            paginationComponentOptions={paginationOptions}
            paginationRowsPerPageOptions={[12, 24, 48]}
          />

          {/* delete modal start */}
          <Modal show={addressModal.modalState} onHide={handleClose} centered>
            <Modal.Body>
              <span>Are you sure you want to delete this address?</span>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
                className="m-0 ml-2 text-uppercase"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={deleteAddressConfirm}
                className="m-0 ml-2 text-uppercase"
              >
                OK
              </Button>
            </Modal.Footer>
          </Modal>
          {/* delete modal end */}
        </section>
      ) : null}
    </>
  );
};

export default AdditionalAddress;

import AddAddress from '@PageContent/Customer/Account/Address/AddAddress';

const AddAddressPage = () => <AddAddress />;

export const getServerSideProps = async ({ res, req }) => {
    const seodata = {
        seoTitle: 'Add New Address',
        secKeywords: '',
        description: '',
    };

    if (!req.cookies.userAuthToken || req.cookies.userAuthToken === 'null') {
        res.statusCode = 401;
    }
    return {
        props: { seodata },
    };
};

export default AddAddressPage;

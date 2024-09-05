import Address from '@PageContent/Customer/Account/Address';

const AddressPage = () => <Address />;

export const getServerSideProps = async ({ res, req }) => {
    const seodata = {
        seoTitle: 'Address Book',
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

export default AddressPage;

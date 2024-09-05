import EditAddress from '@PageContent/Customer/Account/Address/EditAddress';

const EditAddressPage = () => <EditAddress />;

export const getServerSideProps = async ({ res, req }) => {
    const seodata = {
        seoTitle: 'Edit Address',
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

export default EditAddressPage;

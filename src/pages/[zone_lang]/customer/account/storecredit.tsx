import StoreCredit from '@PageContent/Customer/Account/StoreCredit';

const StoreCreditPage = () => <StoreCredit />;

export const getServerSideProps = async ({ res, req }) => {
    if (!req.cookies.userAuthToken || req.cookies.userAuthToken === 'null') {
        res.statusCode = 401;
    }
    return {
        props: {},
    };
};

export default StoreCreditPage;

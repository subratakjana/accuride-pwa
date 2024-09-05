import Order from '@PageContent/Customer/Account/Order';

const OrderPage = () => <Order />;

export const getServerSideProps = async ({ res, req }) => {
    const seodata = {
        seoTitle: 'My Orders',
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

export default OrderPage;

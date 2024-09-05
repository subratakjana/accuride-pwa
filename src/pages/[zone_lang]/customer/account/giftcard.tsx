import GiftCard from '@PageContent/Customer/Account/GiftCard';

const GiftCardPage = () => <GiftCard />;

export const getServerSideProps = async ({ res, req }) => {
    if (!req.cookies.userAuthToken || req.cookies.userAuthToken === 'null') {
        res.statusCode = 401;
    }
    return {
        props: {},
    };
};

export default GiftCardPage;

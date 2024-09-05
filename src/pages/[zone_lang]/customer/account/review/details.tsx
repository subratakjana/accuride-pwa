import ReviewDetail from '@PageContent/Customer/Account/Review/ReviewDetail';

const ReviewDetailPage = () => <ReviewDetail />;

export const getServerSideProps = async ({ res, req }) => {
    if (!req.cookies.userAuthToken || req.cookies.userAuthToken === 'null') {
        res.statusCode = 401;
    }
    return {
        props: {},
    };
};

export default ReviewDetailPage;

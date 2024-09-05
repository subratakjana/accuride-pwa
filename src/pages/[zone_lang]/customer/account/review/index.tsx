import Review from '@PageContent/Customer/Account/Review';

const ReviewPage = () => <Review />;
export const getServerSideProps = async ({ res, req }) => {
    if (!req.cookies.userAuthToken || req.cookies.userAuthToken === 'null') {
        res.statusCode = 401;
    }
    return {
        props: {},
    };
};

export default ReviewPage;

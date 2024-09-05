import Card from '@PageContent/Customer/Account/Card';

const CardPage = () => <Card />;

export const getServerSideProps = async ({ res, req }) => {
    const seodata = {
        seoTitle: 'Customer Saved Cards',
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

export default CardPage;

import AddCard from '@PageContent/Customer/Account/Card/AddCard';

const AddCardPage = () => <AddCard />;

export const getServerSideProps = async ({ res, req }) => {
    const seodata = {
        seoTitle: 'Add New Card',
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

export default AddCardPage;

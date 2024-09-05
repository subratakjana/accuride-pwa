import EditCard from '@PageContent/Customer/Account/Card/EditCard';

const EditCardPage = () => <EditCard />;

export const getServerSideProps = async ({ res, req }) => {
    const seodata = {
        seoTitle: 'Edit Card',
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

export default EditCardPage;

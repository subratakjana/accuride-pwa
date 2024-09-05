import Edit from '@PageContent/Customer/Account/Edit';

const EditPage = () => <Edit />;

export const getServerSideProps = async ({ res, req }) => {
    const seodata = {
        seoTitle: 'Account Information',
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
export default EditPage;

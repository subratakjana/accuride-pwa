import AddCompanyRole from '@PageContent/Customer/Account/Company/AddCompanyRole';

const AddCompanyRolePage = () => <AddCompanyRole />;

export const getServerSideProps = async ({ res, req }) => {
    const seodata = {
        seoTitle: 'Add Company Role',
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

export default AddCompanyRolePage;

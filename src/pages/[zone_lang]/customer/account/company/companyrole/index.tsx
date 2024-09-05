import CompanyRole from '@PageContent/Customer/Account/Company/CompanyRole';

const CompanyRolePage = () => <CompanyRole />;

export const getServerSideProps = async ({ res, req }) => {
    const seodata = {
        seoTitle: 'Company Role',
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

export default CompanyRolePage;

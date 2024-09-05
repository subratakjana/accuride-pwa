import CompanyUsers from '@PageContent/Customer/Account/Company/users';

const CompanyUsersPage = () => <CompanyUsers />;

export const getServerSideProps = async ({ res, req }) => {
    const seodata = {
        seoTitle: 'Company Users',
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

export default CompanyUsersPage;

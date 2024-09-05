import CompanyProfile from '@PageContent/Customer/Account/Company/profile';

const CompanyProfilePage = () => <CompanyProfile />;

export const getServerSideProps = async ({ res, req }) => {
    const seodata = {
        seoTitle: 'Company Profile',
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

export default CompanyProfilePage;

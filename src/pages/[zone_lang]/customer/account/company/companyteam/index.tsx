import CompanyTeam from '@PageContent/Customer/Account/Company/CompanyTeam';

const CompanyTeamPage = () => <CompanyTeam />;

export const getServerSideProps = async ({ res, req }) => {
    const seodata = {
        seoTitle: 'Company Team',
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

export default CompanyTeamPage;

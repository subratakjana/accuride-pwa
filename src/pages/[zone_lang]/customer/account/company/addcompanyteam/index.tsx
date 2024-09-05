import AddCompanyTeam from '@PageContent/Customer/Account/Company/AddCompanyTeam';

const AddCompanyTeamPage = () => <AddCompanyTeam />;

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

export default AddCompanyTeamPage;

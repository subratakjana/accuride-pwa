import CompanyPasswordPage from '@PageContent/Customer/Company/Password';

const CompanyPassword = () => <CompanyPasswordPage />;

export const getServerSideProps = async () => {
    const seodata = {
        seoTitle: 'Set Your Password',
        secKeywords: '',
        description: '',
    };
    return {
        props: { seodata },
    };
};

export default CompanyPassword;

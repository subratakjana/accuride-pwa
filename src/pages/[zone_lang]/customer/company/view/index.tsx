import Company from '@PageContent/Customer/Company';

const CompanyPage = () => <Company />;

export const getServerSideProps = async () => {
    const seodata = {
        seoTitle: 'Create New Company',
        secKeywords: '',
        description: '',
    };
    return {
        props: { seodata },
    };
};

export default CompanyPage;

import Account from '@PageContent/Customer/Account';

const AccountPage = () => <Account />;

export const getServerSideProps = async ({ res, req }) => {
    const seodata = {
        seoTitle: 'My Account',
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

export default AccountPage;

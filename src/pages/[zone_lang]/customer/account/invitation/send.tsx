import Send from '@PageContent/Customer/Account/Invitation/Send';

const SendPage = () => <Send />;

export const getServerSideProps = async ({ res, req }) => {
    const seodata = {
        seoTitle: 'Send Invitations',
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

export default SendPage;

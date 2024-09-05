import Invitation from '@PageContent/Customer/Account/Invitation';

const InvitationPage = () => <Invitation />;

export const getServerSideProps = async ({ res, req }) => {
    const seodata = {
        seoTitle: 'My Invitations',
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

export default InvitationPage;

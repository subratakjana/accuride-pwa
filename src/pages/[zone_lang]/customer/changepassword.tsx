import ChangePassword from '@PageContent/Customer/ChangePassword';

const ChangePasswordPage = () => <ChangePassword />;

export const getServerSideProps = async () => {
    const seodata = {
        seoTitle: 'Change Your Password',
        secKeywords: '',
        description: '',
    };
    return {
        props: { seodata },
    };
};

export default ChangePasswordPage;

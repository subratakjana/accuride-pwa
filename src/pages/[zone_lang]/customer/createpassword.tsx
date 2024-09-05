import CreatePassword from '@PageContent/Customer/CreatePassword';

const CreatePasswordPage = () => <CreatePassword />;

export const getServerSideProps = async () => {
    const seodata = {
        seoTitle: 'Set a New Password',
        secKeywords: '',
        description: '',
    };
    return {
        props: { seodata },
    };
};

export default CreatePasswordPage;

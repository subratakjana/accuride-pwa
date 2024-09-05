import Logout from '@PageContent/Customer/Logout';
import { ProductCompareProvider } from '@Contexts/ProductCompareContext';

const LogoutPage = () => (
    <ProductCompareProvider>
        <Logout />
    </ProductCompareProvider>
);

export const getServerSideProps = async () => {
    const seodata = {
        seoTitle: 'Customer Logout',
        secKeywords: '',
        description: '',
    };
    return {
        props: { seodata },
    };
};

export default LogoutPage;

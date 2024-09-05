import GuestForm from '@PageContent/sales/saleGuestForm';

const GuestFormPage = () => <GuestForm />;

export const getServerSideProps = async () => {
    const seodata = {
        seoTitle: 'Orders and Returns',
        secKeywords: 'Magento, Varien, E-commerce',
        description: '',
    };
    return {
        props: { seodata },
    };
};

export default GuestFormPage;

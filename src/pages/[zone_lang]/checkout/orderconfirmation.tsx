import dynamic from 'next/dynamic';
const OrderConfirmation = dynamic(import('@PageContent/Checkout/OrderConfirmation'));

const OrderConfirmationPage = () => <OrderConfirmation />;

export const getServerSideProps = async () => {
    const seodata = {
        seoTitle: 'Success Page',
        secKeywords: '',
        description: '',
    };

    return {
        props: { seodata },
    };
};

export default OrderConfirmationPage;

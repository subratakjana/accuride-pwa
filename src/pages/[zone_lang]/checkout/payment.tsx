import dynamic from 'next/dynamic';

const Payment = dynamic(import('@PageContent/Checkout/Payment'));

const PaymentPage = () => <Payment />;

export const getServerSideProps = async () => {
    const seodata = {
        seoTitle: 'Checkout',
        secKeywords: '',
        description: '',
    };

    return {
        props: { seodata },
    };
};

export default PaymentPage;

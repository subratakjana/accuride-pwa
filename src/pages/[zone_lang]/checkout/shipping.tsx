import dynamic from 'next/dynamic';

const Shipping = dynamic(() => import('@PageContent/Checkout/Shipping'));
const ShippingPage = () => <Shipping />;

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

export default ShippingPage;

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const PdpLoadingSkeleton = dynamic(() => import('@Components/ProductDetail/PDPSkeletonLoading'));
const ProductDetail = dynamic(() => import('@PageContent/ProductDetail'));
const Product = ({ getZoneLang, slug, productDetails }) => {
    const router = useRouter();
    let slugArr = slug.split('-');
    slugArr = (slugArr && slugArr.length > 4) ? slugArr.filter((item, idx) => idx < 4) : slugArr;
    const searchKey = slugArr.join(', ');

    useEffect(() => {
        if (productDetails && (productDetails.products.items).length === 0) {
            router.push(`/${router.query.zone_lang}/search?keyword=${searchKey}`);
        }
    }, [productDetails]);
    if (!productDetails) return <PdpLoadingSkeleton />
    if (productDetails && productDetails.products.items.length > 0) {
        return <ProductDetail data={productDetails} />;
    }
    return null;
};

export default Product;

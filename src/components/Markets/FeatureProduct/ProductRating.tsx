import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import Rating from 'react-rating';
import useWindowDimensions from '@Hooks/windowDimention';

const ProductRating = (props) => {
    const windowSize = useWindowDimensions();
    const [windowObj, updateWindowObj] = useState(false);
    const { productRatings } = props;
    useEffect(() => {
        if (windowSize.width !== 0) updateWindowObj(true);
    }, [windowObj]);

    const EmptyStar = () => (<ReactSVG src="/assets/images/icons/star.svg" className="rating-icon rating-empty" />);
    const FullStar = () => (<ReactSVG src="/assets/images/icons/star.svg" className="rating-icon rating-full" />);
    return (
        <>
            <Rating
                readonly
                className="rating d-block"
                fractions={2}
                initialRating={(productRatings.ratingSummary)
                    ? Math.round(productRatings.ratingSummary / 20) : 0}
                emptySymbol={<EmptyStar />}
                fullSymbol={<FullStar />}
            />
            {(productRatings.reviewCount) ? `${productRatings.reviewCount} REVIEW` : '0 REVIEW'}
        </>
    );
};

export default ProductRating;

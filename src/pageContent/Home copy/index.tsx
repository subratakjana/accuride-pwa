import React, {  memo } from 'react';
import dynamic from 'next/dynamic';


const IconListingSection = dynamic(() => import('@Components/IconListingSection'));
const ContactBarSection = dynamic(() => import('@Components/ContactBar'));
const TitleImageButtonCardsSection = dynamic(() => import('@Components/TitleImageButtonCards'));
const FeaturedProductCardsSection = dynamic(() => import('@Components/FeaturedProductCards'));
const HomeBanner = dynamic(() => import('./HomeBanner'));

const HomeV3 = ({ homeNew }) => {

    return (
        <>
            {(homeNew) ? homeNew.map((rows) => (
                <div className="acc-home-v3" key={`acc_${rows.id}`}>
                    {/* banner section start */}
                    <HomeBanner data={ rows.homeBanners} />
                    {/* banner section end */}

                    {/* icon list section start */}
                    <IconListingSection iconList={rows.iconLists} sectionHeading={rows.section2Heading} pageName="home" />
                    {/* icon list section end */}

                    {/* contact bar section start */}
                    <ContactBarSection content={rows.contactBar} />
                    {/* contact bar section end */}

                    {/* Important Link Cards section start */}
                    <TitleImageButtonCardsSection content={rows.titleImageButtonCards} />
                    {/* Important Link Cards section end */}

                    {/* Featured Product Cards section start */}
                    <FeaturedProductCardsSection sectionHeading={rows.featuredProductHeading} featuredProducts={rows.featuredProductCards} />
                    {/* Featured Product Cards section end */}
                </div>
            )) : ''}
        </>
    );
};

export default memo(HomeV3);

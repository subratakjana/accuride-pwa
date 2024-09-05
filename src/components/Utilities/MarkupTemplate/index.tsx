import { useState } from "react";
import { useRouter } from "next/router";

const MarkupTemplate = (props) => {
  const router = useRouter();
  const { seoData } = props;
  const [currentUrl] = useState(`${process.env.NEXT_PUBLIC_BASE_PATH}${router?.asPath.split('?')[0]}`);
  return (
    <div className="d-none" itemScope itemType={`${seoData?.['@context'] || ''}/${seoData?.['@type'] || ''}`}>
      {seoData?.['name'] && <span itemProp="name">{seoData?.['name']}</span>}
      {seoData?.['url'] && <link itemProp="url" href={seoData?.['url']} />}
      {seoData?.['logo'] && <img itemProp="logo" src={seoData?.['logo']} alt="Accuride Logo" />}
      {seoData?.['image'] && <img itemProp="image" src={seoData?.['image']} alt={seoData?.['name']} />}
      {seoData?.['headline'] && <h1 itemProp="headline">{seoData?.['headline']}</h1>}
      {seoData?.['description'] && <p itemProp="description">{seoData?.['description']}</p>}
      {seoData?.['datePublished'] && <meta itemProp="datePublished" content={seoData?.['datePublished']} />}
      {seoData?.['dateModified'] && <meta itemProp="dateModified" content={seoData?.['dateModified']} />}
      {seoData?.['sku'] && <meta itemProp="sku" content={seoData?.['sku']} />}
      {seoData?.['itemListOrder'] && <meta itemProp="itemListOrder" content={seoData?.['itemListOrder']} />}
      {seoData?.['numberOfItems'] && <meta itemProp="numberOfItems" content={seoData?.['numberOfItems']} />}

      {seoData?.['mainEntityOfPage'] &&
        <div itemProp="mainEntityOfPage" itemScope itemType={`${seoData?.['@context'] || ''}/${seoData?.['mainEntityOfPage']?.['@type'] || ''}`}>
          <meta itemProp="url" content={currentUrl} />
        </div>
      }

      {seoData?.['address'] &&
        <>
          <div itemProp="address" itemScope itemType={`${seoData?.['@context'] || ''}/${seoData?.['address']?.['@type'] || ''}`}>
            <span itemProp="streetAddress">{seoData?.['address']?.['streetAddress']}</span>
            <span itemProp="addressLocality">{seoData?.['address']?.['addressLocality']}</span>
            <span itemProp="addressRegion">{seoData?.['address']?.['addressRegion']}</span>
            <span itemProp="postalCode">{seoData?.['address']?.['postalCode']}</span>
            <span itemProp="addressCountry" itemScope itemType="https://schema.org/Country">
              <span itemProp="name">{seoData?.['address']?.['addressCountry']}</span>
            </span>
          </div>
          <div>
            <span itemProp="telephone">{seoData?.['telephone']}</span>
          </div>
        </>
      }

      {seoData?.['itemListElement']?.length > 0 ?
        seoData?.['itemListElement'].map((item) => (
          <div key={`plp-list-${Math.random()}`} itemProp="itemListElement" itemScope itemType={`${seoData?.['@context'] || ''}/ListItem`}>
            <span>
              <meta itemProp="position" content={item?.['position']} />
              <meta itemProp="url" content={item?.['url']} />
              <meta itemProp="name" content={item?.['name']} />
              {item?.['image'] &&
                <div itemProp="image" itemScope itemType={`${item?.['image']?.['@context'] || ''}/${item?.['image']?.['@type'] || ''}`}>
                  <img itemProp="contentUrl" src={item?.['image']?.['contentUrl']} alt={item?.['name']} />
                  <meta itemProp="description" content={item?.['image']?.['description']} />
                  <meta itemProp="width" content={item?.['image']?.['width']} />
                  <meta itemProp="height" content={item?.['image']?.['height']} />
                </div>
              }
            </span>
          </div>
        )) : null
      }

      {seoData?.['offers'] &&
        <div itemProp="offers" itemScope itemType={`${seoData?.['@context'] || ''}/${seoData?.['offers']?.['@type'] || ''}`}>
          <meta itemProp="lowPrice" content={seoData?.['offers']?.['lowPrice']} />
          <meta itemProp="highPrice" content={seoData?.['offers']?.['highPrice']} />
          <meta itemProp="priceCurrency" content={seoData?.['offers']?.['priceCurrency']} />
        </div>
      }

      {seoData?.['aggregateRating'] &&
        <div itemProp="aggregateRating" itemScope itemType={`${seoData?.['@context'] || ''}/${seoData?.['aggregateRating']?.['@type'] || ''}`}>
          <meta itemProp="ratingValue" content={seoData?.['aggregateRating']?.['ratingValue']} />
          <meta itemProp="reviewCount" content={seoData?.['aggregateRating']?.['reviewCount']} />
        </div>
      }

      {seoData?.['publisher'] &&
        <div itemProp="publisher" itemScope itemType={`${seoData?.['@context'] || ''}/${seoData?.['publisher']?.['@type'] || ''}`} />
      }

      {seoData?.['author'] &&
        <div itemProp="author" itemScope itemType={`${seoData?.['@context'] || ''}/${seoData?.['author']?.['@type'] || ''}`}>
          <meta itemProp="name" content={seoData?.['author']?.['name']} />
        </div>
      }

      {seoData?.['contactPoint'] &&
        <div itemProp="contactPoint" itemScope itemType={`${seoData?.['@context'] || ''}/${seoData?.['contactPoint']?.[0]?.['@type'] || ''}`}>
          <span itemProp="contactType">{seoData?.['contactPoint']?.[0]?.['contactType']}</span>
          <span itemProp="telephone">{seoData?.['contactPoint']?.[0]?.['telephone']}</span>
        </div>
      }
      {seoData?.['sameAs'] &&
        <div>
          <a itemProp="sameAs" href={seoData?.['sameAs']?.[0]}>Facebook</a>
          <a itemProp="sameAs" href={seoData?.['sameAs']?.[1]}>Twitter</a>
          <a itemProp="sameAs" href={seoData?.['sameAs']?.[2]}>Instagram</a>
        </div>
      }
      {seoData?.['brand'] &&
        <div itemProp="brand" itemScope itemType={`${seoData?.['@context'] || ''}/${seoData?.['brand']?.['@type'] || ''}`}>
          <meta itemProp="name" content={seoData?.['brand']?.['name']} />
        </div>
      }
    </div>
  );
};
export default MarkupTemplate;
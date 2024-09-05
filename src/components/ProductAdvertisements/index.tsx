import { useQuery } from "graphql-hooks";
import PRODUCT_ADVERTISEMENT from "@Graphql/queriesgraphcms/productAdvertisement.graphql";
import { useRouter } from "next/router";
import { I18nLink } from "@Components/Utilities";
import dynamic from "next/dynamic";
import NextImage from "next/legacy/image";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const ProductAdvertisements = () => {
  const router = useRouter();
  const lastSlug =
    router.query.magento_route[router.query.magento_route.length - 1];
  const category = lastSlug.replace(/-/g, " ");
  const { loading: advertiseLoading, data: advertisement } = useQuery(
    PRODUCT_ADVERTISEMENT.loc.source.body,
    {
      operationName: { clientName: "graphCms" },
      variables: {
        category,
      },
    },
  );
  if (
    (advertiseLoading && router.query.magento_route.length === 0) ||
    !advertisement
  )
    return null;
  if (advertisement && !advertisement.productAdvertisements.length > 0)
    return null;
  const advertisements = advertisement.productAdvertisements;
  return (
    <>
      <section className="acc-adverticepemt mt-xl-5 mb-5">
        {advertisements.map((add) => (
          <div className="shadow-1 acc-adBox mb-3" key={add.id}>
            <I18nLink href={add.productLink} isMagentoRoute={0}>
              <a className="p-3 d-block">
                <HTMLContent className="m-0" content={add.description.html} />
                <NextImage
                  src={`${add.productImage.url}`}
                  alt=""
                  layout="intrinsic"
                  objectFit="contain"
                  objectPosition="center"
                  width={234}
                  height={214}
                  className="mx-xl-auto"
                />
              </a>
            </I18nLink>
          </div>
        ))}
      </section>
    </>
  );
};

export default ProductAdvertisements;

import { useState } from "react";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styles from "./Distributer.module.scss";

const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const Banner = dynamic(() => import("@Components/Markets/Banner"));
const FilterResult = dynamic(
  () => import("@Components/DistributorFilter/FilterResult"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const DistributersSearch = ({ distributerList }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  //breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  const crumbs = [
    { url: `/${router.query.zone_lang}`, name: "Home" },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: "Distributors",
      isClickable: false,
    },
  ];

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {distributerList
        ? distributerList.map((rows) => (
            <div
              key={`${rows.id}_distributer`}
              className={styles["acc-distributors-page"]}
            >
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
                customStyle="acc-small-banner"
              />
              <Introduction dataobj={rows.pages} winSize={windowSize} />
              <FilterResult />
            </div>
          ))
        : ""}
    </>
  );
};

export default DistributersSearch;

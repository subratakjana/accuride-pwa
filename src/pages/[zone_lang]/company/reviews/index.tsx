import dynamic from "next/dynamic";
import YotpoScript from "@Components/Utilities/YotpoScript";

const AllReviews = dynamic(() => import("@Components/Company/Reviews"));
const ReviewsPage = () => <AllReviews />;

export const getServerSideProps = async ({ params }) => {
  const seodata = {
    seoTitle: "Accuride Reviews",
    seoDescription: "",
    secKeywords: "",
    yotpoScript: YotpoScript(params.zone_lang, true),
  };

  return {
    props: { seodata },
  };
};

export default ReviewsPage;

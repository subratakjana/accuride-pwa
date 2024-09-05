import Search from "@PageContent/Search";
import YotpoScript from "@Components/Utilities/YotpoScript";
const SearchPage = () => <Search />;

export const getServerSideProps = async ({ query }) => {
  const urlSearchKeyword = query && query.keyword ? query.keyword : "";
  let seodata = null;

  if (urlSearchKeyword) {
    seodata = {
      seoTitle: `Accuride - Search Results for ${urlSearchKeyword}`,
      secKeywords: "",
      description: "",
      content: "NOINDEX",
      yotpoScript: YotpoScript(query.zone_lang, true),
    };
  }
  return {
    props: { seodata },
  };
};

export default SearchPage;

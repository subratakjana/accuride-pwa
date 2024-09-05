import { useContext } from "react";
import { useQuery } from "graphql-hooks";
import { Col } from "react-bootstrap";
import { AuthContext } from "@Contexts/AuthContext";
import { allTagsContent } from "@Graphql/queriesgraphcms/allTags.graphql";
import { LoadingIndicator, I18nLink } from "@Components/Utilities";

const AllBlogTags = () => {
  let AllTagsInBlogs = [];
  const { notify } = useContext(AuthContext);

  const {
    loading: blogtagsLoading,
    error,
    data,
  } = useQuery(allTagsContent.loc.source.body, {
    operationName: { clientName: "graphCms" },
  });

  if (blogtagsLoading) return <LoadingIndicator />;
  if (data) {
    AllTagsInBlogs = data.allTagsInBlogs;
  }
  if (error) {
    notify(error.message, "error");
    return <h2>No data found</h2>;
  }

  return (
    <Col lg={6}>
      <article className="acc-blog-tag pt-3 pt-lg-0">
        <h4 className="text-white m-0 pb-3">Tags</h4>
        <ul className="d-flex d-inline-flex flex-wrap">
          {AllTagsInBlogs.map((eachTag) => (
            <li
              key={`blogTag_${eachTag.id}`}
              className="border border-medium p-1 px-2 m-1 text-white font-size-sm"
            >
              <I18nLink href={eachTag.tagLink} className="text-white">
                <a>{eachTag.tagTitle}</a>
              </I18nLink>
            </li>
          ))}
        </ul>
      </article>
    </Col>
  );
};

export default AllBlogTags;

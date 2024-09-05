import { useContext } from "react";
import { useQuery } from "graphql-hooks";
import { Container, Row, Col } from "react-bootstrap";
import { LoadingIndicator } from "@Components/Utilities";
import { AuthContext } from "@Contexts/AuthContext";
import { allRecentPostContent } from "@Graphql/queriesgraphcms/allRecentPost.graphql";
import dynamic from "next/dynamic";
import NextImage from "next/legacy/image";

const AllBlogTags = dynamic(import("@Components/Blogs/AllBlogTags"));

const RecentPost = () => {
  let allRecentPosts = [];
  const { notify } = useContext(AuthContext);

  const {
    loading: allRecentPostsLoading,
    error,
    data,
  } = useQuery(allRecentPostContent.loc.source.body, {
    operationName: { clientName: "graphCms" },
  });

  if (allRecentPostsLoading) return <LoadingIndicator />;
  if (data) {
    allRecentPosts = data.blogs;
  }
  if (error) {
    notify(error.message, "error");
    return <h2>No data found</h2>;
  }

  return (
    <section className="bg-dark section-padding d-none">
      <Container>
        <Row>
          <Col lg={6}>
            <article className="border-medium border">
              <h4 className="text-white m-0 p-3">Recent Blog</h4>
              {allRecentPosts
                ? allRecentPosts.map((blog, IndexCount) => (
                    <div
                      key={`post_${blog.id}`}
                      className={`d-flex align-items-center pb-3 px-3 mb-3 ${
                        IndexCount === allRecentPosts.length - 1
                          ? ""
                          : "border-medium border-bottom"
                      }`}
                    >
                      <NextImage
                        src={blog.postImage.url}
                        alt={blog.postTitle}
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={60}
                        height={32}
                      />
                      {blog.postTitle ? (
                        <p className="text-white m-0 pl-3">{blog.postTitle}</p>
                      ) : null}
                    </div>
                  ))
                : ""}
            </article>
          </Col>
          <AllBlogTags />
        </Row>
      </Container>
    </section>
  );
};

export default RecentPost;

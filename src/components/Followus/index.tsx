import { useContext } from "react";
import { useQuery } from "graphql-hooks";
import { LoadingIndicator } from "@Components/Utilities";
import { AuthContext } from "@Contexts/AuthContext";
import { followus } from "@Graphql/queriesgraphcms/followUS.graphql";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const FollowUS = () => {
  let followusicons = [];
  const { notify } = useContext(AuthContext);
  const {
    loading: followUsLoading,
    error,
    data,
  } = useQuery(followus.loc.source.body, {
    variables: { last: 10 },
    operationName: { clientName: "graphCms" },
  });

  if (followUsLoading) return <LoadingIndicator />;
  if (data) {
    followusicons = data.follows;
  }
  if (error) {
    notify(error.message, "error");
    return <h2>No data found</h2>;
  }

  return (
    <article className="pb-5">
      <h4> Follow Accuride </h4>
      <ul className="acc-blog-details-social">
        {followusicons
          ? followusicons.map((followusicon) => (
              <li className="d-inline-block" key={followusicon.id}>
                {/* Call Related post image here */}
                {followusicon.socialMediaTitle === "Facebook" ? (
                  <a
                    href={followusicon.socialMediaLink}
                    target="BLANK"
                    rel="noopener noreferrer"
                    aria-label="followus"
                    className="d-block"
                  >
                    <FaFacebookF />
                  </a>
                ) : (
                  ""
                )}
                {followusicon.socialMediaTitle === "LinkedIn" ? (
                  <a
                    href={followusicon.socialMediaLink}
                    target="BLANK"
                    rel="noopener noreferrer"
                    aria-label="followus"
                    className="d-block"
                  >
                    <FaLinkedin />
                  </a>
                ) : (
                  ""
                )}
                {followusicon.socialMediaTitle === "Youtube" ? (
                  <a
                    href={followusicon.socialMediaLink}
                    target="BLANK"
                    rel="noopener noreferrer"
                    aria-label="followus"
                    className="d-block"
                  >
                    <FaYoutube />
                  </a>
                ) : (
                  ""
                )}
                {followusicon.socialMediaTitle === "Twitter" ? (
                  <a
                    href={followusicon.socialMediaLink}
                    target="BLANK"
                    rel="noopener noreferrer"
                    aria-label="followus"
                    className="d-block"
                  >
                    <FaTwitter />
                  </a>
                ) : (
                  ""
                )}
                {followusicon.socialMediaTitle === "Instagram" ? (
                  <a
                    href={followusicon.socialMediaLink}
                    target="BLANK"
                    rel="noopener noreferrer"
                    aria-label="followus"
                    className="d-block"
                  >
                    <FaInstagram />
                  </a>
                ) : (
                  ""
                )}
              </li>
            ))
          : ""}
      </ul>
    </article>
  );
};

export default FollowUS;

import React from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";

const Breadcrumbs = () => {
  const router = useRouter();
  const keyword = router.query.keyword;
  const removeQueryParameters = (url) => {
    try {
      const urlParts = url.split('?');
      const actualUrl = urlParts[0];
      const returnUrl = actualUrl.split('#');
      return returnUrl[0];
    } catch (error) {
      return url;
    }
  };
  const getBreakCrumbsLinks = (pathNames, index, to, link) => {
    const removeLinkArr = ['customer', 'search', 'blog'];
    if(pathNames.length == (index + 1) || removeLinkArr.find((element) => element === link.toLowerCase())) {
      return link;
    } else {
      return <Link 
              href={`/en-us${to}`}
              className={pathNames.length > (index + 1) && "text-underline"}
            >
              {link}
            </Link>
    }
  
  }
  let location = router.asPath;
  location = location.replace('/en-us','');
  location = location.replace('/en-ca','');
  location = location.replace('/undefined','');
  location = removeQueryParameters(location);

  const getPathNames = location.split('/').filter((x) => x);
  const pathnames = (location.includes('/search/')) ? [...getPathNames, keyword] : getPathNames;

  return (
    pathnames && pathnames.length >= 1 &&
    <div className="container py-2 bc-wrapper">
      <nav className="font-size-sm">
        <ul className="d-flex flex-row flex-wrap text-capitalize">
          {pathnames.length >= 1 &&
            <>
              <li className="breadcrumb-item">
                <Link
                  href="/en-us"
                  className={pathnames.length >= 1 && "text-underline"}
                >
                  Home
                </Link>
              </li>
              <span className="text-primary px-1">{'>'}</span>
            </>
          }
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            
            return (
              <>
                <li key={to} className="breadcrumb-item">
                  {getBreakCrumbsLinks(pathnames, index, to, value.charAt(0).toUpperCase() + value.slice(1))}
                </li>
                {pathnames && pathnames.length > (index + 1) &&
                <span className="text-primary px-1">{'>'}</span>
                }
              </>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Breadcrumbs;

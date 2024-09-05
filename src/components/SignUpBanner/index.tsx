import HTMLContent from '@Components/Utilities/HTMLContent';
import gqlFetch from '@Graphql/Utilities/gqlFetch';
import { SignupBannersQuery } from '@Graphql/queriesgraphcms/signUpBanner.graphql';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';

const SignUpBanner = () => {
  const [signUpBanner, setSignUpBanner] = useState(true);
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await gqlFetch(SignupBannersQuery, { last: 0 }, 'CMS');
      const getResponse = response.data.signupBanners[0];
      console.log(getResponse, 'check');
      if (getResponse) {
        setData(getResponse);
        setSignUpBanner(getResponse.enable);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (signUpBanner) {
      document.body.classList.add('acc-has-sticky-banner');
    } else {
      document.body.classList.remove('acc-has-sticky-banner');
    }

    return () => {
      document.body.classList.remove('acc-has-sticky-banner');
    };
  }, [signUpBanner]);

  const closeBanner = () => {
    setSignUpBanner(false);
  };
  const gotoLoginPage = () => {
    router.push(
      `/${router.query.zone_lang}/customer/login?utm_source=banner&amp;utm_campaign=free%20shipping`
    );
  };

  return (
    <>
      {signUpBanner && (
        <div className="acc-header-signup-banner position-sticky w-100">
          {data && (
            <>
              <div className="acc-header-signup-banner-content">
                {router.asPath.includes('/en-us/checkout') ? (
                  <HTMLContent content={data.checkoutMessage.html} />
                ) : (
                  <p>
                    <a href="#" onClick={gotoLoginPage}>
                      Sign Up
                    </a>
                    &nbsp;and receive free shipping on orders above $150
                  </p>
                )}
              </div>
              <span
                className="acc-signup-banner-close"
                onClick={() => closeBanner()}
              >
                <ReactSVG
                  src={`/assets/images/icons/close.svg`}
                  className="acc-signup-banner-close-icon"
                />
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default memo(SignUpBanner);

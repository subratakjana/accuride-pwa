import React from "react";
import { Debounce } from "./debounceWrpperScript";

const ThirdPartyScript = () => {
  // const ADWScript = `window.dataLayer = window.dataLayer || [];
  //     function gtag () {dataLayer.push (arguments );}
  //     gtag ('js' , new Date () );
  //     gtag ('config', 'AW-879294281');`;

  return (
    <>
      {/* <ScriptTag type="text/javascript" src="https://cdn.callrail.com/companies/653278938/6bee319c95152999a848/12/swap.js" defer /> */}
      {/* <ScriptTag type="text/javascript" src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" /> */}
      {/* <ScriptTag type="text/javascript" src="https://www.googletagmanager.com/gtag/js?id=AW-879294281" /> */}
      {/* <ScriptTag type="text/javascript" rel="preconnect" src="/static/cookieconsent.min.js?ver=1.19" defer /> */}
      {/* <ScriptTag type="text/javascript" rel="preconnect" src="/static/debounce-wrapper.js" defer /> */}
      {/* <ScriptTag dangerouslySetInnerHTML={{ __html: ADWScript }} /> */}
      {/* {router.query.zone_lang === 'en-ca'
                ? <ScriptTag type="text/javascript" src={`https://cdn-widgetsrepository.yotpo.com/v1/loader/${process.env.NEXT_PUBLIC_YOTPO_CA_APP_KEY}`} />
                : <ScriptTag type="text/javascript" src={`https://cdn-widgetsrepository.yotpo.com/v1/loader/${process.env.NEXT_PUBLIC_YOTPO_NA_APP_KEY}`} />} */}

      <Debounce />
    </>
  );
};
export default ThirdPartyScript;

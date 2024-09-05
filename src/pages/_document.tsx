import { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script';

export default function Document(props) {
  return (
    <Html lang={props.zone ?? "en-us"}>
      <Head>
        <meta charSet="utf-8" />
        {(process.env.NEXT_PUBLIC_GRAPHQL_BASE_ENDPOINT === "https://stage.accuride.com") && <meta name="robots" content="NOINDEX,NOFOLLOW" />}
        <meta name="theme-color" content="#00529c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Accuride" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {/** Ahrefs */}
        <meta
          name="ahrefs-site-verification"
          content="1aefad9171ae8cb7bee83623b082280176d2a19d3f080aae14b4d2eb1001a7e2"
        />
        <meta
          name="google-site-verification"
          content="KCs_LXpyN1_C9-7ziN3sxHHYANFB_Rk7gbPIuhxO74U"
        />
        <link rel="manifest" href="/static/manifest.json" as="json" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/pwa-icons/icon-ios-180x180.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          href="/assets/pwa-icons/ios-splash/icon_1136x640.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
          href="/assets/pwa-icons/ios-splash/icon_2436x1125.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          href="/assets/pwa-icons/ios-splash/icon_1792x828.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="/assets/pwa-icons/ios-splash/icon_828x1792.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          href="/assets/pwa-icons/ios-splash/icon_1334x750.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          href="/assets/pwa-icons/ios-splash/icon_1242x2688.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
          href="/assets/pwa-icons/ios-splash/icon_2208x1242.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          href="/assets/pwa-icons/ios-splash/icon_1125x2436.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          href="/assets/pwa-icons/ios-splash/icon_1242x2208.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          href="/assets/pwa-icons/ios-splash/icon_2732x2048.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
          href="/assets/pwa-icons/ios-splash/icon_2688x1242.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          href="/assets/pwa-icons/ios-splash/icon_2224x1668.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="/assets/pwa-icons/ios-splash/icon_750x1334.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="/assets/pwa-icons/ios-splash/icon_2048x2732.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          href="/assets/pwa-icons/ios-splash/icon_2388x1668.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="/assets/pwa-icons/ios-splash/icon_1668x2224.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="/assets/pwa-icons/ios-splash/icon_640x1136.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="/assets/pwa-icons/ios-splash/icon_1668x2388.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          href="/assets/pwa-icons/ios-splash/icon_2048x1536.png"
          as="icon"
        />
        <link
          rel="apple-touch-startup-image"
          media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          href="/assets/pwa-icons/ios-splash/icon_1536x2048.png"
          as="icon"
        />
        <link
          rel="shortcut icon"
          type="image/ico"
          href="/static/favicon.ico"
          as="icon"
        />
        {/* <Script id='vwoCode' strategy="beforeInteractive">
          { 
            `window._vwo_code || (function() {
                var account_id=384733,
                version=2.1,
                settings_tolerance=2000,
                hide_element='body',
                hide_element_style = 'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important',
                /* DO NOT EDIT BELOW THIS LINE */
                /*f=false,w=window,d=document,v=d.querySelector('#vwoCode'),cK='_vwo_'+account_id+'_settings',cc={};try{var c=JSON.parse(localStorage.getItem('_vwo_'+account_id+'_config'));cc=c&&typeof c==='object'?c:{}}catch(e){}var stT=cc.stT==='session'?w.sessionStorage:w.localStorage;code={use_existing_jquery:function(){return typeof use_existing_jquery!=='undefined'?use_existing_jquery:undefined},library_tolerance:function(){return typeof library_tolerance!=='undefined'?library_tolerance:undefined},settings_tolerance:function(){return cc.sT||settings_tolerance},hide_element_style:function(){return'{'+(cc.hES||hide_element_style)+'}'},hide_element:function(){if(performance.getEntriesByName('first-contentful-paint')[0]){return''}return typeof cc.hE==='string'?cc.hE:hide_element},getVersion:function(){return version},finish:function(e){if(!f){f=true;var t=d.getElementById('_vis_opt_path_hides');if(t)t.parentNode.removeChild(t);if(e)(new Image).src='https://dev.visualwebsiteoptimizer.com/ee.gif?a='+account_id+e}},finished:function(){return f},addScript:function(e){var t=d.createElement('script');t.type='text/javascript';if(e.src){t.src=e.src}else{t.text=e.text}d.getElementsByTagName('head')[0].appendChild(t)},load:function(e,t){var i=this.getSettings(),n=d.createElement('script'),r=this;t=t||{};if(i){n.textContent=i;d.getElementsByTagName('head')[0].appendChild(n);if(!w.VWO||VWO.caE){stT.removeItem(cK);r.load(e)}}else{var o=new XMLHttpRequest;o.open('GET',e,true);o.withCredentials=!t.dSC;o.responseType=t.responseType||'text';o.onload=function(){if(t.onloadCb){return t.onloadCb(o,e)}if(o.status===200){w._vwo_code.addScript({text:o.responseText})}else{w._vwo_code.finish('&e=loading_failure:'+e)}};o.onerror=function(){if(t.onerrorCb){return t.onerrorCb(e)}w._vwo_code.finish('&e=loading_failure:'+e)};o.send()}},getSettings:function(){try{var e=stT.getItem(cK);if(!e){return}e=JSON.parse(e);if(Date.now()>e.e){stT.removeItem(cK);return}return e.s}catch(e){return}},init:function(){if(d.URL.indexOf('__vwo_disable__')>-1)return;var e=this.settings_tolerance();w._vwo_settings_timer=setTimeout(function(){w._vwo_code.finish();stT.removeItem(cK)},e);var t;if(this.hide_element()!=='body'){t=d.createElement('style');var i=this.hide_element(),n=i?i+this.hide_element_style():'',r=d.getElementsByTagName('head')[0];t.setAttribute('id','_vis_opt_path_hides');v&&t.setAttribute('nonce',v.nonce);t.setAttribute('type','text/css');if(t.styleSheet)t.styleSheet.cssText=n;else t.appendChild(d.createTextNode(n));r.appendChild(t)}else{t=d.getElementsByTagName('head')[0];var n=d.createElement('div');n.style.cssText='z-index: 2147483647 !important;position: fixed !important;left: 0 !important;top: 0 !important;width: 100% !important;height: 100% !important;background: white !important;';n.setAttribute('id','_vis_opt_path_hides');n.classList.add('_vis_hide_layer');t.parentNode.insertBefore(n,t.nextSibling)}var o='https://dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&vn='+version;if(w.location.search.indexOf('_vwo_xhr')!==-1){this.addScript({src:o})}else{this.load(o+'&x=true')}}};w._vwo_code=code;code.init();})();(function(){var i=window;function t(){if(i._vwo_code){var e=t.hidingStyle=document.getElementById('_vis_opt_path_hides')||t.hidingStyle;if(!i._vwo_code.finished()&&!_vwo_code.libExecuted&&(!i.VWO||!VWO.dNR)){if(!document.getElementById('_vis_opt_path_hides')){document.getElementsByTagName('head')[0].appendChild(e)}requestAnimationFrame(t)}}}t()})();
        `}
        </Script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// Document.getInitialProps = (ctx) => {
//   console.log({ ctx });
//   // const initProps = await Document.getInitialProps(ctx);
//   return {
//     // ...initProps,
//     zone: ctx.query.zone_lang,
//   };
// };

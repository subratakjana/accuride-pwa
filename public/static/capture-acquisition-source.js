(function (d, f) {
    const h = function (d) {
        if (typeof d.document !== 'object') throw Error('Cookies.js requires a `window` with a `document` object'); var b = function (a, e, c) { return arguments.length === 1 ? b.get(a) : b.set(a, e, c); }; b._document = d.document; b._cacheKeyPrefix = 'cookey.'; b._maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC'); b.defaults = { path: '/', secure: !1 }; b.get = function (a) { b._cachedDocumentCookie !== b._document.cookie && b._renewCache(); a = b._cache[b._cacheKeyPrefix + a]; return a === f ? f : decodeURIComponent(a); };
        b.set = function (a, e, c) { c = b._getExtendedOptions(c); c.expires = b._getExpiresDate(e === f ? -1 : c.expires); b._document.cookie = b._generateCookieString(a, e, c); return b; }; b.expire = function (a, e) { return b.set(a, f, e); }; b._getExtendedOptions = function (a) {
            return {
                path: a && a.path || b.defaults.path, domain: a && a.domain || b.defaults.domain, expires: a && a.expires || b.defaults.expires, secure: a && a.secure !== f ? a.secure : b.defaults.secure,
            };
        }; b._isValidDate = function (a) { return Object.prototype.toString.call(a) === '[object Date]' && !isNaN(a.getTime()); };
        b._getExpiresDate = function (a, e) { e = e || new Date(); typeof a === 'number' ? a = Infinity === a ? b._maxExpireDate : new Date(e.getTime() + 1E3 * a) : typeof a === 'string' && (a = new Date(a)); if (a && !b._isValidDate(a)) throw Error('`expires` parameter cannot be converted to a valid Date instance'); return a; }; b._generateCookieString = function (a, b, c) {
            a = a.replace(/[^#$&+\^`|]/g, encodeURIComponent); a = a.replace(/\(/g, '%28').replace(/\)/g, '%29'); b = (`${b}`).replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent); c = c || {}; a = `${a}=${b}${c.path ? `;path=${c.path}` : ''}`; a += c.domain ? `;domain=${c.domain}` : ''; a += c.expires ? `;expires=${c.expires.toUTCString()}` : ''; return a += c.secure ? ';secure' : '';
        }; b._getCacheFromString = function (a) { const e = {}; a = a ? a.split('; ') : []; for (let c = 0; c < a.length; c++) { const d = b._getKeyValuePairFromCookieString(a[c]); e[b._cacheKeyPrefix + d.key] === f && (e[b._cacheKeyPrefix + d.key] = d.value); } return e; }; b._getKeyValuePairFromCookieString = function (a) {
            var b = a.indexOf('='); var b = b < 0 ? a.length : b; const c = a.substr(0, b); let d; try { d = decodeURIComponent(c); } catch (k) {
                console && typeof console.error
                    === 'function' && console.error(`Could not decode cookie with key "${c}"`, k);
            } return { key: d, value: a.substr(b + 1) };
        }; b._renewCache = function () { b._cache = b._getCacheFromString(b._document.cookie); b._cachedDocumentCookie = b._document.cookie; }; b._areEnabled = function () { const a = b.set('cookies.js', 1).get('cookies.js') === '1'; b.expire('cookies.js'); return a; }; b.enabled = b._areEnabled(); return b;
    }; const g = d && typeof d.document === 'object' ? h(d) : h; typeof define === 'function' && define.amd ? define(() => g) : typeof exports
        === 'object' ? (typeof module === 'object' && typeof module.exports === 'object' && (exports = module.exports = g), exports.Cookies = g) : d.Cookies = g;
}(typeof window === 'undefined' ? this : window));

(function () {
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    let source;
    let campaign;
    let medium;
    let content;
    let adID;
    let adGroup;
    let keyWord;
    let cookieObj;

    let cookie = Cookies.get('accurideAcquisitionCookie');

    if (typeof cookie !== 'undefined') {
        // get all values from the cookie into respective variables
        cookieObj = JSON.parse(cookie);

        if (cookieObj.hasOwnProperty('source')) source = cookieObj.source;
        if (cookieObj.hasOwnProperty('campaign')) campaign = cookieObj.campaign;
        if (cookieObj.hasOwnProperty('medium')) medium = cookieObj.medium;
        if (cookieObj.hasOwnProperty('content')) content = cookieObj.content;
        if (cookieObj.hasOwnProperty('adID')) adID = cookieObj.adID;
        if (cookieObj.hasOwnProperty('adGroup')) adGroup = cookieObj.adGroup;
        if (cookieObj.hasOwnProperty('keyWord')) keyWord = cookieObj.keyWord;
    } else {
        // source
        source = getUrlParameter('source');
        if (source == '') source = getUrlParameter('utm_source');

        // organic.
        if (window.location.href.indexOf('?') == -1) {
            const referringDomain = document.referrer.split('/')[2];
            if (typeof referringDomain === 'undefined') {
                source = 'Direct';
            } else {
                source = referringDomain;
                console.log(`referrer: ${referringDomain}`);
            }
        }

        // campaign
        campaign = getUrlParameter('campaign');
        if (campaign == '') campaign = getUrlParameter('utm_campaign');

        // medium
        medium = getUrlParameter('medium');
        if (medium == '') medium = getUrlParameter('utm_campaign');

        // content
        content = getUrlParameter('content');
        if (content == '') content = getUrlParameter('utm_content');

        // AdID
        adID = getUrlParameter('Adid');
        if (adID == '') adID = getUrlParameter('utm_adid');

        // AdGroup
        // ===============================================================================

        adGroup = getUrlParameter('adGroup');

        // keyWord
        keyWord = getUrlParameter('keyword');
        if (keyWord == '') keyWord = getUrlParameter('utm_term');

        cookieObj = {
            source,
            campaign,
            medium,
            content,
            adID,
            adGroup,
            keyWord,
        };

        for (p in cookieObj) {
            if (cookieObj[p].charAt(0) === '{' || cookieObj[p].charAt(0) === '%7B') cookieObj[p] = '';
        }

        console.log(cookieObj);

        cookie = JSON.stringify(cookieObj);
        Cookies.set('accurideAcquisitionCookie', cookie, { expires: 108000 }); // Expires in 30 hours
    }

    function setValue(list, val) {
        list.forEach(
            (ob) => {
                ob.setAttribute('dataInfo', val);
            },
        );
    }

    function populateForm() {
        setTimeout(() => {
            // is a form present on the page?
            if (document.querySelector('input[actionlabel="sens-marketing-source"]')) {
                // PWA
                const sourceInputEl = document.querySelectorAll('input[actionlabel="sens-marketing-source"]');
                const campaignInputEl = document.querySelectorAll('input[actionlabel="sens-marketing-campaign"]');
                const mediumInputEl = document.querySelectorAll('input[actionlabel="sens-medium"]');
                const contentInputEl = document.querySelectorAll('input[actionlabel="sens-content"]');
                const adIDInputEl = document.querySelectorAll('input[actionlabel="sens-ad-id"]');
                const adGroupInputEl = document.querySelectorAll('input[actionlabel="sens-ad-group"]');
                const keyWordInputEl = document.querySelectorAll('input[actionlabel="sens-keyword"]');
                
                //CompanyAccount hidden fields
                const formnameInputEl = document.querySelector('input[actionlabel="formname"]');
                const leadSourceInputEl = document.querySelector('input[actionlabel="lead_source"]');
                const sensActonSalesChannelInputEl = document.querySelector('input[actionlabel="sens-acton-sales-channel"]');
                const sensActonSourceInputEl = document.querySelector('input[actionlabel="sens-acton-source"]');
                const sensLeadStatusInputEl = document.querySelector('input[actionlabel="sens-lead-status"]');
                const sensSubmissionSourceInputEl = document.querySelector('input[actionlabel="sens-submission-source"]');
                const sensSubmissionIndustryInputEl = document.querySelector('input[actionlabel="sens-submission-industry"]');
                
                if (sourceInputEl) setValue(sourceInputEl, source);
                if (campaignInputEl) setValue(campaignInputEl, campaign);
                if (mediumInputEl) setValue(mediumInputEl, medium);
                if (contentInputEl) setValue(contentInputEl, content);
                if (adIDInputEl) setValue(adIDInputEl, adID);
                if (adGroupInputEl) setValue(adGroupInputEl, adGroup);
                if (keyWordInputEl) setValue(keyWordInputEl, keyWord);

                //CompanyAccount hidden fields
                if (formnameInputEl) formnameInputEl.setAttribute('dataInfo', formnameInputEl.value);
                if (leadSourceInputEl) leadSourceInputEl.setAttribute('dataInfo', leadSourceInputEl.value);
                if (sensActonSalesChannelInputEl) sensActonSalesChannelInputEl.setAttribute('dataInfo', sensActonSalesChannelInputEl.value);
                if (sensActonSourceInputEl) sensActonSourceInputEl.setAttribute('dataInfo', sensActonSourceInputEl.value);
                if (sensLeadStatusInputEl) sensLeadStatusInputEl.setAttribute('dataInfo', sensLeadStatusInputEl.value);
                if (sensSubmissionSourceInputEl) sensSubmissionSourceInputEl.setAttribute('dataInfo', sensSubmissionSourceInputEl.value);
                if (sensSubmissionIndustryInputEl) sensSubmissionIndustryInputEl.setAttribute('dataInfo', sensSubmissionIndustryInputEl.value);
            }
        }, 1000);
    }

    // set values in forms
    populateForm();

    // listen for URL change (reset values)
    let sensUrl = window.location.href;
    document.body.addEventListener('click',
        () => {
            requestAnimationFrame(
                () => {
                    if (sensUrl !== window.location.href) {
                        populateForm();
                        sensUrl = window.location.href;
                    }
                },
            );
        }, true);
    // listen for back button browsing (reset values)
    window.addEventListener('popstate', () => { populateForm(); });
}());

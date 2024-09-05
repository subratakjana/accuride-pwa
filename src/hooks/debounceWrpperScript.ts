import ScriptTag from 'react-script-tag';

const snippet = `!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e="undefined"!=typeof globalThis?globalThis:e||self).debounce=n()}(this,(function(){"use strict";return function(e,n){var t;return function(){for(var o=this,i=arguments.length,f=new Array(i),u=0;u<i;u++)f[u]=arguments[u];var r=function(){e.apply(o,f)};return clearTimeout(t),t=setTimeout(r,n)}}}));`;

export const Debounce = () => (
    <ScriptTag isHydrating dangerouslySetInnerHTML={{ __html: snippet }} />
);

import React, { useEffect, useState } from "react";
import Turnstile from "react-turnstile";

const CloudflareTurnstile = (props) => {
  const [widgetId, setWidgetId] = useState(false);
  const { cfTokenCall, setCfToken, formName } = props;
  useEffect(() => {
    if (cfTokenCall > 1 && widgetId && window.turnstile) {
      window.turnstile.reset(widgetId);
    }
  }, [cfTokenCall, widgetId]);
  const getFormName = formName => formName && formName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  return (
    <Turnstile
      appearance="execute"
      // sitekey="0x4AAAAAAAY1VHUshKw4GoOK"
      sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITEKEY}
      action={`${getFormName(formName) || 'noAction'}`}
      // execution="execute"
      onVerify={(token) => {
        setCfToken(token);
      }}
      onLoad={(widgetId, bound) => {
        setWidgetId(widgetId);
      }}
      onError={(err) => {
        setCfToken(false);
      }}
    />
  );
};

export default CloudflareTurnstile;

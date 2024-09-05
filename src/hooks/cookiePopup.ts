function showCookiePopup() {
  return setTimeout(() => {
    console.log("calling cookie consent");
    window.cookieconsent.initialise({
      palette: {
        popup: { background: "#0c4476", text: "#fff" },
        button: { background: "transparent", text: "#fff", border: "#fff" },
      },
      position: "bottom-left",
      type: "opt-in",
      revokable: !1,
      showLink: !1,
      cookie: { domain: `${process.env.NEXT_PUBLIC_COOKIE_CONSENT_DOMAIN}` },
      content: {
        message:
          '\x3ch3 style\x3d"margin-top:0;"\x3eCookies\x3c/h3\x3eThis site uses cookies to provide you with a more responsive and personalized service. By using this site you agree to the \x3ca href\x3d"https://www.accuride.com/en-us/privacy" target\x3d"_blank"\x3ePrivacy Policy\x3c/a\x3e and \x3ca href\x3d"https://www.accuride.com/en-us/privacy#terms" target\x3d"_blank"\x3eTerms of Service\x3c/a\x3e. Please read our \x3ca href\x3d"https://www.accuride.com/en-us/privacy#cookie" target\x3d"_blank"\x3ecookie notice\x3c/a\x3e for more information on the use of cookies on this website.',
        dismiss: "Dismiss",
        allow: "I accept",
      },
      onInitialise: function (d) {
        d = this.options.type;
        var g = this.hasConsented();
        console.log(
          this.hasConsented()
            ? "init: enable cookies"
            : "init: disable cookies",
        );
        "opt-in" == d &&
          g &&
          (console.log("init tracking"),
          (function (a, c, e, b, f) {
            a[c] = a[c] || {};
            a[c][e] = a[c][e] || {
              q: [],
              track: function (h, k, l) {
                this.q.push({ r: h, e: k, t: l || +new Date() });
              },
            };
            a = b.createElement(f);
            b = b.getElementsByTagName(f)[0];
            a.async = 1;
            a.src = "//marketing.accuride.com/cdnr/32/acton/bn/tracker/34600";
            b.parentNode.insertBefore(a, b);
          })(window, "ActOn", "Beacon", document, "script"),
          ActOn.Beacon.track());
      },
      onStatusChange: function (d, g) {
        d = this.options.type;
        g = this.hasConsented();
        if (this.hasConsented()) {
          window.dispatchEvent(new Event("reLoadGtm"));
        }
        console.log(
          this.hasConsented()
            ? "status change: enable cookies"
            : "status change: disable cookies",
        );
        "opt-in" == d &&
          g &&
          (console.log("init tracking"),
          (function (a, c, e, b, f) {
            a[c] = a[c] || {};
            a[c][e] = a[c][e] || {
              q: [],
              track: function (h, k, l) {
                this.q.push({ r: h, e: k, t: l || +new Date() });
              },
            };
            a = b.createElement(f);
            b = b.getElementsByTagName(f)[0];
            a.async = 1;
            a.src = "//marketing.accuride.com/cdnr/32/acton/bn/tracker/34600";
            b.parentNode.insertBefore(a, b);
          })(window, "ActOn", "Beacon", document, "script"),
          ActOn.Beacon.track());
      },
      onRevokeChoice: function () {
        var d = this.options.type;
        "opt-in" == d && console.log("clicked revoke button");
      },
    });
  }, 2000);
}

export default showCookiePopup;

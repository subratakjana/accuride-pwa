/** @type {(import('next/dist/lib/load-custom-routes').Redirect)[]} */

const pageRedirects = [
  { source: "/", destination: "/en-us", permanent: true },
  { source: "/products", destination: "/en-us/products", permanent: true },
  {
    source: "/products/:magento_route*",
    destination: "/en-us/products/:magento_route*",
    permanent: true,
  },
  { source: "/blog", destination: "/en-us/blog", permanent: true },
  { source: "/blog/:all*", destination: "/en-us/blog/:all*", permanent: true },
  { source: "/news/:all*", destination: "/en-us/news/:all*", permanent: true },
  { source: "/news/:id", destination: "/en-us/news/:id", permanent: true },
  {
    source: "/newsroom/:all*",
    destination: "/en-us/newsroom/:all*",
    permanent: true,
  },
  {
    source: "/newsroom/:id",
    destination: "/en-us/newsroom/:id",
    permanent: true,
  },
  {
    source: "/markets/access-control-solutions",
    destination: "/en-us/markets/access-control-solutions",
    permanent: true,
  },
  {
    source: "/markets/aerospace-watercraft-solutions",
    destination: "/en-us/markets/aerospace-watercraft-solutions",
    permanent: true,
  },
  {
    source: "/markets/appliance",
    destination: "/en-us/markets/appliance",
    permanent: true,
  },
  {
    source: "/markets/architectural-design",
    destination: "/en-us/markets/architectural-design",
    permanent: true,
  },
  {
    source: "/markets/automation-movement-solutions",
    destination: "/en-us/markets/automation-movement-solutions",
    permanent: true,
  },
  {
    source: "/markets/construction-railway-machinery",
    destination: "/en-us/markets/construction-railway-machinery",
    permanent: true,
  },
  {
    source: "/markets/electronic-enclosures",
    destination: "/en-us/markets/electronic-enclosures",
    permanent: true,
  },
  {
    source: "/markets/emergency-vehicles",
    destination: "/en-us/markets/emergency-vehicles",
    permanent: true,
  },
  {
    source: "/markets/healthcare-environments",
    destination: "/en-us/markets/healthcare-environments",
    permanent: true,
  },
  {
    source: "/markets/residential-domestic-applications",
    destination: "/en-us/markets/residential-domestic-applications",
    permanent: true,
  },
  {
    source: "/markets/machinery-equipment-solutions",
    destination: "/en-us/markets/machinery-equipment-solutions",
    permanent: true,
  },
  {
    source: "/markets/transportation-solutions",
    destination: "/en-us/markets/transportation-solutions",
    permanent: true,
  },
  {
    source: "/markets/vending-cash-handling",
    destination: "/en-us/markets/vending-cash-handling",
    permanent: true,
  },
  {
    source: "/markets/woodworking-cabinetry",
    destination: "/en-us/markets/woodworking-cabinetry",
    permanent: true,
  },
  {
    source: "/markets/architectural-design/woodworking",
    destination: "/en-us/markets/architectural-design/woodworking",
    permanent: true,
  },
  {
    source: "/markets/architectural-design/commercial-applications",
    destination: "/en-us/markets/architectural-design/commercial-applications",
    permanent: true,
  },
  {
    source: "/markets/architectural-design/residential-solutions",
    destination: "/en-us/markets/architectural-design/residential-solutions",
    permanent: true,
  },
  {
    source: "/products/drawer-slides",
    destination: "/en-us/products/drawer-slides",
    permanent: true,
  },
  {
    source: "/products/specialty-slides",
    destination: "/en-us/products/specialty-slides",
    permanent: true,
  },
  {
    source:
      "/products/drawer-slides/heavy-duty-slides/9300-drawer-slide-series",
    destination:
      "/en-us/products/drawer-slides/heavy-duty-slides/9300-drawer-slide-series",
    permanent: true,
  },
  {
    source:
      "/products/drawer-slides/light-duty-slides/3800-drawer-slide-series",
    destination:
      "/en-us/products/drawer-slides/light-duty-slides/3800-drawer-slide-series",
    permanent: true,
  },
  {
    source:
      "/products/drawer-slides/light-duty-slides/3100-drawer-slide-series",
    destination:
      "/en-us/products/drawer-slides/light-duty-slides/3100-drawer-slide-series",
    permanent: true,
  },
  { source: "/resources", destination: "/en-us/resources", permanent: true },
  {
    source: "/resources/about-slides",
    destination: "/en-us/resources/about-slides",
    permanent: true,
  },
  {
    source: "/resources/slide-guides",
    destination: "/en-us/resources/slide-guides",
    permanent: true,
  },
  {
    source: "/resources/videos",
    destination: "/en-us/resources/videos",
    permanent: true,
  },
  {
    source: "/resources/cads",
    destination: "/en-us/resources/cads",
    permanent: true,
  },
  {
    source: "/resources/faqs",
    destination: "/en-us/resources/faqs",
    permanent: true,
  },
  {
    source: "/resources/literature",
    destination: "/en-us/resources/literature",
    permanent: true,
  },
  { source: "/support", destination: "/en-us/support", permanent: true },
  { source: "/contact", destination: "/en-us/contact", permanent: true },
  {
    source: "/support/shipping",
    destination: "/en-us/support/shipping",
    permanent: true,
  },
  { source: "/warranty", destination: "/en-us/warranty", permanent: true },
  { source: "/company", destination: "/en-us/company", permanent: true },
  {
    source: "/company/about",
    destination: "/en-us/company/about",
    permanent: true,
  },
  {
    source: "/company/why-accuride",
    destination: "/en-us/company/why-accuride",
    permanent: true,
  },
  {
    source: "/company/customer-stories",
    destination: "/en-us/company/customer-stories",
    permanent: true,
  },
  { source: "/news", destination: "/en-us/news", permanent: true },
  { source: "/newsroom", destination: "/en-us/news", permanent: true },
  {
    source: "/company/oem-direct",
    destination: "/en-us/company/oem-direct",
    permanent: true,
  },
  {
    source: "/company/careers",
    destination: "/en-us/company/careers",
    permanent: true,
  },
  {
    source: "/company/events",
    destination: "/en-us/company/events",
    permanent: true,
  },
  {
    source: "/distributors",
    destination: "/en-us/distributors",
    permanent: true,
  },
  {
    source: "/covid19-update",
    destination: "/en-us/covid19-update",
    permanent: true,
  },
  {
    source: "/privacy#CCPA",
    destination: "/en-us/privacy#california-privacy-policy",
    permanent: true,
  },
  {
    source: "/p65warnings-california",
    destination: "/en-us/p65warnings-california",
    permanent: true,
  },
  {
    source: "/terms-of-sale",
    destination: "/en-us/terms-of-sale",
    permanent: true,
  },
  { source: "/privacy", destination: "/en-us/privacy", permanent: true },
  {
    source: "/sales/order/history/",
    destination: "/en-us/sales/order/history",
    permanent: true,
  },
  {
    source: "/customer/account/login/",
    destination: "/en-us/customer/login",
    permanent: true,
  },
  {
    source: "/checkout/cart/",
    destination: "/en-us/checkout/cart",
    permanent: true,
  },
  {
    source: "/customer/account/forgotpassword/",
    destination: "/en-us/customer/forgotpassword",
    permanent: true,
  },
  {
    source: "/en-us/customer/account/login",
    destination: "/en-us/customer/login",
    permanent: true,
  },
  {
    source: "/en-us/about/careers",
    destination: "/en-us/company/careers",
    permanent: true,
  },
  {
    source: "/en-us/about/global-sites",
    destination: "/en-us/company/about",
    permanent: true,
  },
  {
    source: "/en-us/customer/createcompanyaccount",
    destination: "/en-us/customer/companyaccount",
    permanent: true,
  },
  {
    source: "/en-ca/customer/createcompanyaccount",
    destination: "/en-ca/customer/companyaccount",
    permanent: true,
  },
];
export default pageRedirects;

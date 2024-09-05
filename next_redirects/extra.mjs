/** @type {(import('next/dist/lib/load-custom-routes').Redirect)[]} */
const extraRedirects = [
  {
    source: "/en-us/blog/author/ehicks",
    destination: "/en-us/blog",
    permanent: true,
  },
  {
    source: "/en-us/Woodworking/Product/Details.asp",
    destination: "/en-us/search?keyword=Woodworking",
    permanent: true,
  },
  {
    source: "/en-us/Industrial/Product/Details.asp",
    destination: "/en-us/search?keyword=Industrial",
    permanent: true,
  },
  {
    source: "/en-us/uploads/products/pdf/cbmac-050-n-0405.pdf",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/support/shipping/index.html",
    destination: "/en-us/support/shipping",
    permanent: true,
  },
  {
    source: "/en-us/search%253Fkeyword%253D38/%2526page%253D2",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/resources/videos/index.html",
    destination: "/en-us/search/videos?keyword=video",
    permanent: true,
  },
  {
    source: "/en-us/resources/faqs/index.html",
    destination: "/en-us/resources/faqs",
    permanent: true,
  },
  {
    source: "/en-us/resources/cads/index.html",
    destination: "/en-us/resources/cads",
    permanent: true,
  },
  {
    source: "/en-us/product-catalog/results",
    destination: "/en-us/products/shop",
    permanent: true,
  },
  {
    source: "/en-us/markets/other-industries",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/markets/appliance/index.html",
    destination: "/en-us/markets/appliance",
    permanent: true,
  },
  {
    source: "/en-us/Industrial/Spotlights",
    destination: "/en-us/blog/category/industrial",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/products/6331-aero-iii-oem",
    destination:
      "/en-us/products/6331-aero-iii-light-duty-undermount-slide-with-full-customization",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/products/3017",
    destination:
      "/en-us/products/3017-light-duty-slide-with-over-travel-and-rail-mounting",
    permanent: true,
  },
  {
    source: "/en-us/distributors/%22",
    destination: "/en-us/distributors",
    permanent: true,
  },
  {
    source: "/en-us/customer/section/load",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/customer/createaccount%253Fguest%253D",
    destination: "/en-us/customer/login",
    permanent: true,
  },
  {
    source: "/en-us/covid19-update/index.html",
    destination: "/en-us/covid19-update",
    permanent: true,
  },
  {
    source: "/en-us/contacts/distributor-locator",
    destination: "/en-us/distributors",
    permanent: true,
  },
  {
    source: "/en-us/contact/general/index.html",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/company/why-accuride/index.html",
    destination: "/en-us/company/why-accuride",
    permanent: true,
  },
  {
    source: "/en-us/company/oem-direct/index.html",
    destination: "/en-us/company/oem-direct",
    permanent: true,
  },
  {
    source: "/en-us/company/careers/index.html",
    destination: "/en-us/company/careers",
    permanent: true,
  },
  {
    source:
      "/en-us/catalogsearch/result/index/%253Fq%253Dproducts%252Bshop%252Bmore_than_75%252Baluminum%2526side_space%253D942",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/Woodworking/Spotlights",
    destination: "/en-us/blog/category/woodworking-blogs",
    permanent: true,
  },
  {
    source: "/en-us/36-94-15-21-18-20-oem",
    destination: "/en-us/company/oem-direct",
    permanent: true,
  },
  {
    source: "/en-us/products/shop/20-28-13-30-8-26-18-15-40-54-29",
    destination: "/en-us/products/shop",
    permanent: true,
  },
  {
    source:
      "/en-us/products/shop/28-between_50_and_75-more_than_75-medical-wood_cabinetry-homeowners",
    destination: "/en-us/products/shop",
    permanent: true,
  },
  {
    source: "/en-us/products/al0115-0120rc-aluminum-track",
    destination:
      "/en-us/products/al0115-0120rch-aluminum-track-with-pre-drilled-holes",
    permanent: true,
  },
  {
    source: "/en-us/category-5/category-5-1/category-5-1-2.html",
    destination: "/en-us/products/shop",
    permanent: true,
  },
  {
    source: "/en-us/Woodworking/Literature/Default.asp",
    destination: "/en-us/blog/category/woodworking-blogs",
    permanent: true,
  },
  {
    source: "/en-us/Resources/PDF/3132-r9-1107_.pdf",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/about/careers",
    destination: "/en-us/company/careers",
    permanent: true,
  },
  {
    source: "/en-us/about/corporate",
    destination: "/en-us/company/about",
    permanent: true,
  },
  {
    source: "/en-us/36-18-60-26-30-medical",
    destination: "/en-us/markets/healthcare-environments",
    permanent: true,
  },
  {
    source: "/en-us/25-12-14-42-75-truck_bodies",
    destination: "/en-us/markets/transportation-solutions",
    permanent: true,
  },
  {
    source: "/en-us/10-14-18-36-16-transportation",
    destination: "/en-us/markets/transportation-solutions",
    permanent: true,
  },
  {
    source: "/en-us/31-12-21-40-26-18-pocket_bayonet",
    destination: "/en-us/search?keyword=pocket%20bayonet",
    permanent: true,
  },
  {
    source: "/en-us/Images/BG/Logo.jpg",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/distributors/%22",
    destination: "/en-us/distributors",
    permanent: true,
  },
  {
    source: "/en-us/wordpress/wp-admin",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/contacts",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/products/specialty-slides/al0115-0120rc-aluminum-track",
    destination:
      "/en-us/products/al0115-0120rch-aluminum-track-with-pre-drilled-holes",
    permanent: true,
  },
  {
    source:
      "/en-us/products/al4120-super-heavy-duty-partial-extension-corrosion-resistant-slide",
    destination:
      "/en-us/products/al4140-super-heavy-duty-corrosion-resistant-aluminum-slide",
    permanent: true,
  },
  {
    source: "/en-us/news/wp-cron.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/news/iwf-atlanta-praises-accuride-internationals-new-online-store",
    destination: "/en-us/news",
    permanent: true,
  },
  {
    source: "/en-us/banner/ajax/load",
    destination: "/en-us",
    permanent: true,
  },
  // {
  //     source: "/_next/data/W9QBixBxMwFMGq9AvAUvU/en-us.json",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  {
    source: "/en-us/.well-known/security.txt",
    destination: "/en-us",
    permanent: true,
  },
  // {
  //     source: "/_next/data/tx_EpOufSuXcaA7Piwpsn/en-us.json",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  {
    source: "/en-us/news/category/press-releases",
    destination: "/en-us/news/category/pressreleases",
    permanent: true,
  },
  {
    source: "/en-us/news/wp-content/uploads/2018/12/accuride-builder.jpg",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/Industrial/Network/Default.asp",
    destination: "/en-us/blog/category/industrial",
    permanent: true,
  },
  // {
  //     source: "/_next/static/my7avzjk-oxbz-q8ssul2/_ssgmanifest.js",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "/_next/static/vsfqkerlyiuo07lj32gnd/_buildmanifest.js",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  {
    source: "/en-us//wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us//xmlrpc.php", destination: "/en-us", permanent: true },
  {
    source: "/en-us//web/wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//wordpress/wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//2020/wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//blog/wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//website/wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//news/wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//shop/wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//wp/wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//site/wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//wp2/wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//wp1/wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//2019/wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//cms/wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//test/wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//sito/wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/Resources/PDF/3832C-3834C-R7-1212E.pdf",
    destination: "/en-us/resources",
    permanent: true,
  },
  // {
  //     source: "/_next/data/LzvC6JZ5JCqRAR6KSXlMV/en-us.json",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  {
    source: "/en-us/distributors/%22",
    destination: "/en-us/distributors",
    permanent: true,
  },
  {
    source: "/en-us/Resources/PDF/3640-A-R2-0309.pdf",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source: "/en-us/BSRA/Default.asp",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/31-54-29-14-15-23-utility_vehicles",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/distributors/www.aerospacesw.com",
    destination: "/en-us/distributors",
    permanent: true,
  },
  {
    source:
      "/en-us/customer/account/login/referer/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2NhdGFsb2dzZWFyY2gvcmVzdWx0L2luZGV4Lz9xPWFtZmlsZStmdWxsK2Rvd25sb2FkK2Z1bGwrMS4wNCtwcm9kdWN0KzM4MzJl",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/Global/Worldwide/Default.asp",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/Resources/PDF/123-1234-R13-0509.pdf",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source:
      "/en-us/customer/account/login/referer/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL3Byb2R1Y3RzL3Nob3A_bGVuZ3RoPTc4OCUyQzc4NyUyQzk0MCZtYXJrZXQ9OTc3",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/oem-direct",
    destination: "/en-us/company/oem-direct",
    permanent: true,
  },
  {
    source: "/en-us/amfinder/index/search",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/App_Master/(.*)",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us/app/etc/(.*)", destination: "/en-us", permanent: true },
  {
    source: "/en-us/architectural-design/woodworking",
    destination: "/en-us/markets/architectural-design/woodworking",
    permanent: true,
  },
  {
    source: "/en-us/architectural-design/(\\*)",
    destination: "/en-us/markets/architectural-design",
    permanent: true,
  },
  {
    source: "/en-us/architectural-design/wp-content/uploads/(.*)",
    destination: "/en-us/markets/architectural-design",
    permanent: true,
  },
  {
    source: "/en-us/bl/wp-admin/(.*)",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us/backup/(.*)", destination: "/en-us", permanent: true },
  { source: "/en-us/bkp/(.*)", destination: "/en-us", permanent: true },
  {
    source: "/en-us/bin/keychain.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/bitcoin/wallet.dat",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/about_accuride/employment_main.php",
    destination: "/en-us/company/careers",
    permanent: true,
  },
  {
    source: "/en-us/blogold/wp-admin/install.php",
    destination: "/en-us/blog",
    permanent: true,
  },
  {
    source: "/en-us/brabantwallon/app_master/telerik.web.ui.dialoghandler.aspx",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us/BSRA/(.*)", destination: "/en-us", permanent: true },
  {
    source: "/en-us/bsra/Images/(.*)",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us/btc/wallet.dat", destination: "/en-us", permanent: true },
  {
    source: "/en-us/c9/metadata/environment/.env",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/cache/spouty/th3_alpha.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/case-studies/white-goods/gorenje-go-full-steam-ahead-with-accuride-telescopic-slides",
    destination: "/en-us/blog/category/case-study",
    permanent: true,
  },
  // {
  //     source: "//2018/wp-includes/wlwmanifest.xml",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "//2019/wp-includes/wlwmanifest.xml",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "//blog/wp-includes/wlwmanifest.xml",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "//cms/wp-includes/wlwmanifest.xml",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "//media/wp-includes/wlwmanifest.xml",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "//news/wp-includes/wlwmanifest.xml",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "//shop/wp-includes/wlwmanifest.xml",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "//site/wp-includes/wlwmanifest.xml",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "//sito/wp-includes/wlwmanifest.xml",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "//test/wp-includes/wlwmanifest.xml",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "//web/wp-includes/wlwmanifest.xml",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "//website/wp-includes/wlwmanifest.xml",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "//wordpress/wp-includes/wlwmanifest.xml",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "//wp/wp-includes/wlwmanifest.xml",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "//wp1/wp-includes/wlwmanifest.xml",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "//wp2/wp-includes/wlwmanifest.xml",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // { source: "//xmlrpc.php", destination: "/en-us", permanent: true },
  // {
  //     source: "/admin/includes/general.js",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "/admin/view/javascript/common.js",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "/administrator/language/en-GB/install.xml",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "/admin/includes/general.js",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "/admin/view/javascript/common.js",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "/administrator/help/en-GB/toc.json",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "/administrator/language/en-GB/install.xml",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "/assets/global/plugins/(.*)",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "/assets/jquery-file-upload/(.*)",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  // {
  //     source: "/assets/plugins/jquery-fileupload/(.*)",
  //     destination: "/en-us",
  //     permanent: true,
  // },
  {
    source: "/en-us/%22company/about%22",
    destination: "/en-us/company/about",
    permanent: true,
  },
  {
    source: "/en-us/%2522company/about%2522",
    destination: "/en-us/company/about",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/news/%5Bid%5D",
    destination: "/en-us/company/about",
    permanent: true,
  },
  {
    source:
      "/en-us/%5Bzone_lang%5D/products/drawer-slides/heavy-duty-slides/9300-drawer-slide-series",
    destination:
      "/en-us/products/drawer-slides/heavy-duty-slides/9300-drawer-slide-series",
    permanent: true,
  },
  {
    source:
      "/en-us/%5Bzone_lang%5D/products/drawer-slides/light-duty-slides/3100-drawer-slide-series",
    destination:
      "/en-us/products/drawer-slides/light-duty-slides/3100-drawer-slide-series",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/resources",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/support/shipping",
    destination: "/en-us/support/shipping",
    permanent: true,
  },
  {
    source: "/en-us/.aws/(.*)",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us/.git/(.*)", destination: "/en-us", permanent: true },
  {
    source: "/en-us/.well-known/(.*)",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/company/about",
    destination: "/en-us/company/about",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/contact/integrated-access-control-support",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/customer/login",
    destination: "/en-us/customer/login",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/markets/construction-railway-machinery",
    destination: "/en-us/markets/construction-railway-machinery",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/markets/vending-cash-handling",
    destination: "/en-us/markets/vending-cash-handling",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/markets/woodworking-cabinetry",
    destination: "/en-us/markets/woodworking-cabinetry",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/resources/cads",
    destination: "/en-us/resources/cads",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/support",
    destination: "/en-us/support",
    permanent: true,
  },
  {
    source: "/en-us/.ssh/(.*)",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/.svn/(.*)",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//.env",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us///news/js/newsmember.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//2018/wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//404_icon.png",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//admin/images/li_10.gif",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//assets/css/index/cgwl_online.css",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//assets/images/index/del.png",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//base/templates/images/2.png",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us//c.php", destination: "/en-us", permanent: true },
  { source: "/en-us//config.php", destination: "/en-us", permanent: true },
  { source: "/en-us//css/album.css", destination: "/en-us", permanent: true },
  {
    source: "/en-us//css/HighChart.css",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//css/images/refresh.png",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us//css/tips.css", destination: "/en-us", permanent: true },
  {
    source: "/en-us//e/css/submenu.css",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//e/images/logo.gif",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//e/js/dialog.js",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us//en-us", destination: "/en-us", permanent: true },
  {
    source:
      "/en-us//en-us/blog/diy/how-to-install-drawer-slides/slideology-101-art-disconnect",
    destination:
      "/en-us/blog/diy/how-to-install-drawer-slides/slideology-101-art-disconnect",
    permanent: true,
  },
  {
    source: "/en-us//en-us/contact/general",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us//en-us/customer/account",
    destination: "/en-us/customer/account",
    permanent: true,
  },
  {
    source: "/en-us//en-us/resources/about-slides",
    destination: "/en-us/resources/about-slides",
    permanent: true,
  },
  {
    source: "/en-us//ewebeditor/KindEditor.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//base/js/common.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//fckeditor/editor/js/fckadobeair.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//fckeditor/fckconfig.js",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us//hmseo.php", destination: "/en-us", permanent: true },
  {
    source: "/en-us//Image/min-icon.png",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us//images/3z.png", destination: "/en-us", permanent: true },
  {
    source: "/en-us//images/default/nopic.jpg",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//Images/Editor/Editor.gif",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//images/load.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//Inc/check_sql.asp",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//inc/module/vod.php",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us//index.php", destination: "/en-us", permanent: true },
  {
    source: "/en-us//jira/plugins/servlet/gadgets/makeRequest",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//js/browsers.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//js/calendar/active-bg.gif",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us//js/comm.js", destination: "/en-us", permanent: true },
  {
    source: "/en-us//js/player/xigua2.html",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//js/slick/images/code.png",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//js/webuploader/webuploader.css",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//label/ajax/hit.aspx",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//lib/view/css/image-crop.css",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//lib/view/js/nestable.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//login/blue/login/logo.png",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//logo/images/logo.gif",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//member/templets/images/login_logo.gif",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//myclass/css/pagination.css",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//ningbo/js/1.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//omooo/statics/css/style.css",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us//phpinfo.php", destination: "/en-us", permanent: true },
  {
    source: "/en-us//plugins/qqkf/qqkf2.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//plugins/servlet/gadgets/makeRequest",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//plus/img/toplogo.gif",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//Public/images/logo.png",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us//Public/js.php", destination: "/en-us", permanent: true },
  {
    source: "/en-us//public/static/common/images/bag-imgB.jpg",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//public/static/common/images/ui_icon.jpg",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//public/static/common/js/jquery.editable.min.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us//public/static/libs/bootstrap/css/awesome-bootstrap-checkbox.css",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//public/static/libs/jymusic/js/base64.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//Res/images/nopic.jpg",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//secure/ManageFilters.jspa",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//seeyon/common/images/A8/favicon.ico",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//seeyon/main/common/js/qrcode-uuid.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//setup/pub/angular/angular.min.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//static/css/install.css",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//static/favicon.ico",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//static/image/common/close.gif",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//static/images/face/1.gif",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//static/js/home.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//static/js/logging.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//static/login/keypad/images/formEle/keyBg.jpg",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//static/login/logo.png",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//statics/css/admin_visualization.css",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//statics/js/finecms.sku.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//statics/js/search_suggest.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//template/default/css/dtree.css",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//template/default/login/images/webface_news_vip.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//templets/default/html/tag.html",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//templets/seowhy/js/product.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//themes/default/images/yahoo.gif",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//tmui/tmui/login/legal.html",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//tool/statics/admin_login.css",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//tpl/admincp/css/footer.css",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//tpl/static/js/skin/default/img.gif",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us//user.php", destination: "/en-us", permanent: true },
  {
    source: "/en-us//utility/convert/data/config.inc.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us//wp-content", destination: "/en-us", permanent: true },
  {
    source: "/en-us//wp-content/themes/ripro/assets/js/html5shiv.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//wp-includes/css/wp-embed-template-ie.css",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//xui/common/blank.html",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us//zabbix.php", destination: "/en-us", permanent: true },
  {
    source: "/en-us/__magmi/web/magmi.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/_ignition/execute-solution",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/_magmi/web/magmi.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/_profiler/phpinfo",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/%5Bid%5D",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/customer-stories/into-the-wild-overland",
    destination: "/en-us/customer-stories/into-the-wild-overland",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/distributors",
    destination: "/en-us/distributors",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/markets/automotive-movement-solutions",
    destination: "/en-us/markets/automotive-movement-solutions",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/markets/residential-domestic-applications",
    destination: "/en-us/markets/residential-domestic-applications",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/markets/transportation-solutions",
    destination: "/en-us/markets/transportation-solutions",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/products/specialty-slides",
    destination: "/en-us/products/specialty-slides",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/resources/literature",
    destination: "/en-us/resources/literature",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/resources/videos",
    destination: "/en-us/resources/videos",
    permanent: true,
  },
  {
    source: "/en-us/blog//wp-admin/setup-config.php",
    destination: "/en-us/blog",
    permanent: true,
  },
  {
    source:
      "/en-us/blog/diy//en-us/blog/diy/5-awesome-under-stair-storage-ideas",
    destination: "/en-us/blog/diy/5-awesome-under-stair-storage-ideas",
    permanent: true,
  },
  {
    source: "/en-us/%25253D%252526https(.*)",
    destination: "/en-us",
    permanent: true,
  },
  { source: "/en-us/c/version.js", destination: "/en-us", permanent: true },
  {
    source: "/en-us/catalog/view/javascript/common.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/catalog/view/theme/default/stylesheet/stylesheet.css",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/catalogsearch/result",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/catalogsearch/result/index",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/category-16/category-16-3/category-16-3-9.html",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/cgi/Resources/List",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL3Byb2R1Y3RzL2FjY2Vzc29yaWVz/product/%5C",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1sZW5ndGglM2E1NCUyMGxlbmd0aCUzYTE2JTIwbGVuZ3RoJTNhMjQlMjBsZW5ndGglM2EyMiUyMGxlbmd0aCUzYTE0/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/checkout/cart/index",
    destination: "/en-us/checkout/cart",
    permanent: true,
  },
  {
    source: "/en-us/checkout/onepage/success",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/citrix/cgi/Resources/List",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/cms/wp-admin/install.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/CMSPages/logon.aspx",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/company/%2522%2520aria-label=",
    destination: "/en-us/company",
    permanent: true,
  },
  {
    source: "/en-us/company/account/validate",
    destination: "/en-us/company",
    permanent: true,
  },
  { source: "/en-us/config/aws.yml", destination: "/en-us", permanent: true },
  {
    source: "/en-us/contact/%2522%2520aria-label=",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/contact/en-us",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/contacts/architectural-support",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/contacts/contact-oem-direct",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/contacts/contact-senseon",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/contacts/dGVjaG5pY2",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/contacts/general-contact",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/contacts/technical-support",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/core/CHANGELOG.txt",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/customer//en-us/customer/account",
    destination: "/en-us/customer/account",
    permanent: true,
  },
  {
    source: "/en-us/customer/account/create",
    destination: "/en-us/customer/createaccount",
    permanent: true,
  },
  {
    source: "/en-us/customer/account/forgotpassword",
    destination: "/en-us/customer/forgotpassword",
    permanent: true,
  },
  {
    source: "/en-us/customer/account/index",
    destination: "/en-us/customer/account",
    permanent: true,
  },
  {
    source:
      "/en-us/customer/account/login/referer/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2NhdGFsb2cvcHJvZHVjdC92aWV3L2lkLzE5Njkv",
    destination: "/en-us/customer/login",
    permanent: true,
  },
  {
    source:
      "/en-us/customer/account/login/referer/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2VuLXVzL3NsaS9zZWFyY2gvdGVtcGxhdGUv",
    destination: "/en-us/customer/login",
    permanent: true,
  },
  {
    source: "/en-us/DistributorLocator/Redirect.asp",
    destination: "/en-us/distributors",
    permanent: true,
  },
  { source: "/en-us/docker/.env", destination: "/en-us", permanent: true },
  {
    source: "/en-us/docker/laravel/app/.env",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/drawer-slides/heavy-duty",
    destination: "/en-us/products/drawer-slides/heavy-duty-slides",
    permanent: true,
  },
  {
    source:
      "/en-us/drawer-slides/wp-content/uploads/2017/06/3832E-Enhanced-Touch-Release-vanity-drawers.jpg",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/about",
    destination: "/en-us/company/about",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/contacts/distributor-locator",
    destination: "/en-us/distributors",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/contacts/technical-support",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/how-to-buy",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/markets-innovation",
    destination: "/en-us/markets/access-control-solutions",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/markets-innovation/secure-access-control-systems",
    destination: "/en-us/markets/access-control-solutions",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/news",
    destination: "/en-us/news",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/news/accuride-featured-in-rfid-journal",
    destination: "/en-us/news",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/news/global-shop-senseon-secure",
    destination: "/en-us/news",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/news/senseon-secure-access",
    destination: "/en-us/news",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/privacy",
    destination: "/en-us/privacy",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/product-catalog",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/product-catalog/oem-direct/accuride-advantage",
    destination: "/en-us/company/oem-direct",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/products/0363",
    destination: "/en-us/products/0363-light-duty-two-way-travel-slide",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/products/1321-pro-pocket-pro-pocket",
    destination:
      "/en-us/products/cb1321-pro-pocket-slide-for-pocket-and-flipper-doors-auto-open",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/products/3132sc-eclipse-self-closing",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/products/3507-ie",
    destination: "/en-us/products/3507-heavy-duty-slide-with-lock-out",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/products/3634ec",
    destination:
      "/en-us/products/3634ec-medium-duty-over-travel-slide-with-easy-close",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/products/3640a",
    destination:
      "/en-us/products/3640a-heavy-duty-over-travel-slide-with-adapter-rail-mount-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/products/4032",
    destination:
      "/en-us/products/4032-medium-duty-full-extension-slide-with-progressive-movement",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/products/4035",
    destination:
      "/en-us/products/4035-light-duty-over-travel-and-ultra-quiet-slide",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/products/ch3832e-weather-resistant",
    destination:
      "/en-us/products/ch3832e-light-duty-weather-resistant-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/products/ss5321",
    destination:
      "/en-us/products/ss5321-heavy-duty-over-travel-and-corrosion-resistant-slide",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/resources",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source: "/en-us/explore/tags/(.*)",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/resources/cads",
    destination: "/en-us/resources/cads",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/resources/faqs",
    destination: "/en-us/resources/faqs",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/resources/how-tos/about-slides",
    destination: "/en-us/resources/about-slides",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/resources/literature",
    destination: "/en-us/resources/literature",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/resources/slide-guides",
    destination: "/en-us/resources/slide-guides",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/resources/videos",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/resources/videos/slide-terminology",
    destination: "/en-us/resources/about-slides#slide-terminology",
    permanent: true,
  },
  {
    source: "/en-us/amfile/file/download/file/(.*)",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/amfile/file/download/file_id/(.*)",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/%5Bzone_lang%5D/products/drawer-slides",
    destination: "/en-us/products/drawer-slides",
    permanent: true,
  },
  { source: "/en-us//%22", destination: "/en-us", permanent: true },
  {
    source: "/en-us//drawer-slides/heavy-duty-slides",
    destination: "/en-us/products/drawer-slides/heavy-duty-slides",
    permanent: true,
  },
  {
    source: "/en-us//en-us//product-catalog",
    destination: "/en-us/products/shop",
    permanent: true,
  },
  {
    source: "/en-us//en-us/catalogsearch/result",
    destination: "/en-us/products/shop",
    permanent: true,
  },
  { source: "/en-us//en-us/search", destination: "/en-us", permanent: true },
  {
    source: "/en-us/address/editaddress",
    destination: "/en-us/customer/account",
    permanent: true,
  },
  {
    source: "/en-us/blog//3index.php",
    destination: "/en-us/blog",
    permanent: true,
  },
  {
    source: "/en-us/blog/category//en-us/blog/category/woodworking-blogs",
    destination: "/en-us/blog/category/woodworking-blogs",
    permanent: true,
  },
  {
    source: "/en-us/checkdelivery/index/index",
    destination: "/en-us/checkout/shipping",
    permanent: true,
  },
  {
    source: "/en-us/checkout/%2522",
    destination: "/en-us/checkout/shipping",
    permanent: true,
  },
  {
    source:
      "/en-us/contacts/distributor-locator%253F__hstc%253D209004493.24694e44698b16709f09d95cdcf7e87e.1608581716266.1608581716266.1608581716266.1%2526__hssc%253D209004493.2.1608581716266%2526__hsfp%253D2324073213",
    destination: "/en-us/distributors",
    permanent: true,
  },
  {
    source: "/en-us/customer/account/%2522%2520aria-label=",
    destination: "/en-us/customer/account",
    permanent: true,
  },
  {
    source: "/en-us/customer/account/BO",
    destination: "/en-us/customer/account",
    permanent: true,
  },
  {
    source: "/en-us/customer/account/cv",
    destination: "/en-us/customer/account",
    permanent: true,
  },
  {
    source: "/en-us/distributors/www.compidistributors.com",
    destination: "/en-us/distributors",
    permanent: true,
  },
  {
    source: "/en-us/drawer-slides/heavy-duty-slides",
    destination: "/en-us/products/drawer-slides/heavy-duty-slides",
    permanent: true,
  },
  {
    source: "/en-us/drawer-slides/light-duty-slides",
    destination: "/en-us/products/drawer-slides/light-duty-slides",
    permanent: true,
  },
  {
    source: "/en-us/markets/access-control-systems",
    destination: "/en-us/markets/access-control-solutions",
    permanent: true,
  },
  {
    source: "/en-us/markets/truck-bodies-utility-vehicles",
    destination: "/en-us/markets/transportation-solutions",
    permanent: true,
  },
  {
    source: "/en-us/markets-innovation/aerospace-watercraft",
    destination: "/en-us/markets/aerospace-watercraft-solutions",
    permanent: true,
  },
  {
    source: "/en-us/markets-innovation/architectural-design",
    destination: "/en-us/markets/architectural-design",
    permanent: true,
  },
  {
    source: "/en-us/markets-innovation/automotive-transportation",
    destination: "/en-us/markets/automotive-movement-solutions",
    permanent: true,
  },
  {
    source: "/en-us/markets-innovation/industrial-electromechanical",
    destination: "/en-us/markets/vending-cash-handling",
    permanent: true,
  },
  {
    source: "/en-us/markets-innovation/machinery",
    destination: "/en-us/markets/machinery-equipment-solutions",
    permanent: true,
  },
  {
    source: "/en-us/markets-innovation/medical-healthcare",
    destination: "/en-us/markets/healthcare-environments",
    permanent: true,
  },
  {
    source: "/en-us/markets-innovation/secure-access-control-systems",
    destination: "/en-us/markets/access-control-solutions",
    permanent: true,
  },
  {
    source: "/en-us/markets-innovation/vending-cash-handling",
    destination: "/en-us/markets/vending-cash-handling",
    permanent: true,
  },
  {
    source: "/en-us/markets-innovation/woodworking-cabinetry",
    destination: "/en-us/markets/woodworking-cabinetry",
    permanent: true,
  },
  {
    source: "/en-us/news//3index.php",
    destination: "/en-us/news",
    permanent: true,
  },
  {
    source: "/en-us/product/10elao-electronic-cabinet-lock",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/resources/downloads/technical-sheets/industrial-electromechanical",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source: "/en-us/resources/how-tos/about-slides",
    destination: "/en-us/resources/about-slides",
    permanent: true,
  },
  {
    source: "/en-us/Resources/PDF/(.*)",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/resources/quality/certifications-associations",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source: "/en-us/resources/videos/features-and-components",
    destination: "/en-us/resources/videos",
    permanent: true,
  },
  {
    source: "/en-us/shop/online-store",
    destination: "/en-us/products/shop",
    permanent: true,
  },
  {
    source: "/en-us/Woodworking/(.*)",
    destination: "/en-us/markets/woodworking-cabinetry",
    permanent: true,
  },
  {
    source:
      "/en-us/resources/downloads/literature-request-registration/woodworking-architectural-literature-request",
    destination: "/en-us/markets/architectural-design/woodworking",
    permanent: true,
  },
  {
    source: "/en-us/resources/downloads/literature-request-registration",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source: "/en-us/resources/downloads/cads/industrial-electromechanical",
    destination: "/en-us/resources/cads",
    permanent: true,
  },
  {
    source: "/en-us/resources/downloads/cads",
    destination: "/en-us/resources/cads",
    permanent: true,
  },
  {
    source: "/en-us/resources/downloads/accessory-guides",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source: "/en-us/Resources/DOC/3-Part",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source:
      "/en-us/resources/application-solutions/woodworking-cabinetry/synchronized-motion-from-glideware",
    destination: "/en-us/markets/woodworking-cabinetry",
    permanent: true,
  },
  {
    source: "/en-us/resources/application-solutions/woodworking-cabinetry",
    destination: "/en-us/markets/woodworking-cabinetry",
    permanent: true,
  },
  {
    source:
      "/en-us/resources/application-solutions/vending-cash-handling/space-saver-point-of-sale-units",
    destination: "/en-us/markets/vending-cash-handling",
    permanent: true,
  },
  {
    source:
      "/en-us/resources/application-solutions/truck-bodies-utility-vehicles/heavy-duty-storage-that-lasts-and-lasts",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source: "/en-us/resources/application-solutions/other-industries",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source:
      "/en-us/resources/application-solutions/electronic-enclosures-server-racks/tool-less-mounting",
    destination: "/en-us/markets/electronic-enclosures",
    permanent: true,
  },
  {
    source:
      "/en-us/resources/application-solutions/electronic-enclosures-server-racks/super-computer-uses-2907-server-slide",
    destination: "/en-us/markets/electronic-enclosures",
    permanent: true,
  },
  {
    source:
      "/en-us/resources/application-solutions/architectural-design/mechanical-screen-lift-used-in-historic-building",
    destination: "/en-us/markets/architectural-design",
    permanent: true,
  },
  {
    source: "/en-us/resources/application-solutions",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source: "/en-us/resources/%2522%2520aria-label=",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source:
      "/en-us/product/components-hardware-and-assembly/undermount-drawer-slides",
    destination: "/en-us/products/drawer-slides",
    permanent: true,
  },
  {
    source: "/en-us/product/drawer-slides",
    destination: "/en-us/products/drawer-slides",
    permanent: true,
  },
  {
    source: "/en-us/product-catalog/oem-direct",
    destination: "/en-us/company/oem-direct",
    permanent: true,
  },
  {
    source: "/en-us/product-catalog/oem-direct/(.*)",
    destination: "/en-us/company/oem-direct",
    permanent: true,
  },
  {
    source: "/en-us/products/specialty-slides/linear-track-systems",
    destination:
      "/en-us/products/specialty-slides/linear-rail-and-track-systems",
    permanent: true,
  },
  {
    source: "/en-us/wp-admin/admin-ajax.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/js/mage/adminhtml/sales.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/js/mage/adminhtml/tools.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/skin/adminhtml/default/default/below_ie7.css",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/pub/static/frontend/Magento/luma/en_US/Magento_Ui/js/grid/controls/bookmarks/storage.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/js/varien/form.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/js/prototype/validation.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/resources/downloads/product-information-sheets",
    destination: "/en-us/resources/literature",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/markets-innovation/woodworking-cabinetry",
    destination: "/en-us/markets/woodworking-cabinetry",
    permanent: true,
  },
  {
    source: "/en-us/Global/News/Default.asp",
    destination: "/en-us/news",
    permanent: true,
  },
  {
    source: "/en-us/contact/general",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/contact/technical-support",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/contact/architectural-support",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/contact/integrated-access-control-support",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/contact/oem-direct",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/company/oem-direct@continuous-support",
    destination: "/en-us/company/oem-direct",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/about/global-sites",
    destination: "/en-us/company/about",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/markets-innovation/homeowners",
    destination: "/en-us/markets/residential-domestic-applications",
    permanent: true,
  },
  {
    source:
      "/en-us/en-mx/product-catalog/oem-direct/accuride-advantage/contract-manufacturing",
    destination: "/en-us/markets/automation-movement-solutions",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/product-catalog/results",
    destination: "/en-us/products/shop",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/products/al4140-super-heavy-duty",
    destination:
      "/en-us/products/al4140-super-heavy-duty-corrosion-resistant-aluminum-slide",
    permanent: true,
  },
  {
    source:
      "/en-us/en-mx/resources/application-solutions/vending-cash-handling/lock-inlock-out-solution-for-kiosks",
    destination: "/en-us/markets/vending-cash-handling",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/resources/how-tos/design-considerations",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/resources/videos/other-videos",
    destination: "/en-us/resources/videos",
    permanent: true,
  },
  {
    source: "/en-us/Global/About/History",
    destination: "/en-us/company/about",
    permanent: true,
  },
  {
    source: "/en-us/Industrial/Literature/Default.asp",
    destination: "/en-us/resources/literature",
    permanent: true,
  },
  {
    source: "/en-us/Industrial/News/www.accuride.com/bsra",
    destination: "/en-us/news",
    permanent: true,
  },
  {
    source: "/en-us/Industrial/Product/Default.asp",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/jenkins/login",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/OEM-Direct/About/continuous-support.asp",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/press/accuride-launches-new-website",
    destination: "/en-us/news",
    permanent: true,
  },
  {
    source: "/en-us/product/38el",
    destination: "/en-us/products/b38el-electronic-cabinet-locking-system",
    permanent: true,
  },
  {
    source: "/en-us/resources/about-slides@slide-terminology",
    destination: "/en-us/resources/about-slides",
    permanent: true,
  },
  {
    source:
      "/en-us/resources/application-solutions/electronic-enclosures-server-racks",
    destination: "/en-us/markets/electronic-enclosures",
    permanent: true,
  },
  {
    source: "/en-us/resources/how-tos/how-to-select-a-slide",
    destination: "/en-us/resources/slide-guides#how-to-select-slide",
    permanent: true,
  },
  {
    source: "/en-us/resources/quality/environmental",
    destination: "/en-us/company/why-accuride",
    permanent: true,
  },
  {
    source: "/en-us/resources/quality/warranty",
    destination: "/en-us/warranty",
    permanent: true,
  },
  {
    source: "/en-us/&quot;company/about&quot;",
    destination: "/en-us/company/about",
    permanent: true,
  },
  {
    source: "/en-us/autodiscover/autodiscover.xml",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us//terms-of-sale",
    destination: "/en-us/warranty",
    permanent: true,
  },
  {
    source: "/en-us/customer/%2522%2520aria-label=",
    destination: "/en-us/blog",
    permanent: true,
  },
  {
    source: "/en-us/customer-stories/%2522%2520aria-label=",
    destination: "/en-us/blog",
    permanent: true,
  },
  {
    source: "/en-us/customer-stories/preload",
    destination: "/en-us/blog",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/products/115rc-linear-track-system-ie",
    destination:
      "/en-us/products/specialty-slides/linear-rail-and-track-systems",
    permanent: true,
  },
  {
    source:
      "/en-us/en-mx/resources/application-solutions/vending-cash-handling/linear-motion-tracks-keep-the-money-moving",
    destination: "/en-us/markets/vending-cash-handling",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/rohs",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source:
      "/en-us/Images/Products/Woodworking/PICSM/3832EC_Easy-Close_pic_sm.jpg",
    destination:
      "/en-us/products/3832ec-easy-close-light-duty-side-mount-slide-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/Industrial/Automotive/Default.asp",
    destination: "/en-us/markets/automotive-movement-solutions",
    permanent: true,
  },
  {
    source: "/en-us/markets-innovation/homeowners",
    destination: "/en-us/markets/residential-domestic-applications",
    permanent: true,
  },
  {
    source: "/en-us/markets-innovation/oem-direct",
    destination: "/en-us/company/oem-direct",
    permanent: true,
  },
  {
    source: "/en-us/pages/contact",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/pages/contactus",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/pages/contact-us",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/press/3634ec",
    destination:
      "/en-us/products/3634ec-medium-duty-over-travel-slide-with-easy-close",
    permanent: true,
  },
  {
    source: "/en-us/resources/downloads/product-information-sheets",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1sZW5ndGglM2EyNCUyMGxlbmd0aCUzYTMyJTIwbGVuZ3RoJTNhMTYlMjBsZW5ndGglM2EzMCUyMGxlbmd0aCUzYTIy/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1JlbW92ZS1EcmF3ZXI/YWY9bWFya2V0JTNhYXBwbGlhbmNlcyUyMG1hcmtldCUzYWluZHVzdHJpYWwlMjBzaWRlc3BhY2UlM2E1MCUyMG1vdW50aW5nJTNhc2lkZW1vdW50JTIwbW91bnRpbmclM2FmbGF0bW91bnQ=/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/quickview/index/view/path/%27",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/faqs/index/search",
    destination: "/en-us/resources/faqs",
    permanent: true,
  },
  {
    source:
      "/en-us/storepickup/ajax/listStore/latitude/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25275149do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/ajaxsearch/ajax/index",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/boltpaydirectpost/Payment/failure/invoice/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25271002do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/combine/index/index",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/merchantform/index/citylist",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/magicshop/Quickview/view/path/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25274900do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/mstpdfcatalogproductprint/index/pdfproduct",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/magicshop/Quickview/ajax/path/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25279201do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/storelocator/json/search",
    destination: "/en-us/distributors",
    permanent: true,
  },
  {
    source: "/en-us/sendinblue/ajax/ajaxupdate",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/ajax/quickview/view/path/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25272762do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/themesettings/quickview/view/path/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25279843do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/boltpaydirectpost/Payment/failure",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/press/index/search",
    destination: "/en-us/news",
    permanent: true,
  },
  {
    source: "/en-us/m1amecallbackendpoint/index/index",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/megamenu/index/getitems/group/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25276904do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/press/index/search/submit/1/search_press/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25275573do",
    destination: "/en-us/news",
    permanent: true,
  },
  {
    source:
      "/en-us/storelocator/json/search/current/1/longitude/1/latitude/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%2527431do",
    destination: "/en-us/distributors",
    permanent: true,
  },
  {
    source: "/en-us/salesforceimport/index/eternity",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/advancecms/index/rating",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/import/index/importCustomer/web_site/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25271389do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/innoviti/Payment/return/vpc_TxnResponseCode=0&vpc_TransactionNo=dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%252717do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/quickview/index/index/path/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25276180do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/advancedreviews/proscons/updatepager",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/gmapstrlocator/index/detail/id/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%252750do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/quickshop/index/view/path/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25273077do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/socolissimo/ajax/getcitynamebyzipcode",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/socolissimo/ajax/getcitynamebyzipcode/country/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25277274do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/advancedreviews/proscons/updatepager/reviews/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25276490do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/ajaxcart/opt/index/ajax_option/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25275122do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/payitsimple/payment/successAsync/InstallmentPlanNumber/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25273651do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/clnews/index/index/tag/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25276473do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/outofstocksubscription/index/index/product/1/mobile/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25276858do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/ajaxcart/index/index/id/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25276129do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/sociallogin/index/index",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/mesdevis/index/save/visiteur_id/1/customer_id_devis/1/avancement_link/1/customer_email/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25274219do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/sociallogin/index/index/loginRadiusKey/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25277813do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/combine/index/index/id/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25271857do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/quickview/index/view/path/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25272537do",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1sZW5ndGglM2E0OCUyMGxlbmd0aCUzYTI2JTIwbGVuZ3RoJTNhNDAlMjBsZW5ndGglM2EyNCUyMGxlbmd0aCUzYTM2/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1NsaWRlcy1Gb3ItV2lkZS1EcmF3ZXJzP2FmPXNwZWNpYWxmZWF0dXJlcyUzYWxvY2tvdXQlMjBzcGVjaWFsZmVhdHVyZXMlM2Fjb3Jyb3Npb25yZXNpc3RhbnQlMjBsZW5ndGglM2EyOCUyMGxlbmd0aCUzYTIwJTIwbWFya2V0JTNhaW5kdXN0cmlhbA==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tb3VudGluZyUzYXBvY2tldGJheW9uZXQlMjBsZW5ndGglM2EyNiUyMGxlbmd0aCUzYTMyJTIwbGVuZ3RoJTNhMTYlMjBsZW5ndGglM2E0MA==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPWxlbmd0aCUzYTE0JTIwbGVuZ3RoJTNhMjAlMjBzcGVjaWFsZmVhdHVyZXMlM2FzZWxmY2xvc2UlMjBzcGVjaWFsZmVhdHVyZXMlM2F0b3VjaHJlbGVhc2UlMjBjYXQxJTNhbGlnaHRkdXR5MTM5bGJzb3JsZXNzJTIwbWFya2V0JTNhd29vZGNhYmluZXRyeSUyMG1hcmtldCUzYWluZHVzdHJpYWwlMjBtb3VudGluZyUzYXNpZGVtb3VudA==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1zcGVjaWFsZmVhdHVyZXMlM2Fsb2NraW4lMjBsZW5ndGglM2E0MiUyMGxlbmd0aCUzYTI4JTIwbGVuZ3RoJTNhMzAlMjBsZW5ndGglM2EzMg==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/catalog/product/view/_ignore_category/1/id/3370/s/c4035-light-duty-ultra-quiet-slide",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPWxvYWRyYXRpbmclM2E1MDExNDAwbGJzJTIwbGVuZ3RoJTNhMTYlMjBsZW5ndGglM2E0MCUyMGxlbmd0aCUzYTE5JTIwbW91bnRpbmclM2F1bmRlcm1vdW50JTIwbGVuZ3RoJTNhMjAlMjBtb3VudGluZyUzYXNpZGVtb3VudA==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1zcGVjaWFsZmVhdHVyZXMlM2Fsb2NraW4lMjBsZW5ndGglM2ExOCUyMGxlbmd0aCUzYTQ4JTIwbGVuZ3RoJTNhMjQlMjBsZW5ndGglM2EyNg==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPWxlbmd0aCUzYTI2JTIwbW91bnRpbmclM2F2ZXJ0aWNhbG1vdW50JTIwbW91bnRpbmclM2F1bmRlcm1vdW50JTIwbGVuZ3RoJTNhMTYlMjBtYXJrZXQlM2F3b29kY2FiaW5ldHJ5JTIwbWFya2V0JTNhaW5kdXN0cmlhbA==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/data/cache/apache.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/include/dialog/select_images_post.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/images/icons/twiter_icon.png",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1zcGVjaWFsZmVhdHVyZXMlM2Fsb2NraW4lMjBsZW5ndGglM2EyNCUyMGxlbmd0aCUzYTQ4JTIwbGVuZ3RoJTNhMTYlMjBsZW5ndGglM2E0MA==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlLzEwJTIyLURyYXdlci1TbGlkZT9hZj1sZW5ndGglM2ExMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExMCUyMGxlbmd0aCUzYTEwJTIwbGVuZ3RoJTNhMTglMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTExJTIwbGVuZ3RoJTNhMTElMjBsZW5ndGglM2E1MCUyMGxlbmd0aCUzYTE2/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/products/7432",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tb3VudGluZyUzYXBvY2tldGJheW9uZXQlMjBsZW5ndGglM2ExNiUyMGxlbmd0aCUzYTQyJTIwbGVuZ3RoJTNhMjQlMjBsZW5ndGglM2ExMg==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/en-mx/resources/downloads/technical-sheets/industrial-electromechanical",
    destination: "/en-us/resources",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tYXJrZXQlM2F1dGlsaXR5dmVoaWNsZXMlMjBsZW5ndGglM2E0MiUyMGxlbmd0aCUzYTIyJTIwbGVuZ3RoJTNhMjYlMjBsZW5ndGglM2EyOA==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tb3VudGluZyUzYXBvY2tldGJheW9uZXQlMjBsZW5ndGglM2ExNCUyMGxlbmd0aCUzYTI4JTIwbGVuZ3RoJTNhMTYlMjBsZW5ndGglM2EzMA==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tb3VudGluZyUzYXBvY2tldGJheW9uZXQlMjBsZW5ndGglM2ExMCUyMGxlbmd0aCUzYTE2JTIwbGVuZ3RoJTNhNjAlMjBsZW5ndGglM2EyMg==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPWxlbmd0aCUzYTI4JTIwbWFya2V0JTNhbWVkaWNhbCUyMGNhdDElM2FsaWdodGR1dHkxMzlsYnNvcmxlc3MlMjBtYXJrZXQlM2F3b29kY2FiaW5ldHJ5JTIwc2lkZXNwYWNlJTNhNTAlMjBtb3VudGluZyUzYXNpZGVtb3VudA==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/markets/%2522%2520aria-label=",
    destination: "/en-us/markets/access-control-solutions",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPW1hcmtldCUzYWluZHVzdHJpYWwlMjBzcGVjaWFsZmVhdHVyZXMlM2F0b3VjaHJlbGVhc2UlMjBzcGVjaWFsZmVhdHVyZXMlM2Fjb3Jyb3Npb25yZXNpc3RhbnQlMjBsb2FkcmF0aW5nJTNhMDEwMGxicyUyMG1hcmtldCUzYWFlcm9zcGFjZXdhdGVyY3JhZnQlMjBtYXJrZXQlM2F3b29kY2FiaW5ldHJ5/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/_next/static/1u8qdp1w2it8ejk5mgdwr/_buildmanifest.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tb3VudGluZyUzYXBvY2tldGJheW9uZXQlMjBsZW5ndGglM2EzNiUyMGxlbmd0aCUzYTI4JTIwbGVuZ3RoJTNhMjYlMjBsZW5ndGglM2EyMg==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tb3VudGluZyUzYXNpZGVtb3VudCUyMGxlbmd0aCUzYTMwJTIwbGVuZ3RoJTNhMjYlMjBsZW5ndGglM2ExNiUyMGxlbmd0aCUzYTYw/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/data/admin/allowurl.txt",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1zcGVjaWFsZmVhdHVyZXMlM2Fsb2NraW4lMjBsZW5ndGglM2ExNiUyMGxlbmd0aCUzYTE4JTIwbGVuZ3RoJTNhMjYlMjBsZW5ndGglM2EyMg==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1sZW5ndGglM2E0OCUyMGxlbmd0aCUzYTMyJTIwbGVuZ3RoJTNhMjQlMjBsZW5ndGglM2E0MCUyMGxlbmd0aCUzYTU0/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tYXJrZXQlM2FlbGVjdHJvbWVjaGFuaWNhbCUyMGxlbmd0aCUzYTMyJTIwbGVuZ3RoJTNhNDglMjBsZW5ndGglM2ExNiUyMGxlbmd0aCUzYTIy/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPW1hcmtldCUzYWFwcGxpYW5jZXMlMjBsZW5ndGglM2ExNCUyMGxlbmd0aCUzYTYlMjBsZW5ndGglM2EyMSUyMGxlbmd0aCUzYTE2JTIwY2F0MSUzYWxpZ2h0ZHV0eTEzOWxic29ybGVzcyUyMGNhdDElM2FvZW0=/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tb3VudGluZyUzYXBvY2tldGJheW9uZXQlMjBsZW5ndGglM2EyNCUyMGxlbmd0aCUzYTU0JTIwbGVuZ3RoJTNhMTYlMjBsZW5ndGglM2E0MA==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGU/YWY9bGVuZ3RoJTNhNDAlMjBsZW5ndGglM2E2MCUyMG1vdW50aW5nJTNhc2lkZW1vdW50JTIwbGVuZ3RoJTNhNTQlMjBsZW5ndGglM2EyMA==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1sZW5ndGglM2E2MCUyMGxlbmd0aCUzYTQwJTIwbGVuZ3RoJTNhMjYlMjBsZW5ndGglM2EyNCUyMGxlbmd0aCUzYTI4/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPWxlbmd0aCUzYTI0JTIwY2F0MSUzYWxpZ2h0ZHV0eTEzOWxic29ybGVzcyUyMG1hcmtldCUzYW1lZGljYWwlMjBtYXJrZXQlM2F3b29kY2FiaW5ldHJ5JTIwc2lkZXNwYWNlJTNhNTAlMjBtYXJrZXQlM2FpbmR1c3RyaWFsJTIwbW91bnRpbmclM2FzaWRlbW91bnQ=/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//wp-includes/ID3/license.txt",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us//2021/wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPW1hcmtldCUzYWFwcGxpYW5jZXMlMjBzcGVjaWFsZmVhdHVyZXMlM2FkZXRlbnRvdXQlMjBzcGVjaWFsZmVhdHVyZXMlM2F0b3VjaHJlbGVhc2UlMjBsZW5ndGglM2EyNiUyMGNhdDElM2FsaWdodGR1dHkxMzlsYnNvcmxlc3MlMjBtYXJrZXQlM2F3b29kY2FiaW5ldHJ5JTIwc2lkZXNwYWNlJTNhNTAlMjBtYXJrZXQlM2FpbmR1c3RyaWFs/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktU2xpZGVzP2FmPW1hcmtldCUzYWVtZXJnZW5jeXZlaGljbGVzJTIwY2F0MSUzYWhlYXZ5ZHV0eTE3MGxic3RvMTMyM2xicyUyMG1hcmtldCUzYWFlcm9zcGFjZXdhdGVyY3JhZnQlMjBsZW5ndGglM2E2MCUyMG1hcmtldCUzYWluZHVzdHJpYWwlMjBtb3VudGluZyUzYWZsYXRtb3VudA==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/your-friend-accuride/oem-edition",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/customer/account/login/referer/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL3ByaXZhY3k%252C",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1sZW5ndGglM2E0MCUyMGxlbmd0aCUzYTE0JTIwbGVuZ3RoJTNhMjYlMjBsZW5ndGglM2ExNiUyMGxlbmd0aCUzYTM2/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPWxvYWRyYXRpbmclM2EwMTAwbGJzJTIwbGVuZ3RoJTNhMjAlMjBzcGVjaWFsZmVhdHVyZXMlM2FzZWxmY2xvc2UlMjBzcGVjaWFsZmVhdHVyZXMlM2F0b3VjaHJlbGVhc2UlMjBjYXQxJTNhbGlnaHRkdXR5MTM5bGJzb3JsZXNzJTIwbWFya2V0JTNhd29vZGNhYmluZXRyeSUyMG1hcmtldCUzYWluZHVzdHJpYWwlMjBtb3VudGluZyUzYXNpZGVtb3VudA==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/wp-admin/images/xleet.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/wp-admin/maint/xleet.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/wp-admin/meta/xleet.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/wp-admin/network/xleet.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/wp-admin/user/xleet.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/wp-admin/includes/xleet.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/wp-admin/css/xleet.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/wp-includes/xleet.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1sZW5ndGglM2ExNCUyMGxlbmd0aCUzYTM2JTIwbGVuZ3RoJTNhMjQlMjBsZW5ndGglM2EyMiUyMGxlbmd0aCUzYTMy/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPWxlbmd0aCUzYTIyJTIwbGVuZ3RoJTNhMjYlMjBsZW5ndGglM2ExNiUyMGxlbmd0aCUzYTIwJTIwbW91bnRpbmclM2F1bmRlcm1vdW50/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/products/3832ec-easy-close",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGU/YWY9c3BlY2lhbGZlYXR1cmVzJTNhdG91Y2hyZWxlYXNlJTIwbGVuZ3RoJTNhNDglMjBsZW5ndGglM2ExOCUyMGxlbmd0aCUzYTU0JTIwbGVuZ3RoJTNhMjYlMjBsZW5ndGglM2EyMg==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlLzEwJTIyLURyYXdlci1TbGlkZT9hZj1sZW5ndGglM2ExMCUyMGxlbmd0aCUzYTEwJTIwbGVuZ3RoJTNhMTMlMjBsZW5ndGglM2ExMSUyMGxlbmd0aCUzYTEwJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTEzJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTEyJTIwbGVuZ3RoJTNhNTclMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMTElMjBsZW5ndGglM2E4JTIwbGVuZ3RoJTNhMzklMjBsZW5ndGglM2EyMw==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1zcGVjaWFsZmVhdHVyZXMlM2Fsb2NraW4lMjBsZW5ndGglM2E0MiUyMGxlbmd0aCUzYTE2JTIwbGVuZ3RoJTNhNDglMjBsZW5ndGglM2E1NA==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPWxlbmd0aCUzYTIyJTIwbGVuZ3RoJTNhMzIlMjBsZW5ndGglM2ExOSUyMGxlbmd0aCUzYTE2JTIwY2F0MSUzYWxpZ2h0ZHV0eTEzOWxic29ybGVzcyUyMGNhdDElM2FvZW0=/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1sZW5ndGglM2ExNCUyMGxlbmd0aCUzYTIwJTIwbGVuZ3RoJTNhNDglMjBsZW5ndGglM2ExNg==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/safeview-redirect/tc_frame.html",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/markets/appliances",
    destination: "/en-us/markets/appliance",
    permanent: true,
  },
  {
    source: "/en-us/sales/order/history",
    destination: "/en-us/customer/account",
    permanent: true,
  },
  {
    source: "/en-us/products/3634-medium-duty-over-travel-slide",
    destination: "/en-us/products/3634-heavy-duty-over-travel-slide",
    permanent: true,
  },
  {
    source: "/en-us/markets/emergency.png",
    destination: "/en-us/markets/emergency-vehicles",
    permanent: true,
  },
  {
    source: "/en-us/markets/2n78WWi8SOmOBtRh7ADs.jpg",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/markets/automotive.png",
    destination: "/en-us/markets/automotive-movement-solutions",
    permanent: true,
  },
  {
    source: "/en-us/OEM-Direct/contact-the-oem-direct-team.asp",
    destination: "/en-us/company/oem-direct#aias-contact-form",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tb3VudGluZyUzYXNpZGVtb3VudCUyMGxlbmd0aCUzYTYwJTIwbGVuZ3RoJTNhNDIlMjBsZW5ndGglM2ExNiUyMGxlbmd0aCUzYTIy/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/markets/42XtK1s1T265px5gWE9H.jpg",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPW1hcmtldCUzYWFwcGxpYW5jZXMlMjBsZW5ndGglM2ExNSUyMGxlbmd0aCUzYTI4JTIwbGVuZ3RoJTNhMTMlMjBsZW5ndGglM2E0MCUyMG1hcmtldCUzYWhvbWVvd25lcnM=/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPWxlbmd0aCUzYTE2JTIwY2F0MSUzYWxpZ2h0ZHV0eTEzOWxic29ybGVzcyUyMGxlbmd0aCUzYTEyJTIwbW91bnRpbmclM2F2ZXJ0aWNhbG1vdW50JTIwbW91bnRpbmclM2FmbGF0bW91bnQlMjBtb3VudGluZyUzYXVuZGVybW91bnQlMjBtYXJrZXQlM2F3b29kY2FiaW5ldHJ5/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/markets/machinery.png",
    destination: "/en-us/markets/machinery-equipment-solutions",
    permanent: true,
  },
  {
    source: "/en-us/markets/Qv5R6czkR0mv8iVeWCBa.jpg",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlLzEwJTIyLURyYXdlci1TbGlkZS8xMj9hZj1sZW5ndGglM2ExMCUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMTMlMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTEzJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTEyJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExNyUyMGxlbmd0aCUzYTEwJTIwbGVuZ3RoJTNhMTElMjBsZW5ndGglM2ExMSUyMGxlbmd0aCUzYTE1JTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTEwJTIwbGVuZ3RoJTNhNTYlMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMTAlMjBsZW5ndGglM2EzMiUyMGxlbmd0aCUzYTI1JTIwbGVuZ3RoJTNhMzI=/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlLzEwJTIyLURyYXdlci1TbGlkZT9hZj1sZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMTAlMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMTElMjBsZW5ndGglM2ExMCUyMGxlbmd0aCUzYTI3JTIwbGVuZ3RoJTNhMTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMiUyMGxlbmd0aCUzYTEwJTIwbGVuZ3RoJTNhMTAlMjBsZW5ndGglM2ExMSUyMGxlbmd0aCUzYTEyJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTEwJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTMyJTIwbGVuZ3RoJTNhMzMlMjBsZW5ndGglM2EyMw==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/markets/automation.png",
    destination: "/en-us/markets/automation-movement-solutions",
    permanent: true,
  },
  {
    source: "/en-us/markets/7JImhortToiR5IyYlyp9.jpg",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/integrated-access-solutions/2017/05/18/hello-world",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/markets/access_control.png",
    destination: "/en-us/markets/access-control-solutions",
    permanent: true,
  },
  {
    source: "/en-us/markets/homeowners.png",
    destination: "/en-us/markets/residential-domestic-applications",
    permanent: true,
  },
  {
    source: "/en-us/resources/quality/hpd-collaborative",
    destination: "/en-us/company/why-accuride",
    permanent: true,
  },
  {
    source: "/en-us/markets/P8sFVesTle4qmsCQlzcm.jpg",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/markets/corrosion-resistant-small.jpg",
    destination: "/en-us/search?keyword=corrosion,%20resistant",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/products/3834esc-self-closing",
    destination:
      "/en-us/products/3834esc-light-duty-over-travel-slide-with-self-close-and-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-us/resources/application-solutions/appliances/custom-designed-slides-in-refrigerated-drawers",
    destination: "/en-us/markets/appliance",
    permanent: true,
  },
  {
    source: "/en-us/company/oem-direct/%2522%2520aria-label=",
    destination: "/en-us/company/oem-direct",
    permanent: true,
  },
  {
    source: "/en-us/en-mx/products/3634ec-ie",
    destination:
      "/en-us/products/3634ec-medium-duty-over-travel-slide-with-easy-close",
    permanent: true,
  },
  {
    source: "/en-us/senseon/(.*)",
    destination: "/en-us/markets/access-control-solutions",
    permanent: true,
  },
  {
    source: "/en-us/shop/distributors",
    destination: "/en-us/distributors",
    permanent: true,
  },
  {
    source: "/en-us/blog/category/automotive",
    destination: "/en-us/blog/category/case-study/automotive",
    permanent: true,
  },
  {
    source: "/en-us/wp-includes/wlwmanifest.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/rss/ie.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/rss/rss.xml",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/wp-admin/css/colors",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/docker/postgres/.env.env",
    destination: "/en-us/products/specialty-slides/pocket-bayonet-slides",
    permanent: true,
  },
  {
    source:
      "/en-us/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlLzEwJTIyLURyYXdlci1TbGlkZT9hZj1jYXQxJTNhbWVkaXVtZHV0eTE0MHRvMTY5bGJzJTIwbGVuZ3RoJTNhOCUyMGxlbmd0aCUzYTEwJTIwbGVuZ3RoJTNhMTAlMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExMSUyMGxlbmd0aCUzYTExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTMwJTIwbGVuZ3RoJTNhNDclMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2EzNyUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTMlMjBsZW5ndGglM2ExMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTExJTIwbGVuZ3RoJTNhMTUlMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhNTclMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMQ==/product/2930",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/Images/Products/Woodworking/PICLG/TV_Swivel_CB3620-258TV_pic_lg.jpg",
    destination: "/en-us/products/cb3620-heavy-duty-slide-with-pull-out-access",
    permanent: true,
  },
  {
    source: "/en-us/stalker_portal/server/tools/auth_simple.php",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/_ignition/health-check",
    destination: "/en-us/products/shop",
    permanent: true,
  },
  {
    source: "/en-us/public/_ignition/health-check",
    destination: "/en-us/products/shop",
    permanent: true,
  },
  {
    source: "/en-us/markets/tel:562.903.0200",
    destination: "/en-us/markets/aerospace-watercraft-solutions",
    permanent: true,
  },
  {
    source: "/en-us/js/varien/payment.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/pub/static/deployed_version.txt",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/pub/static/frontend/Magento/luma/en_US/js-translation.json",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/skin/adminhtml/default/default/boxes.css",
    destination: "/en-us",
    permanent: true,
  },
  {
    source:
      "/en-us/pub/static/frontend/Magento/luma/en_US/Magento_Ui/js/lib/view/utils/async.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/js/mage/adminhtml/product.js",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/global/about/careers.asp",
    destination: "/en-us/company/careers",
    permanent: true,
  },
  {
    source: "/en-us//assets/images/shadow.png",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/products/shop/60-34-aerospace_watercraft-homeowners",
    destination: "/en-us/products/shop",
    permanent: true,
  },
  {
    source: "/en-us/products/shop/94_5-34-31-21-36-48-22-10-60",
    destination: "/en-us/products/shop",
    permanent: true,
  },
  {
    source: "/en-us/products/shop/54-42-31-17-6-19",
    destination: "/en-us/products/shop",
    permanent: true,
  },
  {
    source: "/en-us/products/shop/10-16-28",
    destination: "/en-us/products/shop",
    permanent: true,
  },
  {
    source: "/en-us/products/shop/94-21-22-47-30-40-26-18",
    destination: "/en-us/products/shop",
    permanent: true,
  },
  {
    source: "/en-us/products/115rc-brackets-for-mounting-doors",
    destination: "/en-us/products/115rc-10mm-mounting-brackets",
    permanent: true,
  },
  {
    source: "/en-us/resources/downloads/cads/woodworking-cabinetry",
    destination: "/en-us/markets/woodworking-cabinetry",
    permanent: true,
  },
  {
    source:
      "/en-us/blog/senseon/notable-tech-journal-spotlights-accurides-senseon-secure-access/feed",
    destination: "/en-us/blog",
    permanent: true,
  },
  {
    source: "/en-us/28-42-20-23-12-transportation",
    destination: "/en-us/markets/transportation-solutions",
    permanent: true,
  },
  {
    source: "/en-us/products/3832e-classic-ie",
    destination:
      "/en-us/products/3832e-light-duty-full-extension-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/eclipse",
    destination: "/en-us/products/3135ec-eclipse-easy-close-undermount-slide",
    permanent: true,
  },
  {
    source: "/en-us/products/3834e",
    destination:
      "/en-us/products/3834e-light-duty-over-travel-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/products/3832etr-touch-release",
    destination:
      "/en-us/products/3832etr-light-duty-touch-release-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-us/resources/application-solutions/woodworking-cabinetry/under-staircase-storage-solutions",
    destination: "/en-us/markets/woodworking-cabinetry",
    permanent: true,
  },
  {
    source: "/en-us/products/7957",
    destination: "/en-us/products/7957-heavy-duty-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/products/1155-easy-down",
    destination:
      "/en-us/products/c1155-easy-down-light-duty-slide-with-easy-close-for-flipper-doors",
    permanent: true,
  },
  {
    source: "/en-us/products/1234",
    destination:
      "/en-us/products/1234-light-duty-slide-for-pocket-doors-without-hinges",
    permanent: true,
  },
  {
    source: "/en-us/pocketdoors",
    destination: "/en-us/products/specialty-slides/flipper-door-slides",
    permanent: true,
  },
  {
    source: "/en-us/resources/how-tos/design-considerations",
    destination: "/en-us/resources/about-slides",
    permanent: true,
  },
  {
    source: "/en-us/blog/events",
    destination: "/en-us/blog",
    permanent: true,
  },
  {
    source: "/en-us/admin",
    destination: "/en-us",
    permanent: true,
  },
  {
    source: "/en-us/products/7950",
    destination:
      "/en-us/products/7950-heavy-duty-full-extension-non-disconnect-slide",
    permanent: true,
  },
  {
    source:
      "/en-us/products/3634ec-medium-duty-over-travel-slide-with-easy-close",
    destination:
      "/en-us/products/drawer-slide-3634ec-heavy-duty-over-travel-slide-with-easy-close",
    permanent: true,
  },
  {
    source: "/en-us/products/3320-pocket-bayonet-ie",
    destination: "/en-us/products/3320-medium-duty-pocket-bayonet-slide",
    permanent: true,
  },
  {
    source:
      "/en-us/products/ch3832e-light-duty-weather-resistant-slide-with-lever-disconnect",
    destination:
      "/en-us/products/ch3832-light-duty-full-extension-and-weather-resistant-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/products/3357-ie",
    destination:
      "/en-us/products/3357-medium-duty-over-travel-slide-with-latch-disconnect-and-detent-in",
    permanent: true,
  },
  {
    source:
      "/en-us/products/drawer-slides/medium-duty-slides/115rc-linear-track-system",
    destination: "/en-us/products/115rc-medium-duty-linear-track-system",
    permanent: true,
  },
  {
    source: "/en-us/products/fg115-linear-motion-friction-guides",
    destination:
      "/en-us/products/fg115-light-duty-linear-friction-guide-system",
    permanent: true,
  },
  {
    source: "/en-us/products/115-linear-motion-ie",
    destination: "/en-us/products/115rc-medium-duty-linear-track-system",
    permanent: true,
  },
  {
    source: "/en-us/products/3634ec-ie",
    destination:
      "/en-us/products/drawer-slide-3634ec-heavy-duty-over-travel-slide-with-easy-close",
    permanent: true,
  },
  {
    source: "/en-us/products/3832edo",
    destination:
      "/en-us/products/3832edo-light-duty-full-extension-slide-with-detent-out-and-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/products/access-control-solutions",
    destination: "/en-us/markets/access-control-solutions",
    permanent: true,
  },
  {
    source: "/en-us/products/3135ec-eclipse-easy-close/.git/HEAD",
    destination: "/en-us/products/3135ec-eclipse-easy-close-undermount-slide",
    permanent: true,
  },
  {
    source: "/en-us/products/1432-cable-system/.git/HEAD",
    destination:
      "/en-us/products/1432-light-duty-slide-for-tall-pocket-doors-without-hinges",
    permanent: true,
  },
  {
    source: "/en-us/products/1332-cable-system/.git/HEAD",
    destination:
      "/en-us/products/cb1332-light-duty-slide-for-tall-pocket-doors-with-hinges",
    permanent: true,
  },
  {
    source: "/en-us/products/1321-pro-pocket-pro-pocket/.git/HEAD",
    destination:
      "/en-us/products/cb1321-pro-pocket-slide-for-pocket-and-flipper-doors-auto-open",
    permanent: true,
  },
  {
    source: "/en-us/products/115rc-linear-track-system/.git/HEAD",
    destination: "/en-us/products/115rc-medium-duty-linear-track-system",
    permanent: true,
  },
  {
    source: "/en-us/support",
    destination: "/en-us/contact",
    permanent: true,
  },
  {
    source: "/en-us/markets/transportation-solutions",
    destination:
      "/en-us/markets/emergency-recreational-vehicle-equipment-storage",
    permanent: true,
  },
  {
    source: "/en-us/markets/emergency-vehicles",
    destination:
      "/en-us/markets/emergency-recreational-vehicle-equipment-storage",
    permanent: true,
  },
  {
    source: "/en-us/products/9308ez-release-system-lock-in-lock-out",
    destination: "/en-us/products/ez-release-system-lock-in-lock-out",
    permanent: true,
  },
  {
    source:
      "/en-us/products/specialty-slides/9308ez-release-system-lock-in-lock-out",
    destination:
      "/en-us/products/specialty-slides/ez-release-system-lock-in-lock-out",
    permanent: true,
  },
  {
    source: "/en-us/checkout",
    destination: "/en-us",
    permanent: true,
  },
  // {
  //     source: '/en-us/products/st8200-NSF-certified-heavy-duty-roller-bearing-side-mount-slide',
  //     destination: '/en-us/products/st8200-nsf-certified-heavy-duty-roller-bearing-side-mount-slide',
  //     permanent: true,
  // },
  //========================Redirections for Canada store===========================
  // {
  //     source: '/en-ca/products/st8200-NSF-certified-heavy-duty-roller-bearing-side-mount-slide',
  //     destination: '/en-ca/products/st8200-nsf-certified-heavy-duty-roller-bearing-side-mount-slide',
  //     permanent: true,
  // },
  {
    source: "/en-ca/checkout",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/products/specialty-slides/9308ez-release-system-lock-in-lock-out",
    destination:
      "/en-ca/products/specialty-slides/ez-release-system-lock-in-lock-out",
    permanent: true,
  },
  {
    source: "/en-ca/products/9308ez-release-system-lock-in-lock-out",
    destination: "/en-ca/products/ez-release-system-lock-in-lock-out",
    permanent: true,
  },
  {
    source: "/en-ca/markets/transportation-solutions",
    destination:
      "/en-ca/markets/emergency-recreational-vehicle-equipment-storage",
    permanent: true,
  },
  {
    source: "/en-ca/markets/emergency-vehicles",
    destination:
      "/en-ca/markets/emergency-recreational-vehicle-equipment-storage",
    permanent: true,
  },
  {
    source: "/en-ca/products/115rc-linear-track-system/.git/HEAD",
    destination: "/en-ca/products/115rc-medium-duty-linear-track-system",
    permanent: true,
  },
  {
    source: "/en-ca/products/1321-pro-pocket-pro-pocket/.git/HEAD",
    destination:
      "/en-ca/products/cb1321-pro-pocket-slide-for-pocket-and-flipper-doors-auto-open",
    permanent: true,
  },
  {
    source: "/en-ca/products/1332-cable-system/.git/HEAD",
    destination:
      "/en-ca/products/cb1332-light-duty-slide-for-tall-pocket-doors-with-hinges",
    permanent: true,
  },
  {
    source: "/en-ca/products/1432-cable-system/.git/HEAD",
    destination:
      "/en-ca/products/1432-light-duty-slide-for-tall-pocket-doors-without-hinges",
    permanent: true,
  },
  {
    source: "/en-ca/products/3135ec-eclipse-easy-close/.git/HEAD",
    destination: "/en-ca/products/3135ec-eclipse-easy-close-undermount-slide",
    permanent: true,
  },
  {
    source: "/en-ca/products/access-control-solutions",
    destination: "/en-ca/markets/access-control-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/products/3832edo",
    destination:
      "/en-ca/products/3832edo-light-duty-full-extension-slide-with-detent-out-and-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/products/3634ec-ie",
    destination:
      "/en-ca/products/drawer-slide-3634ec-heavy-duty-over-travel-slide-with-easy-close",
    permanent: true,
  },
  {
    source: "/en-ca/products/115-linear-motion-ie",
    destination: "/en-ca/products/115rc-medium-duty-linear-track-system",
    permanent: true,
  },
  {
    source: "/en-ca/products/fg115-linear-motion-friction-guides",
    destination:
      "/en-ca/products/fg115-light-duty-linear-friction-guide-system",
    permanent: true,
  },
  {
    source:
      "/en-ca/products/drawer-slides/medium-duty-slides/115rc-linear-track-system",
    destination: "/en-ca/products/115rc-medium-duty-linear-track-system",
    permanent: true,
  },
  {
    source: "/en-ca/products/3357-ie",
    destination:
      "/en-ca/products/3357-medium-duty-over-travel-slide-with-latch-disconnect-and-detent-in",
    permanent: true,
  },
  {
    source:
      "/en-ca/products/ch3832e-light-duty-weather-resistant-slide-with-lever-disconnect",
    destination:
      "/en-ca/products/ch3832-light-duty-full-extension-and-weather-resistant-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/products/3320-pocket-bayonet-ie",
    destination: "/en-ca/products/3320-medium-duty-pocket-bayonet-slide",
    permanent: true,
  },
  {
    source:
      "/en-ca/products/3634ec-medium-duty-over-travel-slide-with-easy-close",
    destination:
      "/en-ca/products/drawer-slide-3634ec-heavy-duty-over-travel-slide-with-easy-close",
    permanent: true,
  },
  {
    source: "/en-ca/products/7950",
    destination:
      "/en-ca/products/7950-heavy-duty-full-extension-non-disconnect-slide",
    permanent: true,
  },
  {
    source: "/en-ca/admin",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/blog/events",
    destination: "/en-ca/blog",
    permanent: true,
  },
  {
    source: "/en-ca/resources/how-tos/design-considerations",
    destination: "/en-ca/resources/about-slides",
    permanent: true,
  },
  {
    source: "/en-ca/pocketdoors",
    destination: "/en-ca/products/specialty-slides/flipper-door-slides",
    permanent: true,
  },
  {
    source: "/en-ca/products/1234",
    destination:
      "/en-ca/products/1234-light-duty-slide-for-pocket-doors-without-hinges",
    permanent: true,
  },
  {
    source: "/en-us/products/1155-easy-down",
    destination:
      "/en-us/products/c1155-easy-down-light-duty-slide-with-easy-close-for-flipper-doors",
    permanent: true,
  },
  {
    source: "/en-ca/products/7957",
    destination: "/en-ca/products/7957-heavy-duty-with-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-ca/resources/application-solutions/woodworking-cabinetry/under-staircase-storage-solutions",
    destination: "/en-ca/markets/woodworking-cabinetry",
    permanent: true,
  },
  {
    source: "/en-ca/products/3832etr-touch-release",
    destination:
      "/en-ca/products/3832etr-light-duty-touch-release-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/products/3834e",
    destination:
      "/en-ca/products/3834e-light-duty-over-travel-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/eclipse",
    destination: "/en-ca/products/3135ec-eclipse-easy-close-undermount-slide",
    permanent: true,
  },
  {
    source: "/en-ca/products/3832e-classic-ie",
    destination:
      "/en-ca/products/3832e-light-duty-full-extension-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/28-42-20-23-12-transportation",
    destination: "/en-ca/markets/transportation-solutions",
    permanent: true,
  },
  {
    source:
      "/en-ca/blog/senseon/notable-tech-journal-spotlights-accurides-senseon-secure-access/feed",
    destination: "/en-ca/blog",
    permanent: true,
  },
  {
    source: "/en-ca/resources/downloads/cads/woodworking-cabinetry",
    destination: "/en-ca/markets/woodworking-cabinetry",
    permanent: true,
  },
  {
    source: "/en-ca/products/115rc-brackets-for-mounting-doors",
    destination: "/en-ca/products/115rc-10mm-mounting-brackets",
    permanent: true,
  },
  {
    source: "/en-ca/products/shop/94-21-22-47-30-40-26-18",
    destination: "/en-ca/products/shop",
    permanent: true,
  },
  {
    source: "/en-ca/products/shop/10-16-28",
    destination: "/en-ca/products/shop",
    permanent: true,
  },
  {
    source: "/en-ca/products/shop/54-42-31-17-6-19",
    destination: "/en-ca/products/shop",
    permanent: true,
  },
  {
    source: "/en-ca/products/shop/94_5-34-31-21-36-48-22-10-60",
    destination: "/en-ca/products/shop",
    permanent: true,
  },
  {
    source: "/en-ca/products/shop/60-34-aerospace_watercraft-homeowners",
    destination: "/en-ca/products/shop",
    permanent: true,
  },
  {
    source: "/en-ca//assets/images/shadow.png",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/global/about/careers.asp",
    destination: "/en-ca/company/careers",
    permanent: true,
  },
  {
    source: "/en-ca/js/mage/adminhtml/product.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/pub/static/frontend/Magento/luma/en_US/Magento_Ui/js/lib/view/utils/async.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/skin/adminhtml/default/default/boxes.css",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/pub/static/frontend/Magento/luma/en_US/js-translation.json",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/pub/static/deployed_version.txt",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/js/varien/payment.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/markets/tel:562.903.0200",
    destination: "/en-ca/markets/aerospace-watercraft-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/public/_ignition/health-check",
    destination: "/en-ca/products/shop",
    permanent: true,
  },
  {
    source: "/en-ca/_ignition/health-check",
    destination: "/en-ca/products/shop",
    permanent: true,
  },
  {
    source: "/en-ca/stalker_portal/server/tools/auth_simple.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/Images/Products/Woodworking/PICLG/TV_Swivel_CB3620-258TV_pic_lg.jpg",
    destination: "/en-ca/products/cb3620-heavy-duty-slide-with-pull-out-access",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlLzEwJTIyLURyYXdlci1TbGlkZT9hZj1jYXQxJTNhbWVkaXVtZHV0eTE0MHRvMTY5bGJzJTIwbGVuZ3RoJTNhOCUyMGxlbmd0aCUzYTEwJTIwbGVuZ3RoJTNhMTAlMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExMSUyMGxlbmd0aCUzYTExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTMwJTIwbGVuZ3RoJTNhNDclMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2EzNyUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTMlMjBsZW5ndGglM2ExMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTExJTIwbGVuZ3RoJTNhMTUlMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhNTclMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMQ==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/docker/postgres/.env.env",
    destination: "/en-ca/products/specialty-slides/pocket-bayonet-slides",
    permanent: true,
  },
  {
    source: "/en-ca/wp-admin/css/colors",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/rss/rss.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/rss/ie.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/blog/category/automotive",
    destination: "/en-ca/blog/category/case-study/automotive",
    permanent: true,
  },
  {
    source: "/en-ca/blog/author/ehicks",
    destination: "/en-ca/blog",
    permanent: true,
  },
  {
    source: "/en-ca/Woodworking/Product/Details.asp",
    destination: "/en-ca/search?keyword=Woodworking",
    permanent: true,
  },
  {
    source: "/en-ca/Industrial/Product/Details.asp",
    destination: "/en-ca/search?keyword=Industrial",
    permanent: true,
  },
  {
    source: "/en-ca/uploads/products/pdf/cbmac-050-n-0405.pdf",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/support/shipping/index.html",
    destination: "/en-ca/support/shipping",
    permanent: true,
  },
  {
    source: "/en-ca/search%253Fkeyword%253D38/%2526page%253D2",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/resources/videos/index.html",
    destination: "/en-ca/search/videos?keyword=video",
    permanent: true,
  },
  {
    source: "/en-ca/resources/faqs/index.html",
    destination: "/en-ca/resources/faqs",
    permanent: true,
  },
  {
    source: "/en-ca/resources/cads/index.html",
    destination: "/en-ca/resources/cads",
    permanent: true,
  },
  {
    source: "/en-ca/product-catalog/results",
    destination: "/en-ca/products/shop",
    permanent: true,
  },
  {
    source: "/en-ca/markets/other-industries",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/markets/appliance/index.html",
    destination: "/en-ca/markets/appliance",
    permanent: true,
  },
  {
    source: "/en-ca/Industrial/Spotlights",
    destination: "/en-ca/blog/category/industrial",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/products/6331-aero-iii-oem",
    destination:
      "/en-ca/products/6331-aero-iii-light-duty-undermount-slide-with-full-customization",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/products/3017",
    destination:
      "/en-ca/products/3017-light-duty-slide-with-over-travel-and-rail-mounting",
    permanent: true,
  },
  {
    source: "/en-ca/distributors/%22",
    destination: "/en-ca/distributors",
    permanent: true,
  },
  {
    source: "/en-ca/customer/section/load",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/customer/createaccount%253Fguest%253D",
    destination: "/en-ca/customer/login",
    permanent: true,
  },
  {
    source: "/en-ca/covid19-update/index.html",
    destination: "/en-ca/covid19-update",
    permanent: true,
  },
  {
    source: "/en-ca/contacts/distributor-locator",
    destination: "/en-ca/distributors",
    permanent: true,
  },
  {
    source: "/en-ca/contact/general/index.html",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca/company/why-accuride/index.html",
    destination: "/en-ca/company/why-accuride",
    permanent: true,
  },
  {
    source: "/en-ca/company/oem-direct/index.html",
    destination: "/en-ca/company/oem-direct",
    permanent: true,
  },
  {
    source: "/en-ca/company/careers/index.html",
    destination: "/en-ca/company/careers",
    permanent: true,
  },
  {
    source:
      "/en-ca/catalogsearch/result/index/%253Fq%253Dproducts%252Bshop%252Bmore_than_75%252Baluminum%2526side_space%253D942",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/Woodworking/Spotlights",
    destination: "/en-ca/blog/category/woodworking-blogs",
    permanent: true,
  },
  {
    source: "/en-ca/36-94-15-21-18-20-oem",
    destination: "/en-ca/company/oem-direct",
    permanent: true,
  },
  {
    source: "/en-ca/products/shop/20-28-13-30-8-26-18-15-40-54-29",
    destination: "/en-ca/products/shop",
    permanent: true,
  },
  {
    source:
      "/en-ca/products/shop/28-between_50_and_75-more_than_75-medical-wood_cabinetry-homeowners",
    destination: "/en-ca/products/shop",
    permanent: true,
  },
  {
    source: "/en-ca/products/al0115-0120rc-aluminum-track",
    destination:
      "/en-ca/products/al0115-0120rch-aluminum-track-with-pre-drilled-holes",
    permanent: true,
  },
  {
    source: "/en-ca/category-5/category-5-1/category-5-1-2.html",
    destination: "/en-ca/products/shop",
    permanent: true,
  },
  {
    source: "/en-ca/Woodworking/Literature/Default.asp",
    destination: "/en-ca/blog/category/woodworking-blogs",
    permanent: true,
  },
  {
    source: "/en-ca/Resources/PDF/3132-r9-1107_.pdf",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/about/careers",
    destination: "/en-ca/company/careers",
    permanent: true,
  },
  {
    source: "/en-ca/about/corporate",
    destination: "/en-ca/company/about",
    permanent: true,
  },
  {
    source: "/en-ca/36-18-60-26-30-medical",
    destination: "/en-ca/markets/healthcare-environments",
    permanent: true,
  },
  {
    source: "/en-ca/25-12-14-42-75-truck_bodies",
    destination: "/en-ca/markets/transportation-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/10-14-18-36-16-transportation",
    destination: "/en-ca/markets/transportation-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/31-12-21-40-26-18-pocket_bayonet",
    destination: "/en-ca/search?keyword=pocket%20bayonet",
    permanent: true,
  },
  {
    source: "/en-ca/Images/BG/Logo.jpg",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/products/cb0115-easy-close-dampening-mechanism",
    destination: "/en-ca/products/cb0115-cassette-with-polymer-bearings",
    permanent: true,
  },
  {
    source: "/en-ca/distributors/%22",
    destination: "/en-ca/distributors",
    permanent: true,
  },
  {
    source: "/en-ca/wordpress/wp-admin",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/contacts",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca/products/specialty-slides/al0115-0120rc-aluminum-track",
    destination:
      "/en-ca/products/al0115-0120rch-aluminum-track-with-pre-drilled-holes",
    permanent: true,
  },
  {
    source:
      "/en-ca/products/al4120-super-heavy-duty-partial-extension-corrosion-resistant-slide",
    destination:
      "/en-ca/products/al4140-super-heavy-duty-corrosion-resistant-aluminum-slide",
    permanent: true,
  },
  {
    source: "/en-ca/news/wp-cron.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/news/iwf-atlanta-praises-accuride-internationals-new-online-store",
    destination: "/en-ca/news",
    permanent: true,
  },
  {
    source: "/en-ca/banner/ajax/load",
    destination: "/en-ca",
    permanent: true,
  },
  // {
  //     source: "/_next/data/W9QBixBxMwFMGq9AvAUvU/en-us.json",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  {
    source: "/en-ca/.well-known/security.txt",
    destination: "/en-ca",
    permanent: true,
  },
  // {
  //     source: "/_next/data/tx_EpOufSuXcaA7Piwpsn/en-us.json",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  {
    source: "/en-ca/news/category/press-releases",
    destination: "/en-ca/news/category/pressreleases",
    permanent: true,
  },
  {
    source: "/en-ca/news/wp-content/uploads/2018/12/accuride-builder.jpg",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/Industrial/Network/Default.asp",
    destination: "/en-ca/blog/category/industrial",
    permanent: true,
  },
  // {
  //     source: "/_next/static/my7avzjk-oxbz-q8ssul2/_ssgmanifest.js",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "/_next/static/vsfqkerlyiuo07lj32gnd/_buildmanifest.js",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  {
    source: "/en-ca//wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  { source: "/en-ca//xmlrpc.php", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca//web/wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//wordpress/wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//2020/wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//blog/wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//website/wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//news/wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//shop/wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//wp/wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//site/wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//wp2/wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//wp1/wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//2019/wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//cms/wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//test/wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//sito/wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/Resources/PDF/3832C-3834C-R7-1212E.pdf",
    destination: "/en-ca/resources",
    permanent: true,
  },
  // {
  //     source: "/_next/data/LzvC6JZ5JCqRAR6KSXlMV/en-us.json",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  {
    source: "/en-ca/distributors/%22",
    destination: "/en-ca/distributors",
    permanent: true,
  },
  {
    source: "/en-ca/Resources/PDF/3640-A-R2-0309.pdf",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source: "/en-ca/BSRA/Default.asp",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/31-54-29-14-15-23-utility_vehicles",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/distributors/www.aerospacesw.com",
    destination: "/en-ca/distributors",
    permanent: true,
  },
  {
    source:
      "/en-ca/customer/account/login/referer/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2NhdGFsb2dzZWFyY2gvcmVzdWx0L2luZGV4Lz9xPWFtZmlsZStmdWxsK2Rvd25sb2FkK2Z1bGwrMS4wNCtwcm9kdWN0KzM4MzJl",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/Global/Worldwide/Default.asp",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/Resources/PDF/123-1234-R13-0509.pdf",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source:
      "/en-ca/customer/account/login/referer/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL3Byb2R1Y3RzL3Nob3A_bGVuZ3RoPTc4OCUyQzc4NyUyQzk0MCZtYXJrZXQ9OTc3",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/oem-direct",
    destination: "/en-ca/company/oem-direct",
    permanent: true,
  },
  {
    source: "/en-ca/amfinder/index/search",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/App_Master/(.*)",
    destination: "/en-ca",
    permanent: true,
  },
  { source: "/en-ca/app/etc/(.*)", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca/architectural-design/woodworking",
    destination: "/en-ca/markets/architectural-design/woodworking",
    permanent: true,
  },
  {
    source: "/en-ca/architectural-design/(\\*)",
    destination: "/en-ca/markets/architectural-design",
    permanent: true,
  },
  {
    source: "/en-ca/architectural-design/wp-content/uploads/(.*)",
    destination: "/en-ca/markets/architectural-design",
    permanent: true,
  },
  {
    source: "/en-ca/bl/wp-admin/(.*)",
    destination: "/en-ca",
    permanent: true,
  },
  { source: "/en-ca/backup/(.*)", destination: "/en-ca", permanent: true },
  { source: "/en-ca/bkp/(.*)", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca/bin/keychain.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/bitcoin/wallet.dat",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/about_accuride/employment_main.php",
    destination: "/en-ca/company/careers",
    permanent: true,
  },
  {
    source: "/en-ca/blogold/wp-admin/install.php",
    destination: "/en-ca/blog",
    permanent: true,
  },
  {
    source: "/en-ca/brabantwallon/app_master/telerik.web.ui.dialoghandler.aspx",
    destination: "/en-ca",
    permanent: true,
  },
  { source: "/en-ca/BSRA/(.*)", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca/bsra/Images/(.*)",
    destination: "/en-ca",
    permanent: true,
  },
  { source: "/en-ca/btc/wallet.dat", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca/c9/metadata/environment/.env",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/cache/spouty/th3_alpha.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/case-studies/white-goods/gorenje-go-full-steam-ahead-with-accuride-telescopic-slides",
    destination: "/en-ca/blog/category/case-study",
    permanent: true,
  },
  // {
  //     source: "//2018/wp-includes/wlwmanifest.xml",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "//2019/wp-includes/wlwmanifest.xml",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "//blog/wp-includes/wlwmanifest.xml",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "//cms/wp-includes/wlwmanifest.xml",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "//media/wp-includes/wlwmanifest.xml",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "//news/wp-includes/wlwmanifest.xml",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "//shop/wp-includes/wlwmanifest.xml",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "//site/wp-includes/wlwmanifest.xml",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "//sito/wp-includes/wlwmanifest.xml",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "//test/wp-includes/wlwmanifest.xml",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "//web/wp-includes/wlwmanifest.xml",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "//website/wp-includes/wlwmanifest.xml",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "//wordpress/wp-includes/wlwmanifest.xml",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "//wp/wp-includes/wlwmanifest.xml",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "//wp1/wp-includes/wlwmanifest.xml",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "//wp2/wp-includes/wlwmanifest.xml",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // { source: "//xmlrpc.php", destination: "/en-ca", permanent: true },
  // {
  //     source: "/admin/includes/general.js",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "/admin/view/javascript/common.js",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "/administrator/language/en-GB/install.xml",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "/admin/includes/general.js",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "/admin/view/javascript/common.js",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "/administrator/help/en-GB/toc.json",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "/administrator/language/en-GB/install.xml",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "/assets/global/plugins/(.*)",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "/assets/jquery-file-upload/(.*)",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  // {
  //     source: "/assets/plugins/jquery-fileupload/(.*)",
  //     destination: "/en-ca",
  //     permanent: true,
  // },
  {
    source: "/en-ca/%22company/about%22",
    destination: "/en-ca/company/about",
    permanent: true,
  },
  {
    source: "/en-ca/%2522company/about%2522",
    destination: "/en-ca/company/about",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/news/%5Bid%5D",
    destination: "/en-ca/company/about",
    permanent: true,
  },
  {
    source:
      "/en-ca/%5Bzone_lang%5D/products/drawer-slides/heavy-duty-slides/9300-drawer-slide-series",
    destination:
      "/en-ca/products/drawer-slides/heavy-duty-slides/9300-drawer-slide-series",
    permanent: true,
  },
  {
    source:
      "/en-ca/%5Bzone_lang%5D/products/drawer-slides/light-duty-slides/3100-drawer-slide-series",
    destination:
      "/en-ca/products/drawer-slides/light-duty-slides/3100-drawer-slide-series",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/resources",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/support/shipping",
    destination: "/en-ca/support/shipping",
    permanent: true,
  },
  {
    source: "/en-ca/.aws/(.*)",
    destination: "/en-ca",
    permanent: true,
  },
  { source: "/en-ca/.git/(.*)", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca/.well-known/(.*)",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/company/about",
    destination: "/en-ca/company/about",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/contact/integrated-access-control-support",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/customer/login",
    destination: "/en-ca/customer/login",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/markets/construction-railway-machinery",
    destination: "/en-ca/markets/construction-railway-machinery",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/markets/vending-cash-handling",
    destination: "/en-ca/markets/vending-cash-handling",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/markets/woodworking-cabinetry",
    destination: "/en-ca/markets/woodworking-cabinetry",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/resources/cads",
    destination: "/en-ca/resources/cads",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/support",
    destination: "/en-ca/support",
    permanent: true,
  },
  {
    source: "/en-ca/.ssh/(.*)",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/.svn/(.*)",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//.env",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca///news/js/newsmember.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//2018/wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//404_icon.png",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//admin/images/li_10.gif",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//assets/css/index/cgwl_online.css",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//assets/images/index/del.png",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//base/templates/images/2.png",
    destination: "/en-ca",
    permanent: true,
  },
  { source: "/en-ca//c.php", destination: "/en-ca", permanent: true },
  { source: "/en-ca//config.php", destination: "/en-ca", permanent: true },
  { source: "/en-ca//css/album.css", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca//css/HighChart.css",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//css/images/refresh.png",
    destination: "/en-ca",
    permanent: true,
  },
  { source: "/en-ca//css/tips.css", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca//e/css/submenu.css",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//e/images/logo.gif",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//e/js/dialog.js",
    destination: "/en-ca",
    permanent: true,
  },
  // { source: "/en-ca//en-us", destination: "/en-ca", permanent: true },
  {
    source:
      "/en-ca//en-ca/blog/diy/how-to-install-drawer-slides/slideology-101-art-disconnect",
    destination:
      "/en-ca/blog/diy/how-to-install-drawer-slides/slideology-101-art-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca//en-ca/contact/general",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca//en-ca/customer/account",
    destination: "/en-ca/customer/account",
    permanent: true,
  },
  {
    source: "/en-ca//en-ca/resources/about-slides",
    destination: "/en-ca/resources/about-slides",
    permanent: true,
  },
  {
    source: "/en-ca//ewebeditor/KindEditor.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//base/js/common.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//fckeditor/editor/js/fckadobeair.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//fckeditor/fckconfig.js",
    destination: "/en-ca",
    permanent: true,
  },
  { source: "/en-ca//hmseo.php", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca//Image/min-icon.png",
    destination: "/en-ca",
    permanent: true,
  },
  { source: "/en-ca//images/3z.png", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca//images/default/nopic.jpg",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//Images/Editor/Editor.gif",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//images/load.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//Inc/check_sql.asp",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//inc/module/vod.php",
    destination: "/en-ca",
    permanent: true,
  },
  { source: "/en-ca//index.php", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca//jira/plugins/servlet/gadgets/makeRequest",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//js/browsers.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//js/calendar/active-bg.gif",
    destination: "/en-ca",
    permanent: true,
  },
  { source: "/en-ca//js/comm.js", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca//js/player/xigua2.html",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//js/slick/images/code.png",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//js/webuploader/webuploader.css",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//label/ajax/hit.aspx",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//lib/view/css/image-crop.css",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//lib/view/js/nestable.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//login/blue/login/logo.png",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//logo/images/logo.gif",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//member/templets/images/login_logo.gif",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//myclass/css/pagination.css",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//ningbo/js/1.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//omooo/statics/css/style.css",
    destination: "/en-ca",
    permanent: true,
  },
  { source: "/en-ca//phpinfo.php", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca//plugins/qqkf/qqkf2.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//plugins/servlet/gadgets/makeRequest",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//plus/img/toplogo.gif",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//Public/images/logo.png",
    destination: "/en-ca",
    permanent: true,
  },
  { source: "/en-ca//Public/js.php", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca//public/static/common/images/bag-imgB.jpg",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//public/static/common/images/ui_icon.jpg",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//public/static/common/js/jquery.editable.min.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca//public/static/libs/bootstrap/css/awesome-bootstrap-checkbox.css",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//public/static/libs/jymusic/js/base64.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//Res/images/nopic.jpg",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//secure/ManageFilters.jspa",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//seeyon/common/images/A8/favicon.ico",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//seeyon/main/common/js/qrcode-uuid.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//setup/pub/angular/angular.min.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//static/css/install.css",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//static/favicon.ico",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//static/image/common/close.gif",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//static/images/face/1.gif",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//static/js/home.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//static/js/logging.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//static/login/keypad/images/formEle/keyBg.jpg",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//static/login/logo.png",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//statics/css/admin_visualization.css",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//statics/js/finecms.sku.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//statics/js/search_suggest.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//template/default/css/dtree.css",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//template/default/login/images/webface_news_vip.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//templets/default/html/tag.html",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//templets/seowhy/js/product.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//themes/default/images/yahoo.gif",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//tmui/tmui/login/legal.html",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//tool/statics/admin_login.css",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//tpl/admincp/css/footer.css",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//tpl/static/js/skin/default/img.gif",
    destination: "/en-ca",
    permanent: true,
  },
  { source: "/en-ca//user.php", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca//utility/convert/data/config.inc.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php",
    destination: "/en-ca",
    permanent: true,
  },
  { source: "/en-ca//wp-content", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca//wp-content/themes/ripro/assets/js/html5shiv.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//wp-includes/css/wp-embed-template-ie.css",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//xui/common/blank.html",
    destination: "/en-ca",
    permanent: true,
  },
  { source: "/en-ca//zabbix.php", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca/__magmi/web/magmi.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/_ignition/execute-solution",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/_magmi/web/magmi.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/_profiler/phpinfo",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/%5Bid%5D",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/customer-stories/into-the-wild-overland",
    destination: "/en-ca/customer-stories/into-the-wild-overland",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/distributors",
    destination: "/en-ca/distributors",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/markets/automotive-movement-solutions",
    destination: "/en-ca/markets/automotive-movement-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/markets/residential-domestic-applications",
    destination: "/en-ca/markets/residential-domestic-applications",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/markets/transportation-solutions",
    destination: "/en-ca/markets/transportation-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/products/specialty-slides",
    destination: "/en-ca/products/specialty-slides",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/resources/literature",
    destination: "/en-ca/resources/literature",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/resources/videos",
    destination: "/en-ca/resources/videos",
    permanent: true,
  },
  {
    source: "/en-ca/blog//wp-admin/setup-config.php",
    destination: "/en-ca/blog",
    permanent: true,
  },
  {
    source:
      "/en-ca/blog/diy//en-ca/blog/diy/5-awesome-under-stair-storage-ideas",
    destination: "/en-ca/blog/diy/5-awesome-under-stair-storage-ideas",
    permanent: true,
  },
  {
    source: "/en-ca/%25253D%252526https(.*)",
    destination: "/en-ca",
    permanent: true,
  },
  { source: "/en-ca/c/version.js", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca/catalog/view/javascript/common.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/catalog/view/theme/default/stylesheet/stylesheet.css",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/catalogsearch/result",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/catalogsearch/result/index",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/category-16/category-16-3/category-16-3-9.html",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/cgi/Resources/List",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL3Byb2R1Y3RzL2FjY2Vzc29yaWVz/product/%5C",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1sZW5ndGglM2E1NCUyMGxlbmd0aCUzYTE2JTIwbGVuZ3RoJTNhMjQlMjBsZW5ndGglM2EyMiUyMGxlbmd0aCUzYTE0/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/checkout/cart/index",
    destination: "/en-ca/checkout/cart",
    permanent: true,
  },
  {
    source: "/en-ca/checkout/onepage/success",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/citrix/cgi/Resources/List",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/cms/wp-admin/install.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/CMSPages/logon.aspx",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/company/%2522%2520aria-label=",
    destination: "/en-ca/company",
    permanent: true,
  },
  {
    source: "/en-ca/company/account/validate",
    destination: "/en-ca/company",
    permanent: true,
  },
  { source: "/en-ca/config/aws.yml", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca/contact/%2522%2520aria-label=",
    destination: "/en-ca/contact",
    permanent: true,
  },
  // {
  //     source: "/en-ca/contact/en-us",
  //     destination: "/en-ca/contact",
  //     permanent: true,
  // },
  {
    source: "/en-ca/contacts/architectural-support",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca/contacts/contact-oem-direct",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca/contacts/contact-senseon",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/contacts/dGVjaG5pY2",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca/contacts/general-contact",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca/contacts/technical-support",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca/core/CHANGELOG.txt",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/customer//en-ca/customer/account",
    destination: "/en-ca/customer/account",
    permanent: true,
  },
  {
    source: "/en-ca/customer/account/create",
    destination: "/en-ca/customer/createaccount",
    permanent: true,
  },
  {
    source: "/en-ca/customer/account/forgotpassword",
    destination: "/en-ca/customer/forgotpassword",
    permanent: true,
  },
  {
    source: "/en-ca/customer/account/index",
    destination: "/en-ca/customer/account",
    permanent: true,
  },
  {
    source:
      "/en-ca/customer/account/login/referer/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2NhdGFsb2cvcHJvZHVjdC92aWV3L2lkLzE5Njkv",
    destination: "/en-ca/customer/login",
    permanent: true,
  },
  {
    source:
      "/en-ca/customer/account/login/referer/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2VuLXVzL3NsaS9zZWFyY2gvdGVtcGxhdGUv",
    destination: "/en-ca/customer/login",
    permanent: true,
  },
  {
    source: "/en-ca/DistributorLocator/Redirect.asp",
    destination: "/en-ca/distributors",
    permanent: true,
  },
  { source: "/en-ca/docker/.env", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca/docker/laravel/app/.env",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/drawer-slides/heavy-duty",
    destination: "/en-ca/products/drawer-slides/heavy-duty-slides",
    permanent: true,
  },
  {
    source:
      "/en-ca/drawer-slides/wp-content/uploads/2017/06/3832E-Enhanced-Touch-Release-vanity-drawers.jpg",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/about",
    destination: "/en-ca/company/about",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/contacts/distributor-locator",
    destination: "/en-ca/distributors",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/contacts/technical-support",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/how-to-buy",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/markets-innovation",
    destination: "/en-ca/markets/access-control-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/markets-innovation/secure-access-control-systems",
    destination: "/en-ca/markets/access-control-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/news",
    destination: "/en-ca/news",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/news/accuride-featured-in-rfid-journal",
    destination: "/en-ca/news",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/news/global-shop-senseon-secure",
    destination: "/en-ca/news",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/news/senseon-secure-access",
    destination: "/en-ca/news",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/privacy",
    destination: "/en-ca/privacy",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/product-catalog",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/product-catalog/oem-direct/accuride-advantage",
    destination: "/en-ca/company/oem-direct",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/products/0363",
    destination: "/en-ca/products/0363-light-duty-two-way-travel-slide",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/products/1321-pro-pocket-pro-pocket",
    destination:
      "/en-ca/products/cb1321-pro-pocket-slide-for-pocket-and-flipper-doors-auto-open",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/products/3132sc-eclipse-self-closing",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/products/3507-ie",
    destination: "/en-ca/products/3507-heavy-duty-slide-with-lock-out",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/products/3634ec",
    destination:
      "/en-ca/products/3634ec-medium-duty-over-travel-slide-with-easy-close",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/products/3640a",
    destination:
      "/en-ca/products/3640a-heavy-duty-over-travel-slide-with-adapter-rail-mount-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/products/4032",
    destination:
      "/en-ca/products/4032-medium-duty-full-extension-slide-with-progressive-movement",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/products/4035",
    destination:
      "/en-ca/products/4035-light-duty-over-travel-and-ultra-quiet-slide",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/products/ch3832e-weather-resistant",
    destination:
      "/en-ca/products/ch3832e-light-duty-weather-resistant-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/products/ss5321",
    destination:
      "/en-ca/products/ss5321-heavy-duty-over-travel-and-corrosion-resistant-slide",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/resources",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source: "/en-ca/explore/tags/(.*)",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/resources/cads",
    destination: "/en-ca/resources/cads",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/resources/faqs",
    destination: "/en-ca/resources/faqs",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/resources/how-tos/about-slides",
    destination: "/en-ca/resources/about-slides",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/resources/literature",
    destination: "/en-ca/resources/literature",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/resources/slide-guides",
    destination: "/en-ca/resources/slide-guides",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/resources/videos",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/resources/videos/slide-terminology",
    destination: "/en-ca/resources/about-slides#slide-terminology",
    permanent: true,
  },
  {
    source: "/en-ca/amfile/file/download/file/(.*)",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/amfile/file/download/file_id/(.*)",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/%5Bzone_lang%5D/products/drawer-slides",
    destination: "/en-ca/products/drawer-slides",
    permanent: true,
  },
  { source: "/en-ca//%22", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca//drawer-slides/heavy-duty-slides",
    destination: "/en-ca/products/drawer-slides/heavy-duty-slides",
    permanent: true,
  },
  {
    source: "/en-ca//en-ca//product-catalog",
    destination: "/en-ca/products/shop",
    permanent: true,
  },
  {
    source: "/en-ca//en-ca/catalogsearch/result",
    destination: "/en-ca/products/shop",
    permanent: true,
  },
  { source: "/en-ca//en-ca/search", destination: "/en-ca", permanent: true },
  {
    source: "/en-ca/address/editaddress",
    destination: "/en-ca/customer/account",
    permanent: true,
  },
  {
    source: "/en-ca/blog//3index.php",
    destination: "/en-ca/blog",
    permanent: true,
  },
  {
    source: "/en-ca/blog/category//en-ca/blog/category/woodworking-blogs",
    destination: "/en-ca/blog/category/woodworking-blogs",
    permanent: true,
  },
  {
    source: "/en-ca/checkdelivery/index/index",
    destination: "/en-ca/checkout/shipping",
    permanent: true,
  },
  {
    source: "/en-ca/checkout/%2522",
    destination: "/en-ca/checkout/shipping",
    permanent: true,
  },
  {
    source:
      "/en-ca/contacts/distributor-locator%253F__hstc%253D209004493.24694e44698b16709f09d95cdcf7e87e.1608581716266.1608581716266.1608581716266.1%2526__hssc%253D209004493.2.1608581716266%2526__hsfp%253D2324073213",
    destination: "/en-ca/distributors",
    permanent: true,
  },
  {
    source: "/en-ca/customer/account/%2522%2520aria-label=",
    destination: "/en-ca/customer/account",
    permanent: true,
  },
  {
    source: "/en-ca/customer/account/BO",
    destination: "/en-ca/customer/account",
    permanent: true,
  },
  {
    source: "/en-ca/customer/account/cv",
    destination: "/en-ca/customer/account",
    permanent: true,
  },
  {
    source: "/en-ca/distributors/www.compidistributors.com",
    destination: "/en-ca/distributors",
    permanent: true,
  },
  {
    source: "/en-ca/drawer-slides/heavy-duty-slides",
    destination: "/en-ca/products/drawer-slides/heavy-duty-slides",
    permanent: true,
  },
  {
    source: "/en-ca/drawer-slides/light-duty-slides",
    destination: "/en-ca/products/drawer-slides/light-duty-slides",
    permanent: true,
  },
  {
    source: "/en-ca/markets/access-control-systems",
    destination: "/en-ca/markets/access-control-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/markets/truck-bodies-utility-vehicles",
    destination: "/en-ca/markets/transportation-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/markets-innovation/aerospace-watercraft",
    destination: "/en-ca/markets/aerospace-watercraft-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/markets-innovation/architectural-design",
    destination: "/en-ca/markets/architectural-design",
    permanent: true,
  },
  {
    source: "/en-ca/markets-innovation/automotive-transportation",
    destination: "/en-ca/markets/automotive-movement-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/markets-innovation/industrial-electromechanical",
    destination: "/en-ca/markets/vending-cash-handling",
    permanent: true,
  },
  {
    source: "/en-ca/markets-innovation/machinery",
    destination: "/en-ca/markets/machinery-equipment-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/markets-innovation/medical-healthcare",
    destination: "/en-ca/markets/healthcare-environments",
    permanent: true,
  },
  {
    source: "/en-ca/markets-innovation/secure-access-control-systems",
    destination: "/en-ca/markets/access-control-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/markets-innovation/vending-cash-handling",
    destination: "/en-ca/markets/vending-cash-handling",
    permanent: true,
  },
  {
    source: "/en-ca/markets-innovation/woodworking-cabinetry",
    destination: "/en-ca/markets/woodworking-cabinetry",
    permanent: true,
  },
  {
    source: "/en-ca/news//3index.php",
    destination: "/en-ca/news",
    permanent: true,
  },
  {
    source: "/en-ca/product/10elao-electronic-cabinet-lock",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/resources/downloads/technical-sheets/industrial-electromechanical",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source: "/en-ca/resources/how-tos/about-slides",
    destination: "/en-ca/resources/about-slides",
    permanent: true,
  },
  {
    source: "/en-ca/Resources/PDF/(.*)",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/resources/quality/certifications-associations",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source: "/en-ca/resources/videos/features-and-components",
    destination: "/en-ca/resources/videos",
    permanent: true,
  },
  {
    source: "/en-ca/shop/online-store",
    destination: "/en-ca/products/shop",
    permanent: true,
  },
  {
    source: "/en-ca/Woodworking/(.*)",
    destination: "/en-ca/markets/woodworking-cabinetry",
    permanent: true,
  },
  {
    source:
      "/en-ca/resources/downloads/literature-request-registration/woodworking-architectural-literature-request",
    destination: "/en-ca/markets/architectural-design/woodworking",
    permanent: true,
  },
  {
    source: "/en-ca/resources/downloads/literature-request-registration",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source: "/en-ca/resources/downloads/cads/industrial-electromechanical",
    destination: "/en-ca/resources/cads",
    permanent: true,
  },
  {
    source: "/en-ca/resources/downloads/cads",
    destination: "/en-ca/resources/cads",
    permanent: true,
  },
  {
    source: "/en-ca/resources/downloads/accessory-guides",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source: "/en-ca/Resources/DOC/3-Part",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source:
      "/en-ca/resources/application-solutions/woodworking-cabinetry/synchronized-motion-from-glideware",
    destination: "/en-ca/markets/woodworking-cabinetry",
    permanent: true,
  },
  {
    source: "/en-ca/resources/application-solutions/woodworking-cabinetry",
    destination: "/en-ca/markets/woodworking-cabinetry",
    permanent: true,
  },
  {
    source:
      "/en-ca/resources/application-solutions/vending-cash-handling/space-saver-point-of-sale-units",
    destination: "/en-ca/markets/vending-cash-handling",
    permanent: true,
  },
  {
    source:
      "/en-ca/resources/application-solutions/truck-bodies-utility-vehicles/heavy-duty-storage-that-lasts-and-lasts",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source: "/en-ca/resources/application-solutions/other-industries",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source:
      "/en-ca/resources/application-solutions/electronic-enclosures-server-racks/tool-less-mounting",
    destination: "/en-ca/markets/electronic-enclosures",
    permanent: true,
  },
  {
    source:
      "/en-ca/resources/application-solutions/electronic-enclosures-server-racks/super-computer-uses-2907-server-slide",
    destination: "/en-ca/markets/electronic-enclosures",
    permanent: true,
  },
  {
    source:
      "/en-ca/resources/application-solutions/architectural-design/mechanical-screen-lift-used-in-historic-building",
    destination: "/en-ca/markets/architectural-design",
    permanent: true,
  },
  {
    source: "/en-ca/resources/application-solutions",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source: "/en-ca/resources/%2522%2520aria-label=",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source:
      "/en-ca/product/components-hardware-and-assembly/undermount-drawer-slides",
    destination: "/en-ca/products/drawer-slides",
    permanent: true,
  },
  {
    source: "/en-ca/product/drawer-slides",
    destination: "/en-ca/products/drawer-slides",
    permanent: true,
  },
  {
    source: "/en-ca/product-catalog/oem-direct",
    destination: "/en-ca/company/oem-direct",
    permanent: true,
  },
  {
    source: "/en-ca/product-catalog/oem-direct/(.*)",
    destination: "/en-ca/company/oem-direct",
    permanent: true,
  },
  {
    source: "/en-ca/products/specialty-slides/linear-track-systems",
    destination:
      "/en-ca/products/specialty-slides/linear-rail-and-track-systems",
    permanent: true,
  },
  {
    source: "/en-ca/wp-admin/admin-ajax.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/js/mage/adminhtml/sales.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/js/mage/adminhtml/tools.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/skin/adminhtml/default/default/below_ie7.css",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/pub/static/frontend/Magento/luma/en_US/Magento_Ui/js/grid/controls/bookmarks/storage.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/js/varien/form.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/js/prototype/validation.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/resources/downloads/product-information-sheets",
    destination: "/en-ca/resources/literature",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/markets-innovation/woodworking-cabinetry",
    destination: "/en-ca/markets/woodworking-cabinetry",
    permanent: true,
  },
  {
    source: "/en-ca/Global/News/Default.asp",
    destination: "/en-ca/news",
    permanent: true,
  },
  {
    source: "/en-ca/contact/general",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca/contact/technical-support",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca/contact/architectural-support",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca/contact/integrated-access-control-support",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca/contact/oem-direct",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca/company/oem-direct@continuous-support",
    destination: "/en-ca/company/oem-direct",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/about/global-sites",
    destination: "/en-ca/company/about",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/markets-innovation/homeowners",
    destination: "/en-ca/markets/residential-domestic-applications",
    permanent: true,
  },
  {
    source:
      "/en-ca/en-mx/product-catalog/oem-direct/accuride-advantage/contract-manufacturing",
    destination: "/en-ca/markets/automation-movement-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/product-catalog/results",
    destination: "/en-ca/products/shop",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/products/al4140-super-heavy-duty",
    destination:
      "/en-ca/products/al4140-super-heavy-duty-corrosion-resistant-aluminum-slide",
    permanent: true,
  },
  {
    source:
      "/en-ca/en-mx/resources/application-solutions/vending-cash-handling/lock-inlock-out-solution-for-kiosks",
    destination: "/en-ca/markets/vending-cash-handling",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/resources/how-tos/design-considerations",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/resources/videos/other-videos",
    destination: "/en-ca/resources/videos",
    permanent: true,
  },
  {
    source: "/en-ca/Global/About/History",
    destination: "/en-ca/company/about",
    permanent: true,
  },
  {
    source: "/en-ca/Industrial/Literature/Default.asp",
    destination: "/en-ca/resources/literature",
    permanent: true,
  },
  {
    source: "/en-ca/Industrial/News/www.accuride.com/bsra",
    destination: "/en-ca/news",
    permanent: true,
  },
  {
    source: "/en-ca/Industrial/Product/Default.asp",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/jenkins/login",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/OEM-Direct/About/continuous-support.asp",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca/press/accuride-launches-new-website",
    destination: "/en-ca/news",
    permanent: true,
  },
  {
    source: "/en-ca/product/38el",
    destination: "/en-ca/products/b38el-electronic-cabinet-locking-system",
    permanent: true,
  },
  {
    source: "/en-ca/resources/about-slides@slide-terminology",
    destination: "/en-ca/resources/about-slides",
    permanent: true,
  },
  {
    source:
      "/en-ca/resources/application-solutions/electronic-enclosures-server-racks",
    destination: "/en-ca/markets/electronic-enclosures",
    permanent: true,
  },
  {
    source: "/en-ca/resources/how-tos/how-to-select-a-slide",
    destination: "/en-ca/resources/slide-guides#how-to-select-slide",
    permanent: true,
  },
  {
    source: "/en-ca/resources/quality/environmental",
    destination: "/en-ca/company/why-accuride",
    permanent: true,
  },
  {
    source: "/en-ca/resources/quality/warranty",
    destination: "/en-ca/warranty",
    permanent: true,
  },
  {
    source: "/en-ca/&quot;company/about&quot;",
    destination: "/en-ca/company/about",
    permanent: true,
  },
  {
    source: "/en-ca/autodiscover/autodiscover.xml",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca//terms-of-sale",
    destination: "/en-ca/warranty",
    permanent: true,
  },
  {
    source: "/en-ca/customer/%2522%2520aria-label=",
    destination: "/en-ca/blog",
    permanent: true,
  },
  {
    source: "/en-ca/customer-stories/%2522%2520aria-label=",
    destination: "/en-ca/blog",
    permanent: true,
  },
  {
    source: "/en-ca/customer-stories/preload",
    destination: "/en-ca/blog",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/products/115rc-linear-track-system-ie",
    destination:
      "/en-ca/products/specialty-slides/linear-rail-and-track-systems",
    permanent: true,
  },
  {
    source:
      "/en-ca/en-mx/resources/application-solutions/vending-cash-handling/linear-motion-tracks-keep-the-money-moving",
    destination: "/en-ca/markets/vending-cash-handling",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/rohs",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source:
      "/en-ca/Images/Products/Woodworking/PICSM/3832EC_Easy-Close_pic_sm.jpg",
    destination:
      "/en-ca/products/3832ec-easy-close-light-duty-side-mount-slide-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/Industrial/Automotive/Default.asp",
    destination: "/en-ca/markets/automotive-movement-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/markets-innovation/homeowners",
    destination: "/en-ca/markets/residential-domestic-applications",
    permanent: true,
  },
  {
    source: "/en-ca/markets-innovation/oem-direct",
    destination: "/en-ca/company/oem-direct",
    permanent: true,
  },
  {
    source: "/en-ca/pages/contact",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca/pages/contactus",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca/pages/contact-us",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-ca/press/3634ec",
    destination:
      "/en-ca/products/3634ec-medium-duty-over-travel-slide-with-easy-close",
    permanent: true,
  },
  {
    source: "/en-ca/resources/downloads/product-information-sheets",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1sZW5ndGglM2EyNCUyMGxlbmd0aCUzYTMyJTIwbGVuZ3RoJTNhMTYlMjBsZW5ndGglM2EzMCUyMGxlbmd0aCUzYTIy/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1JlbW92ZS1EcmF3ZXI/YWY9bWFya2V0JTNhYXBwbGlhbmNlcyUyMG1hcmtldCUzYWluZHVzdHJpYWwlMjBzaWRlc3BhY2UlM2E1MCUyMG1vdW50aW5nJTNhc2lkZW1vdW50JTIwbW91bnRpbmclM2FmbGF0bW91bnQ=/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/quickview/index/view/path/%27",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/faqs/index/search",
    destination: "/en-ca/resources/faqs",
    permanent: true,
  },
  {
    source:
      "/en-ca/storepickup/ajax/listStore/latitude/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25275149do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/ajaxsearch/ajax/index",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/boltpaydirectpost/Payment/failure/invoice/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25271002do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/combine/index/index",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/merchantform/index/citylist",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/magicshop/Quickview/view/path/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25274900do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/mstpdfcatalogproductprint/index/pdfproduct",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/magicshop/Quickview/ajax/path/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25279201do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/storelocator/json/search",
    destination: "/en-ca/distributors",
    permanent: true,
  },
  {
    source: "/en-ca/sendinblue/ajax/ajaxupdate",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/ajax/quickview/view/path/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25272762do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/themesettings/quickview/view/path/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25279843do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/boltpaydirectpost/Payment/failure",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/press/index/search",
    destination: "/en-ca/news",
    permanent: true,
  },
  {
    source: "/en-ca/m1amecallbackendpoint/index/index",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/megamenu/index/getitems/group/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25276904do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/press/index/search/submit/1/search_press/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25275573do",
    destination: "/en-ca/news",
    permanent: true,
  },
  {
    source:
      "/en-ca/storelocator/json/search/current/1/longitude/1/latitude/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%2527431do",
    destination: "/en-ca/distributors",
    permanent: true,
  },
  {
    source: "/en-ca/salesforceimport/index/eternity",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/advancecms/index/rating",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/import/index/importCustomer/web_site/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25271389do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/innoviti/Payment/return/vpc_TxnResponseCode=0&vpc_TransactionNo=dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%252717do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/quickview/index/index/path/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25276180do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/advancedreviews/proscons/updatepager",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/gmapstrlocator/index/detail/id/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%252750do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/quickshop/index/view/path/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25273077do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/socolissimo/ajax/getcitynamebyzipcode",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/socolissimo/ajax/getcitynamebyzipcode/country/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25277274do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/advancedreviews/proscons/updatepager/reviews/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25276490do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/ajaxcart/opt/index/ajax_option/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25275122do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/payitsimple/payment/successAsync/InstallmentPlanNumber/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25273651do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/clnews/index/index/tag/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25276473do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/outofstocksubscription/index/index/product/1/mobile/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25276858do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/ajaxcart/index/index/id/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25276129do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/sociallogin/index/index",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/mesdevis/index/save/visiteur_id/1/customer_id_devis/1/avancement_link/1/customer_email/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25274219do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/sociallogin/index/index/loginRadiusKey/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25277813do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/combine/index/index/id/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25271857do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/quickview/index/view/path/dsf%2522g%2527sd%2527fg%2527s%2522df%2527gs%2527dfg%2527sd%2527fgs%2522ite%25272537do",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1sZW5ndGglM2E0OCUyMGxlbmd0aCUzYTI2JTIwbGVuZ3RoJTNhNDAlMjBsZW5ndGglM2EyNCUyMGxlbmd0aCUzYTM2/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1NsaWRlcy1Gb3ItV2lkZS1EcmF3ZXJzP2FmPXNwZWNpYWxmZWF0dXJlcyUzYWxvY2tvdXQlMjBzcGVjaWFsZmVhdHVyZXMlM2Fjb3Jyb3Npb25yZXNpc3RhbnQlMjBsZW5ndGglM2EyOCUyMGxlbmd0aCUzYTIwJTIwbWFya2V0JTNhaW5kdXN0cmlhbA==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tb3VudGluZyUzYXBvY2tldGJheW9uZXQlMjBsZW5ndGglM2EyNiUyMGxlbmd0aCUzYTMyJTIwbGVuZ3RoJTNhMTYlMjBsZW5ndGglM2E0MA==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPWxlbmd0aCUzYTE0JTIwbGVuZ3RoJTNhMjAlMjBzcGVjaWFsZmVhdHVyZXMlM2FzZWxmY2xvc2UlMjBzcGVjaWFsZmVhdHVyZXMlM2F0b3VjaHJlbGVhc2UlMjBjYXQxJTNhbGlnaHRkdXR5MTM5bGJzb3JsZXNzJTIwbWFya2V0JTNhd29vZGNhYmluZXRyeSUyMG1hcmtldCUzYWluZHVzdHJpYWwlMjBtb3VudGluZyUzYXNpZGVtb3VudA==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1zcGVjaWFsZmVhdHVyZXMlM2Fsb2NraW4lMjBsZW5ndGglM2E0MiUyMGxlbmd0aCUzYTI4JTIwbGVuZ3RoJTNhMzAlMjBsZW5ndGglM2EzMg==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/catalog/product/view/_ignore_category/1/id/3370/s/c4035-light-duty-ultra-quiet-slide",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPWxvYWRyYXRpbmclM2E1MDExNDAwbGJzJTIwbGVuZ3RoJTNhMTYlMjBsZW5ndGglM2E0MCUyMGxlbmd0aCUzYTE5JTIwbW91bnRpbmclM2F1bmRlcm1vdW50JTIwbGVuZ3RoJTNhMjAlMjBtb3VudGluZyUzYXNpZGVtb3VudA==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1zcGVjaWFsZmVhdHVyZXMlM2Fsb2NraW4lMjBsZW5ndGglM2ExOCUyMGxlbmd0aCUzYTQ4JTIwbGVuZ3RoJTNhMjQlMjBsZW5ndGglM2EyNg==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPWxlbmd0aCUzYTI2JTIwbW91bnRpbmclM2F2ZXJ0aWNhbG1vdW50JTIwbW91bnRpbmclM2F1bmRlcm1vdW50JTIwbGVuZ3RoJTNhMTYlMjBtYXJrZXQlM2F3b29kY2FiaW5ldHJ5JTIwbWFya2V0JTNhaW5kdXN0cmlhbA==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/data/cache/apache.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/include/dialog/select_images_post.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/images/icons/twiter_icon.png",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1zcGVjaWFsZmVhdHVyZXMlM2Fsb2NraW4lMjBsZW5ndGglM2EyNCUyMGxlbmd0aCUzYTQ4JTIwbGVuZ3RoJTNhMTYlMjBsZW5ndGglM2E0MA==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlLzEwJTIyLURyYXdlci1TbGlkZT9hZj1sZW5ndGglM2ExMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExMCUyMGxlbmd0aCUzYTEwJTIwbGVuZ3RoJTNhMTglMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTExJTIwbGVuZ3RoJTNhMTElMjBsZW5ndGglM2E1MCUyMGxlbmd0aCUzYTE2/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/products/7432",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tb3VudGluZyUzYXBvY2tldGJheW9uZXQlMjBsZW5ndGglM2ExNiUyMGxlbmd0aCUzYTQyJTIwbGVuZ3RoJTNhMjQlMjBsZW5ndGglM2ExMg==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/en-mx/resources/downloads/technical-sheets/industrial-electromechanical",
    destination: "/en-ca/resources",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tYXJrZXQlM2F1dGlsaXR5dmVoaWNsZXMlMjBsZW5ndGglM2E0MiUyMGxlbmd0aCUzYTIyJTIwbGVuZ3RoJTNhMjYlMjBsZW5ndGglM2EyOA==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tb3VudGluZyUzYXBvY2tldGJheW9uZXQlMjBsZW5ndGglM2ExNCUyMGxlbmd0aCUzYTI4JTIwbGVuZ3RoJTNhMTYlMjBsZW5ndGglM2EzMA==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tb3VudGluZyUzYXBvY2tldGJheW9uZXQlMjBsZW5ndGglM2ExMCUyMGxlbmd0aCUzYTE2JTIwbGVuZ3RoJTNhNjAlMjBsZW5ndGglM2EyMg==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPWxlbmd0aCUzYTI4JTIwbWFya2V0JTNhbWVkaWNhbCUyMGNhdDElM2FsaWdodGR1dHkxMzlsYnNvcmxlc3MlMjBtYXJrZXQlM2F3b29kY2FiaW5ldHJ5JTIwc2lkZXNwYWNlJTNhNTAlMjBtb3VudGluZyUzYXNpZGVtb3VudA==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/markets/%2522%2520aria-label=",
    destination: "/en-ca/markets/access-control-solutions",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPW1hcmtldCUzYWluZHVzdHJpYWwlMjBzcGVjaWFsZmVhdHVyZXMlM2F0b3VjaHJlbGVhc2UlMjBzcGVjaWFsZmVhdHVyZXMlM2Fjb3Jyb3Npb25yZXNpc3RhbnQlMjBsb2FkcmF0aW5nJTNhMDEwMGxicyUyMG1hcmtldCUzYWFlcm9zcGFjZXdhdGVyY3JhZnQlMjBtYXJrZXQlM2F3b29kY2FiaW5ldHJ5/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/_next/static/1u8qdp1w2it8ejk5mgdwr/_buildmanifest.js",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tb3VudGluZyUzYXBvY2tldGJheW9uZXQlMjBsZW5ndGglM2EzNiUyMGxlbmd0aCUzYTI4JTIwbGVuZ3RoJTNhMjYlMjBsZW5ndGglM2EyMg==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tb3VudGluZyUzYXNpZGVtb3VudCUyMGxlbmd0aCUzYTMwJTIwbGVuZ3RoJTNhMjYlMjBsZW5ndGglM2ExNiUyMGxlbmd0aCUzYTYw/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/data/admin/allowurl.txt",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1zcGVjaWFsZmVhdHVyZXMlM2Fsb2NraW4lMjBsZW5ndGglM2ExNiUyMGxlbmd0aCUzYTE4JTIwbGVuZ3RoJTNhMjYlMjBsZW5ndGglM2EyMg==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1sZW5ndGglM2E0OCUyMGxlbmd0aCUzYTMyJTIwbGVuZ3RoJTNhMjQlMjBsZW5ndGglM2E0MCUyMGxlbmd0aCUzYTU0/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tYXJrZXQlM2FlbGVjdHJvbWVjaGFuaWNhbCUyMGxlbmd0aCUzYTMyJTIwbGVuZ3RoJTNhNDglMjBsZW5ndGglM2ExNiUyMGxlbmd0aCUzYTIy/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPW1hcmtldCUzYWFwcGxpYW5jZXMlMjBsZW5ndGglM2ExNCUyMGxlbmd0aCUzYTYlMjBsZW5ndGglM2EyMSUyMGxlbmd0aCUzYTE2JTIwY2F0MSUzYWxpZ2h0ZHV0eTEzOWxic29ybGVzcyUyMGNhdDElM2FvZW0=/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tb3VudGluZyUzYXBvY2tldGJheW9uZXQlMjBsZW5ndGglM2EyNCUyMGxlbmd0aCUzYTU0JTIwbGVuZ3RoJTNhMTYlMjBsZW5ndGglM2E0MA==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGU/YWY9bGVuZ3RoJTNhNDAlMjBsZW5ndGglM2E2MCUyMG1vdW50aW5nJTNhc2lkZW1vdW50JTIwbGVuZ3RoJTNhNTQlMjBsZW5ndGglM2EyMA==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1sZW5ndGglM2E2MCUyMGxlbmd0aCUzYTQwJTIwbGVuZ3RoJTNhMjYlMjBsZW5ndGglM2EyNCUyMGxlbmd0aCUzYTI4/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPWxlbmd0aCUzYTI0JTIwY2F0MSUzYWxpZ2h0ZHV0eTEzOWxic29ybGVzcyUyMG1hcmtldCUzYW1lZGljYWwlMjBtYXJrZXQlM2F3b29kY2FiaW5ldHJ5JTIwc2lkZXNwYWNlJTNhNTAlMjBtYXJrZXQlM2FpbmR1c3RyaWFsJTIwbW91bnRpbmclM2FzaWRlbW91bnQ=/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//wp-includes/ID3/license.txt",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca//2021/wp-includes/wlwmanifest.xml",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPW1hcmtldCUzYWFwcGxpYW5jZXMlMjBzcGVjaWFsZmVhdHVyZXMlM2FkZXRlbnRvdXQlMjBzcGVjaWFsZmVhdHVyZXMlM2F0b3VjaHJlbGVhc2UlMjBsZW5ndGglM2EyNiUyMGNhdDElM2FsaWdodGR1dHkxMzlsYnNvcmxlc3MlMjBtYXJrZXQlM2F3b29kY2FiaW5ldHJ5JTIwc2lkZXNwYWNlJTNhNTAlMjBtYXJrZXQlM2FpbmR1c3RyaWFs/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktU2xpZGVzP2FmPW1hcmtldCUzYWVtZXJnZW5jeXZlaGljbGVzJTIwY2F0MSUzYWhlYXZ5ZHV0eTE3MGxic3RvMTMyM2xicyUyMG1hcmtldCUzYWFlcm9zcGFjZXdhdGVyY3JhZnQlMjBsZW5ndGglM2E2MCUyMG1hcmtldCUzYWluZHVzdHJpYWwlMjBtb3VudGluZyUzYWZsYXRtb3VudA==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/your-friend-accuride/oem-edition",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/customer/account/login/referer/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL3ByaXZhY3k%252C",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1sZW5ndGglM2E0MCUyMGxlbmd0aCUzYTE0JTIwbGVuZ3RoJTNhMjYlMjBsZW5ndGglM2ExNiUyMGxlbmd0aCUzYTM2/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPWxvYWRyYXRpbmclM2EwMTAwbGJzJTIwbGVuZ3RoJTNhMjAlMjBzcGVjaWFsZmVhdHVyZXMlM2FzZWxmY2xvc2UlMjBzcGVjaWFsZmVhdHVyZXMlM2F0b3VjaHJlbGVhc2UlMjBjYXQxJTNhbGlnaHRkdXR5MTM5bGJzb3JsZXNzJTIwbWFya2V0JTNhd29vZGNhYmluZXRyeSUyMG1hcmtldCUzYWluZHVzdHJpYWwlMjBtb3VudGluZyUzYXNpZGVtb3VudA==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/wp-admin/images/xleet.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/wp-admin/maint/xleet.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/wp-admin/meta/xleet.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/wp-admin/network/xleet.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/wp-admin/user/xleet.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/wp-admin/includes/xleet.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/wp-admin/css/xleet.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/wp-includes/xleet.php",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1sZW5ndGglM2ExNCUyMGxlbmd0aCUzYTM2JTIwbGVuZ3RoJTNhMjQlMjBsZW5ndGglM2EyMiUyMGxlbmd0aCUzYTMy/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPWxlbmd0aCUzYTIyJTIwbGVuZ3RoJTNhMjYlMjBsZW5ndGglM2ExNiUyMGxlbmd0aCUzYTIwJTIwbW91bnRpbmclM2F1bmRlcm1vdW50/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/products/3832ec-easy-close",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGU/YWY9c3BlY2lhbGZlYXR1cmVzJTNhdG91Y2hyZWxlYXNlJTIwbGVuZ3RoJTNhNDglMjBsZW5ndGglM2ExOCUyMGxlbmd0aCUzYTU0JTIwbGVuZ3RoJTNhMjYlMjBsZW5ndGglM2EyMg==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlLzEwJTIyLURyYXdlci1TbGlkZT9hZj1sZW5ndGglM2ExMCUyMGxlbmd0aCUzYTEwJTIwbGVuZ3RoJTNhMTMlMjBsZW5ndGglM2ExMSUyMGxlbmd0aCUzYTEwJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTEzJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTEyJTIwbGVuZ3RoJTNhNTclMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMTElMjBsZW5ndGglM2E4JTIwbGVuZ3RoJTNhMzklMjBsZW5ndGglM2EyMw==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1zcGVjaWFsZmVhdHVyZXMlM2Fsb2NraW4lMjBsZW5ndGglM2E0MiUyMGxlbmd0aCUzYTE2JTIwbGVuZ3RoJTNhNDglMjBsZW5ndGglM2E1NA==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPWxlbmd0aCUzYTIyJTIwbGVuZ3RoJTNhMzIlMjBsZW5ndGglM2ExOSUyMGxlbmd0aCUzYTE2JTIwY2F0MSUzYWxpZ2h0ZHV0eTEzOWxic29ybGVzcyUyMGNhdDElM2FvZW0=/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1sZW5ndGglM2ExNCUyMGxlbmd0aCUzYTIwJTIwbGVuZ3RoJTNhNDglMjBsZW5ndGglM2ExNg==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/safeview-redirect/tc_frame.html",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/markets/appliances",
    destination: "/en-ca/markets/appliance",
    permanent: true,
  },
  {
    source: "/en-ca/sales/order/history",
    destination: "/en-ca/customer/account",
    permanent: true,
  },
  {
    source: "/en-ca/products/3634-medium-duty-over-travel-slide",
    destination: "/en-ca/products/3634-heavy-duty-over-travel-slide",
    permanent: true,
  },
  {
    source: "/en-ca/markets/emergency.png",
    destination: "/en-ca/markets/emergency-vehicles",
    permanent: true,
  },
  {
    source: "/en-ca/markets/2n78WWi8SOmOBtRh7ADs.jpg",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/markets/automotive.png",
    destination: "/en-ca/markets/automotive-movement-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/OEM-Direct/contact-the-oem-direct-team.asp",
    destination: "/en-ca/company/oem-direct#aias-contact-form",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL0hlYXZ5LUR1dHktRnVsbC1FeHRlbnNpb24tU2xpZGUtKGxvY2staW4tQW5kLUxvY2stb3V0KT9hZj1tb3VudGluZyUzYXNpZGVtb3VudCUyMGxlbmd0aCUzYTYwJTIwbGVuZ3RoJTNhNDIlMjBsZW5ndGglM2ExNiUyMGxlbmd0aCUzYTIy/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/markets/42XtK1s1T265px5gWE9H.jpg",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPW1hcmtldCUzYWFwcGxpYW5jZXMlMjBsZW5ndGglM2ExNSUyMGxlbmd0aCUzYTI4JTIwbGVuZ3RoJTNhMTMlMjBsZW5ndGglM2E0MCUyMG1hcmtldCUzYWhvbWVvd25lcnM=/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlL1dpZGUtRHJhd2VyP2FmPWxlbmd0aCUzYTE2JTIwY2F0MSUzYWxpZ2h0ZHV0eTEzOWxic29ybGVzcyUyMGxlbmd0aCUzYTEyJTIwbW91bnRpbmclM2F2ZXJ0aWNhbG1vdW50JTIwbW91bnRpbmclM2FmbGF0bW91bnQlMjBtb3VudGluZyUzYXVuZGVybW91bnQlMjBtYXJrZXQlM2F3b29kY2FiaW5ldHJ5/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/markets/machinery.png",
    destination: "/en-ca/markets/machinery-equipment-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/markets/Qv5R6czkR0mv8iVeWCBa.jpg",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlLzEwJTIyLURyYXdlci1TbGlkZS8xMj9hZj1sZW5ndGglM2ExMCUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMTMlMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTEzJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTEyJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExNyUyMGxlbmd0aCUzYTEwJTIwbGVuZ3RoJTNhMTElMjBsZW5ndGglM2ExMSUyMGxlbmd0aCUzYTE1JTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTEwJTIwbGVuZ3RoJTNhNTYlMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMTAlMjBsZW5ndGglM2EzMiUyMGxlbmd0aCUzYTI1JTIwbGVuZ3RoJTNhMzI=/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source:
      "/en-ca/checkout/cart/add/uenc/aHR0cHM6Ly93d3cuYWNjdXJpZGUuY29tL2hhcmR3YXJlLzEwJTIyLURyYXdlci1TbGlkZT9hZj1sZW5ndGglM2ExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMTAlMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMTElMjBsZW5ndGglM2ExMCUyMGxlbmd0aCUzYTI3JTIwbGVuZ3RoJTNhMTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMTElMjBsZW5ndGglM2ExJTIwbGVuZ3RoJTNhMiUyMGxlbmd0aCUzYTEwJTIwbGVuZ3RoJTNhMTAlMjBsZW5ndGglM2ExMSUyMGxlbmd0aCUzYTEyJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTExJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTEwJTIwbGVuZ3RoJTNhMSUyMGxlbmd0aCUzYTMyJTIwbGVuZ3RoJTNhMzMlMjBsZW5ndGglM2EyMw==/product/2930",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/markets/automation.png",
    destination: "/en-ca/markets/automation-movement-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/markets/7JImhortToiR5IyYlyp9.jpg",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/integrated-access-solutions/2017/05/18/hello-world",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/markets/access_control.png",
    destination: "/en-ca/markets/access-control-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/markets/homeowners.png",
    destination: "/en-ca/markets/residential-domestic-applications",
    permanent: true,
  },
  {
    source: "/en-ca/resources/quality/hpd-collaborative",
    destination: "/en-ca/company/why-accuride",
    permanent: true,
  },
  {
    source: "/en-ca/markets/P8sFVesTle4qmsCQlzcm.jpg",
    destination: "/en-ca",
    permanent: true,
  },
  {
    source: "/en-ca/markets/corrosion-resistant-small.jpg",
    destination: "/en-ca/search?keyword=corrosion,%20resistant",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/products/3834esc-self-closing",
    destination:
      "/en-ca/products/3834esc-light-duty-over-travel-slide-with-self-close-and-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-ca/resources/application-solutions/appliances/custom-designed-slides-in-refrigerated-drawers",
    destination: "/en-ca/markets/appliance",
    permanent: true,
  },
  {
    source: "/en-ca/company/oem-direct/%2522%2520aria-label=",
    destination: "/en-ca/company/oem-direct",
    permanent: true,
  },
  {
    source: "/en-ca/en-mx/products/3634ec-ie",
    destination:
      "/en-ca/products/3634ec-medium-duty-over-travel-slide-with-easy-close",
    permanent: true,
  },
  {
    source: "/en-ca/senseon/(.*)",
    destination: "/en-ca/markets/access-control-solutions",
    permanent: true,
  },
  {
    source: "/en-ca/shop/distributors",
    destination: "/en-ca/distributors",
    permanent: true,
  },
  {
    source: "/en-us/c3641-heavy-duty-interlock-slide",
    destination: "/en-us/products/3641x-heavy-duty-interlock-slide-system",
    permanent: true,
  },
  {
    source: "/en-ca/support",
    destination: "/en-ca/contact",
    permanent: true,
  },
  {
    source: "/en-us/support/shipping",
    destination: "/en-us/terms-of-sale",
    permanent: true,
  },
  {
    source: "/en-ca/support/shipping",
    destination: "/en-ca/terms-of-sale",
    permanent: true,
  },
];

export default extraRedirects;

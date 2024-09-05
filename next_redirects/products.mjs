/** @type {(import('next/dist/lib/load-custom-routes').Redirect)[]} */

const productRedirects = [
  {
    source: "/en-us/4010-rear-mounting-bracket-kit",
    destination: "/en-us/products/4010-rear-mounting-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-us/4010-reverse-rear-mounting-bracket-kit",
    destination: "/en-us/products/4010-reverse-rear-mounting-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-us/cb0115-easy-close-dampening-mechanism",
    destination: "/en-us/products/cb0115-easy-close-dampening-mechanism",
    permanent: true,
  },
  {
    source: "/en-us/4180-hardware-kit-with-polymer-ball-carriages",
    destination:
      "/en-us/products/4180-hardware-kit-with-polymer-ball-carriages",
    permanent: true,
  },
  {
    source: "/en-us/4180-hardware-kit-with-stainless-steel-ball-carriages",
    destination:
      "/en-us/products/4180-hardware-kit-with-stainless-steel-ball-carriages",
    permanent: true,
  },
  {
    source: "/en-us/4180-nuts-and-washers-for-individual-carriages",
    destination:
      "/en-us/products/4180-nuts-and-washers-for-individual-carriages",
    permanent: true,
  },
  {
    source: "/en-us/cb0116-damp-damper",
    destination: "/en-us/products/cb0116-damp-damper",
    permanent: true,
  },
  {
    source: "/en-us/4180-0391-base-kit",
    destination: "/en-us/products/4180-0391-base-kit",
    permanent: true,
  },
  {
    source: "/en-us/5410-0800-clip-on-bracket",
    destination: "/en-us/products/5410-0800-clip-on-bracket",
    permanent: true,
  },
  {
    source: "/en-us/5410-0801-clip-on-bracket",
    destination: "/en-us/products/5410-0801-clip-on-bracket",
    permanent: true,
  },
  {
    source: "/en-us/5410-0802-clip-on-bracket",
    destination: "/en-us/products/5410-0802-clip-on-bracket",
    permanent: true,
  },
  {
    source: "/en-us/cbhan3-stainless-steel-rods-0100",
    destination: "/en-us/products/cbhan3-stainless-steel-rods-0100",
    permanent: true,
  },
  {
    source: "/en-us/5410-0803-clip-on-bracket",
    destination: "/en-us/products/5410-0803-clip-on-bracket",
    permanent: true,
  },
  {
    source: "/en-us/4180-black-finish-bracket-kit",
    destination: "/en-us/products/4180-black-finish-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-us/4180-zinc-finish-bracket-kit",
    destination: "/en-us/products/4180-zinc-finish-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-us/4180-face-frame-bracket-kit",
    destination: "/en-us/products/4180-face-frame-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-us/5410-clip-on-bracket",
    destination: "/en-us/products/5410-clip-on-bracket",
    permanent: true,
  },
  {
    source: "/en-us/cc9-1-extension-cable-carrier-with-quick-disconnect",
    destination:
      "/en-us/products/cc9-1-extension-cable-carrier-with-quick-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/cbhan3-stainless-steel-rods",
    destination: "/en-us/products/cbhan3-stainless-steel-rods",
    permanent: true,
  },
  {
    source: "/en-us/cc9-2-extension-cable-carrier-with-quick-disconnect",
    destination:
      "/en-us/products/cc9-2-extension-cable-carrier-with-quick-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/4180-bottom-inset-face-frame-bracket-kit",
    destination: "/en-us/products/4180-bottom-inset-face-frame-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-us/4180-bottom-mount-bracket-kit",
    destination: "/en-us/products/4180-bottom-mount-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-us/4180-inset-face-frame-bracket-kit",
    destination: "/en-us/products/4180-inset-face-frame-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-us/4180-slotted-rear-face-frame-bracket-kit",
    destination: "/en-us/products/4180-slotted-rear-face-frame-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-us/4180-wide-drawer-stabilizer-kit",
    destination: "/en-us/products/4180-wide-drawer-stabilizer-kit",
    permanent: true,
  },
  {
    source: "/en-us/4180-black-hinge-kit-for-inset-doors",
    destination: "/en-us/products/4180-black-hinge-kit-for-inset-doors",
    permanent: true,
  },
  {
    source: "/en-us/4180-zinc-hinge-kit-for-inset-doors",
    destination: "/en-us/products/4180-zinc-hinge-kit-for-inset-doors",
    permanent: true,
  },
  {
    source: "/en-us/4180-rear-bracket-kit",
    destination: "/en-us/products/4180-rear-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-us/4180-face-frame-kit",
    destination: "/en-us/products/4180-face-frame-kit",
    permanent: true,
  },
  {
    source: "/en-us/4180-rear-face-frame-bracket-kit",
    destination: "/en-us/products/4180-rear-face-frame-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-us/4180-rear-bracket-kit-easy-close",
    destination: "/en-us/products/4180-rear-bracket-kit-easy-close",
    permanent: true,
  },
  {
    source: "/en-us/4180-rear-bracket-kit-touch-release",
    destination: "/en-us/products/4180-rear-bracket-kit-touch-release",
    permanent: true,
  },
  {
    source: "/en-us/4180-hinge-kit-for-inset-doors",
    destination: "/en-us/products/4180-hinge-kit-for-inset-doors",
    permanent: true,
  },
  {
    source: "/en-us/4180-0313-salice-clip-on-hinge-kit-inset-thick-doors",
    destination:
      "/en-us/products/4180-0313-salice-clip-on-hinge-kit-inset-thick-doors",
    permanent: true,
  },
  {
    source: "/en-us/4180-0314-salice-clip-on-hinge-kit-overlay",
    destination: "/en-us/products/4180-0314-salice-clip-on-hinge-kit-overlay",
    permanent: true,
  },
  {
    source:
      "/en-us/6331-aero-iii-light-duty-undermount-slide-with-full-customization",
    destination:
      "/en-us/products/6331-aero-iii-light-duty-undermount-slide-with-full-customization",
    permanent: true,
  },
  {
    source: "/en-us/al0115-0120rc-aluminum-track",
    destination: "/en-us/products/al0115-0120rc-aluminum-track",
    permanent: true,
  },
  {
    source: "/en-us/al0115-0120rch-aluminum-track-with-pre-drilled-holes",
    destination:
      "/en-us/products/al0115-0120rch-aluminum-track-with-pre-drilled-holes",
    permanent: true,
  },
  {
    source: "/en-us/al0115-0240rc-aluminum-track",
    destination: "/en-us/products/al0115-0240rc-aluminum-track",
    permanent: true,
  },
  {
    source: "/en-us/al0115-0240rch-aluminum-track-with-pre-drilled-holes",
    destination:
      "/en-us/products/al0115-0240rch-aluminum-track-with-pre-drilled-holes",
    permanent: true,
  },
  {
    source: "/en-us/al0115-aluminum-end-stop",
    destination: "/en-us/products/al0115-aluminum-end-stop",
    permanent: true,
  },
  {
    source: "/en-us/al0116-0240rc-aluminum-track",
    destination: "/en-us/products/al0116-0240rc-aluminum-track",
    permanent: true,
  },
  {
    source: "/en-us/al0116-0360rc-aluminum-track",
    destination: "/en-us/products/al0116-0360rc-aluminum-track",
    permanent: true,
  },
  {
    source: "/en-us/al0116-fascia-end-caps",
    destination: "/en-us/products/al0116-fascia-end-caps",
    permanent: true,
  },
  {
    source: "/en-us/al0116-aluminum-fascia",
    destination: "/en-us/products/al0116-aluminum-fascia",
    permanent: true,
  },
  {
    source: "/en-us/al0116-aluminum-end-stops",
    destination: "/en-us/products/al0116-aluminum-end-stops",
    permanent: true,
  },
  {
    source: "/en-us/al0116-support-beam",
    destination: "/en-us/products/al0116-support-beam",
    permanent: true,
  },
  {
    source:
      "/en-us/cblift-0019-lift-ascent-light-duty-slide-for-small-push-to-operate-mechanical-lifts",
    destination:
      "/en-us/products/cblift-0019-lift-ascent-light-duty-slide-for-small-push-to-operate-mechanical-lifts",
    permanent: true,
  },
  {
    source: "/en-us/4180-black-hinge-carrier-strip-kit",
    destination: "/en-us/products/4180-black-hinge-carrier-strip-kit",
    permanent: true,
  },
  {
    source: "/en-us/cb0115-cassette-with-polymer-bearings",
    destination: "/en-us/products/cb0115-cassette-with-polymer-bearings",
    permanent: true,
  },
  {
    source: "/en-us/cb0116-cassette-with-polymer-bearings",
    destination: "/en-us/products/cb0116-cassette-with-polymer-bearings",
    permanent: true,
  },
  {
    source: "/en-us/cbergo-tray-200-ergonomic-keyboard-tray",
    destination: "/en-us/products/cbergo-tray-200-ergonomic-keyboard-tray",
    permanent: true,
  },
  {
    source: "/en-us/cbergo-tray-300-ergonomic-keyboard-tray",
    destination: "/en-us/products/cbergo-tray-300-ergonomic-keyboard-tray",
    permanent: true,
  },
  {
    source: "/en-us/2990-additional-weight-packs",
    destination: "/en-us/products/2990-additional-weight-packs",
    permanent: true,
  },
  {
    source: "/en-us/2990-vesa-fixed-bracket-kit",
    destination: "/en-us/products/2990-vesa-fixed-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-us/2990-vesa-tilt-bracket-kit",
    destination: "/en-us/products/2990-vesa-tilt-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-us/2990-weight-extension-plate-kit",
    destination: "/en-us/products/2990-weight-extension-plate-kit",
    permanent: true,
  },
  {
    source: "/en-us/4180-cblift-050-fixed-lid-bracket",
    destination: "/en-us/products/4180-cblift-050-fixed-lid-bracket",
    permanent: true,
  },
  {
    source: "/en-us/4180-replacement-remote-controls",
    destination: "/en-us/products/4180-replacement-remote-controls",
    permanent: true,
  },
  {
    source: "/en-us/3160ec-soft-close-undermount-slide-for-ultra-wide-drawers",
    destination:
      "/en-us/products/3160ec-soft-close-undermount-slide-for-ultra-wide-drawers",
    permanent: true,
  },
  {
    source: "/en-us/4180-connector-clip-kit",
    destination: "/en-us/products/4180-connector-clip-kit",
    permanent: true,
  },
  {
    source:
      "/en-us/8100-custom-flat-mount-linear-travel-slide-with-dampened-movement",
    destination:
      "/en-us/products/8100-custom-flat-mount-linear-travel-slide-with-dampened-movement",
    permanent: true,
  },
  {
    source: "/en-us/dz0115-drilling-jig",
    destination: "/en-us/products/dz0115-drilling-jig",
    permanent: true,
  },
  {
    source:
      "/en-us/3832ec-easy-close-light-duty-side-mount-slide-lever-disconnect",
    destination:
      "/en-us/products/3832ec-easy-close-light-duty-side-mount-slide-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-us/cb1155-easy-down-light-duty-slide-with-easy-close-for-flipper-doors",
    destination:
      "/en-us/products/cb1155-easy-down-light-duty-slide-with-easy-close-for-flipper-doors",
    permanent: true,
  },
  {
    source:
      "/en-us/c1155-easy-down-light-duty-slide-with-easy-close-for-flipper-doors",
    destination:
      "/en-us/products/c1155-easy-down-light-duty-slide-with-easy-close-for-flipper-doors",
    permanent: true,
  },
  {
    source: "/en-us/4180-eclipse-drill-jig",
    destination: "/en-us/products/4180-eclipse-drill-jig",
    permanent: true,
  },
  {
    source: "/en-us/3135ec-eclipse-easy-close-undermount-slide",
    destination: "/en-us/products/3135ec-eclipse-easy-close-undermount-slide",
    permanent: true,
  },
  {
    source: "/en-us/4180-eclipse-lever-disconnects",
    destination: "/en-us/products/4180-eclipse-lever-disconnects",
    permanent: true,
  },
  {
    source: "/en-us/4180-eclipse-toolkit",
    destination: "/en-us/products/4180-eclipse-toolkit",
    permanent: true,
  },
  {
    source:
      "/en-us/9307e-extra-heavy-duty-full-extension-slide-with-lock-out-and-front-latch-release",
    destination:
      "/en-us/products/9307e-extra-heavy-duty-full-extension-slide-with-lock-out-and-front-latch-release",
    permanent: true,
  },
  {
    source: "/en-us/fg115-0100t-aluminum-rail",
    destination: "/en-us/products/fg115-0100t-aluminum-rail",
    permanent: true,
  },
  {
    source: "/en-us/fg115-0200t-aluminum-rail",
    destination: "/en-us/products/fg115-0200t-aluminum-rail",
    permanent: true,
  },
  {
    source: "/en-us/fg115-auto-adjust-carriage",
    destination: "/en-us/products/fg115-auto-adjust-carriage",
    permanent: true,
  },
  {
    source: "/en-us/fg115-manual-adjust-carriage",
    destination: "/en-us/products/fg115-manual-adjust-carriage",
    permanent: true,
  },
  {
    source: "/en-us/fg115-non-adjust-carriage",
    destination: "/en-us/products/fg115-non-adjust-carriage",
    permanent: true,
  },
  {
    source: "/en-us/cbhand-handle-kit-with-lock-in",
    destination: "/en-us/products/cbhand-handle-kit-with-lock-in",
    permanent: true,
  },
  {
    source: "/en-us/9308e-heavy-duty-full-extension-slide",
    destination: "/en-us/products/9308e-heavy-duty-full-extension-slide",
    permanent: true,
  },
  {
    source:
      "/en-us/9301e-heavy-duty-full-extension-drawer-slide-non-disconnect",
    destination:
      "/en-us/products/9301e-heavy-duty-full-extension-drawer-slide-non-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/7950-heavy-duty-full-extension-non-disconnect-slide",
    destination:
      "/en-us/products/7950-heavy-duty-full-extension-non-disconnect-slide",
    permanent: true,
  },
  {
    source:
      "/en-us/c3600-200d-heavy-duty-self-closing-slide-with-platform-mount",
    destination:
      "/en-us/products/c3600-200d-heavy-duty-self-closing-slide-with-platform-mount",
    permanent: true,
  },
  {
    source:
      "/en-us/c3600-201d-heavy-duty-self-closing-slide-with-platform-mount",
    destination:
      "/en-us/products/c3600-201d-heavy-duty-self-closing-slide-with-platform-mount",
    permanent: true,
  },
  {
    source: "/en-us/3600-heavy-duty-full-extension-slide",
    destination: "/en-us/products/3600-heavy-duty-full-extension-slide",
    permanent: true,
  },
  {
    source:
      "/en-us/3600tr-heavy-duty-full-extension-slide-with-hold-in-detent-and-lever-disconnect",
    destination:
      "/en-us/products/3600tr-heavy-duty-full-extension-slide-with-hold-in-detent-and-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-us/3600ad-heavy-duty-full-extension-slide-with-hold-in-detent-and-lever-disconnect",
    destination:
      "/en-us/products/3600ad-heavy-duty-full-extension-slide-with-hold-in-detent-and-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-us/9322e-heavy-duty-slide-with-pocket-and-bayonet-and-non-locking-companion-slide",
    destination:
      "/en-us/products/9322e-heavy-duty-slide-with-pocket-and-bayonet-and-non-locking-companion-slide",
    permanent: true,
  },
  {
    source:
      "/en-us/9328e-heavy-duty-slide-with-pocket-and-bayonet-lock-in-and-lock-out",
    destination:
      "/en-us/products/9328e-heavy-duty-slide-with-pocket-and-bayonet-lock-in-and-lock-out",
    permanent: true,
  },
  {
    source: "/en-us/3600ec-heavy-duty-full-extension-slide-with-soft-close",
    destination:
      "/en-us/products/3600ec-heavy-duty-full-extension-slide-with-soft-close",
    permanent: true,
  },
  {
    source: "/en-us/3641-heavy-duty-interlock-slide",
    destination: "/en-us/products/3641-heavy-duty-interlock-slide",
    permanent: true,
  },
  {
    source: "/en-us/3641x-heavy-duty-interlock-slide-system",
    destination: "/en-us/products/3641x-heavy-duty-interlock-slide-system",
    permanent: true,
  },
  {
    source: "/en-us/116rc-heavy-duty-linear-track-system",
    destination: "/en-us/products/116rc-heavy-duty-linear-track-system",
    permanent: true,
  },
  {
    source: "/en-us/301-heavy-duty-low-profile-slide-with-over-travel",
    destination:
      "/en-us/products/301-heavy-duty-low-profile-slide-with-over-travel",
    permanent: true,
  },
  {
    source:
      "/en-us/ss5321-heavy-duty-over-travel-and-corrosion-resistant-slide",
    destination:
      "/en-us/products/ss5321-heavy-duty-over-travel-and-corrosion-resistant-slide",
    permanent: true,
  },
  {
    source: "/en-us/ss5322-heavy-duty-over-travel-slide-bracket-disconnect",
    destination:
      "/en-us/products/ss5322-heavy-duty-over-travel-slide-bracket-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/3601-heavy-duty-over-travel-and-non-disconnect-slide",
    destination:
      "/en-us/products/3601-heavy-duty-over-travel-and-non-disconnect-slide",
    permanent: true,
  },
  {
    source:
      "/en-us/3640a-heavy-duty-over-travel-slide-with-adapter-rail-mount-disconnect",
    destination:
      "/en-us/products/3640a-heavy-duty-over-travel-slide-with-adapter-rail-mount-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-us/3620-heavy-duty-over-travel-slide-with-pocket-and-bayonet-and-non-disconnect",
    destination:
      "/en-us/products/3620-heavy-duty-over-travel-slide-with-pocket-and-bayonet-and-non-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-us/9308-heavy-duty-right-handed-locking-slide-with-non-locking-slide",
    destination:
      "/en-us/products/9308-heavy-duty-right-handed-locking-slide-with-non-locking-slide",
    permanent: true,
  },
  {
    source: "/en-us/3657-heavy-duty-slide-with-lever-disconnect",
    destination: "/en-us/products/3657-heavy-duty-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/3507-heavy-duty-slide-with-lock-out",
    destination: "/en-us/products/3507-heavy-duty-slide-with-lock-out",
    permanent: true,
  },
  {
    source: "/en-us/3607-heavy-duty-slide-with-lock-out-and-lever-disconnect",
    destination:
      "/en-us/products/3607-heavy-duty-slide-with-lock-out-and-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/cb3620-heavy-duty-slide-with-pull-out-access",
    destination: "/en-us/products/cb3620-heavy-duty-slide-with-pull-out-access",
    permanent: true,
  },
  {
    source: "/en-us/7957-heavy-duty-with-lever-disconnect",
    destination: "/en-us/products/7957-heavy-duty-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/4180-interlock-gang-locking-kit",
    destination: "/en-us/products/4180-interlock-gang-locking-kit",
    permanent: true,
  },
  {
    source:
      "/en-us/3832e-light-duty-full-extension-slide-with-lever-disconnect",
    destination:
      "/en-us/products/3832e-light-duty-full-extension-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/2907-light-duty-low-profile-slide-with-over-travel",
    destination:
      "/en-us/products/2907-light-duty-low-profile-slide-with-over-travel",
    permanent: true,
  },
  {
    source: "/en-us/ss2028-light-duty-extension-and-corrosion-resistant-slide",
    destination:
      "/en-us/products/ss2028-light-duty-extension-and-corrosion-resistant-slide",
    permanent: true,
  },
  {
    source:
      "/en-us/3832aa-light-duty-full-extension-and-action-assist-slide-with-lever-disconnect",
    destination:
      "/en-us/products/3832aa-light-duty-full-extension-and-action-assist-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-us/3832etr-light-duty-touch-release-slide-with-lever-disconnect",
    destination:
      "/en-us/products/3832etr-light-duty-touch-release-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-us/3832ehdtr-heavy-duty-touch-release-slide-with-lever-disconnect",
    destination:
      "/en-us/products/3832ehdtr-heavy-duty-touch-release-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/cb3832ec-side-mount-slide-with-easy-close-lever-disconnect",
    destination:
      "/en-us/products/cb3832ec-side-mount-slide-with-easy-close-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/4033-light-duty-full-extension-and-ultra-quiet-slide",
    destination:
      "/en-us/products/4033-light-duty-full-extension-and-ultra-quiet-slide",
    permanent: true,
  },
  {
    source:
      "/en-us/ch3832e-light-duty-weather-resistant-slide-with-lever-disconnect",
    destination:
      "/en-us/products/ch3832e-light-duty-weather-resistant-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-us/3832edo-light-duty-full-extension-slide-with-detent-out-and-lever-disconnect",
    destination:
      "/en-us/products/3832edo-light-duty-full-extension-slide-with-detent-out-and-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/3832ehdsc-light-duty-slide-with-heavy-duty-self-close",
    destination:
      "/en-us/products/3832ehdsc-light-duty-slide-with-heavy-duty-self-close",
    permanent: true,
  },
  {
    source:
      "/en-us/cb3832e-light-duty-full-extension-slide-with-lever-disconnect-and-black-finish",
    destination:
      "/en-us/products/cb3832e-light-duty-full-extension-slide-with-lever-disconnect-and-black-finish",
    permanent: true,
  },
  {
    source:
      "/en-us/ew3832e-light-duty-full-extension-slide-with-lever-disconnect-and-white-finish",
    destination:
      "/en-us/products/ew3832e-light-duty-full-extension-slide-with-lever-disconnect-and-white-finish",
    permanent: true,
  },
  {
    source:
      "/en-us/3820-light-duty-slide-with-pocket-and-bayonet-and-lever-disconnect",
    destination:
      "/en-us/products/3820-light-duty-slide-with-pocket-and-bayonet-and-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-us/7432-light-duty-full-extension-slide-with-rail-mounting-and-progressive-movement",
    destination:
      "/en-us/products/7432-light-duty-full-extension-slide-with-rail-mounting-and-progressive-movement",
    permanent: true,
  },
  {
    source:
      "/en-us/cb3832esc-light-duty-slide-with-self-close-lever-disconnect",
    destination:
      "/en-us/products/cb3832esc-light-duty-slide-with-self-close-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-us/ew3832esc-light-duty-slide-with-self-close-lever-disconnect",
    destination:
      "/en-us/products/ew3832esc-light-duty-slide-with-self-close-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/3832esc-light-duty-slide-with-self-close-lever-disconnect",
    destination:
      "/en-us/products/3832esc-light-duty-slide-with-self-close-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/fg115-light-duty-linear-friction-guide-system",
    destination:
      "/en-us/products/fg115-light-duty-linear-friction-guide-system",
    permanent: true,
  },
  {
    source: "/en-us/115-light-duty-linear-motion-slide",
    destination: "/en-us/products/115-light-duty-linear-motion-slide",
    permanent: true,
  },
  {
    source:
      "/en-us/2807-light-duty-low-profile-slide-with-over-travel-for-1u-2u",
    destination:
      "/en-us/products/2807-light-duty-low-profile-slide-with-over-travel-for-1u-2u",
    permanent: true,
  },
  {
    source: "/en-us/2632-light-duty-low-profile-slide-with-rail-mounting",
    destination:
      "/en-us/products/2632-light-duty-low-profile-slide-with-rail-mounting",
    permanent: true,
  },
  {
    source: "/en-us/4035-light-duty-over-travel-and-ultra-quiet-slide",
    destination:
      "/en-us/products/4035-light-duty-over-travel-and-ultra-quiet-slide",
    permanent: true,
  },
  {
    source: "/en-us/cb3834-light-duty-over-travel-slide-with-lever-disconnect",
    destination:
      "/en-us/products/cb3834-light-duty-over-travel-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/3834e-light-duty-over-travel-slide-with-lever-disconnect",
    destination:
      "/en-us/products/3834e-light-duty-over-travel-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-us/7434-light-duty-over-travel-slide-with-rail-mounting-and-progressive-movement",
    destination:
      "/en-us/products/7434-light-duty-over-travel-slide-with-rail-mounting-and-progressive-movement",
    permanent: true,
  },
  {
    source:
      "/en-us/3834esc-light-duty-over-travel-slide-with-self-close-and-lever-disconnect",
    destination:
      "/en-us/products/3834esc-light-duty-over-travel-slide-with-self-close-and-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-us/2120-light-duty-pocket-and-bayonet-slide-with-lever-disconnect",
    destination:
      "/en-us/products/2120-light-duty-pocket-and-bayonet-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/201-light-duty-slide",
    destination: "/en-us/products/201-light-duty-slide",
    permanent: true,
  },
  {
    source: "/en-us/c1145-light-duty-slide-for-flipper-doors",
    destination: "/en-us/products/c1145-light-duty-slide-for-flipper-doors",
    permanent: true,
  },
  {
    source: "/en-us/2019-light-duty-slide-for-platform-mounting",
    destination: "/en-us/products/2019-light-duty-slide-for-platform-mounting",
    permanent: true,
  },
  {
    source: "/en-us/117-light-duty-slide-for-pocket-doors",
    destination: "/en-us/products/117-light-duty-slide-for-pocket-doors",
    permanent: true,
  },
  {
    source: "/en-us/cb1332-light-duty-slide-for-tall-pocket-doors-with-hinges",
    destination:
      "/en-us/products/cb1332-light-duty-slide-for-tall-pocket-doors-with-hinges",
    permanent: true,
  },
  {
    source: "/en-us/1432-light-duty-slide-for-tall-pocket-doors-without-hinges",
    destination:
      "/en-us/products/1432-light-duty-slide-for-tall-pocket-doors-without-hinges",
    permanent: true,
  },
  {
    source: "/en-us/2507-light-duty-slide-for-toolless-installation",
    destination:
      "/en-us/products/2507-light-duty-slide-for-toolless-installation",
    permanent: true,
  },
  {
    source: "/en-us/c340-light-duty-slide-with-butcher-block-and-lock-out",
    destination:
      "/en-us/products/c340-light-duty-slide-with-butcher-block-and-lock-out",
    permanent: true,
  },
  {
    source:
      "/en-us/2006-light-duty-slide-with-friction-disconnect-pencil-drawer-slide",
    destination:
      "/en-us/products/2006-light-duty-slide-with-friction-disconnect-pencil-drawer-slide",
    permanent: true,
  },
  {
    source: "/en-us/2601-light-duty-slide-with-hold-in-detent",
    destination: "/en-us/products/2601-light-duty-slide-with-hold-in-detent",
    permanent: true,
  },
  {
    source: "/en-us/2132-light-duty-slide-with-lever-disconnect",
    destination: "/en-us/products/2132-light-duty-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-us/2109-light-duty-slide-with-lever-disconnect-for-suspended-mounting",
    destination:
      "/en-us/products/2109-light-duty-slide-with-lever-disconnect-for-suspended-mounting",
    permanent: true,
  },
  {
    source:
      "/en-us/c322-light-duty-slide-with-over-travel-and-quick-mounting-tabs",
    destination:
      "/en-us/products/c322-light-duty-slide-with-over-travel-and-quick-mounting-tabs",
    permanent: true,
  },
  {
    source: "/en-us/3017-light-duty-slide-with-over-travel-and-rail-mounting",
    destination:
      "/en-us/products/3017-light-duty-slide-with-over-travel-and-rail-mounting",
    permanent: true,
  },
  {
    source: "/en-us/2037-light-duty-slide-with-rail-mount-disconnect",
    destination:
      "/en-us/products/2037-light-duty-slide-with-rail-mount-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/1029-light-duty-undermount-slide-with-disconnect",
    destination:
      "/en-us/products/1029-light-duty-undermount-slide-with-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/3732-light-duty-full-extension-slide-with-low-profile",
    destination:
      "/en-us/products/3732-light-duty-full-extension-slide-with-low-profile",
    permanent: true,
  },
  {
    source:
      "/en-us/2907wb-light-duty-over-travel-slide-with-low-profile-and-lever-disconnect",
    destination:
      "/en-us/products/2907wb-light-duty-over-travel-slide-with-low-profile-and-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-us/cbhandle-system-lock-in-lock-out-handle-kit-for-heavy-duty-drawers-trays",
    destination:
      "/en-us/products/cbhandle-system-lock-in-lock-out-handle-kit-for-heavy-duty-drawers-trays",
    permanent: true,
  },
  {
    source: "/en-us/cbhan4-lock-out-conversion-kit",
    destination: "/en-us/products/cbhan4-lock-out-conversion-kit",
    permanent: true,
  },
  {
    source: "/en-us/3634ec-medium-duty-over-travel-slide-with-easy-close",
    destination:
      "/en-us/products/3634ec-medium-duty-over-travel-slide-with-easy-close",
    permanent: true,
  },
  {
    source:
      "/en-us/4034-medium-duty-over-travel-slide-with-progressive-movement",
    destination:
      "/en-us/products/4034-medium-duty-over-travel-slide-with-progressive-movement",
    permanent: true,
  },
  {
    source: "/en-us/c204-medium-duty-slide-with-lock-out-and-latch-disconnect",
    destination:
      "/en-us/products/c204-medium-duty-slide-with-lock-out-and-latch-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-us/ss0330-medium-duty-full-extension-and-corrosion-resistant-slide",
    destination:
      "/en-us/products/ss0330-medium-duty-full-extension-and-corrosion-resistant-slide",
    permanent: true,
  },
  {
    source:
      "/en-us/4032-medium-duty-full-extension-slide-with-progressive-movement",
    destination:
      "/en-us/products/4032-medium-duty-full-extension-slide-with-progressive-movement",
    permanent: true,
  },
  {
    source: "/en-us/115rc-medium-duty-linear-track-system",
    destination: "/en-us/products/115rc-medium-duty-linear-track-system",
    permanent: true,
  },
  {
    source: "/en-us/301-2590-medium-duty-over-travel-and-non-disconnect-slide",
    destination:
      "/en-us/products/301-2590-medium-duty-over-travel-and-non-disconnect-slide",
    permanent: true,
  },
  {
    source: "/en-us/3634-medium-duty-over-travel-slide",
    destination: "/en-us/products/3634-medium-duty-over-travel-slide",
    permanent: true,
  },
  {
    source:
      "/en-us/3357-medium-duty-over-travel-slide-with-latch-disconnect-and-detent-in",
    destination:
      "/en-us/products/3357-medium-duty-over-travel-slide-with-latch-disconnect-and-detent-in",
    permanent: true,
  },
  {
    source: "/en-us/c305-medium-duty-over-travel-slide-with-lock-out",
    destination:
      "/en-us/products/c305-medium-duty-over-travel-slide-with-lock-out",
    permanent: true,
  },
  {
    source: "/en-us/3320-medium-duty-pocket-bayonet-slide",
    destination: "/en-us/products/3320-medium-duty-pocket-bayonet-slide",
    permanent: true,
  },
  {
    source:
      "/en-us/3308-medium-duty-slide-with-latch-disconnect-lock-in-and-lock-out",
    destination:
      "/en-us/products/3308-medium-duty-slide-with-latch-disconnect-lock-in-and-lock-out",
    permanent: true,
  },
  {
    source: "/en-us/3308r-150lbs-latch-disconnect",
    destination: "/en-us/products/3308r-150lbs-latch-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/3306do-detent-out-150lbs-lever-disconnect",
    destination: "/en-us/products/3306do-detent-out-150lbs-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-us/3301-medium-duty-slide-with-over-travel",
    destination: "/en-us/products/3301-medium-duty-slide-with-over-travel",
    permanent: true,
  },
  {
    source:
      "/en-us/3307-medium-duty-slide-with-over-travel-latch-disconnect-and-lock-out",
    destination:
      "/en-us/products/3307-medium-duty-slide-with-over-travel-latch-disconnect-and-lock-out",
    permanent: true,
  },
  {
    source: "/en-us/al4190-medium-duty-slide-with-tilt-track-system",
    destination:
      "/en-us/products/al4190-medium-duty-slide-with-tilt-track-system",
    permanent: true,
  },
  {
    source: "/en-us/4180-mounting-bracket-kit-for-1145-flipper-door",
    destination:
      "/en-us/products/4180-mounting-bracket-kit-for-1145-flipper-door",
    permanent: true,
  },
  {
    source: "/en-us/4180-mounting-bracket-kit",
    destination: "/en-us/products/4180-mounting-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-us/4180-mounting-bracket-kit-for-2019",
    destination: "/en-us/products/4180-mounting-bracket-kit-for-2019",
    permanent: true,
  },
  {
    source: "/en-us/4180-xe-mounting-bracket-kit-for-2019",
    destination: "/en-us/products/4180-xe-mounting-bracket-kit-for-2019",
    permanent: true,
  },
  {
    source: "/en-us/4180-overlay-door-hinge-caps",
    destination: "/en-us/products/4180-overlay-door-hinge-caps",
    permanent: true,
  },
  {
    source: "/en-us/4180-pilaster-kit",
    destination: "/en-us/products/4180-pilaster-kit",
    permanent: true,
  },
  {
    source: "/en-us/4180-pivot-roller-kit-for-117-flipper-door",
    destination: "/en-us/products/4180-pivot-roller-kit-for-117-flipper-door",
    permanent: true,
  },
  {
    source: "/en-us/9300-bracket-kits-platform-bracket-kits",
    destination: "/en-us/products/9300-bracket-kits-platform-bracket-kits",
    permanent: true,
  },
  {
    source: "/en-us/123-light-duty-slide-for-pocket-doors-with-hinges",
    destination:
      "/en-us/products/123-light-duty-slide-for-pocket-doors-with-hinges",
    permanent: true,
  },
  {
    source: "/en-us/1234-light-duty-slide-for-pocket-doors-without-hinges",
    destination:
      "/en-us/products/1234-light-duty-slide-for-pocket-doors-without-hinges",
    permanent: true,
  },
  {
    source:
      "/en-us/cb1321-pro-pocket-slide-for-pocket-and-flipper-doors-auto-open",
    destination:
      "/en-us/products/cb1321-pro-pocket-slide-for-pocket-and-flipper-doors-auto-open",
    permanent: true,
  },
  {
    source:
      "/en-us/cblift-quick-lift-a-remote-controlled-motorized-mechanical-lift",
    destination:
      "/en-us/products/cblift-quick-lift-a-remote-controlled-motorized-mechanical-lift",
    permanent: true,
  },
  {
    source: "/en-us/ss0115-cassette-with-stainless-steel-bearings",
    destination:
      "/en-us/products/ss0115-cassette-with-stainless-steel-bearings",
    permanent: true,
  },
  {
    source: "/en-us/ss0116-recycling-bracket",
    destination: "/en-us/products/ss0116-recycling-bracket",
    permanent: true,
  },
  {
    source: "/en-us/ss0116-door-bracket-kit",
    destination: "/en-us/products/ss0116-door-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-us/ss0116-cassette-with-stainless-steel-bearings",
    destination:
      "/en-us/products/ss0116-cassette-with-stainless-steel-bearings",
    permanent: true,
  },
  {
    source:
      "/en-us/al4160-super-heavy-duty-corrosion-resistant-full-extension-aluminum-slide",
    destination:
      "/en-us/products/al4160-super-heavy-duty-corrosion-resistant-full-extension-aluminum-slide",
    permanent: true,
  },
  {
    source: "/en-us/al4140-super-heavy-duty-corrosion-resistant-aluminum-slide",
    destination:
      "/en-us/products/al4140-super-heavy-duty-corrosion-resistant-aluminum-slide",
    permanent: true,
  },
  {
    source: "/en-us/al4120-super-heavy-duty-corrosion-resistant-aluminum-slide",
    destination:
      "/en-us/products/al4120-super-heavy-duty-corrosion-resistant-aluminum-slide",
    permanent: true,
  },
  {
    source: "/en-us/test-configurable",
    destination: "/en-us/products/test-configurable",
    permanent: true,
  },
  {
    source: "/en-us/0363-light-duty-two-way-travel-slide",
    destination: "/en-us/products/0363-light-duty-two-way-travel-slide",
    permanent: true,
  },
  {
    source: "/en-us/2002-two-way-travel-light-duty-and-non-disconnect-slide",
    destination:
      "/en-us/products/2002-two-way-travel-light-duty-and-non-disconnect-slide",
    permanent: true,
  },
  {
    source: "/en-us/cc11-cd-wide-cable-carrier",
    destination: "/en-us/products/cc11-cd-wide-cable-carrier",
    permanent: true,
  },
  {
    source: "/en-us/4180-0566-xe-wire-guide-hardware-kit",
    destination: "/en-us/products/4180-0566-xe-wire-guide-hardware-kit",
    permanent: true,
  },
  {
    source: "/en-us/4180-zinc-hinge-carrier-strip-kit",
    destination: "/en-us/products/4180-zinc-hinge-carrier-strip-kit",
    permanent: true,
  },
  {
    source:
      "/en-usd26i2x427qhmxm.cloudfront.net/en-us/products/116rc-linear-track-system-ie",
    destination:
      "/en-us/products/specialty-slides/116rc-heavy-duty-linear-track-system",
    permanent: true,
  },
  {
    source: "/en-us/catalogsearch/result/index/(.*)",
    destination: "/en-us/products/shop",
    permanent: true,
  },
  //=============Redirections for Canada Store===========================
  {
    source: "/en-ca/4010-rear-mounting-bracket-kit",
    destination: "/en-ca/products/4010-rear-mounting-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-ca/4010-reverse-rear-mounting-bracket-kit",
    destination: "/en-ca/products/4010-reverse-rear-mounting-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-ca/cb0115-easy-close-dampening-mechanism",
    destination: "/en-ca/products/cb0115-easy-close-dampening-mechanism",
    permanent: true,
  },
  {
    source: "/en-ca/4180-hardware-kit-with-polymer-ball-carriages",
    destination:
      "/en-ca/products/4180-hardware-kit-with-polymer-ball-carriages",
    permanent: true,
  },
  {
    source: "/en-ca/4180-hardware-kit-with-stainless-steel-ball-carriages",
    destination:
      "/en-ca/products/4180-hardware-kit-with-stainless-steel-ball-carriages",
    permanent: true,
  },
  {
    source: "/en-ca/4180-nuts-and-washers-for-individual-carriages",
    destination:
      "/en-ca/products/4180-nuts-and-washers-for-individual-carriages",
    permanent: true,
  },
  {
    source: "/en-ca/cb0116-damp-damper",
    destination: "/en-ca/products/cb0116-damp-damper",
    permanent: true,
  },
  {
    source: "/en-ca/4180-0391-base-kit",
    destination: "/en-ca/products/4180-0391-base-kit",
    permanent: true,
  },
  {
    source: "/en-ca/5410-0800-clip-on-bracket",
    destination: "/en-ca/products/5410-0800-clip-on-bracket",
    permanent: true,
  },
  {
    source: "/en-ca/5410-0801-clip-on-bracket",
    destination: "/en-ca/products/5410-0801-clip-on-bracket",
    permanent: true,
  },
  {
    source: "/en-ca/5410-0802-clip-on-bracket",
    destination: "/en-ca/products/5410-0802-clip-on-bracket",
    permanent: true,
  },
  {
    source: "/en-ca/cbhan3-stainless-steel-rods-0100",
    destination: "/en-ca/products/cbhan3-stainless-steel-rods-0100",
    permanent: true,
  },
  {
    source: "/en-ca/5410-0803-clip-on-bracket",
    destination: "/en-ca/products/5410-0803-clip-on-bracket",
    permanent: true,
  },
  {
    source: "/en-ca/4180-black-finish-bracket-kit",
    destination: "/en-ca/products/4180-black-finish-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-ca/4180-zinc-finish-bracket-kit",
    destination: "/en-ca/products/4180-zinc-finish-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-ca/4180-face-frame-bracket-kit",
    destination: "/en-ca/products/4180-face-frame-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-ca/5410-clip-on-bracket",
    destination: "/en-ca/products/5410-clip-on-bracket",
    permanent: true,
  },
  {
    source: "/en-ca/cc9-1-extension-cable-carrier-with-quick-disconnect",
    destination:
      "/en-ca/products/cc9-1-extension-cable-carrier-with-quick-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/cbhan3-stainless-steel-rods",
    destination: "/en-ca/products/cbhan3-stainless-steel-rods",
    permanent: true,
  },
  {
    source: "/en-ca/cc9-2-extension-cable-carrier-with-quick-disconnect",
    destination:
      "/en-ca/products/cc9-2-extension-cable-carrier-with-quick-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/4180-bottom-inset-face-frame-bracket-kit",
    destination: "/en-ca/products/4180-bottom-inset-face-frame-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-ca/4180-bottom-mount-bracket-kit",
    destination: "/en-ca/products/4180-bottom-mount-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-ca/4180-inset-face-frame-bracket-kit",
    destination: "/en-ca/products/4180-inset-face-frame-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-ca/4180-slotted-rear-face-frame-bracket-kit",
    destination: "/en-ca/products/4180-slotted-rear-face-frame-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-ca/4180-wide-drawer-stabilizer-kit",
    destination: "/en-ca/products/4180-wide-drawer-stabilizer-kit",
    permanent: true,
  },
  {
    source: "/en-ca/4180-black-hinge-kit-for-inset-doors",
    destination: "/en-ca/products/4180-black-hinge-kit-for-inset-doors",
    permanent: true,
  },
  {
    source: "/en-ca/4180-zinc-hinge-kit-for-inset-doors",
    destination: "/en-ca/products/4180-zinc-hinge-kit-for-inset-doors",
    permanent: true,
  },
  {
    source: "/en-ca/4180-rear-bracket-kit",
    destination: "/en-ca/products/4180-rear-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-ca/4180-face-frame-kit",
    destination: "/en-ca/products/4180-face-frame-kit",
    permanent: true,
  },
  {
    source: "/en-ca/4180-rear-face-frame-bracket-kit",
    destination: "/en-ca/products/4180-rear-face-frame-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-ca/4180-rear-bracket-kit-easy-close",
    destination: "/en-ca/products/4180-rear-bracket-kit-easy-close",
    permanent: true,
  },
  {
    source: "/en-ca/4180-rear-bracket-kit-touch-release",
    destination: "/en-ca/products/4180-rear-bracket-kit-touch-release",
    permanent: true,
  },
  {
    source: "/en-ca/4180-hinge-kit-for-inset-doors",
    destination: "/en-ca/products/4180-hinge-kit-for-inset-doors",
    permanent: true,
  },
  {
    source: "/en-ca/4180-0313-salice-clip-on-hinge-kit-inset-thick-doors",
    destination:
      "/en-ca/products/4180-0313-salice-clip-on-hinge-kit-inset-thick-doors",
    permanent: true,
  },
  {
    source: "/en-ca/4180-0314-salice-clip-on-hinge-kit-overlay",
    destination: "/en-ca/products/4180-0314-salice-clip-on-hinge-kit-overlay",
    permanent: true,
  },
  {
    source:
      "/en-ca/6331-aero-iii-light-duty-undermount-slide-with-full-customization",
    destination:
      "/en-ca/products/6331-aero-iii-light-duty-undermount-slide-with-full-customization",
    permanent: true,
  },
  {
    source: "/en-ca/al0115-0120rc-aluminum-track",
    destination: "/en-ca/products/al0115-0120rc-aluminum-track",
    permanent: true,
  },
  {
    source: "/en-ca/al0115-0120rch-aluminum-track-with-pre-drilled-holes",
    destination:
      "/en-ca/products/al0115-0120rch-aluminum-track-with-pre-drilled-holes",
    permanent: true,
  },
  {
    source: "/en-ca/al0115-0240rc-aluminum-track",
    destination: "/en-ca/products/al0115-0240rc-aluminum-track",
    permanent: true,
  },
  {
    source: "/en-ca/al0115-0240rch-aluminum-track-with-pre-drilled-holes",
    destination:
      "/en-ca/products/al0115-0240rch-aluminum-track-with-pre-drilled-holes",
    permanent: true,
  },
  {
    source: "/en-ca/al0115-aluminum-end-stop",
    destination: "/en-ca/products/al0115-aluminum-end-stop",
    permanent: true,
  },
  {
    source: "/en-ca/al0116-0240rc-aluminum-track",
    destination: "/en-ca/products/al0116-0240rc-aluminum-track",
    permanent: true,
  },
  {
    source: "/en-ca/al0116-0360rc-aluminum-track",
    destination: "/en-ca/products/al0116-0360rc-aluminum-track",
    permanent: true,
  },
  {
    source: "/en-ca/al0116-fascia-end-caps",
    destination: "/en-ca/products/al0116-fascia-end-caps",
    permanent: true,
  },
  {
    source: "/en-ca/al0116-aluminum-fascia",
    destination: "/en-ca/products/al0116-aluminum-fascia",
    permanent: true,
  },
  {
    source: "/en-ca/al0116-aluminum-end-stops",
    destination: "/en-ca/products/al0116-aluminum-end-stops",
    permanent: true,
  },
  {
    source: "/en-ca/al0116-support-beam",
    destination: "/en-ca/products/al0116-support-beam",
    permanent: true,
  },
  {
    source:
      "/en-ca/cblift-0019-lift-ascent-light-duty-slide-for-small-push-to-operate-mechanical-lifts",
    destination:
      "/en-ca/products/cblift-0019-lift-ascent-light-duty-slide-for-small-push-to-operate-mechanical-lifts",
    permanent: true,
  },
  {
    source: "/en-ca/4180-black-hinge-carrier-strip-kit",
    destination: "/en-ca/products/4180-black-hinge-carrier-strip-kit",
    permanent: true,
  },
  {
    source: "/en-ca/cb0115-cassette-with-polymer-bearings",
    destination: "/en-ca/products/cb0115-cassette-with-polymer-bearings",
    permanent: true,
  },
  {
    source: "/en-ca/cb0116-cassette-with-polymer-bearings",
    destination: "/en-ca/products/cb0116-cassette-with-polymer-bearings",
    permanent: true,
  },
  {
    source: "/en-ca/cbergo-tray-200-ergonomic-keyboard-tray",
    destination: "/en-ca/products/cbergo-tray-200-ergonomic-keyboard-tray",
    permanent: true,
  },
  {
    source: "/en-ca/cbergo-tray-300-ergonomic-keyboard-tray",
    destination: "/en-ca/products/cbergo-tray-300-ergonomic-keyboard-tray",
    permanent: true,
  },
  {
    source: "/en-ca/2990-additional-weight-packs",
    destination: "/en-ca/products/2990-additional-weight-packs",
    permanent: true,
  },
  {
    source: "/en-ca/2990-vesa-fixed-bracket-kit",
    destination: "/en-ca/products/2990-vesa-fixed-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-ca/2990-vesa-tilt-bracket-kit",
    destination: "/en-ca/products/2990-vesa-tilt-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-ca/2990-weight-extension-plate-kit",
    destination: "/en-ca/products/2990-weight-extension-plate-kit",
    permanent: true,
  },
  {
    source: "/en-ca/4180-cblift-050-fixed-lid-bracket",
    destination: "/en-ca/products/4180-cblift-050-fixed-lid-bracket",
    permanent: true,
  },
  {
    source: "/en-ca/4180-replacement-remote-controls",
    destination: "/en-ca/products/4180-replacement-remote-controls",
    permanent: true,
  },
  {
    source: "/en-ca/3160ec-soft-close-undermount-slide-for-ultra-wide-drawers",
    destination:
      "/en-ca/products/3160ec-soft-close-undermount-slide-for-ultra-wide-drawers",
    permanent: true,
  },
  {
    source: "/en-ca/4180-connector-clip-kit",
    destination: "/en-ca/products/4180-connector-clip-kit",
    permanent: true,
  },
  {
    source:
      "/en-ca/8100-custom-flat-mount-linear-travel-slide-with-dampened-movement",
    destination:
      "/en-ca/products/8100-custom-flat-mount-linear-travel-slide-with-dampened-movement",
    permanent: true,
  },
  {
    source: "/en-ca/dz0115-drilling-jig",
    destination: "/en-ca/products/dz0115-drilling-jig",
    permanent: true,
  },
  {
    source:
      "/en-ca/3832ec-easy-close-light-duty-side-mount-slide-lever-disconnect",
    destination:
      "/en-ca/products/3832ec-easy-close-light-duty-side-mount-slide-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-ca/cb1155-easy-down-light-duty-slide-with-easy-close-for-flipper-doors",
    destination:
      "/en-ca/products/cb1155-easy-down-light-duty-slide-with-easy-close-for-flipper-doors",
    permanent: true,
  },
  {
    source:
      "/en-ca/c1155-easy-down-light-duty-slide-with-easy-close-for-flipper-doors",
    destination:
      "/en-ca/products/c1155-easy-down-light-duty-slide-with-easy-close-for-flipper-doors",
    permanent: true,
  },
  {
    source: "/en-ca/4180-eclipse-drill-jig",
    destination: "/en-ca/products/4180-eclipse-drill-jig",
    permanent: true,
  },
  {
    source: "/en-ca/3135ec-eclipse-easy-close-undermount-slide",
    destination: "/en-ca/products/3135ec-eclipse-easy-close-undermount-slide",
    permanent: true,
  },
  {
    source: "/en-ca/4180-eclipse-lever-disconnects",
    destination: "/en-ca/products/4180-eclipse-lever-disconnects",
    permanent: true,
  },
  {
    source: "/en-ca/4180-eclipse-toolkit",
    destination: "/en-ca/products/4180-eclipse-toolkit",
    permanent: true,
  },
  {
    source:
      "/en-ca/9307e-extra-heavy-duty-full-extension-slide-with-lock-out-and-front-latch-release",
    destination:
      "/en-ca/products/9307e-extra-heavy-duty-full-extension-slide-with-lock-out-and-front-latch-release",
    permanent: true,
  },
  {
    source: "/en-ca/fg115-0100t-aluminum-rail",
    destination: "/en-ca/products/fg115-0100t-aluminum-rail",
    permanent: true,
  },
  {
    source: "/en-ca/fg115-0200t-aluminum-rail",
    destination: "/en-ca/products/fg115-0200t-aluminum-rail",
    permanent: true,
  },
  {
    source: "/en-ca/fg115-auto-adjust-carriage",
    destination: "/en-ca/products/fg115-auto-adjust-carriage",
    permanent: true,
  },
  {
    source: "/en-ca/fg115-manual-adjust-carriage",
    destination: "/en-ca/products/fg115-manual-adjust-carriage",
    permanent: true,
  },
  {
    source: "/en-ca/fg115-non-adjust-carriage",
    destination: "/en-ca/products/fg115-non-adjust-carriage",
    permanent: true,
  },
  {
    source: "/en-ca/cbhand-handle-kit-with-lock-in",
    destination: "/en-ca/products/cbhand-handle-kit-with-lock-in",
    permanent: true,
  },
  {
    source: "/en-ca/9308e-heavy-duty-full-extension-slide",
    destination: "/en-ca/products/9308e-heavy-duty-full-extension-slide",
    permanent: true,
  },
  {
    source:
      "/en-ca/9301e-heavy-duty-full-extension-drawer-slide-non-disconnect",
    destination:
      "/en-ca/products/9301e-heavy-duty-full-extension-drawer-slide-non-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/7950-heavy-duty-full-extension-non-disconnect-slide",
    destination:
      "/en-ca/products/7950-heavy-duty-full-extension-non-disconnect-slide",
    permanent: true,
  },
  {
    source:
      "/en-ca/c3600-200d-heavy-duty-self-closing-slide-with-platform-mount",
    destination:
      "/en-ca/products/c3600-200d-heavy-duty-self-closing-slide-with-platform-mount",
    permanent: true,
  },
  {
    source:
      "/en-ca/c3600-201d-heavy-duty-self-closing-slide-with-platform-mount",
    destination:
      "/en-ca/products/c3600-201d-heavy-duty-self-closing-slide-with-platform-mount",
    permanent: true,
  },
  {
    source: "/en-ca/3600-heavy-duty-full-extension-slide",
    destination: "/en-ca/products/3600-heavy-duty-full-extension-slide",
    permanent: true,
  },
  {
    source:
      "/en-ca/3600tr-heavy-duty-full-extension-slide-with-hold-in-detent-and-lever-disconnect",
    destination:
      "/en-ca/products/3600tr-heavy-duty-full-extension-slide-with-hold-in-detent-and-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-ca/3600ad-heavy-duty-full-extension-slide-with-hold-in-detent-and-lever-disconnect",
    destination:
      "/en-ca/products/3600ad-heavy-duty-full-extension-slide-with-hold-in-detent-and-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-ca/9322e-heavy-duty-slide-with-pocket-and-bayonet-and-non-locking-companion-slide",
    destination:
      "/en-ca/products/9322e-heavy-duty-slide-with-pocket-and-bayonet-and-non-locking-companion-slide",
    permanent: true,
  },
  {
    source:
      "/en-ca/9328e-heavy-duty-slide-with-pocket-and-bayonet-lock-in-and-lock-out",
    destination:
      "/en-ca/products/9328e-heavy-duty-slide-with-pocket-and-bayonet-lock-in-and-lock-out",
    permanent: true,
  },
  {
    source: "/en-ca/3600ec-heavy-duty-full-extension-slide-with-soft-close",
    destination:
      "/en-ca/products/3600ec-heavy-duty-full-extension-slide-with-soft-close",
    permanent: true,
  },
  {
    source: "/en-ca/3641-heavy-duty-interlock-slide",
    destination: "/en-ca/products/3641-heavy-duty-interlock-slide",
    permanent: true,
  },
  {
    source: "/en-ca/3641x-heavy-duty-interlock-slide-system",
    destination: "/en-ca/products/3641x-heavy-duty-interlock-slide-system",
    permanent: true,
  },
  {
    source: "/en-ca/116rc-heavy-duty-linear-track-system",
    destination: "/en-ca/products/116rc-heavy-duty-linear-track-system",
    permanent: true,
  },
  {
    source: "/en-ca/301-heavy-duty-low-profile-slide-with-over-travel",
    destination:
      "/en-ca/products/301-heavy-duty-low-profile-slide-with-over-travel",
    permanent: true,
  },
  {
    source:
      "/en-ca/ss5321-heavy-duty-over-travel-and-corrosion-resistant-slide",
    destination:
      "/en-ca/products/ss5321-heavy-duty-over-travel-and-corrosion-resistant-slide",
    permanent: true,
  },
  {
    source: "/en-ca/ss5322-heavy-duty-over-travel-slide-bracket-disconnect",
    destination:
      "/en-ca/products/ss5322-heavy-duty-over-travel-slide-bracket-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/3601-heavy-duty-over-travel-and-non-disconnect-slide",
    destination:
      "/en-ca/products/3601-heavy-duty-over-travel-and-non-disconnect-slide",
    permanent: true,
  },
  {
    source:
      "/en-ca/3640a-heavy-duty-over-travel-slide-with-adapter-rail-mount-disconnect",
    destination:
      "/en-ca/products/3640a-heavy-duty-over-travel-slide-with-adapter-rail-mount-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-ca/3620-heavy-duty-over-travel-slide-with-pocket-and-bayonet-and-non-disconnect",
    destination:
      "/en-ca/products/3620-heavy-duty-over-travel-slide-with-pocket-and-bayonet-and-non-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-ca/9308-heavy-duty-right-handed-locking-slide-with-non-locking-slide",
    destination:
      "/en-ca/products/9308-heavy-duty-right-handed-locking-slide-with-non-locking-slide",
    permanent: true,
  },
  {
    source: "/en-ca/3657-heavy-duty-slide-with-lever-disconnect",
    destination: "/en-ca/products/3657-heavy-duty-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/3507-heavy-duty-slide-with-lock-out",
    destination: "/en-ca/products/3507-heavy-duty-slide-with-lock-out",
    permanent: true,
  },
  {
    source: "/en-ca/3607-heavy-duty-slide-with-lock-out-and-lever-disconnect",
    destination:
      "/en-ca/products/3607-heavy-duty-slide-with-lock-out-and-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/cb3620-heavy-duty-slide-with-pull-out-access",
    destination: "/en-ca/products/cb3620-heavy-duty-slide-with-pull-out-access",
    permanent: true,
  },
  {
    source: "/en-ca/7957-heavy-duty-with-lever-disconnect",
    destination: "/en-ca/products/7957-heavy-duty-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/4180-interlock-gang-locking-kit",
    destination: "/en-ca/products/4180-interlock-gang-locking-kit",
    permanent: true,
  },
  {
    source:
      "/en-ca/3832e-light-duty-full-extension-slide-with-lever-disconnect",
    destination:
      "/en-ca/products/3832e-light-duty-full-extension-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/2907-light-duty-low-profile-slide-with-over-travel",
    destination:
      "/en-ca/products/2907-light-duty-low-profile-slide-with-over-travel",
    permanent: true,
  },
  {
    source: "/en-ca/ss2028-light-duty-extension-and-corrosion-resistant-slide",
    destination:
      "/en-ca/products/ss2028-light-duty-extension-and-corrosion-resistant-slide",
    permanent: true,
  },
  {
    source:
      "/en-ca/3832aa-light-duty-full-extension-and-action-assist-slide-with-lever-disconnect",
    destination:
      "/en-ca/products/3832aa-light-duty-full-extension-and-action-assist-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-ca/3832etr-light-duty-touch-release-slide-with-lever-disconnect",
    destination:
      "/en-ca/products/3832etr-light-duty-touch-release-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-ca/3832ehdtr-heavy-duty-touch-release-slide-with-lever-disconnect",
    destination:
      "/en-ca/products/3832ehdtr-heavy-duty-touch-release-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/cb3832ec-side-mount-slide-with-easy-close-lever-disconnect",
    destination:
      "/en-ca/products/cb3832ec-side-mount-slide-with-easy-close-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/4033-light-duty-full-extension-and-ultra-quiet-slide",
    destination:
      "/en-ca/products/4033-light-duty-full-extension-and-ultra-quiet-slide",
    permanent: true,
  },
  {
    source:
      "/en-ca/ch3832e-light-duty-weather-resistant-slide-with-lever-disconnect",
    destination:
      "/en-ca/products/ch3832e-light-duty-weather-resistant-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-ca/3832edo-light-duty-full-extension-slide-with-detent-out-and-lever-disconnect",
    destination:
      "/en-ca/products/3832edo-light-duty-full-extension-slide-with-detent-out-and-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/3832ehdsc-light-duty-slide-with-heavy-duty-self-close",
    destination:
      "/en-ca/products/3832ehdsc-light-duty-slide-with-heavy-duty-self-close",
    permanent: true,
  },
  {
    source:
      "/en-ca/cb3832e-light-duty-full-extension-slide-with-lever-disconnect-and-black-finish",
    destination:
      "/en-ca/products/cb3832e-light-duty-full-extension-slide-with-lever-disconnect-and-black-finish",
    permanent: true,
  },
  {
    source:
      "/en-ca/ew3832e-light-duty-full-extension-slide-with-lever-disconnect-and-white-finish",
    destination:
      "/en-ca/products/ew3832e-light-duty-full-extension-slide-with-lever-disconnect-and-white-finish",
    permanent: true,
  },
  {
    source:
      "/en-ca/3820-light-duty-slide-with-pocket-and-bayonet-and-lever-disconnect",
    destination:
      "/en-ca/products/3820-light-duty-slide-with-pocket-and-bayonet-and-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-ca/7432-light-duty-full-extension-slide-with-rail-mounting-and-progressive-movement",
    destination:
      "/en-ca/products/7432-light-duty-full-extension-slide-with-rail-mounting-and-progressive-movement",
    permanent: true,
  },
  {
    source:
      "/en-ca/cb3832esc-light-duty-slide-with-self-close-lever-disconnect",
    destination:
      "/en-ca/products/cb3832esc-light-duty-slide-with-self-close-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-ca/ew3832esc-light-duty-slide-with-self-close-lever-disconnect",
    destination:
      "/en-ca/products/ew3832esc-light-duty-slide-with-self-close-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/3832esc-light-duty-slide-with-self-close-lever-disconnect",
    destination:
      "/en-ca/products/3832esc-light-duty-slide-with-self-close-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/fg115-light-duty-linear-friction-guide-system",
    destination:
      "/en-ca/products/fg115-light-duty-linear-friction-guide-system",
    permanent: true,
  },
  {
    source: "/en-ca/115-light-duty-linear-motion-slide",
    destination: "/en-ca/products/115-light-duty-linear-motion-slide",
    permanent: true,
  },
  {
    source:
      "/en-ca/2807-light-duty-low-profile-slide-with-over-travel-for-1u-2u",
    destination:
      "/en-ca/products/2807-light-duty-low-profile-slide-with-over-travel-for-1u-2u",
    permanent: true,
  },
  {
    source: "/en-ca/2632-light-duty-low-profile-slide-with-rail-mounting",
    destination:
      "/en-ca/products/2632-light-duty-low-profile-slide-with-rail-mounting",
    permanent: true,
  },
  {
    source: "/en-ca/4035-light-duty-over-travel-and-ultra-quiet-slide",
    destination:
      "/en-ca/products/4035-light-duty-over-travel-and-ultra-quiet-slide",
    permanent: true,
  },
  {
    source: "/en-ca/cb3834-light-duty-over-travel-slide-with-lever-disconnect",
    destination:
      "/en-ca/products/cb3834-light-duty-over-travel-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/3834e-light-duty-over-travel-slide-with-lever-disconnect",
    destination:
      "/en-ca/products/3834e-light-duty-over-travel-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-ca/7434-light-duty-over-travel-slide-with-rail-mounting-and-progressive-movement",
    destination:
      "/en-ca/products/7434-light-duty-over-travel-slide-with-rail-mounting-and-progressive-movement",
    permanent: true,
  },
  {
    source:
      "/en-ca/3834esc-light-duty-over-travel-slide-with-self-close-and-lever-disconnect",
    destination:
      "/en-ca/products/3834esc-light-duty-over-travel-slide-with-self-close-and-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-ca/2120-light-duty-pocket-and-bayonet-slide-with-lever-disconnect",
    destination:
      "/en-ca/products/2120-light-duty-pocket-and-bayonet-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/201-light-duty-slide",
    destination: "/en-ca/products/201-light-duty-slide",
    permanent: true,
  },
  {
    source: "/en-ca/c1145-light-duty-slide-for-flipper-doors",
    destination: "/en-ca/products/c1145-light-duty-slide-for-flipper-doors",
    permanent: true,
  },
  {
    source: "/en-ca/2019-light-duty-slide-for-platform-mounting",
    destination: "/en-ca/products/2019-light-duty-slide-for-platform-mounting",
    permanent: true,
  },
  {
    source: "/en-ca/117-light-duty-slide-for-pocket-doors",
    destination: "/en-ca/products/117-light-duty-slide-for-pocket-doors",
    permanent: true,
  },
  {
    source: "/en-ca/cb1332-light-duty-slide-for-tall-pocket-doors-with-hinges",
    destination:
      "/en-ca/products/cb1332-light-duty-slide-for-tall-pocket-doors-with-hinges",
    permanent: true,
  },
  {
    source: "/en-ca/1432-light-duty-slide-for-tall-pocket-doors-without-hinges",
    destination:
      "/en-ca/products/1432-light-duty-slide-for-tall-pocket-doors-without-hinges",
    permanent: true,
  },
  {
    source: "/en-ca/2507-light-duty-slide-for-toolless-installation",
    destination:
      "/en-ca/products/2507-light-duty-slide-for-toolless-installation",
    permanent: true,
  },
  {
    source: "/en-ca/c340-light-duty-slide-with-butcher-block-and-lock-out",
    destination:
      "/en-ca/products/c340-light-duty-slide-with-butcher-block-and-lock-out",
    permanent: true,
  },
  {
    source:
      "/en-ca/2006-light-duty-slide-with-friction-disconnect-pencil-drawer-slide",
    destination:
      "/en-ca/products/2006-light-duty-slide-with-friction-disconnect-pencil-drawer-slide",
    permanent: true,
  },
  {
    source: "/en-ca/2601-light-duty-slide-with-hold-in-detent",
    destination: "/en-ca/products/2601-light-duty-slide-with-hold-in-detent",
    permanent: true,
  },
  {
    source: "/en-ca/2132-light-duty-slide-with-lever-disconnect",
    destination: "/en-ca/products/2132-light-duty-slide-with-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-ca/2109-light-duty-slide-with-lever-disconnect-for-suspended-mounting",
    destination:
      "/en-ca/products/2109-light-duty-slide-with-lever-disconnect-for-suspended-mounting",
    permanent: true,
  },
  {
    source:
      "/en-ca/c322-light-duty-slide-with-over-travel-and-quick-mounting-tabs",
    destination:
      "/en-ca/products/c322-light-duty-slide-with-over-travel-and-quick-mounting-tabs",
    permanent: true,
  },
  {
    source: "/en-ca/3017-light-duty-slide-with-over-travel-and-rail-mounting",
    destination:
      "/en-ca/products/3017-light-duty-slide-with-over-travel-and-rail-mounting",
    permanent: true,
  },
  {
    source: "/en-ca/2037-light-duty-slide-with-rail-mount-disconnect",
    destination:
      "/en-ca/products/2037-light-duty-slide-with-rail-mount-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/1029-light-duty-undermount-slide-with-disconnect",
    destination:
      "/en-ca/products/1029-light-duty-undermount-slide-with-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/3732-light-duty-full-extension-slide-with-low-profile",
    destination:
      "/en-ca/products/3732-light-duty-full-extension-slide-with-low-profile",
    permanent: true,
  },
  {
    source:
      "/en-ca/2907wb-light-duty-over-travel-slide-with-low-profile-and-lever-disconnect",
    destination:
      "/en-ca/products/2907wb-light-duty-over-travel-slide-with-low-profile-and-lever-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-ca/cbhandle-system-lock-in-lock-out-handle-kit-for-heavy-duty-drawers-trays",
    destination:
      "/en-ca/products/cbhandle-system-lock-in-lock-out-handle-kit-for-heavy-duty-drawers-trays",
    permanent: true,
  },
  {
    source: "/en-ca/cbhan4-lock-out-conversion-kit",
    destination: "/en-ca/products/cbhan4-lock-out-conversion-kit",
    permanent: true,
  },
  {
    source: "/en-ca/3634ec-medium-duty-over-travel-slide-with-easy-close",
    destination:
      "/en-ca/products/3634ec-medium-duty-over-travel-slide-with-easy-close",
    permanent: true,
  },
  {
    source:
      "/en-ca/4034-medium-duty-over-travel-slide-with-progressive-movement",
    destination:
      "/en-ca/products/4034-medium-duty-over-travel-slide-with-progressive-movement",
    permanent: true,
  },
  {
    source: "/en-ca/c204-medium-duty-slide-with-lock-out-and-latch-disconnect",
    destination:
      "/en-ca/products/c204-medium-duty-slide-with-lock-out-and-latch-disconnect",
    permanent: true,
  },
  {
    source:
      "/en-ca/ss0330-medium-duty-full-extension-and-corrosion-resistant-slide",
    destination:
      "/en-ca/products/ss0330-medium-duty-full-extension-and-corrosion-resistant-slide",
    permanent: true,
  },
  {
    source:
      "/en-ca/4032-medium-duty-full-extension-slide-with-progressive-movement",
    destination:
      "/en-ca/products/4032-medium-duty-full-extension-slide-with-progressive-movement",
    permanent: true,
  },
  {
    source: "/en-ca/115rc-medium-duty-linear-track-system",
    destination: "/en-ca/products/115rc-medium-duty-linear-track-system",
    permanent: true,
  },
  {
    source: "/en-ca/301-2590-medium-duty-over-travel-and-non-disconnect-slide",
    destination:
      "/en-ca/products/301-2590-medium-duty-over-travel-and-non-disconnect-slide",
    permanent: true,
  },
  {
    source: "/en-ca/3634-medium-duty-over-travel-slide",
    destination: "/en-ca/products/3634-medium-duty-over-travel-slide",
    permanent: true,
  },
  {
    source:
      "/en-ca/3357-medium-duty-over-travel-slide-with-latch-disconnect-and-detent-in",
    destination:
      "/en-ca/products/3357-medium-duty-over-travel-slide-with-latch-disconnect-and-detent-in",
    permanent: true,
  },
  {
    source: "/en-ca/c305-medium-duty-over-travel-slide-with-lock-out",
    destination:
      "/en-ca/products/c305-medium-duty-over-travel-slide-with-lock-out",
    permanent: true,
  },
  {
    source: "/en-ca/3320-medium-duty-pocket-bayonet-slide",
    destination: "/en-ca/products/3320-medium-duty-pocket-bayonet-slide",
    permanent: true,
  },
  {
    source:
      "/en-ca/3308-medium-duty-slide-with-latch-disconnect-lock-in-and-lock-out",
    destination:
      "/en-ca/products/3308-medium-duty-slide-with-latch-disconnect-lock-in-and-lock-out",
    permanent: true,
  },
  {
    source: "/en-ca/3308r-150lbs-latch-disconnect",
    destination: "/en-ca/products/3308r-150lbs-latch-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/3306do-detent-out-150lbs-lever-disconnect",
    destination: "/en-ca/products/3306do-detent-out-150lbs-lever-disconnect",
    permanent: true,
  },
  {
    source: "/en-ca/3301-medium-duty-slide-with-over-travel",
    destination: "/en-ca/products/3301-medium-duty-slide-with-over-travel",
    permanent: true,
  },
  {
    source:
      "/en-ca/3307-medium-duty-slide-with-over-travel-latch-disconnect-and-lock-out",
    destination:
      "/en-ca/products/3307-medium-duty-slide-with-over-travel-latch-disconnect-and-lock-out",
    permanent: true,
  },
  {
    source: "/en-ca/al4190-medium-duty-slide-with-tilt-track-system",
    destination:
      "/en-ca/products/al4190-medium-duty-slide-with-tilt-track-system",
    permanent: true,
  },
  {
    source: "/en-ca/4180-mounting-bracket-kit-for-1145-flipper-door",
    destination:
      "/en-ca/products/4180-mounting-bracket-kit-for-1145-flipper-door",
    permanent: true,
  },
  {
    source: "/en-ca/4180-mounting-bracket-kit",
    destination: "/en-ca/products/4180-mounting-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-ca/4180-mounting-bracket-kit-for-2019",
    destination: "/en-ca/products/4180-mounting-bracket-kit-for-2019",
    permanent: true,
  },
  {
    source: "/en-ca/4180-xe-mounting-bracket-kit-for-2019",
    destination: "/en-ca/products/4180-xe-mounting-bracket-kit-for-2019",
    permanent: true,
  },
  {
    source: "/en-ca/4180-overlay-door-hinge-caps",
    destination: "/en-ca/products/4180-overlay-door-hinge-caps",
    permanent: true,
  },
  {
    source: "/en-ca/4180-pilaster-kit",
    destination: "/en-ca/products/4180-pilaster-kit",
    permanent: true,
  },
  {
    source: "/en-ca/4180-pivot-roller-kit-for-117-flipper-door",
    destination: "/en-ca/products/4180-pivot-roller-kit-for-117-flipper-door",
    permanent: true,
  },
  {
    source: "/en-ca/9300-bracket-kits-platform-bracket-kits",
    destination: "/en-ca/products/9300-bracket-kits-platform-bracket-kits",
    permanent: true,
  },
  {
    source: "/en-ca/123-light-duty-slide-for-pocket-doors-with-hinges",
    destination:
      "/en-ca/products/123-light-duty-slide-for-pocket-doors-with-hinges",
    permanent: true,
  },
  {
    source: "/en-ca/1234-light-duty-slide-for-pocket-doors-without-hinges",
    destination:
      "/en-ca/products/1234-light-duty-slide-for-pocket-doors-without-hinges",
    permanent: true,
  },
  {
    source:
      "/en-ca/cb1321-pro-pocket-slide-for-pocket-and-flipper-doors-auto-open",
    destination:
      "/en-ca/products/cb1321-pro-pocket-slide-for-pocket-and-flipper-doors-auto-open",
    permanent: true,
  },
  {
    source:
      "/en-ca/cblift-quick-lift-a-remote-controlled-motorized-mechanical-lift",
    destination:
      "/en-ca/products/cblift-quick-lift-a-remote-controlled-motorized-mechanical-lift",
    permanent: true,
  },
  {
    source: "/en-ca/ss0115-cassette-with-stainless-steel-bearings",
    destination:
      "/en-ca/products/ss0115-cassette-with-stainless-steel-bearings",
    permanent: true,
  },
  {
    source: "/en-ca/ss0116-recycling-bracket",
    destination: "/en-ca/products/ss0116-recycling-bracket",
    permanent: true,
  },
  {
    source: "/en-ca/ss0116-door-bracket-kit",
    destination: "/en-ca/products/ss0116-door-bracket-kit",
    permanent: true,
  },
  {
    source: "/en-ca/ss0116-cassette-with-stainless-steel-bearings",
    destination:
      "/en-ca/products/ss0116-cassette-with-stainless-steel-bearings",
    permanent: true,
  },
  {
    source:
      "/en-ca/al4160-super-heavy-duty-corrosion-resistant-full-extension-aluminum-slide",
    destination:
      "/en-ca/products/al4160-super-heavy-duty-corrosion-resistant-full-extension-aluminum-slide",
    permanent: true,
  },
  {
    source: "/en-ca/al4140-super-heavy-duty-corrosion-resistant-aluminum-slide",
    destination:
      "/en-ca/products/al4140-super-heavy-duty-corrosion-resistant-aluminum-slide",
    permanent: true,
  },
  {
    source: "/en-ca/al4120-super-heavy-duty-corrosion-resistant-aluminum-slide",
    destination:
      "/en-ca/products/al4120-super-heavy-duty-corrosion-resistant-aluminum-slide",
    permanent: true,
  },
  {
    source: "/en-ca/test-configurable",
    destination: "/en-ca/products/test-configurable",
    permanent: true,
  },
  {
    source: "/en-ca/0363-light-duty-two-way-travel-slide",
    destination: "/en-ca/products/0363-light-duty-two-way-travel-slide",
    permanent: true,
  },
  {
    source: "/en-ca/2002-two-way-travel-light-duty-and-non-disconnect-slide",
    destination:
      "/en-ca/products/2002-two-way-travel-light-duty-and-non-disconnect-slide",
    permanent: true,
  },
  {
    source: "/en-ca/cc11-cd-wide-cable-carrier",
    destination: "/en-ca/products/cc11-cd-wide-cable-carrier",
    permanent: true,
  },
  {
    source: "/en-ca/4180-0566-xe-wire-guide-hardware-kit",
    destination: "/en-ca/products/4180-0566-xe-wire-guide-hardware-kit",
    permanent: true,
  },
  {
    source: "/en-ca/4180-zinc-hinge-carrier-strip-kit",
    destination: "/en-ca/products/4180-zinc-hinge-carrier-strip-kit",
    permanent: true,
  },
  {
    source: "/en-ca/catalogsearch/result/index/(.*)",
    destination: "/en-ca/products/shop",
    permanent: true,
  },
];

export default productRedirects;

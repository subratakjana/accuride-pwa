import { useEffect, useState } from "react";
import { I18nLink } from "@Components/Utilities";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import DESKTOP_MEGA_MENU from "@Graphql/queriesgraphcms/getDesktopMegaMenu.graphql";
import { useRouter } from "next/router";
import LazySubMenu from "@Components/HeaderDesktop/MegaMenu/SubMenu";
import styles from "@Components/HeaderDesktop/MegaMenu/MegaMenu.module.scss";

const MegaMenu = (props) => {
  const [megaMenu, setMegaMenu] = useState(
    props.megaMenu?.desktopMegaMenus?.[0].subMenu ?? [],
  );
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    setSubMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setSubMenuVisible(false);
  };

  const hideAllSubSubMenu = () => {
    const getAllElements = document.querySelectorAll(".acc-submenu-content");
    const visibleElements = Array.from(getAllElements).filter(
      (element) => getComputedStyle(element).display === "block",
    );
    if (visibleElements.length > 0) {
      visibleElements.forEach((el) => {
        el.style.display = "none";
      });
    }
  };
  const removeActiveClass = () => {
    const activeSubmenuLists = document.querySelectorAll(
      ".acc-submenu-list.activeList",
    );
    activeSubmenuLists.forEach((submenuList) => {
      submenuList.classList.remove("activeList");
    });
  };
  useEffect(() => {
    // by default display first child of sub-sub menu
    const handleMenuItemMouseEnter = (el) => {
      hideAllSubSubMenu();
      const firstChild = el.querySelector(".acc-submenu-content");
      if (firstChild) firstChild.style.display = "block";
      const firstSubMenu = el.querySelector(".acc-submenu-list");
      if (firstSubMenu) firstSubMenu.classList.add("activeList");
    };
    document.querySelectorAll(".menu-item").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        setTimeout(() => {
          handleMenuItemMouseEnter(el);
        }, 100);
      });
    });
    document.querySelectorAll(".acc-submenu-list").forEach((el, index) => {
      el.addEventListener("mouseenter", () => {
        removeActiveClass();
        const getAllElements = document.querySelectorAll(
          ".acc-submenu-content",
        );
        hideAllSubSubMenu();
        getAllElements.forEach((el2, index2) => {
          if (index === index2) {
            el2.style.display = "block";
          } else el2.style.display = "none";
        });
      });
    });
    document.querySelectorAll(".acc-submenu-content").forEach((el) => {
      el.addEventListener("mouseenter", (event) => {
        const dataId = event.target.getAttribute("data-id");
        const element = document.getElementById(dataId);
        if (element) {
          element.classList.add("activeList");
        }
      });
    });
  });
  const fetchDesktopMegaMenu = async () => {
    const getData = await gqlFetch(
      DESKTOP_MEGA_MENU,
      { languages: "English", pageSlug: "megamenu" },
      "CMS",
    );
    if (getData) {
      setMegaMenu(getData?.data?.desktopMegaMenus?.[0].subMenu ?? []);
    } else {
      fetch("/static/megaMenu.json")
        .then(async (res) => {
          const getRes = await res.json();
          setMegaMenu(getRes?.desktopMegaMenus?.[0].subMenu ?? []);
        })
        .catch((err) => console.log("err", err));
    }
  };
  useEffect(() => {
    if (megaMenu && megaMenu.length === 0) {
      fetchDesktopMegaMenu();
    }
  }, []);
  const finalMenu = megaMenu.filter((item) => item.show !== false);
  const getLink = (
    item,
    ifAdditionalLink = false,
    ifParent = false,
    getLength,
  ) => {
    const getClass = getLength && getLength >= 4 ? "text-center" : "";
    if (item.externalLink !== "0" && item.pageSlugUrl !== "#") {
      return (
        <I18nLink
          href={item.pageSlugUrl}
          isMagentoRoute={item.staticLink === "0" ? 0 : 1}
        >
          <a
            target={item.openInNewTab === true ? "_blank" : "_self"}
            rel="noreferrer"
            aria-label={
              ifAdditionalLink
                ? `${item.additionalLinkButtonText} about ${item.menuTitle}`
                : `link about ${item.menuTitle}`
            }
            className={
              ifAdditionalLink
                ? `d-block mt-2 text-dark font-weight-700 h4 font-family-secondary text-uppercase ${getClass}`
                : ""
            }
          >
            {item.menuTitle.toLowerCase() === "shop products" && ifParent ? (
              <span
                className={`bg-primary px-3 py-1 ${styles["acc-online-store-menu"]}`}
              >
                {item.menuTitle}
              </span>
            ) : (
              [
                ifAdditionalLink ? (
                  <>
                    <span className="sr-only">{`${item.additionalLinkButtonText} about ${item.menuTitle}`}</span>
                    {item.additionalLinkButtonText}
                  </>
                ) : (
                  item.menuTitle
                ),
              ]
            )}
          </a>
        </I18nLink>
      );
    }
    return (
      <a
        href={item.pageSlugUrl}
        target={item.openInNewTab === true ? "_blank" : "_self"}
        aria-label={
          ifAdditionalLink
            ? `${item.additionalLinkButtonText} about ${item.menuTitle}`
            : `link about ${item.menuTitle}`
        }
        rel="noreferrer"
        className={
          ifAdditionalLink
            ? `d-block mt-2 text-dark font-weight-700 h4 font-family-secondary text-uppercase ${getClass}`
            : ""
        }
      >
        {item.menuTitle.toLowerCase() === "shop products" && ifParent ? (
          <span
            className={`bg-primary px-3 py-1 ${styles["acc-online-store-menu"]}`}
          >
            {item.menuTitle}
          </span>
        ) : (
          [
            ifAdditionalLink ? (
              <>
                <span className="sr-only">{`${item.additionalLinkButtonText} about ${item.menuTitle}`}</span>
                {item.additionalLinkButtonText}
              </>
            ) : (
              item.menuTitle
            ),
          ]
        )}
      </a>
    );
  };
  return finalMenu ? (
    <nav className={styles["acc-megamenu"]}>
      <ul>
        {finalMenu.map((item) => (
          <li
            key={item.id}
            className={`menu-item ${
              router.pathname === "/[zone_lang]" + item.pageSlugUrl
                ? styles["active"]
                : ""} ${styles["font-helvatica"]}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // onClick={handleMenuClick}
            // tabIndex={0}
          >
            {getLink(item, false, true)}
            {isSubMenuVisible && <LazySubMenu item={item} getLink={getLink} />}
          </li>
        ))}
      </ul>
    </nav>
  ) : null;
};
export default MegaMenu;

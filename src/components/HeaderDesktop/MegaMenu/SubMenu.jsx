import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { I18nLink } from '@Components/Utilities';
import Image from 'next/legacy/image';
import styles from "@Components/HeaderDesktop/MegaMenu/MegaMenu.module.scss";

const SubMenu = ({ item, getLink }) => (
    <div className="acc-megamenu-content" key={`key${item.id}`}>
        <div className="py-4 container">
            <div className="row">
                <div className="border-right border-medium col-md-3">
                    <ul className={styles["acc-mega-submenu"]}>
                        {item.subMenu.map((subItem, indx) => (
                            <li className={`${indx === 0 ? '' : null} acc-submenu-list h4`} id={`sub${subItem.id}`} key={`itemKey${subItem.id}`}>
                                {getLink(subItem)}
                            </li>
                        ))}
                    </ul>
                </div>
                {item.subMenu.map((subItem) => (
                    <div className="acc-submenu-content col-md-9" data-id={`sub${subItem.id}`} key={`conKey${subItem.id}`}>
                        <Row key={Math.random()} className={styles["acc-mega-subsubmenu"]}>
                            {subItem.subMenu.map((subSubItem) => (
                                <>
                                    <Col md={3} className="mb-3" key={`subSub${subSubItem.id}`}>
                                        {item.externalLink !== '0' && item.pageSlugUrl !== '#' ? (
                                            <I18nLink href={subSubItem.pageSlugUrl} isMagentoRoute={subSubItem.staticLink === '0' ? 0 : 1}>
                                                <a
                                                    target={subSubItem.openInNewTab === true ? '_blank' : '_self'}
                                                    aria-label="link"
                                                    rel="noopener noreferrer"
                                                    className={`d-block ${styles['acc-menu-item-col-link']}`}
                                                    role="button"
                                                    tabIndex="0"
                                                    data-factors-click-bind="true"
                                                >
                                                    <Image
                                                        src={subSubItem.iconImage.url}
                                                        alt={subSubItem.menuTitle}
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                    <span className={`${styles["acc-title"]} d-block mt-2 text-center text-uppercase`}>{subItem.subMenu.length > 1 ? subSubItem.menuTitle : null}</span>
                                                </a>
                                            </I18nLink>
                                        ) : (
                                            <>
                                                <a
                                                    href={subSubItem.pageSlugUrl}
                                                    target={subSubItem.openInNewTab === true ? '_blank' : '_self'}
                                                    aria-label="link"
                                                    rel="noopener noreferrer"
                                                    className="d-block acc-menu-item-col-link"
                                                    role="button"
                                                    tabIndex="0"
                                                    data-factors-click-bind="true"
                                                >
                                                    <Image
                                                        src={subSubItem.iconImage.url}
                                                        alt={subSubItem.menuTitle}
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                    <span className={`${styles['acc-title']} d-block mt-2 text-center text-uppercase`}>{subItem.subMenu.length > 1 ? subSubItem.menuTitle : null}</span>
                                                </a>
                                            </>
                                        )}
                                        {subItem.subMenu.length > 1 ? (
                                            <>
                                                <span className="acc-subtitle d-block mt-1 text-center">
                                                    {subSubItem.descriptionText}
                                                </span>
                                                {getLink(subSubItem, true, false, subItem.subMenu.length)}
                                            </>
                                        ) : null}
                                    </Col>
                                    {subItem.subMenu.length === 1 ? (
                                        <Col>
                                            <h4 className='text-uppercase font-weight-500 h3 font-family-secondary'>{subSubItem.menuTitle}</h4>
                                            <p className='h5 text-dark font-family-secondary'>{subSubItem.descriptionText}</p>
                                            {getLink(subSubItem, true)}
                                        </Col>
                                    ) : null}
                                </>
                            ))}
                        </Row>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default SubMenu;

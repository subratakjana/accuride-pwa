import React from "react";

const Breadcrumb = ({ crumbs }) => {
    return (
        <div className="container py-2 bc-wrapper">
            <nav className="font-size-sm">
                <ul className="d-flex flex-row flex-wrap text-capitalize">
                    {crumbs.map((crumb, index) => {
                        if (index < crumbs.length - 1) {
                            return (
                                <li key={`breadcrumb-${index}`}>
                                    {crumb.isClickable === false ? (
                                        <span>{crumb.name}</span>
                                    ) : (
                                        <a
                                            href={crumb.url}
                                            className="text-underline"
                                        >
                                            {crumb.name}
                                        </a>
                                    )}
                                    <span className="text-primary px-1">
                                        {index !== crumbs.length - 1 && ">"}
                                    </span>
                                </li>
                            );
                        }
                        if (index === crumbs.length - 1) {
                            return <li key={`breadcrumb-${index}`}>{crumb.name}</li>;
                        }
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default Breadcrumb;
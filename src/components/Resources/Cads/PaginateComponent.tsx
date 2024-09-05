import React from 'react';
import ReactNextPaging from 'react-next-paging';
import { Row, Col } from 'react-bootstrap';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';

const PaginateComponent = (props) => {
    const { itemsperpage } = props;
    const { nocolumns } = props;
    const { items } = props;
    const { pagesspan } = props;

    return (
        <ReactNextPaging
            itemsperpage={itemsperpage}
            nocolumns={nocolumns}
            items={items}
            pagesspan={pagesspan}
        >
            {({
                getBackButtonProps,
                getFwdButtonProps,
                getSelPageButtonProps,
                inipagearray,
                pagesforarray,
                currentpage,
                noitems,
                initialitem,
                lastitem,
                goBackBdisabled,
                goFwdBdisabled,
            }) => (
                <div>
                    <Row className="justify-content-center">
                        {(items)
                            ? items.slice(initialitem, lastitem).map((listdata) => (
                                <Col lg={6} className="pb-5 px-lg-5" key={`${listdata.id}_cadsspec`}>
                                    {(listdata.linkLabel === '9308EZ')
                                        ? (
                                            <a className="d-block" href={listdata.linkUrl} target="BLANK" aria-label="cads-data" rel='noopener noreferrer'>
                                                {listdata.linkLabel}
                                                <MdKeyboardArrowRight className="float-right font-size-lg" />
                                            </a>
                                        )
                                        : (
                                            <a className="d-block" href={`${listdata.linkUrl}?header=false&tree=false&breadcrumbs=false&search=false`} target="BLANK" rel='noopener noreferrer' aria-label="cads-data">
                                                {listdata.linkLabel}
                                                <MdKeyboardArrowRight className="float-right font-size-lg" />
                                            </a>
                                        )}
                                </Col>
                            )) : ''}
                    </Row>
                    <nav>
                        {noitems > 0
                            ? [
                                <ul className="d-flex justify-content-center cads-custom-pagination" key={`pagingrow${100}`}>
                                    {(initialitem > 1) ? (
                                        <li className="page-item">
                                            <a href="#" className="d-flex pr-3 align-items-center" {...getBackButtonProps()} disabled={goBackBdisabled}>
                                                <MdKeyboardArrowLeft className="icon-font-size-lg" />
                                                Previous
                                            </a>
                                        </li>
                                    ) : ''}
                                    {Array.from(
                                        { length: pagesforarray }, (v, i) => i + inipagearray,
                                    ).map((page) => (
                                        <li key={`${page}_cadsspecs`} className="page-item">
                                            <a href="#" className="px-2" {...getSelPageButtonProps({ page })} disabled={currentpage === page}>
                                                {page}
                                            </a>
                                        </li>
                                    ))}
                                    {(lastitem === items.length) ? '' : (
                                        <li className="page-item">
                                            <a href="#" className="d-flex pl-3 align-items-center" {...getFwdButtonProps()} disabled={goFwdBdisabled}>
                                                Next
                                                <MdKeyboardArrowRight className="icon-font-size-lg" />
                                            </a>
                                        </li>
                                    )}
                                </ul>,
                            ]
                            : null}
                    </nav>
                </div>
            )}
        </ReactNextPaging>
    );
};

export default PaginateComponent;

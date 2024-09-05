import dynamic from 'next/dynamic';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IoIosKeypad } from 'react-icons/io';
import { MdFormatListBulleted } from 'react-icons/md';
import { useRouter } from 'next/router';

const SelectBy = dynamic(() => import('../Filters/SelectBy/SelectBy'));
const SortBy = dynamic(() => import('../Filters/SortBy/SortBy'));


const ProductToolbar = (props) => {
    const { selectedShortQuery } = props;
    const router = useRouter();
    const deskvListGridView = (viewMode) => {
        let viewParmHref = '';
        let querySign = '';
        if (window.location.search) {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.delete('view');
            viewParmHref += `${urlParams.toString()}&`;
            querySign = '?';
        }
        if (viewMode === 1) {
            viewParmHref += 'view=list';
            querySign = '?';
        }
        if (viewParmHref === '&') {
            viewParmHref = '';
            querySign = '';
        }
        const asPath = router.asPath.split('?')[0];
        router.push({ pathname: router.pathname, query: viewParmHref }, (`${asPath}${querySign}${viewParmHref}`), { shallow: true });
    };

    return (
        <section className="acc-product-toolbar">
            <Row>
                {/* mode start */}
                <Col className="acc-modes">
                    <ButtonGroup>
                        <Button className={`font-size-lg${!router.query.view ? ' btn-primary' : ' btn-light'}`} onClick={() => deskvListGridView(0)}><IoIosKeypad /></Button>
                        <Button className={`font-size-lg${router.query.view ? ' btn-primary' : ' btn-light'}`} onClick={() => deskvListGridView(1)}><MdFormatListBulleted /></Button>
                    </ButtonGroup>
                </Col>
                {/* mode end */}

                {/* switcher start */}
                <Col className="d-flex align-items-center acc-switcher">
                    <SelectBy crossImageCheck={props.crossImageCheck}/>
                </Col>
                {/* switcher end */}

                {/* sorting start */}
                <SortBy selectedShortsQuery={selectedShortQuery} />
                {/* sorting end */}
            </Row>
        </section>
    );
};

export default ProductToolbar;

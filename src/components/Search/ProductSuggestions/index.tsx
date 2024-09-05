import {
    Row,
    Col,
} from 'react-bootstrap';
import { useRouter } from 'next/router';

const ProductSuggestions = (props) => {
    const { suggestions } = props;
    const router = useRouter();
    /**
  * Smooth scroll when tap on pagination (prev,next).
  * Set target scroll top from online or other product section.
  * @param {*} paginationObj
  */
    const urlSmoothScroll = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const searchBySuggestion = (item) => {
        const prevKeyword = router.query.keyword;
        let suggestParmHref = '';
        let querySign = '';
        if (window.location.search) {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.delete('rank');
            urlParams.delete('page');
            urlParams.delete('keyword');
            urlParams.delete('filter');
            urlParams.delete('pw');
            suggestParmHref += `${urlParams.toString()}&`;
            querySign = '?';
        }
        suggestParmHref += `keyword=${item.phrase}&rank=${item.rank}&pw=${prevKeyword}`;
        querySign = '?';

        const asPath = router.asPath.split('?')[0];
        router.push({ pathname: router.pathname, query: suggestParmHref }, (`${asPath}${querySign}${suggestParmHref}`), { shallow: true });
        urlSmoothScroll();
    };
    return (
        <Row>
            <Col className="pt-3">
                <div className="acc-prod-sugession-wrap bg-light rounded d-flex align-items-center flex-wrap p-3 border">
                    {suggestions && suggestions.length > 0 ? (
                        <>
                            <span className="font-weight-600 d-block mr-1">Search Suggestions: </span>
                            {suggestions.map((item, index) => (
                                <span key={item.rank} role="button" onKeyPress={() => false} tabIndex={0} onClick={() => searchBySuggestion(item)} className={`cursor-pointer d-block acc-suggestion-item ${(index + 1) !== suggestions.length ? 'mr-2' : ' '}`}>
                                    <span className="acc-text">{`${item.phrase}`}</span>
                                    {(index + 1) !== suggestions.length ? (<span className="pl-2">|</span>) : null}
                                </span>
                            ))}
                        </>
                    ) : null}
                </div>
            </Col>
        </Row>
    );
};
export default ProductSuggestions;

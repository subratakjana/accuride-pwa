import {
    Card,
    Form,
} from 'react-bootstrap';
import { useRouter } from 'next/router';

const SortBy = (props) => {
    const { closeFilterCalBack, showLoader } = props;
    const router = useRouter();
    const selectedShortsQuery = router.query.sort ? router.query.sort.replace(/ /g, '+') : 'globalpop';

    const productShortArr = [
        { key: 'globalpop', key_text: 'Popularity' },
        { key: 'title', key_text: 'Title A - Z' },
        { key: 'title+rev', key_text: 'Title Z - A' },
        { key: 'date', key_text: 'Newest' },
    ];

    const searchListShort = (e, index) => {
        const selectedShort = productShortArr[index].key;

        let shortParmHref = '';
        let querySign = '';
        if (window.location.search) {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.delete('sort');
            shortParmHref += `${urlParams.toString()}&`;
            querySign = '?';
        }
        shortParmHref += `sort=${selectedShort}`;
        querySign = '?';

        const asPath = router.asPath.split('?')[0];
        router.push({ pathname: router.pathname, query: shortParmHref }, (`${asPath}${querySign}${shortParmHref}`), { shallow: true });

        /** close filter section by props callback */
        closeFilterCalBack();
        showLoader(true);
    };

    return (
        <>
            <h2 className="text-primary mb-3 d-md-none">Sort By</h2>
            {/* accordion start */}
            <div className="acc-filter-accordian accordion">
                <Card className="mb-3 mb-xl-0 border-0 rounded">
                    <Card.Body className="px-3 pb-0 pt-2">
                        <div>
                            {productShortArr.map((short, index) => (
                                <Form.Check
                                    custom
                                    type="radio"
                                    id={`position-${index}`}
                                    className="mb-3"
                                    label={short.key_text}
                                    name="shorting"
                                    key={short.key}
                                    onChange={(e) => { searchListShort(e, index); }}
                                    checked={selectedShortsQuery === short.key}
                                />
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            </div>
            {/* accordion end */}
        </>
    );
};
export default SortBy;

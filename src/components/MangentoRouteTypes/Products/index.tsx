import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';

const DynamicImportStore = dynamic(() => import('@Components/Store'));

const Products = ({ getZoneLang, catId, productFilteredResp, queryData }) => {
    return (
        <DynamicImportStore queryData={queryData} getZoneLang={getZoneLang} catId={catId} productFilteredResp={productFilteredResp} />
    );
};

export default withRouter(Products);

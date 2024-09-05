
import { AuthContext } from '@Contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { ProductCompareProvider } from '@Contexts/ProductCompareContext';
import useWindowDimensions from '@Hooks/windowDimention';
import dynamic from 'next/dynamic';

const GenerateCompareBlock = dynamic(() => import('@PageContent/CompareProductBlock'));
const AccountSideMenu = dynamic(() => import('./AccountSideMenu'));
const AccountSidebar = (props) => {
    const { isAuthUser } = useContext(AuthContext);
    const windowSize = useWindowDimensions();
    const [windowObj, updateWindowObj] = useState(false);
    useEffect(() => {
        isAuthUser();
        if (windowSize.width !== 0) updateWindowObj(true);
    }, []);
    return (
        <>
            <AccountSideMenu companyAccount={props.companyAccount} />
            <ProductCompareProvider>
                <GenerateCompareBlock isDesktop={(windowObj && windowSize.width > 1024)} />
            </ProductCompareProvider>
        </>
    );
};

export default AccountSidebar;

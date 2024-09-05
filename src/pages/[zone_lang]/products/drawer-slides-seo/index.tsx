import dynamic from 'next/dynamic';

const DrawerSlidesSeo = dynamic(() => import('@Components/Products/DrawerSlidesSeo'));

const DrawerSlidesSeoPage = () => <DrawerSlidesSeo />;

export default DrawerSlidesSeoPage;

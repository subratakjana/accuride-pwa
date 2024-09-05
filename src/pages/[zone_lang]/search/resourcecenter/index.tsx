import SearchResource from '@PageContent/Search/SearchResource';

const SearchResourcePage = () => <SearchResource />;

export const getServerSideProps = async () => {
    const seodata = {
        seoTitle: 'Accuride - Search Results',
        secKeywords: '',
        description: '',
    };
    return {
        props: { seodata },
    };
};

export default SearchResourcePage;

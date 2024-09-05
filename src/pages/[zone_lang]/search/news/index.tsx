import SearchNews from '@PageContent/Search/SearchNews';

const SearchNewsPage = () => <SearchNews />;

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

export default SearchNewsPage;

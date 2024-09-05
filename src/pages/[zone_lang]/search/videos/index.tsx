import SearchVideos from '@PageContent/Search/videos';

const SearchVideosPage = () => <SearchVideos />;

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

export default SearchVideosPage;

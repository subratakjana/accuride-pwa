import SearchBlog from '@PageContent/Search/SearchBlog';

const SearchBlogPage = () => <SearchBlog />;

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

export default SearchBlogPage;

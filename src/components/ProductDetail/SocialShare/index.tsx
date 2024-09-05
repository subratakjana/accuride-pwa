import {
    FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon,
} from 'react-share';

const SocialShare = () => {
    const FacebookUrl = 'https://www.facebook.com/AccurideInternational';
    const TwitterUrl = 'https://twitter.com/accurideus';
    const LinkedinUrl = 'https://www.linkedin.com/company/252776/';
    const handleFacebookShare = () => {
        window.open(FacebookUrl, '_blank');
    };

    const handleTwitterShare = () => {
        window.open(TwitterUrl, '_blank');
    };

    const handleLinkedinShare = () => {
        window.open(LinkedinUrl, '_blank');
    };
    return (
        <div className="acc-social-share border-top border-bottom border-medium py-1 mb-1">
            <FacebookShareButton url={FacebookUrl} beforeOnClick={handleFacebookShare}>
                <FacebookIcon size={34} round />
            </FacebookShareButton>
            <TwitterShareButton url={TwitterUrl} beforeOnClick={handleTwitterShare}>
                <TwitterIcon size={34} round />
            </TwitterShareButton>
            <LinkedinShareButton url={LinkedinUrl} beforeOnClick={handleLinkedinShare}>
                <LinkedinIcon size={34} round />
            </LinkedinShareButton>
        </div>
    );
};

export default SocialShare;

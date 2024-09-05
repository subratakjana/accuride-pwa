import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';
import NextImage from "next/legacy/image";

const ContactBanner = () => (
    <section className="acc-contact-banner">
        <span className="acc-title container h2 text-white text-uppercase">Contact</span>
        <ResponsiveEmbed aspectRatio="3by1">
            <NextImage
                src="/assets/images/contact-header.jpg"
                alt="Contact Banner"
                objectFit="cover"
                objectPosition="center"
                layout="fill"
            />
        </ResponsiveEmbed>
    </section>
);

export default ContactBanner;

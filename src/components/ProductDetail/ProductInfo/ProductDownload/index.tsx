import Image from "next/legacy/image";

const ProductDownload = (props) => {
    const downloadItems = props.downloads;

    return (
        <div className="ProductDownload">
            <ul className="list-download">
                {downloadItems.map((item) => (
                    <li key={item.file_id} className="d-flex">
                        <Image
                            priority="true"
                            src={item.icon_url}
                            alt=""
                            width={16}
                            height={21}
                        />
                        <a aria-label="link" href={item.frontend_url} rel="noopener noreferrer" target="_blank" className="label ml-2">{item.label}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductDownload;

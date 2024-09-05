import {
    Card,
} from 'react-bootstrap';
import Slider from 'react-slick';

const CardCarousel = (props) => {
    const AllProps = props;
    const sliderSettings1 = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: `${props.slidesShow}`,
        slidesToScroll: `${props.slidesScroll}`,
        rows: `${props.rows}`,
        centerMargin: '15px',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                    arrows: false,
                    rows: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    infinite: true,
                    dots: true,
                    arrows: false,
                    rows: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: false,
                    rows: 1,
                },
            },
        ],
    };

    return (
        <article>
            <Slider {...sliderSettings1} className={`pt-5 ${props.customStyle}`}>
                {(AllProps.data) ? AllProps.data.map((cards) => (
                    <Card className="border-0" key={cards.id}>
                        <Card.Body>
                            <Card.Title>{cards.cardTitle}</Card.Title>
                            {(cards.cardDescription) ? <Card.Text>{cards.cardDescription}</Card.Text> : '' }
                        </Card.Body>
                    </Card>
                )) : ''}
            </Slider>
        </article>
    );
};
export default CardCarousel;

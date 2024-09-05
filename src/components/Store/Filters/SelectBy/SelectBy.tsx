import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import useWindowDimensions from '@Hooks/windowDimention';

const SelectBy = (props) => {
    const [accordion, setState] = useState({ activeKey: '0' });
    const windowSize = useWindowDimensions();
    const [isSelected, setIsSelected] = useState(true);
    const [windowObj, updateWindowObj] = useState(false);
    useEffect(() => {
        if (windowSize.width !== 0) updateWindowObj(true);
    }, []);

    const selectByObj = [
        {
            label: 'Cross Section',
            value: 'cross',
        },
        {
            label: 'Photo',
            value: 'photo',
        },
    ];
    /** accordian expanded state handling */
    const accordianClickedEvent = (index) => {
        if (accordion.activeKey !== index) {
            setState({
                ...accordion,
                activeKey: index,
            });
        } else {
            setState({
                ...accordion,
                activeKey: false,
            });
        }
    };

    const selectByChecked = (e) => {
        if (e.target.checked) {
            setIsSelected(true);
            props.crossImageCheck(true)
            
        } else {
            setIsSelected(false);
            props.crossImageCheck(false)
        }
        /** close filter section by props callback */
        if (windowSize.width < 1024) props.closeFilterCalBack();
    };

    const deviceSelectBy = () => (
        <>
            <h2 className="text-primary mb-3 d-md-none">Select By</h2>
            <Accordion className="acc-filter-accordian" defaultActiveKey={accordion.activeKey}>
                <Form>
                    <Card className="mb-3 border-0 rounded">
                        <Card.Header className="card-header p-0 border-0">
                            <Accordion.Toggle onClick={() => accordianClickedEvent('0')} className={`text-left d-flex justify-content-between ${accordion.activeKey === '0' ? 'text-primary' : 'text-dark'}`} as={Button} block variant="link" eventKey="0">
                                Select
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body className="p-3">
                                <div>
                                    {selectByObj.map((item, indx) => (
                                        <Form.Check
                                            key={`custom-${item.value}`}
                                            custom
                                            type="radio"
                                            className="mb-3"
                                            id={`select-by-custom-${indx}`}
                                            label={item.label}
                                            name="select-by"
                                            value={item.value}
                                            onChange={(e) => selectByChecked(e)}
                                        />
                                    ))}
                                </div>

                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Form>
            </Accordion>
        </>
    );

    const desktopSelectBy = () => (
        <>
            <span role="button" tabIndex="0" onKeyPress={() => { document.getElementById('select-by-custom-desktop').click(); }} onClick={() => { document.getElementById('select-by-custom-desktop').click(); }} className={`font-weight-500 font-size-sm d-block cursor-pointer mr-2${isSelected ? ' ' : ' text-primary'}`}>CROSS SECTION</span>
            <Form.Check
                type="switch"
                id="select-by-custom-desktop"
                className={`d-flex align-items-center font-weight-500${isSelected ? ' text-primary' : ''}`}
            >

                <Form.Check.Input
                    className="cursor-pointer"
                    name="select-by"
                    value="photo"
                    defaultChecked
                    onChange={(e) => selectByChecked(e)}
                />
                <Form.Check.Label className={`cursor-pointer${isSelected ? ' text-primary' : ''}`}>PHOTO</Form.Check.Label>
            </Form.Check>

        </>
    );


    return (
        <>
            {windowObj && windowSize.width < 1024 ? (deviceSelectBy()) : (desktopSelectBy())}
        </>
    );
};
export default SelectBy;

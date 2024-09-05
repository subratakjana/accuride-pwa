const FilterData = (props) => {
    const {
        filterRows,
        distributorsContent,
    } = props;

    return (
        <>
            {(filterRows.length > 0) ? (
                <div className="distrb-details scroll-y-auto">
                    {(filterRows[0].items)
                        ? filterRows[0].items.map((eachiteams) => (
                            <article key={`distributor_${eachiteams.id}`} className="text-left pb-5 border-midum border-bottom">
                                <h4 className="pb-2 pt-2">{eachiteams.name}</h4>
                                {eachiteams.address && (
                                    <p className="pb-2">{eachiteams.address}</p>
                                )}
                                <p className="pb-2">
                                    <strong>Phone: </strong>
                                    {eachiteams.phone}
                                </p>
                                <p className="pb-2">
                                    <strong>Email:</strong>
                                    {eachiteams.email}
                                </p>
                                {eachiteams.website && (<p><a href={eachiteams.website} target="BLANK" aria-label="website" rel='noopener noreferrer'>Website</a></p>)}
                                <a className="btn btn-primary" target="BLANK" rel='noopener noreferrer' href={`https://www.google.com/maps/dir/Current+Location/${eachiteams.lat},${eachiteams.lng}`}>MAP DIRECTION</a>
                            </article>
                        )) : ''}

                </div>
            )
                : (
                    <div className="distrb-details scroll-y-auto">
                        {(distributorsContent)
                            ? distributorsContent.map((eachiteams) => (
                                <article key={`distributor_${eachiteams.id}`} className="text-left pb-5 border-midum border-bottom">
                                    <h4 className="pb-2 pt-2">{eachiteams.name}</h4>
                                    {eachiteams.address && (<p className="pb-2">{eachiteams.address}</p>)}
                                    <p className="pb-2">
                                        <strong>Phone: </strong>
                                        {eachiteams.phone}
                                    </p>
                                    <p className="pb-2">
                                        <strong>Email:</strong>
                                        {eachiteams.email}
                                    </p>
                                    {eachiteams.website && (<p><a href={eachiteams.website} target="BLANK" rel='noopener noreferrer' aria-label="website">Website</a></p>)}
                                    <a className="btn btn-primary" target="BLANK" rel='noopener noreferrer' href={`https://www.google.com/maps/dir/Current+Location/${eachiteams.lat},${eachiteams.lng}`}>MAP DIRECTION</a>
                                </article>
                            )) : ''}

                    </div>
                )}
        </>
    );
};
export default FilterData;

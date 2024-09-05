import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Styles } from 'styled-components/dist/types';

const StyledDiv = styled.div<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {customStyles: Styles<{}>}>(({customStyles}) => customStyles)

const MyClusterPin = (props) => {
    const {
        point_count, // amount of points in a cluster
        getZoom, // func to access the updated zoom of the cluster once clicked
        clusterId, // cluster_id needed to pass to getZoom
        lat,
        lng,
        updateMap, // func to update the map
        pinProps, // props passed to the comp by user
    } = props;

    // eslint-disable-next-line no-nested-ternary
    const size = point_count > 30 ? 'large' : point_count > 20 ? 'medium' : 'small'; // changing style of cluster
    const styles = {
        cluster: {
            cursor: 'pointer',
            borderRadius: '50%',
        },
        large: {
            background: '#ccffcc',
            border: '2px solid #00b200',
            color: '#00b200',
            height: '45px',
            width: '45px',
        },
        medium: {
            background: '#ffedcc',
            border: '2px solid #ffa500',
            color: '#ffa500',
            height: '40px',
            width: '40px',
        },
        small: {
            background: '#ffdbdb',
            border: '2px solid #ff4c4c',
            color: '#ff4c4c',
            height: '35px',
            width: '35px',
        },
        pointCount: {
            position: 'relative',
            top: '50%',
            transform: 'translateY(-50%)',
            textAlign: 'center',
            fontWeight: '600',
        } as Styles<{}>,
    };

    return (
        <StyledDiv
            role="button"
            tabIndex={0}
            customStyles={{ ...styles.cluster, ...styles[size] }}
            onClick={() => {
                // updating the map to the correct zoom and center
                // THIS IS REQUIRED FOR THE MAP TO UPDATE CORRECTLY!!!
                updateMap({
                    zoom: getZoom(clusterId),
                    center: { lat, lng },
                });
            }}
            onKeyDown={() => {
                // updating the map to the correct zoom and center
                // THIS IS REQUIRED FOR THE MAP TO UPDATE CORRECTLY!!!
                updateMap({
                    zoom: getZoom(clusterId),
                    center: { lat, lng },
                });
            }}
        >
            <StyledDiv customStyles={styles.pointCount}>{point_count}</StyledDiv>
        </StyledDiv>
    );
};

export default MyClusterPin;

import React, { forwardRef, useEffect, useState } from "react";
import { InfoWindow, Marker, useMarkerRef } from "@vis.gl/react-google-maps";
import { Button } from "react-bootstrap";
import { BsX } from "react-icons/bs";
import styles from "./map.module.scss";

export const MarkerWithInfowindow = forwardRef(function MarkerWithInfowindow(
  { location, catsLabel, setInfowindowOpen, infowindowOpen },
  ref,
) {
  // const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useMarkerRef();
  return (
    <>
      <Marker
        ref={(marker) => {
          markerRef(marker);
          ref?.(marker);
        }}
        onClick={() => setInfowindowOpen(infowindowOpen ? "" : location.id)}
        position={{ lat: Number(location.lat), lng: Number(location.lng) }}
      />
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          className={`${styles["acc-distributor-map-info-box"]} ${styles.mw_609} ${styles.mh_426} ${styles.minW_0} ${styles.w_270} pr-0 pb-0`}
          headerDisabled
        >
          <Button
            variant="outline"
            onClick={() => setInfowindowOpen(false)}
            className={`position-absolute ${styles.top_0} ${styles.right_0}`}
          >
            <BsX size={20} />
          </Button>
          <h2 className="m-0 pb-3">{location.name}</h2>
          <p className="font-size-sm font-weight-400">{`Address: ${location.address}`}</p>
          <p className="font-size-sm font-weight-400">{`Select Industry: ${
            location.category ? location.category : catsLabel
          }`}</p>
          <p className="font-size-sm font-weight-400">{`State: ${location.state}`}</p>
        </InfoWindow>
      )}
    </>
  );
});

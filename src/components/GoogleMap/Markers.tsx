import { useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { MarkerWithInfowindow } from "./MarkerWithInfoWindow";

const markerProps = [
  {
    background: "#ffdbdb",
    border: "2px solid #ff4c4c",
    color: "#ff4c4c",
    height: "35px",
    width: "35px",
  },
  {
    background: "#ffedcc",
    border: "2px solid #ffa500",
    color: "#ffa500",
    height: "40px",
    width: "40px",
  },
  {
    background: "#ccffcc",
    border: "2px solid #00b200",
    color: "#00b200",
    height: "45px",
    width: "45px",
  },
];

const Markers = ({ locations, catsLabel }) => {
  const map = useMap();
  const [infowindowOpenId, setInfowindowOpenId] = useState("");

  const clusterer = useRef(
    new MarkerClusterer({
      renderer: {
        render({ count, position }, stats) {
          const markerSize = Math.min(
            Math.floor(((count / stats.clusters.markers.max) * 10) / (10 / 3)),
            2,
          );
          const prop = markerProps[markerSize];
          // use d3-interpolateRgb to interpolate between red and blue
          //   const color = this.palette(count / stats.clusters.markers.max);
          // create svg url with fill color
          const svg = window.btoa(`
      <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
        <circle fill="${prop.background}" cx="120" cy="120" r="${prop.width}" stroke="${prop.color}" stroke-width="5" />    
      </svg>`);
          // create marker using svg icon
          return new google.maps.Marker({
            position,
            icon: {
              url: `data:image/svg+xml;base64,${svg}`,
              scaledSize: new google.maps.Size(75, 75),
            },
            label: {
              text: String(count),
              color: prop.color,
              fontSize: "12px",
            },
            // adjust zIndex to be above other markers
            zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
          });
        },
      },
    }),
  );

  // Initialize MarkerClusterer
  useEffect(() => {
    if (!map) return;
    clusterer.current.setMap(map);
    const clust = clusterer.current;
    return () => clust.setMap(null);
  }, [map]);

  return (
    <>
      {locations.map((location) => (
        <MarkerWithInfowindow
          location={location}
          catsLabel={catsLabel}
          key={location.id}
          ref={(marker) => marker && clusterer.current.addMarker(marker)}
          setInfowindowOpen={setInfowindowOpenId}
          infowindowOpen={infowindowOpenId === location.id}
        />
      ))}
    </>
  );
};

export default Markers;

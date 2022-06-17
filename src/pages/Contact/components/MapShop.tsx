import { GOOGLE_MAP_KEY } from "config/constants";
import Map from "./Map";

const MapShop = () => {
  return (
    <>
      <Map
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_KEY}&callback=initMap`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={
          <div
            style={{
              height: `50vh`,
              margin: `auto`,
            }}
            className="border_main"
          />
        }
        mapElement={<div style={{ height: `100%` }} />}
      />
    </>
  );
};

export default MapShop;

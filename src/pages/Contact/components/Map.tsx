import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps";

const Map = () => {
  return (
    <div>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 21.031613443435752, lng: 105.78476908310873 }}
      ></GoogleMap>
    </div>
  );
};

export default withScriptjs(withGoogleMap(Map));

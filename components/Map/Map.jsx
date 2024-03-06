import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map() {

  const position = [9.978585618135108, -84.7251802159246];

  return (
    <MapContainer
      className="max-w-[900px] min-[700px]:h-[500px] drop-shadow-2xl h-[500px] border rounded-xl mb-32 min-[900px]:mx-auto mx-10 min-[1199px]:mt-24 mt-20"
      center={position}
      zoom={16}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} animate={true} draggable={false} alt="VyV Technologies">
        <Popup className="font-bold text-base">¡VyV Technologies!</Popup>
      </Marker>
    </MapContainer>
  );
}
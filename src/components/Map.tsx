import {Circle, MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import type {Evnt} from "./Events.tsx";

function Map({events}: { events: Evnt[] }) {
    console.log(events)

    return (
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <MapContainer
                center={[+events[0].coords.split(",")[0], +events[0].coords.split(",")[1]]} // Center the map on event coordinates
                zoom={16} // Initial zoom level
                scrollWheelZoom={false} // Disable scroll wheel zoom for better UX
                className="w-full h-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Marker at the event's location */}
                {events.map((event, i) => (
                    event.type === "pin" ?
                        <Marker key={i} position={[+event?.coords.split(",")[0],
                            +event?.coords.split(",")[1]]}>
                            {/* Popup that appears when the marker is clicked */}
                            <Popup>
                                <strong>{event?.event}</strong> <br/> Event Location.
                            </Popup>
                        </Marker> : event.type === "circle" ?
                            <Circle key={i} center={[+event?.coords.split(",")[0],
                                +event?.coords.split(",")[1]]}
                                    radius={+event?.coords.split(",")[2]}
                                    pathOptions={{ color: 'blue' }}>
                                <Popup>
                                    <strong>{event?.event}</strong> <br/> Event Location.
                                </Popup>
                            </Circle>:
                            <div></div>
                ))}
            </MapContainer>
        </div>
    )
}

export default Map;
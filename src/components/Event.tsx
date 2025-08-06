import type {Evnt} from "./Events.tsx";
import {useEffect, useState} from "react";
import {doc, getDoc} from "@firebase/firestore";
import {db} from "../firebase.ts";
import {useParams} from "react-router-dom";
import {MapContainer, TileLayer, Marker, Popup, Circle} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetinaUrl,
    iconUrl: iconUrl,
    shadowUrl: shadowUrl,
});

function Event() {
    const {id: evntId} = useParams<{ id: string }>();
    const [evnt, setEvnt] = useState<Evnt>(
        {coords: "", crtTime: "", descrp: "", id: "", type: "", event: "", severity: 0});

    useEffect(() => {
        async function getDocumentById() {
            if (!db || !evntId) {
                console.error("Firestore 'db' instance or 'evntId' is undefined.");
                return; // Exit if prerequisites are not met
            }
            const evntRef = doc(db, "RescueNet", evntId);
            try {
                const docSnap = await getDoc(evntRef);

                if (docSnap.exists()) {
                    const datum = docSnap.data() as Evnt;
                    setEvnt(datum);
                    console.log("Document data:", datum);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        }

        getDocumentById();
    }, [evntId]);

    if (evnt?.event === "") {
        return (
            <main className="text-white text-center py-8">
                <h2>{evnt.event}</h2>
                <p>Location coordinates not available for this evnt.</p>
            </main>
        );
    }

    return (
        <main className="text-white p-4 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">{evnt?.event}</h2>
            <p className="text-lg mb-6 text-center">{evnt?.descrp}</p> {/* Assuming you have a description */}

            <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
                <MapContainer
                    center={[+evnt?.coords.split(",")[0], +evnt?.coords.split(",")[1]]} // Center the map on event coordinates
                    zoom={16} // Initial zoom level
                    scrollWheelZoom={false} // Disable scroll wheel zoom for better UX
                    className="w-full h-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* Marker at the event's location */}
                    {evnt.type === "pin" ?
                        <Marker position={[+evnt?.coords.split(",")[0],
                            +evnt?.coords.split(",")[1]]}>
                            {/* Popup that appears when the marker is clicked */}
                            <Popup>
                                <strong>{evnt?.event}</strong> <br/> Event Location.
                            </Popup>
                        </Marker> : evnt.type === "circle" ?
                            <Circle center={[+evnt?.coords.split(",")[0],
                                +evnt?.coords.split(",")[1]]}
                                    radius={+evnt?.coords.split(",")[2]}
                                    pathOptions={{color: 'blue'}}>
                                <Popup>
                                    <strong>{evnt?.event}</strong> <br/> Affected Area.
                                </Popup>
                            </Circle> :
                            <div></div>}
                </MapContainer>
            </div>
            <p className="text-sm text-white mt-2">Click on the marker to view more</p>
            <div className="mt-12 p-8 rounded-xl bg-slate-800">
                <p className="text-xl text-center">Threads coming soon...</p>
            </div>
        </main>
    )
}

export default Event
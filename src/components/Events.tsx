import {useEffect, useState} from "react";
import {
    collection,
    type DocumentData,
    limitToLast,
    onSnapshot, orderBy,
    query,
    QueryDocumentSnapshot
} from "@firebase/firestore";
import {db} from "../firebase.ts";
import Map from "./Map.tsx"

export interface Evnt {
    id: string;
    event: string;
    descrp: string;
    type: string;
    coords: string;
    crtTime: string;
    severity: number;
}

function Events() {
    const [events, setEvents] = useState<Evnt[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function getEvents() {
            const evntRef = collection(db, "RescueNet")
            const qryEvnts = query(evntRef, orderBy('crtTime'), limitToLast(25))
            onSnapshot(qryEvnts, async (snapshot) => {
                const evnts: Evnt[] = []

                snapshot.forEach((evnt: QueryDocumentSnapshot<DocumentData>) => {
                    const data = evnt.data() as Evnt
                    evnts.push({...data, id: evnt.id})
                })

                setEvents(evnts)
                setLoaded(true)
            })
        }

        getEvents()
    }, [])

    return (
        <section className="flex flex-wrap gap-4 mt-8 text-white">
            <h3 className="text-xl basis-full">Events near you</h3>
            {events.map((evnt: Evnt) => (
                <a href={`./events/${evnt.id}`} key={evnt.id}>
                    <article className="rounded-xl bg-slate-800 px-6 py-2 max-w-[20vw] h-full">
                        <h4 className="text-lg">{evnt.event}</h4>
                        <p className="text-sm text-slate-400 truncate">{evnt.descrp}</p>
                    </article>
                </a>
            ))}
            {(loaded ? <Map events={events} />: <p hidden></p>)}
        </section>
    )
}

export default Events
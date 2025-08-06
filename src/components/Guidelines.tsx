function Guidelines() {
    const disasters = [
        {
            type: "Flood",
            safetyTips: [
                "Stay in dry places,",
                "Don't go in the water,",
                "Evacuate if advised by authorities,",
                "Turn off utilities if instructed to do so,",
                "Avoid walking or driving through floodwaters,",
                "Boil tap water before drinking if advised"
            ]
        },
        {
            type: "Earthquake",
            safetyTips: [
                "Drop, Cover, and Hold On,",
                "Stay away from windows and heavy furniture,",
                "If outdoors, move to an open area away from buildings,",
                "Do not use elevators,",
                "Be prepared for aftershocks"
            ]
        },
        {
            type: "Hurricane/Typhoon/Cyclone",
            safetyTips: [
                "Secure loose outdoor items,",
                "Stay indoors and away from windows,",
                "Have an emergency kit ready,",
                "Follow evacuation orders,",
                "Charge all electronic devices,",
                "Trim trees and shrubs"
            ]
        },
        {
            type: "Wildfire",
            safetyTips: [
                "Create defensible space around your home,",
                "Have an evacuation plan,",
                "Monitor official alerts and warnings,",
                "Close windows to prevent embers from entering,",
                "If evacuating, take documents and medications"
            ]
        },
        {
            type: "Tornado",
            safetyTips: [
                "Seek shelter in a room on the lowest floor,",
                "Stay away from windows,",
                "Cover your head and neck,",
                "If outdoors, lie flat in a ditch or low-lying area"
            ]
        },
        {
            type: "Tsunami",
            safetyTips: [
                "If near the coast, move to higher ground immediately,",
                "Heed official tsunami warnings,",
                "Never go to the coast to watch a tsunami,",
                "Evacuate to designated safe zones"
            ]
        },
        {
            type: "Drought",
            safetyTips: [
                "Conserve water diligently,",
                "Follow water restrictions imposed by authorities,",
                "Be mindful of fire hazards due to dry conditions,",
                "Report water leaks"
            ]
        },
        {
            type: "Volcanic Eruption",
            safetyTips: [
                "Evacuate if advised by authorities,",
                "Wear clothes to protect skin from ash,",
                "Wear eye protection and a dust mask,",
                "Stay indoors and keep windows and doors closed,",
                "Be aware of lahars (mudflows)"
            ]
        },
        {
            type: "Blizzard/Heavy Snowfall",
            safetyTips: [
                "Stay indoors and limit travel,",
                "Dress in layers if going outside,",
                "Insulate pipes to prevent freezing,",
                "Have an emergency kit with blankets, food, and water,",
                "Be cautious of frostbite and hypothermia"
            ]
        },
        {
            type: "Heatwave",
            safetyTips: [
                "Stay hydrated by drinking plenty of water,",
                "Avoid strenuous outdoor activities during the hottest part of the day,",
                "Stay in air-conditioned places if possible,",
                "Wear lightweight, loose-fitting clothing,",
                "Check on vulnerable individuals (elderly, children)"
            ]
        }
    ];

    return (
        <article className="flex gap-4 flex-wrap my-4">
            <h2 className="basis-full text-2xl text-white">Guidelines</h2>
            {disasters.map((disaster: { type: string, safetyTips: string[] }, i: number) => (
                <label className="has-checked:basis-1/2 lg:has-checked:basis-1/3 basis-1/6 grow p-8 bg-blue-800/50 min-w-1/5
                    rounded-xl text-2xl text-white text-center font-semibold truncate align-middle
                    transition-all duration-300 ease-in"
                    key={i}>{disaster.type}
                    <input type={"checkbox"} className="peer opacity-0"/>
                    <ul className="hidden peer-checked:block text-left text-xl mt-2
                        transition-all duration-300 ease font-normal">
                        {disaster.safetyTips.map((tip: string, ig: number) => (
                            <li className="truncate" key={`${disaster.type}-${ig}`}>{tip}</li>
                        ))}
                    </ul>
                </label>
            ))}
        </article>
    )
}

export default Guidelines
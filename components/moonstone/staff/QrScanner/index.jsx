import dynamic from "next/dynamic";
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

import { getAttendee } from "/lib/api";

export default function QrScanner({onScan, onExit}) {

    const handleScan = data => {
        const url = "https://seium.org/attendees/";
        if(data) {
            if(data.slice(0, url.length) != url) {
                alert("Qr code not valid");
                return;
            }

            const uuid = data.slice(url.length);
            
            getAttendee(uuid)
            .then(response => {
                onScan(response.data);
                onExit();
            })
            .catch(_ => alert("Attendee does not exist"));
        }
    };

    return (
        <div className="fixed h-screen w-screen inset-0">
          <button className="w-auto ml-5 mt-5 text-white font-ibold text-5xl text-center bg-transparent absolute z-50"
            onClick={onExit}>X</button>
          <h3 className="w-full mt-5 text-white font-ibold text-2xl text-center bg-transparent absolute z-50">Scan the participant's QR Code</h3>
          <QrReader
            delay={300}
            onError={() => {alert("An error has occured when scanning."); onExit()}}
            onScan={handleScan}
          />
        </div>
    );
}
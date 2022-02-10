import dynamic from "next/dynamic";
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

import { getAttendee } from "/lib/api";

export default function QrScanner({ onScan, onExit }) {
  const handleScan = (data) => {
    const url = "https://seium.org/attendees/";
    if (data) {
      if (data.slice(0, url.length) != url) {
        alert("Qr code not valid");
        return;
      }

      const uuid = data.slice(url.length);
      onScan(uuid);
      onExit();
    }
  };

  return (
    <div className="fixed inset-0 h-screen w-screen">
      <button
        className="absolute z-50 ml-5 mt-5 w-auto bg-transparent text-center font-ibold text-5xl text-white"
        onClick={onExit}
      >
        X
      </button>
      <h3 className="absolute z-50 mt-5 w-full bg-transparent text-center font-ibold text-2xl text-white">
        Scan the participant&apos;s QR Code
      </h3>
      <QrReader
        delay={30}
        onError={() => {
          alert("An error has occured when scanning.");
          onExit();
        }}
        onScan={handleScan}
      />
    </div>
  );
}

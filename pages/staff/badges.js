import { useState, useEffect } from "react";

import { withAuth } from "/components/Auth";
import Dashboard from "/components/moonstone/staff/utils/Dashboard";

import StaffBadgeButton from "/components/moonstone/staff/StaffBadgeButton";

import { getAllBadges, redeemBadge } from "/lib/api";

import ErrorMessage from "/components/utils/ErrorMessage";
import QrScanner from "/components/moonstone/staff/QrScanner";

/*

  Returns whether or not a badge is available right now 

*/
function IsAvailableNow(badge) {
  const begin = Date.parse(badge.begin);
  const end = Date.parse(badge.end);
  const now = new Date();

  return now >= begin && now <= end;
}

/*

Simplifies a date string to HH:MM

*/
function simplifyDate(dateStr) {
  const date = new Date(dateStr);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
}

function Awards() {
  const [badges, updateBadges] = useState([]);
  const [error, updateError] = useState(false);
  const [scanningQR, updateScanning] = useState(false);
  const [selectedBadge, updateSelectedBadge] = useState(null);
  const [success, updateSuccess] = useState(false);

  const requestBadgeInfo = () => {
    getAllBadges()
      .then((response) => {
        updateBadges(response.data.filter(IsAvailableNow));
      })
      .catch((_) => {
        updateBadges([]);
        updateError(true);
      });
  };

  const redeem = (uuid) => {
    redeemBadge(uuid, selectedBadge)
      .then((response) => {
        updateSuccess(true);
      })
      .catch((_) => {
        alert("An error occurred");
        updateSuccess(false);
      });
  };

  useEffect(requestBadgeInfo, []);

  const badgeComponents = badges.map((entry, id) => (
    <StaffBadgeButton
      key={id}
      badge={entry.name}
      start={simplifyDate(entry.begin)}
      end={simplifyDate(entry.end)}
      onClick={() => {
        updateSelectedBadge(entry.id);
        updateScanning(true);
      }}
    />
  ));

  return (
    <Dashboard title="Staff">
      <div className="grid-cols-1 overflow-hidden">
        <div className="col-span-1 float-left mt-6 w-full md:w-1/2">
          <div className="mt-14 border-b-2 border-slate-400 pb-2">
            <span className="font-ibold text-xl sm:text-2xl">Badges</span>
            <span className="text-md ml-4 font-iregular sm:text-lg">
              disponíveis para atribuir neste momento
            </span>
          </div>
          {success && (
            <p className="font-ibold text-xl text-quinary">
              Badge successfully redeemed
            </p>
          )}
          <div className="mt-5 ml-3 w-3/4">{badgeComponents}</div>
        </div>
      </div>
      {error && <ErrorMessage />}
      {scanningQR && (
        <QrScanner
          onScan={redeem}
          onExit={() => {
            updateScanning(false);
          }}
        />
      )}
    </Dashboard>
  );
}

export default withAuth(Awards);

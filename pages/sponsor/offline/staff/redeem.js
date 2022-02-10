import { useState } from "react";

import { withAuth } from "/components/Auth";
import Dashboard from "/components/moonstone/staff/utils/Dashboard";

import Award from "/components/moonstone/staff/Award";
import ErrorMessage from "/components/utils/ErrorMessage";

import QrScanner from "/components/moonstone/staff/QrScanner";

import { getReedemable, redeem } from "/lib/api";

/*
Fills the array with number of zeroes
*/
function fillArray(number) {
  let res = [];
  for (let i = 0; i < number; i++) res.push(0);

  return res;
}

/*
Creates a copy of the array changing one value
*/
function changeValue(array, index, value) {
  let res = [];
  for (let i = 0; i < array.length; i++) {
    if (i == index) res.push(value);
    else res.push(array[i]);
  }
  return res;
}

function Reedem() {
  const [start, updateStart] = useState(true);
  const [selectingAwards, updateSelectingAwards] = useState(false);
  const [scanning, updateScanning] = useState(false);
  const [attendee, updateAttendee] = useState(null);
  const [awards, updateAwards] = useState([]);
  const [amounts, updateAmounts] = useState([]);
  const [error, updateError] = useState(false);
  const [success, updateSuccess] = useState(false);

  const getAttendeeAwards = (at) => {
    getReedemable(at)
      .then((response) => {
        alert(JSON.stringify(response.data));
        updateAwards(response.data);
        updateAmounts(fillArray(response.data.length));
        updateSelectingAwards(true);
      })
      .catch((_) => updateError(true));
  };

  const redeemAwards = () => {
    updateSuccess(true);
    updateStart(true);
    for (let i = 0; i < awards.length; i++) {
      if (amounts[i] != 0) {
        alert("AQUI");
        redeem(attendee, awards[i].id, amounts[i])
          .then((_) => alert("SUE"))
          .catch((_) => {
            alert("An error has occured");
            updateSuccess(false);
            updateStart(false);
          });
      }
    }
  };

  return (
    <Dashboard title="Reedem prizes">
      {start && (
        <button
          className="m-auto block h-20 w-64 rounded-full bg-quinary"
          onClick={() => {
            updateStart(false);
            updateScanning(true);
          }}
        >
          {success && (
            <p className="font-iregular text-quinary">Redeem successful</p>
          )}
          <p className="font-ibold font-bold">SCAN QR CODE</p>
        </button>
      )}

      {selectingAwards && (
        <>
          <div className="mt-14 border-b-2 border-black">
            <span className="font-ibold text-xl sm:text-2xl">
              Available awards
            </span>
          </div>

          <div className="mt-10 grid grid-cols-1 justify-items-center gap-y-8 gap-x-2 lg:grid-cols-4 lg:gap-x-8">
            {awards.map((entry, id) => (
              <Award
                key={id}
                image={`/public/images/${entry.image.file_name}`}
                redeemable={entry.not_redeemed}
                name={entry.name}
                onValueChange={(e) =>
                  updateAmounts(changeValue(amounts, id, e.currentTarget.value))
                }
              />
            ))}
          </div>
          <button
            className="m-auto mt-5 block h-20 w-64 rounded-full bg-quinary"
            onClick={() => {
              redeemAwards();
            }}
          >
            <p className="font-ibold font-bold">REEDEM</p>
          </button>
        </>
      )}
      {error && <ErrorMessage />}
      {scanning && (
        <QrScanner
          onScan={(at) => {
            updateAttendee(at);
            getAttendeeAwards(at);
          }}
          onExit={() => {
            updateScanning(false);
          }}
        />
      )}
    </Dashboard>
  );
}

export default withAuth(Reedem);

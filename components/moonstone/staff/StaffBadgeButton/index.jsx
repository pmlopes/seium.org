import { redeemBadge } from "/lib/api";

export default function StaffBadgeButton({ badge, start, end, attendee, badgeId }) {

  const redeemBadge = () => {
    if(attendee) {
      const attendee_id = attendee.id;
      const badge_id = badgeId;
      redeemBadge({ attendee_id, badge_id })
      .then(response => {
        alert("The badge was successfully redeemed");
      })
      .catch(_ => alert("An error has occured."));
    } else {
      alert("No attendee selected. Please scan a QR code.");
    }
  };

  return (
    <div className="mt-8 w-auto">
      <button onClick={redeemBadge} className="m-auto block h-16 w-full rounded-full bg-quinary">
        <p className="font-ibold font-bold">🥇 Dar Badge {badge}</p>
        <p className="font-iregular text-slate-200">
          Atribuível entre as {start}-{end}
        </p>
      </button>
    </div>
  );
}

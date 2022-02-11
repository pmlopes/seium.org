export default function Balance({ token_balance, badge_count }) {
  return (
    <div className="lg:grid lg:grid-cols-3 border-b-2 border-black">
      <span className="col-span-1 font-ibold text-xl sm:text-2xl">Balance</span>
      <div className="col-span-2 flex lg:flex-row-reverse gap-x-4">
        <span className="text-md font-iregular sm:text-lg">
          💰 {token_balance} tokens
        </span>
        <span className="text-md font-iregular sm:text-lg">
          🏅 {badge_count} badges
        </span>
      </div>
    </div>
  );
}

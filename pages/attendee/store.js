import { useState, useEffect } from "react";

import { withAuth, useAuth } from "/components/Auth";

import * as api from "/lib/api";

import Dashboard from "/components/moonstone/user/utils/Dashboard";

import Award from "/components/moonstone/user/awards/Award";

function Awards() {
  const { user, setUser } = useAuth();

  const [awards, setAwards] = useState(null);
  const [needsUpdate, updateStore] = useState(null);

  useEffect(() => {
    api
      .getAwards()
      .then((response) => {
        setAwards(response.data);
      })
  }, [needsUpdate])

  console.log(awards)

  return (
    <Dashboard href="store"
      href="store"
      title="Store"
      description="Buy awards with your collected tokens"
    >
      <div className="lg:grid lg:grid-cols-3 mt-14 border-b-2 border-black">
        <span className="col-span-1 font-ibold text-xl sm:text-2xl">Balance</span>
        <div className="col-span-2 flex lg:flex-row-reverse gap-x-4">
          <span className="text-md font-iregular sm:text-lg">
            💰 {user.token_balance} tokens
          </span>
          <span className="text-md font-iregular sm:text-lg">
            🏅 {user.badge_count} badges
          </span>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 justify-items-center gap-y-8 gap-x-2 lg:grid-cols-2 xl:grid-cols-3">

        {awards && awards.filter(a => a.can_buy > 0).sort((a, b) => a.name < b.name).map(award => (
          <div key={award.id}>
            <Award
              name={award.name}
              id={award.id}
              image={award.image}
              cost={award.price}
              available={award.stock}
              message={award.can_buy != 0 ? `You can redeem ${award.can_buy} more` : "You already reached the redeem limit"}
              enabled={award.can_buy != 0}
              updateStore={updateStore}
              token_balance={user.token_balance}
              setUser={setUser}
            />
          </div>
        ))}

        {awards && awards.filter(a => a.can_buy <= 0).sort((a, b) => a.name < b.name).map(award => (
          <div key={award.id}>
            <Award
              name={award.name}
              id={award.id}
              image={award.image}
              cost={award.price}
              available={award.stock}
              message={award.can_buy != 0 ? `You can redeem ${award.can_buy} more` : "You already reached the redeem limit"}
              enabled={award.can_buy != 0}
              updateStore={updateStore}
            />
          </div>
        ))}

      </div>
    </Dashboard>
  );
}

export default withAuth(Awards);
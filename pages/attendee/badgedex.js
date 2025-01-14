import { useState, useEffect } from "react";
import { withAuth } from "/components/Auth";
import { useAuth } from "/components/Auth";

import { getAllBadges } from "/lib/api";

import Dashboard from "/components/moonstone/user/utils/Dashboard";
import ErrorMessage from "/components/utils/ErrorMessage";
import Badge from "/components/moonstone/user/badgedex/Badge";
import Filter from "/components/moonstone/user/badgedex/Filter";

function BadgeButton({ text, val, setValue, selected }) {
  const changeVal = () => {
    if (!selected) setValue(!val);
  };

  return (
    <button
      className={`${selected ? "bg-quinary" : "bg-white text-opacity-40"}
                        ${text == "ALL" ? "px-12 xl:px-6" : "px-10 xl:px-4"}
                        inline-flex w-full items-center rounded-full text-sm text-black
                       `}
      onClick={changeVal}
    >
      {text}
    </button>
  );
}

function Badgedex() {
  const { user } = useAuth();
  const [allBadges, updateAllBadges] = useState([]);
  const [all, updateAll] = useState(true);
  const [filter, updateFilter] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    getAllBadges()
      .then((response) => updateAllBadges(response.data))
      .catch((errors) => {
        setError(errors);
      });
  }, []);

  return (
    <Dashboard
      href="badgedex"
      title="BadgeDex"
      description="Explore all existing badges"
    >
      <div className="pt-10 xl:flex xl:flex-auto">
        <div className="flex flex-auto space-x-5">
          <p className="mb-10 text-2xl font-bold xl:mb-0">Filter by</p>
          <Filter onChange={updateFilter} />
        </div>
        <div className="grid w-auto grid-cols-3 text-2xl font-bold lg:w-1/2 xl:w-auto xl:gap-x-8">
          <div>Show</div>
          <BadgeButton
            text="ALL"
            val={all}
            setValue={updateAll}
            selected={all}
          />
          <BadgeButton
            text="MINE"
            val={all}
            setValue={updateAll}
            selected={!all}
          />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-y-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        {(all ? allBadges : user.badges)
          .filter((badge) => badge.type == filter || filter == null)
          .map((badge) => (
            <Badge key={badge.id} {...badge} />
          ))}
      </div>
      {error && <ErrorMessage />}
    </Dashboard>
  );
}

export default withAuth(Badgedex);

import { withAuth } from "/components/Auth";
import Dashboard from "/components/moonstone/sponsor/utils/Dashboard";

import SponsorBadgeButton from "/components/moonstone/sponsor/dashboard/SponsorBadgeButton";

function SponsorDashboard() {
  return (
    <Dashboard href="dashboard">
      <div>
        <div className="mt-8 md:mt-16">
          <h1 className="text-iextrabold font-ibold text-4xl sm:text-5xl">
            {" "}
            Dashboard{" "}
          </h1>
          <p className="mt-4 font-iregular text-xl">
            Neste local, pode dar badges e premiar os participantes que se
            encontram no seu stand.
          </p>
        </div>

        <div className="col-span-1 w-full md:w-1/2">
          <div className="mt-8 border-b-2 border-black pb-2">
            <span className="font-ibold text-xl sm:text-2xl">Comandos</span>
          </div>

          <div className="mt-5 ml-3  w-3/4">
            <SponsorBadgeButton sponsor="Accenture" />
          </div>
        </div>
      </div>
    </Dashboard>
  );
}

export default withAuth(SponsorDashboard);

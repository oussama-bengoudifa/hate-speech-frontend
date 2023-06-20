//layouts
import { DashboardLayout } from "../layouts";

//hoc
import { withGuard } from "../hoc";

const Dashboard = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <DashboardLayout />
      </div>
    </main>
  );
};

const DashboardWithGuard = withGuard(Dashboard);

export { DashboardWithGuard as Dashboard };

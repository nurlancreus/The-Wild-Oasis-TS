import { Row, Heading } from "@/ui";
import DashboardFilter from "@/features/dashboard/DashboardFilter";
import DashboardLayout from "@/features/dashboard/DashboardLayout";

function Dashboard() {
  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
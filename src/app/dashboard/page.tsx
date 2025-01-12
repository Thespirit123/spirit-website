"use client";

import { withAuth } from "@/components/auth/protected-route";
import { InProgress } from "@/components/in-progress";

const DashboardPage = () => {
  return <InProgress />;
};

export default withAuth(DashboardPage);

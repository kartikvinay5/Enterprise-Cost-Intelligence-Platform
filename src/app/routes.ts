import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardOverview } from "./components/DashboardOverview";
import { SpendIntelligence } from "./components/SpendIntelligence";
import { SLAMonitoring } from "./components/SLAMonitoring";
import { ResourceOptimization } from "./components/ResourceOptimization";
import { FinancialOperations } from "./components/FinancialOperations";
import { ActionCenter } from "./components/ActionCenter";
import { DataManagement } from "./components/DataManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardOverview },
      { path: "spend-intelligence", Component: SpendIntelligence },
      { path: "sla-monitoring", Component: SLAMonitoring },
      { path: "resource-optimization", Component: ResourceOptimization },
      { path: "financial-operations", Component: FinancialOperations },
      { path: "actions", Component: ActionCenter },
      { path: "data-management", Component: DataManagement },
    ],
  },
]);
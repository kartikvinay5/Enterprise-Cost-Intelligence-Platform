import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRight, TrendingDown, AlertTriangle, CheckCircle, Activity, DollarSign, Database } from "lucide-react";
import { Link } from "react-router";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useData } from "../contexts/DataContext";
import { useMemo } from "react";

export function DashboardOverview() {
  const { data } = useData();

  // Calculate insights from real data
  const insights = useMemo(() => {
    // Spend Intelligence: Find vendors with unusual spending patterns
    const totalVendorSpend = data.vendors.reduce((sum, v) => sum + v.monthlySpend, 0);
    const avgVendorSpend = data.vendors.length > 0 ? totalVendorSpend / data.vendors.length : 0;
    const highSpendVendors = data.vendors.filter(v => v.monthlySpend > avgVendorSpend * 1.5);
    const spendIssues = highSpendVendors.length;
    const potentialSpendSavings = highSpendVendors.reduce((sum, v) => sum + (v.monthlySpend * 0.15), 0); // Assume 15% optimization potential

    // SLA Monitoring: Find at-risk contracts
    const atRiskSLAs = data.slaContracts.filter(sla => {
      const percentageFromThreshold = Math.abs((sla.currentValue - sla.threshold) / sla.threshold * 100);
      return percentageFromThreshold < 5; // Within 5% of threshold
    });
    const slaIssues = atRiskSLAs.length;
    const potentialSLAPenalties = atRiskSLAs.reduce((sum, sla) => sum + sla.penaltyAmount, 0);

    // Resource Optimization: Find underutilized resources
    const underutilizedResources = data.resources.filter(r => r.utilization < 50);
    const resourceIssues = underutilizedResources.length;
    const potentialResourceSavings = underutilizedResources.reduce((sum, r) => sum + (r.monthlyCost * 0.4), 0); // 40% savings on underutilized

    // Financial Operations: Find unmatched transactions
    const unmatchedTransactions = data.transactions.filter(t => t.status === 'unmatched');
    const financeIssues = unmatchedTransactions.length;
    const unmatchedAmount = unmatchedTransactions.reduce((sum, t) => sum + t.amount, 0);

    // Duplicate detection in transactions
    const duplicateTransactions = data.transactions.filter((t, i, arr) => 
      arr.findIndex(t2 => 
        t2.vendor === t.vendor && 
        t2.amount === t.amount && 
        Math.abs(new Date(t2.date).getTime() - new Date(t.date).getTime()) < 7 * 24 * 60 * 60 * 1000 && // Within 7 days
        t2.id !== t.id
      ) !== -1
    );
    const potentialDuplicateAmount = duplicateTransactions.reduce((sum, t) => sum + t.amount, 0) / 2; // Divide by 2 to avoid double counting

    const totalSavings = potentialSpendSavings + potentialSLAPenalties + potentialResourceSavings + potentialDuplicateAmount;
    const totalIssues = spendIssues + slaIssues + resourceIssues + financeIssues;

    return {
      spend: {
        savings: potentialSpendSavings,
        issues: spendIssues,
      },
      sla: {
        savings: potentialSLAPenalties,
        issues: slaIssues,
      },
      resource: {
        savings: potentialResourceSavings,
        issues: resourceIssues,
      },
      finance: {
        savings: potentialDuplicateAmount + unmatchedAmount * 0.1, // Assume 10% of unmatched might be errors
        issues: financeIssues,
      },
      totalSavings,
      totalIssues,
    };
  }, [data]);

  // Generate chart data
  const agentData = [
    { name: "Spend", value: insights.spend.savings, color: "#b4a7d6" },
    { name: "SLA", value: insights.sla.savings, color: "#a8dadc" },
    { name: "Resource", value: insights.resource.savings, color: "#f1c6e7" },
    { name: "Finance", value: insights.finance.savings, color: "#ffd6ba" },
  ].filter(d => d.value > 0);

  const agents = [
    {
      title: "Spend Intelligence Agent",
      description: "Procurement & vendor optimization",
      savings: insights.spend.savings,
      status: "active",
      issues: insights.spend.issues,
      color: "bg-[#b4a7d6]",
      link: "/spend-intelligence",
      icon: TrendingDown,
    },
    {
      title: "SLA Monitoring Agent",
      description: "Breach prevention & penalties",
      savings: insights.sla.savings,
      status: "active",
      issues: insights.sla.issues,
      color: "bg-[#a8dadc]",
      link: "/sla-monitoring",
      icon: AlertTriangle,
    },
    {
      title: "Resource Optimization Agent",
      description: "Infrastructure & tool utilization",
      savings: insights.resource.savings,
      status: "active",
      issues: insights.resource.issues,
      color: "bg-[#f1c6e7]",
      link: "/resource-optimization",
      icon: Activity,
    },
    {
      title: "Financial Operations Agent",
      description: "Reconciliation & variance analysis",
      savings: insights.finance.savings,
      status: "active",
      issues: insights.finance.issues,
      color: "bg-[#ffd6ba]",
      link: "/financial-operations",
      icon: CheckCircle,
    },
  ];

  const hasData = data.vendors.length > 0 || data.slaContracts.length > 0 || data.resources.length > 0 || data.transactions.length > 0;

  if (!hasData) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Enterprise Intelligence Dashboard</h1>
          <p className="text-muted-foreground">AI-powered cost optimization and operational efficiency monitoring</p>
        </div>

        <Card className="bg-gradient-to-br from-[#b4a7d6]/10 to-[#f1c6e7]/10 border-[#b4a7d6]/30">
          <CardContent className="p-12 text-center">
            <Database className="h-16 w-16 mx-auto mb-4 text-[#8b7fc7]" />
            <h2 className="text-2xl font-semibold mb-2">Welcome to OptimaAI</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get started by adding your company's operational data. The AI agents will automatically analyze your data and identify cost optimization opportunities.
            </p>
            <Link to="/data-management">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Database className="mr-2 h-5 w-5" />
                Add Your Data
              </Button>
            </Link>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-[#b4a7d6]/20 to-[#b4a7d6]/5 border-[#b4a7d6]/30">
            <CardHeader>
              <CardTitle>Vendors</CardTitle>
              <CardDescription>Add vendor contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">0</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#a8dadc]/20 to-[#a8dadc]/5 border-[#a8dadc]/30">
            <CardHeader>
              <CardTitle>SLA Contracts</CardTitle>
              <CardDescription>Define SLA commitments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">0</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#f1c6e7]/20 to-[#f1c6e7]/5 border-[#f1c6e7]/30">
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>Track infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">0</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#ffd6ba]/20 to-[#ffd6ba]/5 border-[#ffd6ba]/30">
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>Record financial data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">0</div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">Enterprise Intelligence Dashboard</h1>
        <p className="text-muted-foreground">AI-powered cost optimization and operational efficiency monitoring</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-[#b4a7d6]/20 to-[#b4a7d6]/5 border-[#b4a7d6]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings Potential</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">₹{(insights.totalSavings / 100000).toFixed(2)}L</div>
            <p className="text-xs text-muted-foreground mt-1">
              Monthly optimization potential
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#a8dadc]/20 to-[#a8dadc]/5 border-[#a8dadc]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Data Points</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {data.vendors.length + data.slaContracts.length + data.resources.length + data.transactions.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all systems
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#f1c6e7]/20 to-[#f1c6e7]/5 border-[#f1c6e7]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{insights.totalIssues}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Detected by AI agents
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#ffd6ba]/20 to-[#ffd6ba]/5 border-[#ffd6ba]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spend</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              ₹{(data.vendors.reduce((sum, v) => sum + v.monthlySpend, 0) / 100000).toFixed(2)}L
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total vendor spend
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      {agentData.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Savings by Agent</CardTitle>
              <CardDescription>Potential cost impact across all agents</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={agentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {agentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `₹${(value/100000).toFixed(2)}L`}
                    contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Distribution</CardTitle>
              <CardDescription>Your entered data across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: "Vendors", count: data.vendors.length },
                  { name: "SLAs", count: data.slaContracts.length },
                  { name: "Resources", count: data.resources.length },
                  { name: "Transactions", count: data.transactions.length },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                  />
                  <Bar dataKey="count" fill="#b4a7d6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Agent Cards */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">AI Agents</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {agents.map((agent) => (
            <Card key={agent.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`${agent.color} p-3 rounded-lg`}>
                      <agent.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{agent.title}</CardTitle>
                      <CardDescription>{agent.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-[#c7e8ca] text-[#2f5233] border-[#c7e8ca]">
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Savings Potential</span>
                    <span className="text-xl font-semibold text-foreground">
                      ₹{(agent.savings / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active Issues</span>
                    <Badge variant="outline" className={agent.issues > 0 ? "bg-[#ffd6ba] text-[#7c4a03] border-[#ffd6ba]" : "bg-[#c7e8ca] text-[#2f5233] border-[#c7e8ca]"}>
                      {agent.issues} detected
                    </Badge>
                  </div>
                  <Link to={agent.link}>
                    <Button className="w-full mt-2" variant="outline">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

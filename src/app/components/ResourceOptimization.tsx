import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Activity, Server, Users, Package, TrendingUp, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { toast } from "sonner";

// Mock data for resource utilization
const utilizationData = [
  { resource: "AWS EC2", current: 45, optimal: 85, waste: 40 },
  { resource: "Azure VMs", current: 38, optimal: 85, waste: 47 },
  { resource: "GCP Compute", current: 52, optimal: 85, waste: 33 },
  { resource: "Kubernetes", current: 61, optimal: 85, waste: 24 },
  { resource: "Storage", current: 48, optimal: 80, waste: 32 },
];

// License utilization
const licenseData = [
  { name: "Slack", used: 287, total: 400, color: "#b4a7d6" },
  { name: "Zoom", used: 195, total: 250, color: "#a8dadc" },
  { name: "Jira", used: 342, total: 400, color: "#f1c6e7" },
  { name: "Confluence", used: 178, total: 350, color: "#ffd6ba" },
];

const optimizations = [
  {
    id: 1,
    title: "AWS EC2 Instance Right-Sizing",
    description: "47 instances running at <40% CPU utilization for 30+ days",
    resource: "Compute",
    currentCost: 685000,
    optimizedCost: 298000,
    savings: 387000,
    impact: "high",
    instances: [
      { id: "i-0abc123", type: "m5.2xlarge", utilization: 32, recommendation: "m5.large" },
      { id: "i-0def456", type: "m5.4xlarge", utilization: 28, recommendation: "m5.xlarge" },
      { id: "i-0ghi789", type: "c5.2xlarge", utilization: 35, recommendation: "c5.large" },
    ],
    autoExecute: true,
  },
  {
    id: 2,
    title: "Slack License Consolidation",
    description: "113 inactive users (no activity in 60 days)",
    resource: "SaaS Licenses",
    currentCost: 400000,
    optimizedCost: 287000,
    savings: 113000,
    impact: "medium",
    calculation: "113 users x ₹1,000/user/month = ₹1,13,000",
    autoExecute: false,
  },
  {
    id: 3,
    title: "Azure VM Scheduled Shutdown",
    description: "Non-production VMs running 24/7 unnecessarily",
    resource: "Compute",
    currentCost: 520000,
    optimizedCost: 234000,
    savings: 286000,
    impact: "high",
    schedule: "Shutdown 8 PM - 8 AM weekdays, all day weekends",
    vms: 23,
    autoExecute: true,
  },
  {
    id: 4,
    title: "Unused Storage Volumes",
    description: "89 EBS volumes unattached for 30+ days",
    resource: "Storage",
    currentCost: 145000,
    optimizedCost: 12000,
    savings: 133000,
    impact: "medium",
    volumes: 89,
    totalSize: "14.2 TB",
    autoExecute: true,
  },
  {
    id: 5,
    title: "Confluence License Optimization",
    description: "172 users with view-only activity, over-provisioned",
    resource: "SaaS Licenses",
    currentCost: 350000,
    optimizedCost: 178000,
    savings: 172000,
    impact: "medium",
    calculation: "172 users x ₹1,000/user/month = ₹1,72,000",
    autoExecute: false,
  },
];

export function ResourceOptimization() {
  const totalSavings = optimizations.reduce((sum, opt) => sum + opt.savings, 0);
  const avgUtilization = Math.round(utilizationData.reduce((sum, u) => sum + u.current, 0) / utilizationData.length);

  const handleExecuteOptimization = (optId: number) => {
    const opt = optimizations.find(o => o.id === optId);
    toast.success(`Optimization initiated: ${opt?.title}`, {
      description: `Expected savings: ₹${opt?.savings.toLocaleString('en-IN')}/month`,
    });
  };

  const handleScheduleReview = (optId: number) => {
    const opt = optimizations.find(o => o.id === optId);
    toast.info(`Review scheduled for: ${opt?.title}`, {
      description: "Team will review in next business day",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">Resource Optimization Agent</h1>
        <p className="text-muted-foreground">Infrastructure utilization monitoring and consolidation recommendations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-[#f1c6e7]/20 to-[#f1c6e7]/5 border-[#f1c6e7]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Optimization Potential</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">₹{(totalSavings / 100000).toFixed(2)}L</div>
            <p className="text-xs text-muted-foreground mt-1">Monthly savings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Utilization</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{avgUtilization}%</div>
            <Progress value={avgUtilization} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Idle Resources</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">182</div>
            <p className="text-xs text-muted-foreground mt-1">Across all systems</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Opportunities</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{optimizations.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Ready to execute</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Resource Utilization Analysis</CardTitle>
            <CardDescription>Current vs optimal utilization rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={utilizationData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" domain={[0, 100]} />
                <YAxis type="category" dataKey="resource" stroke="#6b7280" width={100} />
                <Tooltip 
                  formatter={(value: number) => `${value}%`}
                  contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                />
                <Bar dataKey="current" fill="#f8a5c2" name="Current" radius={[0, 8, 8, 0]} />
                <Bar dataKey="optimal" fill="#c7e8ca" name="Optimal" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SaaS License Utilization</CardTitle>
            <CardDescription>Active users vs total licenses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={licenseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                />
                <Bar dataKey="used" fill="#b4a7d6" name="Used" radius={[8, 8, 0, 0]} />
                <Bar dataKey="total" fill="#e5e7eb" name="Total" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Opportunities */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Optimization Opportunities</h2>
        <div className="space-y-4">
          {optimizations.map((opt) => (
            <Card key={opt.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-[#a8dadc] text-[#0e4f5c] border-[#a8dadc]">
                        {opt.resource}
                      </Badge>
                      <Badge variant="outline" className={
                        opt.impact === 'high' ? 'bg-[#ffd6ba] text-[#7c4a03] border-[#ffd6ba]' :
                        'bg-[#ffd6ba]/50 text-[#7c4a03] border-[#ffd6ba]/50'
                      }>
                        {opt.impact} impact
                      </Badge>
                      {opt.autoExecute && (
                        <Badge variant="outline" className="bg-[#c7e8ca] text-[#2f5233] border-[#c7e8ca]">
                          Auto-executable
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{opt.title}</CardTitle>
                    <CardDescription className="mt-1">{opt.description}</CardDescription>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm text-muted-foreground">Monthly Savings</div>
                    <div className="text-2xl font-semibold text-[#2f5233]">
                      ₹{opt.savings.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Current Cost</div>
                      <div className="text-xl font-semibold">₹{opt.currentCost.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="bg-[#c7e8ca]/20 p-4 rounded-lg border border-[#c7e8ca]/50">
                      <div className="text-sm text-muted-foreground mb-1">Optimized Cost</div>
                      <div className="text-xl font-semibold text-[#2f5233]">₹{opt.optimizedCost.toLocaleString('en-IN')}</div>
                    </div>
                  </div>

                  {opt.instances && (
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-medium text-sm mb-3">Sample Instances (showing 3 of {opt.instances.length})</h4>
                      <div className="space-y-2">
                        {opt.instances.map((instance) => (
                          <div key={instance.id} className="flex justify-between items-center text-sm bg-card p-2 rounded">
                            <span className="font-mono text-xs">{instance.id}</span>
                            <span className="text-muted-foreground">{instance.type} → {instance.recommendation}</span>
                            <Badge variant="outline" className="bg-[#f8a5c2] text-[#742a47] border-[#f8a5c2]">
                              {instance.utilization}% used
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {opt.calculation && (
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Calculation</h4>
                      <p className="text-sm text-muted-foreground">{opt.calculation}</p>
                    </div>
                  )}

                  {opt.schedule && (
                    <div className="bg-[#a8dadc]/10 p-3 rounded-lg border border-[#a8dadc]/30">
                      <h4 className="font-medium text-sm mb-1">Proposed Schedule</h4>
                      <p className="text-sm text-muted-foreground">{opt.schedule}</p>
                      <p className="text-sm text-muted-foreground mt-1">Affects {opt.vms} VMs</p>
                    </div>
                  )}

                  {opt.volumes && (
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Volumes to delete:</span>
                        <span className="font-medium">{opt.volumes} volumes ({opt.totalSize})</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button 
                      onClick={() => handleExecuteOptimization(opt.id)}
                      className="flex-1 bg-[#8b7fc7] hover:bg-[#7a6db5]"
                      disabled={!opt.autoExecute}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      {opt.autoExecute ? "Execute Now" : "Requires Manual Review"}
                    </Button>
                    {!opt.autoExecute && (
                      <Button 
                        onClick={() => handleScheduleReview(opt.id)}
                        variant="outline"
                        className="flex-1"
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Schedule Review
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-[#f1c6e7]/10 to-[#b4a7d6]/10 border-[#f1c6e7]/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Total Optimization Potential</h3>
              <p className="text-sm text-muted-foreground">
                By implementing all recommended optimizations
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#2f5233]">
                ₹{(totalSavings / 100000).toFixed(2)} Lakhs
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                ₹{((totalSavings * 12) / 10000000).toFixed(2)}Cr annually
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

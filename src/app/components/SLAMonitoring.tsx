import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { AlertTriangle, Shield, Clock, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { toast } from "sonner";

// Mock data for SLA performance
const slaPerformanceData = [
  { day: "Mon", onTime: 94, breached: 6 },
  { day: "Tue", onTime: 97, breached: 3 },
  { day: "Wed", onTime: 91, breached: 9 },
  { day: "Thu", onTime: 88, breached: 12 },
  { day: "Fri", onTime: 95, breached: 5 },
  { day: "Sat", onTime: 98, breached: 2 },
  { day: "Sun", onTime: 99, breached: 1 },
];

// Penalty trends
const penaltyTrendData = [
  { month: "Oct", prevented: 450000, incurred: 125000 },
  { month: "Nov", prevented: 680000, incurred: 98000 },
  { month: "Dec", prevented: 820000, incurred: 67000 },
  { month: "Jan", prevented: 1150000, incurred: 45000 },
  { month: "Feb", prevented: 1420000, incurred: 32000 },
  { month: "Mar", prevented: 1875000, incurred: 15000 },
];

const slaRisks = [
  {
    id: 1,
    service: "Cloud Infrastructure - AWS",
    client: "TechCorp India",
    slaMetric: "99.9% Uptime",
    currentStatus: 99.87,
    threshold: 99.9,
    timeToBreach: "4 hours",
    penaltyAmount: 875000,
    severity: "critical",
    recommendation: "Shift 15% traffic to backup region ap-south-2",
    autoAction: true,
  },
  {
    id: 2,
    service: "Support Response Time",
    client: "FinServe Solutions",
    slaMetric: "< 30 min response",
    currentStatus: 28,
    threshold: 30,
    timeToBreach: "2 hours",
    penaltyAmount: 425000,
    severity: "high",
    recommendation: "Escalate 8 pending tickets to senior support team",
    autoAction: false,
  },
  {
    id: 3,
    service: "Data Processing SLA",
    client: "RetailMax",
    slaMetric: "< 2 hour processing",
    currentStatus: 105,
    threshold: 120,
    timeToBreach: "1.5 hours",
    penaltyAmount: 320000,
    severity: "medium",
    recommendation: "Allocate 3 additional processing nodes",
    autoAction: true,
  },
];

const recentActions = [
  {
    id: 1,
    action: "Auto-scaled compute resources",
    client: "DataFlow Inc",
    impact: 650000,
    status: "executed",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    action: "Rerouted traffic to backup",
    client: "MegaCorp",
    impact: 1200000,
    status: "executed",
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    action: "Priority queue adjustment",
    client: "QuickServe",
    impact: 280000,
    status: "executed",
    timestamp: "1 day ago",
  },
];

export function SLAMonitoring() {
  const totalPrevented = 1875000;
  const activeRisks = slaRisks.length;
  const avgCompliance = 96.8;

  const handleExecuteAction = (riskId: number) => {
    const risk = slaRisks.find(r => r.id === riskId);
    toast.success(`Action initiated for ${risk?.service}`, {
      description: `Preventing potential penalty of ₹${risk?.penaltyAmount.toLocaleString('en-IN')}`,
    });
  };

  const handleEscalate = (riskId: number) => {
    const risk = slaRisks.find(r => r.id === riskId);
    toast.info(`Escalated: ${risk?.service}`, {
      description: "Management team notified",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">SLA Monitoring Agent</h1>
        <p className="text-muted-foreground">Real-time breach detection and automated penalty prevention</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-[#a8dadc]/20 to-[#a8dadc]/5 border-[#a8dadc]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Penalties Prevented</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">₹{(totalPrevented / 100000).toFixed(2)}L</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Risks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{activeRisks}</div>
            <p className="text-xs text-muted-foreground mt-1">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Compliance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{avgCompliance}%</div>
            <Progress value={avgCompliance} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto Actions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">47</div>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>SLA Performance Trend</CardTitle>
            <CardDescription>Daily compliance vs breach rate</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={slaPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  formatter={(value: number) => `${value}%`}
                  contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                />
                <Bar dataKey="onTime" fill="#c7e8ca" name="On Time" radius={[8, 8, 0, 0]} />
                <Bar dataKey="breached" fill="#f8a5c2" name="Breached" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Penalty Prevention Impact</CardTitle>
            <CardDescription>Prevented vs incurred penalties over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={penaltyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" tickFormatter={(value) => `₹${(value/100000).toFixed(0)}L`} />
                <Tooltip 
                  formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
                  contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                />
                <Line type="monotone" dataKey="prevented" stroke="#c7e8ca" strokeWidth={3} name="Prevented" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="incurred" stroke="#f8a5c2" strokeWidth={3} name="Incurred" dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Active SLA Risks */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Active SLA Risks</h2>
        <div className="space-y-4">
          {slaRisks.map((risk) => (
            <Card key={risk.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={
                        risk.severity === 'critical' ? 'bg-[#f8a5c2] text-[#742a47] border-[#f8a5c2]' :
                        risk.severity === 'high' ? 'bg-[#ffd6ba] text-[#7c4a03] border-[#ffd6ba]' :
                        'bg-[#ffd6ba]/50 text-[#7c4a03] border-[#ffd6ba]/50'
                      }>
                        {risk.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="bg-[#a8dadc] text-[#0e4f5c] border-[#a8dadc]">
                        {risk.client}
                      </Badge>
                      {risk.autoAction && (
                        <Badge variant="outline" className="bg-[#c7e8ca] text-[#2f5233] border-[#c7e8ca]">
                          Auto-action enabled
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{risk.service}</CardTitle>
                    <CardDescription className="mt-1">SLA: {risk.slaMetric}</CardDescription>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm text-muted-foreground">Potential Penalty</div>
                    <div className="text-2xl font-semibold text-[#742a47]">
                      ₹{risk.penaltyAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current Status</span>
                      <span className="font-semibold">{risk.currentStatus}{typeof risk.currentStatus === 'number' && risk.currentStatus > 50 ? '%' : ' min'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">SLA Threshold</span>
                      <span className="font-semibold">{risk.threshold}{typeof risk.threshold === 'number' && risk.threshold > 50 ? '%' : ' min'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Time to Breach</span>
                      <span className="font-semibold text-[#742a47]">{risk.timeToBreach}</span>
                    </div>
                    <Progress 
                      value={risk.severity === 'critical' ? 85 : risk.severity === 'high' ? 70 : 50} 
                      className="mt-2"
                    />
                  </div>
                  
                  <div className="bg-[#a8dadc]/10 p-3 rounded-lg border border-[#a8dadc]/30">
                    <h4 className="font-medium text-sm mb-1 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Recommended Action
                    </h4>
                    <p className="text-sm text-muted-foreground">{risk.recommendation}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleExecuteAction(risk.id)}
                      className="flex-1 bg-[#8b7fc7] hover:bg-[#7a6db5]"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Execute Action
                    </Button>
                    <Button 
                      onClick={() => handleEscalate(risk.id)}
                      variant="outline"
                      className="flex-1"
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Escalate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Auto-Actions</CardTitle>
          <CardDescription>Automated interventions executed to prevent SLA breaches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#2f5233]" />
                  <div>
                    <div className="font-medium">{action.action}</div>
                    <div className="text-sm text-muted-foreground">{action.client} • {action.timestamp}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Penalty Prevented</div>
                  <div className="font-semibold text-[#2f5233]">₹{action.impact.toLocaleString('en-IN')}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="bg-gradient-to-r from-[#a8dadc]/10 to-[#c7e8ca]/10 border-[#a8dadc]/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Total Penalties Prevented (This Month)</h3>
              <p className="text-sm text-muted-foreground">
                Through proactive monitoring and automated actions
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#2f5233]">
                ₹{(totalPrevented / 100000).toFixed(2)} Lakhs
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1 justify-end">
                96.8% SLA compliance rate
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
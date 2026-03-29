import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { AlertTriangle, CheckCircle, DollarSign, TrendingDown, ArrowUpRight, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { toast } from "sonner";

// Mock data for duplicate costs by vendor
const duplicateCostsData = [
  { vendor: "AWS", duplicate: 285000, normal: 1200000 },
  { vendor: "Microsoft", duplicate: 178000, normal: 890000 },
  { vendor: "Salesforce", duplicate: 142000, normal: 650000 },
  { vendor: "Oracle", duplicate: 98000, normal: 420000 },
  { vendor: "Adobe", duplicate: 67000, normal: 310000 },
];

// Spend anomalies over time
const anomalyData = [
  { week: "W1", normal: 1200000, anomaly: 150000 },
  { week: "W2", normal: 1180000, anomaly: 220000 },
  { week: "W3", normal: 1210000, anomaly: 185000 },
  { week: "W4", normal: 1195000, anomaly: 310000 },
];

const issues = [
  {
    id: 1,
    title: "Duplicate AWS EC2 Instances",
    description: "3 redundant EC2 instances running identical workloads in ap-south-1",
    impact: 285000,
    confidence: 98,
    type: "duplicate",
    vendor: "AWS",
    details: {
      instances: ["i-0abc123", "i-0def456", "i-0ghi789"],
      monthlyEach: 95000,
      recommendation: "Consolidate to single instance with auto-scaling"
    }
  },
  {
    id: 2,
    title: "Microsoft 365 License Over-Provisioning",
    description: "127 E5 licenses assigned to users who only need E3",
    impact: 178000,
    confidence: 95,
    type: "rate-optimization",
    vendor: "Microsoft",
    details: {
      currentLicenses: "127 x E5 @ ₹1,400/user/month",
      recommendedLicenses: "127 x E3 @ ₹700/user/month",
      calculation: "127 x (1,400 - 700) = ₹88,900/month x 2 months = ₹177,800"
    }
  },
  {
    id: 3,
    title: "Salesforce Duplicate User Accounts",
    description: "45 inactive user licenses still being paid for",
    impact: 142000,
    confidence: 100,
    type: "waste",
    vendor: "Salesforce",
    details: {
      inactiveDays: 90,
      costPerLicense: 3156,
      totalWaste: "45 x ₹3,156/month = ₹1,42,020/month"
    }
  },
  {
    id: 4,
    title: "Oracle Database Reserved Instance Opportunity",
    description: "On-demand usage pattern suitable for 3-year reserved instances",
    impact: 98000,
    confidence: 92,
    type: "rate-optimization",
    vendor: "Oracle",
    details: {
      currentCost: "₹1,65,000/month on-demand",
      reservedCost: "₹1,32,000/month (3-year RI)",
      savings: "₹33,000/month x 3 months = ₹99,000"
    }
  },
  {
    id: 5,
    title: "Adobe Creative Cloud Unused Licenses",
    description: "23 licenses with zero usage in last 60 days",
    impact: 67000,
    confidence: 100,
    type: "waste",
    vendor: "Adobe",
    details: {
      licenses: 23,
      costPerLicense: 2900,
      calculation: "23 x ₹2,900/month = ₹66,700/month"
    }
  },
];

export function SpendIntelligence() {
  const totalImpact = issues.reduce((sum, issue) => sum + issue.impact, 0);
  const avgConfidence = Math.round(issues.reduce((sum, issue) => sum + issue.confidence, 0) / issues.length);

  const handleApproveAction = (issueId: number) => {
    const issue = issues.find(i => i.id === issueId);
    toast.success(`Action approved for: ${issue?.title}`, {
      description: `Estimated savings: ₹${issue?.impact.toLocaleString('en-IN')}`,
    });
  };

  const handleGeneratePlaybook = (issueId: number) => {
    const issue = issues.find(i => i.id === issueId);
    toast.info(`Generating playbook for: ${issue?.title}`, {
      description: "Detailed action plan will be ready in 30 seconds",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">Spend Intelligence Agent</h1>
        <p className="text-muted-foreground">AI-powered procurement and vendor cost optimization</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-[#b4a7d6]/20 to-[#b4a7d6]/5 border-[#b4a7d6]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Impact</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">₹{(totalImpact / 100000).toFixed(2)}L</div>
            <p className="text-xs text-muted-foreground mt-1">Across {issues.length} opportunities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues Detected</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{issues.length}</div>
            <p className="text-xs text-muted-foreground mt-1">High confidence findings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{avgConfidence}%</div>
            <Progress value={avgConfidence} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anomalies</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">12</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Duplicate Costs by Vendor</CardTitle>
            <CardDescription>Identified redundant spending across vendors</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={duplicateCostsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" tickFormatter={(value) => `₹${(value/100000).toFixed(0)}L`} />
                <YAxis type="category" dataKey="vendor" stroke="#6b7280" width={80} />
                <Tooltip 
                  formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
                  contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                />
                <Bar dataKey="duplicate" fill="#f8a5c2" name="Duplicate Costs" radius={[0, 8, 8, 0]} />
                <Bar dataKey="normal" fill="#b4a7d6" name="Normal Costs" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spend Anomaly Detection</CardTitle>
            <CardDescription>Weekly spend patterns and detected anomalies</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={anomalyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="week" stroke="#6b7280" />
                <YAxis stroke="#6b7280" tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`} />
                <Tooltip 
                  formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
                  contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                />
                <Line type="monotone" dataKey="normal" stroke="#a8dadc" strokeWidth={2} name="Normal Spend" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="anomaly" stroke="#f8a5c2" strokeWidth={2} name="Anomaly" strokeDasharray="5 5" dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Issues List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Active Cost Opportunities</h2>
        <div className="space-y-4">
          {issues.map((issue) => (
            <Card key={issue.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-[#ffd6ba] text-[#7c4a03] border-[#ffd6ba]">
                        {issue.vendor}
                      </Badge>
                      <Badge variant="outline" className={
                        issue.type === 'duplicate' ? 'bg-[#f8a5c2] text-[#742a47] border-[#f8a5c2]' :
                        issue.type === 'rate-optimization' ? 'bg-[#a8dadc] text-[#0e4f5c] border-[#a8dadc]' :
                        'bg-[#ffd6ba] text-[#7c4a03] border-[#ffd6ba]'
                      }>
                        {issue.type}
                      </Badge>
                      <Badge variant="outline" className="bg-[#c7e8ca] text-[#2f5233] border-[#c7e8ca]">
                        {issue.confidence}% confidence
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{issue.title}</CardTitle>
                    <CardDescription className="mt-1">{issue.description}</CardDescription>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm text-muted-foreground">Potential Savings</div>
                    <div className="text-2xl font-semibold text-[#2f5233]">
                      ₹{issue.impact.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2 mb-4">
                  <h4 className="font-medium text-sm">Financial Impact Calculation:</h4>
                  {Object.entries(issue.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleApproveAction(issue.id)}
                    className="flex-1 bg-[#8b7fc7] hover:bg-[#7a6db5]"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve & Execute
                  </Button>
                  <Button 
                    onClick={() => handleGeneratePlaybook(issue.id)}
                    variant="outline"
                    className="flex-1"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Playbook
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-[#b4a7d6]/10 to-[#a8dadc]/10 border-[#b4a7d6]/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Total Monthly Savings Potential</h3>
              <p className="text-sm text-muted-foreground">
                By implementing all recommended actions
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#2f5233]">
                ₹{(totalImpact / 100000).toFixed(2)} Lakhs
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-4 w-4 text-[#2f5233]" />
                ₹{((totalImpact * 12) / 10000000).toFixed(2)}Cr annually
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
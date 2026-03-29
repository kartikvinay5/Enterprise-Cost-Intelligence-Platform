import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calculator, FileText, AlertCircle, CheckCircle, TrendingUp, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { toast } from "sonner";

// Mock data for variance analysis
const varianceData = [
  { category: "Travel", budget: 850000, actual: 1120000, variance: 270000 },
  { category: "Software", budget: 2100000, actual: 1950000, variance: -150000 },
  { category: "Marketing", budget: 1200000, actual: 1380000, variance: 180000 },
  { category: "Operations", budget: 980000, actual: 925000, variance: -55000 },
  { category: "HR", budget: 650000, actual: 715000, variance: 65000 },
];

// Transaction reconciliation trends
const reconciliationData = [
  { week: "W1", matched: 8542, unmatched: 127 },
  { week: "W2", matched: 8891, unmatched: 98 },
  { week: "W3", matched: 9234, unmatched: 156 },
  { week: "W4", matched: 9578, unmatched: 89 },
];

const discrepancies = [
  {
    id: 1,
    title: "Duplicate Invoice Payment - Vendor XYZ Corp",
    description: "Invoice #INV-2024-1847 paid twice on different dates",
    amount: 285000,
    status: "flagged",
    priority: "high",
    details: {
      invoice: "INV-2024-1847",
      firstPayment: "15-Feb-2024 | ₹2,85,000",
      secondPayment: "22-Feb-2024 | ₹2,85,000",
      vendor: "XYZ Corp",
      action: "Initiate refund process"
    },
    rootCause: "Manual entry error during system migration"
  },
  {
    id: 2,
    title: "Budget Variance - Travel Department",
    description: "27% overspend against Q1 budget allocation",
    amount: 270000,
    status: "analyzing",
    priority: "medium",
    details: {
      budgeted: "₹8,50,000",
      actual: "₹11,20,000",
      variance: "₹2,70,000 (27% over)",
      period: "Jan-Mar 2024"
    },
    rootCause: "Unplanned international conference attendance by 8 team members"
  },
  {
    id: 3,
    title: "Unreconciled Bank Transaction",
    description: "₹1,42,000 credit in account with no matching invoice",
    amount: 142000,
    status: "investigating",
    priority: "high",
    details: {
      accountNumber: "****6789",
      date: "18-Mar-2024",
      reference: "NEFT/2024/03/18/0458",
      amount: "₹1,42,000"
    },
    rootCause: "Missing metadata from payment gateway"
  },
  {
    id: 4,
    title: "Vendor Rate Change Not Reflected",
    description: "Continued billing at old rate despite contract amendment",
    amount: 98000,
    status: "flagged",
    priority: "medium",
    details: {
      vendor: "CloudServe India",
      oldRate: "₹1,65,000/month",
      newRate: "₹1,32,000/month",
      effectiveDate: "01-Jan-2024",
      overcharge: "₹33,000/month x 3 months = ₹99,000"
    },
    rootCause: "Vendor billing system not updated after contract renewal"
  },
  {
    id: 5,
    title: "Missing Purchase Order Documentation",
    description: "₹3,25,000 worth of expenses without PO numbers",
    amount: 325000,
    status: "flagged",
    priority: "low",
    details: {
      transactions: "47 transactions",
      totalAmount: "₹3,25,000",
      department: "IT Operations",
      period: "March 2024"
    },
    rootCause: "Emergency purchases during system outage, POs created retrospectively"
  },
];

export function FinancialOperations() {
  const totalDiscrepancies = discrepancies.reduce((sum, d) => sum + d.amount, 0);
  const avgCloseTime = 4.2;
  const accuracyRate = 98.7;

  const handleResolveDiscrepancy = (discId: number) => {
    const disc = discrepancies.find(d => d.id === discId);
    toast.success(`Resolution initiated: ${disc?.title}`, {
      description: `Amount: ₹${disc?.amount.toLocaleString('en-IN')}`,
    });
  };

  const handleGenerateReport = (discId: number) => {
    const disc = discrepancies.find(d => d.id === discId);
    toast.info(`Generating detailed report for: ${disc?.title}`, {
      description: "Report will be available in 30 seconds",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">Financial Operations Agent</h1>
        <p className="text-muted-foreground">Automated reconciliation, variance analysis, and discrepancy detection</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-[#ffd6ba]/20 to-[#ffd6ba]/5 border-[#ffd6ba]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Discrepancies</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">₹{(totalDiscrepancies / 100000).toFixed(2)}L</div>
            <p className="text-xs text-muted-foreground mt-1">Across {discrepancies.length} cases</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Close Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{avgCloseTime} days</div>
            <p className="text-xs text-muted-foreground mt-1">18% faster than Q4</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{accuracyRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">Reconciliation accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">156 hrs</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Budget Variance Analysis</CardTitle>
            <CardDescription>Actual vs budgeted spend by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={varianceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`} />
                <YAxis type="category" dataKey="category" stroke="#6b7280" width={80} />
                <Tooltip 
                  formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
                  contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                />
                <Bar dataKey="budget" fill="#b4a7d6" name="Budget" radius={[0, 8, 8, 0]} />
                <Bar dataKey="actual" fill="#ffd6ba" name="Actual" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Reconciliation</CardTitle>
            <CardDescription>Weekly matched vs unmatched transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reconciliationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="week" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                />
                <Line type="monotone" dataKey="matched" stroke="#c7e8ca" strokeWidth={3} name="Matched" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="unmatched" stroke="#f8a5c2" strokeWidth={3} name="Unmatched" dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Discrepancies */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Active Discrepancies</h2>
        <div className="space-y-4">
          {discrepancies.map((disc) => (
            <Card key={disc.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={
                        disc.priority === 'high' ? 'bg-[#f8a5c2] text-[#742a47] border-[#f8a5c2]' :
                        disc.priority === 'medium' ? 'bg-[#ffd6ba] text-[#7c4a03] border-[#ffd6ba]' :
                        'bg-[#a8dadc] text-[#0e4f5c] border-[#a8dadc]'
                      }>
                        {disc.priority.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className={
                        disc.status === 'flagged' ? 'bg-[#ffd6ba] text-[#7c4a03] border-[#ffd6ba]' :
                        disc.status === 'analyzing' ? 'bg-[#a8dadc] text-[#0e4f5c] border-[#a8dadc]' :
                        'bg-[#f1c6e7] text-[#742a47] border-[#f1c6e7]'
                      }>
                        {disc.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{disc.title}</CardTitle>
                    <CardDescription className="mt-1">{disc.description}</CardDescription>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm text-muted-foreground">Amount</div>
                    <div className="text-2xl font-semibold text-[#742a47]">
                      ₹{disc.amount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <h4 className="font-medium text-sm mb-2">Transaction Details:</h4>
                    {Object.entries(disc.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="font-medium text-right ml-4">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#ffd6ba]/10 p-3 rounded-lg border border-[#ffd6ba]/30">
                    <h4 className="font-medium text-sm mb-1 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Root Cause Analysis
                    </h4>
                    <p className="text-sm text-muted-foreground">{disc.rootCause}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleResolveDiscrepancy(disc.id)}
                      className="flex-1 bg-[#8b7fc7] hover:bg-[#7a6db5]"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Resolve & Close
                    </Button>
                    <Button 
                      onClick={() => handleGenerateReport(disc.id)}
                      variant="outline"
                      className="flex-1"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-gradient-to-r from-[#ffd6ba]/10 to-[#b4a7d6]/10 border-[#ffd6ba]/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Efficiency Gains</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Through automated reconciliation
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between gap-8">
                    <span className="text-sm text-muted-foreground">Time saved per month:</span>
                    <span className="font-semibold">156 hours</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span className="text-sm text-muted-foreground">Cost equivalent:</span>
                    <span className="font-semibold text-[#2f5233]">₹2,34,000</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span className="text-sm text-muted-foreground">Errors prevented:</span>
                    <span className="font-semibold">89</span>
                  </div>
                </div>
              </div>
              <Calculator className="h-12 w-12 text-[#8b7fc7] opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-[#c7e8ca]/10 to-[#a8dadc]/10 border-[#c7e8ca]/30">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Recovery Potential</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  From identified discrepancies
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between gap-8">
                    <span className="text-sm text-muted-foreground">Duplicate payments:</span>
                    <span className="font-semibold">₹2,85,000</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span className="text-sm text-muted-foreground">Vendor overcharges:</span>
                    <span className="font-semibold">₹98,000</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span className="text-sm text-muted-foreground">Total recoverable:</span>
                    <span className="font-semibold text-[#2f5233]">₹{((285000 + 98000) / 100000).toFixed(2)}L</span>
                  </div>
                </div>
              </div>
              <TrendingUp className="h-12 w-12 text-[#8b7fc7] opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
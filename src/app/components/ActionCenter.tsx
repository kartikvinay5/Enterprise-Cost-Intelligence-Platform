import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertTriangle, 
  TrendingDown, 
  Shield, 
  Activity, 
  Calculator,
  Play,
  Pause,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { toast } from "sonner";

type ActionStatus = "pending" | "approved" | "rejected" | "in-progress" | "completed";
type ActionAgent = "spend" | "sla" | "resource" | "financial";

interface Action {
  id: number;
  agent: ActionAgent;
  title: string;
  description: string;
  impact: number;
  status: ActionStatus;
  priority: "critical" | "high" | "medium" | "low";
  createdAt: string;
  estimatedTime: string;
  approver?: string;
  details: string;
}

const actions: Action[] = [
  {
    id: 1,
    agent: "spend",
    title: "Consolidate AWS EC2 Instances",
    description: "3 redundant EC2 instances running identical workloads",
    impact: 285000,
    status: "pending",
    priority: "high",
    createdAt: "2 hours ago",
    estimatedTime: "15 minutes",
    details: "Will migrate workloads to single m5.2xlarge instance with auto-scaling enabled. Requires 10 min downtime during off-peak hours.",
  },
  {
    id: 2,
    agent: "sla",
    title: "Auto-Scale Cloud Infrastructure",
    description: "Approaching 99.9% uptime SLA threshold for TechCorp",
    impact: 875000,
    status: "approved",
    priority: "critical",
    createdAt: "30 minutes ago",
    estimatedTime: "5 minutes",
    approver: "System Admin",
    details: "Automatically add 2 additional compute nodes in ap-south-2 region. Zero downtime deployment.",
  },
  {
    id: 3,
    agent: "resource",
    title: "Schedule Non-Prod VM Shutdown",
    description: "23 Azure VMs running 24/7 unnecessarily",
    impact: 286000,
    status: "pending",
    priority: "medium",
    createdAt: "4 hours ago",
    estimatedTime: "2 minutes",
    details: "Implement shutdown schedule: 8 PM - 8 AM weekdays, all day weekends. Saves 65% of runtime costs.",
  },
  {
    id: 4,
    agent: "financial",
    title: "Initiate Duplicate Payment Refund",
    description: "Invoice INV-2024-1847 paid twice to XYZ Corp",
    impact: 285000,
    status: "in-progress",
    priority: "high",
    createdAt: "1 day ago",
    estimatedTime: "3-5 business days",
    approver: "Finance Manager",
    details: "Vendor contacted, refund acknowledgment received. Expected credit in 3-5 business days.",
  },
  {
    id: 5,
    agent: "spend",
    title: "Downgrade Microsoft 365 Licenses",
    description: "127 E5 licenses can be downgraded to E3",
    impact: 178000,
    status: "pending",
    priority: "medium",
    createdAt: "5 hours ago",
    estimatedTime: "30 minutes",
    details: "User access analysis shows E3 features sufficient. Will retain full functionality for all users.",
  },
  {
    id: 6,
    agent: "sla",
    title: "Escalate Support Tickets",
    description: "8 tickets at risk of breaching 30-min SLA",
    impact: 425000,
    status: "completed",
    priority: "high",
    createdAt: "3 hours ago",
    estimatedTime: "Immediate",
    approver: "Support Lead",
    details: "All 8 tickets escalated to senior team. Average resolution time: 18 minutes.",
  },
  {
    id: 7,
    agent: "resource",
    title: "Delete Unused EBS Volumes",
    description: "89 volumes unattached for 30+ days",
    impact: 133000,
    status: "pending",
    priority: "low",
    createdAt: "1 day ago",
    estimatedTime: "10 minutes",
    details: "All volumes backed up to S3 Glacier. Safe to delete with 30-day recovery window.",
  },
  {
    id: 8,
    agent: "financial",
    title: "Correct Vendor Rate Billing",
    description: "CloudServe India billing at old rate",
    impact: 98000,
    status: "approved",
    priority: "medium",
    createdAt: "6 hours ago",
    estimatedTime: "1 business day",
    approver: "Procurement Head",
    details: "Vendor notified of contract amendment. Will issue credit note for overcharged amount.",
  },
  {
    id: 9,
    agent: "spend",
    title: "Deactivate Inactive Salesforce Users",
    description: "45 user licenses with 90+ days inactivity",
    impact: 142000,
    status: "pending",
    priority: "medium",
    createdAt: "8 hours ago",
    estimatedTime: "20 minutes",
    details: "Users notified 7 days ago. No response received. Will preserve data and allow reactivation.",
  },
  {
    id: 10,
    agent: "sla",
    title: "Reroute Traffic to Backup Region",
    description: "Primary region showing latency spikes",
    impact: 650000,
    status: "completed",
    priority: "critical",
    createdAt: "5 hours ago",
    estimatedTime: "Immediate",
    approver: "Auto-executed",
    details: "Traffic automatically rerouted to ap-south-2. Latency reduced from 450ms to 120ms.",
  },
  {
    id: 11,
    agent: "resource",
    title: "Right-Size AWS RDS Instances",
    description: "Database instances over-provisioned",
    impact: 187000,
    status: "rejected",
    priority: "medium",
    createdAt: "2 days ago",
    estimatedTime: "1 hour",
    approver: "Database Admin",
    details: "Rejected: Planning migration to Aurora in Q2. Will optimize during migration.",
  },
  {
    id: 12,
    agent: "financial",
    title: "Reconcile Unmatched Bank Transaction",
    description: "₹1,42,000 credit with no matching invoice",
    impact: 142000,
    status: "in-progress",
    priority: "high",
    createdAt: "12 hours ago",
    estimatedTime: "2-3 days",
    approver: "CFO",
    details: "Investigation ongoing. Contacted payment gateway for transaction metadata.",
  },
];

const agentConfig = {
  spend: { icon: TrendingDown, color: "bg-[#b4a7d6]", name: "Spend Intelligence" },
  sla: { icon: Shield, color: "bg-[#a8dadc]", name: "SLA Monitoring" },
  resource: { icon: Activity, color: "bg-[#f1c6e7]", name: "Resource Optimization" },
  financial: { icon: Calculator, color: "bg-[#ffd6ba]", name: "Financial Operations" },
};

const statusConfig = {
  pending: { badge: "bg-[#ffd6ba] text-[#7c4a03] border-[#ffd6ba]", icon: Clock },
  approved: { badge: "bg-[#c7e8ca] text-[#2f5233] border-[#c7e8ca]", icon: CheckCircle },
  rejected: { badge: "bg-[#f8a5c2] text-[#742a47] border-[#f8a5c2]", icon: XCircle },
  "in-progress": { badge: "bg-[#a8dadc] text-[#0e4f5c] border-[#a8dadc]", icon: Play },
  completed: { badge: "bg-[#c7e8ca] text-[#2f5233] border-[#c7e8ca]", icon: CheckCircle },
};

export function ActionCenter() {
  const pendingActions = actions.filter(a => a.status === "pending");
  const approvedActions = actions.filter(a => a.status === "approved" || a.status === "in-progress");
  const completedActions = actions.filter(a => a.status === "completed");
  const rejectedActions = actions.filter(a => a.status === "rejected");

  const totalPendingImpact = pendingActions.reduce((sum, a) => sum + a.impact, 0);
  const totalCompletedImpact = completedActions.reduce((sum, a) => sum + a.impact, 0);

  const handleApprove = (actionId: number) => {
    const action = actions.find(a => a.id === actionId);
    toast.success(`Action approved: ${action?.title}`, {
      description: `Will save ₹${action?.impact.toLocaleString('en-IN')}`,
    });
  };

  const handleReject = (actionId: number) => {
    const action = actions.find(a => a.id === actionId);
    toast.error(`Action rejected: ${action?.title}`, {
      description: "You can review this decision later",
    });
  };

  const renderActionCard = (action: Action) => {
    const AgentIcon = agentConfig[action.agent].icon;
    const StatusIcon = statusConfig[action.status].icon;

    return (
      <Card key={action.id} className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`${agentConfig[action.agent].color} p-2 rounded`}>
                  <AgentIcon className="h-4 w-4 text-white" />
                </div>
                <Badge variant="outline" className="bg-[#f5f2fe] text-[#4a5568] border-[#d4c5f9]">
                  {agentConfig[action.agent].name}
                </Badge>
                <Badge variant="outline" className={statusConfig[action.status].badge}>
                  {action.status.replace("-", " ")}
                </Badge>
                <Badge variant="outline" className={
                  action.priority === 'critical' ? 'bg-[#f8a5c2] text-[#742a47] border-[#f8a5c2]' :
                  action.priority === 'high' ? 'bg-[#ffd6ba] text-[#7c4a03] border-[#ffd6ba]' :
                  action.priority === 'medium' ? 'bg-[#a8dadc] text-[#0e4f5c] border-[#a8dadc]' :
                  'bg-muted text-muted-foreground border-muted'
                }>
                  {action.priority}
                </Badge>
              </div>
              <CardTitle className="text-lg">{action.title}</CardTitle>
              <CardDescription className="mt-1">{action.description}</CardDescription>
            </div>
            <div className="text-right ml-4">
              <div className="text-sm text-muted-foreground">Impact</div>
              <div className="text-xl font-semibold text-[#2f5233]">
                ₹{(action.impact / 1000).toFixed(0)}K
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted/30 p-3 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span className="font-medium">{action.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Est. Time:</span>
                <span className="font-medium">{action.estimatedTime}</span>
              </div>
              {action.approver && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Approver:</span>
                  <span className="font-medium">{action.approver}</span>
                </div>
              )}
            </div>

            <div className="bg-[#f5f2fe] p-3 rounded-lg border border-[#d4c5f9]/30">
              <p className="text-sm text-muted-foreground">{action.details}</p>
            </div>

            {action.status === "pending" && (
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleApprove(action.id)}
                  className="flex-1 bg-[#8b7fc7] hover:bg-[#7a6db5]"
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button 
                  onClick={() => handleReject(action.id)}
                  variant="outline"
                  className="flex-1"
                >
                  <ThumbsDown className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
            )}

            {(action.status === "approved" || action.status === "in-progress") && (
              <div className="flex items-center gap-2 p-3 bg-[#c7e8ca]/20 rounded-lg border border-[#c7e8ca]/50">
                <StatusIcon className="h-5 w-5 text-[#2f5233]" />
                <span className="text-sm font-medium text-[#2f5233]">
                  {action.status === "approved" ? "Approved - Ready to execute" : "In Progress - Executing now"}
                </span>
              </div>
            )}

            {action.status === "completed" && (
              <div className="flex items-center gap-2 p-3 bg-[#c7e8ca]/20 rounded-lg border border-[#c7e8ca]/50">
                <CheckCircle className="h-5 w-5 text-[#2f5233]" />
                <span className="text-sm font-medium text-[#2f5233]">
                  Completed - ₹{action.impact.toLocaleString('en-IN')} saved
                </span>
              </div>
            )}

            {action.status === "rejected" && (
              <div className="flex items-center gap-2 p-3 bg-[#f8a5c2]/20 rounded-lg border border-[#f8a5c2]/50">
                <XCircle className="h-5 w-5 text-[#742a47]" />
                <span className="text-sm font-medium text-[#742a47]">
                  Rejected by {action.approver}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">Action Center</h1>
        <p className="text-muted-foreground">Review and approve AI-generated cost optimization actions</p>
      </div>

      {/* Summary Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-[#ffd6ba]/20 to-[#ffd6ba]/5 border-[#ffd6ba]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{pendingActions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              ₹{(totalPendingImpact / 100000).toFixed(2)}L potential
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#a8dadc]/20 to-[#a8dadc]/5 border-[#a8dadc]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{approvedActions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently executing
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#c7e8ca]/20 to-[#c7e8ca]/5 border-[#c7e8ca]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{completedActions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              ₹{(totalCompletedImpact / 100000).toFixed(2)}L saved
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#f8a5c2]/20 to-[#f8a5c2]/5 border-[#f8a5c2]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{rejectedActions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              This week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Interface */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="pending">
            Pending ({pendingActions.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Active ({approvedActions.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedActions.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedActions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingActions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-[#c7e8ca]" />
                <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                <p className="text-sm text-muted-foreground">No pending actions require your attention.</p>
              </CardContent>
            </Card>
          ) : (
            pendingActions.map(renderActionCard)
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {approvedActions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Pause className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No active actions</h3>
                <p className="text-sm text-muted-foreground">Approve pending actions to see them here.</p>
              </CardContent>
            </Card>
          ) : (
            approvedActions.map(renderActionCard)
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedActions.map(renderActionCard)}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedActions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-[#c7e8ca]" />
                <h3 className="text-lg font-semibold mb-2">No rejected actions</h3>
                <p className="text-sm text-muted-foreground">All actions have been approved or are pending.</p>
              </CardContent>
            </Card>
          ) : (
            rejectedActions.map(renderActionCard)
          )}
        </TabsContent>
      </Tabs>

      {/* Impact Summary */}
      {pendingActions.length > 0 && (
        <Card className="bg-gradient-to-r from-[#b4a7d6]/10 to-[#ffd6ba]/10 border-[#b4a7d6]/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Total Pending Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Approve all pending actions to unlock these savings
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-[#2f5233]">
                  ₹{(totalPendingImpact / 100000).toFixed(2)} Lakhs
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Monthly savings potential
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

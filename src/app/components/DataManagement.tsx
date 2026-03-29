import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useData, Vendor, SLAContract, Resource, Transaction } from "../contexts/DataContext";
import { toast } from "sonner";
import { Plus, Trash2, Edit, Download, Upload } from "lucide-react";

export function DataManagement() {
  const { data, addVendor, deleteVendor, addSLAContract, deleteSLAContract, addResource, deleteResource, addTransaction, deleteTransaction } = useData();
  
  const [vendorDialog, setVendorDialog] = useState(false);
  const [slaDialog, setSlaDialog] = useState(false);
  const [resourceDialog, setResourceDialog] = useState(false);
  const [transactionDialog, setTransactionDialog] = useState(false);

  // Vendor form state
  const [vendorForm, setVendorForm] = useState({
    name: "",
    monthlySpend: "",
    category: "",
  });

  // SLA form state
  const [slaForm, setSlaForm] = useState({
    clientName: "",
    serviceName: "",
    metric: "",
    threshold: "",
    currentValue: "",
    penaltyAmount: "",
  });

  // Resource form state
  const [resourceForm, setResourceForm] = useState({
    name: "",
    type: "compute" as "compute" | "storage" | "license",
    provider: "",
    monthlyCost: "",
    utilization: "",
  });

  // Transaction form state
  const [transactionForm, setTransactionForm] = useState({
    date: "",
    vendor: "",
    amount: "",
    category: "",
    invoiceNumber: "",
    status: "matched" as "matched" | "unmatched",
  });

  const handleAddVendor = () => {
    if (!vendorForm.name || !vendorForm.monthlySpend || !vendorForm.category) {
      toast.error("Please fill all fields");
      return;
    }
    addVendor({
      name: vendorForm.name,
      monthlySpend: parseFloat(vendorForm.monthlySpend),
      category: vendorForm.category,
    });
    setVendorForm({ name: "", monthlySpend: "", category: "" });
    setVendorDialog(false);
    toast.success("Vendor added successfully");
  };

  const handleAddSLA = () => {
    if (!slaForm.clientName || !slaForm.serviceName || !slaForm.metric || !slaForm.threshold || !slaForm.currentValue || !slaForm.penaltyAmount) {
      toast.error("Please fill all fields");
      return;
    }
    addSLAContract({
      clientName: slaForm.clientName,
      serviceName: slaForm.serviceName,
      metric: slaForm.metric,
      threshold: parseFloat(slaForm.threshold),
      currentValue: parseFloat(slaForm.currentValue),
      penaltyAmount: parseFloat(slaForm.penaltyAmount),
    });
    setSlaForm({ clientName: "", serviceName: "", metric: "", threshold: "", currentValue: "", penaltyAmount: "" });
    setSlaDialog(false);
    toast.success("SLA contract added successfully");
  };

  const handleAddResource = () => {
    if (!resourceForm.name || !resourceForm.provider || !resourceForm.monthlyCost || !resourceForm.utilization) {
      toast.error("Please fill all fields");
      return;
    }
    addResource({
      name: resourceForm.name,
      type: resourceForm.type,
      provider: resourceForm.provider,
      monthlyCost: parseFloat(resourceForm.monthlyCost),
      utilization: parseFloat(resourceForm.utilization),
    });
    setResourceForm({ name: "", type: "compute", provider: "", monthlyCost: "", utilization: "" });
    setResourceDialog(false);
    toast.success("Resource added successfully");
  };

  const handleAddTransaction = () => {
    if (!transactionForm.date || !transactionForm.vendor || !transactionForm.amount || !transactionForm.category) {
      toast.error("Please fill all required fields");
      return;
    }
    addTransaction({
      date: transactionForm.date,
      vendor: transactionForm.vendor,
      amount: parseFloat(transactionForm.amount),
      category: transactionForm.category,
      invoiceNumber: transactionForm.invoiceNumber || undefined,
      status: transactionForm.status,
    });
    setTransactionForm({ date: "", vendor: "", amount: "", category: "", invoiceNumber: "", status: "matched" });
    setTransactionDialog(false);
    toast.success("Transaction added successfully");
  };

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "optinaai-data.json";
    link.click();
    toast.success("Data exported successfully");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">Data Management</h1>
          <p className="text-muted-foreground">Enter and manage your company's operational data</p>
        </div>
        <Button onClick={exportData} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      <Tabs defaultValue="vendors" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="vendors">Vendors ({data.vendors.length})</TabsTrigger>
          <TabsTrigger value="sla">SLA Contracts ({data.slaContracts.length})</TabsTrigger>
          <TabsTrigger value="resources">Resources ({data.resources.length})</TabsTrigger>
          <TabsTrigger value="transactions">Transactions ({data.transactions.length})</TabsTrigger>
        </TabsList>

        {/* Vendors Tab */}
        <TabsContent value="vendors" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Vendor Management</CardTitle>
                  <CardDescription>Add and manage your vendor contracts and spending</CardDescription>
                </div>
                <Dialog open={vendorDialog} onOpenChange={setVendorDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Vendor
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Vendor</DialogTitle>
                      <DialogDescription>Enter vendor details and monthly spend</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="vendor-name">Vendor Name</Label>
                        <Input
                          id="vendor-name"
                          placeholder="e.g., AWS, Microsoft"
                          value={vendorForm.name}
                          onChange={(e) => setVendorForm({ ...vendorForm, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vendor-spend">Monthly Spend (₹)</Label>
                        <Input
                          id="vendor-spend"
                          type="number"
                          placeholder="e.g., 250000"
                          value={vendorForm.monthlySpend}
                          onChange={(e) => setVendorForm({ ...vendorForm, monthlySpend: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vendor-category">Category</Label>
                        <Select value={vendorForm.category} onValueChange={(value) => setVendorForm({ ...vendorForm, category: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Cloud">Cloud Services</SelectItem>
                            <SelectItem value="Software">Software Licenses</SelectItem>
                            <SelectItem value="Hardware">Hardware</SelectItem>
                            <SelectItem value="Services">Professional Services</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleAddVendor} className="w-full">Add Vendor</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {data.vendors.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No vendors added yet. Click "Add Vendor" to get started.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.vendors.map((vendor) => (
                    <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{vendor.name}</h4>
                        <p className="text-sm text-muted-foreground">{vendor.category}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Monthly Spend</p>
                          <p className="font-semibold">₹{vendor.monthlySpend.toLocaleString('en-IN')}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            deleteVendor(vendor.id);
                            toast.success("Vendor deleted");
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SLA Contracts Tab */}
        <TabsContent value="sla" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>SLA Contract Management</CardTitle>
                  <CardDescription>Define SLA commitments and penalty terms</CardDescription>
                </div>
                <Dialog open={slaDialog} onOpenChange={setSlaDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add SLA Contract
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New SLA Contract</DialogTitle>
                      <DialogDescription>Enter SLA details and monitoring thresholds</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sla-client">Client Name</Label>
                          <Input
                            id="sla-client"
                            placeholder="e.g., TechCorp India"
                            value={slaForm.clientName}
                            onChange={(e) => setSlaForm({ ...slaForm, clientName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sla-service">Service Name</Label>
                          <Input
                            id="sla-service"
                            placeholder="e.g., Cloud Infrastructure"
                            value={slaForm.serviceName}
                            onChange={(e) => setSlaForm({ ...slaForm, serviceName: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sla-metric">SLA Metric</Label>
                        <Input
                          id="sla-metric"
                          placeholder="e.g., 99.9% Uptime or <30 min response time"
                          value={slaForm.metric}
                          onChange={(e) => setSlaForm({ ...slaForm, metric: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sla-threshold">Threshold Value</Label>
                          <Input
                            id="sla-threshold"
                            type="number"
                            step="0.01"
                            placeholder="e.g., 99.9 or 30"
                            value={slaForm.threshold}
                            onChange={(e) => setSlaForm({ ...slaForm, threshold: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sla-current">Current Value</Label>
                          <Input
                            id="sla-current"
                            type="number"
                            step="0.01"
                            placeholder="e.g., 99.85 or 28"
                            value={slaForm.currentValue}
                            onChange={(e) => setSlaForm({ ...slaForm, currentValue: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sla-penalty">Penalty Amount (₹)</Label>
                        <Input
                          id="sla-penalty"
                          type="number"
                          placeholder="e.g., 500000"
                          value={slaForm.penaltyAmount}
                          onChange={(e) => setSlaForm({ ...slaForm, penaltyAmount: e.target.value })}
                        />
                      </div>
                      <Button onClick={handleAddSLA} className="w-full">Add SLA Contract</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {data.slaContracts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No SLA contracts added yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.slaContracts.map((sla) => (
                    <div key={sla.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{sla.serviceName}</h4>
                        <p className="text-sm text-muted-foreground">{sla.clientName} • {sla.metric}</p>
                        <p className="text-sm mt-1">
                          Current: {sla.currentValue} | Threshold: {sla.threshold}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Penalty</p>
                          <p className="font-semibold text-destructive">₹{sla.penaltyAmount.toLocaleString('en-IN')}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            deleteSLAContract(sla.id);
                            toast.success("SLA contract deleted");
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Resource Management</CardTitle>
                  <CardDescription>Track infrastructure and license utilization</CardDescription>
                </div>
                <Dialog open={resourceDialog} onOpenChange={setResourceDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Resource
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Resource</DialogTitle>
                      <DialogDescription>Enter resource details and utilization metrics</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="resource-name">Resource Name</Label>
                        <Input
                          id="resource-name"
                          placeholder="e.g., EC2 Instance - Production"
                          value={resourceForm.name}
                          onChange={(e) => setResourceForm({ ...resourceForm, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="resource-type">Type</Label>
                        <Select value={resourceForm.type} onValueChange={(value: "compute" | "storage" | "license") => setResourceForm({ ...resourceForm, type: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="compute">Compute</SelectItem>
                            <SelectItem value="storage">Storage</SelectItem>
                            <SelectItem value="license">License</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="resource-provider">Provider</Label>
                        <Input
                          id="resource-provider"
                          placeholder="e.g., AWS, Azure, Slack"
                          value={resourceForm.provider}
                          onChange={(e) => setResourceForm({ ...resourceForm, provider: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="resource-cost">Monthly Cost (₹)</Label>
                        <Input
                          id="resource-cost"
                          type="number"
                          placeholder="e.g., 125000"
                          value={resourceForm.monthlyCost}
                          onChange={(e) => setResourceForm({ ...resourceForm, monthlyCost: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="resource-utilization">Utilization (%)</Label>
                        <Input
                          id="resource-utilization"
                          type="number"
                          min="0"
                          max="100"
                          placeholder="e.g., 45"
                          value={resourceForm.utilization}
                          onChange={(e) => setResourceForm({ ...resourceForm, utilization: e.target.value })}
                        />
                      </div>
                      <Button onClick={handleAddResource} className="w-full">Add Resource</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {data.resources.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No resources added yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.resources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{resource.name}</h4>
                        <p className="text-sm text-muted-foreground">{resource.provider} • {resource.type}</p>
                        <p className="text-sm mt-1">Utilization: {resource.utilization}%</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Monthly Cost</p>
                          <p className="font-semibold">₹{resource.monthlyCost.toLocaleString('en-IN')}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            deleteResource(resource.id);
                            toast.success("Resource deleted");
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Transaction Management</CardTitle>
                  <CardDescription>Record financial transactions for reconciliation</CardDescription>
                </div>
                <Dialog open={transactionDialog} onOpenChange={setTransactionDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Transaction
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Transaction</DialogTitle>
                      <DialogDescription>Enter transaction details for reconciliation</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="txn-date">Date</Label>
                        <Input
                          id="txn-date"
                          type="date"
                          value={transactionForm.date}
                          onChange={(e) => setTransactionForm({ ...transactionForm, date: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="txn-vendor">Vendor</Label>
                        <Input
                          id="txn-vendor"
                          placeholder="e.g., AWS"
                          value={transactionForm.vendor}
                          onChange={(e) => setTransactionForm({ ...transactionForm, vendor: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="txn-amount">Amount (₹)</Label>
                        <Input
                          id="txn-amount"
                          type="number"
                          placeholder="e.g., 150000"
                          value={transactionForm.amount}
                          onChange={(e) => setTransactionForm({ ...transactionForm, amount: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="txn-category">Category</Label>
                        <Select value={transactionForm.category} onValueChange={(value) => setTransactionForm({ ...transactionForm, category: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Cloud">Cloud Services</SelectItem>
                            <SelectItem value="Software">Software</SelectItem>
                            <SelectItem value="Travel">Travel</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Operations">Operations</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="txn-invoice">Invoice Number (Optional)</Label>
                        <Input
                          id="txn-invoice"
                          placeholder="e.g., INV-2024-001"
                          value={transactionForm.invoiceNumber}
                          onChange={(e) => setTransactionForm({ ...transactionForm, invoiceNumber: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="txn-status">Status</Label>
                        <Select value={transactionForm.status} onValueChange={(value: "matched" | "unmatched") => setTransactionForm({ ...transactionForm, status: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="matched">Matched</SelectItem>
                            <SelectItem value="unmatched">Unmatched</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleAddTransaction} className="w-full">Add Transaction</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {data.transactions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No transactions added yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.transactions.slice(0, 10).map((txn) => (
                    <div key={txn.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{txn.vendor}</h4>
                        <p className="text-sm text-muted-foreground">{txn.category} • {txn.date}</p>
                        {txn.invoiceNumber && <p className="text-sm">{txn.invoiceNumber}</p>}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">₹{txn.amount.toLocaleString('en-IN')}</p>
                          <p className={`text-sm ${txn.status === 'matched' ? 'text-green-600' : 'text-destructive'}`}>
                            {txn.status}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            deleteTransaction(txn.id);
                            toast.success("Transaction deleted");
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {data.transactions.length > 10 && (
                    <p className="text-sm text-muted-foreground text-center pt-2">
                      Showing 10 of {data.transactions.length} transactions
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

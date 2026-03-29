import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Data Types
export interface Vendor {
  id: string;
  name: string;
  monthlySpend: number;
  category: string;
}

export interface SLAContract {
  id: string;
  clientName: string;
  serviceName: string;
  metric: string;
  threshold: number;
  currentValue: number;
  penaltyAmount: number;
}

export interface Resource {
  id: string;
  name: string;
  type: "compute" | "storage" | "license";
  provider: string;
  monthlyCost: number;
  utilization: number;
}

export interface Transaction {
  id: string;
  date: string;
  vendor: string;
  amount: number;
  category: string;
  invoiceNumber?: string;
  status: "matched" | "unmatched";
}

interface AppData {
  vendors: Vendor[];
  slaContracts: SLAContract[];
  resources: Resource[];
  transactions: Transaction[];
}

interface DataContextType {
  data: AppData;
  addVendor: (vendor: Omit<Vendor, "id">) => void;
  updateVendor: (id: string, vendor: Partial<Vendor>) => void;
  deleteVendor: (id: string) => void;
  addSLAContract: (contract: Omit<SLAContract, "id">) => void;
  updateSLAContract: (id: string, contract: Partial<SLAContract>) => void;
  deleteSLAContract: (id: string) => void;
  addResource: (resource: Omit<Resource, "id">) => void;
  updateResource: (id: string, resource: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  clearAllData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY = "optinaai-data";

const defaultData: AppData = {
  vendors: [],
  slaContracts: [],
  resources: [],
  transactions: [],
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(defaultData);

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored data", e);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Vendor operations
  const addVendor = (vendor: Omit<Vendor, "id">) => {
    const newVendor = { ...vendor, id: crypto.randomUUID() };
    setData((prev) => ({ ...prev, vendors: [...prev.vendors, newVendor] }));
  };

  const updateVendor = (id: string, updates: Partial<Vendor>) => {
    setData((prev) => ({
      ...prev,
      vendors: prev.vendors.map((v) => (v.id === id ? { ...v, ...updates } : v)),
    }));
  };

  const deleteVendor = (id: string) => {
    setData((prev) => ({
      ...prev,
      vendors: prev.vendors.filter((v) => v.id !== id),
    }));
  };

  // SLA Contract operations
  const addSLAContract = (contract: Omit<SLAContract, "id">) => {
    const newContract = { ...contract, id: crypto.randomUUID() };
    setData((prev) => ({ ...prev, slaContracts: [...prev.slaContracts, newContract] }));
  };

  const updateSLAContract = (id: string, updates: Partial<SLAContract>) => {
    setData((prev) => ({
      ...prev,
      slaContracts: prev.slaContracts.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    }));
  };

  const deleteSLAContract = (id: string) => {
    setData((prev) => ({
      ...prev,
      slaContracts: prev.slaContracts.filter((c) => c.id !== id),
    }));
  };

  // Resource operations
  const addResource = (resource: Omit<Resource, "id">) => {
    const newResource = { ...resource, id: crypto.randomUUID() };
    setData((prev) => ({ ...prev, resources: [...prev.resources, newResource] }));
  };

  const updateResource = (id: string, updates: Partial<Resource>) => {
    setData((prev) => ({
      ...prev,
      resources: prev.resources.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    }));
  };

  const deleteResource = (id: string) => {
    setData((prev) => ({
      ...prev,
      resources: prev.resources.filter((r) => r.id !== id),
    }));
  };

  // Transaction operations
  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = { ...transaction, id: crypto.randomUUID() };
    setData((prev) => ({ ...prev, transactions: [...prev.transactions, newTransaction] }));
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setData((prev) => ({
      ...prev,
      transactions: prev.transactions.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }));
  };

  const deleteTransaction = (id: string) => {
    setData((prev) => ({
      ...prev,
      transactions: prev.transactions.filter((t) => t.id !== id),
    }));
  };

  const clearAllData = () => {
    setData(defaultData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        addVendor,
        updateVendor,
        deleteVendor,
        addSLAContract,
        updateSLAContract,
        deleteSLAContract,
        addResource,
        updateResource,
        deleteResource,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        clearAllData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

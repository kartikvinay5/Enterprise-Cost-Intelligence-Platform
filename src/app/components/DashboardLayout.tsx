import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  TrendingDown, 
  Shield, 
  Activity, 
  Calculator,
  CheckSquare,
  Menu,
  Bell,
  Database
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Spend Intelligence", href: "/spend-intelligence", icon: TrendingDown },
  { name: "SLA Monitoring", href: "/sla-monitoring", icon: Shield },
  { name: "Resource Optimization", href: "/resource-optimization", icon: Activity },
  { name: "Financial Operations", href: "/financial-operations", icon: Calculator },
  { name: "Data Management", href: "/data-management", icon: Database },
];

export function DashboardLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavItems = () => (
    <>
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card shadow-sm">
        <div className="flex items-center justify-between px-4 py-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild={false} className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex flex-col h-full bg-sidebar">
                  <div className="p-6 border-b border-sidebar-border">
                    <h2 className="text-xl font-semibold text-foreground">OptimaAI</h2>
                    <p className="text-sm text-muted-foreground mt-1">Enterprise Intelligence</p>
                  </div>
                  <nav className="flex-1 p-4 space-y-2">
                    <NavItems />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <div>
              <h1 className="text-xl font-semibold text-foreground">OptimaAI</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">Enterprise Cost Intelligence Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/actions">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground">
                  12
                </Badge>
              </Button>
            </Link>
            <Link to="/actions">
              <Button className="bg-primary hover:bg-primary/90">
                <CheckSquare className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Action Center</span>
                <span className="sm:hidden">Actions</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex w-64 border-r bg-sidebar min-h-[calc(100vh-73px)]">
          <nav className="flex-1 p-4 space-y-2">
            <NavItems />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
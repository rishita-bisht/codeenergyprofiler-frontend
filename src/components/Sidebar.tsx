import { NavLink } from '@/components/NavLink';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  FileCode, 
  BarChart3,
  Zap
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/hotspots', icon: AlertTriangle, label: 'Hotspots' },
  { to: '/files', icon: FileCode, label: 'File Analysis' },
  { to: '/metrics', icon: BarChart3, label: 'Metrics' },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen p-4">
      {/* Logo */}
      <div className="mb-8 px-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Energy Profiler</h2>
            <p className="text-xs text-muted-foreground">Code Optimizer</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            activeClassName="bg-primary/10 text-primary font-medium"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg bg-muted/30 border border-border">
        <div className="text-xs text-muted-foreground">
          <div className="font-medium mb-1">VS Code Extension</div>
          <div>Version 1.0.0</div>
        </div>
      </div>
    </aside>
  );
}

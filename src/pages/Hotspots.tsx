import { useState } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Filter,
  SortDesc,
  Zap,
  Target,
  FileCode,
  ChevronRight,
  Code
} from 'lucide-react';

// --- TYPE DEFINITIONS & MOCK DATA (Inlined for self-containment) ---
/** @typedef {'critical' | 'high' | 'medium' | 'low'} Severity */
/**
 * @typedef {object} Hotspot
 * @property {string} id
 * @property {string} fileName
 * @property {string} filePath
 * @property {number} lineNumber
 * @property {string} rule
 * @property {string} description
 * @property {number} energyCost
 * @property {Severity} severity
 * @property {string} context
 */

/** @type {Hotspot[]} */
const MOCK_HOTSPOTS = [
  { id: 'h1', fileName: 'loop_calc.py', filePath: 'utils/loop_calc.py', lineNumber: 45, rule: 'Inefficient Nested Loop', description: 'O(n^2) operation in data processing utility. Causes major CPU spikes.', energyCost: 312.5, severity: 'critical', context: 'for i in range(n):\n  for j in range(n):\n    // heavy computation' },
  { id: 'h2', fileName: 'json_parser.js', filePath: 'api/parser.js', lineNumber: 120, rule: 'Synchronous File Read', description: 'Blocking I/O operation on the main thread. High latency.', energyCost: 189.7, severity: 'high', context: 'const data = fs.readFileSync(file);' },
  { id: 'h3', fileName: 'db_query.sql', filePath: 'db/queries.sql', lineNumber: 1, rule: 'Missing Index in WHERE', description: 'Full table scan on large dataset. Consumes excessive memory.', energyCost: 88.0, severity: 'medium', context: 'SELECT * FROM users WHERE name = "Smith";' },
  { id: 'h4', fileName: 'config.yaml', filePath: 'config/app.yaml', lineNumber: 10, rule: 'Excessive Logging', description: 'Debug logs left active in production. Low CPU impact.', energyCost: 45.1, severity: 'low', context: 'logger.debug("Processing request...")' },
  { id: 'h5', fileName: 'render_loop.ts', filePath: 'client/render_loop.ts', lineNumber: 22, rule: 'Frequent Re-renders', description: 'State changes triggering unnecessary component updates.', energyCost: 210.0, severity: 'critical', context: 'useEffect(() => { setState(data); }, [data, state]);' },
];

// Mock for useToast (since we don't have external hooks)
const useToast = () => ({
  toast: ({ title, description }) => {
    console.log(`[TOAST] ${title}: ${description}`);
    // In a real app, this would trigger a notification UI
  }
});
// --- END MOCK DATA ---

// --- THEMED HELPER COMPONENTS (Inlined for self-containment) ---

/** @type {React.FC<{className?: string, children: React.ReactNode, onClick?: () => void}>} */
const Card = ({ className, children, onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-gradient-to-br p-4 rounded-xl transition-colors duration-300 w-full from-[#1a0a2e] to-[#0a0a23] text-white border-2 border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.2)] ${className || ''}`}
  >
    {children}
  </div>
);

/** @type {React.FC<{className?: string, children: React.ReactNode, variant?: 'primary' | 'outline', onClick?: () => void, disabled?: boolean}>} */
const Button = ({ className, children, variant = 'primary', onClick, disabled }) => {
  const baseClasses = "rounded-full px-4 py-2 text-sm font-black uppercase transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  let variantClasses;
  if (variant === 'primary') {
    variantClasses = "bg-pink-500 text-black hover:bg-pink-400 shadow-[0_0_15px_rgba(255,46,136,0.6)] hover:shadow-[0_0_20px_rgba(255,46,136,1)]";
  } else if (variant === 'outline') {
    variantClasses = "bg-transparent text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_20px_rgba(0,240,255,0.8)]";
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

/** @type {React.FC<{className?: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}>} */
const Input = ({ className, placeholder, value, onChange }) => (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`flex h-10 w-full rounded-md border-2 bg-transparent py-2 pl-10 pr-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 border-pink-500 text-cyan-400 placeholder:text-gray-600 focus:ring-cyan-400 focus:ring-offset-[#0a0a23] font-mono ${className || ''}`}
    />
);

/** @type {React.FC<{severity: Severity, className?: string}>} */
const SeverityBadge = ({ severity, className }) => {
  let color;
  switch (severity) {
    case 'critical': color = 'bg-pink-500 text-black shadow-[0_0_8px_rgba(255,46,136,0.8)]'; break;
    case 'high': color = 'bg-orange-500 text-black shadow-[0_0_8px_rgba(255,165,0,0.8)]'; break;
    case 'medium': color = 'bg-yellow-400 text-black shadow-[0_0_8px_rgba(250,204,21,0.8)]'; break;
    default: color = 'bg-cyan-400 text-black shadow-[0_0_8px_rgba(0,240,255,0.8)]';
  }
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase ${color} ${className || ''}`}>
      {severity}
    </span>
  );
};

/** @type {React.FC<{hotspot: Hotspot, onFix: (id: string) => void}>} */
const HotspotCard = ({ hotspot, onFix }) => {
  const getBorderColor = (severity) => {
    switch (severity) {
      case 'critical': return 'border-pink-500 shadow-[0_0_20px_rgba(255,46,136,0.5)] hover:border-pink-400';
      case 'high': return 'border-orange-500 shadow-[0_0_20px_rgba(255,165,0,0.5)] hover:border-orange-400';
      case 'medium': return 'border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)] hover:border-yellow-300';
      default: return 'border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:border-cyan-300';
    }
  };

  const energyColor = hotspot.energyCost >= 200 ? 'text-pink-500' : hotspot.energyCost >= 100 ? 'text-orange-500' : 'text-cyan-400';

  return (
    <Card className={`p-6 hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300 ${getBorderColor(hotspot.severity)}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <Target className={`h-8 w-8 ${energyColor}`} />
          <div>
            <div className="text-xl font-black tracking-wider text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">RULE:</span> {hotspot.rule}
            </div>
            <p className="text-sm text-gray-400 mt-1">{hotspot.description}</p>
          </div>
        </div>
        <SeverityBadge severity={hotspot.severity} className="text-sm" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-b border-gray-700/50 py-4 mb-4">
        {/* Cost */}
        <div className="flex flex-col">
          <div className="text-xs uppercase text-pink-500 flex items-center gap-1">
            <Zap className="h-3 w-3" /> Energy Cost
          </div>
          <div className={`font-black text-lg ${energyColor}`}>
            {hotspot.energyCost.toFixed(1)} mJ
          </div>
        </div>
        {/* File */}
        <div className="flex flex-col col-span-2">
          <div className="text-xs uppercase text-pink-500 flex items-center gap-1">
            <FileCode className="h-3 w-3" /> Target File
          </div>
          <div className="font-mono text-sm text-cyan-400 truncate">
            {hotspot.filePath}:{hotspot.lineNumber}
          </div>
        </div>
        {/* Action */}
        <div className="flex justify-end items-end">
          <Button 
            variant="primary" 
            onClick={() => onFix(hotspot.id)}
            className="w-full lg:w-auto"
          >
            Fix Issue
          </Button>
        </div>
      </div>
      
      {/* Code Context */}
      <div>
        <div className="text-xs uppercase mb-2 text-pink-500 flex items-center gap-1">
          <Code className="h-3 w-3" /> Code Context
        </div>
        <pre className="bg-[#040410] p-3 rounded-lg overflow-x-auto border border-gray-700 text-xs text-green-400 shadow-inner shadow-gray-900/50">
          <code className='font-mono'>{hotspot.context}</code>
        </pre>
      </div>
    </Card>
  );
};

// Mock Select Component (Simplified for structure preservation)
const Select = ({ value, onValueChange, children }) => (
  <div className="relative w-full md:w-48">
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="flex h-10 w-full rounded-md border-2 bg-transparent py-2 pl-10 pr-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 border-cyan-400 text-cyan-400 focus:ring-pink-500 focus:ring-offset-[#0a0a23] font-mono appearance-none"
    >
      {children}
    </select>
    <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 h-4 w-4 text-pink-500 pointer-events-none" />
  </div>
);

const SelectTrigger = ({ children, className }) => <>{children}</>;
const SelectContent = ({ children }) => <>{children}</>;
const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;
const SelectValue = ({ placeholder }) => <option value="" disabled>{placeholder}</option>;
// --- END THEMED HELPER COMPONENTS ---


// --- MAIN COMPONENT ---
const Hotspots = () => {
  /** @type {[Hotspot[], React.Dispatch<React.SetStateAction<Hotspot[]>>]} */
  const [hotspots, setHotspots] = useState(MOCK_HOTSPOTS);
  const [searchQuery, setSearchQuery] = useState('');
  /** @type {[Severity | 'all', React.Dispatch<React.SetStateAction<Severity | 'all'>>]} */
  const [severityFilter, setSeverityFilter] = useState('all');
  /** @type {['energy' | 'severity', React.Dispatch<React.SetStateAction<'energy' | 'severity'>>]} */
  const [sortBy, setSortBy] = useState('energy');
  const { toast } = useToast();

  /** @param {string} id */
  const handleFix = (id) => {
    toast({
      title: '[OPTIMIZATION SUCCESS]',
      description: 'Hotspot optimization has been applied successfully!',
    });
    // Remove the hotspot from the list
    setHotspots(hotspots.filter(h => h.id !== id));
  };

  // Filter and sort hotspots
  const filteredHotspots = hotspots
    .filter(hotspot => {
      const matchesSearch = 
        hotspot.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotspot.rule.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSeverity = severityFilter === 'all' || hotspot.severity === severityFilter;
      return matchesSearch && matchesSeverity;
    })
    .sort((a, b) => {
      if (sortBy === 'energy') {
        return b.energyCost - a.energyCost;
      } else {
        const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      }
    });

  const totalEnergy = filteredHotspots.reduce((sum, h) => sum + h.energyCost, 0);
  const criticalCount = filteredHotspots.filter(h => h.severity === 'critical').length;
  const highCount = filteredHotspots.filter(h => h.severity === 'high').length;

  return (
    <div className="min-h-screen font-mono bg-[#0a0a23] text-white">
      <div className="container mx-auto p-6 md:p-10 space-y-6">
        
        {/* Header */}
        <div className="mb-8 border-b-2 border-pink-500 pb-4">
          <h1 className="text-4xl font-black tracking-wider text-pink-500 drop-shadow-[0_0_10px_rgba(255,46,136,0.5)] flex items-center gap-3">
            <AlertTriangle className="h-10 w-10 text-cyan-400 drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
            [ ENERGY HOTSPOTS ]
          </h1>
          <p className="text-sm mt-1 text-cyan-400">
            Identify and fix energy-inefficient code patterns to optimize resource usage.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="p-4 border-pink-500 hover:shadow-[0_0_25px_rgba(255,46,136,0.5)]">
            <div className="text-3xl font-black text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
              {filteredHotspots.length}
            </div>
            <div className="text-sm text-cyan-400">Total Targets</div>
          </Card>

          <Card className="p-4 border-pink-500 hover:shadow-[0_0_25px_rgba(255,46,136,0.5)]">
            <div className="text-3xl font-black text-pink-500 drop-shadow-[0_0_5px_rgba(255,46,136,0.8)]">
              {criticalCount}
            </div>
            <div className="text-sm text-cyan-400">CRITICAL Threat</div>
          </Card>

          <Card className="p-4 border-orange-500 hover:shadow-[0_0_25px_rgba(255,165,0,0.5)]">
            <div className="text-3xl font-black text-orange-500 drop-shadow-[0_0_5px_rgba(255,165,0,0.8)]">
              {highCount}
            </div>
            <div className="text-sm text-cyan-400">HIGH Priority</div>
          </Card>

          <Card className="p-4 flex flex-col justify-between border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.5)]">
            <div className="text-sm text-pink-500 flex items-center gap-2 uppercase">
                <Zap className="h-4 w-4" /> Energy Cost
            </div>
            <div className="text-3xl font-black text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)] mt-1">
              {totalEnergy.toFixed(1)} mJ
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-pink-500" />
              <Input
                placeholder="Search by file name or rule..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Severity Filter */}
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2 text-pink-500 absolute left-2 top-1/2 transform -translate-y-1/2" />
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SortDesc className="h-4 w-4 mr-2 text-pink-500 absolute left-2 top-1/2 transform -translate-y-1/2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="energy">Energy Cost</SelectItem>
                <SelectItem value="severity">Severity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Hotspots List */}
        <div className="space-y-4">
          {filteredHotspots.length === 0 ? (
            <Card className="p-12 text-center border-2 border-green-400 shadow-[0_0_20px_rgba(57,255,20,0.5)]">
              <div className="text-6xl mb-4 text-green-400">✅</div>
              <h3 className="text-xl font-black mb-2 text-white">[ ALL CLEAR ]</h3>
              <p className="text-sm text-cyan-400">
                {searchQuery || severityFilter !== 'all' 
                  ? 'System Log: No targets match current filter parameters.' 
                  : 'System Log: Target area is clean. Code is energy efficient!'}
              </p>
            </Card>
          ) : (
            filteredHotspots.map((hotspot) => (
              <HotspotCard 
                key={hotspot.id} 
                hotspot={hotspot} 
                onFix={handleFix}
              />
            ))
          )}
        </div>

        {/* Bulk Actions */}
        {filteredHotspots.length > 0 && (
          <Card className="p-4 border-pink-500 shadow-[0_0_20px_rgba(255,46,136,0.3)]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm font-black text-cyan-400 uppercase">
                Showing {filteredHotspots.length} active target{filteredHotspots.length !== 1 ? 's' : ''}
              </div>
              <Button variant="outline" className="text-sm">
                Initiate Bulk Optimization Sequence
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Hotspots;
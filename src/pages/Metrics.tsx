import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, BarChart3, Activity, Zap, LucideIcon } from 'lucide-react';

// --- MOCK COMPONENTS & DATA (Themed for Cyber-Arcade) ---

// Interface for Card Props
interface CardProps {
    title?: string;
    icon?: LucideIcon; 
    className?: string;
    children: React.ReactNode;
}

// Card component with Cyber-Arcade styling
const Card = ({ title, icon: Icon, className, children }: CardProps) => (
  <div 
    className={`bg-gradient-to-br from-[#1a0a2e] to-[#0a0a23] p-6 rounded-xl border-2 border-cyan-400 
                shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] ${className || ''}`}
  >
    {title && (
      <div className="flex items-center gap-3 mb-4 border-b border-pink-500/50 pb-2">
        {Icon && <Icon className="h-5 w-5 text-pink-500 drop-shadow-[0_0_5px_rgba(255,46,136,1)]" />}
        <h2 className="text-xl font-black tracking-widest text-white uppercase">{title}</h2>
      </div>
    )}
    <div className="text-white">
        {children}
    </div>
  </div>
);

// Mock Data
const mockRuleDistribution = [
    { rule: 'Deep Nested Loops', count: 120, energyImpact: 850 },
    { rule: 'Unoptimized Recursion', count: 45, energyImpact: 1200 },
    { rule: 'Inefficient Data Structure', count: 70, energyImpact: 400 },
    { rule: 'Excessive I/O Calls', count: 90, energyImpact: 600 },
];

const mockTrendData = [
    { name: 'Wk 1', efficiency: 65, energy: 3500 },
    { name: 'Wk 2', efficiency: 70, energy: 3200 },
    { name: 'Wk 3', efficiency: 75, energy: 2800 },
    { name: 'Wk 4', efficiency: 72, energy: 3000 },
    { name: 'Wk 5', efficiency: 80, energy: 2500 },
    { name: 'Wk 6', efficiency: 85, energy: 2000 },
];

const mockFileAnalysis = [
    { severity: 'critical' },
    { severity: 'critical' },
    { severity: 'high' },
    { severity: 'high' },
    { severity: 'high' },
    { severity: 'medium' },
    { severity: 'medium' },
    { severity: 'low' },
    { severity: 'low' },
    { severity: 'low' },
];

// Cyber-Arcade Theme Colors
const COLORS = {
    critical: '#FF2E88', // Pink Neon
    high: '#FF9900',     // Orange Neon
    medium: '#FACC15',   // Yellow Neon
    low: '#00F0FF',      // Cyan Neon
    line: '#39FF14',     // Green Neon
    barFill: '#00BFFF',  // Deep Cyan
};

// Interface for Recharts Payload Item for safer access
interface TooltipPayloadItem {
  value: number;
  name: string;
  color: string;
  unit?: string; // unit is an optional prop we added in Line component
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

// Custom Tooltip Component for better theme integration and error prevention
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-[#1a0a2e] border-2 border-cyan-400/70 rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.4)] text-white font-mono text-sm">
          <p className="font-bold text-pink-500 mb-1">{label}</p>
          {payload.map((item, index) => (
            // Using optional chaining and nullish coalescing for unit access for safety
            <p key={index} style={{ color: item.color }} className="mt-1">
              {item.name}: <span className="font-semibold">{item.value.toLocaleString()} {item.unit || ''}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
};

// --- START OF COMPONENT ---

const Metrics = () => {
  // Prepare data for charts
  const ruleData = mockRuleDistribution.map(rule => ({
    name: rule.rule,
    count: rule.count,
    energy: rule.energyImpact,
  }));

  const severityData = [
    { name: 'Critical', value: mockFileAnalysis.filter(f => f.severity === 'critical').length, color: COLORS.critical, unit: 'Hotspots' },
    { name: 'High', value: mockFileAnalysis.filter(f => f.severity === 'high').length, color: COLORS.high, unit: 'Hotspots' },
    { name: 'Medium', value: mockFileAnalysis.filter(f => f.severity === 'medium').length, color: COLORS.medium, unit: 'Hotspots' },
    { name: 'Low', value: mockFileAnalysis.filter(f => f.severity === 'low').length, color: COLORS.low, unit: 'Hotspots' },
  ];
  
  // Calculate Summary Stats
  const totalEnergy = ruleData.reduce((sum, r) => sum + r.energy, 0);
  const totalCount = ruleData.reduce((sum, r) => sum + r.count, 0);
  const avgEnergyPerIssue = totalCount > 0 ? (totalEnergy / totalCount) : 0;
  const mostCommonIssue = ruleData.sort((a, b) => b.count - a.count)[0];
  const highestEnergyImpact = ruleData.sort((a, b) => b.energy - a.energy)[0];


  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#0a0a23] text-white space-y-8">
      
      {/* Header & Title */}
      <div className="mb-8 border-b border-pink-500 pb-4">
        <h1 className="text-4xl font-black tracking-wider text-cyan-400 drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
          ARCADE METRICS DISPLAY
        </h1>
        <p className="text-sm font-mono mt-1 text-pink-500">
          REAL-TIME PERFORMANCE AND EFFICIENCY DATA
        </p>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="COMMON THREAT" icon={BarChart3}>
          <div className="text-xl font-black mt-1 text-pink-500 drop-shadow-[0_0_5px_rgba(255,46,136,0.5)]">
            {mostCommonIssue?.name || 'N/A'}
          </div>
          <div className="text-sm font-mono text-cyan-400 mt-1">
            {mostCommonIssue?.count} Instances Detected
          </div>
        </Card>

        <Card title="ENERGY EXPENDITURE" icon={Zap}>
          <div className="text-xl font-black mt-1 text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]">
            {highestEnergyImpact?.name || 'N/A'}
          </div>
          <div className="text-sm font-mono text-cyan-400 mt-1">
            {highestEnergyImpact?.energy.toLocaleString()} mJ Impact
          </div>
        </Card>

        <Card title="TOTAL RULE VIOLATIONS" icon={Activity}>
          <div className="text-4xl font-black mt-1 text-cyan-400 drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">
            {ruleData.length}
          </div>
          <div className="text-sm font-mono text-pink-500 mt-1">
            TYPES IDENTIFIED
          </div>
        </Card>

        <Card title="AVG ENERGY COST" icon={TrendingUp}>
          <div className="text-4xl font-black mt-1 text-green-400 drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]">
            {avgEnergyPerIssue.toFixed(2)}
          </div>
          <div className="text-sm font-mono text-cyan-400 mt-1">
            mJ PER ISSUE
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Severity Distribution Pie Chart */}
        <Card title="SEVERITY DISTRIBUTION" icon={PieChartIcon} className="lg:col-span-1 min-h-[400px]">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={severityData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                fill="#8884d8"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                ))}
              </Pie>
              {/* Tooltip with contentStyle for transparency */}
              <Tooltip 
                content={<CustomTooltip />} 
                contentStyle={{ backgroundColor: 'transparent', border: 'none' }}
                wrapperStyle={{ backgroundColor: 'transparent', border: 'none' }}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center" 
                wrapperStyle={{ color: COLORS.low, fontSize: '12px', fontWeight: 'bold' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Efficiency Trend Line Chart */}
        <Card title="EFFICIENCY TREND" icon={TrendingUp} className="lg:col-span-2 min-h-[400px]">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={mockTrendData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              {/* CartesianGrid only needs horizontal lines */}
              <CartesianGrid strokeDasharray="3 3" stroke="#1f4e55" horizontal={true} vertical={false} />
              <XAxis dataKey="name" stroke={COLORS.low} tick={{ fill: COLORS.low, fontSize: 12, fontWeight: 'bold' }} />
              <YAxis yAxisId="left" stroke={COLORS.line} tick={{ fill: COLORS.line, fontSize: 12, fontWeight: 'bold' }} label={{ value: 'Efficiency (%)', angle: -90, position: 'insideLeft', fill: COLORS.line }} />
              <YAxis yAxisId="right" orientation="right" stroke={COLORS.critical} tick={{ fill: COLORS.critical, fontSize: 12, fontWeight: 'bold' }} label={{ value: 'Energy (mJ)', angle: 90, position: 'insideRight', fill: COLORS.critical }} />
              
              {/* FIX: Set cursor fill to transparent to eliminate the gray highlight box on hover */}
              <Tooltip 
                content={<CustomTooltip />} 
                contentStyle={{ backgroundColor: 'transparent', border: 'none' }}
                wrapperStyle={{ backgroundColor: 'transparent', border: 'none' }}
                cursor={{ fill: 'rgba(0, 0, 0, 0)' }}
              />

              <Legend wrapperStyle={{ color: COLORS.low, fontSize: '12px', fontWeight: 'bold' }} />
              <Line yAxisId="left" type="monotone" dataKey="efficiency" stroke={COLORS.line} strokeWidth={3} dot={{ stroke: COLORS.line, strokeWidth: 2, r: 4 }} activeDot={{ r: 8 }} name="Efficiency (%)" unit="%" />
              <Line yAxisId="right" type="monotone" dataKey="energy" stroke={COLORS.critical} strokeWidth={3} dot={{ stroke: COLORS.critical, strokeWidth: 2, r: 4 }} activeDot={{ r: 8 }} name="Energy (mJ)" unit=" mJ" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
      
      {/* Rule Distribution Bar Chart (Bottom Section) */}
      <Card title="IMPACT RANKING: RULES" icon={BarChart3}>
        <div className="text-sm font-mono text-pink-500 mb-4">
          COUNT vs. ENERGY IMPACT OF VIOLATED RULES
        </div>
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={ruleData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              {/* CartesianGrid only needs horizontal lines */}
              <CartesianGrid strokeDasharray="3 3" stroke="#1f4e55" horizontal={true} vertical={false} />
              <XAxis dataKey="name" stroke={COLORS.low} tick={{ fill: COLORS.low, fontSize: 12, fontWeight: 'bold' }} />
              <YAxis yAxisId="count" stroke={COLORS.low} tick={{ fill: COLORS.low, fontSize: 12, fontWeight: 'bold' }} label={{ value: 'Issue Count', angle: -90, position: 'insideLeft', fill: COLORS.low }} />
              <YAxis yAxisId="energy" orientation="right" stroke={COLORS.critical} tick={{ fill: COLORS.critical, fontSize: 12, fontWeight: 'bold' }} label={{ value: 'Energy (mJ)', angle: 90, position: 'insideRight', fill: COLORS.critical }} />
              
              {/* FIX: Set cursor fill to transparent to eliminate the gray highlight box on hover */}
              <Tooltip 
                content={<CustomTooltip />} 
                contentStyle={{ backgroundColor: 'transparent', border: 'none' }}
                wrapperStyle={{ backgroundColor: 'transparent', border: 'none' }}
                cursor={{ fill: 'rgba(0, 0, 0, 0)' }}
              />

              <Legend wrapperStyle={{ color: COLORS.low, fontSize: '12px', fontWeight: 'bold' }} />
              <Bar yAxisId="count" dataKey="count" fill={COLORS.low} name="Count" unit="" className="shadow-[0_0_10px_rgba(0,240,255,0.8)]" radius={[8, 8, 0, 0]} />
              <Bar yAxisId="energy" dataKey="energy" fill={COLORS.critical} name="Energy (mJ)" unit=" mJ" className="shadow-[0_0_10px_rgba(255,46,136,0.8)]" radius={[8, 8, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Metrics;
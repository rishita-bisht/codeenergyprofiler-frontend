import { useState } from 'react';
// Mock/In-line definitions for required UI components and types
// In a real app, these would be imported from components/ui/
const Card = ({ className, children, onClick, isDark }) => (
  <div 
    onClick={onClick}
    className={`bg-gradient-to-br p-4 rounded-xl transition-colors duration-500 w-full ${isDark ? 'from-[#1a0a2e] to-[#0a0a23] text-white border-2 border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.4)]' : 'from-white to-gray-50 text-gray-900 border-2 border-blue-500 hover:shadow-xl'} ${className || ''}`}
  >
    {children}
  </div>
);

const Input = ({ className, placeholder, value, onChange, isDark, type = 'text' }) => (
  <div className="relative w-full">
    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? 'text-pink-500' : 'text-blue-600'}`} />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`flex h-10 w-full rounded-md border-2 bg-transparent py-2 pl-10 pr-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDark ? 'border-pink-500 text-green-400 placeholder:text-gray-600 focus:ring-cyan-400 focus:ring-offset-[#0a0a23]' : 'border-blue-500 text-gray-800 placeholder:text-gray-400 focus:ring-teal-400 focus:ring-offset-white'} ${className || ''}`}
    />
  </div>
);

const SeverityBadge = ({ severity, isDark }) => {
  let color;
  switch (severity) {
    case 'critical': color = isDark ? 'bg-pink-500 text-white' : 'bg-red-600 text-white'; break;
    case 'high': color = isDark ? 'bg-orange-500 text-black' : 'bg-orange-700 text-white'; break;
    case 'medium': color = isDark ? 'bg-yellow-400 text-black' : 'bg-yellow-600 text-black'; break;
    default: color = isDark ? 'bg-cyan-400 text-black' : 'bg-teal-600 text-white';
  }
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase ${color}`}>
      {severity}
    </span>
  );
};

const Progress = ({ value, className, isDark }) => {
  let barColor;
  if (value >= 90) barColor = isDark ? 'bg-green-400 shadow-[0_0_10px_rgba(57,255,20,1)]' : 'bg-green-600';
  else if (value >= 75) barColor = isDark ? 'bg-cyan-400 shadow-[0_0_10px_rgba(0,240,255,1)]' : 'bg-blue-500';
  else if (value >= 60) barColor = isDark ? 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,1)]' : 'bg-yellow-500';
  else barColor = isDark ? 'bg-pink-500 shadow-[0_0_10px_rgba(255,46,136,1)]' : 'bg-red-500';

  const trackColor = isDark ? 'bg-[#1a0a2e] border border-cyan-400/50' : 'bg-gray-200 border border-gray-400';

  return (
    <div className={`w-full rounded-full overflow-hidden ${trackColor} ${className || 'h-2'}`}>
      <div
        style={{ width: `${value}%` }}
        className={`h-full transition-all duration-700 ${barColor}`}
      />
    </div>
  );
};

// Mock Data and Types (since external files are not available)
type Severity = 'critical' | 'high' | 'medium' | 'low';
interface FileAnalysis {
  id: string;
  fileName: string;
  filePath: string;
  efficiencyScore: number;
  energyUsed: number;
  hotspotsCount: number;
  severity: Severity;
  lastScanned: string;
}

const mockFileAnalysis: FileAnalysis[] = [
  { id: 'f1', fileName: 'data_processor.py', filePath: 'src/analytics/data_processor.py', efficiencyScore: 95, energyUsed: 12.4, hotspotsCount: 0, severity: 'low', lastScanned: '2025-11-20' },
  { id: 'f2', fileName: 'auth_service.js', filePath: 'src/services/auth_service.js', efficiencyScore: 78, energyUsed: 45.1, hotspotsCount: 3, severity: 'medium', lastScanned: '2025-11-20' },
  { id: 'f3', fileName: 'nested_loop_util.cpp', filePath: 'lib/core/nested_loop_util.cpp', efficiencyScore: 55, energyUsed: 189.7, hotspotsCount: 7, severity: 'high', lastScanned: '2025-11-19' },
  { id: 'f4', fileName: 'api_handler.java', filePath: 'server/api/api_handler.java', efficiencyScore: 32, energyUsed: 312.0, hotspotsCount: 12, severity: 'critical', lastScanned: '2025-11-19' },
  { id: 'f5', fileName: 'config.json', filePath: 'config/config.json', efficiencyScore: 100, energyUsed: 0.0, hotspotsCount: 0, severity: 'low', lastScanned: '2025-11-20' },
];

// Mock for webviewHost
const webviewHost = {
  openFile: (fileName: string, lineNumber: number) => {
    console.log(`[ACTION] Opening file: ${fileName} at line ${lineNumber}`);
  }
};

// --- START OF COMPONENT ---

import { 
  FileCode, 
  Search,
  Zap,
  Target,
  ChevronRight,
  Filter
} from 'lucide-react';

const FileAnalysisPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [files] = useState<FileAnalysis[]>(mockFileAnalysis);
  const [isDark] = useState(true); // Enforce dark theme for this file

  const filteredFiles = files.filter(file =>
    file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getScoreColor = (score: number) => {
    if (score >= 90) return isDark ? 'text-green-400 drop-shadow-[0_0_10px_rgba(57,255,20,1)]' : 'text-green-600';
    if (score >= 75) return isDark ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(0,240,255,1)]' : 'text-blue-500';
    if (score >= 60) return isDark ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,1)]' : 'text-yellow-700';
    if (score >= 40) return isDark ? 'text-orange-500 drop-shadow-[0_0_10px_rgba(255,165,0,1)]' : 'text-orange-700';
    return isDark ? 'text-pink-500 drop-shadow-[0_0_10px_rgba(255,46,136,1)]' : 'text-red-600';
  };

  const handleOpenFile = (fileName: string) => {
    webviewHost.openFile(fileName, 1);
  };

  return (
    <div className={`p-6 md:p-10 min-h-screen ${isDark ? 'bg-[#0a0a23] text-white' : 'bg-gray-100 text-gray-900'}`}>
      
      {/* Header & Title */}
      <div className="mb-8 border-b border-pink-500 pb-4">
        <h1 className={`text-4xl font-black tracking-wider ${isDark ? 'text-pink-500' : 'text-blue-600'} drop-shadow-[0_0_10px_rgba(255,46,136,0.5)]`}>
          FILE SCANNER REPORT
        </h1>
        <p className={`text-sm font-mono mt-1 ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>
          DEEP LEVEL ENERGY CONSUMPTION ANALYSIS
        </p>
      </div>

      {/* Filter and Search */}
      <div className="mb-6">
        <Card isDark={isDark} className="p-4 border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
          <div className="flex items-center gap-4">
            <Input
              placeholder="SEARCH FILE PATH/NAME..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              isDark={isDark}
              className="flex-1 font-mono"
            />
            <div className={`flex items-center gap-2 text-sm font-mono ${isDark ? 'text-pink-500' : 'text-red-500'}`}>
              <Filter className="h-4 w-4" />
              <span>TOTAL FILES: {files.length}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* File List */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFiles.map((file) => (
            <Card 
              key={file.id} 
              isDark={isDark}
              onClick={() => handleOpenFile(file.filePath)} 
              className={`cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                file.severity === 'critical' ? 'border-pink-500 shadow-[0_0_20px_rgba(255,46,136,0.5)]' :
                file.severity === 'high' ? 'border-orange-500 shadow-[0_0_20px_rgba(255,165,0,0.5)]' :
                file.severity === 'medium' ? 'border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)]' :
                'border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]'
              }`}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1 pr-4">
                    {/* File Name & Path */}
                    <div className={`font-mono text-xs ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>{file.filePath}</div>
                    <div className="text-lg font-black tracking-wide flex items-center gap-2">
                      <FileCode className={`h-5 w-5 ${getScoreColor(file.efficiencyScore)}`} />
                      <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{file.fileName}</span>
                    </div>
                  </div>
                  
                  <SeverityBadge severity={file.severity} isDark={isDark} />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-700/50">
                  {/* Efficiency Score */}
                  <div className="flex items-center gap-2">
                    <Zap className={`h-4 w-4 ${getScoreColor(file.efficiencyScore)}`} />
                    <div>
                      <div className={`text-sm ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>Efficiency Score</div>
                      <div className={`font-black text-xl ${getScoreColor(file.efficiencyScore)}`}>
                        {file.efficiencyScore}%
                      </div>
                    </div>
                  </div>

                  {/* Energy Used */}
                  <div className="flex items-center gap-2">
                    <Zap className={`h-4 w-4 ${isDark ? 'text-pink-500' : 'text-red-500'}`} />
                    <div>
                      <div className={`text-sm ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>Energy Used</div>
                      <div className={`font-semibold text-lg ${isDark ? 'text-pink-500' : 'text-red-600'}`}>
                        {file.energyUsed.toFixed(1)} mJ
                      </div>
                    </div>
                  </div>

                  {/* Hotspots */}
                  <div className="flex items-center gap-2">
                    <Target className={`h-4 w-4 ${isDark ? 'text-orange-500' : 'text-orange-700'}`} />
                    <div>
                      <div className={`text-sm ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>Hotspots</div>
                      <div className={`font-semibold text-lg ${isDark ? 'text-orange-500' : 'text-orange-700'}`}>
                        {file.hotspotsCount} issue{file.hotspotsCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>

                  {/* Last Scanned */}
                  <div className="flex items-center gap-2">
                    <Filter className={`h-4 w-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                    <div>
                      <div className={`text-sm ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>Last Scan</div>
                      <div className={`font-semibold text-lg ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
                        {file.lastScanned}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar Comparison */}
                <div className="pt-4 border-t border-gray-700/50 mt-4">
                  <div className={`text-xs font-mono mb-2 ${isDark ? 'text-pink-500' : 'text-red-500'}`}>
                    EFFICIENCY RATING [ {file.efficiencyScore}% ]
                  </div>
                  <Progress value={file.efficiencyScore} isDark={isDark} className="h-3 shadow-lg" />
                </div>

                {/* Open File Button Look */}
                <div className={`text-right mt-3 text-sm font-mono font-bold flex justify-end items-center gap-1 ${isDark ? 'text-cyan-400 hover:text-pink-500' : 'text-blue-600 hover:text-teal-500'}`}>
                    OPEN FILE FOR COMBAT <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <Card isDark={isDark} className={`p-12 text-center border-2 border-pink-500 shadow-[0_0_20px_rgba(255,46,136,0.5)]`}>
            <div className={`text-6xl mb-4 ${isDark ? 'text-pink-500' : 'text-red-500'}`}>📂</div>
            <h3 className={`text-xl font-black mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>[ NO TARGETS DETECTED ]</h3>
            <p className={`font-mono ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>
              TRY ADJUSTING YOUR SEARCH QUERY
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FileAnalysisPage;
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Play, Zap, Trophy, Code, Flame, Award, Users, Crosshair, Activity, Cpu, Shield, Swords, Sun, Moon, Sparkles } from 'lucide-react';

const LANGUAGES = [
  { id: 63, name: 'JavaScript', ext: 'js' },
  { id: 71, name: 'Python', ext: 'py' },
  { id: 62, name: 'Java', ext: 'java' },
  { id: 54, name: 'C++', ext: 'cpp' },
  { id: 51, name: 'C#', 'ext': 'cs' }
];

const SAMPLE_CODE = {
  js: `// Inefficient nested loop example
function findDuplicates(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}

console.log(findDuplicates([1, 2, 3, 2, 4, 3]));`,
  py: `# Memory inefficient list comprehension
def process_data(data):
    # Creates multiple intermediate lists
    result = [x * 2 for x in data]
    result = [x + 10 for x in result]
    result = [x ** 2 for x in result]
    return result

print(process_data(range(1000)))`
};

const MOCK_LEADERBOARD = [
  { rank: 1, username: 'CodeNinja', score: 2847, energy: 456.2, avatar: '🥷', grade: 'S' },
  { rank: 2, username: 'GreenCoder', score: 2734, energy: 523.8, avatar: '🌿', grade: 'S' },
  { rank: 3, username: 'OptimizeKing', score: 2621, energy: 612.4, avatar: '👑', grade: 'A' },
  { rank: 4, username: 'EcoWarrior', score: 2518, energy: 687.1, avatar: '⚡', grade: 'A' },
  { rank: 5, username: 'You', score: 2450, energy: 734.5, avatar: '🎯', isCurrentUser: true, grade: 'A' }
];

const ENERGY_BOSSES = [
  { name: 'Nested Loop', hp: 75, maxHp: 100, threat: 'HIGH', defeated: false },
  { name: 'Memory Leak', hp: 0, maxHp: 120, threat: 'CRITICAL', defeated: true },
  { name: 'O(n²) Monster', hp: 45, maxHp: 80, threat: 'MEDIUM', defeated: false }
];

const CodeProfilerDashboard = () => {
  // Use 'system' as the default, applying 'dark' theme initially based on the original request's aesthetic.
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(SAMPLE_CODE.js);
  const [output, setOutput] = useState('');
  const [energyData, setEnergyData] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('arena');
  const [combo, setCombo] = useState(0);
  const [scanlineOffset, setScanlineOffset] = useState(0);
  
  const [userStats] = useState({
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    streak: 7,
    rank: 'OPTIMIZER',
    grade: 'A', 
    energySaved: 1234.5,
    filesOptimized: 24
  });

  // Theme configuration constants
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-[#0a0a23]' : 'bg-gray-100';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const primaryColor = isDark ? 'pink-500' : 'blue-600';
  const accentColor = isDark ? 'cyan-400' : 'teal-500';
  const cardBg = isDark ? 'from-[#1a0a2e] to-[#0a0a23]' : 'from-white to-gray-50';
  const cardBorder = isDark ? 'border-cyan-400' : 'border-gray-300';
  const cardShadow = isDark ? 'shadow-[0_0_30px_rgba(0,240,255,0.5)]' : 'shadow-xl';

  useEffect(() => {
    // Apply theme class to body for Tailwind context
    document.body.className = theme === 'dark' ? 'dark' : 'light';

    const interval = setInterval(() => {
      setScanlineOffset(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('>>> INITIALIZING COMBAT SEQUENCE...\n>>> ANALYZING TARGET...\n');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockOutput = selectedLang.name === 'JavaScript' 
      ? '>>> EXECUTION COMPLETE\n>>> OUTPUT: [ 2, 3 ]\n>>> TIME: 0.024s\n>>> STATUS: ENEMY DETECTED'
      : '>>> EXECUTION COMPLETE\n>>> OUTPUT: [20, 400, 1000, 1600, 2420, ...]\n>>> TIME: 0.031s\n>>> STATUS: BOSS INCOMING';
    
    setOutput(mockOutput);
    
    const lines = code.split('\n').length;
    const mockEnergy = Array.from({ length: lines }, (_, i) => ({
      line: i + 1,
      energy: Math.random() * 100 + 10,
      severity: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
    }));
    
    const newCombo = Math.floor(Math.random() * 5);
    setCombo(newCombo);
    
    setEnergyData({
      total: mockEnergy.reduce((sum, l) => sum + l.energy, 0),
      lines: mockEnergy,
      score: Math.floor(Math.random() * 30 + 60),
      grade: ['S', 'A', 'B', 'C'][Math.floor(Math.random() * 4)],
      suggestions: [
        '🎯 BOSS WEAK POINT: Line 3-7 (Nested Loops)',
        '⚡ POWER-UP AVAILABLE: Use Set for O(1) lookup',
        '🛡️ DEFENSE: Line 9 shows good optimization'
      ]
    });
    
    setIsRunning(false);
  };

  const getSeverityColor = (severity) => {
    if (!isDark) return 'bg-gray-100 border-gray-400 shadow-gray-400/50'; // Neutral color for light mode for simplicity
    
    switch(severity) {
      case 'high': return 'bg-pink-500/20 border-pink-500 shadow-pink-500/50';
      case 'medium': return 'bg-yellow-400/20 border-yellow-400 shadow-yellow-400/50';
      default: return 'bg-green-400/20 border-green-400 shadow-green-400/50';
    }
  };

  const getGradeColor = (grade) => {
    switch(grade) {
      case 'S': return isDark ? 'text-pink-500' : 'text-red-600';
      case 'A': return isDark ? 'text-cyan-400' : 'text-blue-500';
      case 'B': return isDark ? 'text-green-400' : 'text-green-600';
      default: return isDark ? 'text-yellow-400' : 'text-yellow-700';
    }
  };
  
  return (
    <div className={`min-h-screen ${bgColor} ${textColor} overflow-hidden relative transition-colors duration-500`}>
      
      {/* CRT scanlines (Dark Mode Only) */}
      {isDark && (
        <div className="fixed inset-0 pointer-events-none z-50 opacity-10">
          <div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent h-1"
            style={{ transform: `translateY(${scanlineOffset}vh)` }}
          />
        </div>
      )}

      {/* Cyber grid background (Dark Mode Only) */}
      {isDark && (
        <div className="fixed inset-0 pointer-events-none opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff2e88_1px,transparent_1px),linear-gradient(to_bottom,#ff2e88_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
      )}

      {/* Header - Top Bar */}
      <div className={`relative border-b-4 border-${primaryColor} ${isDark ? 'bg-gradient-to-r from-[#0a0a23] via-[#1a0a2e] to-[#0a0a23] shadow-[0_0_15px_rgba(255,46,136,0.3)]' : 'bg-white shadow-lg'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo: CODE ENERGY PROFILER (Clean Header Style) */}
            <div className="flex items-center gap-4">
              <span className={`font-black text-3xl tracking-wider relative z-10 ${
                isDark 
                  ? 'bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500' 
                  : 'text-gray-900'
              }`}>
                CODE ENERGY PROFILER
              </span>
              <div className={`font-mono text-xs animate-pulse ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>
                [ ANALYTICS ]
              </div>
            </div>
            
            {/* Theme Toggle Button (The only remaining element on the right) */}
            <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-500 ${isDark ? 'bg-purple-600 text-yellow-300 shadow-md hover:bg-purple-700' : 'bg-blue-600 text-yellow-300 shadow-md hover:bg-blue-700'}`}
                aria-label="Toggle Theme"
            >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`p-2 ${isDark ? 'bg-[#1a0a2e] border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.3)]' : 'bg-gray-200 border border-gray-400 shadow-md'}`}>
            <TabsTrigger 
              value="arena" 
              className={`font-bold ${
                isDark 
                  ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white'
                  : 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-500 data-[state=active]:text-white'
              }`}
            >
              <Crosshair className="h-4 w-4 mr-2" />
              CODE ARENA
            </TabsTrigger>
            <TabsTrigger 
              value="bosses" 
              className={`font-bold ${
                isDark 
                  ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white'
                  : 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-500 data-[state=active]:text-white'
              }`}
            >
              <Flame className="h-4 w-4 mr-2" />
              ENERGY BOSSES
            </TabsTrigger>
            <TabsTrigger 
              value="leaderboard" 
              className={`font-bold ${
                isDark 
                  ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white'
                  : 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-500 data-[state=active]:text-white'
              }`}
            >
              <Trophy className="h-4 w-4 mr-2" />
              LEADERBOARD
            </TabsTrigger>
            <TabsTrigger 
              value="achievements" 
              className={`font-bold ${
                isDark 
                  ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-600 data-[state=active]:text-white'
                  : 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-500 data-[state=active]:text-white'
              }`}
            >
              <Award className="h-4 w-4 mr-2" />
              ACHIEVEMENTS
            </TabsTrigger>
          </TabsList>

          {/* CODE ARENA */}
          <TabsContent value="arena" className="space-y-6">
            {/* Stats HUD (Using userStats defined above) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className={`bg-gradient-to-br ${cardBg} border-2 border-green-400 ${isDark ? 'shadow-[0_0_20px_rgba(57,255,20,0.3)]' : 'shadow-md'}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Zap className="h-8 w-8 text-green-400 animate-pulse" />
                    <div>
                      <div className={`text-3xl font-black text-green-400 ${isDark ? 'drop-shadow-[0_0_10px_rgba(57,255,20,1)]' : ''}`}>
                        {userStats.energySaved.toFixed(0)}
                      </div>
                      <div className={`text-xs font-mono ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>mJ SAVED</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`bg-gradient-to-br ${cardBg} border-2 border-cyan-400 ${isDark ? 'shadow-[0_0_20px_rgba(0,240,255,0.3)]' : 'shadow-md'}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Code className="h-8 w-8 text-cyan-400 animate-pulse" /> 
                    <div>
                      <div className={`text-3xl font-black text-cyan-400 ${isDark ? 'drop-shadow-[0_0_10px_rgba(0,240,255,1)]' : ''}`}>
                        {userStats.filesOptimized}
                      </div>
                      <div className={`text-xs font-mono ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>FILES OPTIMIZED</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`bg-gradient-to-br ${cardBg} border-2 border-yellow-400 ${isDark ? 'shadow-[0_0_20px_rgba(250,204,21,0.3)]' : 'shadow-md'}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Flame className="h-8 w-8 text-yellow-400 animate-pulse" />
                    <div>
                      <div className={`text-3xl font-black text-yellow-400 ${isDark ? 'drop-shadow-[0_0_10px_rgba(250,204,21,1)]' : ''}`}>
                        {userStats.streak}
                      </div>
                      <div className={`text-xs font-mono ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>DAY STREAK</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`bg-gradient-to-br ${cardBg} border-2 border-${primaryColor} ${isDark ? 'shadow-[0_0_20px_rgba(255,46,136,0.3)]' : 'shadow-md'}`}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Trophy className={`h-8 w-8 text-${primaryColor} animate-bounce`} />
                    <div>
                      <div className={`text-3xl font-black text-${primaryColor} ${isDark ? 'drop-shadow-[0_0_10px_rgba(255,46,136,1)]' : ''}`}>
                        #{MOCK_LEADERBOARD.find(u => u.isCurrentUser)?.rank}
                      </div>
                      <div className={`text-xs font-mono ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>GLOBAL RANK</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Arena */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Code Editor */}
              <Card className={`bg-gradient-to-br ${cardBg} border-4 border-${accentColor} ${cardShadow}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-xl font-black ${isDark ? 'text-cyan-400' : 'text-blue-600'} tracking-wide`}>
                      &lt; CODE EDITOR /&gt;
                    </CardTitle>
                    <Select 
                      value={selectedLang.id.toString()} 
                      onValueChange={(val) => {
                        const lang = LANGUAGES.find(l => l.id.toString() === val);
                        setSelectedLang(lang);
                        setCode(SAMPLE_CODE[lang.ext] || '');
                      }}
                    >
                      <SelectTrigger className={`w-40 font-mono ${isDark ? 'bg-[#0a0a23] border-2 border-pink-500 text-pink-500' : 'bg-white border-2 border-blue-500 text-blue-600'}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={`border-2 ${isDark ? 'bg-[#1a0a2e] border-pink-500' : 'bg-white border-blue-500'}`}>
                        {LANGUAGES.map(lang => (
                          <SelectItem key={lang.id} value={lang.id.toString()} className="font-mono">
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={`font-mono text-sm min-h-[350px] ${isDark ? 'bg-[#0a0a23] border-2 border-pink-500/50 text-green-400 focus:border-pink-500 focus:shadow-[0_0_20px_rgba(255,46,136,0.5)]' : 'bg-white border-2 border-blue-500/50 text-gray-800 focus:border-blue-500 focus:shadow-md'}`}
                    placeholder="INSERT CODE TO BATTLE..."
                  />
                  <Button 
                    onClick={runCode}
                    disabled={isRunning}
                    className={`w-full text-white font-black text-lg py-6 border-4 ${isDark ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-cyan-400 shadow-[0_0_30px_rgba(255,46,136,0.7)]' : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 border-teal-400 shadow-xl' } transform hover:scale-105 transition-all`}
                  >
                    {isRunning ? (
                      <>⚡ ANALYZING TARGET...</>
                    ) : (
                      <>
                        <Play className="h-6 w-6 mr-2" />
                        [ PRESS START ]
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Scanner & Analysis */}
              <div className="space-y-4">
                {/* Console Output */}
                <Card className={`bg-gradient-to-br ${cardBg} border-4 border-green-400 ${isDark ? 'shadow-[0_0_30px_rgba(57,255,20,0.5)]' : 'shadow-md'}`}>
                  <CardHeader>
                    <CardTitle className={`text-xl font-black text-green-400 tracking-wide flex items-center gap-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                      <Activity className="h-5 w-5 animate-pulse" />
                      COMBAT LOG
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`font-mono text-sm p-4 rounded-lg min-h-[140px] border-2 ${isDark ? 'bg-[#0a0a23] text-green-400 border-green-400/50' : 'bg-gray-100 text-gray-700 border-green-600/50'}`}>
                      {output || '>>> AWAITING COMMAND...\n>>> INSERT CODE TO BEGIN BATTLE'}
                    </div>
                  </CardContent>
                </Card>

                {/* Energy Scanner */}
                {energyData && (
                  <Card className={`bg-gradient-to-br ${cardBg} border-4 border-yellow-400 ${isDark ? 'shadow-[0_0_30px_rgba(250,204,21,0.5)]' : 'shadow-md'}`}>
                    <CardHeader>
                      <CardTitle className={`text-xl font-black tracking-wide flex items-center gap-2 ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
                        <Cpu className="h-5 w-5 animate-pulse" />
                        ENERGY SCANNER
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className={`flex items-center justify-between p-4 rounded-lg border-2 ${isDark ? 'bg-[#0a0a23] border-yellow-400' : 'bg-white border-yellow-500'}`}>
                        <span className={`text-sm font-mono ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>EFFICIENCY GRADE</span>
                        <span className={`text-6xl font-black ${getGradeColor(energyData.grade)} drop-shadow-[0_0_20px_currentColor]`}>
                          {energyData.grade}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-mono">
                          <span className={`font-mono ${isDark ? 'text-cyan-400' : 'text-gray-700'}`}>ENERGY DETECTED</span>
                          <span className={`font-bold ${isDark ? 'text-pink-500' : 'text-red-600'}`}>{energyData.total.toFixed(1)} mJ</span>
                        </div>
                        <div className={`h-4 rounded-full overflow-hidden ${isDark ? 'bg-[#0a0a23] border-2 border-pink-500' : 'bg-gray-200 border border-pink-500'}`}>
                          <div 
                            className={`h-full ${isDark ? 'bg-gradient-to-r from-green-400 via-yellow-400 to-pink-500' : 'bg-gradient-to-r from-red-500 to-orange-500'}`}
                            style={{ width: `${energyData.score}%` }}
                          />
                        </div>
                      </div>

                      {combo > 0 && (
                        <div className={`text-center p-3 rounded-lg animate-bounce ${isDark ? 'bg-gradient-to-r from-yellow-400 to-pink-500 text-black' : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'}`}>
                          <div className="text-2xl font-black">
                            {combo}x COMBO!
                          </div>
                        </div>
                      )}

                      <div className={`space-y-2 p-3 rounded-lg border-2 ${isDark ? 'bg-[#0a0a23] border-cyan-400/50' : 'bg-gray-100 border-teal-500/50'}`}>
                        <div className={`text-sm font-bold font-mono ${isDark ? 'text-cyan-400' : 'text-teal-600'}`}>
                          [ POWER-UPS DETECTED ]
                        </div>
                        {energyData.suggestions.map((sug, i) => (
                          <div key={i} className={`text-xs font-mono flex items-start gap-2 p-2 rounded border ${isDark ? 'text-white bg-pink-500/10 border-pink-500/30' : 'text-gray-800 bg-blue-100 border-blue-500/30'}`}>
                            <span>{sug}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Energy Heatmap */}
            {energyData && (
              <Card className={`bg-gradient-to-br ${cardBg} border-4 border-${primaryColor} ${cardShadow}`}>
                <CardHeader>
                  <CardTitle className={`text-xl font-black tracking-wide ${isDark ? 'text-pink-500' : 'text-blue-600'}`}>
                    THREAT DETECTION RADAR
                  </CardTitle>
                  <CardDescription className={`font-mono ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>
                    Line-by-line energy consumption analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-2">
                      {energyData.lines.map((line) => (
                        <div 
                          key={line.line}
                          className={`flex items-center gap-3 p-3 rounded-lg border-2 ${getSeverityColor(line.severity)}`}
                        >
                          <span className={`text-xs font-mono font-bold w-16 ${isDark ? 'text-cyan-400' : 'text-gray-600'}`}>
                            LINE {line.line}
                          </span>
                          <div className={`flex-1 h-6 rounded overflow-hidden ${isDark ? 'bg-[#0a0a23] border border-pink-500' : 'bg-gray-200 border border-pink-500'}`}>
                            <div 
                              className={`h-full ${isDark ? 'bg-gradient-to-r from-green-400 via-yellow-400 to-pink-500' : 'bg-gradient-to-r from-red-500 to-orange-500'}`}
                              style={{ width: `${(line.energy / 100) * 100}%` }}
                            />
                          </div>
                          <span className={`text-xs font-bold w-20 text-right ${isDark ? 'text-yellow-400' : 'text-yellow-700'}`}>
                            {line.energy.toFixed(1)} mJ
                          </span>
                          <Badge variant="outline" className={`text-xs font-bold border-2 border-current ${isDark ? 'text-white' : 'text-gray-700'}`}>
                            {line.severity.toUpperCase()}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ENERGY BOSSES */}
          <TabsContent value="bosses">
            <Card className={`bg-gradient-to-br ${cardBg} border-4 border-${primaryColor} ${cardShadow}`}>
              <CardHeader>
                <CardTitle className={`text-2xl font-black tracking-wide flex items-center gap-2 ${isDark ? 'text-pink-500' : 'text-blue-600'}`}>
                  <Flame className="h-8 w-8 animate-pulse" />
                  BOSS ARENA
                </CardTitle>
                <CardDescription className={`font-mono ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>
                  Defeat inefficiency bosses to level up
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ENERGY_BOSSES.map((boss, i) => (
                    <div 
                      key={i}
                      className={`p-6 rounded-lg border-4 transition-all ${
                        boss.defeated 
                          ? 'bg-green-400/10 border-green-400 opacity-50' 
                          : `${isDark ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-pink-500 shadow-[0_0_20px_rgba(255,46,136,0.5)]' : 'bg-gradient-to-r from-blue-100 to-white border-blue-500 shadow-lg'}`
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl">
                            {boss.defeated ? '💀' : '👾'}
                          </div>
                          <div>
                            <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {boss.name}
                            </div>
                            <Badge className={`mt-1 font-bold ${
                              boss.threat === 'CRITICAL' ? (isDark ? 'bg-pink-500' : 'bg-red-600 text-white') :
                              boss.threat === 'HIGH' ? (isDark ? 'bg-yellow-400 text-black' : 'bg-orange-500 text-white') :
                              (isDark ? 'bg-cyan-400 text-black' : 'bg-teal-500 text-white')
                            }`}>
                              {boss.threat} THREAT
                            </Badge>
                          </div>
                        </div>
                        {boss.defeated && (
                          <Badge className="mt-3 bg-green-400 text-black font-black text-lg px-4 py-2">
                            DEFEATED
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className={`flex justify-between text-sm font-mono ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>
                          <span>HP</span>
                          <span className="font-bold">{boss.hp} / {boss.maxHp}</span>
                        </div>
                        <div className={`h-6 rounded-full overflow-hidden ${isDark ? 'bg-[#0a0a23] border-2 border-pink-500' : 'bg-gray-200 border border-red-500'}`}>
                          <div 
                            className={`h-full transition-all ${
                              boss.defeated ? 'bg-gray-500' : (isDark ? 'bg-gradient-to-r from-pink-500 to-purple-600 animate-pulse' : 'bg-gradient-to-r from-red-600 to-orange-600')
                            }`}
                            style={{ width: `${(boss.hp / boss.maxHp) * 100}%` }}
                          />
                        </div>
                      </div>

                      {!boss.defeated && (
                        <Button className={`w-full mt-4 font-black border-2 ${isDark ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-cyan-400' : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 border-teal-400'}`}>
                          <Swords className="h-4 w-4 mr-2" />
                          ENGAGE BOSS
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LEADERBOARD */}
          <TabsContent value="leaderboard">
            <Card className={`bg-gradient-to-br ${cardBg} border-4 border-${accentColor} ${cardShadow}`}>
              <CardHeader>
                <CardTitle className={`text-2xl font-black tracking-wide flex items-center gap-2 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                  <Trophy className="h-8 w-8 animate-bounce" />
                  GLOBAL LEADERBOARD
                </CardTitle>
                <CardDescription className={`font-mono ${isDark ? 'text-pink-500' : 'text-red-500'}`}>
                  Top energy-efficient coders worldwide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {MOCK_LEADERBOARD.map((user) => (
                    <div 
                      key={user.rank}
                      className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all transform hover:scale-105 ${
                        user.isCurrentUser 
                          ? `${isDark ? 'bg-gradient-to-r from-pink-500/30 to-purple-600/30 border-pink-500 shadow-[0_0_30px_rgba(255,46,136,0.7)]' : 'bg-gradient-to-r from-blue-100 to-white border-blue-500 shadow-lg'}`
                          : `${isDark ? 'bg-[#0a0a23] border-cyan-400/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]' : 'bg-white border-gray-300 hover:border-blue-300 hover:shadow-md'}`
                      }`}
                    >
                      <div className={`text-3xl font-black w-12 text-center ${
                        user.rank === 1 ? (isDark ? 'text-yellow-400' : 'text-yellow-600') :
                        user.rank === 2 ? (isDark ? 'text-gray-300' : 'text-gray-500') :
                        user.rank === 3 ? (isDark ? 'text-orange-400' : 'text-amber-700') :
                        (isDark ? 'text-cyan-400' : 'text-teal-600')
                      }`}>
                        #{user.rank}
                      </div>
                      <div className="text-4xl">{user.avatar}</div>
                      <div className="flex-1">
                        <div className={`font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {user.username}
                          {user.isCurrentUser && (
                            <Badge className={`font-black ${isDark ? 'bg-pink-500 text-white' : 'bg-blue-600 text-white'}`}>YOU</Badge>
                          )}
                        </div>
                        <div className={`text-xs font-mono ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>
                          {user.energy.toFixed(1)} mJ saved
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-4xl font-black ${getGradeColor(user.grade)} drop-shadow-[0_0_10px_currentColor]`}>
                          {user.grade}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-black ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                          {user.score.toLocaleString()}
                        </div>
                        <div className={`text-xs font-mono ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ACHIEVEMENTS */}
          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '🎯', title: 'First Steps', desc: 'Run your first analysis', unlocked: true, xp: 100 },
                { icon: '🔥', title: '7 Day Streak', desc: 'Code efficiently for 7 days', unlocked: true, xp: 500 },
                { icon: '⚡', title: 'Energy Master', desc: 'Score 90+ on 10 files', unlocked: true, xp: 1000 },
                { icon: '💚', title: 'Eco Warrior', desc: 'Save 5000 mJ total', unlocked: false, xp: 2000 },
                { icon: '👑', title: 'Top 100', desc: 'Reach top 100 globally', unlocked: false, xp: 3000 },
                { icon: '🏆', title: 'Perfect Score', desc: 'Get 100 efficiency score', unlocked: false, xp: 5000 }
              ].map((achievement, i) => (
                <Card 
                  key={i}
                  className={`bg-gradient-to-br ${cardBg} transition-all transform hover:scale-105 ${
                    achievement.unlocked 
                      ? `border-4 border-green-400 ${isDark ? 'shadow-[0_0_30px_rgba(57,255,20,0.5)]' : 'shadow-lg'}`
                      : 'border-2 border-gray-600 opacity-40 grayscale'
                  }`}
                >
                  <CardContent className="pt-6 text-center space-y-3">
                    <div className="text-5xl mb-3">{achievement.icon}</div>
                    <div className={`font-black text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{achievement.title}</div>
                    <div className={`text-xs font-mono ${isDark ? 'text-cyan-400' : 'text-teal-500'}`}>{achievement.desc}</div>
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className={`h-4 w-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                      <span className={`font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>+{achievement.xp} XP</span>
                    </div>
                    {achievement.unlocked ? (
                      <Badge className="mt-3 bg-green-400 text-black font-black">UNLOCKED</Badge>
                    ) : (
                      <Badge className="mt-3 bg-gray-600 text-gray-300 font-bold">LOCKED</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Arcade Footer */}
      <div className={`fixed bottom-0 left-0 right-0 border-t-4 border-${accentColor} ${isDark ? 'bg-gradient-to-r from-[#0a0a23] via-[#1a0a2e] to-[#0a0a23] shadow-[0_0_30px_rgba(0,240,255,0.5)]' : 'bg-white shadow-xl'}`}>
        <div className={`container mx-auto flex items-center justify-center gap-8 font-mono text-xs ${isDark ? 'text-cyan-400' : 'text-teal-600'}`}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>SYSTEM ONLINE</span>
          </div>
          <div className={`text-${isDark ? 'cyan-400' : 'gray-700'}`}>©2025 CODE ENERGY PROFILER ANALYTICS</div>
          <div className="flex items-center gap-2">
            <span>INSERT COIN TO CONTINUE</span>
            <div className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-pink-500' : 'bg-red-500'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeProfilerDashboard;
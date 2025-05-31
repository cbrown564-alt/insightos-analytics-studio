
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Search, Filter, Star, Users, Calendar, BarChart3, Database, Brain, FileText, Settings2, Bell } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const projects = [
    {
      id: 1,
      name: "Q4 Customer Satisfaction Survey",
      collaborators: ["JD", "SM", "MK"],
      lastModified: "2 hours ago",
      status: "Active",
      dataPoints: "2,450 responses"
    },
    {
      id: 2,
      name: "Brand Perception Study 2024",
      collaborators: ["AK", "RD"],
      lastModified: "1 day ago",
      status: "Analysis",
      dataPoints: "1,890 responses"
    },
    {
      id: 3,
      name: "Product Launch Research",
      collaborators: ["JD", "TC", "SM", "LP"],
      lastModified: "3 days ago",
      status: "Complete",
      dataPoints: "3,200 responses"
    }
  ];

  if (activeView === "workspace") {
    return <WorkspaceView onBack={() => setActiveView("dashboard")} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">InsightOS</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Jordan</h1>
          <p className="text-gray-600">Continue your market research projects or start something new.</p>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center justify-between mb-6">
          <Tabs defaultValue="all" className="w-auto">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="my">My Projects</TabsTrigger>
              <TabsTrigger value="shared">Shared With Me</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search projects..." className="pl-10 w-64" />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setActiveView("workspace")}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={project.status === "Active" ? "default" : project.status === "Complete" ? "secondary" : "outline"}>
                    {project.status}
                  </Badge>
                  <span className="text-sm text-gray-500">{project.dataPoints}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <div className="flex -space-x-1">
                      {project.collaborators.map((collaborator, index) => (
                        <Avatar key={index} className="w-6 h-6 border-2 border-white">
                          <AvatarFallback className="text-xs">{collaborator}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.lastModified}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
            <Database className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Import Data</h3>
            <p className="text-sm text-gray-600">Upload CSV, Excel, or SPSS files</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
            <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Quick Analysis</h3>
            <p className="text-sm text-gray-600">Start with pre-built templates</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
            <Brain className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">AI Insights</h3>
            <p className="text-sm text-gray-600">Get automated recommendations</p>
          </Card>
        </div>
      </main>

      {/* Floating Action Button */}
      <Button 
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        size="lg"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

const WorkspaceView = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState("data");

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              ← Back to Dashboard
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-lg font-semibold">Q4 Customer Satisfaction Survey</h1>
            <Badge variant="outline">Auto-saved 2 min ago</Badge>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">Share</Button>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-4">
            <div className="space-y-1">
              <SidebarItem icon={Database} label="Data View" active={activeTab === "data"} onClick={() => setActiveTab("data")} />
              <SidebarItem icon={BarChart3} label="Analyses" active={activeTab === "analyses"} onClick={() => setActiveTab("analyses")} />
              <SidebarItem icon={Brain} label="AI Insights" active={activeTab === "insights"} onClick={() => setActiveTab("insights")} />
              <SidebarItem icon={FileText} label="Reports" active={activeTab === "reports"} onClick={() => setActiveTab("reports")} />
              <SidebarItem icon={Settings2} label="Variables" active={activeTab === "variables"} onClick={() => setActiveTab("variables")} />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {activeTab === "data" && <DataView />}
          {activeTab === "analyses" && <AnalysisBuilder />}
          {activeTab === "insights" && <AIInsights />}
          {activeTab === "reports" && <ReportBuilder />}
          {activeTab === "variables" && <VariableManager />}
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
      active ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"
    }`}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </button>
);

const DataView = () => (
  <div className="p-6">
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Data Grid</h2>
          <div className="flex items-center space-x-3">
            <Input placeholder="Search variables..." className="w-64" />
            <Button variant="outline" size="sm">Add Variable</Button>
            <Button variant="outline" size="sm">Import Data</Button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">#</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfaction</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likelihood_Recommend</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
            </tr>
            <tr className="border-b border-gray-200 bg-gray-25">
              <td className="px-4 py-2 text-xs text-gray-500">Type</td>
              <td className="px-4 py-2 text-xs text-gray-500">Scale</td>
              <td className="px-4 py-2 text-xs text-gray-500">Nominal</td>
              <td className="px-4 py-2 text-xs text-gray-500">Ordinal</td>
              <td className="px-4 py-2 text-xs text-gray-500">Scale</td>
              <td className="px-4 py-2 text-xs text-gray-500">Nominal</td>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.from({ length: 20 }, (_, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-500">{i + 1}</td>
                <td className="px-4 py-3 text-sm">{25 + Math.floor(Math.random() * 40)}</td>
                <td className="px-4 py-3 text-sm">{Math.random() > 0.5 ? "Male" : "Female"}</td>
                <td className="px-4 py-3 text-sm">{Math.floor(Math.random() * 5) + 1}</td>
                <td className="px-4 py-3 text-sm">{(Math.random() * 10).toFixed(1)}</td>
                <td className="px-4 py-3 text-sm">{["North", "South", "East", "West"][Math.floor(Math.random() * 4)]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const AnalysisBuilder = () => (
  <div className="p-6">
    <div className="grid grid-cols-12 gap-6 h-full">
      {/* Variables Panel */}
      <div className="col-span-3 bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold mb-4">Variables</h3>
        <Input placeholder="Search variables..." className="mb-4" />
        <div className="space-y-2">
          <div className="p-3 border border-gray-200 rounded-lg cursor-grab hover:bg-gray-50">
            <div className="font-medium text-sm">Age</div>
            <div className="text-xs text-gray-500">Scale • 2,450 valid</div>
          </div>
          <div className="p-3 border border-gray-200 rounded-lg cursor-grab hover:bg-gray-50">
            <div className="font-medium text-sm">Gender</div>
            <div className="text-xs text-gray-500">Nominal • 2,450 valid</div>
          </div>
          <div className="p-3 border border-gray-200 rounded-lg cursor-grab hover:bg-gray-50">
            <div className="font-medium text-sm">Satisfaction</div>
            <div className="text-xs text-gray-500">Ordinal • 2,430 valid</div>
          </div>
          <div className="p-3 border border-gray-200 rounded-lg cursor-grab hover:bg-gray-50">
            <div className="font-medium text-sm">Likelihood_Recommend</div>
            <div className="text-xs text-gray-500">Scale • 2,445 valid</div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="col-span-6 bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="font-semibold mb-6">Analysis Canvas</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="text-gray-500 mb-2">Drop variables for Rows</div>
            <div className="text-sm text-gray-400">Drag categorical variables here</div>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="text-gray-500 mb-2">Drop variables for Columns</div>
            <div className="text-sm text-gray-400">Drag categorical variables here</div>
          </div>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
          <div className="text-gray-500 mb-2">Dependent Variable</div>
          <div className="text-sm text-gray-400">Drag your outcome variable here</div>
        </div>
        <Button className="w-full" size="lg">Run Analysis</Button>
      </div>

      {/* Options Panel */}
      <div className="col-span-3 bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="font-semibold mb-4">Analysis Options</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Test Type</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>Auto-detect</option>
              <option>Chi-square</option>
              <option>T-test</option>
              <option>ANOVA</option>
              <option>Regression</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Confidence Level</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>95%</option>
              <option>90%</option>
              <option>99%</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Add to Report</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm">Show AI Interpretation</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AIInsights = () => (
  <div className="p-6">
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold mb-6">AI Insights</h2>
      
      <div className="space-y-6">
        <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Suggested Analysis</h3>
          <p className="text-blue-800 text-sm mb-3">Based on your data, I recommend testing the relationship between Age and Satisfaction scores.</p>
          <Button variant="outline" size="sm">Run Suggested Analysis</Button>
        </div>

        <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
          <h3 className="font-medium text-amber-900 mb-2">Data Quality Alert</h3>
          <p className="text-amber-800 text-sm mb-3">20 missing values detected in Satisfaction variable. Consider imputation or removal.</p>
          <Button variant="outline" size="sm">Review Missing Data</Button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Ask AI</label>
          <Input placeholder="What patterns should I look for in this data?" className="mb-3" />
          <Button>Ask Question</Button>
        </div>
      </div>
    </div>
  </div>
);

const ReportBuilder = () => (
  <div className="p-6">
    <div className="bg-white rounded-lg border border-gray-200 h-full">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold">Report Builder</h2>
      </div>
      <div className="p-6 text-center text-gray-500">
        <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <h3 className="font-medium mb-2">No reports yet</h3>
        <p className="text-sm mb-4">Create your first report to visualize your analysis results</p>
        <Button>Create Report</Button>
      </div>
    </div>
  </div>
);

const VariableManager = () => (
  <div className="p-6">
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Variable Manager</h2>
          <Button variant="outline" size="sm">Add Variable</Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Values</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Missing</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-4 text-sm font-medium">Age</td>
              <td className="px-4 py-4 text-sm">Respondent Age</td>
              <td className="px-4 py-4 text-sm"><Badge variant="outline">Scale</Badge></td>
              <td className="px-4 py-4 text-sm">18-75</td>
              <td className="px-4 py-4 text-sm">0</td>
              <td className="px-4 py-4 text-sm">
                <Button variant="ghost" size="sm">Edit</Button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-4 text-sm font-medium">Gender</td>
              <td className="px-4 py-4 text-sm">Gender Identity</td>
              <td className="px-4 py-4 text-sm"><Badge variant="outline">Nominal</Badge></td>
              <td className="px-4 py-4 text-sm">Male, Female</td>
              <td className="px-4 py-4 text-sm">0</td>
              <td className="px-4 py-4 text-sm">
                <Button variant="ghost" size="sm">Edit</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Index;

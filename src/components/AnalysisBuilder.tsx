
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Database, Users, Calculator, Play } from 'lucide-react';

interface Variable {
  name: string;
  label: string;
  type: 'nominal' | 'ordinal' | 'scale' | 'string';
  valueLabels?: { [key: string]: string };
  validCount: number;
}

interface AnalysisConfig {
  type: 'crosstab' | 'ttest' | 'anova';
  rows: Variable[];
  columns: Variable[];
  layers: Variable[];
  dependent: Variable | null;
  groups: Variable | null;
  weight: Variable | null;
  filter: string;
  confidenceLevel: number;
}

const mockVariables: Variable[] = [
  { name: 'Age', label: 'Respondent Age', type: 'scale', validCount: 2450 },
  { name: 'Gender', label: 'Gender Identity', type: 'nominal', valueLabels: { "1": "Male", "2": "Female", "3": "Other" }, validCount: 2450 },
  { name: 'Satisfaction', label: 'Overall Satisfaction Rating', type: 'ordinal', valueLabels: { "1": "Very Dissatisfied", "2": "Dissatisfied", "3": "Neutral", "4": "Satisfied", "5": "Very Satisfied" }, validCount: 2430 },
  { name: 'Likelihood_Recommend', label: 'Likelihood to Recommend (0-10)', type: 'scale', validCount: 2445 },
  { name: 'Region', label: 'Geographic Region', type: 'nominal', valueLabels: { "1": "North", "2": "South", "3": "East", "4": "West" }, validCount: 2450 },
  { name: 'Income', label: 'Household Income', type: 'ordinal', validCount: 2380 },
  { name: 'Weight_Final', label: 'Final Weight', type: 'scale', validCount: 2450 }
];

const VariableItem: React.FC<{ variable: Variable }> = ({ variable }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'variable',
    item: variable,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const getTypeIcon = () => {
    switch (variable.type) {
      case 'nominal':
      case 'ordinal':
        return <Users className="w-4 h-4 text-blue-500" />;
      case 'scale':
        return <Calculator className="w-4 h-4 text-green-500" />;
      case 'string':
        return <Database className="w-4 h-4 text-gray-500" />;
      default:
        return <Database className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div
      ref={drag}
      className={`p-3 border border-gray-200 rounded-lg cursor-grab hover:bg-gray-50 transition-colors ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="flex items-center space-x-2 mb-1">
        {getTypeIcon()}
        <div className="font-medium text-sm">{variable.name}</div>
      </div>
      <div className="text-xs text-gray-600 mb-1">{variable.label}</div>
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-xs">
          {variable.type}
        </Badge>
        <span className="text-xs text-gray-500">{variable.validCount.toLocaleString()} valid</span>
      </div>
    </div>
  );
};

interface DropZoneProps {
  title: string;
  description: string;
  acceptedTypes: string[];
  variables: Variable[];
  onDrop: (variable: Variable) => void;
  onRemove: (index: number) => void;
  maxItems?: number;
}

const DropZone: React.FC<DropZoneProps> = ({ 
  title, 
  description, 
  acceptedTypes, 
  variables, 
  onDrop, 
  onRemove,
  maxItems = 5
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'variable',
    drop: (item: Variable) => {
      if (acceptedTypes.includes(item.type) && variables.length < maxItems) {
        onDrop(item);
      }
    },
    canDrop: (item: Variable) => acceptedTypes.includes(item.type) && variables.length < maxItems,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const borderColor = isOver && canDrop ? 'border-blue-400 bg-blue-50' : 
                     isOver && !canDrop ? 'border-red-400 bg-red-50' : 
                     'border-gray-300';

  return (
    <div
      ref={drop}
      className={`border-2 border-dashed rounded-lg p-4 min-h-[120px] transition-colors ${borderColor}`}
    >
      <div className="text-sm font-medium text-gray-700 mb-1">{title}</div>
      <div className="text-xs text-gray-500 mb-3">{description}</div>
      
      {variables.length === 0 ? (
        <div className="text-center py-4">
          <div className="text-xs text-gray-400">
            Drag {acceptedTypes.join(' or ')} variables here
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {variables.map((variable, index) => (
            <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
              <div className="flex items-center space-x-2">
                <Users className="w-3 h-3 text-blue-500" />
                <span className="text-sm font-medium">{variable.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onRemove(index)}
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AnalysisPreview: React.FC<{ config: AnalysisConfig }> = ({ config }) => {
  if (config.type === 'crosstab' && config.rows.length > 0 && config.columns.length > 0) {
    const rowVar = config.rows[0];
    const colVar = config.columns[0];
    
    return (
      <Card className="mt-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Expected Output Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left border-r">{rowVar.label}</th>
                  {colVar.valueLabels && Object.values(colVar.valueLabels).map((label, i) => (
                    <th key={i} className="p-2 text-center border-r">{label}</th>
                  ))}
                  <th className="p-2 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {rowVar.valueLabels && Object.values(rowVar.valueLabels).map((label, i) => (
                  <tr key={i} className="border-t">
                    <td className="p-2 font-medium border-r">{label}</td>
                    {colVar.valueLabels && Object.keys(colVar.valueLabels).map((_, j) => (
                      <td key={j} className="p-2 text-center border-r text-gray-400">--</td>
                    ))}
                    <td className="p-2 text-center text-gray-400">--</td>
                  </tr>
                ))}
                <tr className="border-t bg-gray-50">
                  <td className="p-2 font-medium border-r">Total</td>
                  {colVar.valueLabels && Object.keys(colVar.valueLabels).map((_, j) => (
                    <td key={j} className="p-2 text-center border-r text-gray-400">--</td>
                  ))}
                  <td className="p-2 text-center text-gray-400">--</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (config.type === 'ttest' && config.dependent && config.groups) {
    return (
      <Card className="mt-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Expected Output Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 mb-3">
            T-Test: {config.dependent.label} by {config.groups.label}
          </div>
          <div className="border rounded p-4 bg-gray-50">
            <div className="text-xs text-gray-500 mb-2">Group Statistics</div>
            <div className="space-y-1 text-xs">
              <div>Group 1: Mean = --, SD = --, N = --</div>
              <div>Group 2: Mean = --, SD = --, N = --</div>
            </div>
            <div className="text-xs text-gray-500 mt-3 mb-1">Independent Samples Test</div>
            <div className="text-xs">t = --, df = --, p = --</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

const EnhancedAnalysisBuilder: React.FC = () => {
  const [analysisConfig, setAnalysisConfig] = useState<AnalysisConfig>({
    type: 'crosstab',
    rows: [],
    columns: [],
    layers: [],
    dependent: null,
    groups: null,
    weight: null,
    filter: '',
    confidenceLevel: 95
  });

  const [searchTerm, setSearchTerm] = useState('');

  const filteredVariables = mockVariables.filter(variable =>
    variable.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    variable.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDropToRows = (variable: Variable) => {
    setAnalysisConfig(prev => ({
      ...prev,
      rows: [...prev.rows, variable]
    }));
  };

  const handleDropToColumns = (variable: Variable) => {
    setAnalysisConfig(prev => ({
      ...prev,
      columns: [...prev.columns, variable]
    }));
  };

  const handleDropToDependent = (variable: Variable) => {
    setAnalysisConfig(prev => ({
      ...prev,
      dependent: variable
    }));
  };

  const handleDropToGroups = (variable: Variable) => {
    setAnalysisConfig(prev => ({
      ...prev,
      groups: variable
    }));
  };

  const removeFromRows = (index: number) => {
    setAnalysisConfig(prev => ({
      ...prev,
      rows: prev.rows.filter((_, i) => i !== index)
    }));
  };

  const removeFromColumns = (index: number) => {
    setAnalysisConfig(prev => ({
      ...prev,
      columns: prev.columns.filter((_, i) => i !== index)
    }));
  };

  const removeDependent = () => {
    setAnalysisConfig(prev => ({ ...prev, dependent: null }));
  };

  const removeGroups = () => {
    setAnalysisConfig(prev => ({ ...prev, groups: null }));
  };

  const canRunAnalysis = () => {
    if (analysisConfig.type === 'crosstab') {
      return analysisConfig.rows.length > 0 && analysisConfig.columns.length > 0;
    }
    if (analysisConfig.type === 'ttest') {
      return analysisConfig.dependent && analysisConfig.groups;
    }
    return false;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 h-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Analysis Builder</h2>
            <p className="text-sm text-gray-600">Drag variables to create your analysis</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={analysisConfig.type}
              onChange={(e) => setAnalysisConfig(prev => ({ 
                ...prev, 
                type: e.target.value as 'crosstab' | 'ttest' | 'anova',
                rows: [],
                columns: [],
                dependent: null,
                groups: null
              }))}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="crosstab">Crosstab</option>
              <option value="ttest">T-Test</option>
              <option value="anova">ANOVA</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Variables Panel */}
          <div className="col-span-3">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Variables</CardTitle>
                <Input
                  placeholder="Search variables..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mt-2"
                />
              </CardHeader>
              <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                {filteredVariables.map((variable, index) => (
                  <VariableItem key={index} variable={variable} />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Canvas */}
          <div className="col-span-6">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Analysis Canvas</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisConfig.type === 'crosstab' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <DropZone
                        title="Rows"
                        description="Drag categorical variables here"
                        acceptedTypes={['nominal', 'ordinal']}
                        variables={analysisConfig.rows}
                        onDrop={handleDropToRows}
                        onRemove={removeFromRows}
                        maxItems={3}
                      />
                      <DropZone
                        title="Columns"
                        description="Drag categorical variables here"
                        acceptedTypes={['nominal', 'ordinal']}
                        variables={analysisConfig.columns}
                        onDrop={handleDropToColumns}
                        onRemove={removeFromColumns}
                        maxItems={3}
                      />
                    </div>
                  </>
                )}

                {analysisConfig.type === 'ttest' && (
                  <>
                    <DropZone
                      title="Dependent Variable"
                      description="Drag a scale variable here"
                      acceptedTypes={['scale']}
                      variables={analysisConfig.dependent ? [analysisConfig.dependent] : []}
                      onDrop={handleDropToDependent}
                      onRemove={removeDependent}
                      maxItems={1}
                    />
                    <DropZone
                      title="Grouping Variable"
                      description="Drag a categorical variable here"
                      acceptedTypes={['nominal', 'ordinal']}
                      variables={analysisConfig.groups ? [analysisConfig.groups] : []}
                      onDrop={handleDropToGroups}
                      onRemove={removeGroups}
                      maxItems={1}
                    />
                  </>
                )}

                <AnalysisPreview config={analysisConfig} />

                <div className="pt-4">
                  <Button 
                    className="w-full" 
                    size="lg" 
                    disabled={!canRunAnalysis()}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Run Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Options Panel */}
          <div className="col-span-3">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Analysis Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Weight Variable</label>
                  <select className="w-full p-2 border border-gray-300 rounded text-sm">
                    <option value="">No weighting</option>
                    {mockVariables.filter(v => v.type === 'scale').map(variable => (
                      <option key={variable.name} value={variable.name}>
                        {variable.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Confidence Level</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    value={analysisConfig.confidenceLevel}
                    onChange={(e) => setAnalysisConfig(prev => ({ 
                      ...prev, 
                      confidenceLevel: Number(e.target.value) 
                    }))}
                  >
                    <option value={90}>90%</option>
                    <option value={95}>95%</option>
                    <option value={99}>99%</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Add to Report</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">Show Significance Tests</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">Show AI Interpretation</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Filter Data</label>
                  <Input
                    placeholder="e.g., Region = 'North'"
                    value={analysisConfig.filter}
                    onChange={(e) => setAnalysisConfig(prev => ({ 
                      ...prev, 
                      filter: e.target.value 
                    }))}
                    className="text-sm"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default EnhancedAnalysisBuilder;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ChevronDown, MoreVertical, Plus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import VariableMetadataPanel from './VariableMetadataPanel';

interface Variable {
  name: string;
  label: string;
  type: 'nominal' | 'ordinal' | 'scale' | 'string';
  valueLabels?: { [key: string]: string };
  missingValues?: string[];
}

interface DataGridProps {
  variables: Variable[];
  data: any[][];
  onVariableUpdate: (index: number, variable: Variable) => void;
}

const getTypeIcon = (type: Variable['type']) => {
  switch (type) {
    case 'nominal':
    case 'ordinal':
      return '🔘';
    case 'scale':
      return '🔢';
    case 'string':
      return '📝';
    default:
      return '❓';
  }
};

const getTypeBadge = (type: Variable['type']) => {
  const colors = {
    nominal: 'bg-blue-100 text-blue-800',
    ordinal: 'bg-purple-100 text-purple-800',
    scale: 'bg-green-100 text-green-800',
    string: 'bg-gray-100 text-gray-800'
  };
  
  return (
    <Badge variant="secondary" className={`text-xs ${colors[type]} capitalize`}>
      {type}
    </Badge>
  );
};

const EnhancedDataGrid: React.FC<DataGridProps> = ({ variables, data, onVariableUpdate }) => {
  const [selectedVariable, setSelectedVariable] = useState<{ variable: Variable; index: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<any[]>([]);

  const handleVariableClick = (variable: Variable, index: number) => {
    setSelectedVariable({ variable, index });
  };

  const handleVariableUpdate = (updatedVariable: Variable) => {
    if (selectedVariable) {
      onVariableUpdate(selectedVariable.index, updatedVariable);
    }
  };

  const totalCases = data.length;
  const missingCases = data.filter(row => row.some(cell => cell === null || cell === undefined || cell === '')).length;

  return (
    <div className="h-full flex flex-col">
      {/* Data Toolbar */}
      <div className="border-b border-gray-200 p-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Data Grid</h2>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search variables..." 
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">Add Variable</Button>
            <Button variant="outline" size="sm">Import Data</Button>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <span>Total Cases: <strong>{totalCases}</strong></span>
          <span>Missing: <strong>{missingCases}</strong></span>
          <span>Variables: <strong>{variables.length}</strong></span>
        </div>
      </div>

      {/* Data Grid */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-gray-50 z-10">
            {/* Variable Names Row */}
            <TableRow>
              <TableHead className="w-12 text-center">#</TableHead>
              {variables.map((variable, index) => (
                <TableHead key={index} className="min-w-32">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getTypeIcon(variable.type)}</span>
                    <div className="flex-1">
                      <button
                        onClick={() => handleVariableClick(variable, index)}
                        className="text-left hover:text-blue-600 transition-colors"
                      >
                        <div className="font-medium">{variable.name}</div>
                      </button>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-3 h-3" />
                    </Button>
                  </div>
                </TableHead>
              ))}
              <TableHead className="w-12">
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </TableHead>
            </TableRow>
            
            {/* Variable Labels and Types Row */}
            <TableRow className="border-b-2">
              <TableHead className="text-xs text-gray-500">Type</TableHead>
              {variables.map((variable, index) => (
                <TableHead key={index} className="px-4 py-2">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500 truncate">{variable.label}</div>
                    {getTypeBadge(variable.type)}
                  </div>
                </TableHead>
              ))}
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="hover:bg-gray-50">
                <TableCell className="text-center text-gray-500 font-mono text-sm">
                  {rowIndex + 1}
                </TableCell>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} className="font-mono text-sm">
                    <input
                      type="text"
                      value={cell || ''}
                      className="w-full bg-transparent border-none outline-none focus:bg-white focus:border focus:border-blue-300 focus:rounded px-1"
                      onChange={(e) => {
                        // Handle cell editing here
                        console.log(`Cell ${rowIndex},${cellIndex} changed to:`, e.target.value);
                      }}
                    />
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Variable Metadata Panel */}
      {selectedVariable && (
        <VariableMetadataPanel
          variable={selectedVariable.variable}
          isOpen={true}
          onClose={() => setSelectedVariable(null)}
          onUpdate={handleVariableUpdate}
        />
      )}
    </div>
  );
};

export default EnhancedDataGrid;

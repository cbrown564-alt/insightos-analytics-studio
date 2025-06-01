
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Edit3, Calculator, AlertTriangle } from 'lucide-react';

interface Variable {
  name: string;
  label: string;
  type: 'nominal' | 'ordinal' | 'scale' | 'string';
  valueLabels?: { [key: string]: string };
  missingValues?: string[];
}

interface VariableMetadataPanelProps {
  variable: Variable;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (variable: Variable) => void;
}

const VariableMetadataPanel: React.FC<VariableMetadataPanelProps> = ({
  variable,
  isOpen,
  onClose,
  onUpdate
}) => {
  const [editedVariable, setEditedVariable] = useState<Variable>(variable);
  const [newValueKey, setNewValueKey] = useState('');
  const [newValueLabel, setNewValueLabel] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdate(editedVariable);
    onClose();
  };

  const addValueLabel = () => {
    if (newValueKey && newValueLabel) {
      setEditedVariable({
        ...editedVariable,
        valueLabels: {
          ...editedVariable.valueLabels,
          [newValueKey]: newValueLabel
        }
      });
      setNewValueKey('');
      setNewValueLabel('');
    }
  };

  const removeValueLabel = (key: string) => {
    const newValueLabels = { ...editedVariable.valueLabels };
    delete newValueLabels[key];
    setEditedVariable({
      ...editedVariable,
      valueLabels: newValueLabels
    });
  };

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white border-l border-gray-200 shadow-lg z-50 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Variable Properties</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Basic Properties */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Basic Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="var-name">Variable Name</Label>
                <Input
                  id="var-name"
                  value={editedVariable.name}
                  onChange={(e) => setEditedVariable({ ...editedVariable, name: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="var-label">Variable Label</Label>
                <Input
                  id="var-label"
                  value={editedVariable.label}
                  onChange={(e) => setEditedVariable({ ...editedVariable, label: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="var-type">Measurement Level</Label>
                <select
                  id="var-type"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={editedVariable.type}
                  onChange={(e) => setEditedVariable({ ...editedVariable, type: e.target.value as Variable['type'] })}
                >
                  <option value="nominal">Nominal</option>
                  <option value="ordinal">Ordinal</option>
                  <option value="scale">Scale</option>
                  <option value="string">String</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Value Labels */}
          {(editedVariable.type === 'nominal' || editedVariable.type === 'ordinal') && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Value Labels</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {editedVariable.valueLabels && Object.entries(editedVariable.valueLabels).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <span className="w-12 text-sm font-mono">{key} =</span>
                    <Input value={label} className="flex-1" readOnly />
                    <Button variant="ghost" size="sm" onClick={() => removeValueLabel(key)}>
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Value"
                    value={newValueKey}
                    onChange={(e) => setNewValueKey(e.target.value)}
                    className="w-20"
                  />
                  <span className="text-sm">=</span>
                  <Input
                    placeholder="Label"
                    value={newValueLabel}
                    onChange={(e) => setNewValueLabel(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={addValueLabel}>Add</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Edit3 className="w-4 h-4 mr-2" />
                Recode Variable
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calculator className="w-4 h-4 mr-2" />
                Compute Variable
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Set Missing Values
              </Button>
            </CardContent>
          </Card>

          {/* Save/Cancel */}
          <div className="flex space-x-2">
            <Button onClick={handleSave} className="flex-1">Save Changes</Button>
            <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariableMetadataPanel;

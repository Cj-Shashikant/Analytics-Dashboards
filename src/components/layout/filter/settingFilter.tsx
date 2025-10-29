import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Settings, Eye, Save, RotateCcw } from 'lucide-react';

interface SettingFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingFilters({
  isOpen,
  onClose,
}: SettingFiltersProps) {
  // Display Settings
  const [chartType, setChartType] = useState('donut');
  const [showPercentages, setShowPercentages] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [animateCharts, setAnimateCharts] = useState(true);
  const [colorScheme, setColorScheme] = useState('professional');
  const [refreshInterval, setRefreshInterval] = useState('manual');

  // Advanced Settings
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [exportFormat, setExportFormat] = useState('xlsx');

  // Reset all settings to default
  const resetSettings = () => {
    setChartType('donut');
    setShowPercentages(true);
    setShowLegend(true);
    setAnimateCharts(true);
    setColorScheme('professional');
    setRefreshInterval('manual');
    setEnableNotifications(true);
    setAutoSave(false);
    setExportFormat('xlsx');
  };

  // Save configuration to localStorage
  const saveConfiguration = () => {
    const configuration = {
      chartType,
      showPercentages,
      showLegend,
      animateCharts,
      colorScheme,
      refreshInterval,
      enableNotifications,
      autoSave,
      exportFormat,
    };
    localStorage.setItem('displaySettings', JSON.stringify(configuration));
    console.log('Display settings saved successfully!');
  };

  // Load configuration on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('displaySettings');
    if (savedConfig) {
      try {
        const configuration = JSON.parse(savedConfig);
        if (configuration.chartType) setChartType(configuration.chartType);
        if (configuration.showPercentages !== undefined)
          setShowPercentages(configuration.showPercentages);
        if (configuration.showLegend !== undefined)
          setShowLegend(configuration.showLegend);
        if (configuration.animateCharts !== undefined)
          setAnimateCharts(configuration.animateCharts);
        if (configuration.colorScheme)
          setColorScheme(configuration.colorScheme);
        if (configuration.refreshInterval)
          setRefreshInterval(configuration.refreshInterval);
        if (configuration.enableNotifications !== undefined)
          setEnableNotifications(configuration.enableNotifications);
        if (configuration.autoSave !== undefined)
          setAutoSave(configuration.autoSave);
        if (configuration.exportFormat)
          setExportFormat(configuration.exportFormat);
      } catch (error) {
        console.error('Error loading saved display settings:', error);
      }
    }
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[700px] sm:w-[800px] overflow-y-auto"
      >
        <SheetHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <SheetTitle className="text-base font-medium font-bold text-black">
                  Display & Settings
                </SheetTitle>
                <SheetDescription className="text-xs text-gray-500 mt-1">
                  Customize chart display, performance settings, and dashboard
                  preferences
                </SheetDescription>
              </div>

              <Button
                variant="outline"
                onClick={saveConfiguration}
                className="text-xs text-gray-600 "
              >
                <Save className="w-4 h-4 text-green-600" />
                Save
              </Button>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 p-4">
          {/* Chart Display Settings */}
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-gray-600" />
              <h3 className="font-medium text-gray-900">
                Chart Display Settings
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Chart Type
                  </Label>
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="donut">Donut Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="line">Line Chart</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Color Scheme
                  </Label>
                  <Select value={colorScheme} onValueChange={setColorScheme}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="vibrant">Vibrant</SelectItem>
                      <SelectItem value="pastel">Pastel</SelectItem>
                      <SelectItem value="monochrome">Monochrome</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Show Percentages
                  </Label>
                  <Switch
                    checked={showPercentages}
                    onCheckedChange={setShowPercentages}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Show Legend</Label>
                  <Switch
                    checked={showLegend}
                    onCheckedChange={setShowLegend}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Animate Charts</Label>
                  <Switch
                    checked={animateCharts}
                    onCheckedChange={setAnimateCharts}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Performance Settings */}
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-gray-600" />
              <h3 className="font-medium text-gray-900">
                Performance & Data Settings
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Data Refresh Interval
                </Label>
                <Select
                  value={refreshInterval}
                  onValueChange={setRefreshInterval}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual Refresh</SelectItem>
                    <SelectItem value="30s">Every 30 seconds</SelectItem>
                    <SelectItem value="1m">Every 1 minute</SelectItem>
                    <SelectItem value="5m">Every 5 minutes</SelectItem>
                    <SelectItem value="15m">Every 15 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Export Format
                </Label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                    <SelectItem value="csv">CSV (.csv)</SelectItem>
                    <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                    <SelectItem value="png">Image (.png)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Enable Notifications
                  </Label>
                  <Switch
                    checked={enableNotifications}
                    onCheckedChange={setEnableNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Auto-save Configuration
                  </Label>
                  <Switch checked={autoSave} onCheckedChange={setAutoSave} />
                </div>
              </div>
            </div>
          </Card>

          {/* Reset and Save Actions */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={resetSettings}
              className="text-sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All Settings
            </Button>
            <Button onClick={saveConfiguration} className="text-sm">
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

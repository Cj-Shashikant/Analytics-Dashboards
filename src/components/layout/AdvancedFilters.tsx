'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { 
  Filter, 
  Calendar, 
  MapPin, 
  Users, 
  Package, 
  Building, 
  TrendingUp,
  Eye,
  Settings,
  Pin,
  PinOff,
  X,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Save,
  Search
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export interface AdvancedFiltersProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onFiltersChange?: (filters: any) => void;
  initialFilters?: any;
}

export function AdvancedFilters({ 
  isOpen, 
  onOpenChange, 
  onFiltersChange,
  initialFilters = {}
}: AdvancedFiltersProps) {
  // Date Range States
  const [dateRange, setDateRange] = useState({
    from: initialFilters.dateRange?.from || '',
    to: initialFilters.dateRange?.to || ''
  });
  const [quickDateRange, setQuickDateRange] = useState(initialFilters.quickDateRange || 'last30days');

  // Regional Filters
  const [selectedRegions, setSelectedRegions] = useState<string[]>(initialFilters.selectedRegions || []);
  const [selectedCities, setSelectedCities] = useState<string[]>(initialFilters.selectedCities || []);
  const [selectedStates, setSelectedStates] = useState<string[]>(initialFilters.selectedStates || []);

  // Team & Performance Filters
  const [selectedTeams, setSelectedTeams] = useState<string[]>(initialFilters.selectedTeams || []);
  const [selectedMembers, setSelectedMembers] = useState<string[]>(initialFilters.selectedMembers || []);
  const [performanceRange, setPerformanceRange] = useState<number[]>(initialFilters.performanceRange || [0, 100]);

  // Product & Business Filters
  const [selectedProducts, setSelectedProducts] = useState<string[]>(initialFilters.selectedProducts || []);
  const [selectedInsurers, setSelectedInsurers] = useState<string[]>(initialFilters.selectedInsurers || []);
  const [businessVerticals, setBusinessVerticals] = useState<string[]>(initialFilters.businessVerticals || []);

  // Display Settings
  const [chartType, setChartType] = useState(initialFilters.chartType || 'donut');
  const [colorScheme, setColorScheme] = useState(initialFilters.colorScheme || 'professional');
  const [showPercentages, setShowPercentages] = useState(initialFilters.showPercentages ?? true);
  const [showLegend, setShowLegend] = useState(initialFilters.showLegend ?? true);
  const [animateCharts, setAnimateCharts] = useState(initialFilters.animateCharts ?? true);

  // Advanced Settings
  const [refreshInterval, setRefreshInterval] = useState(initialFilters.refreshInterval || 'manual');
  const [exportFormat, setExportFormat] = useState(initialFilters.exportFormat || 'xlsx');
  const [enableNotifications, setEnableNotifications] = useState(initialFilters.enableNotifications ?? false);
  const [autoSave, setAutoSave] = useState(initialFilters.autoSave ?? true);

  // UI States
  const [activeTab, setActiveTab] = useState('filters');
  const [pinnedFilters, setPinnedFilters] = useState<string[]>(initialFilters.pinnedFilters || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);

  // Sample data - in real app, these would come from props or API
  const regions = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa'];
  const cities = ['New York', 'London', 'Tokyo', 'Singapore', 'Dubai', 'Sydney', 'Toronto', 'Frankfurt'];
  const states = ['California', 'New York', 'Texas', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia'];
  const teams = ['Sales Team A', 'Sales Team B', 'Marketing Team', 'Customer Success', 'Business Development'];
  const members = ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Emily Davis', 'Alex Rodriguez', 'Lisa Wang'];
  const products = ['Life Insurance', 'Health Insurance', 'Auto Insurance', 'Home Insurance', 'Business Insurance'];
  const insurers = ['MetLife', 'Prudential', 'AIG', 'Allianz', 'AXA', 'Zurich', 'Liberty Mutual'];

  // Filter items configuration for pinning functionality
  const allFilterItems = [
    { id: 'dateRange', label: 'Date Range', icon: Calendar, category: 'temporal' },
    { id: 'regions', label: 'Regions', icon: MapPin, category: 'geographic' },
    { id: 'cities', label: 'Cities', icon: MapPin, category: 'geographic' },
    { id: 'teams', label: 'Teams', icon: Users, category: 'organizational' },
    { id: 'products', label: 'Products', icon: Package, category: 'business' },
    { id: 'insurers', label: 'Insurers', icon: Building, category: 'business' },
    { id: 'performance', label: 'Performance', icon: TrendingUp, category: 'metrics' }
  ];

  // Utility functions
  const toggleArrayItem = (array: string[], setArray: (arr: string[]) => void, item: string) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  const togglePinnedFilter = (filterId: string) => {
    if (pinnedFilters.includes(filterId)) {
      setPinnedFilters(pinnedFilters.filter(id => id !== filterId));
    } else {
      setPinnedFilters([...pinnedFilters, filterId]);
    }
  };

  const resetFilters = () => {
    setDateRange({ from: '', to: '' });
    setQuickDateRange('last30days');
    setSelectedRegions([]);
    setSelectedCities([]);
    setSelectedStates([]);
    setSelectedTeams([]);
    setSelectedMembers([]);
    setPerformanceRange([0, 100]);
    setSelectedProducts([]);
    setSelectedInsurers([]);
    setBusinessVerticals([]);
    setChartType('donut');
    setColorScheme('professional');
    setShowPercentages(true);
    setShowLegend(true);
    setAnimateCharts(true);
    setRefreshInterval('manual');
    setExportFormat('xlsx');
    setEnableNotifications(false);
    setAutoSave(true);
  };

  const saveConfiguration = () => {
    const config = {
      dateRange,
      quickDateRange,
      selectedRegions,
      selectedCities,
      selectedStates,
      selectedTeams,
      selectedMembers,
      performanceRange,
      selectedProducts,
      selectedInsurers,
      businessVerticals,
      chartType,
      colorScheme,
      showPercentages,
      showLegend,
      animateCharts,
      refreshInterval,
      exportFormat,
      enableNotifications,
      autoSave,
      pinnedFilters
    };
    
    if (onFiltersChange) {
      onFiltersChange(config);
    }
    
    // Save to localStorage for persistence
    localStorage.setItem('advancedFiltersConfig', JSON.stringify(config));
  };

  // Auto-save when filters change
  useEffect(() => {
    if (autoSave) {
      const timeoutId = setTimeout(saveConfiguration, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [
    dateRange, quickDateRange, selectedRegions, selectedCities, selectedStates,
    selectedTeams, selectedMembers, performanceRange, selectedProducts,
    selectedInsurers, businessVerticals, autoSave
  ]);

  const getAppliedFiltersCount = () => {
    let count = 0;
    if (selectedRegions.length > 0) count++;
    if (selectedCities.length > 0) count++;
    if (selectedStates.length > 0) count++;
    if (selectedTeams.length > 0) count++;
    if (selectedMembers.length > 0) count++;
    if (selectedProducts.length > 0) count++;
    if (selectedInsurers.length > 0) count++;
    if (businessVerticals.length > 0) count++;
    if (performanceRange[0] > 0 || performanceRange[1] < 100) count++;
    if (dateRange.from || dateRange.to) count++;
    return count;
  };

  const renderFilterItem = (
    filterId: string,
    label: string,
    icon: React.ElementType,
    options: string[],
    selectedOptions: string[],
    setSelectedOptions: (options: string[]) => void,
    isMultiSelect: boolean = true
  ) => {
    const Icon = icon;
    const isPinned = pinnedFilters.includes(filterId);
    const availableOptions = options.filter(option => 
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <Card key={filterId} className={`p-4 ${isPinned ? 'ring-2 ring-blue-200 bg-blue-50' : ''}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-gray-600" />
            <h4 className="font-medium text-gray-900">{label}</h4>
            {selectedOptions.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {selectedOptions.length}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => togglePinnedFilter(filterId)}
              className="h-6 w-6 p-0"
            >
              {isPinned ? (
                <PinOff className="w-3 h-3 text-blue-600" />
              ) : (
                <Pin className="w-3 h-3 text-gray-400" />
              )}
            </Button>
            {selectedOptions.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedOptions([])}
                className="h-6 w-6 p-0"
              >
                <X className="w-3 h-3 text-gray-400" />
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {isMultiSelect ? (
            <div className="flex flex-wrap gap-2">
              {availableOptions.map((option) => (
                <Badge
                  key={option}
                  variant={selectedOptions.includes(option) ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => toggleArrayItem(selectedOptions, setSelectedOptions, option)}
                >
                  {option}
                </Badge>
              ))}
            </div>
          ) : (
            <Select 
              value={selectedOptions[0] || ''} 
              onValueChange={(value) => setSelectedOptions([value])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {availableOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </Card>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="pb-6">
          <SheetTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Advanced Filters & Settings
          </SheetTitle>
          <SheetDescription>
            Customize your dashboard view with advanced filtering options and display settings.
            {getAppliedFiltersCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getAppliedFiltersCount()} filters applied
              </Badge>
            )}
          </SheetDescription>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="filters" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </TabsTrigger>
            <TabsTrigger value="display" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Display & Settings
            </TabsTrigger>
          </TabsList>

          {/* Filters Tab */}
          <TabsContent value="filters" className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search filters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Applied Filters Summary */}
            {getAppliedFiltersCount() > 0 && (
              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-blue-900">Applied Filters</h3>
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="text-blue-700">
                    Clear All
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedRegions.map(region => (
                    <Badge key={region} variant="secondary" className="text-xs">
                      Region: {region}
                    </Badge>
                  ))}
                  {selectedTeams.map(team => (
                    <Badge key={team} variant="secondary" className="text-xs">
                      Team: {team}
                    </Badge>
                  ))}
                  {selectedProducts.map(product => (
                    <Badge key={product} variant="secondary" className="text-xs">
                      Product: {product}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* Pinned Filters */}
            {pinnedFilters.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                  <Pin className="w-4 h-4" />
                  Pinned Filters
                </h3>
                <div className="grid gap-4">
                  {allFilterItems
                    .filter(item => pinnedFilters.includes(item.id))
                    .map(item => {
                      switch (item.id) {
                        case 'regions':
                          return renderFilterItem('regions', 'Regions', MapPin, regions, selectedRegions, setSelectedRegions);
                        case 'cities':
                          return renderFilterItem('cities', 'Cities', MapPin, cities, selectedCities, setSelectedCities);
                        case 'teams':
                          return renderFilterItem('teams', 'Teams', Users, teams, selectedTeams, setSelectedTeams);
                        case 'products':
                          return renderFilterItem('products', 'Products', Package, products, selectedProducts, setSelectedProducts);
                        case 'insurers':
                          return renderFilterItem('insurers', 'Insurers', Building, insurers, selectedInsurers, setSelectedInsurers);
                        default:
                          return null;
                      }
                    })}
                </div>
                <Separator />
              </div>
            )}

            {/* Date Range Filter */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-gray-600" />
                <h3 className="font-medium text-gray-900">Date Range</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePinnedFilter('dateRange')}
                  className="h-6 w-6 p-0 ml-auto"
                >
                  {pinnedFilters.includes('dateRange') ? (
                    <PinOff className="w-3 h-3 text-blue-600" />
                  ) : (
                    <Pin className="w-3 h-3 text-gray-400" />
                  )}
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Quick Select</Label>
                  <Select value={quickDateRange} onValueChange={setQuickDateRange}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="last7days">Last 7 days</SelectItem>
                      <SelectItem value="last30days">Last 30 days</SelectItem>
                      <SelectItem value="last90days">Last 90 days</SelectItem>
                      <SelectItem value="thismonth">This month</SelectItem>
                      <SelectItem value="lastmonth">Last month</SelectItem>
                      <SelectItem value="thisyear">This year</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {quickDateRange === 'custom' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium mb-2 block">From</Label>
                      <Input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">To</Label>
                      <Input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Geographic Filters */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-gray-600" />
                <h3 className="font-medium text-gray-900">Geographic Filters</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Regions</Label>
                  <div className="flex flex-wrap gap-2">
                    {regions.map((region) => (
                      <Badge
                        key={region}
                        variant={selectedRegions.includes(region) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => toggleArrayItem(selectedRegions, setSelectedRegions, region)}
                      >
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Cities</Label>
                  <div className="flex flex-wrap gap-2">
                    {cities.map((city) => (
                      <Badge
                        key={city}
                        variant={selectedCities.includes(city) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => toggleArrayItem(selectedCities, setSelectedCities, city)}
                      >
                        {city}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">States</Label>
                  <div className="flex flex-wrap gap-2">
                    {states.map((state) => (
                      <Badge
                        key={state}
                        variant={selectedStates.includes(state) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => toggleArrayItem(selectedStates, setSelectedStates, state)}
                      >
                        {state}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* More Options Collapsible */}
            <Card className="p-4">
              <Collapsible open={isMoreOptionsOpen} onOpenChange={setIsMoreOptionsOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                    <span className="font-medium text-gray-900">More Options</span>
                    {isMoreOptionsOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-6 mt-4">
                  <div className="space-y-6">
                    {/* Value Display Options */}
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-3">Value Display</h5>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Show Values</Label>
                          <Switch checked={showPercentages} onCheckedChange={setShowPercentages} />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm">Show Percentages</Label>
                          <Switch checked={showLegend} onCheckedChange={setShowLegend} />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Expense Categories */}
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-3">Expense Categories</h5>
                      <div className="flex flex-wrap gap-2">
                        {['Marketing', 'Operations', 'Technology', 'HR', 'Finance'].map((category) => (
                          <Badge
                            key={category}
                            variant="outline"
                            className="cursor-pointer"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Additional Regional Filters */}
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-3">Additional Regional Filters</h5>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium mb-2 block">Time Zones</Label>
                          <div className="flex flex-wrap gap-2">
                            {['EST', 'PST', 'GMT', 'CET', 'JST', 'AEST'].map((tz) => (
                              <Badge key={tz} variant="outline" className="cursor-pointer">
                                {tz}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Team & Performance Filters */}
                    <div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Team & Performance</h5>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium mb-2 block">Teams</Label>
                            <div className="flex flex-wrap gap-2">
                              {teams.map((team) => (
                                <Badge
                                  key={team}
                                  variant={selectedTeams.includes(team) ? 'default' : 'outline'}
                                  className="cursor-pointer"
                                  onClick={() => toggleArrayItem(selectedTeams, setSelectedTeams, team)}
                                >
                                  {team}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium mb-2 block">Team Members</Label>
                            <div className="flex flex-wrap gap-2">
                              {members.map((member) => (
                                <Badge
                                  key={member}
                                  variant={selectedMembers.includes(member) ? 'default' : 'outline'}
                                  className="cursor-pointer"
                                  onClick={() => toggleArrayItem(selectedMembers, setSelectedMembers, member)}
                                >
                                  {member}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium mb-2 block">Performance Range: {performanceRange[0]}% - {performanceRange[1]}%</Label>
                            <Slider
                              value={performanceRange}
                              onValueChange={setPerformanceRange}
                              max={100}
                              step={5}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Product & Business Filters */}
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-3">Products & Business</h5>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium mb-2 block">Products</Label>
                            <div className="flex flex-wrap gap-2">
                              {products.map((product) => (
                                <Badge
                                  key={product}
                                  variant={selectedProducts.includes(product) ? 'default' : 'outline'}
                                  className="cursor-pointer"
                                  onClick={() => toggleArrayItem(selectedProducts, setSelectedProducts, product)}
                                >
                                  {product}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium mb-2 block">Insurers</Label>
                            <div className="flex flex-wrap gap-2">
                              {insurers.map((insurer) => (
                                <Badge
                                  key={insurer}
                                  variant={selectedInsurers.includes(insurer) ? 'default' : 'outline'}
                                  className="cursor-pointer"
                                  onClick={() => toggleArrayItem(selectedInsurers, setSelectedInsurers, insurer)}
                                >
                                  {insurer}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium mb-2 block">Business Verticals</Label>
                            <div className="flex flex-wrap gap-2">
                              {['Corporate', 'Retail', 'SME', 'Enterprise'].map((vertical) => (
                                <Badge
                                  key={vertical}
                                  variant={businessVerticals.includes(vertical) ? 'default' : 'outline'}
                                  className="cursor-pointer"
                                  onClick={() => toggleArrayItem(businessVerticals, setBusinessVerticals, vertical)}
                                >
                                  {vertical}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </TabsContent>

          {/* Display & Settings Tab */}
          <TabsContent value="display" className="space-y-6">
            {/* Chart Display Settings */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-4 h-4 text-gray-600" />
                <h3 className="font-medium text-gray-900">Chart Display Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Chart Type</Label>
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
                    <Label className="text-sm font-medium mb-2 block">Color Scheme</Label>
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
                    <Label className="text-sm font-medium">Show Percentages</Label>
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
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-4 h-4 text-gray-600" />
                <h3 className="font-medium text-gray-900">Performance & Data Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Data Refresh Interval</Label>
                  <Select value={refreshInterval} onValueChange={setRefreshInterval}>
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
                  <Label className="text-sm font-medium mb-2 block">Export Format</Label>
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
                    <Label className="text-sm font-medium">Enable Notifications</Label>
                    <Switch
                      checked={enableNotifications}
                      onCheckedChange={setEnableNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Auto-save Configuration</Label>
                    <Switch
                      checked={autoSave}
                      onCheckedChange={setAutoSave}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Reset and Save Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={resetFilters} className="text-sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset All Settings
              </Button>
              <Button onClick={saveConfiguration} className="text-sm">
                <Save className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
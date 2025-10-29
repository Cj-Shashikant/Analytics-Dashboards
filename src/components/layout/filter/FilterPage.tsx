'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  Typography,
  IconButton,
  FormControl,
  Button,
  Paper,
} from '@mui/material';
import {
  CalendarDays,
  Building2,
  BarChart3,
  Settings,
  Trophy,
  Save,
  Maximize,
  IndianRupee,
  Play,
  Pause,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
  setSelectedDepartment,
  setSelectedReportType,
  setSelectedDuration,
  cycleValueUnit,
} from '../../../redux/slices/filterSlice';
import {
  DEPARTMENTS,
  DepartmentType,
} from '../../../constants/enums/departments';
import { DURATIONS, DurationType } from '../../../constants/enums/durations';
import {
  getReportTypesForDepartment,
  ReportType,
} from '../../../constants/enums/reportTypes';
import { filterStyles } from './style';
import { getFilterWidths } from './dynamicWidth';
import { AdvancedFilters } from './moreFilter';
import SettingFilters from './settingFilter';

// Import filter components
import FullScreenFilter from './fullScreenFillter';
import { LeaderboardModal } from './leaderboardFilter';
import { SaveToPlaylist } from './playlistFilter';
import { PlaylistManager } from './playlistManager';

export default function FilterPage() {
  const dispatch = useAppDispatch();
  const {
    selectedDepartment,
    selectedReportType,
    selectedDuration,
    valueUnit,
    pinnedItems,
  } = useAppSelector(state => state.filter);

  // Modal state management
  const [isMoreFilterOpen, setIsMoreFilterOpen] = useState(false);
  const [isSettingFilterOpen, setIsSettingFilterOpen] = useState(false);
  const [isFullScreenFilterOpen, setIsFullScreenFilterOpen] = useState(false);
  const [isLeaderboardFilterOpen, setIsLeaderboardFilterOpen] = useState(false);

  const [isPlaylistFilterOpen, setIsPlaylistFilterOpen] = useState(false);

  // Playlist player state
  const [currentPlaylist, setCurrentPlaylist] = useState<any>(null);

  // Auto-navigation state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [countdown, setCountdown] = useState(30);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // Define the 14-page sequence
  const reportSequence = [
    { department: 'Business', reportType: 'Revenue vs Expenses' },
    { department: 'Business', reportType: 'Revenue by Products' },
    { department: 'Business', reportType: 'Revenue by Insurers' },
    { department: 'Business', reportType: 'Revenue by Policy Type' },
    { department: 'Business', reportType: 'Revenue by Vertical' },
    { department: 'Business', reportType: 'Revenue by LOB' },
    { department: 'Business', reportType: 'Cross-Sell Penetration' },
    { department: 'Retention', reportType: 'Retention - By Insurer' },
    { department: 'Retention', reportType: 'Retention - Broker' },
    { department: 'Customer Analysis', reportType: 'Duration of Relationship' },
    {
      department: 'Customer Analysis',
      reportType: 'Number of Products Purchased',
    },
    {
      department: 'Customer Analysis',
      reportType: 'Premium Contribution by Customer',
    },
    {
      department: 'Customer Analysis',
      reportType: 'Customer Satisfaction / NPS',
    },
    {
      department: 'Customer Analysis',
      reportType: 'Cross-Sell / Upsell Potential',
    },
  ];

  // Find current position in sequence
  const getCurrentSequenceIndex = () => {
    const currentIndex = reportSequence.findIndex(
      item =>
        item.department === selectedDepartment &&
        item.reportType === selectedReportType
    );
    return currentIndex >= 0 ? currentIndex : 0;
  };

  // Navigate to next report in sequence
  const navigateToNextReport = () => {
    setCurrentSequenceIndex(prevIndex => {
      const nextIndex = (prevIndex + 1) % reportSequence.length;
      const nextReport = reportSequence[nextIndex];

      dispatch(setSelectedDepartment(nextReport.department as DepartmentType));
      dispatch(setSelectedReportType(nextReport.reportType as ReportType));

      // If we've completed a full cycle (back to first report), stop playing
      if (nextIndex === 0) {
        setIsPlaying(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }

      return nextIndex;
    });
  };

  // Handle Play/Pause toggle
  const handlePlayPause = () => {
    if (isPlaying) {
      // Pause
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
      setCountdown(30); // Reset countdown
    } else {
      // Play
      setIsPlaying(true);
      setCurrentSequenceIndex(getCurrentSequenceIndex());
      setCountdown(30); // Reset countdown to 30 seconds

      // Start countdown timer (updates every second)
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            return 30; // Reset to 30 when it reaches 0
          }
          return prev - 1;
        });
      }, 1000); // Update every second

      // Start 30-second interval for navigation
      intervalRef.current = setInterval(() => {
        navigateToNextReport();
      }, 30000); // 30 seconds
    }
  };

  // Update current sequence index when department/report changes manually
  useEffect(() => {
    if (!isPlaying) {
      setCurrentSequenceIndex(getCurrentSequenceIndex());
    }
  }, [selectedDepartment, selectedReportType]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  // Calculate dynamic widths based on content (like analytics App.tsx)
  const filterWidths = getFilterWidths(
    '', // selectedEntity - not used anymore
    selectedDepartment,
    selectedReportType,
    selectedDuration,
    '' // selectedLocation - not used anymore
  );

  const handleDepartmentChange = (value: string) => {
    dispatch(setSelectedDepartment(value as DepartmentType));
  };

  const handleReportTypeChange = (value: string) => {
    dispatch(setSelectedReportType(value as ReportType));
  };

  const handleDurationChange = (value: string) => {
    dispatch(setSelectedDuration(value as DurationType));
  };

  const handleValueUnitCycle = () => {
    console.log('Value unit button clicked - current valueUnit:', valueUnit);
    dispatch(cycleValueUnit());
    console.log('cycleValueUnit dispatched');
  };

  const handleMoreFilters = () => {
    setIsMoreFilterOpen(true);
  };

  const handleSettings = () => {
    setIsSettingFilterOpen(true);
  };

  const handleFullscreen = () => {
    setIsFullScreenFilterOpen(true);
  };

  const handleLeaderboard = () => {
    setIsLeaderboardFilterOpen(true);
  };

  const handleSaveToPlaylist = () => {
    setIsPlaylistFilterOpen(true);
  };

  return (
    <Box>
      {/* Main Filter Container */}
      <Paper elevation={1} sx={filterStyles.mainContainer}>
        <Box sx={filterStyles.filterContainer}>
          {/* Left Side - Filter Controls */}
          <Box sx={filterStyles.leftSide}>
            {/* Primary Filter Row */}
            <Grid container spacing={3} alignItems="flex-end">
              {/* Organization Filter */}
              {/* <Grid item xs={12} sm={6} lg="auto">
                <Box sx={filterStyles.filterItem}>
                  <Box sx={filterStyles.labelContainer}>
                    <Building2 style={filterStyles.filterIcon} />
                    <Typography sx={filterStyles.labelText}>
                      Organisation
                    </Typography>
                  </Box>
                  <FormControl size="small" fullWidth>
                    <Select
                      value={selectedEntity}
                      onChange={handleEntityChange}
                      sx={{
                        ...filterStyles.selectTrigger,
                        ...getWidthSx(filterWidths.entityWidth),
                        minWidth: 140
                      }}
                    >
                      {ENTITIES.map((entity) => (
                        <MenuItem key={entity} value={entity}>
                          {entity}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid> */}

              {/* Duration Filter - Only show if pinned */}
              {pinnedItems.includes('duration') && (
                <Grid item xs={12} sm={6} lg="auto">
                  <Box sx={filterStyles.filterItem}>
                    <Box sx={filterStyles.labelContainer}>
                      <CalendarDays
                        style={{ width: 16, height: 16, color: '#2563eb' }}
                      />
                      <Typography sx={filterStyles.labelText}>
                        Duration
                      </Typography>
                    </Box>
                    <FormControl size="small" fullWidth>
                      <Select
                        value={selectedDuration}
                        onValueChange={handleDurationChange}
                      >
                        <SelectTrigger
                          style={{
                            width:
                              typeof window !== 'undefined' &&
                              window.innerWidth >= 1200
                                ? filterWidths.durationWidth
                                : '100%',
                            minWidth: 110,
                          }}
                        >
                          <SelectValue placeholder="Duration" />
                        </SelectTrigger>
                        <SelectContent>
                          {DURATIONS.map(duration => (
                            <SelectItem key={duration} value={duration}>
                              {duration}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              )}

              {/* Department Filter - Only show if pinned */}
              {pinnedItems.includes('department') && (
                <Grid item xs={12} sm={6} lg="auto">
                  <Box sx={filterStyles.filterItem}>
                    <Box sx={filterStyles.labelContainer}>
                      <Building2
                        style={{ width: 16, height: 16, color: '#2563eb' }}
                      />
                      <Typography sx={filterStyles.labelText}>
                        Department
                      </Typography>
                    </Box>
                    <FormControl size="medium" fullWidth>
                      <Select
                        value={selectedDepartment}
                        onValueChange={handleDepartmentChange}
                      >
                        <SelectTrigger
                          style={{
                            width:
                              typeof window !== 'undefined' &&
                              window.innerWidth >= 1200
                                ? filterWidths.departmentWidth
                                : '100%',
                            minWidth: 100,
                          }}
                        >
                          <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                          {DEPARTMENTS.map(department => (
                            <SelectItem key={department} value={department}>
                              {department}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              )}

              {/* Report Type Filter - Only show if pinned */}
              {pinnedItems.includes('reportType') && (
                <Grid item xs={12} sm={6} lg="auto">
                  <Box sx={filterStyles.filterItem}>
                    <Box sx={filterStyles.labelContainer}>
                      <BarChart3
                        style={{ width: 16, height: 16, color: '#2563eb' }}
                      />
                      <Typography sx={filterStyles.labelText}>
                        Report Type
                      </Typography>
                    </Box>
                    <FormControl size="small" fullWidth>
                      <Select
                        value={selectedReportType}
                        onValueChange={handleReportTypeChange}
                      >
                        <SelectTrigger
                          style={{
                            width:
                              typeof window !== 'undefined' &&
                              window.innerWidth >= 1200
                                ? filterWidths.reportTypeWidth
                                : '100%',
                            minWidth: 100,
                          }}
                        >
                          <SelectValue placeholder="Report type" />
                        </SelectTrigger>
                        <SelectContent>
                          {getReportTypesForDepartment(selectedDepartment).map(
                            reportType => (
                              <SelectItem key={reportType} value={reportType}>
                                {reportType}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
              )}

              {/* More Button - Aligned with filters */}
              <Grid item xs={12} sm={6} lg="auto">
                <Box sx={filterStyles.filterItem}>
                  <Box sx={filterStyles.spacer}></Box>
                  <Button
                    variant="text"
                    size="small"
                    onClick={handleMoreFilters}
                    sx={filterStyles.moreButton}
                  >
                    More
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Right Side - Action Controls */}
          <Box sx={filterStyles.rightSide}>
            {/* Play/Pause Toggle Button */}
            <Box sx={filterStyles.actionContainer}>
              <Button
                variant="outlined"
                size="small"
                startIcon={isPlaying ? <Pause size={14} /> : <Play size={14} />}
                onClick={handlePlayPause}
                sx={{
                  ...filterStyles.valueUnitButton,
                  backgroundColor: isPlaying ? '#fff3cd' : 'transparent',
                  borderColor: isPlaying ? '#ffc107' : '#e0e0e0',
                  color: isPlaying ? '#856404' : '#666',
                  '&:hover': {
                    backgroundColor: isPlaying ? '#fff3cd' : '#f5f5f5',
                    borderColor: isPlaying ? '#ffc107' : '#ccc',
                  },
                }}
              >
                {isPlaying ? `${countdown}s` : 'Play'}
              </Button>
            </Box>

            {/* Value Unit Button */}
            <Box sx={filterStyles.actionContainer}>
              <Box sx={filterStyles.spacer}></Box>

              <Button
                variant="outlined"
                size="small"
                startIcon={<IndianRupee size={14} />}
                onClick={handleValueUnitCycle}
                sx={filterStyles.valueUnitButton}
              >
                {valueUnit}
              </Button>
            </Box>

            {/* Action Icons */}
            <Box sx={filterStyles.actionContainer}>
              <Box sx={filterStyles.actionIconsContainer}>
                <IconButton
                  size="small"
                  onClick={handleSettings}
                  sx={filterStyles.settingsIcon}
                  title="Settings"
                >
                  <Settings size={16} />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={handleFullscreen}
                  sx={filterStyles.fullscreenIcon}
                  title="Full Screen"
                >
                  <Maximize size={16} />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={handleLeaderboard}
                  sx={filterStyles.leaderboardIcon}
                  title="Leaderboard"
                >
                  <Trophy size={16} />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={handleSaveToPlaylist}
                  sx={filterStyles.downloadIcon}
                  title="Save to Playlist"
                >
                  <Save size={16} />
                </IconButton>

                {/* <IconButton
                  size="small"
                  onClick={handleExport}
                  sx={filterStyles.downloadIcon}
                  title="Import Excel Data"
                >
                  <Upload size={16} />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={handleDownloadSample}
                  sx={filterStyles.downloadIcon}
                  title="Download Sample Excel Template"
                >
                  <Download size={16} />
                </IconButton> */}

                {/* Presentation Playlists - now handled by standalone PlaylistManager */}
                <PlaylistManager
                  currentFilters={{
                    selectedEntity: '', // Not used in this context
                    selectedReportType,
                    selectedBusinessType: '', // Not used in this context
                    selectedLocation: '', // Not used in this context
                    selectedDuration,
                    valueUnit,
                  }}
                  onPlayPlaylist={playlist => {
                    // Handle playlist play functionality
                    console.log('Playing playlist:', playlist);
                    setCurrentPlaylist(playlist);
                    setIsFullScreenFilterOpen(true);
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Modal Components */}
      {isMoreFilterOpen && (
        <AdvancedFilters
          isOpen={isMoreFilterOpen}
          onClose={() => setIsMoreFilterOpen(false)}
        />
      )}

      {isSettingFilterOpen && (
        <SettingFilters
          isOpen={isSettingFilterOpen}
          onClose={() => setIsSettingFilterOpen(false)}
        />
      )}

      {isFullScreenFilterOpen && (
        <FullScreenFilter
          isOpen={isFullScreenFilterOpen}
          onClose={() => {
            setIsFullScreenFilterOpen(false);
            setCurrentPlaylist(null);
          }}
          playlist={currentPlaylist}
        />
      )}

      {isLeaderboardFilterOpen && (
        <LeaderboardModal
          isOpen={isLeaderboardFilterOpen}
          onClose={() => setIsLeaderboardFilterOpen(false)}
        />
      )}

      <SaveToPlaylist
        currentFilters={{
          selectedEntity: selectedDepartment, // Map department to entity for compatibility
          selectedReportType: selectedReportType,
          selectedBusinessType: selectedDepartment, // Use department as business type
          selectedLocation: 'All Location', // Default location since it's not in current state
          selectedDuration: selectedDuration,
          valueUnit: valueUnit,
        }}
        isOpen={isPlaylistFilterOpen}
        onClose={() => setIsPlaylistFilterOpen(false)}
      />
    </Box>
  );
}

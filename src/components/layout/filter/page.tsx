'use client';

import React, { useState } from 'react';
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
  List,
  DollarSign,
  Maximize,
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
import { SettingFilters } from './settingFilter';

// Import filter components
import FullScreenFilter from './fullScreenFillter';
import { LeaderboardModal } from './leaderboardFilter';
import { SaveToPlaylist } from './playlistFilter';
import { PlaylistManager } from './playListManager';

export default function FilterPage() {
  const dispatch = useAppDispatch();
  const {
    selectedDepartment,
    selectedReportType,
    selectedDuration,
    valueUnit,
  } = useAppSelector(state => state.filter);

  // Modal state management
  const [isMoreFilterOpen, setIsMoreFilterOpen] = useState(false);
  const [isSettingFilterOpen, setIsSettingFilterOpen] = useState(false);
  const [isFullScreenFilterOpen, setIsFullScreenFilterOpen] = useState(false);
  const [isLeaderboardFilterOpen, setIsLeaderboardFilterOpen] = useState(false);
  const [isPlaylistFilterOpen, setIsPlaylistFilterOpen] = useState(false);
  const [isPresentationFilterOpen, setIsPresentationFilterOpen] =
    useState(false);

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

  const handleDownload = () => {
    setIsPlaylistFilterOpen(true);
  };

  const handleMoreOptions = () => {
    setIsPresentationFilterOpen(true);
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

              {/* Duration Filter */}
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

              {/* Department Filter */}
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

              {/* Report Type Filter */}
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
            {/* Value Unit Button */}
            <Box sx={filterStyles.actionContainer}>
              <Box sx={filterStyles.spacer}></Box>
              <Button
                variant="outlined"
                size="small"
                startIcon={<DollarSign size={16} />}
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
                  onClick={handleDownload}
                  sx={filterStyles.downloadIcon}
                  title="Save to Playlist"
                >
                  <Save size={16} />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={handleMoreOptions}
                  sx={filterStyles.moreOptionsIcon}
                  title="Presentation Playlists"
                >
                  <List size={16} />
                </IconButton>
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
          onClose={() => setIsFullScreenFilterOpen(false)}
        />
      )}

      {isLeaderboardFilterOpen && (
        <LeaderboardModal
          isOpen={isLeaderboardFilterOpen}
          onClose={() => setIsLeaderboardFilterOpen(false)}
        />
      )}

      {isPlaylistFilterOpen && (
        <SaveToPlaylist
          isOpen={isPlaylistFilterOpen}
          onClose={() => setIsPlaylistFilterOpen(false)}
        />
      )}

      {isPresentationFilterOpen && (
        <PlaylistManager
          isOpen={isPresentationFilterOpen}
          onClose={() => setIsPresentationFilterOpen(false)}
        />
      )}
    </Box>
  );
}

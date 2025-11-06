'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Button,
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  BarChart3,
  PieChart,
  TrendingUp,
} from 'lucide-react';

interface PlaylistItem {
  id: string;
  name: string;
  reportType: string;
  chartType?: 'revenue' | 'expenses';
  filters: {
    selectedEntity: string;
    selectedReportType: string;
    selectedBusinessType: string;
    selectedLocation: string;
    selectedDuration: string;
    valueUnit: string;
  };
  duration?: number;
  notes?: string;
  createdAt: Date;
}

interface Playlist {
  id: string;
  name: string;
  description?: string;
  items: PlaylistItem[];
  totalDuration: number;
  category?: string;
  icon?: string;
  isDefault?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface FullScreenFilterProps {
  isOpen: boolean;
  onClose: () => void;
  playlist?: Playlist | null;
}

// Mock chart component for demonstration
const ChartDisplay = ({ item }: { item: PlaylistItem }) => {
  const getChartIcon = (reportType: string) => {
    if (reportType.includes('Revenue')) return BarChart3;
    if (reportType.includes('Retention')) return TrendingUp;
    return PieChart;
  };

  const ChartIcon = getChartIcon(item.reportType);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Chart Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <ChartIcon className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
            <p className="text-sm text-gray-600">{item.reportType}</p>
          </div>
        </div>
        {item.notes && (
          <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded">
            {item.notes}
          </p>
        )}
      </div>

      {/* Chart Content */}
      <div className="flex-1 p-6 bg-gray-50">
        <Card className="h-full">
          <CardContent className="h-full flex items-center justify-center">
            <div className="text-center">
              <ChartIcon className="w-24 h-24 text-gray-400 mx-auto mb-4" />
              <Typography variant="h6" className="text-gray-600 mb-2">
                {item.reportType} Chart
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                Chart data for {item.filters.selectedEntity || 'All Entities'}
              </Typography>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <Typography variant="body2" className="text-blue-800">
                  <strong>Filters:</strong> {item.reportType} • Duration:{' '}
                  {item.duration}s
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function FullScreenFilter({
  isOpen,
  onClose,
  playlist,
}: FullScreenFilterProps) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const currentItem = playlist?.items[currentItemIndex];
  // const hasMultipleItems = playlist && playlist.items.length > 1;

  // Auto-advance functionality
  useEffect(() => {
    if (!isPlaying || !currentItem) return;

    const duration = currentItem.duration || 20; // Default 20 seconds
    setTimeRemaining(duration);

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Auto-advance to next item
          if (currentItemIndex < (playlist?.items.length || 0) - 1) {
            setCurrentItemIndex(prev => prev + 1);
          } else {
            setIsPlaying(false); // Stop at the end
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentItem, currentItemIndex, playlist?.items.length]);

  // Reset when playlist changes
  useEffect(() => {
    setCurrentItemIndex(0);
    setIsPlaying(false);
    setTimeRemaining(0);
  }, [playlist]);

  const handlePrevious = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    if (playlist && currentItemIndex < playlist.items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!playlist) {
    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        fullScreen
      >
        <DialogContent>
          <Box sx={{ py: 2, textAlign: 'center' }}>
            <Typography variant="h6">No playlist selected</Typography>
            <Button onClick={onClose} variant="outlined" sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={false}
      fullWidth
      fullScreen
    >
      <div className="h-full flex flex-col bg-gray-100">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {playlist.name}
            </h1>
            {playlist.description && (
              <span className="text-gray-600">• {playlist.description}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Playlist Progress */}
            <span className="text-sm text-gray-600">
              {currentItemIndex + 1} of {playlist.items.length}
            </span>

            {/* Close Button */}
            <IconButton onClick={onClose} className="text-gray-600">
              <X className="w-6 h-6" />
            </IconButton>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {currentItem && <ChartDisplay item={currentItem} />}
        </div>

        {/* Controls Footer */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Navigation Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentItemIndex === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={
                  !playlist || currentItemIndex >= playlist.items.length - 1
                }
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Play Controls */}
            <div className="flex items-center gap-4">
              {isPlaying && timeRemaining > 0 && (
                <span className="text-sm text-gray-600">
                  Auto-advance in {formatTime(timeRemaining)}
                </span>
              )}

              <Button
                variant={isPlaying ? 'secondary' : 'default'}
                size="sm"
                onClick={togglePlayPause}
                className="flex items-center gap-2"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Play
                  </>
                )}
              </Button>
            </div>

            {/* Exit Button */}
            <Button variant="outline" onClick={onClose}>
              Exit Fullscreen
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  setSelectedDepartment,
  setSelectedReportType,
} from '@/redux/slices/filterSlice';
import { DepartmentType, ReportType } from '@/constants/enums';

// Define the complete slideshow sequence
const SLIDESHOW_SEQUENCE = [
  // Department: Business (7 pages)
  {
    department: 'Business' as DepartmentType,
    reportType: 'Revenue vs Expenses' as ReportType,
  },
  {
    department: 'Business' as DepartmentType,
    reportType: 'Revenue by Products' as ReportType,
  },
  {
    department: 'Business' as DepartmentType,
    reportType: 'Revenue by Insurers' as ReportType,
  },
  {
    department: 'Business' as DepartmentType,
    reportType: 'Revenue by Policy Type' as ReportType,
  },
  {
    department: 'Business' as DepartmentType,
    reportType: 'Revenue by Vertical' as ReportType,
  },
  {
    department: 'Business' as DepartmentType,
    reportType: 'Revenue by LOB' as ReportType,
  },
  // {
  //   department: 'Business' as DepartmentType,
  //   reportType: 'Cross-Sell Penetration' as ReportType, // COMMENTED OUT - Cross-sell functionality disabled
  // },

  // Department: Retention (2 pages)
  {
    department: 'Retention' as DepartmentType,
    reportType: 'Retention - By Insurer' as ReportType,
  },
  {
    department: 'Retention' as DepartmentType,
    reportType: 'Retention - Broker' as ReportType,
  },

  // Department: Customer Analysis (4 pages - reduced from 5)
  {
    department: 'Customer Analysis' as DepartmentType,
    reportType: 'Duration of Relationship' as ReportType,
  },
  {
    department: 'Customer Analysis' as DepartmentType,
    reportType: 'Number of Products Purchased' as ReportType,
  },
  {
    department: 'Customer Analysis' as DepartmentType,
    reportType: 'Premium Contribution by Customer' as ReportType,
  },
  {
    department: 'Customer Analysis' as DepartmentType,
    reportType: 'Customer Satisfaction / NPS' as ReportType,
  },
  // {
  //   department: 'Customer Analysis' as DepartmentType,
  //   reportType: 'Cross-Sell / Upsell Potential' as ReportType, // COMMENTED OUT - Cross-sell functionality disabled
  // },
];

interface DashboardSlideshowProps {
  isVisible?: boolean;
  defaultInterval?: number; // in seconds
}

export function DashboardSlideshow({
  isVisible = true,
  defaultInterval = 10,
}: DashboardSlideshowProps) {
  const dispatch = useAppDispatch();
  const { selectedDepartment, selectedReportType } = useAppSelector(
    state => state.filter
  );

  const [isPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [, setCountdown] = useState(defaultInterval);
  const [intervalDuration] = useState(defaultInterval);

  // const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // Find current index based on Redux state
  useEffect(() => {
    const currentSlideIndex = SLIDESHOW_SEQUENCE.findIndex(
      slide =>
        slide.department === selectedDepartment &&
        slide.reportType === selectedReportType
    );
    if (currentSlideIndex !== -1 && currentSlideIndex !== currentIndex) {
      setCurrentIndex(currentSlideIndex);
    }
  }, [selectedDepartment, selectedReportType]);

  // Handle countdown timer
  useEffect(() => {
    if (isPlaying) {
      countdownRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            handleNext();
            return intervalDuration;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
    }

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [isPlaying, intervalDuration]);

  // Reset countdown when manually navigating
  useEffect(() => {
    setCountdown(intervalDuration);
  }, [currentIndex, intervalDuration]);

  // const handlePlayPause = () => {
  //   setIsPlaying(!isPlaying);
  //   if (!isPlaying) {
  //     setCountdown(intervalDuration);
  //   }
  // };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % SLIDESHOW_SEQUENCE.length;
    navigateToSlide(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex =
      currentIndex === 0 ? SLIDESHOW_SEQUENCE.length - 1 : currentIndex - 1;
    navigateToSlide(prevIndex);
  };

  const navigateToSlide = (index: number) => {
    const slide = SLIDESHOW_SEQUENCE[index];
    setCurrentIndex(index);
    dispatch(setSelectedDepartment(slide.department));
    dispatch(setSelectedReportType(slide.reportType));
    setCountdown(intervalDuration);
  };

  // const formatTime = (seconds: number) => {
  //   const mins = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   return `${mins}:${secs.toString().padStart(2, '0')}`;
  // };

  // const getCurrentSlideName = () => {
  //   const slide = SLIDESHOW_SEQUENCE[currentIndex];
  //   return slide.reportType;
  // };

  // const getCurrentDepartmentName = () => {
  //   const slide = SLIDESHOW_SEQUENCE[currentIndex];
  //   return slide.department;
  // };

  if (!isVisible) return null;

  return (
    <>
      {/* Play/Pause Button with Countdown */}

      {/* Floating Navigation Buttons */}
      <div className="fixed top-1/2 left-6 transform -translate-y-1/2 z-50">
        <Button
          variant="outline"
          size="lg"
          onClick={handlePrevious}
          className="h-12 w-12 p-0 rounded-full bg-white shadow-lg border-gray-200 hover:bg-gray-50 hover:shadow-xl transition-all duration-200"
          title="Previous Page"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </Button>
      </div>

      <div className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50">
        <Button
          variant="outline"
          size="lg"
          onClick={handleNext}
          className="h-12 w-12 p-0 rounded-full bg-white shadow-lg border-gray-200 hover:bg-gray-50 hover:shadow-xl transition-all duration-200"
          title="Next Page"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </Button>
      </div>

      {/* Progress Indicator */}
    </>
  );
}

export default DashboardSlideshow;

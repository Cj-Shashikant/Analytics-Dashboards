'use client';

import FilterPage from '../components/layout/filter/FilterPage';
import { TopNavigation } from '@/components/layout/header/page';
import ReportRouter from '@/components/layout/analyticsReports/ReportRouter';
import DashboardSlideshow from '@/components/layout/slideshow/DashboardSlideshow';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <TopNavigation />

      {/* Main Content Container */}
      <main className="flex-1 lg:overflow-hidden">
        <div className="h-full px-4 sm:px-6 py-4 lg:overflow-y-auto">
          <div className="space-y-4">
            {/* Dashboard Filters */}
            <FilterPage />
          </div>
          <div className="space-y-6">
            <ReportRouter />
          </div>
        </div>
      </main>

      {/* Dashboard Slideshow Controls */}
      <DashboardSlideshow />
    </div>
  );
}

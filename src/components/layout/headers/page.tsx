"use client";

import React, { useState } from 'react';
import { Search, Bell, Home, ArrowLeft, Settings, Menu } from 'lucide-react';
import {
  NavigationContainer,
  NavigationContent,
  LeftSection,
  NavButton,
  TriangleIcon,
  SearchSection,
  SearchContainer,
  SearchIcon,
  SearchInput,
  RightSection,
  NotificationGroup,
  NotificationButton,
  NotificationBadge,
  NavigationGroup,
  ProfileGroup,
  UserAvatar,
  UserInfo,
  UserName,
  UserRole,
  SettingsButton,
} from './style';

export function TopNavigation() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <NavigationContainer component="nav">
      <NavigationContent>
        {/* Left Section */}
        <LeftSection>
          <NavButton>
            <Menu size={20} />
          </NavButton>
          <NavButton>
            <TriangleIcon />
          </NavButton>
        </LeftSection>

        {/* Center Section - Search */}
        <SearchSection>
          <SearchContainer>
            <SearchIcon>
              <Search size={16} />
            </SearchIcon>
            <SearchInput
              placeholder="Search Here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              size="small"
            />
          </SearchContainer>
        </SearchSection>

        {/* Right Section */}
        <RightSection>
          {/* First group - Notification only */}
          <NotificationGroup>
            <NotificationButton>
              <NotificationBadge />
              <Bell size={20} />
            </NotificationButton>
          </NotificationGroup>

          {/* Second group - Navigation buttons */}
          <NavigationGroup>
            <NavButton>
              <Home size={20} />
            </NavButton>
            <NavButton>
              <ArrowLeft size={20} />
            </NavButton>
          </NavigationGroup>

          {/* Third group - Profile */}
          <ProfileGroup>
            <UserAvatar>ST</UserAvatar>
            <UserInfo>
              <UserName>Shashikant Tripathi</UserName>
              <UserRole>Chairman</UserRole>
            </UserInfo>
            <SettingsButton>
              <Settings size={20} />
            </SettingsButton>
          </ProfileGroup>
        </RightSection>
      </NavigationContent>
    </NavigationContainer>
  );
}
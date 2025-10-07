'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material';

interface LeaderboardFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeaderboardFilter({ isOpen, onClose }: LeaderboardFilterProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Leaderboard
      </DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="body1">
            Leaderboard rankings and performance metrics will be displayed here.
          </Typography>
          {/* Add your leaderboard content here */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
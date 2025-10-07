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

interface FullScreenFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullScreenFilter({ isOpen, onClose }: FullScreenFilterProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen
    >
      <DialogTitle>
        Full Screen View
      </DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="body1">
            Full screen content will be displayed here.
          </Typography>
          {/* Add your full screen content here */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Exit Full Screen
        </Button>
      </DialogActions>
    </Dialog>
  );
}
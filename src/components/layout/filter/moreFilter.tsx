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

interface MoreFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MoreFilter({ isOpen, onClose }: MoreFilterProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>More Filters</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="body1">
            Additional filter options will be displayed here.
          </Typography>
          {/* Add your more filter content here */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onClose} variant="contained">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}

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

interface PlaylistFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlaylistFilter({
  isOpen,
  onClose,
}: PlaylistFilterProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Save to Playlist</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="body1">
            Save current view to playlist options will be displayed here.
          </Typography>
          {/* Add your playlist save content here */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onClose} variant="contained">
          Save to Playlist
        </Button>
      </DialogActions>
    </Dialog>
  );
}

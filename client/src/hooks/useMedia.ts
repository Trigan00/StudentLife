import { DIMENSIONS } from '@/utils/GeneralConsts';
import { useTheme, useMediaQuery } from '@mui/material';

export function useMedia(dimension: DIMENSIONS) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(dimension));
  return matches;
}

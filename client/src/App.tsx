import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './components/AppRouter';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
      <Toaster position='top-right' duration={3000} expand={true} richColors />
    </QueryClientProvider>
  );
}

export default App;

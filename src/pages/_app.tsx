import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProps as NextAppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';

const queryClient = new QueryClient();

type PageProps = {
  dehydratedState: unknown;
};

type AppProps<P = PageProps> = {
  pageProps: P;
} & Omit<NextAppProps<P>, 'pageProps'>;

export default function App({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

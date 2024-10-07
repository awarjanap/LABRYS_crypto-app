//import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import 
  {QueryClientProvider,
  QueryClient
} from '@tanstack/react-query';
import { ThirdwebProvider } from "thirdweb/react";


const queryClient = new QueryClient();


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider>
    <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <Component {...pageProps} />;
      </ChakraProvider>
      </QueryClientProvider>
      </ThirdwebProvider>
  )
}

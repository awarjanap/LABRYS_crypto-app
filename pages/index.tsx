import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Icon,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import CoinTable, { Coin } from "@/components/CoinTable";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { SearchIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";



const client = createThirdwebClient({
  secretKey: `process.env.NEXT_APP_THIRDWEB_CLIENT_ID`,
});





function App({ coins }: any) {
  const [coinSearchInput, setCoinSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<Coin[]>();

  //for sorting parameter
  const [sortBy, setSortBy] = useState();
  const [sortDirection, setSortDirection] = useState("desc");

  //for default sorting parameter
  const [sortMethod, setSortMethod] = useState("market_cap");




  interface CoinAssetQueryParams {
    limit: number;
    sortBy?: string;
    sortDir?: string;
  }

  type CoinAssetQueryKey = ["coinAssets", CoinAssetQueryParams];

  // This method implements the initial coin fetching
  const getCoinData = async (
    context: QueryFunctionContext<CoinAssetQueryKey>
  ) => {
    const params = {
      limit: context.queryKey[1]?.limit,
      sort: context.queryKey[1]?.sortBy,
      Dir: context.queryKey[1]?.sortDir,
    };
    try {
      const coinDetails = await fetch(
        `/api/url?sortBy=${params.sort}&sortDir=${params.Dir}&limit=${params.limit}`
      ).then((response) => response.json());
      return coinDetails.coinData.data as any as Coin[];
    } catch (error) {
      throw new Error("Something happened");
    }
  };

  const useCoinQuery = ({ limit, sortBy, sortDir }: CoinAssetQueryParams) =>
    useQuery({
      queryKey: ["coinAssets", { sortBy, sortDir, limit }],
      queryFn: getCoinData,
    });

  const query = useCoinQuery({
    limit: 100,
    sortBy: sortMethod,
    sortDir: sortDirection,
  });

  const handleSearchInput = (e: any) => {
    const input = e.target.value;
    setCoinSearchInput(input.toLowerCase());
    console.log(coinSearchInput);

    const filteredResults = searchResults?.filter((result) =>
      result.slug.includes(input.toLowerCase())
    );
    console.log(filteredResults);

    if (input == "") {
      setSearchResults(query.data);
    } else {
      setSearchResults(filteredResults);
    }
  };

  useEffect(() => {
    if (!query.data && !coinSearchInput) return;

    setSearchResults(query.data);
  }, [query.data]);

  console.log("searchResults", searchResults);
  console.log("isLoading", query.isLoading);

  return (
    <Box bg="#1E1E1E">
      <Box bg="#1E1E1E" width="60%" justifyContent="Center">
        <InputGroup
          width="60%"
          height="40px"
          margin="0px 10px 10px 50px"
          alignItems="center"
        >
          <Input
            margin="50px 10px 10px 50px"
            height="40px"
            fontFamily="Arial"
            border="transparent"
            color="white"
            fontSize="25px"
            placeholder="Asset Tracker"
            _placeholder={{ opacity: "40%", color: "white" }}
            value={coinSearchInput}
            onChange={handleSearchInput}
          />
          <InputRightElement
            width="4.5rem"
            display="flex"
            justifyContent="space-between"
            
          >
            <Icon as={SearchIcon} color="grey" margin="40px 0px 0px 25px"/>
          </InputRightElement>
        </InputGroup>
      </Box>
      <ConnectButton client={client}
        connectButton={{
          style: {
            fontSize: "17px",
            fontFamily:"sans-serif",
            color: "#7f43a4",            
            backgroundColor: "#1E1E1E", 
            border: "1.5px solid",
            borderColor:"#7f43a4",
            position: "absolute",    
            top: "20px",            
            right: "50px",          
            height: "40px",         
            width: "10px",
            justifyContent: "center",
            alignItems: "center",  
          },
          label:"Connect"
        }} />
      <CoinTable
        coins={searchResults}
        setSortMethod={setSortMethod}
        setSortDirection={setSortDirection}
        sortDirection={sortDirection}
        sortMethod={sortMethod}
      />
    </Box>
  );
}
export default App;

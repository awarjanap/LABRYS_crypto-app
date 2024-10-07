import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import CoinComponent from "./CoinComponent";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

export type Coin = {
  cmc_rank: number;
  name: string;
  symbol: string;
  price: number;
  quote: {
    USD: {
      market_cap: number;
      price: number;
      percent_change_24h: number;
    };
  };
  slug: string;
};

const CoinTable = ({
  coins,
  setSortMethod,
  setSortDirection,
  sortDirection,
  sortMethod,
}: any) => {
  const rowStyle = {
    border: "0px",
    borderColor: "transparent",
    borderCollapse: "separate",
    borderSpacing: "0 0.5em",
    width: "90%",
  };
  console.log("coins", coins);

  const handleSort = (sortBy: string) => {
    setSortMethod(sortBy);
    if (sortDirection === "asc") {
      setSortDirection("desc");
      console.log(sortDirection);
    } else if (sortDirection === "desc") {
      setSortDirection("asc");
    } else {
      setSortDirection("asc");
    }
  };

  console.log(coins);
  return (
    <TableContainer>
      <Table
        variant="simple"
        bg="#1E1E1E"
        size="sm"
        m="20px 300px 0px 300px"
        sx={rowStyle}
      >
        <Thead>
          <Tr>
            <Th
              borderBottomColor="transparent"
              fontSize="13px"
              color="white"
              textAlign="left"
              padding="20px 0px 20px 50px"
            >
              #{" "}
              <IconButton
                bg="#1E1E1E"
                color={sortMethod === "market_cap" ? "#BC4FFF" : "#636363"}
                size="sm"
                aria-label="sortindex"
                _hover="#636363"
                icon={
                  sortMethod === "market_cap" && sortDirection === "asc" ? (
                    <TriangleUpIcon onClick={() => handleSort("market_cap")} />
                  ) : (
                    <TriangleDownIcon
                      onClick={() => handleSort("market_cap")}
                    />
                  )
                }
              />
            </Th>

            <Th
              borderBottomColor="transparent"
              colSpan={2}
              fontSize="13px"
              color="white"
              textAlign="left"
              padding="20px 10px 20px 30px"
            >
              Name{" "}
              <IconButton
                bg="#1E1E1E"
                color={sortMethod === "symbol" ? "#BC4FFF" : "#636363"}
                size="sm"
                aria-label="sortindex"
                _hover="#636363"
                icon={
                  sortMethod === "symbol" && sortDirection === "asc" ? (
                    <TriangleUpIcon onClick={() => handleSort("symbol")} />
                  ) : (
                    <TriangleDownIcon onClick={() => handleSort("symbol")} />
                  )
                }
              />
            </Th>

            <Th
              borderBottomColor="transparent"
              fontSize="13px"
              color="white"
              textAlign="center"
              padding="20px 10px 20px 10px"
            >
              Price{" "}
              <IconButton
                bg="#1E1E1E"
                color={sortMethod === "price" ? "#BC4FFF" : "#636363"}
                size="sm"
                aria-label="sortindex"
                _hover="#636363"
                icon={
                  sortMethod === "price" && sortDirection === "asc" ? (
                    <TriangleUpIcon onClick={() => handleSort("price")} />
                  ) : (
                    <TriangleDownIcon onClick={() => handleSort("price")} />
                  )
                }
              />
            </Th>

            <Th
              borderBottomColor="transparent"
              fontSize="13px"
              color="white"
              textAlign="center"
              padding="20px 10px 20px 10px"
            >
              24h %
              <IconButton
                bg="#1E1E1E"
                color={
                  sortMethod === "percent_change_24h" ? "#BC4FFF" : "#636363"
                }
                size="sm"
                aria-label="sortindex"
                _hover="#636363"
                icon={
                  sortMethod === "percent_change_24h" &&
                  sortDirection === "asc" ? (
                    <TriangleUpIcon
                      onClick={() => handleSort("percent_change_24h")}
                    />
                  ) : (
                    <TriangleDownIcon
                      onClick={() => handleSort("percent_change_24h")}
                    />
                  )
                }
              />
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {coins?.map((coinObject: Coin) => (
            <Tr key={coinObject.cmc_rank} sx={rowStyle}>
              <CoinComponent
                id={coinObject.cmc_rank}
                value={coinObject.quote.USD.market_cap}
                symbol={coinObject.symbol}
                price={coinObject.quote.USD.price.toString()}
                change={coinObject.quote.USD.percent_change_24h}
              />
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default CoinTable;

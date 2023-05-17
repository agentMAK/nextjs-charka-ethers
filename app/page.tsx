"use client";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState<string | undefined>(
    undefined
  );

  const requestAccount = async (): Promise<string[]> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts
  };

  const haveMetmask = () => {
    if (!window.ethereum) {
      console.log("Please install MetaMask");
      return false;
    }
    return true;
  };

  const onClickConnect = async () => {

    if (!haveMetmask()) {
      return;
    }

    try {
      const accounts = await requestAccount();

      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };


  return (
    <Box mt={"50px"} textAlign={"center"}>
      <Text fontWeight={"semibold"} mb={"20px"} fontSize={"24px"}>
        Testing Ethers
      </Text>
      <Button mb={"5px"} onClick={onClickConnect}>
        Connect Wallet
      </Button>
      <Text>Wallet Address: {currentAccount}</Text>
    </Box>
  );
}

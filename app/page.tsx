"use client";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";
import erc20abi from '../contracts/abis/erc20.abi.json'

export default function Home() {

  const usdcAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
  const testAddress = '0x8e4fD0a080818377ADEf093D99392813c3526298'

  const [currentAccount, setCurrentAccount] = useState<string | undefined>(
    undefined
  );

  const [balance, setBalance] = useState<string | undefined>(
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

  const readContractBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const erc20USDC = new ethers.Contract(usdcAddress, erc20abi, provider);
    const balance = await erc20USDC.balanceOf(testAddress);
    setBalance(balance.toString())
  }


  return (
    <Box mt={"50px"} textAlign={"center"}>
      <Text fontWeight={"semibold"} mb={"20px"} fontSize={"24px"}>
        Testing Ethers
      </Text>
      <Button mb={"5px"} onClick={onClickConnect}>
        Connect Wallet
      </Button>
      <Text>Wallet Address: {currentAccount}</Text>
      <Button mt={'40px'} mb={"5px"} onClick={readContractBalance}>
        Get USDC balance of test user (Ethereum)
      </Button>
      <Text>Balance: {balance}</Text>
    </Box>
  );
}

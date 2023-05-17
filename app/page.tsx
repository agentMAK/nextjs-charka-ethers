"use client";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";
import erc20abi from "../contracts/abis/erc20.abi.json";

export default function Home() {
  const usdcAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
  const testAddress = "0x53B043CA414F320923eb30F92EeD8443624DD0Fa";

  const [currentAccount, setCurrentAccount] = useState<string | undefined>(
    undefined
  );

  const [balance, setBalance] = useState<string | undefined>(undefined);

  const requestAccount = async (): Promise<string[]> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts;
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
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const erc20USDC = new ethers.Contract(usdcAddress, erc20abi, provider);
      const balance = await erc20USDC.balanceOf(testAddress);
      setBalance(balance.toString());
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const writeContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const erc20USDC = new ethers.Contract(usdcAddress, erc20abi, provider);
      const transaction = await erc20USDC
        .connect(signer)
        .transfer(testAddress, "0");

      await transaction.wait();

      console.log("Transaction successful");
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
      <Button mt={"40px"} mb={"5px"} onClick={readContractBalance}>
        Get USDC balance of test user (Polygon)
      </Button>
      <Text>Balance: {balance}</Text>
      <Button mt={"40px"} mb={"5px"} onClick={writeContract}>
        Send USDC (Ethereum)
      </Button>
    </Box>
  );
}

import { ethers, parseUnits } from "ethers";
import dotenv from "dotenv";
import * as readline from "readline";

dotenv.config();

const rui = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string) {
  return new Promise((resolve) => {
    rui.question(query, resolve);
  });
}

const privateKey = process.env.PRIVATE_KEY!;
const contractAddress = process.env.CONTRACT_ADDRESS!;
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(privateKey, provider);

const abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function transfer(address recipient, uint256 amount) returns (bool)",
  "function transferFrom(address sender, address recipient, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function mint(uint256 value) returns ()",
];

const erc20 = new ethers.Contract(contractAddress, abi, wallet);
async function main() {
  const name = await erc20.name();
  console.log("Token Name:", name);

  const symbol = await erc20.symbol();
  console.log("Token Symbol:", symbol);

  const decimals = await erc20.decimals();
  console.log("Token Decimals:", decimals);

  let totalSupply = await erc20.totalSupply();
  console.log(
    "Intitial Total Supply:",
    ethers.formatUnits(totalSupply, decimals),
  );

  let balance = await erc20.balanceOf(wallet.address);
  console.log("Initial Balance:", ethers.formatUnits(balance, decimals));

  // Mint some tokens to your wallet
  const mintAmount = parseUnits("1000", decimals);
  console.log(
    `Minting ${ethers.formatUnits(mintAmount, decimals)} ${symbol}...`,
  );

  try {
    const mintTx = await erc20.mint(mintAmount);
    await mintTx.wait();
    console.log("Minting successful!");

    // Check updated supply and balance
    totalSupply = await erc20.totalSupply();
    console.log(
      "Updated Total Supply:",
      ethers.formatUnits(totalSupply, decimals),
    );

    balance = await erc20.balanceOf(wallet.address);
    console.log("Updated Balance:", ethers.formatUnits(balance, decimals));

    // Continue with the transfer as before
    const recipient = await question("Enter recipient address: ");
    const amountStr = await question(`Enter amount of ${symbol} to send: `);
    const amount = parseUnits(amountStr as string, decimals);

    console.log(`Sending ${amountStr} ${symbol} to ${recipient}...`);

    const tx = await erc20.transfer(recipient, amount);
    await tx.wait();
    console.log("Transfer successful!");

    // Check final balance
    balance = await erc20.balanceOf(wallet.address);
    console.log("Final Balance:", ethers.formatUnits(balance, decimals));
  } catch (error) {
    console.error("Error during operation:", error);
  } finally {
    rui.close();
  }
}

main().catch(console.error);

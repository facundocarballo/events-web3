import Web3 from "web3"
import ERC20 from './ABI/ERC20.json';
import Events from './ABI/Events.json';
import { getEventsWithoutFilter, getDateFromTimestamp } from './events/common';
import { getAllEvents } from './events';
import { getAllEventsFromERC20 } from "./events/erc20";

const RPCs = {
    goerli: {
        rpc: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        id: 5
    },
    mainnet: {
        rpc: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        id: 1
    }
};

const Contract = require('web3-eth-contract');


export const Addresses = {
    events: "0x73622DCD889E8445BEb41f621aC47473D0A69979",
    usdt: "0xdAC17F958D2ee523a2206206994597C13D831ec7"
};


// Funcs of Smart Contract
export const loadDappData = async () => {
    await loadWeb3();

    Contract.setProvider(RPCs.goerli.rpc);
    const ContractEvents = new Contract(Events.output.abi, Addresses.events);
    Contract.setProvider(RPCs.mainnet.rpc);
    const ContractERC20 = new Contract(ERC20.output.abi, Addresses.usdt);


    const wallet = await ethereum.request({ method: 'eth_coinbase' });
    
    const value = await ContractEvents.methods.value().call();

    const currentBlock = await web3.eth.getBlockNumber();
    const fromBlock = currentBlock - 30000;

    const SmartContract_Events = await getAllEvents(ContractEvents, fromBlock, currentBlock, wallet);

    const ERC20_Events = await getAllEventsFromERC20(ContractERC20, currentBlock - 10, currentBlock, "USDT", wallet);

    const chainID = await window.web3.eth.getChainId();

    return {
        ContractEvents, ContractERC20,
        wallet, value,
        SmartContract_Events, ERC20_Events,
        chainID
    };

}

const getEventsFromERC20 = async (eventName, Contract, fromBlock, toBlock, msg, symbolToken) => {
    const events = await getEventsWithoutFilter(eventName, Contract, fromBlock, toBlock);
    let data = [];

    events.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);

        const amountWei = event.returnValues.amount;
        const amount = web3.utils.fromWei(String(amountWei), decimals);

        data.push({
            timestamp: block.timestamp,
            date: date,
            value: `${Number(amount).toFixed(2)} ${symbolToken}`,
            msg: msg
        });
    });
};

// Web3 Funcs

export const buildTransaciont = async (addressAccount, to, data) => {
    const nonce = await web3.eth.getTransactionCount(addressAccount);

    const estimateGas = await web3.eth.estimateGas({
        from: addressAccount,
        to: to,
        nonce: nonce,
        data: data
    });

    const gas_price = await web3.eth.getGasPrice();

    return {
        from: addressAccount,
        to: to,
        gas: web3.utils.toHex(estimateGas),
        gasPrice: web3.utils.toHex(gas_price),
        data: data
    };

}

export const loadWeb3 = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            // await ethereum.enable();
            // Acccounts now exposed
            await ethereum.request({ method: 'eth_requestAccounts' })
        } catch (error) {
            // User denied account access...
            console.log('Error: requiring browser wallet: ', error);
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */ });
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

};
import { getEventsWithoutFilter, getDateFromTimestamp, sortEvents, getEventsFilterByWallet } from "./common";

export const getAllEvents = async (Contract, fromBlock, toBlock, wallet) => {
    const increment_all = await getEvents("IncrementValue", Contract, fromBlock, toBlock, "Increment Value");
    const decrement_all = await getEvents("DecrementValue", Contract, fromBlock, toBlock, "Decrement Value");

    const all = sortEvents([increment_all, decrement_all]);

    const increment_filtered = await getFilteredEvents("IncrementValue", Contract, wallet, fromBlock, toBlock, "Increment Value");
    const decrement_filtered = await getFilteredEvents("DecrementValue", Contract, wallet, fromBlock, toBlock, "Decrement Value");

    const filtered = sortEvents([increment_filtered, decrement_filtered]);

    return { all, filtered }
};

const getFilteredEvents = async (eventName, Contract, wallet, fromBlock, toBlock, msg) => {
    const events = await getEventsFilterByWallet(eventName, Contract, wallet, fromBlock, toBlock);
    
    let data = [];

    for(let i = 0; i < events.length; i++) {
        const event = events[i];

        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);

        const wallet = event.returnValues.wallet;
        const previous_amount = event.returnValues.previous_amount;

        const amount = event.returnValues.amount;

        const obj = {
            timestamp: block.timestamp,
            wallet: wallet,
            date: date,
            value: amount,
            msg: msg
        }

        data.push(obj);
    }

    return data;
}

const getEvents = async (eventName, Contract, fromBlock, toBlock, msg) => {
    const events = await getEventsWithoutFilter(eventName, Contract, fromBlock, toBlock);
    
    let data = [];

    for(let i = 0; i < events.length; i++) {
        const event = events[i];

        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);

        const wallet = event.returnValues.wallet;
        const previous_amount = event.returnValues.previous_amount;

        const amount = event.returnValues.amount;

        const obj = {
            timestamp: block.timestamp,
            wallet: wallet,
            date: date,
            value: amount,
            msg: msg
        }

        data.push(obj);
    }

    return data;
};


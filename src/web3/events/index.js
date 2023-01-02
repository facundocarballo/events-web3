import { getEventsWithoutFilter, getDateFromTimestamp, sortEvents } from "./common";

export const getAllEvents = async (Contract, fromBlock, toBlock) => {
    const increment = await getEvents("IncrementValue", Contract, fromBlock, toBlock, "Increment Value");
    const decrement = await getEvents("DecrementValue", Contract, fromBlock, toBlock, "Decrement Value");

    const all = sortEvents([increment, decrement]);

    return {
        increment, decrement, all
    }
};

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


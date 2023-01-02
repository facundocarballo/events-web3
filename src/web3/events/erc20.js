import { getEventFilterByTo, getEventsFilterByFrom, getEventsWithoutFilter, sortEvents, getDateFromTimestamp } from './common';

const getAllTransferEvent = async (Contract, fromBlock, toBlock, symbolToken, decimals) => {
    const events = await getEventsWithoutFilter("Transfer", Contract, fromBlock, toBlock);
    let data = [];

    for(let i = 0; i < events.length; i++) {
        const event = events[i];
        
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);

        const from = event.returnValues.from;
        const to = event.returnValues.to;

        const amountWei = event.returnValues.value;
        const amount = web3.utils.fromWei(String(amountWei), decimals);

        data.push({
            timestamp: block.timestamp,
            date: date,
            from: from,
            to: to,
            value: `${Number(amount).toFixed(2)} ${symbolToken}`,
            msg: "Transfer"
        });
    }

    return data;
};

const getAllApproveEvent = async (Contract, fromBlock, toBlock, symbolToken, decimals) => {
    const events = await getEventsWithoutFilter("Approval", Contract, fromBlock, toBlock);
    let data = [];

    for (let i = 0; i < events.length; i++) {
        const event = events[i];

        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);

        const owner = event.returnValues.owner;
        const spender = event.returnValues.spender;

        const amountWei = event.returnValues.value;
        const amount = web3.utils.fromWei(String(amountWei), decimals);

        data.push({
            timestamp: block.timestamp,
            date: date,
            from: owner,
            to: spender,
            value: `${Number(amount).toFixed(2)} ${symbolToken}`,
            msg: "Approve"
        });
    }

    return data;
};

const getFilteredTransferEvent = async (Contract, wallet, fromBlock, toBlock, symbolToken, decimals ) => {
    const eventsFrom = await getEventsFilterByFrom("Transfer", Contract, wallet, fromBlock, toBlock);
    let data = [];

    for(let i = 0; i < eventsFrom.length; i++) {
        const event = eventsFrom[i];

        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);

        const from = event.returnValues.from;

        const to = event.returnValues.to;

        const amountWei = event.returnValues.value;
        const amount = web3.utils.fromWei(String(amountWei), decimals);

        data.push({
            timestamp: block.timestamp,
            date: date,
            from: from,
            to: to,
            value: `${Number(amount).toFixed(2)} ${symbolToken}`,
            msg: "Transfer"
        });
    }
    
    const eventsTo = await getEventFilterByTo("Transfer", Contract, wallet, fromBlock, toBlock);

    for(let i = 0; i < eventsTo.length; i++) {
        const event = eventsTo[i];

        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);

        const from = event.returnValues.from;
        const to = event.returnValues.to;

        const amountWei = event.returnValues.value;
        const amount = web3.utils.fromWei(String(amountWei), decimals);

        data.push({
            timestamp: block.timestamp,
            date: date,
            from: from,
            to: to,
            value: `${Number(amount).toFixed(2)} ${symbolToken}`,
            msg: "Transfer"
        });
    }

    return data;
};

const getFilteredApproveEvent = async (Contract, wallet, fromBlock, toBlock, symbolToken, decimals) => {
    const eventsFrom = await getEventsFilterByFrom("Approval", Contract, wallet, fromBlock, toBlock);
    let data = [];

    for(let i = 0; i < eventsFrom.length; i++) {
        const event = eventsFrom[i];

        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);

        const from = event.returnValues.owner;
        const to = event.returnValues.spender;

        const amountWei = event.returnValues.value;
        const amount = web3.utils.fromWei(String(amountWei), decimals);

        data.push({
            timestamp: block.timestamp,
            date: date,
            from: from,
            to: to,
            value: `${Number(amount).toFixed(2)} ${symbolToken}`,
            msg: "Approval"
        });
    }
    
    const eventsTo = await getEventFilterByTo("Approval", Contract, wallet, fromBlock, toBlock);

    for(let i = 0; i < eventsTo.length; i++) {
        const event = eventsTo[i];

        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);

        const from = event.returnValues.owner;
        const to = event.returnValues.spender;

        const amountWei = event.returnValues.value;
        const amount = web3.utils.fromWei(String(amountWei), decimals);

        data.push({
            timestamp: block.timestamp,
            date: date,
            from: from,
            to: to,
            value: `${Number(amount).toFixed(2)} ${symbolToken}`,
            msg: "Approval"
        });
    }

    return data;
};

export const getAllEventsFromERC20 = async (Contract, fromBlock, toBlock, symbolToken, wallet) => {
    const transfer_all = await getAllTransferEvent(Contract, fromBlock, toBlock, symbolToken, "ether");
    const approval_all = await getAllApproveEvent(Contract, fromBlock, toBlock, symbolToken, "ether");

    const all = sortEvents([transfer_all, approval_all]);

    const transfer_filtered = await getFilteredTransferEvent(Contract, wallet, fromBlock, toBlock, symbolToken, "ether");
    const approve_filtered = await getFilteredApproveEvent(Contract, wallet, fromBlock, toBlock, symbolToken, "ether");

    const filtered = sortEvents([transfer_filtered, approve_filtered]);

    return { all, filtered };
};
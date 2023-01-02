import { getEventsWithoutFilter, sortEvents } from './common';

const getTransferEvent = async (Contract, fromBlock, toBlock, symbolToken, decimals) => {
    const events = await getEventsWithoutFilter("Transfer", Contract, fromBlock, toBlock);
    let data = [];

    events.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);

        const from = event.returnValues.from;
        const to = event.returnValues.to;

        const amountWei = event.returnValues.amount;
        const amount = web3.utils.fromWei(String(amountWei), decimals);

        data.push({
            timestamp: block.timestamp,
            date: date,
            from: from,
            to: to,
            value: `${Number(amount).toFixed(2)} ${symbolToken}`
        });
    });

    return data;
};

const getApproveEvent = async (Contract, fromBlock, toBlock, symbolToken, decimals) => {
    const events = await getEventsWithoutFilter("Approval", Contract, fromBlock, toBlock);
    let data = [];

    events.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);

        const owner = event.returnValues.owner;
        const spender = event.returnValues.spender;

        const amountWei = event.returnValues.amount;
        const amount = web3.utils.fromWei(String(amountWei), decimals);

        data.push({
            timestamp: block.timestamp,
            date: date,
            owner: owner,
            spender: spender,
            value: `${Number(amount).toFixed(2)} ${symbolToken}`
        });
    });

    return data;
};

export const getAllEventsFromERC20 = async (Contract, fromBlock, toBlock, symbolToken) => {
    const transfer = await getTransferEvent(Contract, fromBlock, toBlock, symbolToken, "ether");
    const approval = await getApproveEvent(Contract, fromBlock, toBlock, symbolToken, "ether");

    const all = sortEvents([transfer, approval]);

    return {
        transfer, approval, all
    }
};
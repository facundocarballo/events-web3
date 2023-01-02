export const getEventsFilterByWallet = async (eventName, Contract, addressAccount, fromBlock, toBlock) => {
    const eventInfo = await Contract.getPastEvents(eventName, {
        filter: {
            wallet: addressAccount
        },
        fromBlock: fromBlock,
        toBlock: toBlock
    });
    return eventInfo;
}

export const getEventsWithoutFilter = async (eventName, Contract, fromBlock, toBlock) => {
    const eventInfo = await Contract.getPastEvents(eventName, {
        fromBlock: fromBlock,
        toBlock: toBlock
    });
    return eventInfo;
}
export const getHourFromTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = (date.getHours() < 10 ? `0${date.getHours()}` : date.getHours());
    const minutes = (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes());
    const seconds = (date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
}

export const getDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate());
    const month = (date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1);
    return `${day}-${month}-${date.getFullYear()}`;
}

export const getEventFilterByTo = async (eventName, Contract, addressAccount, fromBlock, toBlock) => {
    const eventInfo = await Contract.getPastEvents(eventName, {
        filter: {
            to: addressAccount
        },
        fromBlock: fromBlock,
        toBlock: toBlock
    });
    return eventInfo;
}

export const sortEvents = (events) => {
    let arr = new Array();
    
    for (let i = 0; i < events.length; i++) {
        for (let j = 0; j < events[i].length; j++) {
            arr.push(events[i][j]);
        }
    }

    arr.sort((a, b) => b.timestamp - a.timestamp);

    return arr;
}
import React from "react";
import { loadDappData } from "./web3/funcs";

const DappContext = React.createContext(null);


export const DappProvider = (props) => {
    const [wallet, setWallet] = React.useState(null);
    const [ContractEvents, setContractEvents] = React.useState(null);
    const [ContractERC20, setContractERC20] = React.useState(null);
    const [value, setValue] = React.useState(null);
    const [isContractEvents, setIsContractEvents] = React.useState(true);
    const [Events, setEvents] = React.useState(null);
    const [ERC20_Events, setERC20_Events] = React.useState(null);

    const setAllValues = async () => {
        const data = await loadDappData();
        setWallet(data.wallet);
        setContractEvents(data.ContractEvents);
        setContractERC20(data.ContractERC20);
        setValue(data.value);
        setEvents(data.SmartContract_Events);
        setERC20_Events(data.ERC20_Events);
    };

    const values = {
        wallet, ContractEvents,
        ContractERC20, value,
        setAllValues,
        isContractEvents, setIsContractEvents,
        Events, ERC20_Events
    };

    return <DappContext.Provider value={values} {...props} />;

};

export const useProvider = () => {
    const context = React.useContext(DappContext);
    if (!context) throw new Error("useProvider has to be inside of the provider");
    return context;
  };
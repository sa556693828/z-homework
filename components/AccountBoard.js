import { useAccount, useBalance } from "wagmi";

const AccountBoard = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const balance = useBalance({
    addressOrName: address
  });

  return (
    <div>
      <h2>AccountInfo</h2>

      {!isConnecting && !isDisconnected && <h4>Account: {address}</h4>}
      <button onClick={() => console.log("balance", balance.data)}>
        balance
      </button>
      <button onClick={() => console.log("address", address)}>address</button>
      {balance.data && (
        <h4>
          {balance.data.formatted} {balance.data.symbol}
        </h4>
      )}
    </div>
  );
};

export { AccountBoard };

import {
  useContractWrite,
  useContractRead,
  useAccount,
  useContractEvent,
  useNetwork,
  useSwitchNetwork
} from "wagmi";

import { useEffect, useState } from "react";

export function Contract() {
  const [input, setInput] = useState("");
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const { write, status } = useContractWrite({
    addressOrName: "0xB4C890925F4b11206b83d516F7853d831B0e3507",
    contractInterface: ["function newMsg(string memory str)"],
    functionName: "newMsg",
    args: [input],
    chainId: 5
  });
  // console.log("data", data);
  const { data, refetch } = useContractRead({
    addressOrName: "0xB4C890925F4b11206b83d516F7853d831B0e3507",
    contractInterface: [
      "function showLastestMsg(uint256 len, address user) public view returns (string[] memory)"
    ],
    functionName: "showLastestMsg",
    args: ["5", address],
    chainId: 5
  });
  useContractEvent({
    addressOrName: "0xB4C890925F4b11206b83d516F7853d831B0e3507",
    contractInterface: ["event newMessage(address user, string message)"],
    eventName: "newMessage",
    listener: (event) => {
      console.log("Event");
      refetch();
    },
    once: true
  });

  useEffect(() => {
    if (chain?.id !== 5) {
      switchNetwork?.(5);
    }
  }, [chain, switchNetwork]);

  return (
    <>
      <div>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
        ></input>
        <button
          onClick={() => {
            write();
          }}
        >
          Send
        </button>
        <br />
        <span style={{ color: "grey" }}>Tx Status: {status}</span>
        <br />
        <span style={{ color: "grey" }}>current Chain: {chain?.network}</span>
      </div>
      <h3>My messages:</h3>
      {data && <pre>&gt; {data.join("\r\n> ")}</pre>}
    </>
  );
}

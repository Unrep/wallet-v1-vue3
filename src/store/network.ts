import { defineStore } from "pinia";
import { computed, type Ref } from "vue";
import { useStorage } from "@vueuse/core";

type EthereumNetworkName = "goerli" | "mainnet";
type ZkNetworkName = "goerli" | "goerli-beta" | "mainnet";

export const ethereumNetworks: {
  id: number;
  name: EthereumNetworkName;
  label: string;
  rpc_url: string;
  explorer: string;
}[] = [
  {
    id: 1,
    name: "mainnet",
    label: "Ethereum Mainnet",
    rpc_url: `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_KEY}`,
    explorer: "https://etherscan.io/",
  },
  {
    id: 5,
    name: "goerli",
    label: "Ethereum Goerli Testnet",
    rpc_url: `https://goerli.infura.io/v3/${import.meta.env.VITE_INFURA_KEY}`,
    explorer: "https://goerli.etherscan.io/",
  },
];
export const zkSyncNetworks: {
  name: ZkNetworkName;
  ethereumNetwork: EthereumNetworkName;
  label: string;
  explorer: string;
  api: string;
}[] = [
  {
    name: "mainnet",
    label: "Mainnet",
    ethereumNetwork: "mainnet",
    api: "https://api.zksync.io/api/v0.2/",
    explorer: "https://zkscan.io/",
  },
  {
    name: "goerli",
    label: "Goerli Testnet",
    ethereumNetwork: "goerli",
    api: "https://goerli-api.zksync.io/api/v0.2/",
    explorer: "https://goerli.zkscan.io/",
  },
  {
    name: "goerli-beta",
    label: "Goerli Beta Testnet",
    ethereumNetwork: "goerli",
    api: "https://goerli-beta-api.zksync.dev/api/v0.2/",
    explorer: "https://goerli-beta-scan.zksync.dev/",
  },
];

export default defineStore("network", () => {
  const zkNetworkName = useStorage("network", "mainnet") as Ref<ZkNetworkName>;

  const selectedNetwork = computed(() => {
    return zkSyncNetworks.find((e) => e.name === zkNetworkName.value) || zkSyncNetworks[0];
  });
  const selectedEthereumNetwork = computed(() => {
    return ethereumNetworks.find((e) => e.name === selectedNetwork.value.name) || ethereumNetworks[0];
  });

  const isMainnet = computed(() => {
    return selectedNetwork.value.name === "mainnet";
  });

  function setNetwork(networkName: ZkNetworkName) {
    zkNetworkName.value = networkName;
  }

  return {
    selectedNetwork,
    selectedEthereumNetwork,
    isMainnet,
    setNetwork,
  };
});

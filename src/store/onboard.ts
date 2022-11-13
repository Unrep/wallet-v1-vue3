import { defineStore, storeToRefs } from "pinia";
import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import useNetwork, { ethereumNetworks } from "./network";
import { ethers } from "ethers";
import { getDefaultProvider, Wallet } from "zksync";
import { getCREATE2AddressAndSalt } from "zksync/build/utils";
import { ref } from "vue";
import useWallet from "./wallet";

export default defineStore("onboard", () => {
  const { selectedNetwork } = storeToRefs(useNetwork());
  const { createWallet } = useWallet();

  const onboard = Onboard({
    wallets: [injectedModule()],
    chains: ethereumNetworks.map((network) => ({
      id: "0x" + network.id.toString(16),
      token: "ETH",
      label: network.label,
      rpcUrl: network.rpc_url,
    })),
    appMetadata: {
      name: "zkSync",
      // eslint-disable-next-line quotes
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M389.998 194.021L282.202 79.042V163.247L175.169 247.557L282.202 247.635V309.001L389.998 194.021Z" fill="#4E529A"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.0015 193.979L117.798 308.958L117.798 225.431L224.831 140.443L117.798 140.365L117.798 78.9999L10.0015 193.979Z" fill="#8C8DFC"/></svg>`,
      logo: "/images/logo.svg",
      description: "zkSync Wallet",
      gettingStartedGuide: "https://docs.zksync.io/userdocs/",
      explore: "https://zksync.io/",
      recommendedInjectedWallets: [{ name: "MetaMask", url: "https://metamask.io" }],
    },
    accountCenter: {
      desktop: {
        enabled: false,
      },
      mobile: {
        enabled: false,
      },
    },
  });
  let ethersProvider = undefined;

  async function login(walletName?: string) {
    if (!onboard.state.get().wallets.length) {
      await onboard!.connectWallet(
        walletName
          ? {
              autoSelect: { label: walletName, disableModals: true },
            }
          : undefined
      );
    }
    const wallet = onboard!.state.get().wallets[0];
    if (!wallet) {
      return;
    }
    console.log("Logged in with", wallet);
    console.log("Account", wallet.accounts[0]);

    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, "any");

    createWallet(ethersProvider);
  }

  return {
    ethersProvider,
    login,
  };
});

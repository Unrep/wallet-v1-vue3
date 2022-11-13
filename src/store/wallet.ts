import { defineStore, storeToRefs } from "pinia";
import { ethers } from "ethers";
import { getDefaultRestProvider, RestProvider, Wallet } from "zksync";
import { computed, ref } from "vue";
import useNetwork from "./network";
import type { AccountState, ExtendedTokens } from "zksync/build/types";

export default defineStore("wallet", () => {
  const { selectedNetwork } = storeToRefs(useNetwork());

  const address = ref<string | undefined>(undefined);
  const tokens = ref<ExtendedTokens | undefined>(undefined);
  const accountState = ref<AccountState | undefined>(undefined);

  let syncProvider: RestProvider | undefined = undefined;
  let syncWallet: Wallet | undefined = undefined;

  async function createWallet(ethersProvider: ethers.providers.Web3Provider) {
    const signer = ethersProvider.getSigner();

    syncProvider = await getDefaultRestProvider(selectedNetwork.value.name);
    syncWallet = await Wallet.fromEthSignerNoKeys(signer, syncProvider);
    address.value = syncWallet.address();

    requestTokens();
    requestAccountState();
  }

  async function requestAccountState() {
    if (!syncWallet) return;

    accountState.value = await syncWallet.getAccountState();
  }

  async function requestTokens() {
    tokens.value = await syncProvider?.getTokens();
  }

  return {
    address,
    balances: computed(() => {
      if (!accountState.value) return undefined;

      return Object.fromEntries(
        Object.entries(accountState.value.committed.balances).map(([key, balance]) => {
          const formatted_balance = ethers.utils.formatUnits(balance, tokens.value![key].decimals);
          return [key, formatted_balance];
        })
      );
    }),
    tokens,
    createWallet,
    isLoggedIn: computed(() => !!address.value),
  };
});

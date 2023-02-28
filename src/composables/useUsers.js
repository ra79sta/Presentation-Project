import { computed } from "vue";
import { useRouter } from "vue-router";

const useUsers = (store, ethereumService, router = useRouter()) => {
  const getNftsForAddress = (address) => store.dispatch("users/getNftsForAddress", address)
    const disconnect = async () => {
      await store.dispatch("users/resetState");
      return await router.push("/");
    };
    const handleAccountChange = async (account) => {
      console.log(
        `Account changed: ${account}`,
        `Please, sign the transaction on Metamask to continue.`,
        "Success"
      );
      await disconnect();
      await loginOrSignUp(true);
    };
    const handleChainChange = async (chain) => {
      chain === "Selected network is not supported."
        ? console.log("Network not supported", chain, "Error")
        : console.log("Network changed", chain, "Success");
      let publicAddress = await store.dispatch("users/fetchAddress");
      await store.dispatch("users/fetchNetwork");
      await store.dispatch("users/fetchNetworkName");
      await store.dispatch("users/fetchBalance", publicAddress);
    };
    const loginOrSignUp = async (isAccountChange = false) => {
     await ethereumService.connectToProvider();
      if (!isAccountChange) {
        await ethereumService.onAccountChanged(handleAccountChange);
      }
      await ethereumService.onChainChanged(handleChainChange);
      await store.dispatch("users/fetchNetwork");
      await store.dispatch("users/fetchNetworkName");
      let publicAddress = await store.dispatch("users/fetchAddress");
      await store.dispatch("users/fetchBalance", publicAddress);
      let nonce = publicAddress;
      const signature = await store.dispatch("users/signNonce", nonce);
      if (signature) {
        getNftsForAddress(address.value)
      }
      if (signature === undefined) {
        console.log(
          "MetaMask error",
          "Please, sign the message to access the advanced features of the application.",
          "Error"
        );
        return disconnect();
      }
    };
  
    const address = computed(() => store.getters["users/getByKey"]("address"));
    const balance = computed(() => store.getters["users/getByKey"]("balance"));
    const network = computed(() => store.getters["users/getByKey"]("network"));
    const networkName = computed(() => store.getters["users/getByKey"]("networkName"));
    const userNfts = computed(() => store.getters["users/getByKey"]("userNfts"));
    return {
      disconnect,
      loginOrSignUp,
      getNftsForAddress,
      handleChainChange,
      handleAccountChange,
      userNfts,
      address,
      balance,
      network,
      networkName,
    };
  };
  
  export default useUsers;
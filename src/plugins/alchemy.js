import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
    apiKey: "v7_BzVSPs2m6OBXeduVUyl5eg0TrxXtt",
    network: Network.MATIC_MUMBAI,
};
const alchemy = new Alchemy(settings);

export default alchemy;
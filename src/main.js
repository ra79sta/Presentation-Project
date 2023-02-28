import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import EthereumService from "./services/ethereum";

import './assets/styles/base.scss'

const app = createApp(App)
.use(store)
.use(router);

const CHAIN_ID = 1;
export const ethereumService = new EthereumService(CHAIN_ID);

app.provide("ethereumService", ethereumService);

app.mount('#app')

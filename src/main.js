import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from "pinia";

import Button from './components/common/IconButton.vue';
import TextInput from './components/common/TextInput.vue';
import Icon from './components/common/Icon.vue';

const app = createApp(App);
const pinia = createPinia();

app.component('IconButton', Button);
app.component('TextInput', TextInput);
app.component('Icon', Icon);

app.use(pinia);
app.mount('#app');

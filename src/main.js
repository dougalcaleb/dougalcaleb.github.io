import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Button from './components/common/Button.vue';
import TextInput from './components/common/TextInput.vue';

const app = createApp(App);

app.component('IconButton', Button);
app.component('TextInput', TextInput);

app.mount('#app');

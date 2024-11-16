import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Button from './components/common/IconButton.vue';
import TextInput from './components/common/TextInput.vue';
import Icon from './components/common/Icon.vue';

const app = createApp(App);

app.component('IconButton', Button);
app.component('TextInput', TextInput);
app.component('Icon', Icon);

app.mount('#app');

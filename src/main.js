import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Button from './components/common/Button.vue';
// import Checkbox from './components/common/Checkbox.vue';
// import TextInput from './components/common/TextInput.vue';
// import Toggle from './components/common/Toggle.vue';

const app = createApp(App);

app.component('Button', Button);
// app.component('Checkbox', Checkbox);
// app.component('TextInput', TextInput);
// app.component('Toggle', Toggle);

app.mount('#app');

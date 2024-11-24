<template>
	<div class="bg-gray-9 dark:bg-gray-1 flex items-center">
		<label 
			v-if="leftText"
			class="text-sm font-title font-bold text-gray-4 dark:text-gray-7 pl-4 mt-px text-md text-nowrap" 
			@click="$refs['input'].focus()">
			{{ leftText }}
		</label>
		<textarea 
			v-if="textarea"
			:value="modelValue"
			:placeholder="placeholder" 
			:class="['bg-gray-9 dark:bg-gray-1 p-4 outline-none text-gray-4 dark:text-white font-body text-md w-full', resize ? 'resize-y' : 'resize-none', {'lightmode_textarea': !isDarkTheme}]" 
			:maxlength="maxlength"
			:rows="rows"
			:type="inputType"
			:name="inputName"
			ref="input"
			@input="handleInput"
			:disabled="disabled"
		></textarea>
		<input 
			v-else
			:value="modelValue"
			:type="inputType" 
			:name="inputName"
			:placeholder="placeholder" 
			class="bg-gray-9 dark:bg-gray-1 p-4 outline-none text-gray-4 dark:text-white font-body text-md w-full" 
			:maxlength="maxlength"
			ref="input"
			@input="handleInput"
			:disabled="disabled"
		>
	</div>
</template>

<script>
import ColorTheme from '../mixins/ColorTheme';

export default {
	mixins: [ColorTheme],
	components: {
		
	},
	props: {
		modelValue: {
			type: String,
			default: "",
		},
		placeholder: {
			type: String,
			default: "",
		},
		leftText: {
			type: String,
			default: "",
		},
		maxlength: {
			type: Number,
			default: 100,
		},
		textarea: {
			type: Boolean,
			default: false,
		},
		resize: {
			type: Boolean,
			default: false,
		},
		rows: {
			type: Number,
			default: 4,
		},
		inputType: {
			type: String,
			default: "text"
		},
		inputName: String,
		disabled: Boolean
	},
	emits: ["update:modelValue"],
	data() {
		return {
			
		}
	},
	computed: {
		
	},
	methods: {
		handleInput(event) {
			this.$emit("update:modelValue", event.target.value);
		}
	}
}
</script>

<style scoped>
.lightmode_textarea::placeholder {
	@apply text-gray-4;
}
</style>

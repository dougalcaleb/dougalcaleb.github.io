<template>
	<div class="bg-gray-1 flex items-center">
		<label 
			v-if="leftText"
			class="text-sm font-title font-bold text-gray-7 pl-4 mt-px text-md text-nowrap" 
			@click="$refs['input'].focus()">
			{{ leftText }}
		</label>
		<textarea 
			v-if="textarea"
			:value="modelValue"
			:placeholder="placeholder" 
			:class="['bg-gray-1 p-4 outline-none text-white font-body text-md w-full', resize ? 'resize-y' : 'resize-none']" 
			:maxlength="maxlength"
			:rows="rows"
			ref="input"
			@input="handleInput"
		></textarea>
		<input 
			v-else
			:value="modelValue"
			type="text" 
			:placeholder="placeholder" 
			class="bg-gray-1 p-4 outline-none text-white font-body text-md w-full" 
			:maxlength="maxlength"
			ref="input"
			@input="handleInput"
		>
	</div>
</template>

<script>
export default {
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

</style>

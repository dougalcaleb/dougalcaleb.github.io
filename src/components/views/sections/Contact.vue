<template>
	<div 
		class="w-full h-max relative left-0 dark:bg-gray-3 bg-white px-8 sm:pl-32 sm:pr-12 pb-8 sm:pb-0 pt-8 sm:pt-20"	
	>

		<h1 class="font-title text-2xl sm:px-0 sm:text-4xl dark:text-white text-gray-1 font-bold" id="contact_header">CONTACT</h1>

		<div class="sm:px-4 py-8">
			<div class="bg-gray-9 dark:bg-gray-1 flex items-center">
				<label 
					class="text-sm font-title font-bold text-gray-4 dark:text-gray-7 pl-4 mt-px text-md text-nowrap">
					Send to:
				</label>
				<div 
					class="bg-purple-1 text-white font-body py-2 px-4 m-2 ml-4 rounded-full"
					@click="copyAddress"
				>{{ addressText }}</div>
				<Icon 
					v-if="!isMobile"
					:icon="this.copySuccess ? 'fa/checkmark' : 'fa/copy'" 
					class="text-white cursor-pointer hover:text-purple-5 transition duration-100" 
					:size="5"  
					@click="copyAddress" 
				/>
			</div>

			<form id="mail-form" action="https://formspree.io/f/xjvjbkbo" method="POST">
				<TextInput leftText="Reply to:" class="my-2" inputType="email" inputName="email" />
				<TextInput leftText="Subject:" class="my-2" inputType="text" inputName="subject" />
				<TextInput textarea placeholder="Message" :maxlength="3000" :rows="6" class="my-2" inputType="text" inputName="message" />
			</form>

			<IconButton variant="action" class="my-4" @click="submitForm">Send</IconButton>
			
			<a :href="`mail${aParts[0]}:${aParts[1]}${aParts[2]}@${aParts[3]}.com`" class="flex w-max">
				<IconButton icon="fa/external">Open in your mail client</IconButton>
			</a>
		</div>
		
	</div>
</template>

<script>
import Icon from '../../common/Icon.vue';
import IconButton from '../../common/IconButton.vue';
import TextInput from '../../common/TextInput.vue';
import ScreenSize from '../../mixins/ScreenSize';

export default {
	mixins: [ScreenSize],
	components: {
		TextInput,
		IconButton,
		Icon,
	},
	props: {
		
	},
	data() {
		return {
			aParts: ['to', 'dougal', 'caleb', 'gmail'],
			copySuccess: false
		}
	},
	computed: {
		addressText() {
			if (!this.isMobile || (this.isMobile && !this.copySuccess)) {
				return `${this.aParts[1]}${this.aParts[2]}@${this.aParts[3]}.com`;
			} else if (this.isMobile && this.copySuccess) {
				return 'Copied!';
			}
		}
	},
	methods: {
		copyAddress() {
			const email = `${this.aParts[1]}${this.aParts[2]}@${this.aParts[3]}.com`;
            navigator.clipboard.writeText(email).then(() => {
				this.copySuccess = true;
				setTimeout(() => {
					this.copySuccess = false;
				}, 900)
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
		},
		submitForm() {
			document.getElementById('mail-form').submit();
		}
	}
}
</script>

<style scoped>

</style>

import { defaultStore } from "@/components/state/store";
import { mapStores } from "pinia";

export default {
	computed: {
		...mapStores(defaultStore),
	},
};

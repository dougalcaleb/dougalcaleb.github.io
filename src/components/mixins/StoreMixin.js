import { defaultStore } from "../state/store";
import { mapStores } from "pinia";

export default {
	computed: {
		...mapStores(defaultStore),
	}
}
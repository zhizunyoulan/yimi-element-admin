export default {
    props: {
        value: {
            type: Object,
            default: () => undefined,
        },
        useFor: {
            type: String,
            default: "add", // add edit display
        },
    },
    data() {
        return {
            model: undefined,
        };
    },
    watch: {
        model(model) {
            this.$emit("input", model);
        },
    },
    created() {
        this.model = this.value;
    },
}
export default {
    data() {
        return {
            panelIsVisible: false,
            buttIsVisible: true,
            errorMessageIsVisible: false,
        }
    },
    methods: {
        showErrorMessage() {
            this.errorMessageIsVisible = true;
        },
        changePic(task) {
            if(task)
            if(task.type !== "Important") task.picSrc = '/images/imp_chosen.png'
        },
        restorePic(task) {
            if(task.type !== "Important") task.picSrc = "/images/imp_not_chosen.png";
        },
    }
}
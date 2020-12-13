new Vue({
    el: "#app",
    store,
    methods: {
        add: function(){
            let name = document.getElementById("txt").value;
            this.$store.commit("addInit", name);
            this.$store.dispatch("add");
        },
        upd: function() {
            let id = document.getElementById("select_u").value;
            let name = document.getElementById("txt2").value;
            this.$store.commit("updInit", { id: id, name: name });
            this.$store.dispatch("upd");
        },
        del: function() {
            let id = document.getElementById("select_d").value;
            this.$store.commit("delInit", id);
            this.$store.dispatch("del");
        }
    },
    computed: {
        wharray: function() {
            return this.$store.getters.getWarehouses;
        } 
    },
    created: function(){
        this.$store.dispatch("loadWarehouses");
    }
});
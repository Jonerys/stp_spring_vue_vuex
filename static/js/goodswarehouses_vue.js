new Vue({
    el: "#app",
    store,
    methods: {
        add: function(){
            let name = document.getElementById("select_a").value;
            this.$store.commit("addInit", name);
            this.$store.dispatch("add");
        },
        upd: function(){
            let name1 = document.getElementById("select_uold").value;
            let name2 = document.getElementById("select_unew").value;
            this.$store.commit("updInit", { nameOld: name1, nameNew: name2 });
            this.$store.dispatch("upd");
        },
        del: function(){
            let name = document.getElementById("select_d").value;
            this.$store.commit("delInit", name);
            this.$store.dispatch("del");
        }
    },
    computed: {
        curgdarray: function(){
            return this.$store.getters.getСurGoods;
        },
        gdarray: function(){
            return this.$store.getters.getGoods;
        }
    },
    created: function(){
        this.$store.dispatch("loadCurGoods");
        this.$store.dispatch("loadGoods");
    }
});
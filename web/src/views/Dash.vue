<template>
    <div class="dash">
        <v-toolbar id="toolbar" fixed>

            <a id="ref" href="/#/">
                <v-img id="logo" :src="require('@/assets/img/logo.png')"/>
            </a>

            <v-spacer ></v-spacer>

            <v-toolbar-items>
                <v-btn
                        text
                        dark
                        class="toolbar"
                        color="#FFFFFF"
                        to="/transaction">
                    transacción
                </v-btn>
            </v-toolbar-items>

            <v-toolbar-items>
                <v-btn
                        text
                        dark
                        class="toolbar"
                        color="#FFFFFF"
                        to="/wallets">
                    carteras
                </v-btn>
            </v-toolbar-items>

        </v-toolbar>

        <router-view/>
    </div>
</template>

<script>


export default {
    data() {
        return {
        }
    }
}
</script>



<style>

.toolbar {
    color: white;
}

#toolbar {
    background:rgb(20, 116, 129);
    font-family: "Futur";
}

#ref {
    padding: 0 1%;
    background: rgb(20, 116, 129);
    max-width: 70px;
    max-height: 100%;
}

#logo {
    max-width: 5%;
    min-width: 70px;
    max-height: auto;
}

/* Extra small devices (480px and down) */
@media only screen and (max-width: 600px) {

    body {
        font-size: 80%;
    }

}


/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {

    body {
        font-size: 90%;
    }

} 

/* normal devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 960px) {

    body {
        font-size: 100%;
    }

} 

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1264px) {

    body {
        font-size: 110%;
    }

}

@media only screen and (min-width: 1904px) {

    body {
        font-size: 120%;
    }

}


</style>

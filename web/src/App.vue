<template>
  <v-app>
    <div id="app">
      <router-view></router-view>
    </div>
  </v-app>
</template>

<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/

@font-face{
    font-family:"Futur";
    src:url("./assets/typography/futura/futur.eot?#iefix");
    src:url("./assets/typography/futura/futur.eot?#iefix") format("eot");
    src:url("./assets/typography/futura/futur.woff") format("woff");
    src:url("./assets/typography/futura/futur.otf") format("opentype");
    /*src:url("./assets/typography/futura/futur.ttf") format("truetype");*/
}

@font-face{
    font-family:"HelveticaNeue";
    src:url("./assets/typography/helveticaNeue/HelveticaNeue.eot?#iefix");
    src:url("./assets/typography/helveticaNeue/HelveticaNeue.eot?#iefix") format("eot"),
    url("./assets/typography/helveticaNeue/HelveticaNeue.woff") format("woff"),
    url("./assets/typography/helveticaNeue/HelveticaNeue.otf") format("opentype"),
    url("./assets/typography/helveticaNeue/HelveticaNeue.ttf") format("truetype");
}

body {
    font-family: "HelveticaNeue";
}

.helveticaNeue {
    font-family: "HelveticaNeue";
}

.futura {
    font-family: "Futur";
}

.titleCard {
    background-color: #0f1c41;
    color: white;
}

#bold {
    font-weight: bolder;
}

</style>

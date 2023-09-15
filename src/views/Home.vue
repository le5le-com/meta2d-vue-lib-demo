
<template>
  <div class="Home">
    <meta2d-vue  name="test">
      <template v-slot:menuOps>
        <div>
        hello
        </div>
      </template>
      <template v-slot:project>
        <div>
          <Project></Project>
        </div>
      </template>
    </meta2d-vue>
  </div>
</template>

<script lang="js" setup>
import Project from "./Project.vue";
</script>
<style>
.Home {
  height: 100vh;
  position: relative;
}
.editor{
    width: 100vw;
  }
  .Meta2dCanvas{
    flex: 1;
  }
  #meta2d{
    height: 80vh;
  }
</style>

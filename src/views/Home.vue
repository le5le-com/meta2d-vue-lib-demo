
<template>
  <div class="Home">
    <meta2d-vue >
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
</style>

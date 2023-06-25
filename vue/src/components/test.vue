<template>
    
</template>
<script lang="ts">
import Vue from 'vue'
import {ref,onMounted, onUnmounted } from 'vue'

function testttt(){
  const x = ref(0)

  const updateMouse = (e: MouseEvent) => {
    x.value = meta2d.store.active.length
    console.log(x.value);
  }

  onMounted(() => {
    document.addEventListener('click', updateMouse)
  })
  onUnmounted(() => {
    document.removeEventListener('click', updateMouse)
  })

 
  return {x}
}
export default testttt;

</script>
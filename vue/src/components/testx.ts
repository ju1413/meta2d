import {ref,onMounted, onUnmounted } from 'vue'

export function testttt(){
  const x = ref(0)

  const updateMouse = (e: MouseEvent) => {
   const x = meta2d.store.active.length
    console.log(x);
  }

  onMounted(() => {
    document.addEventListener('click', updateMouse)
  })
  onUnmounted(() => {
    document.removeEventListener('click', updateMouse)
  })
 
  return {x}
}
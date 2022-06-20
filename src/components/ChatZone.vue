<template>
<div class="zone">
    <pop-quiz v-if="!isAdmin"/>
    <control v-if="isAdmin" control/>
    <chat />
</div>
</template>

<script>
import Chat from "./inner/Chat"
import PopQuiz from "./inner/PopQuiz"
import Control from "./inner/Control"
import {useStore} from 'vuex'
import { toRef} from '@vue/reactivity'

export default {
  name: 'ChatZone',
  props: {
    
  }, components: {
      Chat,PopQuiz,Control
  },
  setup(){
    let store = useStore();
    let isAdmin = toRef(store.state, "isAdmin");
    return{
      isAdmin
    }
  }
}
</script>

<style lang="less" scoped>
    .zone{
    height: 30%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
</style>
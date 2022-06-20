<template>
  <div v-if="show" class="bg-area">
    <div class="f-area">
      <div class="login-area box">
        <div class="title">登陆</div>
        <form action="" v-on:submit.prevent="Login">
          <div class="up">
            <input
              type="number"
              class="uid"
              placeholder="请输入您的uid"
              v-model="uid"
            />
            <p class="info">
              uid将作为加分的依据，没有uid的朋友可以留空或输入-1。
            </p>
          </div>
          <div class="down">
            <input
              type="text"
              class="text"
              placeholder="请输入您聊天时的昵称"
              v-model="name"
            />
            <button class="btn">{{ btnType }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, ref, toRefs, watch } from "vue";
export default {
  name: "Login",
  props: {},
  components: {},
  setup() {
    let store = useStore();
    let user = reactive({
      uid: "",
      name: "",
    });
    let btnType = ref("登陆");
    let show = ref(store.state.user.type == -1? true:false);
    watch(
      user,
      () => {
        if (user.uid != "") {
          btnType.value = "登陆";
        } else {
          btnType.value = "内鬼登陆";
        }
      },
      { immediate: true }
    );

    function Login() {
      if (user.name.trim() == "") {
        alert("昵称不能为空");
        return;
      }
      if (user.name.length > 14) {
        alert("请讲昵称控制在14个字符之内。");
        user.name = "";
        return;
      }
      let _user = user;
      store.dispatch("setUser",_user).then(
        res => {
          if(res == 1){
            show.value = false;
          }
        }
      );

    }
    return { Login, ...toRefs(user), btnType,show };
  },
};
</script>

<style lang="less" scoped>
.bg-area {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999;
  display: flex;
  align-content: center;
  justify-content: center;
}
.f-area {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-area {
  width: 600px;
  height: 400px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  .title {
    font-size: 40px;
    font-weight: bold;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  form {
    //background-color: tomato;
    height: 200px;
    // display: flex;
    // align-items: center;
    // flex-direction: column;
    // justify-content: space-evenly;
    .up,
    .down {
      margin-top: 40px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      //background-color: tomato;
      width: 100%;
    }
  }
  .info {
    width: 180px;
    //background-color: turquoise;
    box-sizing: border-box;
    margin-left: 30px;
  }
  .uid {
    width: 160px;
  }
  input {
    //background-color: turquoise;
    width: 240px;
    height: 40px;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
  }

  .btn {
    cursor: pointer;
    user-select: none;
    font-size: 20px;
    width: 120px;
    height: 46px;
    margin-left: 20px;
  }
}
</style>
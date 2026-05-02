<!--承德市交通运行监测调度中心项目-登录页面-->
<template>
  <div class="login-page">
    <HeaderPage title="承德市交通运行监测调度中心"></HeaderPage>
    <div class="login-view">
      <div class="login-content">
        <div class="login-title">用户登录</div>
        <q-form dark ref="ruleFormRef" class="login-content-form" @submit="onSignIn">
          <div class="input-item">
            <div class="input-item-content">
              <div class="input-content">
                <div class="row items-center fill-height">
                  <div class="col-auto"><q-icon name="img:icons/cdsgl/login/用户名.svg" class="input-icon"></q-icon></div>
                  <div class="col-2">
                    <div class="input-title">用户名</div>
                  </div>
                  <div class="col">
                    <el-input class="input-box" v-model="state.ruleForm.username" placeholder="请输入用户名" />
                  </div>
                </div>
              </div>
            </div>
            <div class="input-error" v-if="state.showError.username">请输入用户名</div>
          </div>
          <div class="input-item">
            <div class="input-item-content">
              <div class="input-content">
                <div class="row items-center fill-height">
                  <div class="col-auto"><q-icon name="img:icons/cdsgl/login/密码.svg" class="input-icon"></q-icon></div>
                  <div class="col-2">
                    <div class="input-title">密码</div>
                  </div>
                  <div class="col">
                    <el-input class="input-box" v-model="state.ruleForm.password" placeholder="请输入密码" type="password"
                      show-password />
                  </div>
                </div>
              </div>
            </div>
            <div class="input-error" v-if="state.showError.password">请输入密码</div>
          </div>
          <div class="input-item">
            <div class="input-item-content">
              <div class="input-content">
                <div class="row items-center fill-height">
                  <div class="col-auto"><q-icon name="img:icons/cdsgl/login/保护.svg" class="input-icon"></q-icon></div>
                  <div class="col-2">
                    <div class="input-title">验证码</div>
                  </div>
                  <div class="col">
                    <el-input class="input-box" v-model="state.ruleForm.authCode" placeholder="验证码" />
                  </div>
                  <div class="col">
                    <div class="identify-content">
                      <Sidentify :identifyCode="identifyCode" @click="refreshCode"></Sidentify>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="input-error" v-if="state.showError.authCode">验证码不正确</div>
          </div>
          <div class="check-view">
            <div class="check-content">
              <div class="row items-center">
                <div class="col">
                  <el-checkbox v-model="state.remember" class="remember-me" label="记住我" />
                </div>
                <div class="col">
                  <div>忘记密码?</div>
                </div>
              </div>
            </div>
          </div>
          <q-btn flat type="submit" class="submit-btn" label="登录" />
          <q-inner-loading dark color="primary" :showing="state.loading" label="登录中..." label-class="text-white"
            label-style="font-size:11px;" />
        </q-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="loginPage">
import { reactive, ref, defineAsyncComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Session } from "src/utils/storage";
import { Notify } from "quasar";
const state = reactive({
  ruleForm: {
    tenant: "",
    username: "",
    password: "",
    authCode: "",
    client_id: "basic-web",
    client_secret: "1q2w3e*",
    grant_type: "password",
    scope: "WebAppGateway SystemService BusinessService",
  },
  remember: false,
  showError: {
    username: false,
    password: false,
    authCode: false,
  },
  loading: false,
});

const Sidentify = defineAsyncComponent(
  () => import("components/SIdentify.vue")
);
const HeaderPage = defineAsyncComponent(
  () => import("./models/HeaderPage.vue")
);
// 图形验证码
let identifyCodes = "1234567890";
let identifyCode = ref("3212");
const ruleFormRef = ref();
const router = useRouter();

/**登录 */
const onSignIn = async () => {
  if (state.ruleForm.username === "" || state.ruleForm.username === null) {
    state.showError.username = true;
  } else {
    state.showError.username = false;
  }
  if (state.ruleForm.password === "" || state.ruleForm.password === null) {
    state.showError.password = true;
  } else {
    state.showError.password = false;
  }
  if (state.ruleForm.authCode === "" || state.ruleForm.authCode === null) {
    state.showError.authCode = true;
  } else {
    if (state.ruleForm.authCode !== identifyCode.value) {
      state.showError.authCode = true;
    } else {
      state.showError.authCode = false;
    }
  }
  //判断是否都验证通过
  if (
    state.showError.username ||
    state.showError.authCode ||
    state.showError.password
  ) {
    return;
  } else {
    ruleFormRef.value.validate().then(async () => {
      state.loading = true;
      var signature = btoa(state.ruleForm.username + state.ruleForm.password);
      // console.log(signature)
      // 账号密码签名认证
      if (
        signature == "Y2R0b2Njckg5IWpSNX1iQTJA"
      ) {
        Session.set("loginToken", signature);
        router.push("/IntroPage");
      } else {
        Notify.create({
          type: "info",
          position: "top",
          message: "用户名或密码错误，请联系系统管理员！",
          timeout: 2000,
        });
        router.push("/");
      }
      state.loading = false;
    });
  }
};

const randomNum = (min: any, max: any) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const makeCode = (o: any, l: any) => {
  for (let i = 0; i < l; i++) {
    identifyCode.value += o[randomNum(0, o.length)];
  }
};

const refreshCode = () => {
  identifyCode.value = "";
  makeCode(identifyCodes, 4);
};
onMounted(() => {
  identifyCode.value = "";
  makeCode(identifyCodes, 4);
});
</script>
<style scoped>
.login-page {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url("assets/image/cdsgl/login/背景3328x1092.png");
  background-size: 100% 100%;
  pointer-events: all;
}

.login-view {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  height: 100%;
  /* 使div的高度为视口高度 */
}

.login-content {
  width: 1480px;
  height: 1130px;
  background-image: url("assets/image/cdsgl/login/登录框.png");
  background-size: 100% 100%;
}

.login-title {
  width: 100%;
  height: 130px;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: bold;
  font-size: 56px;
  line-height: 130px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: linear-gradient(90deg, #ffffff 0%, #5fb2ff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.login-content-form {
  width: 100%;
  height: 998px;
  padding: 96px 332px 0 314px;
}

.input-item {
  position: relative;
  width: 100%;
  height: 186px;
  padding: 0 0 60px 0;
}

.input-item-content {
  width: 100%;
  height: 100%;
  padding-top: 24px;
  background-image: url("assets/image/cdsgl/login/输入框.png");
  background-size: 100% 100%;
}

.input-item-content2 {
  width: 100%;
  height: 100%;
}

.input-content {
  width: 100%;
  height: 100%;
}

.input-icon {
  width: 40px;
  height: 40px;
  padding: 0 0 8px 134px;
}

.input-title {
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: 400;
  font-size: 32px;
  color: #ffffff;
  line-height: 44px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.input-box {
  width: 100%;
  height: 100px;
  caret-color: aqua;
}

.input-box :deep(.el-input__password) {
  font-size: 45px;
}

.input-item :deep(.el-input__wrapper) {
  background: none;
  box-shadow: none;
  padding: 0px 20px;
}

.input-item :deep(.el-input__inner) {
  height: 100%;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: 400;
  font-size: 36px;
  color: #b6dcff;
  line-height: 100px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.input-error {
  position: absolute;
  top: 48px;
  right: -270px;
  font-size: 36px;
  font-weight: bold;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  color: red;
}

.identify-content {
  width: 100%;
  height: 100px;
}

.check-view {
  padding: 0 0 42px 32px;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: 400;
  font-size: 32px;
  color: #2d6bde;
  line-height: 38px;
  text-align: right;
  font-style: normal;
  text-transform: none;
}

.remember-me {
  width: 100%;
  height: 40px;
}

/* 背景透明 */
.remember-me :deep(.el-checkbox__inner) {
  background: transparent;
  border: 1px solid #3f8cff;
}

/* 选中样式 */
.remember-me :deep(.el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner) {
  background: #3f8cff;
  border: 1px solid #3f8cff;
}

/* 大小 */
.remember-me :deep(.el-checkbox__inner) {
  width: 40px;
  height: 40px;
}

/**文字 */
.remember-me :deep(.el-checkbox__label) {
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: 400;
  font-size: 32px;
  color: #2d6bde;
}

/* 对勾样式 */
.remember-me :deep(.el-checkbox__inner::after) {
  border: 8px solid #fff;
  border-left: 0;
  border-top: 0;
  left: 9px;
  top: 0;
  width: 10px;
  height: 25px;
}

.remember-me :deep(.el-checkbox__input.is-checked .el-checkbox__inner::after) {
  transform: rotate(45deg) scaleY(0.8);
}

.submit-btn {
  width: 100%;
  height: 120px;
  font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
  font-weight: 500;
  font-size: 44px;
  color: #ffffff;
  line-height: 62px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  transform: skew(-25deg);
  background: #2d6bde;
}

.submit-btn :deep(.block) {
  transform: skew(25deg);
}
</style>
<style>
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-text-fill-color: #ededed !important;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
  background-color: transparent;
  background-image: none;
  transition: background-color 50000s ease-in-out 0s;
}

input {
  background-color: transparent;
}
</style>

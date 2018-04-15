<template>
  <el-main>
    <el-row :type="'flex'">
      <el-col :span="8">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="Login" prop="userLogin">
            <el-input v-model="form.userLogin"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="userPassword">
            <el-input v-model="form.userPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="text">Sign up</el-button>
            <el-button type="primary" @click="onSubmit('form')">Sign in</el-button>
            <span v-if="incorrect">Incorrect login or password!!!</span>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {
  data () {
    return {
      form: { 
        userLogin: "",
        userPassword: ""
      },
      rules: {
        userLogin: [
          {required: true, trigger: blur}
        ],
        userPassword: [
          {required: true, trigger: blur}
        ]
      },
      incorrect: false
    }
  },
  
  methods: {
    onSubmit(form){
      this.$refs[form].validate(async (valid) => {
          if (valid) {
            try {
              let resp = await this.$http.post("https://reb-sandbox.sdk.finance/api/v1/authorization", {   
                login : this.form.userLogin,
                password : this.form.userPassword
              });
              this.$cookie.set("token", resp.body.authorizationToken.token, resp.body.authorizationToken.expiresAt);
              this.$router.replace("/list");
            } catch (err) {
              console.log(err);
              this.incorrect = true;
            }
          } else {
            return false;
          }
      });
    },
  }

}
</script>

<style scoped>
.el-row {
  height: 100%;
  justify-content: center;
  align-items: center;
}

.el-main {
  padding: 0;
  height: 90%;
}

.el-container {
  height: 200px;
}

.el-col-12 {
  text-align: right;
  margin-right: 5px;
}

.button-row {
  justify-content: flex-end;
  padding-right: 5px;
}

label {
  padding-right: 15px;
}
</style>

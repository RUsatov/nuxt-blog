<template>
  <el-form @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form">
    <h2>Создать пользователя</h2>
    <el-form-item label="Логин" prop="login">
      <el-input v-model.trim="controls.login" />
    </el-form-item>

    <el-form-item label="Пароль" prop="password">
      <el-input v-model="controls.password" type="password" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" round native-type="submit" :loading="loading">Создать</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["admin-auth"],
  data() {
    return {
      loading: false,
      controls: {
        login: "",
        password: ""
      },
      rules: {
        login: [
          {
            required: true,
            message: "Введите имя пользователя",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Введите пароль",
            trigger: "blur"
          },
          {
            min: 6,
            message: "Пароль должен не менее 6 символов",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true;

          try {
            // Формируем логин и пароль
            const formData = {
              login: this.controls.login,
              password: this.controls.password
            };

            // Дожидаемся пока всё отправится при помощи await
            await this.$store.dispatch("auth/createUser", formData);
            this.$message.success('Пользователь успешно добавлен');
            this.controls.login = '';
            this.controls.password = '';
            this.loading = false

          } catch (e) {
            this.loading = false;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  form {
    width: 600px;
  }
</style>
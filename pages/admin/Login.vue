<template>
  <el-card shadow="always" :style="{width: '500px'}">
    <el-form @submit.native.prevent="onSubmit" :model="controls" :rules="rules" ref="form">
      <h2>Войти</h2>
      <el-form-item label="Логин" prop="login">
        <el-input v-model.trim="controls.login" />
      </el-form-item>

      <el-form-item label="Пароль" prop="password">
        <el-input v-model="controls.password" type="password" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" round native-type="submit" :loading="loading">Войти</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  layout: "empty",
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
  mounted () {
    const {message} = this.$route.query

    switch (message) {
      case 'login':
        this.$message.info('Для доступа войдите в систему')
        break;
      case 'logout':
        this.$message.success('Вы вышли из системы')
        break;
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true

          try {
            // Формируем логин и пароль
            const formData = {
              login: this.controls.login,
              password: this.controls.password
            }

            // Дожидаемся пока всё отправится при помощи await
            await this.$store.dispatch('auth/login', formData)
            // После чего переходим в админку (если всё ок)
            this.$router.push('/admin')

          } catch (e) {
            this.loading = false
          }
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
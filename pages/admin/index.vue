<template>
  <div>Welcome to Admin Page</div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["admin-auth"]
};
</script>

<style lang="scss" scoped>
</style>
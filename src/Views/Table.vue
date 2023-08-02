<template>
  <v-responsive class="table-page-container">
    <v-container>
      <div class="header-container d-flex justify-space-between pt-5">
        <h2>This is Table</h2>
        <v-btn class="create-btn">Create a New Table</v-btn>
      </div>
    </v-container>
  </v-responsive>
</template>
<script>
export default {
  name: "Table",
};
</script>
<style scoped>
.table-page-container {
  min-height: 100vh;
  background-color: #faf3dc;
}
.create-btn {
  color: rgb(26, 21, 13);
  background-color: #f99d52;
}
</style>
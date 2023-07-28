<template>
  <v-container>
    <v-row>
      <v-col>Employee List</v-col>

      <v-col class="d-flex justify-end"
        ><v-btn @click="$router.push('/admin/add-employee')"
          >Create New</v-btn
        ></v-col
      >
    </v-row>
  </v-container>
  <v-data-table
    elevation="12"
    v-model:page="page"
    :headers="headers"
    :items="employees"
    :items-per-page="itemsPerPage"
    hide-default-footer
    class="elevation-1 table"
  >
    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
        <v-text-field
          :model-value="itemsPerPage"
          class="pa-2"
          label="Items per page"
          type="number"
          min="-1"
          max="15"
          hide-details
          @update:model-value="itemsPerPage = parseInt($event, 10)"
        ></v-text-field>
      </div>
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: "EmployeeList",
  data() {
    return {
      page: 1,
      headers: [
        {
          align: "start",
          key: "name",
          sortable: false,
          title: "Employee Name",
        },
        { title: "Joining Date", key: "joinDate" },
        { title: "Designation", key: "designation" },
      ],
      employees: [],
      itemsPerPage: 10,
      pageCount: 0,
    };
  },
};
</script>
<style scoped>
.table {
  width: 90%;
  margin: auto;
}
</style>
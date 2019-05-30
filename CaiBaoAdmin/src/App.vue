<template>
  <v-app>
    <core-filter />
    <core-toolbar />
    <core-drawer />
    <core-view />
  </v-app>
</template>

<style lang="scss">
@import '@/styles/index.scss';
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>

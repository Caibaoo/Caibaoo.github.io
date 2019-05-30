<template>
  <v-menu
    :close-on-content-click="false"
    bottom
    left
    min-width="300"
    max-width="300"
    nudge-left="12"
    offset-x
    transition="slide-y-transition">
    <v-btn
      slot="activator"
      class="elevation-0"
      color="grey"
      dark
      fab
      fixed
      style="top: 96px;"
      top>
      <v-icon>mdi-settings</v-icon>
    </v-btn>
    <v-card>
      <v-container grid-list-xl>
        <v-layout wrap>
          <v-flex xs12>
            <div class="text-xs-center body-2 text-uppercase sidebar-filter">按钮颜色</div>
            <v-layout justify-center>
              <v-avatar
                v-for="c in colors"
                :key="c"
                :class="[c === color ? 'color-active color-' + c: 'color-' + c]"
                size="23"
                @click="setColor(c)"/>
            </v-layout>
            <v-divider class="mt-3"/>
          </v-flex>
          <v-flex
            xs12>
            <div class="text-xs-center body-2 text-uppercase sidebar-filter">背景图片</div>
          </v-flex>
          <v-flex
            v-for="img in images"
            :key="img"
            xs3>
            <v-img
              :class="[image === img ? 'image-active' : '']"
              :src="img"
              height="120"
              @click.native="setImage(img)"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-menu>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  data: () => ({
    colors: [
      'primary',
      'info',
      'success',
      'warning',
      'danger'
    ],
    images: [
      'http://106.14.205.124/img/admin/adminBG1.jpg',
      'http://106.14.205.124/img/admin/adminBG2.jpg',
      'http://106.14.205.124/img/admin/adminBG3.jpg',
      'http://106.14.205.124/img/admin/adminBG4.jpg'
    ]
  }),

  computed: {
    ...mapState('app', ['image', 'color']),
    color () {
      return this.$store.state.app.color
    }
  },

  methods: {
    ...mapMutations('app', ['setImage']),
    setColor (color) {
      this.$store.state.app.color = color
    }
  }
}
</script>

<style lang="scss">
  .v-avatar,
  .v-responsive {
    cursor: pointer;
  }
</style>

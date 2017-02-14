<script>
/* eslint-env browser */

export default {
  name: 'redbin',
  props: ['errors'],
  methods: {
    redden(symbol) {
      if (symbol.errors < 3) return 'light-red';
      if (symbol.errors < 5) return 'moderate-red';
      if (symbol.errors < 8) return 'red';
      return 'heavy-red';
    },
  },
};
</script>

<template>
  <div class="redbin">
    <span :class="redden(symbol)" v-for="symbol in errors">{{ symbol.sym }}</span>
  </div>
</template>

<style>
.redbin {
  margin: auto;
  background-color: antiquewhite;
  font-size: 3vh;
}

.heavy-red {
  background-color: red;
}

.red {
  background-color: #ff4242;
}

.moderate-red {
  background-color: #ff6363;
}

.light-red {
  background-color: #ffa5a5;
}
</style>

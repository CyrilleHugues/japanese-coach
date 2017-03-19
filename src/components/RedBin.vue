<script>
/* eslint-env browser */

export default {
  name: 'redbin',
  props: ['errors'],
  methods: {
    redden(symbol) {
      if (symbol.errors <= 0) return '';
      if (symbol.errors > 0 && symbol.errors < 3) return 'light-red';
      if (symbol.errors < 5) return 'moderate-red';
      if (symbol.errors < 8) return 'red';
      return 'heavy-red';
    },
  },
};
</script>

<template>
  <div class="redbin">
    <span :class="redden(symbol)" v-for="symbol in errors">
      {{ symbol.sym }}
      <div class="tooltip">{{ symbol.tra }}</div>
    </span>
  </div>
</template>

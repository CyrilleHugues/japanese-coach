<script>
import symbolList from './providers/hiragana.json';

export default {
  name: 'app',
  data() {
    return {
      index: 0,
      symbols: symbolList,
    };
  },
  computed: {
    symbol() { return this.symbols[this.index]; },
  },
  methods: {
    nextSymbol() {
      this.index = (this.index === this.symbols.length - 1) ? 0 : this.index + 1;
    },
  },
};
</script>

<template>
  <div id="app">
    <div>
      <h1>Hiragana Flash-Cards</h1>
      <div class="cards">
        <transition name="swipe">
          <div class="flash-card" @click="nextSymbol" :key="index">
            <span>{{ symbol.sym }}</span>
            <span>{{ symbol.tra }}</span>
          </div>
        </transition>
      </div>
    <div>
  </div>
</template>

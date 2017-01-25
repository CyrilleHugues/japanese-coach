<script>
/* eslint-env browser */
import SymbolProvider from './providers/SymbolProvider';

export default {
  name: 'app',
  data() {
    return {
      symbol: SymbolProvider.getNextSymbol(),
      guess: '',
      currentError: false,
    };
  },
  mounted() {
    document.querySelector('.game-container input').focus();
  },
  methods: {
    validate() {
      const valid = SymbolProvider.validateInput(this.symbol, this.guess, this.currentError);
      if (valid) {
        this.symbol = SymbolProvider.getNextSymbol();
      } else {
        this.currentError = true;
      }
    },
  },
};
</script>

<template>
  <div id="app">
    <h1>What is this ?</h1>
    <div class="game-container">
      <div class="min cards">
        <transition name="swipe">
          <div class="min flash-card" :key="symbol.tra">
            <span>{{ symbol.sym }}</span>
          </div>
        </transition>
      </div>
      <form class="response" @submit.prevent="validate">
        <input :class="{errored: currentError}" type="text" v-model="guess"/>
      </form>
    </div>
  </div>
</template>

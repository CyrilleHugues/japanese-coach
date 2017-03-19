<script>
/* eslint-env browser */
import SymbolProvider from './providers/SymbolProvider';
import RedBin from './components/RedBin';

export default {
  name: 'app',
  components: {
    redbin: RedBin,
  },
  data() {
    return {
      symbol: SymbolProvider.getNextSymbol(),
      guess: '',
      errors: [],
      currentStatus: 'correct',
    };
  },
  mounted() {
    document.querySelector('.game-container input').focus();
  },
  methods: {
    validate() {
      const valid = SymbolProvider.validateInput(this.symbol, this.guess);
      if (valid) {
        this.currentStatus = 'correct';
      } else {
        this.currentStatus = 'errored';
        this.errors = SymbolProvider.getErrors();
      }
      this.guess = '';
      this.symbol = SymbolProvider.getNextSymbol();
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
          <div class="min flash-card" :class="{currentStatus}" :key="symbol.tra">
            <span>{{ symbol.sym }}</span>
          </div>
        </transition>
      </div>
      <form class="response" @submit.prevent="validate">
        <input type="text" v-model="guess"/>
      </form>
    </div>
    <redbin :errors="errors"></redbin>
  </div>
</template>

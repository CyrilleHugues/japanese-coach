import { find, sampleSize } from 'lodash';
import hiragana from './hiragana.json';

const symbols = hiragana.map(symbol => ({
  sym: symbol.sym,
  tra: symbol.tra,
  asked: 0,
  errors: 0,
}));

const errors = [];

const getSymbolScore = symbol => symbol.asked - symbol.errors;

const getNextSymbol = () => {
  const subset = sampleSize(symbols, 5);
  const bestSymbol = subset.reduce((choosen, symbol) => (
    (getSymbolScore(choosen) > getSymbolScore(symbol)) ? symbol : choosen
  ), subset[0]);
  bestSymbol.asked += 1;
  return bestSymbol;
};

const addError = (symbol) => {
  // add error to symbol
  const erroredSymbol = find(symbols, s => s.sym === symbol.sym);
  erroredSymbol.errors += 1;

  // add error to the precomputed list
  const existingError = find(errors, s => s.sym === symbol.sym);
  if (existingError) return;
  errors.push(symbol);
};

const validateInput = (symbol, guess, currentError = false) => {
  if (symbol.tra !== guess) {
    if (!currentError) addError(symbol);
    return false;
  }
  return true;
};

const getErrors = () => errors.sort((s1, s2) => (s2.errors / s2.asked) - (s1.errors / s1.asked));

module.exports = {
  getNextSymbol,
  validateInput,
  getErrors,
};

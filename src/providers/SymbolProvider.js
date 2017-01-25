import { find, sampleSize } from 'lodash';
import hiragana from './hiragana.json';

const symbols = hiragana.map(symbol => ({
  sym: symbol.sym,
  tra: symbol.tra,
  asked: 0,
  errors: 0,
}));

const getSymbolScore = symbol => symbol.asked - symbol.errors;

const getNextSymbol = () => {
  const subset = sampleSize(symbols, 5);
  const bestSymbol = subset.reduce((choosen, symbol) => (
    (getSymbolScore(choosen) > getSymbolScore(symbol)) ? symbol : choosen
  ), subset[0]);
  bestSymbol.asked += 1;
  return bestSymbol;
};

const validateInput = (symbol, guess, currentError = false) => {
  if (symbol.tra !== guess) {
    const erroredSymbol = find(symbols, s => s.sym === symbol.sym);
    erroredSymbol.errors += currentError ? 0 : 1;
    return false;
  }
  return true;
};

const getErrors = () => {
  const erroredSymbols = symbols.filter(symbol => symbol.errors > 0);
  return erroredSymbols.sort((a, b) => b.errors - a.errors);
};

module.exports = {
  getNextSymbol,
  getErrors,
  validateInput,
};

import { sampleSize } from 'lodash';
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

module.exports = {
  getNextSymbol,
};

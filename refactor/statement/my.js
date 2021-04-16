
const invoice = require('./invoices.json')
const plays = require('./plays.json')
const tragedyCalc = (thisAmount, audience) => {
  thisAmount = 40000;
  if (audience > 30) {
    thisAmount += 1000 * (audience - 30);
  }
  return thisAmount
}
const comedyCalc = (thisAmount, audience) => {

  thisAmount = 30000;
  if (audience > 20) {
    thisAmount += 10000 + 500 * (audience - 20);
  }
  thisAmount += 300 * audience;
  return thisAmount
}
const typeFunc = {
  tragedy: tragedyCalc,
  comedy: comedyCalc
}
function statement (invoice, plays) {
  const { customer, performances } = invoice
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format;

  for (let perf of performances) {
    const play = plays[perf.playID];
    const { audience, } = perf
    const { name, type } = play
    let thisAmount = 0;
    // add volume credits 

    volumeCredits += Math.max(audience - 30, 0);
    const calcFunc = typeFunc[play.type]
    thisAmount = calcFunc(thisAmount, audience)
    // add extra credit for every ten comedy attendees 
    if ("comedy" === type) volumeCredits += Math.floor(audience / 5);
    // print line for this order 
    result += ` ${name}: ${format(thisAmount / 100)} (${audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`; return result;
}


console.log(statement(invoice, plays));

// Statement for BigCo 
// Hamlet: $650.00 (55 seats)
// As You Like It: $580.00 (35 seats)
// Othello: $500.00 (40 seats)
// Amount owed is $1,730.00
// You earned 47 credits
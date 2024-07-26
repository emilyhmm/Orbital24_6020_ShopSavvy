export function createComparator(condition) {
  console.log(condition);
  return function (a, b) {
    if (condition === "prices") {
      let priceA = parseFloat(a.price.replace(/[^0-9.]/g, "")); // Removes everything except digits and period
      let priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
      console.log(priceA);
      console.log(priceB);
      return priceA - priceB;
    }
    if (condition === "sales") {
      let soldA = parseInt(a.sold.replace(/,/g, ""), 10);
      let soldB = parseInt(b.sold.replace(/,/g, ""), 10);
      return parseInt(soldB) - parseInt(soldA);
    }
    if (condition === "ratings") {
      return parseInt(b.rating) - parseInt(a.rating);
    }

    return 0; //if there is a tie, next condition would be used
  };
}

export function sortProductsByQuizResults(products, quizResults) {
  if (!Array.isArray(quizResults) || quizResults.length === 0) {
    return products;
  }

  let reversedCopy = quizResults.slice();
  console.log("initial");
  console.log(products);
  let results = products.slice();
  let condition = Object.values(reversedCopy[0])[0];

  results = results.sort(createComparator(condition));
  console.log(results);

  console.log(quizResults);

  console.log(results);
  return results;
}

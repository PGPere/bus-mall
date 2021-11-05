'use strict'

// Global variables:
const myContainer = document.querySelector('section');
const myButton = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
const results = document.querySelector('ul');

let allProducts = [];
let clicks = 0;
let noRepeats = [];
let productSet = [];
const clicksAllowed = 15;

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `images/${name}.${fileExtension}`;
  this.likes = 0;
  this.views = 0;
  allProducts.push(this);
}

new Product('sweep','png');
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

function selectRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProduct() {

  while (productSet.length < 6) {
    let ranNum = selectRandomProduct();
    if (!productSet.includes(ranNum)) {
      productSet.push(ranNum);
    }
  }

  let product1 = productSet.shift();
  let product2 = productSet.shift();
  let product3 = productSet.shift();

  image1.src = allProducts[product1].src;
  image1.alt = allProducts[product1].name;
  allProducts[product1].views++;
  image2.src = allProducts[product2].src;
  image2.alt = allProducts[product2].name;
  allProducts[product2].views++;   
  image3.src = allProducts[product3].src;
  image3.alt = allProducts[product3].name;
  allProducts[product3].views++;

  }

function handleProductClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image');
  }
  clicks++;
  let clickedProduct = event.target.alt;
  // array method .includes()
  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].likes++;
      break;
    }
  }
  renderProduct();
  if (clicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleProductClick);
    renderChart();
  }
}

function renderChart() {
  let productNames = [];
  let productLikes = [];
  let productViews = [];
  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name);
    productLikes.push(allProducts[i].likes);
    productViews.push(allProducts[i].views);
  }
  // console.log(ProductLikes);

  const data = {
    labels: productNames,
    datasets: [{
      label: 'Likes',
      data: productLikes,
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)'
      ],
      borderColor: [
        'rgb(255, 99, 132)'
      ],
      borderWidth: 1
    },
    {
      label: 'Views',
      data: productViews,
      backgroundColor: [
        'rgba(255, 159, 64, 0.8)'
      ],
      borderColor: [
        'rgb(255, 159, 64)'
      ],
      borderWidth: 1
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  let canvasChart = document.getElementById('myChart');
  const myChart = new Chart(canvasChart,config);
}

renderProduct();

myContainer.addEventListener('click', handleProductClick);
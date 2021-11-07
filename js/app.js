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
// let fileExtension = 'jpg'
const clicksAllowed = 5;

function Product(name,likes,views,fileExtension = 'jpg') {
  this.name = name;
  this.src = `images/${name}.${fileExtension}`;
  this.likes = likes;
  this.views = views;
  this.fileExtension = fileExtension;
  // allProducts.push(this);
}

function makeAProduct(name, likes, views, fileExtension) {
  // run the product through the product constructor
  let ProductObj = new Product(name, likes, views, fileExtension);
  // push the new Drink instance to the drink array
  allProducts.push(ProductObj);
  // render that drink as an LI
  // ProductObj.renderChart();
  console.log(allProducts.length);
}

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

  console.log(allProducts);

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

// put produucts in storage

function storeProducts() {
  // "product" is our KEY
  // turn my array into a string
  console.log(allProducts);
  let stringifiedProducts = JSON.stringify(allProducts);
  console.log(stringifiedProducts);
  // put my string in local storage
  localStorage.setItem('product', stringifiedProducts);
}


// get product out of storage

function getProducts() {
  // check if I have product in storage
  let potentialProducts = localStorage.getItem('product');
  // if I do, do something with them
  console.log(potentialProducts);
  if (potentialProducts) {
    let parsedProducts = JSON.parse(potentialProducts);
    // run the parsed products back through the constructor function
    // this is called REINSTANITATE
    for (let product of parsedProducts) {
    // product.name for sweep is sweep  
      let name = product.name;
      let likes = product.likes;
      let views = product.views;
      let fileExtension = product.fileExtension;
      makeAProduct(name,likes,views,fileExtension);
    }
  }
}
  makeAProduct('sweep',0,0,'png');
  makeAProduct('bag',0,0);
  makeAProduct('banana',0,0);
  makeAProduct('bathroom',0,0);
  makeAProduct('boots',0,0);
  makeAProduct('breakfast',0,0);
  makeAProduct('bubblegum',0,0);
  makeAProduct('chair',0,0);
  makeAProduct('cthulhu',0,0);
  makeAProduct('dog-duck',0,0);
  makeAProduct('dragon',0,0);
  makeAProduct('pen',0,0);
  makeAProduct('pet-sweep',0,0);
  makeAProduct('scissors',0,0);
  makeAProduct('shark',0,0);
  makeAProduct('tauntaun',0,0);
  makeAProduct('unicorn',0,0);
  makeAProduct('water-can',0,0);
  makeAProduct('wine-glass',0,0);

console.log(allProducts);
storeProducts();



//------------Handling the event--------------//

function handleProductClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image');
  }
  clicks++;
  let clickedProduct = event.target.alt;
  
  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].likes++;
      break;
    }
  }
  storeProducts();
  // renderProduct();
  // storeProducts();

  if (clicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleProductClick);
    renderChart();
  }
  getProducts();
  // storeProducts();
}
// getProducts();
//------------render Chart--------------//

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

  Chart.defaults.font.size = 24;

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
function currency(price) {
  return '$'.concat(price.toFixed(2));
}

function addItem(index) {
  var item = this.items[index];
  var foundInCart = -1;

  for (var i = 0; i < this.cart.length && foundInCart === -1; i++) {
    if (this.cart[i].id === item.id) {
      foundInCart = i;
    }
  }
  if (foundInCart === -1) {
    this.cart.push({
      id: item.id,
      title: item.title,
      price: item.price,
      qty: 1
    });
  } else {
    this.cart[foundInCart].qty++;
  }
  this.total += item.price;
}

function inc(item) {
  item.qty++;
  this.total += item.price;
}

function dec(item, index) {
  item.qty--;
  this.total -= item.price;
  if (item.qty <= 0) {
    this.cart.splice(index, 1);
  }
}

function onSubmit() {
  var url = '/search/'.concat(this.search);
  console.log('onSubmit', url);

  console.log('http', this.$http);
  this.$http.get(url).then(
    function(res) {
      console.log('success');
      console.log(res);
    },
    function(e) {
      console.log('failure');
      console.error(e);
    }
  );
}

var app = new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [
      { id: 10, title: 'Item 1', price: 9.99 },
      { id: 20, title: 'Item 2', price: 2.5 },
      { id: 30, title: 'Item 3', price: 3.75 }
    ],
    cart: [],
    search: ''
  },
  methods: {
    addItem: addItem,
    inc: inc,
    dec: dec,
    onSubmit: onSubmit
  },
  filters: {
    currency: currency
  }
});

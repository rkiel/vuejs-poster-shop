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
  if (this.newSearch.length) {
    var url = '/search/'.concat(this.newSearch);
    this.loading = true;
    this.items = [];
    this.$http.get(url).then(
      function(res) {
        var items = res.data.map(x => {
          x.price = 9.99;
          return x;
        });
        this.results = items;
        this.appendItems();
        this.lastSearch = this.newSearch;
        this.newSearch = '';
        this.loading = false;
      },
      function(e) {
        console.log('failure');
        console.error(e);
      }
    );
  }
}

function mounted() {
  this.onSubmit();
  var vueInstance = this;

  var elem = document.getElementById('product-list-bottom');
  var watcher = scrollMonitor.create(elem);
  watcher.enterViewport(function() {
    vueInstance.appendItems();
  });
}

function appendItems() {
  if (this.items.length < this.results.length) {
    var append = this.results.slice(this.items.length, this.items.length + 10);
    this.items = this.items.concat(append);
  }
}

function noMoreItems() {
  return this.items.length === this.results.length && this.results.length > 0;
}

var app = new Vue({
  el: '#app',
  data: {
    total: 0,
    items: [],
    results: [],
    cart: [],
    newSearch: '1980',
    lastSearch: '',
    loading: false
  },
  methods: {
    appendItems: appendItems,
    addItem: addItem,
    inc: inc,
    dec: dec,
    onSubmit: onSubmit
  },
  filters: {
    currency: currency
  },
  mounted: mounted,
  computed: {
    noMoreItems: noMoreItems
  }
});

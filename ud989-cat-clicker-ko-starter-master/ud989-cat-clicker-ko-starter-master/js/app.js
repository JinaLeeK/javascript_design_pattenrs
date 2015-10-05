var initialCats = [
  {
    clickCount: 0,
    name: 'Tabby',
    imgSrc:'https://lh4.ggpht.com/dUJNejPqb_qLsV1kfWcvviqc7adxsw02BSAm8YLWNklP4lI6fQCLKXd-28uKuchtjoEUpqFN0K6kkTSDHw=s0#w=588&h=640',
    nickname: ['T', 'A','T'],
},
{
  clickCount: 0,
  name: 'Tiger',
  imgSrc: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454'
},
{
  clickCount: 0,
  name: 'Scaredy',
  imgSrc: 'https://lh3.ggpht.com/cesD31eroFxIZ4IEeXPAJkx_8i5-haU3P9LQosGNfV-GfAPUh2bE4iw4zV6Mc9XobWOR70BQh2JAP57wZlM=s0#w=640&h=480'
},
{
  clickCount: 0,
  name: 'Shaddy',
  imgSrc: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426'
}];

var Cat = function(data) {
  var self = this;
  this.name = ko.observable(data.name);
  this.clickCount = ko.observable(0);
  this.imgSrc = ko.observable(data.imgSrc);
  this.nickname = ko.observable(data.nickname);
  this.title = ko.computed(function() {
    var clicks = this.clickCount();
    var title;
    if (clicks < 5) {
      title = 'newborn';
    } else if (clicks < 10) {
      title = 'baby';
    } else {
      title = 'ninja';
    }
    return title;
  }, this)
}

var ViewModel = function() {
  var self = this;

  this.cats = ko.observableArray([]);

  this.currentCat = ko.observable(new Cat(initialCats[0]));

  initialCats.forEach(function(eachCat) {
    self.cats.push(new Cat(eachCat));
  });

  this.showCurrentCat = function(clickedCat) {
    self.currentCat(clickedCat);
  }

  this.incrementCounter = function() {
    self.currentCat().clickCount(this.clickCount() + 1);
  }
}

ko.applyBindings(new ViewModel());

/* ===== Model ===== */
var model = {
  currentCat: null,
  cats: [
    {
        clickCount : 0,
        name : 'Tabby',
        imgAttribution : 'https://lh4.ggpht.com/dUJNejPqb_qLsV1kfWcvviqc7adxsw02BSAm8YLWNklP4lI6fQCLKXd-28uKuchtjoEUpqFN0K6kkTSDHw=s0#w=588&h=640'
    },
    {
        clickCount : 0,
        name : 'Tiger',
        imgAttribution : 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454'
    },
    {
        clickCount : 0,
        name : 'Scaredy',
        imgAttribution : 'https://lh3.ggpht.com/cesD31eroFxIZ4IEeXPAJkx_8i5-haU3P9LQosGNfV-GfAPUh2bE4iw4zV6Mc9XobWOR70BQh2JAP57wZlM=s0#w=640&h=480'
    },
    {
        clickCount : 0,
        name : 'Shadow',
        imgAttribution : 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496'
    },
    {
        clickCount : 0,
        name : 'Sleepy',
        imgAttribution : 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426'
    }
  ],
  showAdmin: false,
  updateCat: null,
};


/* ====== Octopus ===== */
var octopus = {
  init: function() {
    model.currentCat = model.cats[0];
    model.showAdmin = false;
    catListView.init();
    catView.init();
    catAdminView.init();
  },

  getCurrentCat: function() {
      return model.currentCat;
  },

  getCats: function() {
      return model.cats;
  },

  setCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  incrementCounter: function() {
    model.currentCat.clickCount++;
    catView.render();
    catAdminView.render();
  },

  setAdmin: function(bool) {
    model.showAdmin = bool;
    catAdminView.render();
  },

  getAdmin: function(bool) {
    return model.showAdmin;
  },

  updateCatsList: function(index, cat) {
    model.cats[index] = cat;
    model.currentCat = cat;
    catListView.render();
    catView.render();
  }
};

var catView = {
  init: function() {
    this.catNameElem = document.getElementById('cat-name');
    this.countElem = document.getElementById('cat-count');
    this.catImgElem = document.getElementById('cat-img');

    this.catImgElem.addEventListener('click', function() {
      octopus.incrementCounter();
    });

    this.render();
  },

  render: function() {
    var currentCat = octopus.getCurrentCat();
    this.catNameElem.textContent = currentCat.name;
    this.catImgElem.src = currentCat.imgAttribution;
    this.countElem.textContent = currentCat.clickCount;
  }
}

var catListView = {

  init: function() {
      this.catListElem = document.getElementById('cat-list');

      this.render();
  },

  render: function() {
    var cat, elem, i;

    var cats = octopus.getCats();
    console.log(cats[0].name, cats[1].name);
    this.catListElem.innerHTML = '';

    for (i=0; i<cats.length; i++) {
      elem = document.createElement('li');
      elem.textContent = cats[i].name;
      elem.addEventListener('click', (function(catCopy){
        return function() {
          octopus.setCurrentCat(catCopy);
          octopus.setAdmin(false);
          catView.render();
        }   })(cats[i]))

      this.catListElem.appendChild(elem);
    }
  }
};

var catAdminView = {
  init : function() {
    var adminBtn = $("#btn-admin");
    var cancelBtn = $("#btn-cancel");

    this.dataUpdate = $('#data-update');
    this.saveBtn = $("#btn-save");

    adminBtn.click(function() {
      octopus.setAdmin(true);
    });

    cancelBtn.click(function() {
      octopus.setAdmin(false);
    });

    this.render();
  },

  render: function() {
    if (octopus.getAdmin()) {
      var currentCat = octopus.getCurrentCat();
      var cats = octopus.getCats();
      var newName=$("#new-name"), newClick=$("#new-click"), newImg=$("#new-image");

      newName.val(currentCat.name).css("color","grey");
      newClick.val(currentCat.clickCount).css("color","grey");
      newImg.val(currentCat.imgAttribution).css("color","grey");

      this.dataUpdate.show();

      this.saveBtn.click(function() {
        var index = cats.indexOf(currentCat);
        var newInfo = {};

        newInfo.name = newName.val();
        newInfo.clickCount = newClick.val();
        newInfo.imgAttribution = newImg.val();
        console.log(index, newInfo.name);
        octopus.updateCatsList(index, newInfo);

        newName.css("color","black");
        newClick.css("color","black");
        newImg.css("color","black");

      })

    } else {this.dataUpdate.hide(); }
  }
};

octopus.init();

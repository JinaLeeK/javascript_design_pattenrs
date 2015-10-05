$(function() {
  var model = {
    name: ["cat1", "cat2", "cat3", "cat4"],
    number: [0, 0, 0, 0],
    url: ["https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426",
          "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
          "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454",
          "https://lh4.ggpht.com/dUJNejPqb_qLsV1kfWcvviqc7adxsw02BSAm8YLWNklP4lI6fQCLKXd-28uKuchtjoEUpqFN0K6kkTSDHw=s0#w=588&h=640"],
    currentCat: {},
    init : function() {
      this.currentCat.name = this.name[0];
      this.currentCat.number = this.number[0];
      this.currentCat.url = this.url[0];
    }
  };

  var octopus = {
    addClick: function(id) {
        ++model.number[id-1];
        model.currentCat.name = model.name[id-1];
        model.currentCat.number = model.number[id-1];
        model.currentCat.url = model.url[id-1];
        view.render();
    },

    getClickedCat: function() {
      return model.currentCat;
    },

    init: function() {
      model.init();
      view.init();
    }
  };

  var view = {
    init: function() {

      $("button").click(function() {
        var currentID = $(this).prop("id");
        octopus.addClick(currentID);
      })

      this.template = $('script[data-template="cat"]').html();
      this.displayArea = $('.display-area');

      this.render();
    },

    render: function() {
        var catInfo = octopus.getClickedCat();
        var imageURL = catInfo.url;
        var thisTemplate = this.template.replace(/{{name}}/g,catInfo.name);

        thisTemplate = thisTemplate.replace(/{{click}}/g, catInfo.number);
        thisTemplate = thisTemplate.replace(/{{image}}/g,imageURL);

        this.displayArea.html(thisTemplate);
      }

  };

  octopus.init();
})

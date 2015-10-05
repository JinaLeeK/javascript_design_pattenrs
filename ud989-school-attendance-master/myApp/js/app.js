// $(function() {
  var model = {
  init: function() {
    var studentsName = ["Slappy", "Lilly", "Paulrus", "Gregory"];
    if (!localStorage.attendance) {
      console.log('Creating attendance records....');
      function getRandom() {
        return (Math.random() >= 0.5);
      }

      var attendance = {};
      studentsName.forEach(function(name) {
        attendance[name] = [];

        for (var i = 0; i <= 11; i++) {
          attendance[name].push(getRandom());
        }
      });

      localStorage.attendance = JSON.stringify(attendance);
    }
  },

  updateData: function(name, index) {
      var studentData = JSON.parse(localStorage.attendance);
      studentData[name][index] = (studentData[name][index])?false:true;
      localStorage.attendance = JSON.stringify(studentData);
  },

  getAllData: function() {
    return JSON.parse(localStorage.attendance);
  }
};

var octopus = {
  init: function() {
    model.init();
    view.init();
  },

  setData: function(name, index) {
    model.updateData(name,index);
    view.render();
  },

  getData: function() {
    return model.getAllData();
  },

};

var view = {
  init: function() {
    var attendance = octopus.getData();

    $.each(attendance, function(name, days) {
      var rowElem = document.createElement('tr');
      var nameElem = document.createElement('td');
      var missedElem = document.createElement('td');

      $(nameElem).text(name).addClass("name-col");
      $(rowElem).append(nameElem).addClass("student");

      for (var i in days){
        var dayElem = document.createElement('td');
        $(dayElem).addClass("attend-col").html('<input type="checkbox">');
        $(dayElem).children('input').prop("checked", days[i]);
        $(dayElem).children('input').click(function(index) {
          return function() {
            octopus.setData(name,index);
          }
        }(i));
        $(rowElem).append(dayElem);
      }

      $(missedElem).addClass('missed-col');
      $(rowElem).append(missedElem);
      $('tbody').append(rowElem);
    })

    this.render();
  },

  render: function() {
    var attendance = octopus.getData();

    $.each(attendance, function(name, days) {
      var studentRow = $('.name-col:contains("'+ name +'")').parent('tr');
      var dayRow = $(studentRow).children('.attend-col').children('input');
      var target = $(studentRow).children('.missed-col');

      var missedNum = 0;

      $.each(dayRow, function(index, day) {
        if(!($(day).prop('checked'))) { missedNum++; }
      });

      target.text(missedNum);
    });
   }
}

octopus.init();

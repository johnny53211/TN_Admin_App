//common function

let serviceport = "http://192.168.29.127:4000";

let apiurl = {
  inserturl: `${serviceport}/savecategory`,
  geturl: `${serviceport}/getcategory`,
  updateurl: `${serviceport}/updatecategory`,
  deleteurl: `${serviceport}/deletecategory`,
};
//validation
function validateinputs() {
  $("#my-form").validate({
    rules: {
      name: {
        minlength: 5,
        required: true,
      },
      description: {
        minlength: 5,
        required: true,
      },
      status: {
        required: true,
      },
      email_id: {
        required: true,
      },
      password: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Please Enter a name",
        minlength: "Character Must Be 10 Character",
        maxlength: "Character Must Be 10 Character",
      },
      description: {
        required: "Please Enter a description",
        minlength: "Character Must Be 10 Character",
        maxlength: "Character Must Be 10 Character",
      },
      status: {
        required: "Please select a status",
      },
      email_id: {
        required: "Please enter a username",
      },
      password: {
        required: "Please enter a password",
      },
    },
    onkeyup: function (element) {
      $(element).valid();
    },
    onfocusout: function (element) {
      $(element).valid();
    },
    highlight: function (element) {
      $(element)
        .closest(".item-content")
        .addClass("item-input-with-error-message item-input-invalid");
      $(element).addClass("input-invalid");
    },
    unhighlight: function (element) {
      // class "errorClass" remove from the element
      $(element)
        .closest(".item-content")
        .removeClass("item-input-with-error-message item-input-invalid");
      $(element).removeClass("input-invalid");
    },
    errorPlacement: function (error, element) {
      var errorDiv = $('<div class="input-error-message"></div>');
      errorDiv.insertAfter(element);
      error.appendTo(errorDiv);
    },
  });
}

let categorylistobj = {
  // add validation

  //insert category
  createcategory: () => {
    if ($("#my-form").valid()) {
      var formdata = app.form.convertToData("#my-form");
      $.ajax({
        url: apiurl.inserturl,
        type: "post",
        data: formdata,
        success: function (response) {
          app.dialog.alert("Category create Succesfully");
        },
        error: function (error) {
          console.log(error);
        },
      });
    }
  },

  //get category
  tableObj: {
    Table: {},
    TblData: [],
    categoryTable: () => {
      $("#devicetable thead tr")
        .clone(true)
        .addClass("filters")
        .appendTo("#devicetable  thead");
      let searchValue;

      function getSearchValue(value) {
        searchValue = value; // Update the searchValue variable with the new value
        // /console.log(searchValue);
      }
      let ajaxData = {
        type: "get",
        url: apiurl.geturl,
        // datatype: JSON,
        data: function (d) {
          d.limit = d.length;
          d.offset = d.start;
          d.count = true;
          d.search.value = d.search.value || searchValue;
          // console.log(d.search.value);
          return d;
        },
        dataFilter: function (data) {
          let json = jQuery.parseJSON(data);
          json.recordsTotal = json.data.total_record;
          json.recordsFiltered = json.data.total_record;
          json.data = json.data.data;
          this.TblData = json.data.data;
          return JSON.stringify(json);
        },
      };

      categorylistobj.tableObj.Table = $("#devicetable").DataTable({
        orderCellsTop: true,
        serverSide: true,
        searching: true,
        ajax: ajaxData,
        columns: [
          {
            data: "id",
          },
          {
            data: "name",
          },
          {
            data: "description",
          },
          {
            data: "status",
          },
          {
            render: function (data, type, row) {
              return `<i class="icon f7-icons color-green btnSlctedit popup-open" onclick="categorylistobj.editcategory()" data-popup="#my-popup">pencil</i>
                  <i class="icon f7-icons color-red" onclick="categorylistobj.deletecategory(this)" data-id="${row.id}">trash_fill</i>`;
            },
          },
        ],
        initComplete: function () {
          let api = this.api();
          let filtersRow = $("#devicetable thead .filters");
          filtersRow.find("th:last-child").html("");
          filtersRow.find("th:not(:last-child)").each(function (colIdx) {
            let title = $(this).text();
            $(this).html('<input type="text" placeholder="' + title + '" />');
            let input = $(this).find("input");
            input
              .addClass("filter-input")
              .off("keyup change")
              .on("input", function (e) {
                let searchValue = $(this).val();
                getSearchValue(searchValue);
                api.column(colIdx).search(searchValue).draw();
              })
              .attr("value", "")
              .trigger("input")
              .focus();
          });
        },
      });
      console.log(ajaxData);
    },
  },
  // get table value for edit
  editcategory: () => {
    $("#devicetable").on("click", ".btnSlctedit", function () {
      $("#updatevalue").show();
      $("#submitvalue").hide();
      var currentRow = $(this).closest("tr");
      var id = currentRow.find("td:eq(0)").text();
      var name = currentRow.find("td:eq(1)").text();
      // /var files = currentRow.find("td:eq(3)").files();
      var description = currentRow.find("td:eq(2)").text();
      var status = currentRow.find("td:eq(3)").text();
      $("#name").val(name);
      //  $("#product_image")[0].files[0];
      $("#description").val(description);
      $("#status").val(status).trigger("change");
      $("#updatevalue").attr("data-id", id);
    });
  },
  //update value
  updatecategory: (e) => {
    if ($("#my-form").valid()) {
      let id = e.dataset.id;
      let url = apiurl.updateurl + `?id=${id}`;
      let formdata = app.form.convertToData("#my-form");
      $.ajax({
        url: url,
        type: "post",
        data: formdata,
        success: function (response) {
          app.dialog.alert(" Category Update Succesfully");
        },
        error: function (error) {},
      });
    }
  },
  //delete value
  deletecategory: (e) => {
    let id = e.dataset.id;
    console.log(id);
    app.dialog.confirm(
      "are u sure want to delete this row?",
      "My App",
      function () {
        $.ajax({
          url: apiurl.deleteurl + `?id=${id}`,
          type: "get",
          success: function (response) {
            app.dialog.alert(" Category Deleted Succesfully");
          },
          error: function (error) {
            console.log(error);
          },
        });
      }
    );
  },
  logincategory: () => {
    validateinputs();
    if ($("#my-form").valid()) {
      var formdata = app.form.convertToData("#my-form");
    //  console.log(formdata);
      $.ajax({
        url: 'http://192.168.29.127:4000/login',
        type: "post",
        data: formdata,
        success: function (response) {
          console.log(response);
          if(response.statusCodes==200){
            var idy = app.form.removeFormData('#my-form');
            console.log(idy);
            login.createdata('userData',JSON.stringify(response.data[0]));
            login.redirect('/');
           
          }else{
            login.redirect('/login/');
          }
        },
        error: function (error) {
          app 
        }, 
      });
    }
  },
};


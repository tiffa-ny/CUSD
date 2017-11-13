$(document).ready(function () {
  var token = 'Bearer e5159b89-86c1-3cca-8412-59de037c674b';
  var data;
  (function update() {
    $.ajax({
      url: 'https://gateway.api.cloud.wso2.com:443/t/mystop/tcat/v1/rest/Vehicles/GetAllVehicles',
      type: 'GET',
      dataType: 'json',
      async: false,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", token);
      },
      //data: 'json=' + escape(JSON.stringify(createRequestObject)),
      success: function(msg) {
        data = msg;
        MapRoute(msg);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
      }
    }).then(function() {
      setTimeout(update,5000); //refreshes call every 5 seconds
      //setMapOnAll(null);
    });
  })();
  }); 
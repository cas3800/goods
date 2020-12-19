var $jq = jQuery.noConflict();

function UpdateGoodsDataTable(){
    //window.alert(good_category.value);
    $jq.ajax({
       url: "goods/api/list",
       dataType: 'html',
        data: {
           name_substring: good_name_substring.value.trim(),
           category : good_category.value
       },
        success: function(result) {
          var oTable = $jq('#datatable-1').dataTable();
          oTable.fnClearTable();
            $jq.parseJSON(result).forEach(function(item, i, arr) {
                    oTable.fnAddData([item.id,item.name,item.c_id,item.c_name,item.price]);
         });
      }
    });
}

function OpenModalAddGood() {
  ModalAddGood.style.display = 'block';
}

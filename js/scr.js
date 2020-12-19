var $jq = jQuery.noConflict();

$jq(document).ready(function () {
    DatatableOnClick(); 
});

function DatatableOnClick(){
    $jq('#datatable-1 tbody tr').on('click', function () {
        var nTds = $jq('td', this);
        //alert( 'You clicked on '+$jq(nTds[0]).text()+'\'s row' );
        ModalEditGood.style.display = 'block';
        EditGoodName.value = $jq(nTds[1]).text();
        Array.from(EditGoodCategory.options).forEach(function(item)
        {
            if (item.text==$jq(nTds[2]).text()) item.selected=true;   
        });
        EditGoodPrice.value=$jq(nTds[3]).text();
        EditGoodId.value=$jq(nTds[0]).text()
        EditGoodEmptyValidation.style.display = 'none';
        EditGoodExistValidation.style.display = 'none';
    });
}

function UpdateGoodsDataTable(){
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
          DatatableOnClick();
        }
    });
}

function OpenModalAddGood() {
    ModalAddGood.style.display = 'block';
    EditGoodEmptyValidation.style.display = 'none';
    EditGoodExistValidation.style.display = 'none';  
}

function AddGood(){
    AddGoodExistValidation.style.display = 'none';
    if (AddGoodName.value.trim()=='')
        {AddGoodEmptyValidation.style.display = 'block'; return;}
    else
        AddGoodEmptyValidation.style.display = 'none';
    AddGoodButton.disabled = true;
    AddGoodValidPost();
}

function EditGood(){
    EditGoodExistValidation.style.display = 'none';
    if (EditGoodName.value.trim()=='')
        {EditGoodEmptyValidation.style.display = 'block'; return;}
    else
        EditGoodEmptyValidation.style.display = 'none';
    EditGoodButton.disabled = true;
    EditGoodValidPost();
}

function AddGoodValidPost(){
    $jq.ajax({
        url: "goods/api/list",
        dataType: 'html',
        data: {
           name: AddGoodName.value.trim(),
        },
        success: function(result) {
            if ($jq.parseJSON(result).length==0) {
                $jq.ajax({
                    type:   "POST",
                    url:    "goods/api/post",
                    data:{
                        name: AddGoodName.value.trim(),
                        category: AddGoodCategory.value.trim(),
                        price: AddGoodPrice.value.trim()
                        },
                        success: function() {UpdateGoodsDataTable();}
                });
                ModalAddGood.style.display = 'none';
                AddGoodButton.disabled = false;
            }
            else{
               AddGoodButton.disabled = false;
               AddGoodExistValidation.style.display = 'block';
            }
        }
    });  
}

function EditGoodValidPost(){
    $jq.ajax({
        url: "goods/api/list",
        dataType: 'html',
        data: {
           name: EditGoodName.value.trim(),
           notid: EditGoodId.value.trim()
        },
        success: function(result) {
            if ($jq.parseJSON(result).length==0) {
                $jq.ajax({
                    type:   "POST",
                    url:    "goods/api/post",
                    data:{
                        name: EditGoodName.value.trim(),
                        id: EditGoodId.value.trim(),
                        category: EditGoodCategory.value.trim(),
                        price: EditGoodPrice.value.trim()
                    },
                        success: function() {UpdateGoodsDataTable();}
                });
                ModalEditGood.style.display = 'none';
                EditGoodButton.disabled = false;
            }
            else{
                EditGoodButton.disabled = false;
                EditGoodExistValidation.style.display = 'block';               
            }
        }
    });  
}
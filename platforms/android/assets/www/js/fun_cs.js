$(document).ready(function(){
  var _originalSize = $(window).width() + $(window).height()
  $(window).resize(function(){
    if($(window).width() + $(window).height() != _originalSize){
      console.log("keyboard show up");
      var footer = document.getElementsByClassName("footer");
      for(var i = 0; i < footer.length; i++){
        footer[i].style.display = "none";
      }
    }else{
      console.log("keyboard closed");
      var footer = document.getElementsByClassName("footer");
            for(var i = 0; i < footer.length; i++){
              footer[i].style.display = "block";
            }
    }
  });

});

function sec_wh(){
 var select_wh = "";
 console.log('{"accessToken":"'+localStorage.token+'","search":"","branch":"'+localStorage.branch+'"}');
              $.ajax({
                      url: localStorage.api_url_server+"NPInventoryWs/V2/is/searchWH",
                      data: '{"accessToken":"'+localStorage.token+'","search":"","branch":"'+localStorage.branch+'"}',
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      type: "POST",
                      cache: false,
                      success: function(result){
                          console.log(JSON.stringify(result.data));
                               select_wh += '<select name="wh" class="bt-cmp" style="width:100%; height:50px;" data-role="none">';
                               $.each(result.data, function(key, val) {
                                      select_wh += '<option value="'+val['whCode']+'">คลัง '+val['whCode']+'</option>';
                               });
                               select_wh += '</select>';
                               document.getElementById("wh_list").innerHTML = select_wh;
                               $.mobile.changePage('#stock',{transition: 'slidefade'});
                      },
                      error: function (err){
                          console.log(JSON.stringify(err));
                         // alertify.alert("การเชื่อมต่อฐานข้อมูลมีปัญหา กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ตของท่าน");
                         switch_url();
                         sec_wh();
                        //  $load.popup("close");
                      }
              });
}
function search_wh(){
    searchWHis($('select[name="wh"] :selected').attr('value'));
}
function gosearchitem(){
$.mobile.changePage('#printpage_searchitem',{transition: 'slidefade'});
}

function finditem(){
var searchitem = document.getElementById('pr_searchItem').value

    $.ajax({
            url: localStorage.api_url_server+"NPInventoryWs/V2/inven/searchLikeItem",
            data: '{"accessToken":"'+localStorage.token+'","searchItem":"'+searchitem+'"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            cache: false,
            success: function(result){
            console.log('data '+JSON.stringify(result));
                    itemlist = '';
                    $.each(result.listLikeItem, function(key,val){
                     itemlist += '<label style="width:100%; font-size:14px; border-bottom:1px dashed gray;"';
                     itemlist += 'onclick="detailitem(\''+val["itemCode"]+'\')"><div class="ui-grid-b">';
                     itemlist += '<div class="ui-block-a" style="width:35%; padding:2%; word-wrap:break-word;">';
                     itemlist += val['itemCode']+'</div>';
                     itemlist += '<div class="ui-block-b" style="width:40%; word-wrap:break-word;">';
                     itemlist += val['itemName']+'</div>';
                     itemlist += '<div class="ui-block-c" style="width:25%; text-align:center; word-wrap:break-word;">';
                     itemlist += val['unitCode']+'</div></div></label>';
                      });
                      document.getElementById("pr_item").innerHTML = itemlist;
                  },
            error: function(err){
               alertify.error('ข้อมูลผิดพลาด');
             }
           });
}

function detailitem(bcitem){
//    $("#printpage").bind('pageshow', function() {
//        $('#amountprice').focus();
//    });
    $.mobile.changePage('#printpage',{transition: 'slidefade'});
    loading();
        $.ajax({
                                  url: localStorage.api_url_server+"ReOrderWS/reorder/itemdetails",
                                  data: '{"access_token":"'+localStorage.token+'","profit_code":"'+localStorage.profit+'","search":"'+bcitem+'"}',
                                  contentType: "application/json; charset=utf-8",
                                  dataType: "json",
                                  type: "POST",
                                  cache: false,
                                  success: function(result){
//                                  console.log(result);

                                     if(result.error == false ){
                                     alertify.error('ไม่มีสินค้าในระบบ');
                                     }

//                                alert(JSON.stringify(result));
                                  console.log('api เปลี่ยน'+JSON.stringify(result));
    //                              console.log('ดูนอก '+ JSON.stringify(result.listLikeItem));
    //                              console.log('แรก '+ JSON.stringify(result.listLikeItem[0].itemName));
                                    document.getElementById('idproduct').value = result.item_code;
                                    document.getElementById('nameproduct').value = result.item_name;

                                    //hidden
                                    document.getElementById('itemcodea').value = result.item_code;
                                    document.getElementById('itembarcodea').value = result.item_barcode;
                                    document.getElementById('itempricea').value = result.item_price;
                                    document.getElementById('itemunitcodea').value = result.item_unit_code;
                                    //hidden

                                    document.getElementById('amountprice').value = '';

                                   closeload();
                                  },
                                  error: function (err){
                                  closeload();
                                      console.log(JSON.stringify(err));
                                     // alertify.alert("การเชื่อมต่อฐานข้อมูลมีปัญหา กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ตของท่าน");
                                    switch_url();

                                    //  $load.popup("close");
                                  }
                          });
}


function typeprint(){
         document.getElementById('idproduct').value = '';
         document.getElementById('nameproduct').value = '';
         document.getElementById('amountprice').value = '';
         document.getElementById('itemcodea').value = '';
         document.getElementById('itembarcodea').value = '';
         document.getElementById('itempricea').value = '';
         document.getElementById('itemunitcodea').value = '';

//         var typeprint = "";
//          typeprint += '<select name="print" id="selectexnormal" class="bt-cmp" style="width:100%; height:50px;" data-role="none">';
//          typeprint += '<option value="F2">พิเศษ</option>';
//          typeprint += '<option value="F1">ธรรมดา</option>';
//          typeprint += '</select>';
//       document.getElementById("type_print").innerHTML = typeprint;
//          var sizepage = "";
//           sizepage += '<select name="size" id="selectsize" class="bt-cmp" style="width:100%; height:50px;" data-role="none">';
//           sizepage += '<option value="P1">P1 21 ดวง/หน้า</option>';
//           sizepage += '<option value="P2">P2 3 ดวง/หน้า</option>';
//           sizepage += '<option value="P3">P3 2 ดวง/หน้า</option>';
//           sizepage += '<option value="P4">P4 A4</option>';
//       document.getElementById("size_page").innerHTML = sizepage;

     var listprint = "";
        console.log("listprint "+"http://venus.nopadol.com:9002/"+"labels?access_token=aaa&keyword="+" username :"+localStorage.username);
                 loading();
                  $.ajax({
                          url: "http://venus.nopadol.com:9002/"+"labels?access_token=aaa&keyword="+localStorage.username+"&branch="+localStorage.branch,
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "GET",
                          cache: false,
                          success: function(result){
//                              console.log('data '+JSON.stringify(result.data));
                                        listprint  +=   '<div class="ui-grid-d" style="border-top:1px solid black; border-bottom:1px solid black; padding:2% 0; width:100%;">';
                                    	listprint  += '<div class="ui-block-a" style="font-size: 12px;color: blue;font-weight:bold;">รหัสสินค้า</div>';
                                    	listprint  += '<div class="ui-block-b" style="font-size: 12px;color: blue;font-weight:bold;" align="center" >พิมพ์</div>';
                                    	listprint  += '<div class="ui-block-c" style="font-size: 12px;color: blue;font-weight:bold;">ชื่อสินค้า</div>';
                                    	listprint  += '<div class="ui-block-d" style="font-size: 12px;color: blue;font-weight:bold;">กระดาษ</div>';
                                    	listprint  += '<div class="ui-block-e" style="font-size: 12px;color: blue;font-weight:bold;">หน่วยนับ</div>';
                                        listprint  += '</div>';

                                   $.each(result.data, function(key, val) {
                                        listprint += '<label class="csdeletecpr" csdelete-id="'+val['item_code']+'/'+val['bar_code']+'/'+val['qty']+'/'+val['price']+'/'+val['label_type']+'/'+val['creator_code']+'/'+val['unit_code']+'" csdelete-detail-id="'+val['item_code']+'" id="'+val['item_code']+'" style="text-align:center; border-bottom:1px gray dashed;">';
                                        listprint += '<div class="ui-grid-d" style="padding-bottom:4%; padding-top:1%">';
                                        listprint += '<div class="ui-block-a" style="font-size:12px;word-wrap:break-word;" >';
                                        listprint += val['item_code']+'</div>';
                                        listprint += '<div class="ui-block-b" style="font-size: 12px;"  align="center"  ><b>';
                                        listprint += val['qty']+'</b></div>';
                                        listprint += '<div class="ui-block-c" style="font-size: 12px;word-wrap:break-word;" >';
                                        listprint += val['item_name']+'</div>';
                                        listprint += '<div class="ui-block-d" style="font-size: 12px;" >';
                                        listprint += val['label_type']+'</div>';
                                        listprint += '<div class="ui-block-e" style="font-size: 12px;"  >';
                                        listprint += val['unit_code']+'</div>';
                                        listprint += '</div></label>';

                                   });
                                   document.getElementById("detailprint").innerHTML = listprint;
                                  $.mobile.changePage('#printpage',{transition: 'slidefade'});
                                  closeload();
                          },
                          error: function (err){

                                         listprint +=  '<div class="ui-grid-d" style="border-top:1px solid black; border-bottom:1px solid black; padding:2% 0; width:100%;">';
                                         listprint +=  '<div class="ui-block-a" style="font-size: 12px;color: blue;font-weight:bold;">รหัสสินค้า</div>';
                                         listprint +=   '<div class="ui-block-b" style="font-size: 12px;color: blue;font-weight:bold;" align="center" >พิมพ์</div>';
                                         listprint +=  '<div class="ui-block-c" style="font-size: 12px;color: blue;font-weight:bold;">ชื่อสินค้า</div>';
                                         listprint +=   '<div class="ui-block-d" style="font-size: 12px;color: blue;font-weight:bold;">กระดาษ</div>';
                                         listprint +=   '<div class="ui-block-e" style="font-size: 12px;color: blue;font-weight:bold;">หน่วยนับ</div>';
                                         listprint +=   '</div>';
                                         listprint +=   '<div class="ui-grid-a" style="padding-bottom:4%; padding-top:3%">';
                                         listprint +=   '<div class="ui-block-a" style="font-size:25px;word-wrap:break-word;width:100%;color:red;font-weight:bold;" align="center" >ไม่มีข้อมูล</div></div>';

                                  document.getElementById("detailprint").innerHTML = listprint;
                                  $.mobile.changePage('#printpage',{transition: 'slidefade'});
                              closeload();
                              console.log(JSON.stringify(err));
                             // alertify.alert("การเชื่อมต่อฐานข้อมูลมีปัญหา กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ตของท่าน");


                            //  $load.popup("close");
                          }
                  });

}

function searchproduct(bcitem){
loading();
    $.ajax({
                              url: localStorage.api_url_server+"ReOrderWS/reorder/itemdetails",
                              data: '{"access_token":"'+localStorage.token+'","profit_code":"'+localStorage.profit+'","search":"'+bcitem+'"}',
                              contentType: "application/json; charset=utf-8",
                              dataType: "json",
                              type: "POST",
                              cache: false,
                              success: function(result){
                              closeload();
                              console.log('api เปลี่ยน'+JSON.stringify(result));
//                              console.log('ดูนอก '+ JSON.stringify(result.listLikeItem));
//                              console.log('แรก '+ JSON.stringify(result.listLikeItem[0].itemName));
                                document.getElementById('idproduct').value = result.item_code;
                                document.getElementById('nameproduct').value = result.item_name;

                                //hidden
                                document.getElementById('itemcodea').value = result.item_code;
                                document.getElementById('itembarcodea').value = result.item_barcode;
                                document.getElementById('itempricea').value = result.item_price;
                                document.getElementById('itemunitcodea').value = result.item_unit_code;
                                //hidden

                                document.getElementById('amountprice').value = '';
                                document.getElementById('amountprice').focus();
                              },
                              error: function (err){
                              closeload();
                                  console.log(JSON.stringify(err));
                                 // alertify.alert("การเชื่อมต่อฐานข้อมูลมีปัญหา กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ตของท่าน");
                                switch_url();

                                //  $load.popup("close");
                              }
                      });
}

var input = document.getElementById("amountprice");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        insertlabel();
    }
});

function insertlabel(){
//hidden
var itemcode = document.getElementById('itemcodea').value;
var itembarcode = document.getElementById('itembarcodea').value;
var itemprice = document.getElementById('itempricea').value;
var itemunitcode = document.getElementById('itemunitcodea').value;
//hidden
var nameproduct = document.getElementById('nameproduct').value;
var extranormal = document.getElementById('selectexnormal').value;
var typesize = document.getElementById('selectsize').value;
var BarCode = document.getElementById('idproduct').value;
var amount = document.getElementById('amountprice').value;

var outputselect = typesize.trim()+extranormal.trim();


if(amount&&BarCode&&nameproduct != ''){
    alertify.set({ labels: {
        cancel : "ยกเลิก",
        ok     : "บันทึก"
    } });

//alert(outputselect);
//alert('hidden'+itemcode+' '+itembarcode+' '+itemprice+' '+itemunitcode+'    value'+' n'+nameproduct+' '+extranormal+' '+typesize+' '+BarCode+' '+amount);
alertify.confirm("ต้องการขอพิมป้าย รหัส "+BarCode+"  หรือไม่ ?", function (e) {
                                                if (e) {
                                                  loading();
                              $.ajax({
                              url: "http://venus.nopadol.com:9002/label",
                              data: '{"ItemCode":"'+itemcode+'","BarCode":"'+BarCode+'","Qty":'+amount+',"Price":'+itemprice+',"LabelType":"'+outputselect+'","CreatorCode":"'+localStorage.username+'","unitcode":"'+itemunitcode+'","Branch":"'+localStorage.branch+'"}',
                              contentType: "application/json; charset=utf-8",
                              dataType: "json",
                              type: "POST",
                              cache: false,
                              success: function(result){
                              closeload();
                              console.log((result));
                              alertify.success('บันทึกเสร็จเรียบร้อย');
                                    typeprint();
                              },
                              error: function (err){
                                  closeload();
                                  alertify.error('ไม่สามารถติดต่อ API ได้');

                              }
                                       });
                                                }else{

                                                }
                                            });
}else{
alertify.error('กรุณากรอกข้อมูลให้ครบ');
}

}

function managepromotion(){
loading();
var searchpromo = document.getElementById("searchpromotion").value;
$.ajax({
                        url: "http://venus.nopadol.com:9002/"+"requests?access_token=aaa&keyword="+searchpromo,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "GET",
                        cache: false,
                        success: function(result){
                        var promotionlist_list = "";
                        for(var i = 0; i < result.data.length; i++){
                         var docdate = result.data[i].doc_date;
                         var x = docdate.substring(0,10);
                         var res = x.split("-");
                         var year = res[0];
                         var yearfin = parseInt(year) + 543;
                         var mon = res[1];
                         switch (mon) {
                         case '01': var mon = "มกราคม"; break;
                         case '02': var mon = "กุมภาพันธ์"; break
                         case '03': var mon = "มีนาคม"; break;
                         case '04': var mon = "เมษายน"; break;
                         case '05': var mon = "พฤษภาคม"; break;
                         case '06': var mon = "มิถุนายน"; break;
                         case '07': var mon = "กรกฎาคม"; break;
                         case '08': var mon = "สิงหาคม"; break;
                         case '09': var mon = "กันยายน"; break;
                         case '10': var mon = "ตุลาคม"; break;
                         case '11': var mon = "พฤศจิกายน"; break;
                         case '12': var mon = "ธันวาคม";
                         }
                         var resultmont = res[2]+' '+mon+' '+yearfin;
                        var colorconfirm = result.data[i].is_con_firm;
                        if(colorconfirm == 2){
                        var colorconfirm = '#88ff4d';

                        }
                        if(colorconfirm == 0){
                        var colorconfirm = '#5ea9ff';

                        }
                        promotionlist_list += "<a href='#' class='ui-btn' style='font-size:13px;background-color:"+colorconfirm+";' ";
                        promotionlist_list += 'onclick="detail_promotion(\''+result.data[i].doc_no+'\')"><span style="color:black;">'+result.data[i].doc_no+' '+resultmont+'<br>'+result.data[i].sec_man+' '+result.data[i].pm_code+'</span></a>';
                        }
                        document.getElementById("detailpromotion").innerHTML = promotionlist_list;
                        $.mobile.changePage('#promotionpage',{transition: 'slidefade'});
                        closeload();
                        },
                        error: function (error){
                        var promotionlist_list = "";
                        promotionlist_list += "<a href='#' class='ui-btn' style='font-size:14px;background-color:#ff6666;' ";
                        promotionlist_list += 'onclick="#"><span style="color:black;">ไม่มีข้อมูล</span></a>';
                        document.getElementById("detailpromotion").innerHTML = promotionlist_list;
                        closeload();
                        }
                        });
}
function detail_promotion(docno){
loading();
var imageedit = '';
var imageedit = '<input type="image" onclick="editpromotion(\''+docno+'\')" style="border-radius: 10px; border: 1px solid #FFE066;" src="images/editpromotion.png" alt="Submit" width="25" height="25">';
document.getElementById('editpromotions').innerHTML = imageedit;

$.ajax({
                         url: "http://venus.nopadol.com:9002/"+"requests?access_token=aaa&keyword="+docno,
                         contentType: "application/json; charset=utf-8",
                         dataType: "json",
                         type: "GET",
                         cache: false,
                         success: function(result){
//                       console.log(JSON.stringify(result));
                         var docdate = result.data[0].doc_date;
                         var x = docdate.substring(0,10);
                         var res = x.split("-");
                         var year = res[0];
                         var yearfin = parseInt(year) + 543;
                         var mon = res[1];
                         switch (mon) {
                         case '01': var mon = "มกราคม"; break;
                         case '02': var mon = "กุมภาพันธ์"; break
                         case '03': var mon = "มีนาคม"; break;
                         case '04': var mon = "เมษายน"; break;
                         case '05': var mon = "พฤษภาคม"; break;
                         case '06': var mon = "มิถุนายน"; break;
                         case '07': var mon = "กรกฎาคม"; break;
                         case '08': var mon = "สิงหาคม"; break;
                         case '09': var mon = "กันยายน"; break;
                         case '10': var mon = "ตุลาคม"; break;
                         case '11': var mon = "พฤศจิกายน"; break;
                         case '12': var mon = "ธันวาคม";
                         }
                         var resultmont = res[2]+' '+mon+' '+yearfin;

                               var docno = "";
                               docno += "<span style='font-size:12px;'>"+result.data[0].doc_no+"</span>"
                               document.getElementById('docno_id').innerHTML = docno;
//                              alert(result.data[0].doc_date);
                               var docdate = "";
                              docdate += "<span style='font-size:12px;'>"+resultmont+"</span>";
                              document.getElementById('datepromotion').innerHTML = docdate;

                              var pm_code = "";
                              pm_code += "<span style='font-size:12px;'>"+result.data[0].pm_code+"</span>"
                              document.getElementById('pmcode').innerHTML = pm_code;

                              var sec_man = "";
                              sec_man += "<span style='font-size:12px;'>"+result.data[0].sec_man+"</span>"
                              document.getElementById('secman').innerHTML = sec_man;

                              var creator_code = "";
                              creator_code += "<span style='font-size:12px;'>"+result.data[0].creator_code+"</span>"
                              document.getElementById('creator_code').innerHTML = creator_code;

                              var date2 = result.data[0].subs[0].date_start;
                              var x = date2.substring(0,10);
                              var res = x.split("-");
                              var year = res[0];
                              var yearfin = parseInt(year) + 543;
                              var mon = res[1];
                              switch (mon) {
                              case '01': var mon = "มกราคม"; break;
                              case '02': var mon = "กุมภาพันธ์"; break
                              case '03': var mon = "มีนาคม"; break;
                              case '04': var mon = "เมษายน"; break;
                              case '05': var mon = "พฤษภาคม"; break;
                              case '06': var mon = "มิถุนายน"; break;
                              case '07': var mon = "กรกฎาคม"; break;
                              case '08': var mon = "สิงหาคม"; break;
                              case '09': var mon = "กันยายน"; break;
                              case '10': var mon = "ตุลาคม"; break;
                              case '11': var mon = "พฤศจิกายน"; break;
                              case '12': var mon = "ธันวาคม";
                              }
                              var docstar = res[2]+' '+mon+' '+yearfin;

                              var date3 = result.data[0].subs[0].date_end;
                              var x = date3.substring(0,10);
                              var res = x.split("-");
                              var year = res[0];
                              var yearfin = parseInt(year) + 543;
                              var mon = res[1];
                              switch (mon) {
                              case '01': var mon = "มกราคม"; break;
                              case '02': var mon = "กุมภาพันธ์"; break
                              case '03': var mon = "มีนาคม"; break;
                              case '04': var mon = "เมษายน"; break;
                              case '05': var mon = "พฤษภาคม"; break;
                              case '06': var mon = "มิถุนายน"; break;
                              case '07': var mon = "กรกฎาคม"; break;
                              case '08': var mon = "สิงหาคม"; break;
                              case '09': var mon = "กันยายน"; break;
                              case '10': var mon = "ตุลาคม"; break;
                              case '11': var mon = "พฤศจิกายน"; break;
                              case '12': var mon = "ธันวาคม";
                              }
                              var docend = res[2]+' '+mon+' '+yearfin;

                              var datestartend = "";
                              datestartend += "<span style='font-size:12px;'>"+docstar+" ถึง "+docend+"</span>"
                              document.getElementById('datestartend').innerHTML = datestartend;

                              ///table////////
                              var tabledetail = "";
                              tabledetail  +=   '<div class="ui-grid-c" style="border-top:1px solid black; border-bottom:1px solid black; padding:2% 0; width:100%;">';
                              tabledetail  += '<div class="ui-block-a" style="font-size: 12px;color: blue;font-weight:bold;width:16%"><b>ลำดับ</b></div>';
                              tabledetail  += '<div class="ui-block-b" style="font-size: 12px;color: blue;font-weight:bold;width:50%" align="cetner"  ><b>ชื่อสินค้า</b></div>';
                              tabledetail  += '<div class="ui-block-c" style="font-size: 12px;color: blue;font-weight:bold;width:16%" align="center"><b>ปกติ</b></div>';
                              tabledetail  += '<div class="ui-block-d" style="font-size: 12px;color: blue;font-weight:bold;width:16%" align="center"><b>โปร</b></div>';
                              tabledetail  += '</div>';
                              for(var i = 0; i < result.data[0].subs.length; i++){
//                            tabledetail  += '<h3>'+result.data[0].subs[i].item_name+'</h3>';
                              tabledetail += '<label>';
                              tabledetail += '<div class="ui-grid-c" style="padding-bottom:4%; padding-top:1%">';
                              tabledetail += '<div class="ui-block-a" style="font-size:12px;word-wrap:break-word;width:16%" align="center" >';
                              tabledetail += (i+1)+'</div>';
                              tabledetail += '<div class="ui-block-b" style="font-size: 12px;width:50%"  >';
                              tabledetail += result.data[0].subs[i].item_name+'</div>';
                              tabledetail += '<div class="ui-block-c" style="font-size: 12px;word-wrap:break-word;width:16%" align="center">';
                              tabledetail += result.data[0].subs[i].price+'</div>';
                              tabledetail += '<div class="ui-block-d" style="font-size: 12px;width:16%" align="center" >';
                              tabledetail += result.data[0].subs[i].promo_price+'</div>';
                              tabledetail += '</div></label>';
                              }
                              document.getElementById('detailtable').innerHTML = tabledetail;
                              ////table///
                              $.mobile.changePage('#detailpromotion',{transition: 'slidefade'});
                              closeload();
                              },
                              error: function (err){
                              closeload();
                              console.log(JSON.stringify(err));
                              }
                      });

}

function toggledetail(){

        $("#toggledetailpro").slideToggle("slow");

}

function showpromotion(){
loading();

    $.ajax({
                          url: "http://venus.nopadol.com:9002/"+"promotionmaster",
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "GET",
                          cache: false,
                          success: function(result){
                          var select = document.getElementById("promotionlist");
                              for(var i = 0; i < result.data.length; i++){
                                select.options[select.options.length] = new Option(result.data[i].name_full,result.data[i].pm_code);//show,value
                              }
                               closeload();
                          },
                          error: function (err){
                              console.log(JSON.stringify(err));
                              alertify.error("การเชื่อมต่อฐานข้อมูลของรายการโปรโมชั่น");

                          }
                  });
loading();
    $.ajax({
                          url: "http://venus.nopadol.com:9002/"+"promotiontype",
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "GET",
                          cache: false,
                          success: function(result){

                          var select = document.getElementById("typepromotion");
                              for(var i = 0; i < result.data.length; i++){
                                select.options[select.options.length] = new Option(result.data[i].name_full,result.data[i].code);//show,value
                              }
                             closeload();
                          },
                          error: function (err){
                              console.log(JSON.stringify(err));
                              alertify.error("การเชื่อมต่อฐานข้อมูลของประเภทโปรโมชั่น");

                          }
                  });
loading();
    $.ajax({
                          url: "http://venus.nopadol.com:9002/"+"sectionman",
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "GET",
                          cache: false,
                          success: function(result){

                          var select = document.getElementById("sectionpromotion");
                              for(var i = 0; i < result.data.length; i++){
                                select.options[select.options.length] = new Option(result.data[i].name_full,result.data[i].user_id);//show,value
                              }
                              closeload();
                          },
                          error: function (err){
                              console.log(JSON.stringify(err));
                              alertify.error("การเชื่อมต่อฐานข้อมูลของSectionโปรโมชั่น");

                          }
                  });


$.mobile.changePage('#addpromotion',{transition : 'slidefade'});
}
function backfromedit(){
$.mobile.changePage('#detailpromotion',{transition: 'slidefade',reverse: true});
}
function editpromotion(docno){
var headpromotion = '';
    headpromotion += '<label style="font-size:18px; margin-bottom:0;" align="center"><img src="images/Promotion.png" width="32"><b> แก้ไข โปรโมชั่น <span style="color:blue;">'+docno+'</span></b></label>';
    document.getElementById('headeditpromotion').innerHTML = headpromotion;

    loading();
    $.ajax({
                          url: "http://venus.nopadol.com:9002/"+"promotionmaster",
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "GET",
                          cache: false,
                          success: function(result){
                          var select = document.getElementById("edit_promotionlist");
                              for(var i = 0; i < result.data.length; i++){
                                select.options[select.options.length] = new Option(result.data[i].name_full,result.data[i].pm_code);//show,value
                              }
                               closeload();
                          },
                          error: function (err){
                              console.log(JSON.stringify(err));
                              alertify.error("การเชื่อมต่อฐานข้อมูลของรายการโปรโมชั่น");

                          }
                  });
loading();
    $.ajax({
                          url: "http://venus.nopadol.com:9002/"+"promotiontype",
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "GET",
                          cache: false,
                          success: function(result){

                          var select = document.getElementById("edit_typepromotion");
                              for(var i = 0; i < result.data.length; i++){
                                select.options[select.options.length] = new Option(result.data[i].name_full,result.data[i].code);//show,value
                              }
                             closeload();
                          },
                          error: function (err){
                              console.log(JSON.stringify(err));
                              alertify.error("การเชื่อมต่อฐานข้อมูลของประเภทโปรโมชั่น");

                          }
                  });
loading();
    $.ajax({
                          url: "http://venus.nopadol.com:9002/"+"sectionman",
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "GET",
                          cache: false,
                          success: function(result){

                          var select = document.getElementById("edit_sectionpromotion");
                              for(var i = 0; i < result.data.length; i++){
                                select.options[select.options.length] = new Option(result.data[i].name_full,result.data[i].user_id);//show,value
                              }
                              closeload();
                          },
                          error: function (err){
                              console.log(JSON.stringify(err));
                              alertify.error("การเชื่อมต่อฐานข้อมูลของSectionโปรโมชั่น");

                          }
                  });
$.mobile.changePage('#editpromotion',{transition : 'slidefade'});

}

function sec_sh(){
 var stockWH = document.getElementById("whvalue").value;
 var select_sh = "";
              $.ajax({
                      url: localStorage.api_url_server+"NPInventoryWs/V2/is/searchShelf",
                      data: '{"accessToken":"'+localStorage.token+'","searchWH":"'+stockWH+'","searchShelf":""}',
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      type: "POST",
                      cache: false,
                      success: function(result){
                         // console.log(JSON.stringify(result.data));
                               select_sh += '<select name="sh" class="bt-cmp" style="width:100%; height:50px;" data-role="none">';
                               $.each(result.data, function(key, val) {
                                      select_sh += '<option value="'+val['shelfCode']+'">ชั้นเก็บ '+val['shelfName']+'</option>';
                               });
                               select_sh += '</select>';
                               document.getElementById("shel").innerHTML = select_sh;
                               $.mobile.changePage('#shelves',{transition: 'slidefade'});
                      },
                      error: function (err){
                          console.log(JSON.stringify(err));
                          switch_url();
                          sec_sh();
                          //alertify.alert("การเชื่อมต่อฐานข้อมูลมีปัญหา กรุณาตรวจสอบการเชื่อมต่ออินเตอร์เน็ตของท่าน");
                        //  $load.popup("close");
                      }
              });
}
function search_shel(){
    searchSHis($('select[name="sh"] :selected').attr('value'));
}

window.addEventListener('native.onscanbarcode', function (ci) {
       var page = "";
       //alert(ci.scanResult);
       console.log("count : "+ci.scanResult);

       if(page == ""){
         page = $.mobile.activePage.attr('id');
       }
       $(document).on("pageshow", function (c, data) {
          page = $(this)[0].activeElement.id;
       });
       console.log("count : " + page);
       localStorage.barcode = ci.scanResult;
       console.log("จำนวนตัวอักษร "+localStorage.barcode.length);
       var len = localStorage.barcode.length;
switch(page){

             case "stock"   :  loading();
                               searchWHis(localStorage.barcode);
                            break;
             case "shelves" : loading();
                              searchSHis(localStorage.barcode);
                    	    break;
             case "countitem" : loading();
                                if(len<=3){
                                    alertify.set({ labels: {
                                        ok     : "yes",
                                        cancel : "no"
                                    } });
                                    alertify.confirm("ท่านต้องการเปลี่ยนชั้นเก็บหรือไม่ ?", function (e){
                                        if(e){
                                            searchSHis(localStorage.barcode);
                                        }else{
                                            closeload();
                                        }
                                    });
                                }else{
                                    searchItem(localStorage.barcode);
                                }
                            break;
               case "Sscanitem" : loading();
                                  if(len<=3){
                                     alertify.set({ labels: {
                                          ok     : "yes",
                                          cancel : "no"
                                     } });
                                        alertify.confirm("ท่านต้องการเปลี่ยนชั้นเก็บหรือไม่ ?", function (e){
                                     if(e){
                                        searchSHis(localStorage.barcode);
                                     }else{
                                        closeload();
                                     }
                                 });
                              }else{
                                 searchItem(localStorage.barcode);
                              }
                           break;
           	}
});

function searchWHis(barcode){
 //$('#load_wh').popup('open');
 setTimeout(function(){
 console.log("cswh");
 document.addEventListener("keydown", function(event) {
    event.returnValue = true;
 });


   // document.activeElement.blur();
        $.ajax({
               url: localStorage.api_url_server+""+localStorage.api_url_searchwh_is,
               data: '{"accessToken":"'+localStorage.token+'","search":"'+barcode+'","branch":"'+localStorage.branch+'"}',
               contentType: "application/json; charset=utf-8",
               dataType: "json",
               type: "POST",
               cache: false,
               success: function(result){
                      console.log(JSON.stringify(result.data));
                      console.log(localStorage.api_url_server+""+localStorage.api_url_searchwh_is);
                      console.log('{"accessToken":"'+localStorage.token+'","search":"'+barcode+'","branch":"'+localStorage.branch+'"}');
                      if(JSON.stringify(result.data)==="[]"||JSON.stringify(result.data)==="null"){
                           alertify.alert("ไม่มีข้อมูลคลังสินค้าของ "+barcode);
                           closeload();
                      }else{
                           var whName = "";
                           var whLocal = "";
                           var whCode = "";
                           $.each(result.data, function(key, val) {
                           if(val['whName']!=null&&val['localtion']){
                                whName = val['whName'].trim();
                                whLocal = val['location'].trim();
                                whCode = val['whCode'].trim();
                           }else{
                                whName = val['whName'];
                                whLocal = val['location'];
                                whCode = val['whCode'];
                           }

                           });
                          console.log("gendocNo inspect "+localStorage.api_url_server+localStorage.api_url_gendocno);
                          console.log("payload genDN inspect "+'{"accessToken":"'+localStorage.token+'","type":"3","search":"'+localStorage.username+'","branch":"'+localStorage.branch+'"}')
                          $.ajax({
                                 url: localStorage.api_url_server+""+localStorage.api_url_gendocno,
                                 data: '{"accessToken":"'+localStorage.token+'","type":"3","search":"'+localStorage.username+'","branch":"'+localStorage.branch+'"}',
                                 contentType: "application/json; charset=utf-8",
                                 dataType: "json",
                                 type: "POST",
                                 cache: false,
                                 success: function(Is){
                                       console.log(Is.docno);
                                       document.getElementById("valdocIS").value = Is.docno;
                                       document.getElementById("docIS").innerHTML = Is.docno;
                                       isList();
                                 },
                                 error: function (error) {
                                     //alertify.error("can't call api");
                                     console.log("api gen docNo" + JSON.stringify(error));
                                     switch_url();
                                     searchWHis(barcode);
                                 }

                          });
                            if(whName==null){
                                whName = "ไม่มีข้อมูล";
                            }
                            if(whLocal==null){
                                whLocal = "ไม่มีข้อมูล";
                            }
                          document.getElementById("wh").innerHTML = "คลัง : "+whName+"  "+whLocal;
                          document.getElementById("whvalue").value = whCode;
                          isList();
                          $.mobile.changePage("#countstock");
                          closeload();
                      }
               },
               error: function (error) {
                  console.log("api gen Wh" + JSON.stringify(error));
                  switch_url();
                  searchWHis(barcode);
                  closeload();
               }
        });
    }, 1500);

}

function searchSHis(shelfCode){
    var stockWH = document.getElementById("whvalue").value;
    setTimeout(function(){
    $.ajax({
        url: localStorage.api_url_server+""+localStorage.api_url_searchshelf_is,
        data: '{"accessToken":"'+localStorage.token+'","searchWH":"'+stockWH+'","searchShelf":"'+shelfCode+'"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "POST",
        cache: false,
        success: function(result){
            console.log(JSON.stringify(result.data));
            console.log(localStorage.api_url_server+""+localStorage.api_url_searchshelf_is);
            console.log('{"accessToken":"'+localStorage.token+'","searchWH":"'+stockWH+'","searchShelf":"'+shelfCode+'"}');
            if(JSON.stringify(result.data)=="[]"){
                 alertify.alert("ไม่มีข้อมูลชั้นเก็บสินค้าของ "+shelfCode);
                 closeload();
            }else{
                 var shelName = "";
                 var shelfCode = "";
                 $.each(result.data, function(key, val) {
                       shelName = val['shelfName'].trim();
                       shelfCode = val['shelfCode'].trim();
                 });
                 var main =  document.getElementsByClassName('CTshelves');
                 for(var i = 0; i < main.length; i++){
                     main[i].innerHTML = shelName;
                     main[0].style.color = localStorage.fontColor;
                 }
                 document.getElementById("shel").value = shelfCode;
                // document.getElementById("CTshelves").innerHTML = shelName;
                /* document.getElementById("barcodetext").innerHTML = "";
                 document.getElementById("CTitemno").innerHTML = "<font color='red'>** SCANBARCODE ITEM **</font>";
                 document.getElementById("CTitemname").innerHTML = "";
                 document.getElementById("CTunit").innerHTML = "";
                 document.getElementById("itemNo").value = "";
                 document.getElementById("itemsName").value = "";
                 document.getElementById("Cunit").value = "";
                 document.getElementById("counts").value = "";*/
                 clear_manual();
                 $.mobile.changePage("#Sscanitem",{transition: 'slidefade',reverse: true});
                // document.getElementById("counts").disabled = true;
                // document.activeElement.blur();


                 closeload();
            }
        },
        error: function (error) {
            console.log("api gen SH" + JSON.stringify(error));
            switch_url();
            searchSHis(shelfCode);
            closeload();
        }

    });
    }, 1500);
}

function Select_item(itemCode){
//    alert(true)
    loading();
    var itc = String(itemCode);
    searchItem(itc);
}

function searchItem(itemCode){
//    console.log('testมาถึงละ  '+itemCode)
    var DocNo = document.getElementById("valdocIS").value;
    var shel = document.getElementById("shel").value;
    console.log('{"barcode":"'+itemCode+'","docno":"'+DocNo+'","type":"3","shelfcode":"'+shel+'","branch":"'+localStorage.branch+'"}');
    setTimeout(function(){
    $.ajax({
           url: localStorage.api_url_server+""+localStorage.api_url_search_item_pr,
           data: '{"accessToken":"'+localStorage.token+'","barcode":"'+itemCode+'","docno":"'+DocNo+'","type":"3","shelfcode":"'+shel+'","branch":"'+localStorage.branch+'"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(result){
                 console.log(JSON.stringify(result.itemcode));
                 console.log(localStorage.api_url_server+""+localStorage.api_url_search_item_pr);

                 if(JSON.stringify(result.itemcode)==="[]"){
                     alertify.alert("บาร์โค้ด "+itemCode+" ไม่มีอยู่ในทะเบียนสินค้า");
//                     closeload();
                 }else{
                     var itemcode = "";
                     var itemName = "";
                     var range = "";
                     var cntitem = "";
                     var units = "";
                     var old_cnt = "";
                     var whCode = "";
//                     console.log('checkนี้นะListISBarcode '+result.listISBarcode)
                     if(result.itemcode==null){
//                       console.log('logz    '+JSON.stringify(result))
//                       console.log("data itemcode : null");
                           if(result.listISBarcode == null){
                           console.log('ถึงแ้ล้วอิอิ');
                           alertify.error("ไม่มีรหัสบาร์โค้ดนี้ในระบบ");
                           closeload();
                           }
                         $.each(result.listISBarcode, function(key, val) {
                             itemcode = val['itemcode'];
                             itemName = val['itemname'];
                             range = val['range'];
                             if(val['qty']==0){
                               cntitem = "";
                               old_cnt = "-";
                             }else{
                               old_cnt = val['qty'];
                               cntitem = val['qty'];
                             }
                             units = val['unitcode'];
                             apcode = val['apCode'];
                             apname = val['apName'];

                             console.log(cntitem);
                             console.log(old_cnt);

                         });
                     }else{
                       //  $.each(result.listBarcode, function(key, val) {
                         itemcode = result.itemcode;
                         itemName = result.itemname;
                         range = result.range;
                         if(result.qty==0){
                            cntitem = "";
                            old_cnt = "-";
                         }else{
                            cntitem = result.qty;
                            old_cnt = result.qty;
                         }
                            units = result.unitcode;
                            apcode = result.apCode;
                            apname = result.apName;
                        // });
                         console.log(cntitem);
                         console.log(old_cnt);
                         var ra = 1;
                         var ch = 0;
                         $.each(result.listWH,function(k,v){
                            ch = ra%2;
                            if(ch!=0){
                                whCode += v['whcode'];
                            }else{
                                whCode += ", "+v['whcode'];
                            }
                            ra++;
                         });
                     }
                     $.mobile.changePage("#countitem",{transition: 'slidefade',reverse: true});

                     document.getElementById("CTitemno").innerHTML = itemcode;
                     document.getElementById("CTitemname").innerHTML = itemName;
                     document.getElementById("CTunit").innerHTML = units;
                     document.getElementById("CTwhcode").innerHTML = whCode;
                     document.getElementById("barcodetext").innerHTML = itemCode;
                     document.getElementById("itemNo").value = itemcode;
                     document.getElementById("itemsName").value = itemName;
                     document.getElementById("Cunit").value = units;
                     document.getElementById("counts").value = "";

                     document.getElementById("Voldcnt").value = cntitem;
                     document.getElementById("oldcnt").innerHTML = old_cnt;

                     document.getElementById("counts").autofocus = true;
                     localStorage.enter = null;
                     counts_focus();

                 }
           closeload();
           },
           error: function (error) {
                 console.log("api gen ITEM" + JSON.stringify(error));
                 switch_url();
                 searchItem(itemCode);
                 closeload();
                 $.mobile.changePage("#Sscanitem",{transition: 'slidefade',reverse: true});
           }

    });
    }, 1500);
}
function counts_focus(){
    $("#countitem").bind('pageshow', function() {
        $('#counts').focus();
    });
}
function like_item(){ ///ปัญหา
    var itemdata = document.getElementById("manual_searchItem").value;
    var itemlist = "";
    $.ajax({
               url: localStorage.api_url_server+"NPInventoryWs/V2/inven/searchItemMaster",
               data: '{"accessToken":"'+localStorage.token+'","search":"'+itemdata+'"}',
               contentType: "application/json; charset=utf-8",
               dataType: "json",
               type: "POST",
               cache: false,
               success: function(result){

                    console.log(JSON.stringify(result.itemMasterList));
                    if(JSON.stringify(result.itemMasterList)=="[]"){
                       itemlist = '<label style="width:100%; color:blue;"> ** ไม่มีข้อมูลที่ค้นหา ** </label>';
                    }else{
                       $.each(result.itemMasterList, function(key,val){
                           itemlist += '<label style="width:100%; font-size:12px; border-bottom:1px dashed gray;"';
                           itemlist += 'onclick="Select_item(\'';
                           itemlist += val["itemCode"].trim();
                           itemlist += '\')"><div class="ui-grid-b">';
                           itemlist += '<div class="ui-block-a" style="width:35%;">';
                           itemlist += val["itemCode"].trim();
                           itemlist += '</div>';
                           itemlist += '<div class="ui-block-b" style="width:40%;">';
                           itemlist += val["itemName"].trim();
                           itemlist += '</div>';
                           itemlist += '<div class="ui-block-c" style="width:25%; text-align:center;">';
                           itemlist += val["unitCode"].trim();
                           itemlist += '</div></div></div></label>';
                       });
                    }

                    document.getElementById("like_itemlist").innerHTML = itemlist;
               },
               error: function(err){
                    console.log("api gen Like_item" + JSON.stringify(error));
                    switch_url();
                    like_item();
               }
       });

}

function backstock(){
    loading();
    isList();
    $.mobile.changePage('#countstock',{transition: 'slidefade',reverse: true});
    //window.location="#stock";
}

function savestock(){
   var oldc = document.getElementById("Voldcnt").value;
   console.log(oldc);
   if(oldc!=""){
    alertify.set({ labels: {
        ok     : "แทนที่",
        cancel : "บวกเพิ่ม"
    } });
    alertify.confirm( "ท่านต้องการบวกเพิ่มหรือแทนที่จำนวนที่นับได้ ?", function (e) {
        if (e) {
                 loading();
                 setTimeout(function(){
                 var DocNo = document.getElementById("valdocIS").value;
                 var sv = document.getElementById("shel").value;
                 var noitem = document.getElementById("itemNo").value;
                 var wh = document.getElementById("whvalue").value;
                 var citem = document.getElementById("counts").value;
                 var uitem = document.getElementById("Cunit").value;
                 var userID = localStorage.username;
                 if(citem == ""||noitem == ""){
                 //alert("กรุณากรอกข้อมูลให้ครบด้วย !!");
                 }else{
                  document.addEventListener("keydown", function(event) {
                     event.returnValue = true;
                  });
                      $.ajax({
                              url: localStorage.api_url_server+"NPInventoryWs/V2/is/insertIS",
                              data: '{"accessToken":"'+localStorage.token+'","docNo":"'+DocNo+'","user":"'+userID+'","itemCode":"'+noitem+'","unitcode":"'+uitem+'","whCode":"'+wh+'","shelfCode":"'+sv+'","qty":"'+citem+'"}',
                              contentType: "application/json; charset=utf-8",
                              dataType: "json",
                              type: "POST",
                              cache: false,
                              success: function(result){
                                 console.log(JSON.stringify(result));

                                 document.getElementById("CTitemno").innerHTML = "<font color='red'>** SCANBARCODE ITEM **</font>";
                                 document.getElementById("CTitemname").innerHTML = "";
                                 document.getElementById("CTunit").innerHTML = "";
                                 document.getElementById("itemNo").value = "";
                                 document.getElementById("itemsName").value = "";
                                 document.getElementById("Cunit").value = "";
                                 document.getElementById("counts").value = "";
                                 document.getElementById("barcodetext").innerHTML = "";

                                 $("#scanitemcode").show();
                                 alertify.success("บันทีกข้อมูลเรียบร้อยแล้ว!");
                                 //document.getElementById("counts").disabled = true;
                                 clear_manual();
                                 localStorage.enter = null;

                                 $.mobile.changePage("#Sscanitem");
                                 closeload();

                              },
                              error: function (error) {
                                 $("#scanPopup").popup("open");
                                 console.log("api gen savestock" + JSON.stringify(error));
                                 switch_url();
                                 savestock();
                                 closeload();
                                 localStorage.enter = null;
                                 //$.mobile.changePage("#countitem");
                              }
                         });
                 }
                 }, 1500);

        } else {
                loading();
                setTimeout(function(){
                var DocNo = document.getElementById("valdocIS").value;
                var sv = document.getElementById("shel").value;
                var noitem = document.getElementById("itemNo").value;
                var wh = document.getElementById("whvalue").value;
                var citem = parseInt(document.getElementById("counts").value)+parseInt(oldc);
                var uitem = document.getElementById("Cunit").value;
                var userID = localStorage.username;
                if(citem == ""||noitem == ""){
                //alert("กรุณากรอกข้อมูลให้ครบด้วย !!");
                }else{
                console.log('เพิ่มการนับสต๊อก บวกต่อ'+localStorage.api_url_server+"NPInventoryWs/V2/is/insertIS"+'{"accessToken":"'+localStorage.token+'","docNo":"'+DocNo+'","user":"'+userID+'","itemCode":"'+noitem+'","unitcode":"'+uitem+'","whCode":"'+wh+'","shelfCode":"'+sv+'","qty":"'+citem+'"}');
                 document.addEventListener("keydown", function(event) {
                    event.returnValue = true;
                 });
                     $.ajax({
                             url: localStorage.api_url_server+"NPInventoryWs/V2/is/insertIS",
                             data: '{"accessToken":"'+localStorage.token+'","docNo":"'+DocNo+'","user":"'+userID+'","itemCode":"'+noitem+'","unitcode":"'+uitem+'","whCode":"'+wh+'","shelfCode":"'+sv+'","qty":"'+citem+'"}',
                             contentType: "application/json; charset=utf-8",
                             dataType: "json",
                             type: "POST",
                             cache: false,
                             success: function(result){
                                console.log(JSON.stringify(result));

                                document.getElementById("CTitemno").innerHTML = "<font color='red'>** SCANBARCODE ITEM **</font>";
                                document.getElementById("CTitemname").innerHTML = "";
                                document.getElementById("CTunit").innerHTML = "";
                                document.getElementById("itemNo").value = "";
                                document.getElementById("itemsName").value = "";
                                document.getElementById("Cunit").value = "";
                                document.getElementById("counts").value = "";
                                document.getElementById("barcodetext").innerHTML = "";

                                $("#scanitemcode").show();
                                alertify.success("บันทีกข้อมูลเรียบร้อยแล้ว!");
                                //document.getElementById("counts").disabled = true;
                                clear_manual();
                                localStorage.enter = null;

                                $.mobile.changePage("#Sscanitem");
                                closeload();

                             },
                             error: function (error) {
                                $("#scanPopup").popup("open");
                                console.log("api gen savestock" + JSON.stringify(error));
                                switch_url();
                                savestock();
                                closeload();
                                localStorage.enter = null;
                                //$.mobile.changePage("#countitem");
                             }
                        });
                }
                }, 1500);

        }
    });
   }else{
    loading();
    setTimeout(function(){
    var DocNo = document.getElementById("valdocIS").value;
    var sv = document.getElementById("shel").value;
    var noitem = document.getElementById("itemNo").value;
    var wh = document.getElementById("whvalue").value;
    var citem = document.getElementById("counts").value;
    var uitem = document.getElementById("Cunit").value;
    var userID = localStorage.username;
    if(citem == ""||noitem == ""){
    //alert("กรุณากรอกข้อมูลให้ครบด้วย !!");
    }else{
    console.log('result:[{"docNo":"'+DocNo+'","user":"'+userID+'","itemCode":"'+noitem+'","unitcode":"'+uitem+'","whCode":"'+wh+'","shelfCode":"'+sv+'","qty":"'+citem+'"}]');
     document.addEventListener("keydown", function(event) {
        event.returnValue = true;
     });
         $.ajax({
                 url: localStorage.api_url_server+"NPInventoryWs/V2/is/insertIS",
                 data: '{"accessToken":"'+localStorage.token+'","docNo":"'+DocNo+'","user":"'+userID+'","itemCode":"'+noitem+'","unitcode":"'+uitem+'","whCode":"'+wh+'","shelfCode":"'+sv+'","qty":"'+citem+'"}',
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 type: "POST",
                 cache: false,
                 success: function(result){
                    console.log(JSON.stringify(result));

                    document.getElementById("CTitemno").innerHTML = "<font color='red'>** SCANBARCODE ITEM **</font>";
                    document.getElementById("CTitemname").innerHTML = "";
                    document.getElementById("CTunit").innerHTML = "";
                    document.getElementById("itemNo").value = "";
                    document.getElementById("itemsName").value = "";
                    document.getElementById("Cunit").value = "";
                    document.getElementById("counts").value = "";
                    document.getElementById("barcodetext").innerHTML = "";

                    $("#scanitemcode").show();
                    alertify.success("บันทีกข้อมูลเรียบร้อยแล้ว!");
                    //document.getElementById("counts").disabled = true;
                    clear_manual();
                    localStorage.enter = null;

                    $.mobile.changePage("#Sscanitem");
                    closeload();

                 },
                 error: function (error) {
                    $("#scanPopup").popup("open");
                    console.log("api gen savestock" + JSON.stringify(error));
                    switch_url();
                    savestock();
                    closeload();
                    localStorage.enter = null;
                    //$.mobile.changePage("#countitem");
                 }
            });
    }
    }, 1500);

   }
}

function savedata(){
     document.addEventListener("keydown", function(event) {
        event.returnValue = true;
     });
    var update = document.getElementById("stupdate").value
    if(update==0){
    loading();
    setTimeout(function(){
         var DocNo = document.getElementById("valdocIS").value;
            var UserID = localStorage.username;
            console.log('บันทึกข้อมูลการนับสต๊อก  '+localStorage.api_url_server+""+localStorage.api_url_confirm_is+'{"accessToken":"'+localStorage.token+'","docNo":"'+DocNo+'","user":"'+UserID+'","isCancel":"0"}');
            console.log('Update IS :{"DocNo":"'+DocNo+'","userID":"'+UserID+'","isCancel":"0"}');
            $.ajax({
                url: localStorage.api_url_server+""+localStorage.api_url_confirm_is,
                data: '{"accessToken":"'+localStorage.token+'","docNo":"'+DocNo+'","user":"'+UserID+'","isCancel":"0"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "POST",
                cache: false,
                success: function(result){
                    console.log(JSON.stringify(result));
                    $.mobile.changePage("#stock",{transition: 'slidefade'});
                    document.getElementById("valdocIS").value = "";
                    document.getElementById("shel").value = "";
                    document.getElementById("itemNo").value = "";
                    document.getElementById("whvalue").value = "";
                    document.getElementById("counts").value = "";
                    document.getElementById("Cunit").value = "";
                    document.getElementById("barcodetext").innerHTML = "";
                    alertify.success("บันทึกใบนับที่ "+DocNo+" แล้ว");
                    closeload();
                    localStorage.enter = null;

                },
                error: function(err){
                    console.log("api gen savedata" + JSON.stringify(error));
                    switch_url();
                    savedata();
                    closeload();
                    localStorage.enter = null;
                    $.mobile.changePage("#countitem",{transition: 'slidefade'});
                }
            });
            closeload();
            $.mobile.changePage("#stock",{transition: 'slidefade'});
            localStorage.enter = null;
        }, 1500);
    }else{
         alertify.alert("ไม่มีรายการสินค้า ไม่สามารถบันทึกได้ กรุณาเพิ่มรายการสินค้า");
         localStorage.enter = null;
    }
}

function isList(){
    console.log("list is detail");
    loading();
    setTimeout(function(){
    var DocNo = document.getElementById("valdocIS").value;
    console.log('แสดงข้อมูลการนับสต๊อก(ในตาราง)  e'+localStorage.api_url_server+"NPInventoryWs/V2/is/isList"+'{"accessToken":"'+localStorage.token+'","docNo":"'+DocNo+'"}');
    $.ajax({
            url: localStorage.api_url_server+"NPInventoryWs/V2/is/isList",
            data: '{"accessToken":"'+localStorage.token+'","docNo":"'+DocNo+'"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            cache: false,
            success: function(result){
                console.log(JSON.stringify(result.listData));
                var detail = "";
                var wh = document.getElementById("whvalue").value;
                if(JSON.stringify(result.listData)!="[]"){
                    $.each(result.listData, function(key,val){
                                    itemno = val['itemCode'];
                                    if(itemno==null){
                                         sitemno=itemno;
                                    }else{
                                         sitemno = Math.ceil(itemno.length/6);
                                         console.log(sitemno);
                                    }
                                    var s = 0;
                                    var str1 = "";
                                    if(sitemno!=null){
                                      for(var i = 0;i<sitemno;i++){
                                           str1 += itemno.substr(s,6)+"<br>";
                                           s += 6;
                                      }
                                    }else{
                                      str1=sitemno;
                                    }

                                        detail += '<label class="csdelete" csdelete-id="'+DocNo+'/'+wh+'/'+val['shelfCode']+'/'+val['itemCode']+'/'+val['unitCode']+'" csdelete-detail-id="'+val['itemCode']+'" id="'+val['itemCode']+'" style="text-align:center; border-bottom:1px gray dashed;">';
                                             detail += '<div class="ui-grid-d">';
                                              detail += '<div class="ui-block-a">';
                                                     detail += str1;
                                              detail += '</div>';
                                              detail += '<div class="ui-block-b">';
                                                     detail += val['itemName'];
                                              detail += '</div>';
                                              detail += '<div class="ui-block-c">';
                                                     detail += val['shelfCode'];
                                              detail += '</div>';
                                              detail += '<div class="ui-block-d">';
                                                     detail += val['inspectQty']+"  "+val['unitCode'];
                                              detail += '</div>';
                                              detail += '<div class="ui-block-e">';

                                                if(val['diffQty']!="0"){
                                                    detail += '<img src="images/Alert.png" width="24">';
                                                }else if(val['diffQty']=="0"){
                                                    detail += '<img src="images/check.png" width="24">';
                                                }

                                              detail += '</div>';
                                             detail += '</div>';
                                        detail += '</label>';
                                    });
                    document.getElementById("stupdate").value = 0;
                    localStorage.enter = null;
                }else{
                    detail = '<label style="border-bottom:1px dashed black; padding:2%; color:red; text-align:center"><h5>** ยังไม่มีข้อมูลสินค้าที่นับในใบนับนี้ **</h5></label>';
                    document.getElementById("stupdate").value = 1;
                    localStorage.enter = null;
                }

                document.getElementById("csdetail").innerHTML = detail;
                closeload();
                $.mobile.changePage("#countstock",{transition: 'slidefade'});
                return false;
            },
            error: function(err){
                console.log("api isList" + JSON.stringify(error));
                switch_url();
                isList();
                closeload();
                $.mobile.changePage("#countstock",{transition: 'slidefade'});
                localStorage.enter = null;
            }
        });
    }, 1500);
}


function CSback(){
    alertify.set({ labels: {
        ok     : "yes",
        cancel : "no"
    } });
    alertify.confirm( "ท่านไม่ต้องการเพิ่มสินค้าแล้วใช่หรือไม่ ?", function (e) {
        if (e) {
             loading();
             backstock();
             return false;
        } else {
            //after clicking Cancel
        }
    });
}

function selsh(){
          /*loading();
          setTimeout(function(){ document.getElementById("shel").value = "-";
                               document.getElementById("CTshelves").innerHTML = "-";
                               document.getElementById("barcodetext").innerHTML = "";
                               document.getElementById("CTitemno").innerHTML = "<font color='red'>** SCANBARCODE ITEM **</font>";
                               document.getElementById("CTitemname").innerHTML = "";
                               document.getElementById("CTunit").innerHTML = "";
                               document.getElementById("itemNo").value = "";
                               document.getElementById("itemsName").value = "";
                               document.getElementById("Cunit").value = "";
                               document.getElementById("counts").value = "";
                               $("#count1").show();
                               $("#count2").hide();
                               document.getElementById("counts").disabled = true;
                               $.mobile.changePage("#countitem");
                               document.activeElement.blur();
                               }, 1500);*/

}

function c_s(){
    alertify.set({ labels: {
        ok     : "บันทึก",
        cancel : "ยกเลิกใบนับ"
    } });
    alertify.confirm("ท่านต้องการบันทึกใบนับสต๊อกหรือไม่ ?", function (e) {
        if (e) {
            savedata();
            //alertify.success("บันทึกเรียบร้อย");
        } else {
            var DocNo = document.getElementById("valdocIS").value;
                var UserID = localStorage.username;
                console.log('Update IS :{"DocNo":"'+DocNo+'","userID":"'+UserID+'","isCancel":"1"}');
                $.ajax({
                    url: localStorage.api_url_server+""+localStorage.api_url_confirm_is,
                    data: '{"accessToken":"'+localStorage.token+'","docNo":"'+DocNo+'","user":"'+UserID+'","isCancel":"1"}',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST",
                    cache: false,
                    success: function(result){
                        console.log(JSON.stringify(result));
                        $.mobile.changePage("#stock",{transition: 'slidefade'});
                        document.getElementById("valdocIS").value = "";
                        document.getElementById("shel").value = "";
                        document.getElementById("itemNo").value = "";
                        document.getElementById("whvalue").value = "";
                        document.getElementById("counts").value = "";
                        document.getElementById("Cunit").value = "";
                        alertify.error("ยกเลิกใบนับเรียบร้อย");
                    },
                    error: function(err){
                        console.log("api gen savedata" + JSON.stringify(error));
                        switch_url();
                        c_s();
                        $.mobile.changePage("#stock",{transition: 'slidefade'});
                    }
                });
                $.mobile.changePage("#stock",{transition: 'slidefade'});
                 return false;
        }
    });
}
//////////                     cancel print                  //////////////
$(document).on('taphold', '.csdeletecpr', function() {
      console.log("this hold");
      var link_name = $(this).attr('csdelete-id');
      console.log(link_name);
      var link_data = $(this).attr('csdelete-detail-id');
      var link_id = $(this).attr('id');
      var data = link_name.split("/");
      var $csd = $("<div/>").popup({
        dismissible: true,
        //theme: "a",
        transition: "pop",
        arrow: "b",
        positionTo: '#'+link_id
        }).on("popupafterclose", function () {
    //remove the popup when closing
    $(this).remove();
    }).css({
   'padding': '10%',
   'color': '#000080',
   'background': '#63b8ff'
   });
    console.log(link_name);
    console.log('#'+link_id);
    $("<a>", {
    text: "Delete",
    href: "#",
    onclick: "csDeletprint('"+data[0]+"','"+data[1]+"', '"+data[2]+"','"+data[3]+"','"+data[4]+"','"+data[5]+"','"+data[6]+"');"
    }).appendTo($csd);

    $csd.popup('open').enhanceWithin();

    });

function csDeletprint(ItemCode,BarCode,Qty,Price,LabelType,CreatorCode,unitcode){
//alert(ItemCode+'/'+BarCode+'/'+Qty+'/'+Price+'/'+LabelType+'/'+CreatorCode+'/'+unitcode);
if(Price == 'undefined'){
var Price = 0;
}
if(BarCode == 'undefined'){
var BarCode = '';
}
if(Qty ==  'undefined'){
var Qty = 0;
}
if(LabelType ==  'undefined'){
var LabelType = '';
}
if(unitcode ==  'undefined'){
var unitcode = '';
}

alertify.set({ labels: {
        ok     : "บันทึก",
        cancel : "ยกเลิก"
    } });
//    console.log('{"ItemCode":"'+ItemCode+'","BarCode":"'+BarCode+'","Qty":'+Qty+',"Price":'+Price+',"LabelType":"'+LabelType+'","CreatorCode":"'+CreatorCode+'","unitcode":"'+unitcode+',"Branch":"'+localStorage.branch+'"}');
alertify.confirm("ต้องการลบ รหัส "+ItemCode+"  หรือไม่ ?", function (e) {
                                                if (e) {
                              $.ajax({
                              url: "http://venus.nopadol.com:9002/labelcancel",
                              data: '{"ItemCode":"'+ItemCode+'","BarCode":"'+BarCode+'","Qty":'+Qty+',"Price":'+Price+',"LabelType":"'+LabelType+'","CreatorCode":"'+CreatorCode+'","unitcode":"'+unitcode+'","Branch":"'+localStorage.branch+'"}',
                              contentType: "application/json; charset=utf-8",
                              dataType: "json",
                              type: "POST",
                              cache: false,
                              success: function(result){
                              console.log((result));
                              alertify.error('ลบเรียบร้อย');
                                    typeprint();
                              },
                              error: function (err){
                                  console.log(err);

                              }
                                       });
                                                }else{

                                                }
                                            });
}

////..................................................//////


////////////////////////////////////////////////////////////
$(document).on('taphold', '.csdelete', function() {
      console.log("this hold");
      var link_name = $(this).attr('csdelete-id');
      console.log(link_name);
      var link_data = $(this).attr('csdelete-detail-id');
      var link_id = $(this).attr('id');
      var data = link_name.split("/");
      var $csd = $("<div/>").popup({
        dismissible: true,
        //theme: "a",
        transition: "pop",
        arrow: "b",
        positionTo: '#'+link_id
        }).on("popupafterclose", function () {
    //remove the popup when closing
    $(this).remove();
    }).css({
   'padding': '10%',
   'color': '#fff',
   'background': 'red'
   });
    console.log(link_name);
    console.log('#'+link_id);
    $("<a>", {
    text: "Delete",
    href: "#",
    onclick: "csDeletitem('"+data[0]+"','"+data[1]+"', '"+data[2]+"','"+data[3]+"','"+data[4]+"');"
    }).appendTo($csd);

    $csd.popup('open').enhanceWithin();

    });

function csDeletitem(DocNo,wh,sh,itemCode,unitCode){
       var $loadde = $("<div>").popup({
            dismissible: false,
            theme: "a",
            positionto: "window",
            transition: "flip",
            }).css({
                   'background': '#F8F8FF',
                   '-webkit-box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                   'box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                   'width' : 250,
                   'margin-left' : '1%'
                   });

            $("<img>", {
                        src: "images/loading2.gif"
                        }).appendTo($load);
            $loadde.popup('open');

        console.log(DocNo+"/"+wh+"/"+sh+"/"+itemCode+"/"+unitCode);
        $.ajax({
                url: localStorage.api_url_server+"NPInventoryWs/V2/is/deleteItem",
                data: '{"accessToken":"'+localStorage.token+'","docNo":"'+DocNo+'","itemCode":"'+itemCode+'","unitCode":"'+unitCode+'","whCode":"'+wh+'","shelfCode":"'+sh+'"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "POST",
                cache: false,
                success: function(result){
                    console.log(JSON.stringify(result));
                    alertify.success("ลบรายการเรียบร้อยแล้ว");
                    isList();
                     $loadde.popup("close");
                },
                error: function(err){
                    console.log("api gen csDeletitem" + JSON.stringify(error));
                    witch_url();
                    csDeletitem(DocNo,wh,sh,itemCode,unitCode);
                    closeload();
                }
            });

}

function clear_manual(){
     var declear = "";
     declear += '<label style="width:100%; color:red; text-align:center;"> ** รายการสินค้าที่ค้นหาได้ ** </label>';
     document.getElementById("manual_searchItem").value = "";
     document.getElementById("like_itemlist").innerHTML = declear;
}

function CMSback(){
    alertify.set({ labels: {
            ok     : "yes",
            cancel : "no"
        } });
        alertify.confirm( "ท่านต้องการค้นหาสินค้าใหม่ใช่หรือไม่ ?", function (e) {
        if(e){
             clear_manual();
             $("#scitemsh").show();
             $("#cntitem").hide();
             $("#count1").show();
             $("#count2").hide();
             $("#scanitemcode").show();
            // document.getElementById("counts").disabled = true;
             localStorage.enter = null;
             $.mobile.changePage("#Sscanitem",{transition: 'slidefade'});
        }else{

            }
        });

}


var $load;
function loading(){
        $load = $("<div>").popup({
        dismissible: false,
        theme: "a",
        positionto: "window",
        transition: "flip",
        }).css({
               'background': '#F8F8FF',
               '-webkit-box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
               'box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
               'width' : 250,
               'margin-left' : '1%'
               });

        $("<img>", {
                    src: "images/loading2.gif"
                    }).appendTo($load);
        $load.popup('open');
}

function closeload(){
    $load.popup("close");
}
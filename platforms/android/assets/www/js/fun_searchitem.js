window.addEventListener('native.onscanbarcode', function (schitem) {

       var page = "";
       //alert(pr.scanResult);
      // console.log(schitem.scanResult);
       localStorage.barcode = schitem.scanResult;
//        alert(schitem.scanResult);
       if(page == ""){
         page = $.mobile.activePage.attr('id');
       }
       $(document).on("pageshow", function (e, data) {
          page = $(this)[0].activeElement.id;
       });
        switch(page){
                    case "searchitem" : itemProfile(localStorage.barcode);
                                    break;
                    case "printpage" : typeprint(localStorage.barcode),
                                       searchproduct(localStorage.barcode);
                                    break;
                    case "printpage_searchitem" : detailitem(localStorage.barcode);
                                    break;



//                    case "printpage" : searchdetail_typeprint(localStorage.barcode);
//                                    break;
                    }
});
            function itemProfile(bcitem){
                                       // var valwh = document.getElementById("valwh").value;
                                        console.log('barcodez   '+bcitem);
                                        var tiwh = "";
                                        var itemdetail = "";

                                        loading();
                                        console.log('{"accessToken":"'+localStorage.token+'","whCode":"'+localStorage.branch+'","itemCode":"'+bcitem+'"}');
                                        console.log('ค้นหารายละเอียดสินค้า จจ'+localStorage.api_url_server+""+localStorage.api_url_profile_it+' '+'{"accessToken":"'+localStorage.token+'","whCode":"'+localStorage.branch+'","itemCode":"'+bcitem+'"}');
                                        $.ajax({
                                                url: localStorage.api_url_server+""+localStorage.api_url_profile_it,
                                                data: '{"accessToken":"'+localStorage.token+'","whCode":"'+localStorage.branch+'","itemCode":"'+bcitem+'"}',
                                                //data: '{"accessToken":"","whCode":"A44","itemCode":"8851123218016"}',
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json",
                                                type: "POST",
                                                cache: false,
                                                   success: function(result){
                                                   console.log(localStorage.api_url_server+""+localStorage.api_url_profile_it);
                                                   console.log(JSON.stringify(result));
                                                   if(result.itemProfileList.length==0){
//                                                       console.log('ตัวปัญหา result'+JSON.stringify(result));
                                                       alertify.alert("บาร์โค้ด "+bcitem+" ไม่มีข้อมูลทะเบียน");
                                                       closeload();
                                                       $("#bt-item").show();
                                                       $("#de-item").hide();
                                                   }else{

                                                    console.log(result.itemProfileList);
                                                    var js = result.itemProfileList;
                                                    //console.log(js);
                                                    /*$.each(js, function(key, val) {
                                                        bcCode = bcitem;
                                                        whCode = val['whCode'];
                                                        shCode = val['shelfCode'];
                                                        unitCode = val['stkunitcode'];
                                                        qty = val['qty'];
                                                    });*/
                                                        if(result.barCode==null||result.barCode==""){
                                                            var bcCode = "ไม่มีข้อมูล";
                                                        }else{
                                                            var bcCode = result.barCode;
                                                        }

                                                        if(result.itemCode==null||result.itemCode==""){
                                                            var itemCode = "ไม่มีข้อมูล";
                                                        }else{
                                                            var itemCode = result.itemCode;
                                                        }

                                                        if(result.itemName==null||result.itemName==""){
                                                            var itemName = "ไม่มีข้อมูล";
                                                        }else{
                                                            var itemName = result.itemName;
                                                        }

                                                        if(result.unitCode==null||result.unitCode==""){
                                                            var unitCode = "ไม่มีข้อมูล";
                                                        }else{
                                                            var unitCode = result.unitCode;
                                                        }

                                                        if(result.brandCode==null||result.brandCode==""){
                                                            var brandCode = "ไม่มีข้อมูล";
                                                        }else{
                                                            var brandCode = result.brandCode;
                                                        }

                                                        if(result.brandName==null||result.brandName==""){
                                                            var brandName = "ไม่มีข้อมูล";
                                                        }else{
                                                            var brandName = result.brandName;
                                                        }

                                                        if(result.rang==null||result.rang==""){
                                                            var rang = "ไม่มีข้อมูล";
                                                        }else{
                                                            var rang = result.rang;
                                                        }

                                                        if(result.price==null||result.price==""){
                                                            var price = "ไม่มีข้อมูล";
                                                        }else{
                                                            var price = result.price;
                                                        }

                                                        if(result.vendorCode==null||result.vendorCode==""){
                                                            var vendorCode = "ไม่มีข้อมูล";
                                                        }else{
                                                            var vendorCode = result.vendorCode;
                                                        }

                                                        if(result.vendorName==null||result.vendorName==""){
                                                            var vendorName = "ไม่มีข้อมูล";
                                                        }else{
                                                            var vendorName = result.vendorName;
                                                        }

                                                        if(result.qtyRV==null||result.qtyRV==""){
                                                            var qtyRV = 0;
                                                        }else{
                                                            var qtyRV = result.qtyRV;
                                                        }

                                                        if(result.unitCodeRV==null||result.unitCodeRV==""){
                                                            var unitCodeRV = "ไม่มีข้อมูล";
                                                        }else{
                                                            var unitCodeRV = result.unitCodeRV;
                                                        }

                                                        if(result.whCodeRV==null||result.whCodeRV==""){
                                                            var whCodeRV = "ไม่มีข้อมูล";
                                                        }else{
                                                            var whCodeRV = result.whCodeRV;
                                                        }

                                                        if(result.docdateRV==null||result.docdateRV==""){
                                                            var docdateRV = "ไม่มีข้อมูล";
                                                        }else{
                                                            var docdateRV = result.docdateRV;
                                                        }

                                                        if(result.qtyTF==null||result.qtyTF==""){
                                                            var qtyTF = 0;
                                                        }else{
                                                            var qtyTF = result.qtyTF;
                                                        }

                                                        if(result.whCodeTF==null||result.whCodeTF==""){
                                                            var whCodeTF = "ไม่มีข้อมูล";
                                                        }else{
                                                            var whCodeTF = result.whCodeTF;
                                                        }

                                                        if(result.unitCodeTF==null||result.unitCodeTF==""){
                                                            var unitCodeTF = "ไม่มีข้อมูล";
                                                        }else{
                                                            var unitCodeTF = result.unitCodeTF;
                                                        }

                                                        if(result.docdateTF==null||result.docdateTF==""){
                                                            var docdateTF = "ไม่มีข้อมูล";
                                                        }else{
                                                            var docdateTF = result.docdateTF;
                                                        }

                                                        if(result.qtyIV==null||result.qtyIV==""){
                                                            var qtyIV = 0;
                                                        }else{
                                                            var qtyIV = result.qtyIV;
                                                        }

                                                        if(result.unitCodeIV==null||result.unitCodeIV==""){
                                                            var unitCodeIV = "ไม่มีข้อมูล";
                                                        }else{
                                                            var unitCodeIV = result.unitCodeIV;
                                                        }

                                                        if(result.whCodeIV==null||result.whCodeIV==""){
                                                            var whCodeIV = "ไม่มีข้อมูล";
                                                        }else{
                                                            var whCodeIV = result.whCodeIV;
                                                        }

                                                        if(result.docdateIV==null||result.docdateIV==""){
                                                            var docdateIV = "ไม่มีข้อมูล";
                                                        }else{
                                                            var docdateIV = result.docdateIV;
                                                        }

                                                   // console.log(whCode);




//                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
//                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
//                                                        itemdetail += 'รหัสสินค้า :</div>';
//                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
//                                                        itemdetail += itemCode+'</div>';
//                                                        itemdetail += '</div>';


                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'บาร์โค้ด :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += bcCode+'</div>';
                                                        itemdetail += '</div>';

                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'รหัสสินค้า :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += itemCode+'</div>';
                                                        itemdetail += '</div>';

                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'ชื่อ :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += itemName+'</div>';
                                                        itemdetail += '</div>';

                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'ยี่ห้อ :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += brandCode+' '+brandName+'</div>';
                                                        itemdetail += '</div>';

                                                        itemdetail += '<div class="ui-grid-c" style="padding-bottom:5%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'หน่วยนับ :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:15%;">';
                                                        itemdetail += unitCode+'</div>';
                                                        itemdetail += '<div class="ui-block-c" style="width:25%; font-weight: bold;">';
                                                        itemdetail += 'เกรด :</div>';
                                                        itemdetail += '<div class="ui-block-d" style="text-align:left; padding-left:2%; width:20%;">';
                                                        itemdetail += rang+'</div>';
                                                        itemdetail += '</div>';

                                                        itemdetail += '<div class="ui-grid-c" style="padding-bottom:5%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'ราคา :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:15%;">';
                                                        itemdetail += price+'</div>';
                                                        itemdetail += '<div class="ui-grid-c" style="padding-bottom:5%;"></div>';


                                                        itemdetail += '<div class="ui-grid-d" style="border-top:1px solid black; border-bottom:1px solid black; padding:2% 0; width:100%;">';
                                                        itemdetail += '<div class="ui-block-a" style="text-align:center; width:5%; text-align:center;">';
                                                        itemdetail += '</div>';
                                                        itemdetail += '<div class="ui-block-b" style="word-wrap:break-word; width:20%; text-align:center;"><b>คลัง</b></div>';
                                                        itemdetail += '<div class="ui-block-c" style="word-wrap:break-word; width:29%; text-align:center;"><b>ชั้นเก็บ</b></div>';
                                                        itemdetail += '<div class="ui-block-d" style="word-wrap:break-word; width:33%; text-align:center;"><b>ยอดคงเหลือ</b></div></div>'


//                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
//                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
//                                                        itemdetail += 'ราคา :</div>';
//                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
//                                                        itemdetail += price+'</div>';
//                                                        itemdetail += '</div>';







//                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:2%;">';
//                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
//                                                        itemdetail += 'เจ้าหนี้ : </div>';
//                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
//                                                        itemdetail += ''+vendorCode+' '+vendorName+'</div>';
//                                                        itemdetail += '</div>';
//
//                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:2%;">';
//                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
//                                                        itemdetail += 'ขายล่าสุด : </div>';
//                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
//                                                        itemdetail += ''+qtyIV+' '+unitCodeIV+' (คลัง : '+whCodeIV+')</div>';
//                                                        itemdetail += '</div>';
//
//                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:2%;">';
//                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
//                                                        itemdetail += 'วันที่ : </div>';
//                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
//                                                        var dateIV = "";
//                                                                if(dateIV == null){
//                                                                    dateIV = "";
//                                                                }else{
//                                                                    dateIV = docdateIV.split("-");
//                                                                    var day = dateIV[2];
//                                                                    var month = dateIV[1];
//                                                                    var year = (parseInt(dateIV[0])+543);
//
//                                                                    dateIV = day+"/"+month+"/"+year;
//                                                                }
//
//                                                        itemdetail += ''+dateIV+'</div>';
//                                                        itemdetail += '</div>';

//                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:2%;">';
//                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
//                                                        itemdetail += 'รับล่าสุด : </div>';
//                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
//                                                        itemdetail += ''+qtyRV+' '+unitCodeRV+' (คลัง : '+whCodeRV+')</div>';
//                                                        itemdetail += '</div>';

//                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:2%;">';
//                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
//                                                        itemdetail += 'วันที่ : </div>';
//                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
//                                                        var dateRV = "";
//                                                                if(dateRV == null){
//                                                                    dateRV = "";
//                                                                }else{
//                                                                    dateRV = docdateRV.split("-");
//                                                                    var day = dateRV[2];
//                                                                    var month = dateRV[1];
//                                                                    var year = (parseInt(dateRV[0])+543);
//
//                                                                    dateRV = day+"/"+month+"/"+year;
//                                                                }
//
//                                                        itemdetail += ''+dateRV+'</div>';
//                                                        itemdetail += '</div>';

//                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:2%;">';
//                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
//                                                        itemdetail += 'โอนล่าสุด : </div>';
//                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
//                                                        itemdetail += ''+qtyTF+' '+unitCodeTF+' (คลัง : '+whCodeTF+')</div>';
//                                                        itemdetail += '</div>';

//                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:2%;">';
//                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
//                                                        itemdetail += 'วันที่ : </div>';
//                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
//                                                        var dateTF = "";
//                                                                if(dateTF == null){
//                                                                    dateTF = "";
//                                                                }else{
//                                                                    dateTF = docdateTF.split("-");
//                                                                    var day = dateTF[2];
//                                                                    var month = dateTF[1];
//                                                                    var year = (parseInt(dateTF[0])+543);
//
//                                                                    dateTF = day+"/"+month+"/"+year;
//                                                                }
//
//                                                        itemdetail += ''+dateTF+'</div>';
//                                                        itemdetail += '</div>';

                                                        var x = 1;
                                                        $.each(js, function(key, val) {
//                                                        console.log('ค่า x นะ  '+x);
                                                        console.log(JSON.stringify(val))

//                                                        itemdetail += '<label id="'+x+'">'; /***** หา label id จาก a href     */////

                                                        itemdetail += '<div class="ui-grid-b" style="padding-bottom:5%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:18%;">';
                                                        itemdetail += ''+val['whCode']+'</div>';
                                                        itemdetail += '<div class="ui-block-b" style="width:35%;text-align:center;">';
                                                        itemdetail += val['shelfCode']+'</div>';
                                                        itemdetail += '<div class="ui-block-c" style="width:40%; text-align:center;">';
                                                        itemdetail += val['qty']+' '+val['stkunitcode']+'</div>';
                                                        itemdetail += '</div>';






//                                                        itemdetail += '<a href="#" class="open"><div class="ui-grid-a" style="padding-top:5%; border-top:1px dashed gray;">';
//                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
//                                                        itemdetail += 'คลัง :</div>';
//                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
//                                                        itemdetail += ' '+val['whCode']+'</div></div></a>';
//
//
//                                                        itemdetail += '<div class="box" style="display:none; padding-top:2%;">';
//
//                                                                itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
//                                                                itemdetail += '<div class="ui-block-a" style="width:35%; text-align:right;">';
//                                                                itemdetail += 'ชั้นเก็บ : </div>';
//                                                                itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
//                                                                itemdetail += val['shelfCode']+'</div>';
//                                                                itemdetail += '</div>';
//
//                                                                itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
//                                                                itemdetail += '<div class="ui-block-a" style="width:35%; text-align:right;">';
//                                                                itemdetail += 'ยอดคงเหลือ : </div>';
//                                                                itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
//                                                                itemdetail += val['qty']+' '+val['stkunitcode']+'</div>';
//                                                                itemdetail += '</div>';
//
//                                                                itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
//                                                                itemdetail += '<div class="ui-block-a" style="width:35%; text-align:right;">';
//                                                                itemdetail += 'วันที่รับล่าสุด : </div>';
//                                                                itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
//                                                                var date = "";
//                                                                if(date == null){
//                                                                    date = "";
//                                                                }else{
//                                                                    date = val['docdate'].split("-");
//                                                                    var day = date[2];
//                                                                    var month = date[1];
//                                                                    var year = (parseInt(date[0])+543);
//
//                                                                    date = day+"/"+month+"/"+year;
//                                                                }
//
//                                                                itemdetail += ''+date+'</div>';
//                                                                itemdetail += '</div>';
//
//                                                        itemdetail += '</div></label>';
                                                        x++;
                                                        });



                                                    document.getElementById("de-item").innerHTML = itemdetail;
                                                    document.getElementById("itemdtail").style.textAlign = "right";
                                                    closeload();
                                                    $("#bt-item").hide();
                                                    $("#de-item").show();

                                                    //nav footer
                                                    $("#item_pro1").hide();
                                                    $("#item_pro2").hide();
                                                    $("#item_pro3").show();
                                                    /******************///////////////////
                                                    var open = $('.open'),
                                                        a = $('label').find('a');
                                                        console.log(a.hasClass('active'));
                                                        console.log(open);
                                                    open.click(function(e){

                                                        e.preventDefault();
                                                        var $this = $(this),
                                                            speed = 500;
                                                        if($this.hasClass('active') === true) {
                                                            $this.removeClass('active').next('.box').slideUp(speed);
                                                        } else if(a.hasClass('active') === false) {
                                                            $this.addClass('active').next('.box').slideDown(speed);
                                                        } else {
                                                            a.removeClass('active').next('.box').slideUp(speed);
                                                            $this.addClass('active').next('.box').delay(speed).slideDown(speed);
                                                        }
                                                    });
                                                    /****/////////////////////////

                                                    }
                                                    closeload();

                                            },
                                            error: function (error) {
                                                 console.log("error call api func itemProfile");
                                                 switch_url();
                                                 itemProfile(bcitem);
                                                 closeload();
                                            }
                                        });


}

function ref(){
  alertify.set({ labels: {
         ok     : "yes",
         cancel : "no"
     } });
 alertify.confirm("ท่านต้องการ scan คลังใหม่ หรือ ไม่ ?", function (e) {
        if (e) {
                    rewh();
               } else {
                    closeload();
               }
 });
}

function new_Item(){
    document.getElementById("scan_item_if").value = "";
    document.getElementById("scan_itemprofile").innerHTML = "SCANBARCODE ITEM";
    document.getElementById("scan_itemprofile").style.Color = "#f00";
    document.getElementById("scan_itemprofile").style.Align = "center";
    $("#bt-item").show();
    $("#de-item").hide();
    $("#item_pro1").hide();
    $("#item_pro2").show();
    $("#item_pro3").hide();
}

function rewh(){
        var item_wh = "";
        // var selected2 = "";
          /*   $.ajax({
                                 url: localStorage.api_url_server+"NPInventoryWs/V2/is/searchWH",
                                 data: '{"accessToken":"'+localStorage.token+'","search":""}',
                                 contentType: "application/json; charset=utf-8",
                                 dataType: "json",
                                 type: "POST",
                                 cache: false,
                                 success: function(result){
                                    // console.log(JSON.stringify(result.data));
                                          item_wh += '<select name="itemPro_wh" class="bt-cmp" style="width:100%; height:50px;" data-role="none">';
                                          $.each(result.data, function(key, val) {
                                                 item_wh += '<option value="'+val['whCode']+'">คลัง '+val['whCode']+'</option>';
                                          });
                                          item_wh += '</select>';
                                          document.getElementById("itemprofile_whCode").innerHTML = item_wh;
                                          document.getElementById("valwh").value = "";*/
                                          document.getElementById("bt-item").style.textAlign = "center";
                                         // document.getElementById("bt-wh").style.textAlign = "center";
                                          document.getElementById("bt-item").style.color = "red";
                                        //  document.getElementById("bt-wh").style.color = "red";
                                          $("#bt-item").show();
                                          $("#de-item").hide();
                                          $("#item_pro1").hide();
                                          $("#item_pro2").show();
                                          $("#item_pro3").hide();

                                          document.getElementById("scan_item_if").value = "";
                                          document.getElementById("scan_itemprofile").innerHTML = "SCANBARCODE ITEM";
                                          document.getElementById("scan_itemprofile").style.Color = "#f00";
                                          document.getElementById("scan_itemprofile").style.Align = "center";
                                          $.mobile.changePage("#searchitem");
/*
                                 },
                                 error: function (err){
                                    console.log("error call api func itemProfile");
                                    switch_url();
                                    rewh();
                                   //  $load.popup("close");
                                 }
                         });*/

}

function itemprofile_search_wh(){
    itemProfile($('select[name="itemPro_wh"] :selected').attr('value'));
}

function like_itemProfile(){
    var itemdata = document.getElementById("scan_item_if").value;
    document.getElementById("scan_itemprofile").innerHTML = '<img src="images/loadingitem.gif">';
    if(itemdata!=""){
        var itemlist = "";
            $.ajax({  url: localStorage.api_url_server+"NPInventoryWs/V2/inven/searchItemMaster",
                       data: '{"accessToken":"'+localStorage.token+'","search":"'+itemdata+'"}',
                       contentType: "application/json; charset=utf-8",
                       dataType: "json",
                       type: "POST",
                       cache: false,
                       success: function(result){
                       console.log("token search idz    "+'"accessToken":"'+localStorage.token+'","search":"'+itemdata+'"');
                       console.log('api searchh '+localStorage.api_url_server+"NPInventoryWs/V2/inven/searchItemMaster");
                            console.log(JSON.stringify(result.itemMasterList));
                            if(JSON.stringify(result.itemMasterList)=="[]"){
                               itemlist = '<label style="width:100%; color:red;"> ** ไม่มีข้อมูลที่ค้นหา ** </label>';
                            }else{
                               $.each(result.itemMasterList, function(key,val){
                                   itemlist += '<label style="width:100%; font-size:12px; border-bottom:1px dashed gray;"';
                                   itemlist += 'onclick="itemProfile(\'';
                                   itemlist += val['itemCode'].trim();
                                   itemlist += '\')"><div class="ui-grid-b">';
                                   itemlist += '<div class="ui-block-a" style="width:35%;">';
                                   itemlist += val['itemCode'].trim()+'</div>';
                                   itemlist += '<div class="ui-block-b" style="width:40%;">';
                                   itemlist += val['itemName'].trim()+'</div>';
                                   itemlist += '<div class="ui-block-c" style="width:25%; text-align:center;">';
                                   itemlist += val['unitCode'].trim();
                                   itemlist += '</div></div></div></label>';
                               });
                            }

                            document.getElementById("scan_itemprofile").innerHTML = itemlist;
                       },
                       error: function(err){
                          console.log("can't call api func like_itemProfile");
                          switch_url();
                          like_itemProfile();
                       }
               });
    }else{
         document.getElementById("scan_itemprofile").innerHTML = "SCANBARCODE ITEM";
         document.getElementById("scan_itemprofile").style.Color = "#f00";
         document.getElementById("scan_itemprofile").style.Align = "center";
    }


}

function backhome(){
    alertify.set({ labels: {
        ok     : "yes",
        cancel : "no"
    } });
    alertify.confirm("ท่านต้องการออกจากระบบ itemProfile หรือ ไม่ ?", function (e) {
        if (e) {
            $.mobile.changePage("#pagetwo");
        } else {
           closeload();
        }
    });

}

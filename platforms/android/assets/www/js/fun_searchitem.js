window.addEventListener('native.onscanbarcode', function (schitem) {

       var page = "";
       //alert(pr.scanResult);
      // console.log(schitem.scanResult);
       localStorage.barcode = schitem.scanResult;

       if(page == ""){
         page = $.mobile.activePage.attr('id');
       }
       $(document).on("pageshow", function (e, data) {
          page = $(this)[0].activeElement.id;
       });
        switch(page){
                    case "searchitem" : itemProfile(localStorage.barcode);
                                    break;
                    }
});
            function itemProfile(bcitem){
                                        var valwh = document.getElementById("valwh").value;
                                        console.log(valwh);
                                        var tiwh = "";
                                        var itemdetail = "";
                                        if(valwh==""){
                                        loading();

                                         $.ajax({
                                                url: localStorage.api_url_server+localStorage.api_url_searchwh_is,
                                                data: '{"accessToken":"'+localStorage.token+'","search":"'+bcitem+'"}',
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json",
                                                type: "POST",
                                                cache: false,
                                                   success: function(result){
                                                       var whName = "";
                                                       var whLoca = "";
                                                       var res = JSON.stringify(result.data);
                                                       if(res != "[]"){.3

                                                            $.each(result.data, function(key, wh) {
                                                                if(wh['whName']==""||wh['whName']==null){
                                                                    wh['whName']="ไม่มีข้อมูล";
                                                                }else{
                                                                    wh['whName']=wh['whName'];
                                                                }
                                                                if(wh['location']==""||wh['location']==null){
                                                                    wh['location']="ไม่มีข้อมูล";
                                                                }else{
                                                                    wh['location']=wh['location'];
                                                                }
                                                                whName = wh['whName'];
                                                                whLoca = wh['location'];
                                                            });
                                                            document.getElementById("de-wh").innerHTML = "<b>คลัง : </b>&nbsp;&nbsp;"+whName+" <i> "+whLoca+" </i>";
                                                            document.getElementById("de-wh").style.textAlign = "left";
                                                            document.getElementById("valwh").value =  bcitem;
                                                            $("#bt-wh").hide();
                                                            $("#bt-item").show();
                                                            $("#de-wh").show();
                                                            $("#itemdtail").show();

                                                            // nav footer
                                                            $("#item_pro1").hide();
                                                            $("#item_pro3").hide();
                                                            $("#item_pro2").show();

                                                            closeload();
                                                           // console.log("whname = "+whName);
                                                           // console.log("whname = "+whLoca);
                                                       }else{
                                                            console.log("ไม่มีข้อมูล");
                                                            alertify.alert("บาร์โค้ด "+bcitem+" ไม่มีข้อมูลทะเบียน");
                                                            closeload();

                                                       }

                                                    },
                                                   error: function (error) {
                                                        console.log("error call api func itemProfile");
                                                        switch_url();
                                                        itemProfile(bcitem);
                                                        closeload();
                                                    }

                                              });


                                        }else{

                                          loading();
                                        console.log('{"accessToken":"'+localStorage.token+'","whCode":"'+document.getElementById("valwh").value+'","itemCode":"'+bcitem+'"}');

                                        $.ajax({
                                                url: localStorage.api_url_server+""+localStorage.api_url_profile_it,
                                                data: '{"accessToken":"'+localStorage.token+'","whCode":"'+document.getElementById("valwh").value+'","itemCode":"'+bcitem+'"}',
                                                //data: '{"accessToken":"","whCode":"A44","itemCode":"8851123218016"}',
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json",
                                                type: "POST",
                                                cache: false,
                                                   success: function(result){
                                                   console.log(localStorage.api_url_server+""+localStorage.api_url_profile_it);
                                                   console.log(JSON.stringify(result));
                                                   if(result.itemProfileList.length==0){
                                                       alertify.alert("บาร์โค้ด "+bcitem+" ไม่มีข้อมูลทะเบียน");
                                                       closeload();
                                                       $("#bt-item").show();
                                                       $("#de-item").hide();
                                                   }else{
                                                        var bcCode = "";
                                                        var itemCode = "";
                                                        var itemName = "";
                                                        var unitCode = "";
                                                        var brandCode = "";
                                                        var brandName = "";
                                                        var rang = "";
                                                        var price = "";
                                                        var whCode = "";
                                                        var vendorCode = "";
                                                        var vendorName = "";
                                                    console.log(result.itemProfileList);
                                                    var js = result.itemProfileList;
                                                    //console.log(js);
                                                    $.each(js, function(key, val) {
                                                        bcCode = bcitem;
                                                        itemCode = val['itemCode'];
                                                        itemName = val['itemName'];
                                                        unitCode = val['unitCode'];
                                                        brandCode = val['brandCode'];
                                                        brandName = val['brandName'];
                                                        rang = val['rang'];
                                                        price = val['price'];
                                                        whCode = val['whCode'];
                                                        vendorCode = val['vendorCode'];
                                                        vendorName = val['vendorName'];
                                                    });
                                                        if(bcCode==null){
                                                            bcCode = "ไม่มีข้อมูล";
                                                        }

                                                        if(itemCode==null){
                                                            itemCode = "ไม่มีข้อมูล";
                                                        }

                                                        if(itemName==null){
                                                            itemName = "ไม่มีข้อมูล";
                                                        }

                                                        if(unitCode==null){
                                                            unitCode = "ไม่มีข้อมูล";
                                                        }
                                                        if(brandCode==null){
                                                            brandCode = "ไม่มีข้อมูล";
                                                        }
                                                        if(brandName==null){
                                                            brandName = "ไม่มีข้อมูล";
                                                        }
                                                        if(rang==null){
                                                            rang = "ไม่มีข้อมูล";
                                                        }
                                                        if(price==null){
                                                            price = "ไม่มีข้อมูล";
                                                        }
                                                        if(whCode==null){
                                                            whCode = "ไม่มีข้อมูล";
                                                        }
                                                        if(bcCode==null){
                                                            bcCode = "ไม่มีข้อมูล";
                                                        }
                                                        if(vendorCode==null){
                                                            vendorCode = "ไม่มีข้อมูล";
                                                        }
                                                        if(vendorName==null){
                                                            vendorName = "ไม่มีข้อมูล";
                                                        }

                                                    console.log(whCode);
                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'รหัสบาร์โค้ด :</div>';
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
                                                        itemdetail += 'ราคา :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += price+'</div>';
                                                        itemdetail += '</div>';

                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'หน่วยนับ :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += unitCode+'</div>';
                                                        itemdetail += '</div>';

                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'ยี่ห้อ :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += brandCode+' '+brandName+'</div>';
                                                        itemdetail += '</div>';

                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'คลัง :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += whCode+'</div>';
                                                        itemdetail += '</div>';

                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:2%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'เกรด :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += rang+'</div>';
                                                        itemdetail += '</div>';

                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:2%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'เจ้าหนี้ : </div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
                                                        itemdetail += ''+vendorCode+' '+vendorName+'</div>';
                                                        itemdetail += '</div>';

                                                        var x = 1;
                                                        $.each(js, function(key, val) {
                                                        console.log(x);

                                                        itemdetail += '<label id="'+x+'">'; /***** หา label id จาก a href     */////

                                                        itemdetail += '<a href="#" class="open"><div class="ui-grid-a" style="padding-top:5%; border-top:1px dashed gray;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'ชั้นเก็บ :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += ' '+val['shelfCode']+'</div></div></a>';


                                                        itemdetail += '<div class="box" style="display:none; padding-top:2%;">';

                                                                itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                                itemdetail += '<div class="ui-block-a" style="width:35%; text-align:right;">';
                                                                itemdetail += 'จำนวน : </div>';
                                                                itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
                                                                itemdetail += ''+val['qty']+'</div>';
                                                                itemdetail += '</div>';

                                                                itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                                itemdetail += '<div class="ui-block-a" style="width:35%; text-align:right;">';
                                                                itemdetail += 'ขายล่าสุด : </div>';
                                                                itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
                                                                itemdetail += ''+val['qtyIV']+' '+val['unitCodeIV']+'</div>';
                                                                itemdetail += '</div>';

                                                                itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                                itemdetail += '<div class="ui-block-a" style="width:35%; text-align:right;">';
                                                                itemdetail += 'วันที่ : </div>';
                                                                itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
                                                                var dateIV = "";
                                                                if(dateIV == null){
                                                                    dateIV = "";
                                                                }else{
                                                                    dateIV = val['docdateIV'].split("-");
                                                                    var day = dateIV[2];
                                                                    var month = dateIV[1];
                                                                    var year = (parseInt(dateIV[0])+543);

                                                                    dateIV = day+"/"+month+"/"+year;
                                                                }

                                                                itemdetail += ''+dateIV+'</div>';
                                                                itemdetail += '</div>';

                                                                itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                                itemdetail += '<div class="ui-block-a" style="width:35%; text-align:right;">';
                                                                itemdetail += 'รับล่าสุด : </div>';
                                                                itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
                                                                itemdetail += ''+val['qtyRV']+' '+val['unitCodeRV']+'</div>';
                                                                itemdetail += '</div>';

                                                                itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                                itemdetail += '<div class="ui-block-a" style="width:35%; text-align:right;">';
                                                                itemdetail += 'วันที่ : </div>';
                                                                itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';

                                                                var dateRV = "";
                                                                if(dateRV == null){
                                                                    dateRV = "";
                                                                }else{
                                                                    dateRV = val['docdateRV'].split("-");
                                                                    var day = dateRV[2];
                                                                    var month = dateRV[1];
                                                                    var year = (parseInt(dateRV[0])+543);

                                                                    dateRV = day+"/"+month+"/"+year;
                                                                }

                                                                itemdetail += ''+dateRV+'</div>';
                                                                itemdetail += '</div>';

                                                                itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                                itemdetail += '<div class="ui-block-a" style="width:35%; text-align:right;">';
                                                                itemdetail += 'โอนล่าสุด : </div>';
                                                                itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
                                                                itemdetail += ''+val['qtyTF']+' '+val['unitCodeTF']+'</div>';
                                                                itemdetail += '</div>';

                                                                itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                                itemdetail += '<div class="ui-block-a" style="width:35%; text-align:right;">';
                                                                itemdetail += 'วันที่ : </div>';
                                                                itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';

                                                                var dateTF = "";
                                                                if(dateTF == null){
                                                                    dateTF = "";
                                                                }else{
                                                                    dateTF = val['docdateTF'].split("-");
                                                                    var day = dateTF[2];
                                                                    var month = dateTF[1];
                                                                    var year = (parseInt(dateTF[0])+543);

                                                                    dateTF = day+"/"+month+"/"+year;
                                                                }

                                                                itemdetail += ''+dateTF+'</div>';
                                                                itemdetail += '</div>';

                                                        itemdetail += '</div></label>';
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
             $.ajax({
                                 url: localStorage.api_url_server+"NPInventoryWs/V2/is/searchWH",
                                 data: '{"accessToken":"'+localStorage.token+'","search":""}',
                                 contentType: "application/json; charset=utf-8",
                                 dataType: "json",
                                 type: "POST",
                                 cache: false,
                                 success: function(result){
                                    // console.log(JSON.stringify(result.data));
                                          item_wh += `<select name="itemPro_wh" class="bt-cmp" style="width:100%; height:50px;" data-role="none">`;
                                          $.each(result.data, function(key, val) {
                                                 item_wh += `<option value="`+val['whCode']+`">คลัง `+val['whCode']+`</option>`;
                                          });
                                          item_wh += `</select>`;
                                          document.getElementById("itemprofile_whCode").innerHTML = item_wh;
                                          document.getElementById("valwh").value = "";
                                          document.getElementById("bt-item").style.textAlign = "center";
                                          document.getElementById("bt-wh").style.textAlign = "center";
                                          document.getElementById("bt-item").style.color = "red";
                                          document.getElementById("bt-wh").style.color = "red";
                                          $("#itemdtail").hide();
                                          $("#de-wh").hide();
                                          $("#bt-item").hide();
                                          $("#bt-wh").show();
                                          $("#de-item").hide();

                                          //nav footer
                                          $("#item_pro1").show();
                                          $("#item_pro2").hide();
                                          $("#item_pro3").hide();
                                          document.getElementById("scan_item_if").value = "";
                                          document.getElementById("scan_itemprofile").innerHTML = "SCANBARCODE ITEM";
                                          document.getElementById("scan_itemprofile").style.Color = "#f00";
                                          document.getElementById("scan_itemprofile").style.Align = "center";
                                          $.mobile.changePage("#searchitem");

                                 },
                                 error: function (err){
                                    console.log("error call api func itemProfile");
                                    switch_url();
                                    rewh();
                                   //  $load.popup("close");
                                 }
                         });

}

function itemprofile_search_wh(){
    itemProfile($('select[name="itemPro_wh"] :selected').attr('value'));
}

function like_itemProfile(){
    var itemdata = document.getElementById("scan_item_if").value;
    document.getElementById("scan_itemprofile").innerHTML = '<img src="images/loadingitem.gif">';
    if(itemdata!=""){
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
                               itemlist = `<label style='width:100%; color:red;'> ** ไม่มีข้อมูลที่ค้นหา ** </label>`;
                            }else{
                               $.each(result.itemMasterList, function(key,val){
                                   itemlist += `<label style='width:100%; font-size:12px; border-bottom:1px dashed gray;'
                                                onclick="itemProfile('`+val['itemCode'].trim()+`')">
                                                   <div class="ui-grid-b">
                                                         <div class="ui-block-a" style="width:35%;">`
                                                           +val['itemCode'].trim()+
                                                         `</div>
                                                         <div class="ui-block-b" style="width:40%;">`
                                                            +val['itemName'].trim()+
                                                         `</div>
                                                         <div class="ui-block-c" style="width:25%; text-align:center;">`
                                                            +val['unitCode'].trim()+
                                                          `</div>
                                                       </div>
                                                     </div>
                                                </label>`;
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

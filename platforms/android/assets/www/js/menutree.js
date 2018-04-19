function tree(){
    var menu = "";

        menu += "<nav role='navigation'>";
        menu += '<label style="width: 100%; text-align: center;"><img src="images/people.png" width="30%" style="border-radius:100%; border:5px solid gray;"></label>';
        menu += '<label style="width: 100%; text-align: left; padding-left:10%; vertical-align: middle;">';
        menu += '  <div style="width: 30%; float: left; text-align: right; padding-right: 5%;"><b>รหัส : </b></div><div style="width: 65%; float: left;">'+localStorage.username+'</div>';
        menu += '   <br style="margin:0;">';
        menu += '</label>';
        menu += '<ul><hr class="type">';

            menu += '<li><a href="#listreorder">ระบบ Reorder</a></li>';
            //menu += '<li><a href="javascript:alert(\'ยังไม่เปิดให้บริการ\')">ระบบ Reorder</a></li>';
            menu += '<li><a href="javascript:sec_wh()">ระบบ นับสต๊อก</a></li>';
            menu += '<li><a href="#transfer_normal">ระบบ โอนสินค้า</a></li>';
            menu += '<li><a href="javascript:rewh()">ระบบ เช็คสต๊อก</a></li>';
            menu += '<li><a href="javascript:Check_user()">ระบบ จัดการที่เก็บของสินค้า</a></li>';
            menu += '<li><a href="javascript:up_wh()">ระบบ เพิ่มที่เก็บของสินค้า</a></li>';
            menu += '<li><a href="#printpage">ระบบ ขอพิมป้าย</a></li>';
            menu += '<li><a href="javascript:managepromotion()">ระบบ จัดการโปรโมชั่น</a></li>';
                   if(localStorage.username=="56163"){
                   menu += '<li><a href="#setting">Setting</a></li>';
                   }
                   menu += '<li><a href="javascript:logout();">LogOut</a>';
                   menu += '<i style="width:100%; text-align:center; color:#f5f5f0; font-size:10px;" class="api_server"></i>';
                   menu += '</li></ul></nav>';

    var menulist =  document.getElementsByClassName('tree');
                for(var i = 0; i < menulist.length; i++){
                    menulist[i].innerHTML = menu;
                }
    var api =  document.getElementsByClassName('api_server');
                    for(var i = 0; i < api.length; i++){
                        api[i].innerHTML = localStorage.api_url_server;
                    }
 /* $.ajax({
              url: localStorage.url_menu_tree_user,
              //data: '{"userID":"'+login.username.value+'","pwd":"'+login.pwd.value+'"}',
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              type: "GET",
              cache: false,
              success: function(result){
                     var mytree = result.data;
                     $('.tree').treeview({
                     color: "#428bca",
                     levels: 1,
                     expandIcon: 'glyphicon glyphicon-plus',
                     collapseIcon: 'glyphicon glyphicon-minus',
                     nodeIcon: 'glyphicon glyphicon-bookmark',
                     enableLinks: true,
                     data: mytree
                     });
              }
     });*/

  }
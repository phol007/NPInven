# สรุป Requirements 

* system : NpInven
* Module : Reorder,นับสต๊อกสินค้า,โอนสินค้า,เช็คสต๊อกสินค้า,จัดการที่เก็บสินค้า
เพิ่มที่เก็บสินค้า,จัดโปรโมชั่น และขอพิมป้าย
* Objective : เพื่อสามารถจัดการข้อมูลสต๊อกสินค้า,ที่เก็บสินค้า,โปรโมชั่น,ข้อพิมป้าย,โอนสินค้าและจัดการที่เก็บสินค้า 
* Requirements : ข้อมูลและรายละเอียดสต๊อกสินค้า,ที่จัดเก็บสินค้า้,โปรโมชั่นและขอพิมป้าย

# Process Description 
 * Input data flows : 
 * Output data flows : NpInven ช่วยสนับสนุนการทำงาน
# Description Process
 * 1. ระบบเก่ายังเป็นเอกสารและไม่มีฐานข้อมูลในดาต้าเบส ซึ่งยากต่อการเข้าถึงข้อมูล,เรียกใช้ และ เพิ่มข้อมูล โดยแอพพลิเคชั่นช่วยจัดการเก็บข้อมูลให้เป็นระบบ 
 * 2. ซึ่งในแอพพลิเคชั่น จะมีระบบการนับสต๊อกสินค้า ระบบโอนสินค้า ระบบเช็คสต๊อก ระบบจัดการที่เก็บสินค้า ระบบโปรโมชั่น และระบบพิมพ์ป้าย 
 * 3. ระบบนับสต๊อก จะช่วยในการนับสต๊อกได้อย่างรวดเร็ว และ จัดเก็บข้อมูลไว้ในฐานข้อมูล เพื่อสามารถเรียกดูข้อมูลได้สะดวก 
 * 4. ระบบโอนสินค้า จะช่วยการโอนสินค้าได้รวดเร็วและสะดวก
 * 5. ระบบเช็คสต๊อก จะช่วยให้ผู้ใช้ตรวจสอบสินค้า และทราบข้อมูลสินค้าได้อย่างรวดเร็ว
 * 6. ระบบจัดการที่เก็บสินค้า จะช่วยให้ผู้ใช้สามารถทราบว่าสินค้าที่จัดเก็บอยู่ไหน
 * 7. ระบบโปรโมชั่น ผู้ใช้สามารถดูรายละเอียดของโปรโมชั่นได้ และเพิ่มโปรโมชั่นได้
 * 8. ขอพิมพ์ป้าย ผู้ใช้สามารถพิมพ์ป้าย ตามจำนวนต้องการของผู้ใช้

# ตัวอย่างหน้าจอ NpInven
![image](https://github.com/phol007/NPInven/blob/master/Screenshot_2018-04-02-10-15-24.png?raw=true)

**API Login**
```	
Url: http://app.nopadol.com:8080/path
Path : /NPDataCenterWs/center/login
data : {"companyCode":"np","appCode":"NpInventory","saleCode":"ไอดีผู้ใช้","password":"พาสเวิร์ด"}
	method : post
	{
    "resp": {
        "isSuccess": 1,
        "processName": "Gen Access Token",
        "processDesc": "Successful"
    },
    "userID": "56163",
    "saleCode": "56163",
    "accessToken": "22d3b3c2-abe3-41e1-9909-7a10f750a1f1",
    "accessDatetime": "2018-04-03 12:59:53.972",
    "dataBaseName": "bcnp",
    "serverName": "192.168.0.7",
    "branchName": "S01"
} 

```
# Menu ระบบ Reorder
**API ค้นหา Reorder**
```	
Url: http://app.nopadol.com:8080/path
Path : /ReOrderWS/reorder/search_reorder
data : {"access_token":"4816fdb1-098b-431b-8389-8550e4bcf94c","profit_code":"s01","search":"S01-PRH6103-000"}
 
	method : post
	{
    "success": true,
    "error": false,
    "message": "",
    "list_reorder": [
        {
            "doc_no": "S01-PRH6103-00002",
            "doc_date": "2018-03-15 00:00:00.0",
            "work_man": "กัญญารัตน์  ฟูสกุล"
        },
        {
            "doc_no": "S01-PRH6103-00003",
            "doc_date": "2018-03-15 00:00:00.0",
            "work_man": "กัญญารัตน์  ฟูสกุล"
        }
    ]
}

```
**API รายละเอียด Reorder**
```	
Url: http://app.nopadol.com:8080/path
Path : /ReOrderWS/reorder/reorder_details
data : {"access_token":"032246af-33c6-41f5-9609-3935b3a51b77","profit_code":"s01","search":"S01-PRH6103-00002"}
method : post
	{
    "resp": {
        "success": true,
        "error": false,
        "message": ""
    },
    "doc_no": "S01-PRH6103-00002",
    "doc_date": "2018-03-15 00:00:00.0",
    "user_code": "59087",
    "person_code": "59087",
    "person_name": "กัญญารัตน์  ฟูสกุล",
    "is_cancel": 0,
    "is_confirm": 0,
    "item": [
        {
            "item_code": "5211522",
            "item_name": "TOA  201 ROOFSEAL (กันน้ำรั่วซึมหลังคาสีเทาเข้ม)  ถัง",
            "item_qty": 20,
            "item_count": 5,
            "suggest_qty": 0,
            "unit_code": "ถัง",
            "line_number": 0
        },
        {
            "item_code": "5211521",
            "item_name": "TOA  201 ROOFSEAL (กันน้ำรั่วซึมหลังคาสีเทา)  ถัง",
            "item_qty": 20,
            "item_count": 3,
            "suggest_qty": 0,
            "unit_code": "ถัง",
            "line_number": 1
        },
        {
            "item_code": "5211523",
            "item_name": "TOA  201 ROOFSEAL (กันน้ำรั่วซึมหลังคาสีเขียว)  ถัง",
            "item_qty": 20,
            "item_count": 4,
            "suggest_qty": 0,
            "unit_code": "ถัง",
            "line_number": 2
        },
        {
            "item_code": "5211526",
            "item_name": "TOA 201 ROOFSEAL (กันน้ำรั่วซึมหลังคาสีเทาเข้ม) กล.",
            "item_qty": 20,
            "item_count": 20,
            "suggest_qty": 0,
            "unit_code": "แกลลอน",
            "line_number": 3
        },
        {....},
    ]
}

```
**API ค้นหา สินค้า**
```	
Url: http://app.nopadol.com:8080/path
Path : /ReOrderWS/reorder/itemdetails
data : {"access_token":"ddb748f7-1816-428f-ab43-943aef3f637f","profit_code":"S01","search":"5001006"}
method : post
{
    "success": false,
    "error": true,
    "message": "The result set is closed.",
    "item_code": "5001006",
    "item_name": "น้ำมันซักแห้ง ปลาเบ็ด กล.",
    "item_price": 130,
    "item_unit_code": "แกลลอน",
    "item_barcode": "5001006",
    "rq_status": 0,
    "order_point": 0,
    "stock_min": 0,
    "stock_max": 0,
    "item_Status": "2.สต๊อกขาย",
    "item_get_status": 1,
    "po_remain_in": 0,
    "sum_cashsale_3month": 4.3333,
    "freq_3month": 4,
    "red_dot": 0,
    "my_grade": "",
    "expert_team": "CAT3      ",
    "pr_no": "S01-PRH6103-00002",
    "ap_no": "",
    "po_no": "",
    "pr_date": "2018-04-03 00:00:00.0",
    "ap_date": "1900-01-01 00:00:00.0",
    "po_date": "1900-01-01 00:00:00.0",
    "po_lead_date": "1900-01-01 00:00:00.0",
    "pr_qty": 2,
    "ap_qty": 0,
    "po_qty": 0,
    "pr_remain": 2,
    "ap_remain": 0,
    "po_remain": 0,
    "pr_line": 11,
    "pr_item_unit": "แกลลอน",
    "stockQty": 50,
    "listStk": [
        {
            "whCode": "S1-A",
            "shelfCode": "-",
            "qty": 50
        }
    ],
    "lishShelfID": [
        {
            "shelfID": "A32051"
        }
    ]
}
	

```
**API save item** 
```	
Url: http://app.nopadol.com:8080/path
Path : ReOrderWS/reorder/insert_item
data : {"access_token":"5dcfe2c7-4d58-494a-9e01-38e83ef28d41","doc_no":"S01-PRH6103-00002","doc_date":"3-4-2018","user_code":"56163","item":[{"item_code":"4047212","unit_code":"บาน","item_qty":"0","item_count":"3","line_number":"11"}]}
method : post
	{
    "success": true,
    "error": false,
    "message": ""
}

```
# Menu ระบบ นับสต๊อกสินค้า
**API ค้นหาคลังสินค้า**
```	
Url: http://app.nopadol.com:8080/path
Path : /NPInventoryWs/V2/is/searchWH
data : {"accessToken":"5dcfe2c7-4d58-494a-9e01-38e83ef28d41","search":"","branch":"S01"}
method : post
	{
    "resp": null,
    "data": [
        {
            "whCode": "S1-A",
            "whName": "สนญ.โชว์รูม",
            "location": "สนญ.โชว์รูม"
        },
        {
            "whCode": "S1-B",
            "whName": "สนญ.Drivethru",
            "location": "สนญ.Drivethru"
        },
        {
            "whCode": "S1-C",
            "whName": "สนญ.สินค้าสต๊อก",
            "location": "สนญ.สินค้าสต๊อก"
        },
        {
            "whCode": "S1-CD",
            "whName": "คลังสินเชื่อ",
            "location": "คลังสินเชื่อ"
        },
        {
            "whCode": "S1-DEM",
            "whName": "สำนักงานใหญ่-Demo",
            "location": "สำนักงานใหญ่-Demo"
        },
        {
            "whCode": "S1-DMG",
            "whName": "สำนักงานใหญ่",
            "location": "สำนักงานใหญ่"
        },
        {.....}
    ]
}

```
**API ค้นหาคลังชั้นเก็บ **
```	
Url: http://app.nopadol.com:8080/path
Path : /NPInventoryWs/V2/is/searchShelf
data : {"accessToken":"2ea4dbb5-f7ac-461e-862b-715402dc0a64","searchWH":"S1-A","searchShelf":""}
method : post
	{
    "response": null,
    "data": [
        {
            "shelfCode": "-",
            "shelfName": "S1-A(StoreSale)",
            "whCode": "S1-A",
            "location": "S1-A(StoreSale)"
        },
        {
            "shelfCode": "AVL",
            "shelfName": "แก้ปัญหาขายผิดคลัง",
            "whCode": "S1-A",
            "location": "แก้ปัญหาขายผิดคลัง"
        }
    ]
}

```
**API ค้นหารหัสสินค้าด้วยการพิมพ์**
```	
Url: http://app.nopadol.com:8080/path
Path : /NPInventoryWs/V2/inven/searchItemMaster
data : {"accessToken":"4434a0df-3c6b-4d0c-ba18-a42db5db4022","search":"1513001"}
method : post
	{
    "resp": {
        "isSuccess": 1,
        "processName": "Search ItemMaster",
        "processDesc": "Successful",
        "data": null
    },
    "itemMasterList": [
        {
            "itemCode": "1513001",
            "itemName": "อะเดปเตอร์(Adapter) T5 14 w. Lakisa(แพ๊คคู่)",
            "barCode": "1513001",
            "unitCode": "อัน"
        }
    ]
}

```
**API ค้นหารหัสสินค้าด้วยการแสกน barcode**
```	
Url: http://app.nopadol.com:8080/path
Path : /NPInventoryWs/V2/inven/searchItem
data : {"accessToken":"fbc64a33-8cc9-4fa6-85cc-781fe5224530","barcode":"1002094","docno":"undefined","type":"3","shelfcode":"undefined","branch":"S01"}
method : post
	{
    "resp": {
        "isSuccess": 1,
        "processName": "Search Item",
        "processDesc": "Successful",
        "data": null
    },
    "itemcode": "1002094",
    "itemname": "รองพื้นปูนเก่า ดูลักษ์ มาชีล กล.",
    "range": "C",
    "unitcode": "แกลลอน",
    "qty": 0,
    "apCode": "5744380",
    "apName": "บริษัท อั๊คโซ่ โนเบล เพ้นท์ส (ประเทศไทย) จำกัด (มีหักบัญชีนพดลพานิช)",
    "shelfcode": "-",
    "listWH": [
        {
            "whcode": "S1-A",
            "stkqty": 7
        }
    ],
    "listPRBarcode": null,
    "listISBarcode": null,
    "vCount": 0
}

```
**API เพิ่มการนับสต๊อก (แทนที่)**
``` 
Url: http://app.nopadol.com:8080/path
Path : /NPInventoryWs/V2/is/insertIS
data : {"accessToken":"30d00974-1855-427c-9199-20d724042d44","docNo":"S01-IS6104-0004","user":"56163","itemCode":"5001006","unitcode":"แกลลอน","whCode":"S1-A","shelfCode":"-","qty":"10"}
method : post
    {
    "resp": {
        "isSuccess": 1,
        "processName": "Update Item PR",
        "processDesc": "Successful",
        "data": null
    },
    "accessToken": null,
    "docNo": null,
    "user": null,
    "itemCode": null,
    "unitcode": null,
    "whCode": null,
    "shelfCode": null,
    "qty": 0
}

```
**API เพิ่มการนับสต๊อก (เพิ่มต่อ)**
``` 
Url: http://app.nopadol.com:8080/Path
Path : /NPInventoryWs/V2/is/insertIS
data : {"accessToken":"834994b0-914e-488d-9962-dc09f99d723a","docNo":"S01-IS6104-0004","user":"56163","itemCode":"5001006","unitcode":"แกลลอน","whCode":"S1-A","shelfCode":"-","qty":"20"}
method : post
    {
    "resp": {
        "isSuccess": 1,
        "processName": "Update Item PR",
        "processDesc": "Successful",
        "data": null
    },
    "accessToken": null,
    "docNo": null,
    "user": null,
    "itemCode": null,
    "unitcode": null,
    "whCode": null,
    "shelfCode": null,
    "qty": 0
}

```
**API แสดงข้อมูลการนับสต๊อก(ในตาราง)**
``` 
Url: http://app.nopadol.com:8080/Path
Path : /NPInventoryWs/V2/is/isList
data : {"accessToken":"858c1a01-1844-4d83-bcb2-953014082bc4","docNo":"S01-IS6104-0004"}
method : post
    {
    "resp": {
        "isSuccess": 1,
        "processName": "Search Ispact",
        "processDesc": "Successful",
        "data": null
    },
    "listData": [
        {
            "docNo": "S01-IS6104-0004",
            "docDate": "2018-04-04",
            "itemCode": "1002094",
            "itemName": "รองพื้นปูนเก่า ดูลักษ์ มาชีล กล.",
            "unitCode": "แกลลอน",
            "whCode": "S1-A",
            "shelfCode": "-",
            "stkQty": 7,
            "inspectQty": 5,
            "diffQty": 2
        },
        {
            "docNo": "S01-IS6104-0004",
            "docDate": "2018-04-04",
            "itemCode": "5001006",
            "itemName": "น้ำมันซักแห้ง ปลาเบ็ด กล.",
            "unitCode": "แกลลอน",
            "whCode": "S1-A",
            "shelfCode": "-",
            "stkQty": 47,
            "inspectQty": 20,
            "diffQty": 27
        },
        {
            "docNo": "S01-IS6104-0004",
            "docDate": "2018-04-04",
            "itemCode": "5000015",
            "itemName": "กอฮอล์ เวฟโก้ ปิ๊ป",
            "unitCode": "ปิ๊ป",
            "whCode": "S1-A",
            "shelfCode": "-",
            "stkQty": 11,
            "inspectQty": 1,
            "diffQty": 10
        }
    ]
}

```
**API บันทึกข้อมูลการนับสต๊อก(จากตาราง)**
``` 
Url: http://app.nopadol.com:8080/Path
Path : /NPInventoryWs/V2/is/confirmIS
data : {"accessToken":"63641f9c-6236-4763-adf0-d0ef28a84f71","docNo":"S01-IS6104-0005","user":"56163","isCancel":"0"}
method : post
   {
    "resp": {
        "isSuccess": 0,
        "processName": "Update IS",
        "processDesc": "Successful",
        "data": null
    },
    "accessToken": null,
    "docNo": null,
    "user": null,
    "isCancel": 0
}

```
# Menu ระบบ โอนสินค้า
**API แสดงข้อมูลก่อนโอนสินค้า  (เลือกคลังต้นทาง,เลือกคลังปลายทาง)**
``` 
Url: http://app.nopadol.com:8080/path
Path : /NPReceiveWs/trn/v2/searchwarehouse
data : {"accessToken":"2ddeac71-0002-41b6-98bb-28da7d8ab360","type":"0","search":""}
method : post
{
    "response": {
        "isSuccess": 1,
        "processName": "Search WareHouse",
        "processDesc": "Successful"
    },
    "data": [
        {
            "code": "080",
            "name": "นอกสถานที่/โฮมโชว์/แฟร์/ท้ายวังชั่วคราว",
            "location": null
        },
        {
            "code": "099",
            "name": "ซื้อมาขายไป",
            "location": null
        },
        {
            "code": "ISP1",
            "name": "Inspection S01",
            "location": null
        },
        {
            "code": "ISP2",
            "name": "Inspection S02",
            "location": null
        },
        {
            "code": "MAKE-KAFE",
            "name": "ร้านกาแฟ",
            "location": null
        },
        {
            "code": "S00",
            "name": "ซื้อมาขายไป",
            "location": null
        },
        {
            "code": "S01",
            "name": "สำนักงานใหญ่",
            "location": null
        },
        {
            "code": "S02",
            "name": "สาขาสันกำแพง",
            "location": null
        },
        {
            "code": "S0-PASS",
            "name": "คลัง Pass ส่ง",
            "location": null
        },
        {....}
    ]
}
    
```
**API แสดงข้อมูลก่อนโอนสินค้า  (เลือกชั้นเก็บต้นทาง,เลือกชั้นเก็บปลายทาง)**
``` 
Url: http://app.nopadol.com:8080/path
Path : /NPReceiveWs/trn/v2/searchshelf
data : {"accessToken":"0c7b96a4-8418-4128-84e3-f35a27031dde","refCode":"S1-C","search":""}
method : post
{
    "response": {
        "isSuccess": 1,
        "processName": "Search Shelf",
        "processDesc": "Successful"
    },
    "data": [
        {
            "code": "-",
            "name": "S1-C(Back Stock)",
            "location": "S1-C(Back Stock)"
        }
    ]
}
    
```
**API แสดงใบโอนสินค้า(กดปุ่มแสดงใบโอนสินค้า)**
``` 
Url: http://app.nopadol.com:8080/path
Path : /NPReceiveWs/trn/v2/search
data : {"accessToken":"41d501bc-6757-42a0-8edc-3a8ac8ed0245","type":"1","search":""}
method : post
{
    "response": {
        "isSuccess": 1,
        "processName": "Search StockTransfer",
        "processDesc": "Successful"
    },
    "data": [
        {
            "docNo": "S01-TH6104-0040",
            "isConfirm": 0,
            "docDate": "2018-04-04 00:00:00.0",
            "myDescription": "Mobile-App//โอนสินค้าเพื่อสต๊อก//",
            "isCancel": 0,
            "isCompleteSave": 1,
            "sumOfAmount": 2590,
            "refDocNo": "",
            "docType": 6,
            "sumOfQty": 1
        },
        {
            "docNo": "S01-TH6104-0039",
            "isConfirm": 0,
            "docDate": "2018-04-04 00:00:00.0",
            "myDescription": "Mobile-App//โอนสินค้าเพื่อขาย//",
            "isCancel": 0,
            "isCompleteSave": 1,
            "sumOfAmount": 760,
            "refDocNo": "",
            "docType": 6,
            "sumOfQty": 1
        },
        {
            "docNo": "S01-TH6104-0038",
            "isConfirm": 0,
            "docDate": "2018-04-04 00:00:00.0",
            "myDescription": "Mobile-App//โอนสินค้าเพื่อขาย//",
            "isCancel": 0,
            "isCompleteSave": 1,
            "sumOfAmount": 8900,
            "refDocNo": "",
            "docType": 6,
            "sumOfQty": 1
        },
        {
            "docNo": "S01-TH6104-0037",
            "isConfirm": 0,
            "docDate": "2018-04-04 00:00:00.0",
            "myDescription": "Mobile-App//โอนสินค้าเพื่อสต๊อก//",
            "isCancel": 0,
            "isCompleteSave": 1,
            "sumOfAmount": 10900,
            "refDocNo": "",
            "docType": 6,
            "sumOfQty": 5
        },
        {
            "docNo": "S01-TH6104-0036",
            "isConfirm": 0,
            "docDate": "2018-04-04 00:00:00.0",
            "myDescription": "Mobile-App////ยกเลิกเอกสาร",
            "isCancel": 0,
            "isCompleteSave": 1,
            "sumOfAmount": 1720,
            "refDocNo": "",
            "docType": 6,
            "sumOfQty": 0
        },
        { ....}
    ]
}
    
```
**API รายละเอียดใบโอนสินค้า()**
``` 
Url: http://app.nopadol.com:8080/path
Path : /NPReceiveWs/trn/v2/searchdetails
data : {"accessToken":"ea6f6196-55bd-4d0a-8aed-ea90da48a819","type":"1","search":"S01-TH6104-0041"}
method : post
{
    "response": {
        "isSuccess": 1,
        "processName": "Search StockTransferDetails",
        "processDesc": "Successful"
    },
    "docNo": "S01-TH6104-0041",
    "isConfirm": 0,
    "docDate": "2018-04-04 00:00:00.0",
    "myDescription": "Mobile-App//โอนสินค้าเพื่อขาย//",
    "isCancel": 0,
    "isCompleteSave": 1,
    "sumOfAmount": 1190,
    "refDocNo": "",
    "docType": 0,
    "confirmCode": "38041",
    "confirmName": "รติรัตน์ แสงเมือง",
    "data": [
        {
            "itemCode": "9179393",
            "itemName": "อ่างล้างจาน 1 หลุม  Linea ViVa 1 B Teka",
            "fromWH": "S1-B",
            "fromShelf": "-",
            "toWH": "S1-A",
            "toShelf": "-",
            "qty": 1,
            "unitCode": "ใบ",
            "barCode": "8858944202026",
            "refNo": "",
            "amount": 1190,
            "price": 1190,
            "sumOfCost": 786.4488,
            "lineNumber": 0,
            "isCancel": 0,
            "pickCode": "61022",
            "pickName": "ปัทมา  เต็มราษี"
        }
    ],
    "sumOfQty": 1
}    
```
**API ลบใบแสดงโอนสินค้า(กดค้าง)**
``` 
Url: http://app.nopadol.com:8080/path
Path : /NPReceiveWs/trn/v2/cancel
data : {"accessToken":"4f3b6bc9-0e0b-4ad9-b1bb-5d5633921b27","docNo":"S01-TH6104-0022","refNo":"","userID":"56163"}
method : post
 {
    "isSuccess": 1,
    "processName": "Cancel StockTransfer",
    "processDesc": "Successful"
}
```
**API ค้นหารหัสพนักงาน (ตอนกดโอนสินค้า)**
``` 
Url: http://app.nopadol.com:8080/path
Path : /NPReceiveWs/trn/v2/searchsale
data : {"accessToken":"88e4db4c-be15-495e-ab9e-b00281b34f10","type":"0","search":"56163"}
method : post
 {
    "response": {
        "isSuccess": 1,
        "processName": "Search Sale",
        "processDesc": "Successful"
    },
    "listData": [
        {
            "code": "56163",
            "name": "เอกชัย  จันต๊ะไพร"
        }
    ]
}
```
# Menu ระบบ ตรวจสอบสินค้า
**API ค้นหาสินค้า (จากรหัสและชื่อสินค้า)**
``` 
Url: http://app.nopadol.com:8080/path
Path : /NPInventoryWs/V2/inven/searchItemMaster
data : {"accessToken":"c77a9fd6-134b-482e-af56-5de3cb61003e","search":"5001006"}
method : post
 {
    "resp": {
        "isSuccess": 1,
        "processName": "Search ItemMaster",
        "processDesc": "Successful",
        "data": null
    },
    "itemMasterList": [
        {
            "itemCode": "5001006",
            "itemName": "น้ำมันซักแห้ง ปลาเบ็ด กล.",
            "barCode": "5001006",
            "unitCode": "แกลลอน"
        }
    ]
}
```
**API ค้นหารายละเอียดสินค้า**
``` 
Url: http://app.nopadol.com:8080/path
Path : /NPInventoryWs/V2/it/itemProfile
data : {"accessToken":"c77a9fd6-134b-482e-af56-5de3cb61003e","whCode":"S01","itemCode":"5001006"}
method : post
 {
    "resp": {
        "isSuccess": 1,
        "processName": "Search ItemProfile",
        "processDesc": "Successful",
        "data": null
    },
    "barCode": "5001006",
    "itemCode": "5001006",
    "itemName": "น้ำมันซักแห้ง ปลาเบ็ด กล.",
    "unitCode": "แกลลอน",
    "brandCode": "335",
    "brandName": "ไซโก้",
    "rang": "C",
    "price": 130,
    "buyUnitcode": "แกลลอน",
    "saleUnitcode": "แกลลอน",
    "averageCost": 0,
    "qtyIV": 3,
    "unitCodeIV": "แกลลอน",
    "whCodeIV": "S1-A",
    "docdateIV": "2018-04-04",
    "qtyRV": 60,
    "unitCodeRV": "แกลลอน",
    "whCodeRV": "S1-A",
    "docdateRV": "2018-02-12",
    "qtyTF": 30,
    "unitCodeTF": "แกลลอน",
    "whCodeTF": "S1-A",
    "docdateTF": "2017-06-04",
    "vendorCode": "023324083",
    "vendorName": "บริษัท ที เค เอส เคมิคอล (ประเทศไทย) จำกัด",
    "itemProfileList": [
        {
            "whCode": "S1-A",
            "shelfCode": "-",
            "stkunitcode": "แกลลอน",
            "qty": 47,
            "docdate": "2018-04-04"
        }
    ]
}
```
# Menu ระบบ จัดการที่เก็บสินค้า
**API รายละเอียดสินค้า และที่เก็บ**
``` 
Url: http://app.nopadol.com:8080/path
Path : /NPInventoryWs/V2/inven/searchScanBarCodeLogs
data : {"accessToken":"6a78cd58-c6b9-48a5-871e-99c40cde624f","searchItem": "5001006","branch":"S01"}
method : post
 {
    "resp": {
        "isSuccess": 1,
        "processName": "Search ScanBarCodeLogs",
        "processDesc": "Successful",
        "data": null
    },
    "itemCode": "5001006",
    "itemName": "น้ำมันซักแห้ง ปลาเบ็ด กล.",
    "unitCode": "แกลลอน",
    "listScanBarcode": [
        {
            "rowOrder": 363448,
            "whCode": "S1-A      ",
            "zoneCode": "-",
            "shelfCode": "A32051",
            "scanDateTime": "2017-11-24",
            "userScan": "55044",
            "userScanName": "ทัศนีย์ โรจน์สิงห์"
        },
        {
            "rowOrder": 354392,
            "whCode": "S1-B      ",
            "zoneCode": "-",
            "shelfCode": "B54041",
            "scanDateTime": "2017-02-22",
            "userScan": "stayust",
            "userScanName": "ศตายุ สุรินต๊ะ"
        },
        {
            "rowOrder": 299176,
            "whCode": "S1-B      ",
            "zoneCode": "-",
            "shelfCode": "B64011",
            "scanDateTime": "2017-01-13",
            "userScan": "stayust",
            "userScanName": "ศตายุ สุรินต๊ะ"
        },
        {
            "rowOrder": 299171,
            "whCode": "S1-B      ",
            "zoneCode": "-",
            "shelfCode": "B54021",
            "scanDateTime": "2017-01-13",
            "userScan": "stayust",
            "userScanName": "ศตายุ สุรินต๊ะ"
        }
    ]
}
```
**API ลบที่เก็บสินค้า**
``` 
Url: http://app.nopadol.com:8080/path
Path : /NPInventoryWs/V2/inven/DeleteItemLocation
data : {"accessToken":"dfaea2a1-ce8d-4b7d-8a32-82cd45d6d63c","itemCode":"5001006","rowOrder":"undefined"}
method : post
 
```
**API ค้นหาชื่อรหัสสินค้า หรือชื่อสินค้า(ในตาราง)**
``` 
Url: http://app.nopadol.com:8080/path
Path : /NPInventoryWs/V2/inven/searchLikeItem
data : {"accessToken":"4a6dcc80-7e37-4621-af6d-e9f5abc917b9","searchItem":"5001006"}
method : post
 {
    "resp": {
        "isSuccess": 1,
        "processName": "Search Itme ",
        "processDesc": "Successful",
        "data": null
    },
    "listLikeItem": [
        {
            "itemCode": "5001006",
            "itemName": "น้ำมันซักแห้ง ปลาเบ็ด กล.",
            "unitCode": "แกลลอน"
        }
    ]
}
```
# Menu ระบบ เพิ่มที่เก็บสินค้า
**API ค้นหาคลังสินค้า**
``` 
Url: http://app.nopadol.com:8080/path
Path : /NPInventoryWs/V2/is/searchWH
data : {"accessToken":"5dcfe2c7-4d58-494a-9e01-38e83ef28d41","search":"","branch":"S01"}
method : post
    {
    "resp": null,
    "data": [
        {
            "whCode": "S1-A",
            "whName": "สนญ.โชว์รูม",
            "location": "สนญ.โชว์รูม"
        },
        {
            "whCode": "S1-B",
            "whName": "สนญ.Drivethru",
            "location": "สนญ.Drivethru"
        },
        {
            "whCode": "S1-C",
            "whName": "สนญ.สินค้าสต๊อก",
            "location": "สนญ.สินค้าสต๊อก"
        },
        {
            "whCode": "S1-CD",
            "whName": "คลังสินเชื่อ",
            "location": "คลังสินเชื่อ"
        },
        {
            "whCode": "S1-DEM",
            "whName": "สำนักงานใหญ่-Demo",
            "location": "สำนักงานใหญ่-Demo"
        },
        {
            "whCode": "S1-DMG",
            "whName": "สำนักงานใหญ่",
            "location": "สำนักงานใหญ่"
        },
        {.....}
    ]
}

```
**API ค้นหาที่เก็บ (ตาราง)**
``` 
Url: http://app.nopadol.com:8080
Path : /NPInventoryWs/V2/inven/searchShelfLocation 
data : {"accessToken":"8b282d3d-0fa0-4483-bac6-dbe61b41b6ff","searchWH":"S1-A","searchLocation":"1"}
method : post
    {
    "resp": {
        "isSuccess": 1,
        "processName": "Search Location",
        "processDesc": "Successful",
        "data": null
    },
    "whCode": "S1-A",
    "locationList": [
        {
            "locationCode": "A01011",
            "locationName": "A01011"
        },
        {
            "locationCode": "A01012",
            "locationName": "A01012"
        },
        {   
            "locationCode": "A01021",
            "locationName": "A01021"
        }
    ]
}

```
**แสดงข้อมูลสินค้า (ตาราง)**
``` 
Url: http://app.nopadol.com:8080/
Path : /NPInventoryWs/V2/inven/searchItemLocation
data : {"accessToken":"1c73992c-32eb-4651-9784-88aa56dce3ee","searchWH":"S1-A","searchLocation":"A01021","searchItem":"A","type":"0"}
method : post
    {
    "resp": {
        "isSuccess": 1,
        "processName": "Search Itme Location",
        "processDesc": "Successful",
        "data": null
    },
    "listItemLocation": [
        {
            "itemCode": "115.93.00484",
            "itemName": "[P]มือจับ HAFELE C160mm. สีสแตนเลสสตีล  115.93.004",
            "unitCode": "อัน",
            "isStatus": 0
        }
    ]
}

```
# Menu ระบบ ขอพิมพ์ป้ายราคา
**GO API แสดงรายการขอพิมพ์ป้ายค้างพิมพ์ของแต่ละผู้ใช้งาน**
**Label History**
``` 
Url: http://venus.nopadol.com:9002/
Path : labels?access_token=aaa&keyword=56163 (ค้นหาตามUserIDของพนักงาน)
method : get
    response 200 : {
		"status":"success",
		“data”:[
		 {
            "item_code": "2200707",
            "bar_code": "2200707",
            "item_name": "(P) สิ่วเจาะไม้ 1\"",
            "unit_code": "อัน",
            "price": 50,
            "qty": 1,
            "label_type": "P1F2",
            "lab_size": "P1",
            "lab_from": "F2",
            "label_type_name": "ป้ายราคาพิเศษ  21 ดวง/หน้า",
            "creator_code": "56163",
            "create_datetime": "2018-03-31T00:00:00Z"
        },
        {
            "item_code": "4047212",
            "bar_code": "4047212",
            "item_name": "ประตู PVC BATHIC  70*200 BC 2 สีครีม เจาะลูกบิด (เคลือบ)",
            "unit_code": "บาน",
            "price": 1300,
            "qty": 1,
            "label_type": "P1F1",
            "lab_size": "P1",
            "lab_from": "F1",
            "label_type_name": "ป้ายธรรมดา 21 ดวง/หน้า",
            "creator_code": "56163",
            "create_datetime": "2018-04-02T00:00:00Z"
        },
        {
            "item_code": "5001006",
            "bar_code": "5001006",
            "item_name": "น้ำมันซักแห้ง ปลาเบ็ด กล.",
            "unit_code": "แกลลอน",
            "price": 130,
            "qty": 3,
            "label_type": "P1F1",
            "lab_size": "P1",
            "lab_from": "F1",
            "label_type_name": "ป้ายธรรมดา 21 ดวง/หน้า",
            "creator_code": "56163",
            "create_datetime": "2018-04-05T00:00:00Z"
        },
        {
            "item_code": "1002094",
            "bar_code": "1002094",
            "item_name": "รองพื้นปูนเก่า ดูลักษ์ มาชีล กล.",
            "unit_code": "แกลลอน",
            "price": 460,
            "qty": 3,
            "label_type": "P1F1",
            "lab_size": "P1",
            "lab_from": "F1",
            "label_type_name": "ป้ายธรรมดา 21 ดวง/หน้า",
            "creator_code": "56163",
            "create_datetime": "2018-04-06T00:00:00Z"
        }
    ]
}
```
**GO API บันทึกขอพิมพ์ป้ายและแก้ไขขอพิมพ์ป้ายขอแต่ละผู้ใช้งาน**
**Label History**
``` 
Url: http://venus.nopadol.com:9002/
Path : label
method : post
  payload :{
           "ItemCode":"2200707"
	   ,"BarCode":"2200707"
	   ,"Qty":1
	   ,"Price":45
	   ,"LabelType":"P1F2"
	   ,"CreatorCode":"56163"
	   ,"unitcode":"อัน"
        }
  response 200 : {
	   "status":"success"
   	    "data": "Completed Insert"
}
```
**GO API `ยกเลิกขอพิมพ์ป้ายขอแต่ละผู้ใช้งาน**
**Label History**
``` 
Url: http://venus.nopadol.com:9002/
Path : labelcancel
method : post
  payload :{
           "ItemCode":"2200707"
	   ,"BarCode":"2200707"
	   ,"Qty":1
	   ,"Price":45
	   ,"LabelType":"P1F2"
	   ,"CreatorCode":"56163"
	   ,"unitcode":"อัน"
        }
  response 200 : {
	   "status":"success"
   	    "data": "Completed cancel"
}
```

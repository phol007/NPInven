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
*** API ค้นหาคลังชั้นเก็บ ***
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

*** API ค้นหารหัสสินค้าด้วยการพิมพ์ ***
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

*** API ค้นหารหัสสินค้าด้วยการแสกน barcode ***
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
# Menu ระบบ Reorder
**API ค้นหา Reorder** /
* รหัส:
* วันที่ทำ:
* ชื่อคนจัดทำ:

**API รายละเอียด Reorder** /
* รหัส:
* วันที่ทำ:
* รหัสคนจัดทำ:
* ชื่อคนจัดทำ:


**API ค้นหา สินค้า** /
* รหัสสินค้า:
* ชื่อสินค้า:
* ราคา:
* หน่วยนับ:
* จุดซื้อ:
* ต่ำสุด:
* สูงสุด:
* คงเหลือ:
* PO:
* ขาย-3M:
* ความถี่-3M:
* จำนวนซื้อล่าสุด:
* เก็บในคลัง:
* เหลือ:
* ที่เก็บ:

**API save Reorder** /
* รหัสสินค้า:
* ชื่อสินค้า:
* ราคา:
* หน่วยนับ:
* จุดซื้อ:
* ต่ำสุด:
* สูงสุด:
* คงเหลือ:
* PO:
* นับได้:
* ขาย-3M:
* ความถี่-3M:
* จำนวนซื้อล่าสุด:
* ต้องการ:

# Menu โปรโมชั่น
**API ค้นหาคลังสินค้า** /
* รหัสคลัง:
* ชื่อคลัง:

**API รายละเอียดสต๊อกสินค้า**
* รหัสคลัง:
* ชื่อคลัง:
* รหัสสินค้า:
* ชื่อสินค้า:
* ชื่อเก็บ:
* นับได้:
* สถานะ:

**API ค้นหาชั้นเก็บ** /
* รหัสชั้นเก็บ:
* ชื่อชั้นเก็บ:

**API นับสินค้า**
* ชั้นเก็บ:
* รหัสบาร์โค้ด:
* รหัสสินค้า:
* ชื่อสินค้า:
* คลัง:
* จำนวน:
* หน่วยนับ:

# Menu โอนสินค้า
**API แสดงใบโอนสินค้า**
* รหัส:
* ประเภทการโอนสินค้า:

**API รายละเอียดใบโอนสินค้า**
* เลขที่เอกสาร:
* วันที่ทำเอกสาร:
* มูลค่ารวม:
* หมายเหตุ:
* ผู้ยืนยัน:
* ชื่อสินค้า:
* จำนวน:
* จากคลัง:
* เข้าคลัง/ชั้นเก็บ:

**API โอนสินค้า**
* เลือกคลังต้นทาง:
* เลือกชั้นเก็บต้นทาง:
* เลือกคลังปลายทาง:
* เลือกชั้นเก็บปลายทาง:

# Menu ระบบตรวจสอบสินค้า
**API ค้นหาสินค้า**
* รหัสสินค้า:
* ชื่อสินค้า:

**API รายละเอียดสินค้า**
* รหัสบาร์โค้ด:
* รหัสสินค้า:
* ชื่อ:
* ยี่ห้อ:
* หน่วยนับ:
* เกรด:
* ราคาปกติ:
* รหัสคลัง:
* ชั้นเก็บ:
* ยอดคงเหลือ:

# Menu จัดการที่เก็บสินค้า
**API ค้นหาสินค้า**
* รหัสสินค้า:
* ชื่อสินค้า:
* หน่วยนับ:

**API รายละเอียดที่เก็บสินค้า**
* บาร์โค้ด:
* รหัสสินค้า:
* ชื่อสินค้า:
* หน่วยนับ:
* รหัสคลัง:
* ชื่อที่เก็บ:
* วันที่สร้าง:

**API ลบที่จัดเก็บของสินค้า**
* รหัสสินค้า:

# Menu ระบบเพิ่มที่เก็บ
**API ค้นหาคลังสินค้า**
* รหัสคลังสินค้า:
* ชื่อสินค้า:

**API ค้นหาที่เก็บ**
* รหัสคลัง:
* ชื่อคลัง:
* รหัสที่เก็บ:
* ชื่อที่เก็บ:
* รหัสสินค้า:
* ชื่อสินค้า:
* หน่วยนับ:

# Menu โปรโมชั่น
**API ค้นหาโปรโมชั่น**

**API ลบโปรโมชั่น**

**API รายละเอียดโปรโมชั่น**
* DocNo:
* วันที่ขอโปรโมชั่น:
* เลขที่โปรโมชั่น:

**API แสดงรายละเอียดสินค้า**
* ลำดับ:
* ชื่อสินค้า:	
* ราคาปกติ:
* ราคาโปร:

**API เลือกโปรโมชั่น**
* เลือกรายการโปรโมชั่น:
* เลือกประเภทโปรโมชั่น:
* เลือก Section:

**API ค้นหาสินค้า**
* รหัสสินค้า:
* ชื่อสินค้า:

**API จัดโปรโมชั่นสินค้า**
* รหัสสินค้า:
* ชื่อสินค้า:
* ราคาปกติ:
* หน่วยนับ:
* สมาชิก (ลด 3%):
* IsBrochure:
* ค่าคอมเงินสด:
* ค่าคอมสินเชื่อ:
* ชื่อแคมเปญ:
* เริ่มโปรโมชั่น:
* จบโปรโมชั่น:

# Menu ขอพิมพ์ป้าย
 **API ขอพิมพ์ป้าย**
* เลือก ธรรมดา หรือ พิเศษ:
* ขนาด(P1 21ดวง/หน้า,P2 3ดวง/หน้า,P3 2ดวง/หน้า,P4 A4) :
* รหัสสินค้า:
* ชื่อสินค้า:
* จำนวนที่ต้องการพิม:

 **API ค้นหายี่ห้อ:**
* ค้นหายี่ห้อ:
* รหัสสินค้า:
* แสดงชื่อสินค้า:

 **API ค้นหายี่ห้อ:**
* รหัสสินค้า:
* ชื่อสินค้า:
* ประเภทกระดาษ:
* จำนวน:
* หน่วยนับ:

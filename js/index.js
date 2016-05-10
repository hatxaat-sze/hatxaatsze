document.querySelector("div[role='main']").style.height = (screen.height - 80) + "px";

var IDBOpenDBRequest_AdatNyit = window.indexedDB.open("Kurzustarolo", 1);

IDBOpenDBRequest_AdatNyit.onsuccess = function() {
	console.log("Sikerült a megnyitás");
	var IDBDatabase_DB = this.result;

	var IDBTransaction_Tr1 = IDBDatabase_DB.transaction("Zhk", "readonly");
	IDBTransaction_Tr1.oncomplete = function() {
		console.log("Tranzakció lefutott");
		IDBDatabase_DB.close();
	};

	var IDBObjectStore_Zhk_Tr = IDBTransaction_Tr1.objectStore("Zhk");
	var IDBIndex_Datido_index = IDBObjectStore_Zhk_Tr.index("Dat_Ido");
  var IDBRequest_kReq1 = IDBIndex_Datido_index.openCursor();
	IDBRequest_kReq1.onsuccess = function(evt) {
		console.log("Sikeres");
		var IDBCursorwithValue_Cursor = evt.currentTarget.result;
		if (IDBCursorwithValue_Cursor) {
            if (IDBCursorwithValue_Cursor.value.Eredmeny > -1) {
                var li = document.createElement("li");
                li.innerHTML = "<p>" + IDBCursorwithValue_Cursor.value.Kurzuskod + " & " + IDBCursorwithValue_Cursor.value.Fajta + "</p><p>" + IDBCursorwithValue_Cursor.value.Datum + " & " +  IDBCursorwithValue_Cursor.value.Ido + " & " + IDBCursorwithValue_Cursor.value.Eredmeny +  "</p>";
                document.getElementById("Targy_Lista").appendChild(li);
            }
			
            IDBCursorwithValue_Cursor.continue ();
		}
        
		else {
		   console.log("Vége a bejárásnak");
		}
			
  };
	IDBRequest_kReq1.onerror = function() {
	console.log("Vége van a bejárásnak");
  };
};


document.getElementById("Tantargy_Hozzaadas").addEventListener("click", function () {
    window.location.href = "Tantargy_Hozzaadas.html";
});

document.getElementById("Sorba").addEventListener("click", function () {
    window.location.href = "Sorba.html";
});

document.getElementById("Tetel_Hozzaadas").addEventListener("click", function () {
    window.location.href = "Tetel_Hozzaadas.html";
});



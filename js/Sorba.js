document.querySelector("#Foablak").style.height = (screen.height - 80) + "px";

var tetelek_szama = 0;
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
			if (IDBCursorwithValue_Cursor.value.Eredmeny < 0) {
					var li = document.createElement("li");
					li.innerHTML = "<a href='#'><p class='" + IDBCursorwithValue_Cursor.value.Id + "'>" + IDBCursorwithValue_Cursor.value.Kurzuskod + " & " + IDBCursorwithValue_Cursor.value.Fajta + "</p><p class='" + IDBCursorwithValue_Cursor.value.Id + "'>" + IDBCursorwithValue_Cursor.value.Datum + " & " +  IDBCursorwithValue_Cursor.value.Ido + "</p></a>";
					document.getElementById("Tetel_lista").appendChild(li);
				  tetelek_szama++;
			}
			IDBCursorwithValue_Cursor.continue ();
		}
		else {
		  console.log("Vége a bejárásnak");
			if (tetelek_szama < 1) {
				window.alert ("Nincsenek sorbaálló tételek. Hurrá :DDDD");
				window.location.href = "index.html";
			}
		}
			
  };
	IDBRequest_kReq1.onerror = function() {
	console.log("Vége van a bejárásnak");
  };
};

window.addEventListener("click", function (evt) {
    if (evt.target.className != "") {
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

				var IDBRequest_kReq1 = IDBObjectStore_Zhk_Tr.get (parseInt (evt.target.className));
				IDBRequest_kReq1.onsuccess = function () {
					window.sessionStorage.setItem("Id", this.result.Id);
					window.sessionStorage.setItem("Kurzuskod", this.result.Kurzuskod);
					window.sessionStorage.setItem("Fajta", this.result.Fajta);
					window.location.href = "Eredmeny.html";
				};
				
				IDBRequest_kReq1.onerror = function () {
					console.log ("Sikertelen kimeneti req :-(");	
				};
				
      }
    }
	
	else {
        console.log("Nem jó helyre kattintottunk");
    }
});



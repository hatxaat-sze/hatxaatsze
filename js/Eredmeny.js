document.querySelector("#Foablak").style.height = (screen.height - 80) + "px";

document.getElementById("Kurzuskod").innerHTML = "Kurzuskód: " + window.sessionStorage.getItem("Kurzuskod");
document.getElementById("Szamonkeres").innerHTML = "Számonkérés: " + window.sessionStorage.getItem("Fajta");
document.getElementById("Felvitel").addEventListener("click", function(){
  var ered = document.getElementById("Eredmeny").value;
  
  var IDBOpenDBRequest_AdatNyit = window.indexedDB.open("Kurzustarolo", 1);
			IDBOpenDBRequest_AdatNyit.onsuccess = function() {
				console.log("Sikerült a megnyitás");
				var IDBDatabase_DB = this.result;

				var IDBTransaction_Tr1 = IDBDatabase_DB.transaction("Zhk", "readwrite");
				IDBTransaction_Tr1.oncomplete = function() {
					console.log("Tranzakció lefutott");
					IDBDatabase_DB.close();
					window.location.href = "index.html";
				}; 

				var IDBObjectStore_Zhk_Tr = IDBTransaction_Tr1.objectStore("Zhk");

				var IDBRequest_kReq1 = IDBObjectStore_Zhk_Tr.get (parseInt (window.sessionStorage.getItem("Id")));
				IDBRequest_kReq1.onsuccess = function () {
					var IDBRequest_bReq1 = IDBObjectStore_Zhk_Tr.put ({Id: this.result.Id, Kurzuskod: this.result.Kurzuskod, Datum: this.result.Datum, Ido: this.result.Ido, Fajta: this.result.Fajta, Eredmeny: parseInt (document.getElementById("Eredmeny").value)});
          IDBRequest_bReq1.onsuccess = function() {console.log("sikerült a módosítás")};  				
				  IDBRequest_bReq1.onerror = function() {console.log("sikertelen a módosítás")};  
				};
				
				IDBRequest_kReq1.onerror = function () {
					console.log ("Sikertelen kimeneti req :-(");	
				};
				
      }
});
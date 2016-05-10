document.querySelector("#Foablak").style.height = (screen.height - 80) + "px";

document.getElementById("Felvitel").addEventListener("click", function () {
    var IDBOpenDBRequest_AdatNyit = window.indexedDB.open("Kurzustarolo", 1);
    IDBOpenDBRequest_AdatNyit.onsuccess = function() {
      console.log("Sikerült a megnyitás");
      var IDBDatabase_DB = this.result;
      var IDBTransaction_Tr1 = IDBDatabase_DB.transaction("Kurzusok", "readwrite");
      IDBTransaction_Tr1.oncomplete = function() {
	console.log("Tranzakció lefutott");
        IDBDatabase_DB.close();
        window.location.href = "index.html";
      };
	var IDBObjectStore_Kurzusok_Tr = IDBTransaction_Tr1.objectStore("Kurzusok");
	var IDBRequest_bReq1 = IDBObjectStore_Kurzusok_Tr.add({Kurzuskod: document.getElementById("Kurzuskod").value, Kurzusnev: document.getElementById("Kurzus_nev").value, Tipus: document.getElementById("Tipus").value, Hanyora: document.getElementById("Hanyora").value, Kreditertek: document.getElementById("Kreditertek").value, Oktatoja: document.getElementById("Oktatoja").value});
	IDBRequest_bReq1.onsuccess = function() {
	console.log("Hozzáadás sikerült");
      };
	IDBRequest_bReq1.onerror = function() {
	console.log("Hozzáadás nem sikerült");
      };
    };
    IDBOpenDBRequest_AdatNyit.onerror = function() {
      console.log("Sikertelen a megnyitás");
    };

});

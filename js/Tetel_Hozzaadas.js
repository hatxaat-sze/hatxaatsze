document.querySelector("#Foablak").style.height = (screen.height - 80) + "px";

document.getElementById("Kurzuskod").addEventListener("click", function () {
    window.location.href = "Kurzus_Lista.html";
});
document.getElementById("Felvitel").addEventListener("click", function () {
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
	var IDBRequest_bReq1 = IDBObjectStore_Zhk_Tr.add({Kurzuskod: document.getElementById("Kurzuskod").value, Datum: document.getElementById("Datum").value, Ido: document.getElementById("Ido").value, Fajta: document.getElementById("Fajta").value, Eredmeny:-1 });
	IDBRequest_bReq1.onsuccess = function() {
	 console.log("Hozzáadás sikerült");
   window.sessionStorage.setItem("Kiv_Kurzuskod", "");
  };
	IDBRequest_bReq1.onerror = function() {
	console.log("Hozzáadás nem sikerült");
      };
    };
    IDBOpenDBRequest_AdatNyit.onerror = function() {
      console.log("Sikertelen a megnyitás");
    };

});

window.onload = function(){
  
  document.getElementById("Kurzuskod").value = window.sessionStorage.getItem("Kiv_Kurzuskod") == null ? "" : window.sessionStorage.getItem("Kiv_Kurzuskod");
};

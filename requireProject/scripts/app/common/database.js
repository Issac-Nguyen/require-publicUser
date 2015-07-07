define([], function() {
    var db, indexedDB, IDBTransaction, IDBKeyRange;

    function indexedDBError(event) {
        if (typeof console !== "undefined") {
            console.error("An error occurred", event);
        }
    }

    function insertInto(model, data, successCallback) {
        var transaction = db.transaction([model], IDBTransaction.READ_WRITE || 'readwrite'),
            store, i, request, total = data.length;

        function successCallbackInner() {
            total = total - 1;
            if (total === 0) {
                if (successCallback)
                    successCallback();
            }
        }
        transaction.onerror = indexedDBError;
        store = transaction.objectStore(model);
        // for (i in data) {
        // 	if (data.hasOwnProperty(i)) {
        request = store.add(data);
        request.onsuccess = successCallbackInner;
        request.onerror = indexedDBError;
        // 	}
        // }
    }

    function updateObj(model, data, successCallback) {
        var transaction = db.transaction([model], IDBTransaction.READ_WRITE || 'readwrite'),
            store, i, request, total = data.length;

        function successCallbackInner() {
            total = total - 1;
            if (total === 0) {
                if (successCallback)
                    successCallback();
            }
        }
        transaction.onerror = indexedDBError;
        store = transaction.objectStore(model);
        // for (i in data) {
        //  if (data.hasOwnProperty(i)) {
        request = store.put(data);
        request.onsuccess = successCallbackInner;
        request.onerror = indexedDBError;
        //  }
        // }
    }

    function deleteAllFrom(model, successCallback) {
        var transaction = db.transaction([model], IDBTransaction.READ_WRITE || 'readwrite'),
            store, request;
        transaction.onerror = indexedDBError;
        store = transaction.objectStore(model);
        request = store.clear();
        request.onerror = indexedDBError;
        request.onsuccess = successCallback;
    }

    function selectAll(model, successCallback) {
        var transaction = db.transaction([model], IDBTransaction.READ_ONLY || 'readonly'),
            store, request, results = [];
        transaction.onerror = indexedDBError;
        store = transaction.objectStore(model);
        request = store.openCursor();
        request.onerror = indexedDBError;
        request.onsuccess = function(event) {
            var result = event.target.result;
            // When result is null the end is reached
            if (!result) {
                successCallback(results);
                return;
            }
            results.push(result.value);
            // Weird to hack jslint
            result['continue']();
        };
    }

    function selectOne(model, id, successCallback) {
        var transaction = db.transaction([model], IDBTransaction.READ_WRITE || 'readwrite'),
            store, request;
        transaction.onerror = indexedDBError;
        store = transaction.objectStore(model);
        request = store.get(id);
        request.onerror = indexedDBError;
        request.onsuccess = function(event) {
            var result = event.target.result;
            successCallback(result);
        };
    }

    function start(successCallback, failureCallback) {
        // Protect ourselves inside old browsers
        try {
            indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
            IDBTransaction = window.hasOwnProperty('webkitIndexedDB') ? window.webkitIDBTransaction : window.IDBTransaction;
            IDBKeyRange = window.hasOwnProperty('webkitIndexedDB') ? window.webkitIDBKeyRange : window.IDBKeyRange;
        } catch (e) {
            failureCallback();
        }
        if (!indexedDB) {
            failureCallback();
            return;
        }
        var version = 8,
            request = indexedDB.open("PublicUser", version);

        function installModels() {
            if (db.objectStoreNames.contains("defects")) {
                db.deleteObjectStore("defects");
            }
            if (db.objectStoreNames.contains("profile")) {
                db.deleteObjectStore("profile");
            }
            // TODO This is strictly model logic, and ought not live inside the indexedDB library, should move.
            db.createObjectStore("defects", {
                                     keyPath: "id",
                                     autoIncrement: true
                                 });

            db.createObjectStore("profile", {
                                     autoIncrement: true
                                 });
        }
        request.onsuccess = function(event) {
            var setVersionRequest;
            db = event.target.result;
            version = String(version);
            if (db.setVersion && version !== db.version) {
                setVersionRequest = db.setVersion(version);
                setVersionRequest.onfailure = indexedDBError;
                setVersionRequest.onsuccess = function(event) {
                    installModels();
                    setVersionRequest.result.oncomplete = function() {
                        if (successCallback) {
                            successCallback();
                        }
                    };
                };
            } else {
                if (successCallback)
                    successCallback();
            }
        };
        request.onupgradeneeded = function(event) {
            db = event.target.result;
            installModels();
        };
        request.onerror = function(event) {
            alert("You have chosen not to use offline storage");
            failureCallback();
        };
    }
    return {
        start: start,
        insertInto: insertInto,
        deleteAllFrom: deleteAllFrom,
        selectAll: selectAll,
        selectOne: selectOne
    };
});
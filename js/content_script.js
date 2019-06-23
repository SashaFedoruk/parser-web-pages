$(function () {
    var ajaxUrl = "";
    //var ajaxUrl = "https://itex.guru/answer.php";
    
    var url = "";
    var isEnd = false;

    function ajaxRequest(data) {
        url = document.URL;
        //alert(url);
        $.ajax({
            url: ajaxUrl,
            type: "POST",
            async: false,
            data: {
                data: data,
                url: url
            },
            success: function (result) {
                url = result;
                if (result != "done") {
                    redirectPage();
                } else {
                    sendEnd();
                    isEnd = true;
                    alert("Done!");
                }

            },
            error: function (error) {
                sendEnd();
                alert("error: " + error.status);
            }
        })
    }

    function redirectPage() {
        getPageOld();
    }

    function sendDataOfCurrentPage() {
        var data = new XMLSerializer().serializeToString(document);
        ajaxRequest(data);
    }

    function sendEnd() {
        chrome.runtime.sendMessage({
            "end": "",
            url: document.URL
        }, function (response) {});
    }

    function getStatus() {
        chrome.runtime.sendMessage({
            "getStatus": "",
            url: document.URL
        }, function (response) {});
    }

    function getPageOld() {
        chrome.runtime.sendMessage({
            "getPageOld": "",
            url: document.URL
        }, function (response) {});
    }

    function OnMessage(request, sender, sendResponse) {
        if (request.status == "true") {
            sendDataOfCurrentPage();
        }
        if (request.url != url && !isEnd) {
            console.log(url + ":" + request.url);
            window.location.replace(url);
        }
    }
    chrome.runtime.onMessage.addListener(OnMessage);
    getStatus();

});
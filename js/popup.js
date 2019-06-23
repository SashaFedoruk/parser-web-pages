var status = "false"
var pageOld = "";

function OnMessage(request, sender, sendResponse) {
    console.log("onMessage");
    if (request.getStatus == "") {
        sendStatus();
    }
    if (request.end == "") {
        status = "false";
    }
    if(request.getPageOld == ""){
        sendUrlOld();
    }
    if(request.url != pageOld){
        pageOld = request.url;
    }
    


}

function sendStatus() {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            status: status
        });
    });
}
function sendUrlOld(){
     chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            url: pageOld
        });
    });
}
$("#btn_start").click(function () {
    chrome.runtime.onMessage.addListener(OnMessage);
    status = "true";
    sendStatus();
});
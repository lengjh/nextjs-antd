// // chrome.browserAction.onClicked.addListener(function (tab) {
// //   console.log(tab);
// // });

// chrome.extension.onRequest.addListener(
//   function (request, sender, sendResponse) {
//     console.log(request, sender, sendResponse);


//     console.log(sender.tab ?
//       "from a content script:" + sender.tab.url :
//       "from the extension");
//     if (request.greeting == "hello")
//       sendResponse({ farewell: "goodbye" });
//     else
//       sendResponse({}); // snub them.
//   });
console.log(0)
chrome.runtime.onConnect.addListener(function (port) {
  console.log(port)
  port.onMessage.addListener(function (msg) {
    var workerFormatter, workerJSONLint, json = msg.json;
    console.log(msg)
    function onWorkerJSONLintMessage() {
      var message = JSON.parse(event.data);
      workerJSONLint.removeEventListener("message", onWorkerJSONLintMessage, false);
      workerJSONLint.terminate();
      port.postMessage({
        ongetError: true,
        error: message.error,
        loc: message.loc,
        offset: msg.offset
      });
    }

    function onWorkerFormatterMessage(event) {
      var message = event.data;
      workerFormatter.removeEventListener("message", onWorkerFormatterMessage, false);
      workerFormatter.terminate();
      if (message.html)
        port.postMessage({
          onjsonToHTML: true,
          html: message.html,
          theme: localStorage.theme
        });
      if (message.error) {
        workerJSONLint = new Worker("/WebContent/workerJSONLint.js");
        workerJSONLint.addEventListener("message", onWorkerJSONLintMessage, false);
        workerJSONLint.postMessage(json);
      }
    }

    if (msg.init)
      port.postMessage({
        oninit: true,
        options: localStorage.options ? JSON.parse(localStorage.options) : {}
      });
    if (msg.copyPropertyPath) {
      path = msg.path;
      value = msg.value;
    }
    if (msg.jsonToHTML) {
      workerFormatter = new Worker("/WebContent/workerFormatter.js");
      workerFormatter.addEventListener("message", onWorkerFormatterMessage, false);
      workerFormatter.postMessage({
        json: json,
        fnName: msg.fnName
      });
    }
  });
});

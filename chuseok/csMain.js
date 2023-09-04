let os;
let userInfo;

/** 브릿지 통신 */
const getPayWatchApp = (functionName, params) => {
  try {
    /** 안드로이드 디바이스일때 */
    if (os === "android") {
      typeof params !== "undefined" && params
        ? window.PaywatchAppInterface[functionName](params)
        : window.PaywatchAppInterface[functionName]();
      /** IOS 디바이스일때 */
    } else if (os === "ios") {
      if (typeof params === "undefined") {
        window.webkit.messageHandlers?.nativeCallback.postMessage(
          `${functionName}#`
        );
      } else if (
        typeof params === "string" &&
        typeof params === "number" &&
        typeof params === "boolean"
      ) {
        window.webkit.messageHandlers?.nativeCallback.postMessage(
          `${functionName}#${params}`
        );
      } else if (typeof params === "object") {
        const msg = JSON.stringify({});
        window.webkit.messageHandlers?.nativeCallback.postMessage(
          `${functionName}#${msg}`
        );
      }
    } else {
      console.log("[OS ERROR] OS is neither AOS nor IOS");
    }
  } catch (error) {
    console.log("error", error);
  }
};

/** 디바이스 정보 */
const ua = window.navigator.userAgent;

/** os 정보 저장 */
if (/(android)/i.test(ua)) {
  os = "android";
} else if (/(ipod|iphone|ipad)/i.test(ua)) {
  os = "ios";
} else {
  os = null;
}

/** 브릿지 호출 */
getPayWatchApp("getUserInfo");

/** 앱->웹 브릿지 정보 취득 */
window.setUserInfo = (params) => {
  console.log("setUserInfo : ", JSON.parse(params));
  userInfo = JSON.parse(params).userType;
};

import { firebaseConfig, mixpanelToken } from '../config.js';
import { event_start, event_complete, event_exit } from '../chuseok/mixpanel.js';

// Initialize mixpanel
// mixpanel.init(mixpanelToken, { debug: true, track_pageview: true });

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

const userRef = db.collection('users');

userRef
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', JSON.stringify(doc.data()));
    });
  })
  .catch((error) => {
    console.log('Error getting documents: ', error);
  });

async function getUserByUserName(name) {
  try {
    return await userRef.where('user_name', '==', name).get();
  } catch (error) {
    console.error('Error getting the user:', error);
  }
}

const findPoint = document.querySelector('#findPoint');

// 문서가 로드되면 함수를 실행합니다.
document.addEventListener('DOMContentLoaded', async function () {
  const snapshot = await getUserByUserName('오동녘어진이');

  if (!snapshot.empty) {
    const data = snapshot.docs[0].data();
    findPoint.textContent = data.points;
  } else {
    alert('No data found!');
  }

  // 버튼에 이벤트 리스너 추가
  const navigateBtn = document.getElementById('navigateBtn');
  navigateBtn.addEventListener('click', navigateToGame);
});

// navigateToGame 함수를 누적 점수와 함께 "./csGame.html"로 navigate되도록 수정
function navigateToGame() {
  const currentPoints = findPoint.textContent; // 현재 화면에 표시된 누적 점수를 가져옵니다.
  window.location.href = `./csGame.html?points=${currentPoints}`;
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

let os;
let userInfo;

/** 브릿지 통신 */
const getPayWatchApp = (functionName, params) => {
  try {
    /** 안드로이드 디바이스일때 */
    if (os === 'android') {
      typeof params !== 'undefined' && params ? window.PaywatchAppInterface[functionName](params) : window.PaywatchAppInterface[functionName]();
      /** IOS 디바이스일때 */
    } else if (os === 'ios') {
      if (typeof params === 'undefined') {
        window.webkit.messageHandlers?.nativeCallback.postMessage(`${functionName}#`);
      } else if (typeof params === 'string' && typeof params === 'number' && typeof params === 'boolean') {
        window.webkit.messageHandlers?.nativeCallback.postMessage(`${functionName}#${params}`);
      } else if (typeof params === 'object') {
        const msg = JSON.stringify({});
        window.webkit.messageHandlers?.nativeCallback.postMessage(`${functionName}#${msg}`);
      }
    } else {
      console.log('[OS ERROR] OS is neither AOS nor IOS');
    }
  } catch (error) {
    console.log('error', error);
  }
};

/** 디바이스 정보 */
const ua = window.navigator.userAgent;

/** os 정보 저장 */
if (/(android)/i.test(ua)) {
  os = 'android';
} else if (/(ipod|iphone|ipad)/i.test(ua)) {
  os = 'ios';
} else {
  os = null;
}

/** 브릿지 호출 */
getPayWatchApp('getUserInfo');

/** 앱->웹 브릿지 정보 취득 */
window.setUserInfo = (params) => {
  console.log('setUserInfo : ', JSON.parse(params));
  userInfo = JSON.parse(params).userType;
};

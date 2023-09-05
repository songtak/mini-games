import { firebaseConfig, mixpanelToken } from '../config.js';

// Initialize mixpanel
// mixpanel.init(mixpanelToken, { debug: true, track_pageview: true });

// /**
//  * @description [급여계좌 입력 (서명 - 인증후)] 화면에서 '자동이체 등록' 버튼 클릭하여 [인출금액 입력] 화면으로 이동 시
//  * @function register_CMS_account
//  */
// export const register_CMS_account = (bank) => {
//   mixpanel.track('register_CMS_account', {
//     withdraw_account_bank: bank.bankName,
//     withdraw_account_number: Number(bank.account_number),
//     withdraw_repayment_method: '자동이체',
//   });
// };

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

const elements = {
  enterID: document.querySelector('#enterID'),
  enterName: document.querySelector('#enterName'),
  enterAge: document.querySelector('#enterAge'),
  findID: document.querySelector('#findID'),
  findName: document.querySelector('#findName'),
  findAge: document.querySelector('#findAge'),
  insertBtn: document.querySelector('#insert'),
  updateBtn: document.querySelector('#update'),
  removeBtn: document.querySelector('#remove'),
  findBtn: document.querySelector('#find'),
};

async function getUserById(ID) {
  try {
    return await userRef.where('ID', '==', ID).get();
  } catch (error) {
    console.error('Error getting the user:', error);
  }
}

elements.insertBtn.addEventListener('click', async () => {
  const userInfo = {
    ID: elements.enterID.value,
    Name: elements.enterName.value,
    Age: elements.enterAge.value,
  };
  try {
    await userRef.add(userInfo);
    // await userRef.doc('문서이름').set(userInfo);
    console.log('Data successfully set!');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
});

elements.findBtn.addEventListener('click', async () => {
  const snapshot = await getUserById(elements.findID.value);

  if (!snapshot.empty) {
    const data = snapshot.docs[0].data();
    elements.findName.textContent = 'Name: ' + data.Name;
    elements.findAge.textContent = 'Age: ' + data.Age;
  } else {
    alert('No data found!');
  }
});

elements.updateBtn.addEventListener('click', async () => {
  const snapshot = await getUserById(elements.enterID.value);
  if (!snapshot.empty) {
    snapshot.forEach((doc) => {
      doc.ref.update({
        Name: elements.enterName.value,
        Age: parseInt(elements.enterAge.value, 10),
      });
    });
    console.log('Data successfully updated!');
  } else {
    console.log('No matching document found.');
  }
});

elements.removeBtn.addEventListener('click', async () => {
  const snapshot = await getUserById(elements.enterID.value);
  if (!snapshot.empty) {
    snapshot.forEach((doc) => doc.ref.delete());
    console.log('Data successfully deleted!');
  } else {
    console.log('No matching document found.');
  }
});

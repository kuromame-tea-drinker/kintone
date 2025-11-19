(function() {
  "use strict";

  // レコード再利用時に動作するイベント
  kintone.events.on('app.record.create.show', function(event) {

    // Start of Selection
    if(event.reuse){
      const array = ['案件フェーズ', '納期', '数値', '売上月文字', 'QW', 'ゼウスNo', '検討会日付', '仕入月', '実納期', 'ETD', '実績ETD',
                      'MD契約書提出', '経営確認', '貿易確認', 'ニーズ設定日付', 'ニーズ設定週', 'フェーズ検討会日付', '検討会週', '正式受注日付', '週'];
      
      array.forEach(field => {
        event.record[field].value = '';
        });

      const checkArray = ['MD契約書提出', '経営確認', '貿易確認'];

      checkArray.forEach(check => {
        event.record[check].value = [];
      });
    }
      return event;
  });
})();      
      
(function() {
  'use strict';
  const events = ['app.record.create.show',
                  'app.record.edit.show',
                  'app.record.detail.show',
                  'app.record.create.change.レート用',
                  'app.record.edit.change.レート用',
                  'app.record.create.change.editXeus',
                  'app.record.edit.change.editXeus',
                  'app.record.create.change.案件フェーズ',
                  'app.record.edit.change.案件フェーズ'];
  
  kintone.events.on(events, function(event){

    if(event.type === 'app.record.create.show' || event.type === 'app.record.edit.show' || event.type === 'app.record.detail.show'){
      event.record.生地品番.disabled = false;
      event.record.ブランド.lookup = true;

      event.record.インフラ.value = '固定費';
      event.record.インフラ.lookup = true;
      event.record.システム開発.value = '鈴木 史洋';
      event.record.システム開発.lookup = true;

      if(event.record.案件フェーズ.value === '④検討会' || event.record.案件フェーズ.value === '★正式受注'){
        event.record.検討会確度.disabled  = true;
      }else{
        event.record.検討会確度.disabled  = false;
      }
/*
      const array = ['②製品提案', '③見積提出', '④検討会', '★正式受注'];

      array.forEach((field) => {

        if(event.record.案件フェーズ.value === field){
          kintone.app.record.setFieldShown('提案サンプル着日', true);
        } else {
          kintone.app.record.setFieldShown('提案サンプル着日', false);
        }
      })
*/

      const space = kintone.app.record.getSpaceElement('fabricButton');

      // 既にボタンが存在する場合は処理を終了
      if (!document.getElementById('button')) {
        const button = document.createElement('button');
        button.id = 'button';
        button.innerText = '生地品番登録';
      
        button.onclick = () => {
          window.open('https://3rdoffice.cybozu.com/k/442/');
        }
      
        space.appendChild(button);
      }
      
    }
/*
    if(event.type === 'app.record.create.change.案件フェーズ' || event.type === 'app.record.edit.change.案件フェーズ'){
      const fase = event.record.案件フェーズ.value;
      switch(fase){
        case '②製品提案':
        case '③見積提出':
        case '④検討会':
        case '★正式受注':  
        kintone.app.record.setFieldShown('提案サンプル着日', true);
        break;
        default: kintone.app.record.setFieldShown('提案サンプル着日', false);
        break
      }
    }
*/
    if(event.type === 'app.record.edit.show'){
      
      if(event.record.案件フェーズ.value === '④検討会' && !event.record.フェーズ検討会日付.value){
        event.record.フェーズ変更済.value === '済';
      }

      if(event.record.案件フェーズ.value === '★正式受注' && !event.record.正式受注日付.value){
        event.record.フェーズ変更済.value === '済';
      }      
    }

    const suzuki = ['editXeus',  '正式受注日付', '週'];
    
    suzuki.forEach((field) => {
        const userName = kintone.getLoginUser().name;
        if(userName === "鈴木 史洋"){
            kintone.app.record.setFieldShown(field, true);
        } else {
            kintone.app.record.setFieldShown(field, false);
        }
    });

    const editXeus = event.record.editXeus.value; // チェックボックスの値を取得
    if (editXeus && editXeus.includes('編集')) { // 値が存在し、'編集'が含まれているか確認
      event.record.ゼウスNo.disabled = false; // 編集を許可
    } else {
      event.record.ゼウスNo.disabled = true; // 編集を禁止
    }
    

    const unshown = ['レート用', '計算_2', '売上月2', '更新用', '判定', '予算', 'レート用3', '売上日付用年度', 'weekNum_T_W', 'xeus用得意先', '受注率レコード', '受注率key',
                     '全フェーズ', '正式発注', '受注率', 'タスク作成者', '通知用作業者', /*'ニーズ設定日付', 'ニーズ設定週', 'フェーズ検討会日付', '検討会週', '正式受注日付', '週'*/];
    unshown.forEach((field) => {

      kintone.app.record.setFieldShown(field,false);
    });
   
   event.record.工場サブ.disabled = false;
   event.record.営業用輸入諸掛.disabled = false;
   event.record.副資材.disabled = false;
   event.record.設定粗利率.disabled = false;
   event.record.数値.disabled = true;
   event.record.売上月文字.disabled = true;
   //event.record.生地品番.disabled = false;

   let num = event.record.数値.value + event.record.売上月文字.value;
    let rate = event.record.レート.value;
    
    console.log(num,rate);
    

    if( event.record.ラジオボタン.value === 'US$'){

  switch(event.record.レート用.value) {
    case '20229':
      event.record.レート.value = '127';
      break;
    case '202210':
      event.record.レート.value = '134';
      break;
    case '202211':
      event.record.レート.value = '142';
      break;
    case '202212':
      event.record.レート.value = '138';
      break;
    case '20221':
      event.record.レート.value = '147';
      break;
    case '20232':
      event.record.レート.value = '149';
      break;
    case '20233':
      event.record.レート.value = '152';
      break;
    case '20234':
      event.record.レート.value = '142';
      break;
    case '20235':
      event.record.レート.value = '138';
      break;
    case '20236':
      event.record.レート.value = '137';
      break;
    case '20237':
      event.record.レート.value = '142';
      break;
    case '20238':
      event.record.レート.value = '139';
      break;
    case '20239':
      event.record.レート.value = '140';
      break;
    case '202310':
      event.record.レート.value = '145';
      break;
    case '202311':
      event.record.レート.value = '149';
      break;
    case '202312':
      event.record.レート.value = '151';
      break;
    case '20231':
      event.record.レート.value = '152';
      break;
    case '20242':
      event.record.レート.value = '155';
      break;
    case '20243':
      event.record.レート.value = '155';
      break;
    default:
      event.record.レート.value = '155';
  }
}
  return event;
    
  });
})();


// カスタムフォーム要素の状態管理
document.addEventListener('DOMContentLoaded', function() {
    // ラジオボタンの状態管理
    const radioButtons = document.querySelectorAll('.contact-form__radio input[type="radio"]');
    
    radioButtons.forEach(function(radio) {
        // 初期状態の設定
        updateRadioState(radio);
        
        // 変更イベントの監視
        radio.addEventListener('change', function() {
            // 同じname属性のラジオボタンをすべて取得
            const sameNameRadios = document.querySelectorAll('input[type="radio"][name="' + this.name + '"]');
            
            sameNameRadios.forEach(function(sameRadio) {
                updateRadioState(sameRadio);
            });
        });
    });
    
    // チェックボックスの状態管理
    const checkboxes = document.querySelectorAll('.contact-form__consent input[type="checkbox"]');
    
    checkboxes.forEach(function(checkbox) {
        // 初期状態の設定
        updateCheckboxState(checkbox);
        
        // 変更イベントの監視
        checkbox.addEventListener('change', function() {
            updateCheckboxState(this);
        });
    });
    
    // ラジオボタンの状態を更新する関数
    function updateRadioState(radio) {
        const label = radio.closest('.contact-form__radio');
        if (radio.checked) {
            label.classList.add('checked');
        } else {
            label.classList.remove('checked');
        }
    }
    
    // チェックボックスの状態を更新する関数
    function updateCheckboxState(checkbox) {
        const label = checkbox.closest('label');
        if (checkbox.checked) {
            label.classList.add('checked');
        } else {
            label.classList.remove('checked');
        }
        
        // プライバシーポリシーのチェックボックスの場合、ボタンの状態も更新
        if (checkbox.name === 'agree') {
            updateSubmitButtonState();
        }
    }
    
    // 確認画面へボタンの状態を更新する関数
    function updateSubmitButtonState() {
        const agreeCheckbox = document.querySelector('input[name="agree"]');
        const submitButton = document.getElementById('submit-button');
        
        if (agreeCheckbox && submitButton) {
            if (agreeCheckbox.checked) {
                submitButton.disabled = false;
            } else {
                submitButton.disabled = true;
            }
        }
    }
    
    // 初期状態でボタンの状態を設定
    updateSubmitButtonState();
}); 
<div class="new-page" w-class="new-page" ev-back-click="backPrePage">
    <app-components1-topBar-topBar>{"title":"创建账户"}</app-components1-topBar-topBar>
    <div w-class="body">
        <app-view-wallet-components-tipsCard>{title:"设置账户密码",content:"系统已为您创建好账户，请设置账户密码。"}</app-view-wallet-components-tipsCard>
        
        <div w-class="bottom-box">
            <div w-class="avatar-container" on-tap="selectImageClick">
                {{if !it1.chooseImage}}
                <div style="background-image: url(../../../res/image/default_avater_big.png);" w-class="avatar"></div>
                {{else}}
                <widget w-tag="pi-ui-html" w-class="ui-html">{{it1.avatarHtml}}</widget>
                {{end}}
                {{if !it1.chooseImage}}
                <div w-class="choose-img-mask">
                    <img src="../../../res/image/choose_img.png" w-class="choose-img"/>
                </div>
                {{end}}
            </div>
            <div w-class="name-box" ev-input-change="walletNameChange">
                <app-components1-input-input>{input:{{it1.walletName}}}</app-components1-input-input>
                <img w-class="random" src="../../../res/image/dice.png" on-tap="randomPlayName"/>
            </div>
            <div ev-psw-change="pswChange"><app-components-password-password>{hideTips:true}</app-components-password-password></div>
            <div w-class="input-father" ev-input-change="pswConfirmChange"><app-components-input-suffixInput>{itype:"password",placeHolder:"重复密码",clearable:true,available:{{it1.pswEqualed}}}</app-components-input-suffixInput></div>
            <div w-class="registered-protocol" ev-checkbox-click="checkBoxClick">
                <app-components1-checkbox-checkbox>{itype:"false",text:"我已经认证阅读并同意"}</app-components1-checkbox-checkbox>
                <span w-class="user-protocol" on-tap="agreementClick">隐私条约</span>
            </div>
            <div ev-btn-tap="createClick" w-class="btn"><app-components1-btn-btn>{"name":"完成","types":"big","color":"white"}</app-components1-btn-btn></div>
        </div>
    </div>
</div>
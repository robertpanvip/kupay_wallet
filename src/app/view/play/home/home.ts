/**
 * play home 
 */
 // ================================ 导入
import { Json } from '../../../../pi/lang/type';
import { popNew } from '../../../../pi/ui/root';
import { getLang } from '../../../../pi/util/lang';
import { Forelet } from '../../../../pi/widget/forelet';
import { loadDir } from '../../../../pi/widget/util';
import { Widget } from '../../../../pi/widget/widget';
import { openNewActivity } from '../../../logic/native';
import { register } from '../../../store/memstore';
import { getUserInfo, hasWallet, popNewMessage } from '../../../utils/tools';

import { WebViewManager } from '../../../../pi/browser/webview';
import { confirmPay,OrderDetail } from '../../../utils/pay';
// import { closePayment, confirmOrder, getOpenId, openPayment, openPswInput } from '../../../api/JSAPI';
// import { confirmPay } from '../../../utils/pay';

// ================================ 导出
// tslint:disable-next-line:no-reserved-keywords
declare var module: any;
export const forelet = new Forelet();
export const WIDGET_NAME = module.id.replace(/\//g, '-');
export class PlayHome extends Widget {
    
    public ok: () => void;
    public language:any;
    public web3Promise: Promise<string>;
    
    constructor() {
        super();

        this.web3Promise = new Promise((resolve) => {
            const path = 'app/core/thirdparty/web3_rpc.js.txt';
            loadDir([path], undefined, undefined, undefined, fileMap => {
                const arr = new Uint8Array(fileMap[path]);
                // for (let i = 0; i < arr.length; ++i) {
                //     content += String.fromCharCode(arr[i]);
                // }
                // content = decodeURIComponent(escape(atob(content)));
                const content = new TextDecoder().decode(arr);
                resolve(content);
            }, () => {}, () => {});
        });
    }
    
    public setProps(props:Json) {
        super.setProps(props);
        this.language = this.config.value[getLang()];
        const userInfo = getUserInfo();
        if (userInfo) {
            this.props.avatar = userInfo.avatar ? userInfo.avatar : '../../res/image1/default_avatar.png';
            this.props.refresh = false;
        }
        this.props.gameList = [
            {
                title:'Crypto Fishing',
                desc:{ zh_Hans:'新一代区块链游戏',zh_Hant:'新一代區塊鏈遊戲',en:'' },
                img:'app/res/image1/game2.jpg',
                url:'http://47.244.59.13/web-rinkeby/index.html'
            },
            {
                title:{ zh_Hans:'迷失之城',zh_Hant:'迷失之城',en:'' },
                desc:{ zh_Hans:'基于GAIA链的新一代区块链游戏',zh_Hant:'基於GAIA鏈的新一代區塊鏈遊戲',en:'' },
                img:'app/res/image1/game3.jpg',
                url:''
            },
            {
                title:'Decentraland',
                desc:{ zh_Hans:'Decentraland与Ethaemon合作',zh_Hant:'Decentraland與Ethaemon合作',en:'' },
                img:'app/res/image1/game4.jpg',
                url:''
            }
        ];
    }

    public backPrePage() {
        this.ok && this.ok();
    }

    public enterGames1Click() {
        openNewActivity('http://39.104.203.151/game/boot/index.html');
    }

    public enterGames2Click() {
        if (!hasWallet()) return;
        const gameTitle = 'Crypto Fishing';
        const gameUrl = 'http://47.244.59.13/web-rinkeby/index.html';
        this.web3Promise.then(content => {
            WebViewManager.open(gameTitle, `${gameUrl}?${Math.random()}`, gameTitle, content);
        });
    }

    public getCode(event:any) {
        console.log(event.phone);
    }

    public modalBoxSure(e:any) {
        console.log(e.value);
    }

    public showMine() {
        popNew('app-view-mine-home-home');
    }

    /**
     * 刷新页面
     */
    public refreshPage() {
        this.props.refresh = true;
        this.paint();
        setTimeout(() => {
            this.props.refresh = false;
            this.paint();
        }, 1000);

    }

    public gameClick(num:number) {
        if (!hasWallet()) return;
        if (!this.props.gameList[num].url) {
            popNewMessage(this.language.tips);
        } else {
            const gameTitle = this.props.gameList[num].title;
            const gameUrl =   this.props.gameList[num].url;
            this.web3Promise.then(content => {
                WebViewManager.open(gameTitle, `${gameUrl}?${Math.random()}`, gameTitle, content);
            });
        }
    }

    public payBtn() {
        const order:OrderDetail = {
            total:Number(document.getElementById('total').value),
            gt:Number(document.getElementById('gt').value),
            body:document.getElementById('body').value,
            payType:Number(document.getElementById('payType').value)
        };
        confirmPay(order,() => {
            console.log('支付成功');
            
        },(err) => {
            popNew('app-components1-message-message', { content:'下单失败，请重试' });
        });
    }
}
register('user/info',() => {
    const w: any = forelet.getWidget(WIDGET_NAME);
    if (w) {
        const userInfo = getUserInfo();
        if (userInfo) {
            w.props.avatar = userInfo.avatar ? userInfo.avatar : '../../res/image1/default_avatar.png';
        }
        w.paint();
    }
});
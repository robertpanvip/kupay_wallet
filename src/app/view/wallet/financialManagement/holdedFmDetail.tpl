<div class="new-page" w-class="new-page" ev-back-click="backPrePage">
    <div w-class="title-container">
        <app-components1-topBar-topBar>{"title":{{it.product.productName}},background:"#fff"}</app-components1-topBar-topBar>
        <div w-class="head1">
            <div w-class="head1-tag">昨日收益({{it.product.coinType}})</div>
            <div w-class="ye-earn">{{it.product.yesterdayIncoming}}</div>
            <div w-class="status">收益中</div>
        </div>
        <div w-class="head2">
            <div w-class="col1">
                <div w-class="tag">年化收益</div>
                <div w-class="content">{{it.product.profit}}%</div>
            </div>
            <div w-class="line"></div>
            <div w-class="col2">
                <div w-class="tag">累计收益({{it.product.coinType}})</div>
                <div w-class="content">{{it.product.totalIncoming}}</div>
            </div>
            <div w-class="line"></div>
            <div w-class="col1">
                <div w-class="tag">持续(天)</div>
                <div w-class="content">{{it.product.days}}</div>
            </div>
        </div>
    </div>
    <div w-class="bottom-box">
        <div w-class="row5">{{it.product.productIntroduction}}</div>
        <div w-class="title">其他信息</div>
        <div w-class="detail-box">
            <div w-class="detail">交易时间：{{it.product.purchaseDate}}</div>
            <div w-class="detail">购买单价：{{it.product.unitPrice}}{{it.product.coinType}}</div>
            <div w-class="detail">产品名称：{{it.product.productName}}</div>
            <div w-class="detail">购买份数：{{it.product.amount}}份</div>
            <div w-class="detail">年化收益：{{it.product.profit}}%</div>
            <div w-class="detail">锁定期：{{it.product.lockday}}</div>
        </div>
        <div w-class="read">阅读声明</div>
        <div ev-btn-tap="redemptionClick" w-class="btn"><app-components-btn-btn>{"name":"赎回","types":"big","color":"blue"}</app-components-btn-btn></div>
    </div>
</div>
class Patapata {
    constructor(panelData, preposition, rotateTime) {
        // パタパタの各表示データ
        this.panelData = panelData;
        
        // 回転時間を変更する関数
        this.changeRotateTime = (time) => {
            function getCssRule(id) {
                for (const sheet of document.styleSheets) {
                    if (sheet.href.startsWith("https://fonts.googleapis.com"))
                        continue;
                    for (const rule of sheet.cssRules) {
                        if (rule.selectorText == id)
                            return rule;
                    }
                }
                return null;
            }
            rotateTime = time;
            getCssRule(".rotate.panel-0-upper").style["animationDuration"] = `${rotateTime}s`;
            getCssRule(".rotate.panel-1-lower").style["animationDuration"] = `${rotateTime}s`;
            getCssRule(".rotate.panel-1-lower").style["animationDelay"] = `${rotateTime}s`;
        };

        // パタパタを回転させる関数
        this.rotatesAsync = async(panels) => {
            const wait = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
            function setPanel0Html(html) {
                document.getElementById(`${preposition}-0-upper`).innerHTML = html;
                document.getElementById(`${preposition}-0-lower`).innerHTML = html;
            }
            function setPanel1Html(html) {
                document.getElementById(`${preposition}-1-upper`).innerHTML = html;
                document.getElementById(`${preposition}-1-lower`).innerHTML = html;
            }
            function rotateStart(newHtml) {
                setPanel1Html(newHtml);
                document.getElementById(`${preposition}-0-upper`).classList.add("rotate");
                document.getElementById(`${preposition}-1-lower`).classList.add("rotate");
            }
            function rotateReset(nowHtml) {
                setPanel0Html(nowHtml);
                document.getElementById(`${preposition}-0-upper`).classList.remove("rotate");
                document.getElementById(`${preposition}-1-lower`).classList.remove("rotate");
            }

            for (let i = 0; i < panels.length - 1; i++) {
                await wait((rotateTime * 0.2) * 1000);
                rotateStart(panelData[panels[i+1]]);
                await wait((rotateTime * 2 + 0.01) * 1000);
                rotateReset(panelData[panels[i+1]]);
            }
        };
        this.rotates = (panels) => {
            let _ = this.rotatesAsync(panels).then(() => { return 0; });
        };

        this.changeRotateTime(rotateTime);

    }
}
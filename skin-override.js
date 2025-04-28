// ==UserScript==
// @name         Vape For Miniblox - Skin Override
// @namespace    http://7granddadpgn.github.io, he557
// @version      2025-04-13
// @description  Modify skins in Miniblox
// @author       7GrandDad, Emmaa
// @match        https://miniblox.io/*
// @match        https://miniblox.org/*
// @match        https://miniblox.online/*
// @match        https://bloxbattles.io/*
// @icon         https://miniblox.io/favicon.png
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @require      https://raw.githubusercontent.com/username/repository-name/main/skin-override.js
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const originalSkinUrl = "https://miniblox.io/textures/entity/skins/zane.png";  // 普通のスキン
    const overrideSkinUrl = "https://miniblox.io/textures/entity/skins/tester.png";  // 権限が必要なスキン

    function overrideSkin() {
        const skins = unsafeWindow.skins || {};  // スキンのデータ
        console.log("Current skins:", skins);  // ログを追加してスキンデータを確認

        // 既存のスキンURLがあれば変更
        for (let skinId in skins) {
            if (skins[skinId].id === 'zane') {
                console.log(`Replacing Zane skin with Tester skin...`); // 変更ログ
                skins[skinId].id = 'tester';  // ZaneスキンをTesterスキンに変更
                skins[skinId].name = "Tester";  // 名前も変更（任意）
                break;
            }
        }

        // スキンを適用
        if (unsafeWindow.setPlayerSkin) {
            console.log("Applying skin:", overrideSkinUrl); // スキン適用のログ
            unsafeWindow.setPlayerSkin(overrideSkinUrl);  // プレイヤーにスキンを適用
        } else {
            console.error("setPlayerSkin function is not found!");
        }
    }

    // DOMContentLoaded イベントでスキンの変更を試みる
    document.addEventListener('DOMContentLoaded', overrideSkin, false);
})();

// ==UserScript==
// @name         KillAura Only Inject
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Inject KillAura only into miniblox.io
// @author       your_name
// @match        https://miniblox.io/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const moduleSettings = {
        killaura: true
    };

    const injectCode = `
        const moduleSettings = { killaura: true };
        const originalUpdate = Player.prototype.update;
        Player.prototype.update = function () {
            if (moduleSettings.killaura && this.isLocalPlayer) {
                const enemies = world.players.filter(p => p.team !== this.team && !p.isDead);
                let target = enemies.find(p => this.getDistance(p) < 4);
                if (target) {
                    this.attack(target);
                }
            }
            originalUpdate.call(this);
        };
    `;

    const observer = new MutationObserver(() => {
        const scripts = [...document.querySelectorAll("script")];
        const targetScript = scripts.find(s => s.src.includes("bundle") && !s.dataset.injected);
        if (targetScript) {
            targetScript.dataset.injected = "true";
            fetch(targetScript.src)
                .then(res => res.text())
                .then(code => {
                    const script = document.createElement("script");
                    script.textContent = code + "\n" + injectCode;
                    document.body.appendChild(script);
                });
        }
    });

    observer.observe(document, { childList: true, subtree: true });
})();

(function () {
    $(function () {
        setTimeout(function () {
            $("#adv").trigger('click');
            return setTimeout(function () {
                return $("#adv").trigger('click');
            }, 1200);
        }, 1200);
        $('[data-click-toggle]').on("click", function () {
            var target;
            target = $(this).attr("data-target");
            return $(`.${target}`).toggleClass($(this).attr("data-click-toggle"));
        });
        return $('[data-trigger-event]').on("click", function () {
            var trigger;
            trigger = $(this).attr("data-trigger-event");
            // console.log(trigger);
            if (trigger === 'resetCheckboxes') {
                console.log("Resetting checkboxes...");
                return $('input[type=checkbox]').each(function () {
                    return $(this).prop('checked', false);
                });
            }
        });
    });

    document.addEventListener('DOMContentLoaded', async () => {
        const tabs = await (window.browser ? browser.tabs.query({ active: true, currentWindow: true }) : new Promise(resolve => chrome.tabs.query({ active: true, currentWindow: true }, resolve)));
        const domain = new URL(tabs[0].url).hostname.replace(/^www\./, '');
        const globalCheckbox = document.getElementById('enableHumor'); // Global enable
        const domainCheckbox = document.getElementById('enableDomain'); // Domain enable

        const syncUI = async () => {
            const { enabledGlobally, enabledForDomains, blockedCount = 0 } = await chrome.storage.local.get(['enabledGlobally', 'enabledForDomains', 'blockedCount']);
            globalCheckbox.checked = enabledGlobally !== false;
            domainCheckbox.checked = enabledForDomains?.[domain] !== false;
            document.getElementById('blockedCount').innerHTML = blockedCount;
        };


        // Refresh counter every 2 seconds while popup is open
        setInterval(syncUI, 2000);

        globalCheckbox.addEventListener('change', async () => {
            await chrome.storage.local.set({ enabledGlobally: globalCheckbox.checked });
            syncUI();
        });

        domainCheckbox.addEventListener('change', async () => {
            const { enabledForDomains = {} } = await chrome.storage.local.get('enabledForDomains');
            enabledForDomains[domain] = domainCheckbox.checked;
            await chrome.storage.local.set({ enabledForDomains });
            syncUI();
        });

        syncUI();
    });

}).call(this);
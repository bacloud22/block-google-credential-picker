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

}).call(this);

document.addEventListener('DOMContentLoaded', async () => {
    const domain = new URL((await browser.tabs.query({ active: true, currentWindow: true }))[0].url).hostname.replace(/^www\./, '');

    const globalCheckbox = document.getElementById('enableHumor'); // Global enable
    const domainCheckbox = document.getElementById('enableEmpathy'); // Domain enable
    const countDisplay = document.createElement('div');
    countDisplay.style.marginTop = '10px';
    domainCheckbox.parentElement.appendChild(countDisplay);

    const syncUI = async () => {
        const { enabledGlobally, enabledForDomains, blockedCount = 0 } = await browser.storage.local.get(['enabledGlobally', 'enabledForDomains', 'blockedCount']);
        globalCheckbox.checked = enabledGlobally !== false;
        domainCheckbox.checked = enabledForDomains?.[domain] !== false;
        countDisplay.textContent = `Blocked popups: ${blockedCount}`;
    };

    globalCheckbox.addEventListener('change', async () => {
        await browser.storage.local.set({ enabledGlobally: globalCheckbox.checked });
        syncUI();
    });

    domainCheckbox.addEventListener('change', async () => {
        const { enabledForDomains = {} } = await browser.storage.local.get('enabledForDomains');
        enabledForDomains[domain] = domainCheckbox.checked;
        await browser.storage.local.set({ enabledForDomains });
        syncUI();
    });

    syncUI();
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxDQUFBLENBQUUsUUFBQSxDQUFBLENBQUE7SUFFQSxVQUFBLENBQVcsUUFBQSxDQUFBLENBQUE7TUFDVCxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsT0FBVixDQUFrQixPQUFsQjthQUNBLFVBQUEsQ0FBVyxRQUFBLENBQUEsQ0FBQTtlQUNULENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxPQUFWLENBQWtCLE9BQWxCO01BRFMsQ0FBWCxFQUVFLElBRkY7SUFGUyxDQUFYLEVBS0MsSUFMRDtJQU9BLENBQUEsQ0FBRSxxQkFBRixDQUF3QixDQUFDLEVBQXpCLENBQTRCLE9BQTVCLEVBQXFDLFFBQUEsQ0FBQSxDQUFBO0FBQ3ZDLFVBQUE7TUFBSSxNQUFBLEdBQVMsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBYSxhQUFiO2FBQ1QsQ0FBQSxDQUFFLENBQUEsQ0FBQSxDQUFBLENBQUksTUFBSixDQUFBLENBQUYsQ0FBZSxDQUFDLFdBQWhCLENBQTZCLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsbUJBQWIsQ0FBN0I7SUFGbUMsQ0FBckM7V0FLQSxDQUFBLENBQUUsc0JBQUYsQ0FBeUIsQ0FBQyxFQUExQixDQUE2QixPQUE3QixFQUFzQyxRQUFBLENBQUEsQ0FBQTtBQUN4QyxVQUFBO01BQUksT0FBQSxHQUFVLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsb0JBQWI7TUFDVixPQUFPLENBQUMsR0FBUixDQUFZLE9BQVo7TUFDQSxJQUFHLE9BQUEsS0FBVyxpQkFBZDtRQUNFLE9BQU8sQ0FBQyxHQUFSLENBQVkseUJBQVo7ZUFDQSxDQUFBLENBQUUsc0JBQUYsQ0FBeUIsQ0FBQyxJQUExQixDQUFnQyxRQUFBLENBQUEsQ0FBQTtpQkFDOUIsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBYSxTQUFiLEVBQXdCLEtBQXhCO1FBRDhCLENBQWhDLEVBRkY7O0lBSG9DLENBQXRDO0VBZEEsQ0FBRjtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiJCAtPlxuICBcbiAgc2V0VGltZW91dCgtPlxuICAgICQoXCIjYWR2XCIpLnRyaWdnZXIoJ2NsaWNrJylcbiAgICBzZXRUaW1lb3V0KC0+IFxuICAgICAgJChcIiNhZHZcIikudHJpZ2dlcignY2xpY2snKVxuICAgICwgMTIwMClcbiAgLDEyMDApXG4gIFxuICAkKCdbZGF0YS1jbGljay10b2dnbGVdJykub24gXCJjbGlja1wiLCAoKSAtPlxuICAgIHRhcmdldCA9ICQodGhpcykuYXR0cihcImRhdGEtdGFyZ2V0XCIpXG4gICAgJChcIi4je3RhcmdldH1cIikudG9nZ2xlQ2xhc3MoICQodGhpcykuYXR0cihcImRhdGEtY2xpY2stdG9nZ2xlXCIpIClcblxuXG4gICQoJ1tkYXRhLXRyaWdnZXItZXZlbnRdJykub24gXCJjbGlja1wiLCAoKSAtPlxuICAgIHRyaWdnZXIgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXRyaWdnZXItZXZlbnRcIilcbiAgICBjb25zb2xlLmxvZyB0cmlnZ2VyXG4gICAgaWYgdHJpZ2dlciBpcyAncmVzZXRDaGVja2JveGVzJ1xuICAgICAgY29uc29sZS5sb2cgXCJSZXNldHRpbmcgY2hlY2tib3hlcy4uLlwiXG4gICAgICAkKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpLmVhY2goIC0+XG4gICAgICAgICQodGhpcykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKVxuICAgICAgKVxuICAiXX0=
//# sourceURL=coffeescript
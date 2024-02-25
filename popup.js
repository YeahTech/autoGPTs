document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle');

    // 定义一个函数来更新滑块的样式
    function updateSliderStyle(slider_id, isEnabled) {
        const slider = document.getElementById(slider_id);
        if(isEnabled) {
            slider.style.transform = 'translateX(1rem)'; // 滑块移动距离，根据需要调整
            slider.style.backgroundColor = 'green'; // 滑块为选中状态时的颜色
        } else {
            slider.style.transform = 'translateX(0)'; // 回到原位
            slider.style.backgroundColor = 'gray'; // 滑块为非选中状态时的颜色
        }
    }

    // 从存储中获取当前状态并更新开关位置
    chrome.storage.local.get('autoAllowEnabled', (data) => {
        toggle.checked = !!data.autoAllowEnabled;
        updateSliderStyle('slider1', toggle.checked);
    });

    // 监听开关变化
    toggle.addEventListener('change', () => {
        const isEnabled = toggle.checked;
        // 更新存储中的状态
        chrome.storage.local.set({autoAllowEnabled: isEnabled}, () => {
            console.log(`Auto Allow is now ${isEnabled ? 'enabled' : 'disabled'}.`);
        });

        updateSliderStyle('slider1', toggle.checked);
    });


    const toggle_nextstep = document.getElementById('toggle_nextstep');

    // 从存储中获取当前状态并更新开关位置
    chrome.storage.local.get('autoNextEnabled', (data) => {
        toggle_nextstep.checked = !!data.autoNextEnabled;
        updateSliderStyle('slider2', toggle_nextstep.checked);
    });

    // 监听开关变化
    toggle_nextstep.addEventListener('change', () => {
        const isEnabled = toggle_nextstep.checked;
        // 更新存储中的状态
        chrome.storage.local.set({autoNextEnabled: isEnabled}, () => {
            console.log(`Auto Next is now ${isEnabled ? 'enabled' : 'disabled'}.`);
        });

        updateSliderStyle('slider2',isEnabled);
    });
});

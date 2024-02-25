// 获取当前所有会话
function extractConversationMessages(containerSelector) {
    const conversations = document.querySelectorAll(containerSelector);
    const result = [];

    conversations.forEach(conversation => {
        const authorElement = conversation.querySelector('div.font-semibold');
        const messageElement = conversation.querySelector('div.text-message > div');
        const author = authorElement ? authorElement.textContent.trim() : 'Unknown';
        const message = messageElement ? messageElement.textContent.trim() : 'No message';
        result.push({ author, message });
    });

    return result;
}



function extractConversationTextAndAuthor() {
    // 获取所有对话元素
    const conversationTurns = document.querySelectorAll('.message-container');

    const conversationDataList = [];

    // 遍历对话元素并提取文本内容和作者信息
    conversationTurns.forEach(turn => {
        const authorRoleElement = turn.querySelector('[data-message-author-role]'); // 获取作者角色元素
        const textElement = turn.querySelector('.text-message'); // 获取文本内容元素

        if (authorRoleElement && textElement) {
            const authorRole = authorRoleElement.getAttribute('data-message-author-role'); // 获取作者角色
            const author = (authorRole === 'user') ? 'User' : 'ChatGPT'; // 根据角色设置作者名称
            const text = textElement.textContent.trim(); // 获取文本内容并去除首尾空白
            console.log(text)
            const conversationData = {
                author: author,
                text: text
            };

            conversationDataList.push(conversationData);
        }
    });

    return conversationDataList;
}

setInterval(function() {
    if (window.location.href.includes('chat.openai.com')) {
        console.log('enter loop');

        // autoAllow
        chrome.storage.local.get('autoAllowEnabled', function(data) {
            if (data && data.autoAllowEnabled !== undefined && data.autoAllowEnabled) {
                // 如果启用，则每2秒检查一次按钮
                // console.log('autoAllowEnabled');
                // 然后查找所有匹配的按钮
                const buttons = document.querySelectorAll('button.btn.relative.btn-primary.h-8');
                Array.from(buttons).forEach(function(button) {
                    // 对于每个按钮，检查它的文本是否为'Allow'
                    if (button.innerText.trim() === 'Allow') {
                        button.click();
                        console.log('Button Allow clicked automatically');
                    }
                });
            } else {
                console.log('Auto allow is not enabled.');
            }
        });

        // autoNext
        chrome.storage.local.get('autoNextEnabled', function(data) {
            if (data && data.autoNextEnabled !== undefined && data.autoNextEnabled) {

                // 调用函数并传入对话容器的选择器
                const conversationData = extractConversationMessages('div[data-testid^="conversation-turn"]');
                const lastConversation = conversationData[conversationData.length - 1];
                console.log(lastConversation);
                // 检查作者是否为 "ChatGPT"
                if (lastConversation.author === "ChatGPT") {
                    // 检查内容是否包含指定的字符串
                    const message = lastConversation.message;
                    if (message.includes("任务已完成") || message.includes("当前无任务")) {
                        console.log("退出 autoNext");
                        return;
                    }
                }


                const send_buttons = document.querySelectorAll('button[data-testid="send-button"]');
                send_buttons.forEach(button => {
                    if (button.disabled) {
                        console.log('send按钮处于禁用状态');

                        // 输入“下一步”
                        // 定位<textarea>元素
                        var textarea = document.getElementById("prompt-textarea");

                        // 检查元素是否存在
                        if (textarea) {
                            // 向<textarea>中输入文字“下一步”
                            textarea.value = "执行下一步。若任务已结束,请回复：任务已完成；若当前没有执行任务，请回复：当前无任务";
                            // 创建并派发一个'input'事件
                            var event = new Event('input', {
                                bubbles: true,
                                cancelable: true,
                            });

                            // 触发事件
                            textarea.dispatchEvent(event);
                        } else {
                            // 如果没有找到元素，可以在控制台输出一条消息
                            console.log("无法找到<textarea>元素。");
                        }                        

                    } else {
                        console.log('send按钮处于启用状态');
                        // send
                        button.click();
                        console.log('Button Send clicked automatically');
                    }
                });

            } else {
                console.log('Auto Next is not enabled.');
            }
        });

    } else {
        // console.log('URL does not contain "openai", or button with "Allow" text not found');
    }
}, 3000); // 2000毫秒 = 2秒
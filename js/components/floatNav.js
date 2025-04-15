class FloatNav {
    constructor() {
        this.createNavElement();
        this.initializeEventListeners();
    }

    createNavElement() {
        const nav = document.createElement('div');
        nav.className = 'float-nav';
        nav.innerHTML = `
            <button class="float-nav-toggle">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="14" width="28" height="4" fill="white"/>
                    <rect x="14" y="30" width="20" height="4" fill="white"/>
                </svg>
            </button>
            <div class="float-nav-menu">
                <div class="float-nav-item" data-theme="writing">
                    <i class="fas fa-pen-fancy"></i>
                    <span>写作助手</span>
                </div>
                <div class="float-nav-item" data-theme="creative">
                    <i class="fas fa-lightbulb"></i>
                    <span>创意激发</span>
                </div>
                <div class="float-nav-item" data-theme="learning">
                    <i class="fas fa-book-reader"></i>
                    <span>学习助手</span>
                </div>
                <div class="float-nav-item" data-theme="social">
                    <i class="fas fa-users"></i>
                    <span>社交建议</span>
                </div>
            </div>
        `;

        document.body.appendChild(nav);

        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .float-nav {
                position: fixed;
                top: 20px;
                left: 20px;
                z-index: 1000;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            }

            .float-nav-toggle {
                width: 48px;
                height: 48px;
                border: none;
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.25);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }

            .float-nav-toggle:hover {
                background: rgba(255, 255, 255, 0.25);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .float-nav-menu {
                position: absolute;
                top: 54px;
                left: 0;
                background: rgba(255, 255, 255, 0.15);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border-radius: 12px;
                padding: 12px;
                width: 220px;
                opacity: 0;
                transform: translateY(-10px) scale(0.95);
                visibility: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            }

            .float-nav.active .float-nav-menu {
                opacity: 1;
                transform: translateY(0) scale(1);
                visibility: visible;
            }

            .float-nav-item {
                display: flex;
                align-items: center;
                padding: 12px;
                color: #fff;
                cursor: pointer;
                border-radius: 10px;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                margin-bottom: 4px;
            }

            .float-nav-item:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateX(4px);
            }

            .float-nav-item i {
                margin-right: 12px;
                font-size: 16px;
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .float-nav-item:hover i {
                transform: scale(1.1);
            }

            .float-nav-item span {
                font-size: 14px;
            }
        `;
        document.head.appendChild(style);
    }

    initializeEventListeners() {
        const nav = document.querySelector('.float-nav');
        const toggle = nav.querySelector('.float-nav-toggle');
        const menuItems = nav.querySelectorAll('.float-nav-item');

        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const theme = item.dataset.theme;
                this.handleThemeSelection(theme);
            });
        });

        // 点击外部关闭菜单
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target)) {
                nav.classList.remove('active');
            }
        });
    }

    handleThemeSelection(theme) {
        // 根据主题切换不同的功能
        const themeMessages = {
            writing: ["写一篇关于春天的散文", "帮我修改一下这封邮件", "给我一些写作灵感"],
            creative: ["设计一个新的游戏概念", "帮我想一个创意广告", "给我一些创新的想法"],
            learning: ["复习高等数学知识", "准备英语面试", "学习编程基础"],
            social: ["如何改善人际关系", "写一个商务邀请", "处理工作冲突"]
        };

        const messages = themeMessages[theme] || [];
        const container = document.getElementById('messageContainer');
        
        // 清除现有消息
        container.innerHTML = '';
        
        // 添加新消息
        messages.forEach((text, index) => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.textContent = text;
            messageElement.style.fontSize = `${Math.random() * 8 + 16}px`;
            messageElement.style.top = `${Math.random() * (container.clientHeight - 100)}px`;
            messageElement.style.animationDuration = `${Math.random() * 5 + 15}s`;
            messageElement.style.animationDelay = `${index * 2}s`;
            
            container.appendChild(messageElement);
        });
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Создание кнопки чата
    const chatButton = document.createElement('button');
    chatButton.id = 'chatButton';
    chatButton.className = 'fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 z-50 hover:scale-110 hover:shadow-xl';
    chatButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    `;
    
    // Создание модального окна
    const chatModal = document.createElement('div');
    chatModal.id = 'chatModal';
    chatModal.className = 'fixed bottom-24 right-6 bg-white rounded-2xl shadow-2xl p-6 w-80 z-50 hidden transform transition-all duration-300 scale-95 opacity-0';
    chatModal.innerHTML = `
        <div class="flex items-center mb-4 pb-3 border-b border-gray-200">
            <div class="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-white shadow-md">
                <img src="favicon-32x32.png" alt="Психолог" class="w-full h-full object-cover">
            </div>
            <div>
                <h3 class="font-bold text-gray-800">Психологический центр</h3>
                <p class="text-xs text-gray-500">Обычно отвечает в течение часа</p>
            </div>
            <button class="close-chat-modal ml-auto text-gray-400 hover:text-gray-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        
        <div class="mb-4">
            <div class="flex items-start mb-3">
                <div class="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center text-white mr-2 flex-shrink-0">
                    <!-- Силуэт девушки (маленький) -->
                    <img src="favicon-32x32.png" alt="Психолог" class="w-full h-full object-cover">
                </div>
                <div class="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2">
                    <p class="text-gray-800 text-sm">Привет! 👋 Как мы можем вам помочь? Рады ответить на все ваши вопросы!</p>
                </div>
            </div>
        </div>
        
        <div class="flex flex-col gap-3">
            <a 
                href="https://t.me/Center777coaching" 
                target="_blank"
                class="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl text-center text-sm font-medium transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
            >
                <!-- Иконка Telegram -->
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="mr-2">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.820 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Написать в Telegram
            </a>
            
            <a 
                href="https://wa.me/491788079318" 
                target="_blank"
                class="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl text-center text-sm font-medium transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
            >
                <!-- Иконка WhatsApp -->
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="mr-2">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Написать в WhatsApp
            </a>
        </div>
    `;
    
    // Добавление элементов в DOM
    document.body.appendChild(chatButton);
    document.body.appendChild(chatModal);
    
    // Функция переключения видимости чата
    function toggleChat() {
        const modal = document.getElementById('chatModal');
        const button = document.getElementById('chatButton');
        
        if (modal.classList.contains('hidden')) {
            // Открытие
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.remove('scale-95', 'opacity-0');
                modal.classList.add('scale-100', 'opacity-100');
            }, 10);
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            `;
        } else {
            // Закрытие
            modal.classList.remove('scale-100', 'opacity-100');
            modal.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
            setTimeout(() => {
                button.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                `;
            }, 300);
        }
    }
    
    // Делаем функцию доступной глобально
    window.toggleChat = toggleChat;
    
    // Добавляем обработчики событий
    chatButton.addEventListener('click', toggleChat);
    chatModal.querySelector('.close-chat-modal').addEventListener('click', toggleChat);
    
    // Закрытие модального окна при клике вне его
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('chatModal');
        const button = document.getElementById('chatButton');
        
        if (modal && button && 
            !modal.contains(event.target) && 
            event.target !== modal && 
            event.target !== button) {
            if (!modal.classList.contains('hidden') && !modal.classList.contains('opacity-0')) {
                toggleChat();
            }
        }
    });
});
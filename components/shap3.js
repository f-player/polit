export function Shap3() {
    const html = `
        <ul class="text1">
            <li><a href='' class="head-text1"><b>КАЛЕНДАРЬ</b></a></li>
            <li><a href='' class="head-text1"><b>основных международных политических и экономических событий на 2025 год</b></a></li>
        </ul>

        <div class="search-container">
            <input type="text" id="search" placeholder="Поиск месяца..." />
            <button id="search-button">Поиск</button>
        </div>
    `;

    function initializeShap3Search() {
        console.log("[Shap3 Init] Инициализация поиска...");
    
        const searchInput = document.getElementById('search');
        const searchButton = document.getElementById('search-button');
    
        console.log('Элемент поля поиска:', searchInput);
        console.log('Элемент кнопки поиска:', searchButton);
    
        if (!searchInput || !searchButton) {
            console.error("[Shap3 Init] Не найдены элементы поиска (input или button).");
            return;
        }
    
        fetch('http://localhost:8000/api/events')
            .then(response => response.json())
            .then(events2025 => {
                console.log("[Shap3 Init] Данные от сервера:", events2025);
    
                let eventsData = events2025;
    
                searchButton.addEventListener('click', () => {
                    console.log("[Search Click] Кнопка поиска нажата.");
                    const searchTermRaw = searchInput.value;
                    const searchTerm = searchTermRaw.trim().toLowerCase();
    
                    console.log(`[Search Click] Ищем: "${searchTerm}"`);
    
                    if (!searchTerm) {
                        console.log("[Search Click] Поле поиска пустое.");
                        searchInput.focus();
                        return;
                    }
    
                    const monthNames = {
                        'январь': ['января', 'январе', 'январю', 'январём', 'январе'],
                        'февраль': ['февраля', 'феврале', 'февралю', 'февралём', 'феврале'],
                        'март': ['марта', 'марте', 'марту', 'мартом', 'марте'],
                        'апрель': ['апреля', 'апреле', 'апрелю', 'апрелем', 'апреле'],
                        'май': ['мая', 'мае', 'маю', 'маем', 'мае'],
                        'июнь': ['июня', 'июне', 'июню', 'июнем', 'июне'],
                        'июль': ['июля', 'июле', 'июлю', 'июлем', 'июле'],
                        'август': ['августа', 'августе', 'августу', 'августом', 'августе'],
                        'сентябрь': ['сентября', 'сентябре', 'сентябрю', 'сентябрем', 'сентябре'],
                        'октябрь': ['октября', 'октябре', 'октябрю', 'октябрем', 'октябре'],
                        'ноябрь': ['ноября', 'ноябре', 'ноябрю', 'ноябрем', 'ноябре'],
                        'декабрь': ['декабря', 'декабре', 'декабрю', 'декабрем', 'декабре']
                    };
    
                    let foundMonth = null;
                    for (const month in monthNames) {
                        if (month.startsWith(searchTerm) || monthNames[month].some(form => form.startsWith(searchTerm))) {
                            foundMonth = month;
                            break;
                        }
                    }
    
                    if (foundMonth) {
                        const foundDate = eventsData.find(date => date.date.toLowerCase().includes(foundMonth) || monthNames[foundMonth].some(form => date.date.toLowerCase().includes(form)));
                        console.log("[Search Click] Результат поиска:", foundDate);
    
                        if (foundDate) {
                            console.log(`[Search Click] Найдено совпадение для "${searchTerm}"!`);
                            const eventsTable = document.getElementById('events-table');
                            if (eventsTable) {
                                const rows = eventsTable.rows;

                                for (let i = 1; i < rows.length; i++) {
                                    const dateCell = rows[i].cells[1];
                                    console.log(`[Search Click] Проверяем строку ${i}: "${dateCell.textContent.toLowerCase()}"`);

                                    if (dateCell.textContent.toLowerCase().includes(foundMonth) || monthNames[foundMonth].some(form => dateCell.textContent.toLowerCase().includes(form))) {
                                        rows[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        console.log("[Search Click] Прокрутка к элементу выполнена.");
                                        rows[i].style.background = 'rgba(172, 142, 88, 0.5)';
                                        setTimeout(() => {
                                            rows[i].style.background = '';
                                        }, 2000);
                                        break;
                                    }
                                }
                            }
                        } else {
                            alert(`Месяц "${searchInput.value}" не найден в календаре событий.`);
                            console.log(`[Search Click] Месяц "${searchTerm}" не найден.`);
                        }
                    } else {
                        alert(`Месяц "${searchInput.value}" не найден.`);
                        console.log(`[Search Click] Месяц "${searchTerm}" не найден.`);
                    }
                });
    
                searchInput.addEventListener('keypress', function (e) {
                    if (e.key === 'Enter') {
                        searchButton.click();
                    }
                });
    
                console.log("[Shap3 Init] Обработчики поиска установлены.");
            })
            .catch(error => console.error('Error fetching events:', error));
    }
    

    return {
        html: html,
        init: initializeShap3Search
    };
}

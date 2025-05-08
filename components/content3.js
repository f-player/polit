export function Content3() {
    let html = `
        <div class='bod'>
           <div class="text">
            <li><a href = '#section1' class = 'menu'>Календарь основных исторических, религиозных и памятных дат на 2025 год</a></li>
            <li><a href = '#section2' class = 'menu'>Календарь юбилейных дат установления дипломатических отношений в 2025 году</a></li>
        </div>

        <div class="text1">
            <table border="1" id="events-table">
                <!-- сюда будут вставлены данные -->
            </table>

            <section id="section1">
                <p class="table-title"><b>КАЛЕНДАРЬ</b></p>
                <p class="table-title"><b>основных исторических, религиозных и памятных дат на 2025 год</b></p>
                <div class="text1"> 
                <table border="1" id="memorable-dates-table">
                    <!-- сюда будут вставлены данные -->
                </table>
                </div>
            </section>

            <section id="section2">
                <p class="table-title"><b>КАЛЕНДАРЬ</b></p>
                <p class="table-title"><b>юбилейных дат установления дипломатических отношений в 2025 году</b></p>
                <div class="text2">
                    <table border="1" id="diplomatic-anniversaries-table">
                        <!-- сюда будут вставлены данные -->
                    </table>
                </div>
            </section>
            
        </div>
        </div>
    `;

    

    function generateEventsTable(events) {
        console.log('Generating events table:', events);
        let tableHtml = '<table border="1">';
        tableHtml += '<tr><th>Порядок обновления записей</th><th>Даты</th><th>Событие</th><th>Место проведения</th><th>Категория</th><th></th></tr>';
        events.forEach(event => {
            tableHtml += `
                <tr>
                    <td>${event.id}</td>
                    <td data-date="${event.date}">${formatDate(event.date)}</td>
                    <td>${event.event}</td>
                    <td>${event.location}</td>
                    <td>${event.category}</td>
                    <td><button class="delete-button" data-id="${event.id}">Удалить</button></td>
                </tr>
            `;
        });
       
        tableHtml += '</table>';
        return tableHtml;
    }
    
    
    function generateMemorableDatesTable(memorableDates) {
        console.log('Generating memorable dates table:', memorableDates);
        let tableHtml = '<table border="1" class="text1">';
        tableHtml += '<tr><th>Даты</th><th>Памятное событие</th><th>Категория</th></tr>';
        memorableDates.forEach(date => {
            tableHtml += `
                <tr>
                    <td>${date.date}</td>
                    <td>${date.event}</td>
                    <td>${date.category}</td>
                </tr>
            `;
        });
        return tableHtml + '</table>';
    }
    
    function generateDiplomaticAnniversariesTable(diplomaticAnniversaries) {
        console.log('Generating diplomatic anniversaries table:', diplomaticAnniversaries);
        let tableHtml = '<table border="1" class="text2">';
        tableHtml += '<tr><th>Даты</th><th>Страна - Юбилей</th></tr>';
        diplomaticAnniversaries.forEach(anniversary => {
            tableHtml += `
                <tr>
                    <td>${anniversary.date}</td>
                    <td>${anniversary.country} - ${anniversary.anniversary}</td>
                </tr>
            `;
        });
        return tableHtml + '</table>';
    }

    function formatDate(date) {
        if (!date) return '';
        const dateParts = date.split('-');
        if (dateParts.length === 3 && !isNaN(Date.parse(date))) {
            const year = dateParts[0];
            const month = dateParts[1];
            const day = dateParts[2];
            const dateObj = new Date(year, month - 1, day);
            const dayOfMonth = dateObj.getDate();
            const monthName = dateObj.toLocaleString('ru-RU', { month: 'long' });
            return `${dayOfMonth} ${monthName}`;
        } else {
            return date;
        }
    }
    
    

    function initializeComponentScripts() {
        console.log("Initializing Content3 scripts...");
       


        // сделать запросы к серверу за данными
        fetch('http://localhost:8000/api/events')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                return response.json();
            }
        })


        
        .then(events => {
            const eventsTable = document.getElementById('events-table');
            const addButton = document.createElement('button');
            addButton.id = 'add-new-event-button';
            addButton.textContent = 'Добавить новое событие';
            eventsTable.parentNode.insertBefore(addButton, eventsTable);
       
            
      
            



            eventsTable.innerHTML = generateEventsTable(events);

            eventsTable.addEventListener('click', (event) => {
                if (event.target.classList.contains('delete-button')) {
                    const id = parseInt(event.target.getAttribute('data-id'));
                    const row = event.target.closest('tr');
                    fetch(`http://localhost:8000/api/events/${id}`, { method: 'DELETE' })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            } else {
                                return response.json();
                            }
                        })
                        .then(() => {
                            row.remove();
                        })
                        .catch(error => console.error('Ошибка удаления события:', error));
                }
            });


           
            
            // добавляем обработчик события для кнопки добавления нового события
            document.getElementById('add-new-event-button').addEventListener('click', (event) => {
                if (event.target.id !== 'add-new-event-button') return;
                const dateInput = prompt('Введите дату:');
                const dateParts = dateInput.split(' ');
                const day = dateParts[0];
                const month = getMonthNumber(dateParts[1]);
                const year = new Date().getFullYear(); 
                const date = `${year}-${padZero(month)}-${padZero(day)}`;
            
                const newEvent = prompt('Введите событие:');
                const location = prompt('Введите место проведения:');
                const category = prompt('Введите категорию:');
            
                console.log('Date:', date);
                console.log('Event:', newEvent);
                console.log('Location:', location);
                console.log('Category:', category);
            
                fetch('http://localhost:8000/api/events', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ date, event:newEvent, location, category }),
                })
                .then(response => {
                    console.log('Response status:', response.status);
                    console.log('Response headers:', response.headers);
                    if (!response.ok) {
                        return response.text(); 
                    } else {
                        return response.json();
                    }
                })
                .then((data) => {
                    console.log('Response data:', data);
                    if (typeof data === 'string') {
                        console.error('Error adding new event:', data);
                    } else {
                        const newRow = document.createElement('tr');
                        console.log('data.id:', data.id);
                        newRow.innerHTML = `
                            <td>${parseInt(data.id)}</td>
                            <td data-date="${data.date}">${formatDate(data.date)}</td>
                            <td>${data.event}</td>
                            <td>${data.location}</td>
                            <td>${data.category}</td>
                            <td><button class="delete-button" data-id="${parseInt(data.id)}">Удалить</button></td>
                        `;
                        eventsTable.appendChild(newRow);
                    }
                })
                
                
                .catch(error => console.error('Error adding new event:', error));
            });
            
            function getMonthNumber(monthName) {
                const months = {
                    'января': 1,
                    'февраля': 2,
                    'марта': 3,
                    'апреля': 4,
                    'мая': 5,
                    'июня': 6,
                    'июля': 7,
                    'августа': 8,
                    'сентября': 9,
                    'октября': 10,
                    'ноября': 11,
                    'декабря': 12
                };
                return months[monthName.toLowerCase()];
            }
            
            
            function padZero(num) {
                return num.toString().padStart(2, '0');
            }

        })
        .catch(error => console.error('Error fetching events:', error));



        fetch('http://localhost:8000/api/memorable-dates')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .then(memorableDates => {
                const memorableDatesTable = document.getElementById('memorable-dates-table');
                memorableDatesTable.innerHTML = generateMemorableDatesTable(memorableDates);
            })
            .catch(error => console.error('Error fetching memorable dates:', error));

        fetch('http://localhost:8000/api/diplomatic-anniversaries')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    return response.json();
                }
            })
            .then(diplomaticAnniversaries => {
                const diplomaticAnniversariesTable = document.getElementById('diplomatic-anniversaries-table');
                diplomaticAnniversariesTable.innerHTML = generateDiplomaticAnniversariesTable(diplomaticAnniversaries);
            })
            .catch(error => console.error('Error fetching diplomatic anniversaries:', error));

        const menuLinks = document.querySelectorAll('.text .menu'); 

        if (menuLinks.length === 0) {
             console.warn("Content3: Didn't find any links with selector '.text .menu'");
        } else {
            console.log(`Content3: Found ${menuLinks.length} menu links.`);
        }

        menuLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    console.log("Content3: Scrolling to:", targetId);
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else {
                     console.warn("Content3: Target element not found:", targetId);
                }
            });
        });
    }

    return {
        html: html,
        init: initializeComponentScripts
    };

}

const eventList = document.getElementById('event-list');
const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('category-select');
const levelSelect = document.getElementById('level-select');
const resetButton = document.getElementById('btn-reset');
const registrationForm = document.getElementById('registration-form');
const eventSelect = document.getElementById('event-select');
const registrationList = document.getElementById('registration-list');
const registrationCount = document.getElementById('registration-count');
const clearAllButton = document.getElementById('btn-clear-all');

function createCategoryOptions() {
    if (!categorySelect) return;
    const categories = [...new Set(eventsData.map(item => item.category))];
    categorySelect.innerHTML = '<option value="">Tất cả danh mục</option>' + categories.map(category => `
        <option value="${category}">${category}</option>
    `).join('');
}

function createLevelOptions() {
    if (!levelSelect) return;
    const levels = [...new Set(eventsData.map(item => item.level))];
    levelSelect.innerHTML = '<option value="">Tất cả cấp độ</option>' + levels.map(level => `
        <option value="${level}">${level}</option>
    `).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function renderEvents(data) {
    if (!eventList) return;

    if (!data.length) {
        eventList.innerHTML = '<div class="col-12"><div class="alert alert-warning text-center">Không tìm thấy sự kiện phù hợp.</div></div>';
        return;
    }

    eventList.innerHTML = data.map(item => `
        <div class="col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm">
                <div class="card-img-placeholder" style="background-image: url('${item.image}');" aria-label="${item.title}"></div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${item.title}</h5>
                    <div class="mb-3 d-flex flex-wrap gap-2">
                        <span class="badge bg-primary badge-custom">${item.category}</span>
                        <span class="badge bg-secondary badge-custom">${item.level}</span>
                    </div>
                    <p class="card-text flex-grow-1">${item.description}</p>
                    <p class="text-secondary small mb-3">Thời gian: ${formatDate(item.date)}</p>
                    <div class="mt-auto d-grid gap-2">
                        <button type="button" class="btn btn-outline-secondary btn-sm btn-detail" data-id="${item.id}">Xem chi tiết</button>
                        <a href="register.html?id=${item.id}" class="btn btn-primary btn-sm">Đăng ký</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    attachDetailButtons();
}

function attachDetailButtons() {
    document.querySelectorAll('.btn-detail').forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'), 10);
            const item = eventsData.find(event => event.id === id);
            if (!item) return;
            const modalTitle = document.getElementById('detailsModalLabel');
            const modalBody = document.getElementById('detailsModalBody');
            if (modalTitle) modalTitle.textContent = item.title;
            if (modalBody) {
                modalBody.innerHTML = `
                    <div class="mb-3 text-center">
                        <img src="${item.image}" alt="${item.title}" class="img-fluid rounded shadow-sm" style="max-height: 320px; width: 100%; object-fit: cover;">
                    </div>
                    <p><strong>Danh mục:</strong> ${item.category}</p>
                    <p><strong>Cấp độ:</strong> ${item.level}</p>
                    <p><strong>Thời gian:</strong> ${formatDate(item.date)}</p>
                    <p>${item.detail}</p>
                `;
            }
            const modalRegisterLink = document.getElementById('modalRegisterLink');
            if (modalRegisterLink) {
                modalRegisterLink.href = `register.html?id=${item.id}`;
            }
            const modalElement = document.getElementById('eventDetailsModal');
            if (modalElement) {
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            }
        });
    });
}

function filterEvents() {
    let filtered = eventsData;
    const searchValue = searchInput?.value.trim().toLowerCase() || '';
    const categoryValue = categorySelect?.value || '';
    const levelValue = levelSelect?.value || '';

    if (searchValue) {
        filtered = filtered.filter(item => item.title.toLowerCase().includes(searchValue) || item.description.toLowerCase().includes(searchValue));
    }

    if (categoryValue) {
        filtered = filtered.filter(item => item.category === categoryValue);
    }

    if (levelValue) {
        filtered = filtered.filter(item => item.level === levelValue);
    }

    renderEvents(filtered);
}

function populateEventSelect() {
    if (!eventSelect) return;
    eventSelect.innerHTML = '<option value="">-- Chọn một sự kiện --</option>' + eventsData.map(item => `
        <option value="${item.id}">${item.title} (${item.category})</option>
    `).join('');

    const params = new URLSearchParams(window.location.search);
    const selectedId = params.get('id');
    if (selectedId) {
        eventSelect.value = selectedId;
    }
}

function showFieldError(inputId, message) {
    const errorField = document.getElementById(`${inputId}-error`);
    if (errorField) {
        errorField.textContent = message;
    }
}

function clearFormErrors() {
    ['event', 'fullname', 'class-name', 'email', 'phone'].forEach(id => showFieldError(id, ''));
}

function validateRegistrationForm() {
    clearFormErrors();
    let valid = true;

    if (!eventSelect || !eventSelect.value) {
        showFieldError('event', 'Vui lòng chọn một sự kiện.');
        valid = false;
    }

    const fullname = document.getElementById('fullname')?.value.trim();
    if (!fullname) {
        showFieldError('fullname', 'Vui lòng nhập họ và tên.');
        valid = false;
    } else if (fullname.length < 3) {
        showFieldError('fullname', 'Họ và tên phải có ít nhất 3 ký tự.');
        valid = false;
    }

    const className = document.getElementById('class-name')?.value.trim();
    if (!className) {
        showFieldError('class-name', 'Vui lòng nhập lớp.');
        valid = false;
    }

    const email = document.getElementById('email')?.value.trim();
    if (!email) {
        showFieldError('email', 'Vui lòng nhập email.');
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFieldError('email', 'Vui lòng nhập email đúng định dạng.');
        valid = false;
    }

    const phoneRaw = document.getElementById('phone')?.value.trim();
    const phone = phoneRaw?.replace(/\D/g, '');
    if (!phone) {
        showFieldError('phone', 'Vui lòng nhập số điện thoại.');
        valid = false;
    } else if (!/^[0-9]{9,11}$/.test(phone)) {
        showFieldError('phone', 'Số điện thoại chỉ gồm 9 đến 11 chữ số.');
        valid = false;
    }

    return valid;
}

function getRegistrations() {
    try {
        return JSON.parse(localStorage.getItem('registrations') || '[]');
    } catch {
        return [];
    }
}

function saveRegistrations(registrations) {
    localStorage.setItem('registrations', JSON.stringify(registrations));
}

function addRegistration(event) {
    event.preventDefault();
    if (!registrationForm || !validateRegistrationForm()) return;

    const selectedEvent = eventsData.find(item => item.id === parseInt(eventSelect.value, 10));
    if (!selectedEvent) {
        showFieldError('event', 'Sự kiện không hợp lệ.');
        return;
    }

    const registration = {
        id: Date.now(),
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        fullname: document.getElementById('fullname')?.value.trim(),
        className: document.getElementById('class-name')?.value.trim(),
        email: document.getElementById('email')?.value.trim(),
        phone: document.getElementById('phone')?.value.trim(),
        notes: document.getElementById('notes')?.value.trim(),
        createdAt: new Date().toISOString()
    };

    const registrations = getRegistrations();
    registrations.push(registration);
    saveRegistrations(registrations);

    alert('Đăng ký thành công!');
    registrationForm.reset();
    eventSelect.value = '';
}

function renderRegistrationList() {
    if (!registrationList) return;
    const registrations = getRegistrations();

    const count = registrations.length;
    if (registrationCount) {
        registrationCount.textContent = `Tổng đăng ký: ${count}`;
    }
    if (clearAllButton) {
        clearAllButton.disabled = count === 0;
    }

    if (!count) {
        registrationList.innerHTML = '<tr><td colspan="9" class="text-center py-4">Chưa có sinh viên nào đăng ký.</td></tr>';
        return;
    }

    registrationList.innerHTML = registrations.map((item, index) => `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${item.fullname}</td>
            <td>${item.className || ''}</td>
            <td>${item.eventTitle}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
            <td>${item.notes || ''}</td>
            <td>${formatDate(item.createdAt)}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-danger btn-delete" data-id="${item.id}">Hủy</button>
            </td>
        </tr>
    `).join('');

    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', () => {
            const id = parseInt(button.getAttribute('data-id'), 10);
            const updated = getRegistrations().filter(item => item.id !== id);
            saveRegistrations(updated);
            renderRegistrationList();
        });
    });
}

function clearAllRegistrations() {
    if (!clearAllButton) return;
    clearAllButton.addEventListener('click', () => {
        if (!confirm('Bạn có chắc chắn muốn xóa toàn bộ đăng ký?')) return;
        saveRegistrations([]);
        renderRegistrationList();
    });
}

function initCoursesPage() {
    if (eventList) {
        createCategoryOptions();
        createLevelOptions();
        renderEvents(eventsData);
        searchInput?.addEventListener('input', filterEvents);
        categorySelect?.addEventListener('change', filterEvents);
        levelSelect?.addEventListener('change', filterEvents);
        resetButton?.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (categorySelect) categorySelect.value = '';
            if (levelSelect) levelSelect.value = '';
            renderEvents(eventsData);
        });
    }
}

function initRegistrationPage() {
    if (registrationForm) {
        populateEventSelect();
        registrationForm.addEventListener('submit', addRegistration);
    }
}

function initRegistrationsPage() {
    if (registrationList) {
        renderRegistrationList();
    }
    clearAllRegistrations();
}

initCoursesPage();
initRegistrationPage();
initRegistrationsPage();
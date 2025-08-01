function renderBooks(books) {
    const bookContainer = document.getElementById("bookContainer");
    const countEl = document.getElementById("count");
    bookContainer.innerHTML = '';
    let count = 0;

    books.forEach(book => {
        const li = document.createElement("li");
        li.textContent = `${book.id}: ${book.title}`;
        li.className = book.available ? "available" : "unavailable";
        bookContainer.appendChild(li);
        if (book.available) count++;
    });

    countEl.textContent = count;
}

function renderLogs(logs) {
    const logList = document.getElementById("logList");
    logList.innerHTML = '';
    logs.forEach(log => {
        const li = document.createElement("li");
        li.textContent = log;
        logList.appendChild(li);
    });
}

async function handleTransaction() {
    const bookId = document.getElementById("bookId").value;
    const action = document.getElementById("action").value;

    const response = await fetch("/transaction", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ book_id: bookId, action: action })
    });

    const result = await response.json();
    document.getElementById("result").textContent = result.message;

    if (result.success) {
        renderBooks(result.books);
        renderLogs(result.logs);
    }
}

window.onload = () => {
    renderBooks(JSON.parse('{{ books|tojson }}'));
    renderLogs(JSON.parse('{{ logs|tojson }}'));
};

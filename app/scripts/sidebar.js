const content = document.getElementById('content');

const changePage = (page) => pages.change(page);

const addSidebar = () => {
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');

    sidebar.innerHTML = `
    <div class="sidebar-items">
        <p onclick="changePage('index');" id="index-page-btn"><i class="fa-solid fa-house-chimney"></i></p>
        <p onclick="changePage('config');" id="config-page-btn"><i class="fa-solid fa-gear"></i></p>
    </div>
    `

    content.appendChild(sidebar);
    content.insertBefore(sidebar, content.firstChild);
}

const checkCurrentPage = () => {
    pages.current().then((page) => {
        let pageBtns = document.getElementsByClassName('sidebar-items')[0].children;
        let currentPageBtn = document.getElementById(page + '-page-btn');

        for (let i = 0; i < pageBtns.length; i++) {
            if (pageBtns[i] === currentPageBtn) {
                pageBtns[i].classList.add('active');
            } else {    
                pageBtns[i].classList.remove('active');
            }
        }
    });

    setTimeout(checkCurrentPage, 1000);
}

addSidebar();
checkCurrentPage();
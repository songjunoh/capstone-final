const pages = ['home', 'board', 'ai', 'code', 'chat', 'mypage'];

function showPage(name) {

  pages.forEach(p => {

    const pageEl = document.getElementById('page-' + p);

    if (pageEl) {
      pageEl.classList.toggle('active', p === name);
    }
  });

  document.querySelectorAll('.nav-link').forEach(el => {
    el.classList.remove('active');
  });

  const navEl = document.getElementById('nav-' + name);

  if (navEl) {
    navEl.classList.add('active');
  }

  if (name === 'mypage') {
    if (typeof switchMyPageTab === 'function') {
      switchMyPageTab('pdf', document.querySelector('#mypage-tabs .btab'));
    }
  }

  if (name === 'board') {
    hideDetail();
    renderBoard();
  }

  if (name === 'chat') {
    exitChatRoom();
    renderChatRoomList();
  }

  window.scrollTo(0, 0);
}
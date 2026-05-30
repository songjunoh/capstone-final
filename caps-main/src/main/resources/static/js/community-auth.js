const AUTH_API_URL = "http://localhost:8081/api/auth";

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

function updateAuthUI() {
  const navRight = document.querySelector(".nav-right");

  if (!currentUser) {
    navRight.innerHTML = `<button class="btn-outline" onclick="toggleDarkMode()" id="darkModeBtn">🌙 다크모드</button><button class="btn-login" onclick="openLogin()">로그인</button>`;
    return;
  }

  navRight.innerHTML = `
    <button
    class="btn-outline"
    onclick="toggleDarkMode()"
    id="darkModeBtn"
    style="
       padding:8px 14px;
       font-size:13px;
       margin-right:8px;
       "
       >🌙 다크모드
       </button>
    <button
    class="btn-outline"
    style="
      padding:8px 14px;
      font-size:13px;
      margin-right:8px;
    "
    onclick="showPage('mypage')"
  >
    👤 마이페이지
  </button>
    <span style="font-size:13px; color:var(--text2);">${escapeHtml(currentUser.name)}님</span>
    <button class="btn-login" onclick="logout()">로그아웃</button>
  `;
}

function showLoginForm() {
  document.getElementById("auth-desc").textContent = "로그인하세요";
  document.getElementById("login-form").style.display = "flex";
  document.getElementById("register-form").style.display = "none";

  document.getElementById("login-id").value = "";
  document.getElementById("login-password").value = "";
}

function showRegisterForm() {
  document.getElementById("auth-desc").textContent = "회원가입하세요";
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "flex";

  document.getElementById("register-login-id").value = "";
  document.getElementById("register-name").value = "";
  document.getElementById("register-email").value = "";
  document.getElementById("register-password").value = "";
}

function openLogin() {
  showLoginForm();
  document.getElementById('loginModal').classList.add('open');
}

const loginModal = document.getElementById('loginModal');

if (loginModal) {
  loginModal.addEventListener('click', e => {
    if (e.target === loginModal) {
      loginModal.classList.remove('open');
    }
  });
}

async function doRegister() {
  const loginId = document.getElementById("register-login-id").value.trim();
  const name = document.getElementById("register-name").value.trim();
  const email = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();

  if (!loginId || !name || !email || !password) {
    showToast("아이디, 이름, 이메일, 비밀번호를 모두 입력해주세요.", "⚠️");
    return;
  }

  try {
    const response = await fetch(`${AUTH_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        loginId: loginId,
        name: name,
        email: email,
        password: password
      })
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    showToast("회원가입이 완료되었습니다. 로그인해주세요.", "✅");
    showLoginForm();

  } catch (error) {
    console.error(error);
    showToast(error.message || "회원가입 실패", "❌");
  }
}

async function doLogin() {
  const loginId = document.getElementById("login-id").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!loginId || !password) {
    showToast("아이디와 비밀번호를 입력해주세요.", "⚠️");
    return;
  }

  try {
    const response = await fetch(`${AUTH_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        loginId: loginId,
        password: password
      })
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }

    const user = await response.json();

    currentUser = {
      id: user.userId,
      email: user.email,
      name: user.name
    };

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    document.getElementById('loginModal').classList.remove('open');

    updateAuthUI();
    await loadChatRooms();
    showToast(`${currentUser.name}님 로그인되었습니다.`, "🎉");

  } catch (error) {
    console.error(error);
    showToast(error.message || "로그인 실패", "❌");
  }
}

function logout() {

  currentUser = null;
  localStorage.removeItem("currentUser");

  // 로그아웃 시 PDF/메모/문제/피드백 기록 삭제
  Object.keys(localStorage).forEach(key => {
    if (
        key.startsWith("codemind_notes_") ||
        key.startsWith("codemind_recent_quiz_questions_") ||
        key.startsWith("codemind_pdf_") ||
        key.startsWith("codemind_summary_") ||
        key.startsWith("codemind_feedback_") ||
        key.startsWith("codemind_wrong_")
    ) {
      localStorage.removeItem(key);
    }
  });

  chatRooms = [];
  currentRoomId = null;
  currentChannelId = null;
  currentDmTargetId = null;
  currentDmTargetName = null;
  currentChatType = "channel";

  document.getElementById('chat-room-view').style.display = 'none';
  document.getElementById('chat-list-view').style.display = 'block';

  //오답노트 화면 즉시 초기화
  if (typeof window.getAppNotes === "function") {
    window.getAppNotes().length = 0;
  }

  const notesGrid = document.getElementById("notesGrid");
  if (notesGrid) {
    notesGrid.innerHTML = `
    <div class="empty-state">
       <div class="empty-icon">NOTE</div>
       <h3>아직 저장된 오답이 없습니다</h3>
       <p>로그인 후 AI 예상문제를 풀면 오답노트가 저장됩니다.</p>
    </div>
  `;
  }

  updateAuthUI();
  loadChatRooms();

  showToast("로그아웃되었습니다.", "👋");
}

window.getCurrentUser = function () {
  return JSON.parse(localStorage.getItem("currentUser") || "null");
};

window.getCurrentUserId = function () {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  return user && user.id ? String(user.id) : "";
};
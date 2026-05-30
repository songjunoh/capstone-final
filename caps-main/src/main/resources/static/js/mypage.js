function switchMyPageTab(tabId, element) {
  const tabs = document.querySelectorAll('#mypage-tabs .btab');
  tabs.forEach(tab => tab.classList.remove('active'));

  if (element) {
    element.classList.add('active');
  } else {
    const targetTab = Array.from(tabs).find(tab => tab.getAttribute('onclick')?.includes(`'${tabId}'`));
    if (targetTab) targetTab.classList.add('active');
  }

  const sections = document.querySelectorAll('.mypage-section');
  sections.forEach(sec => sec.style.display = 'none');
  
  const targetSection = document.getElementById(`mypage-content-${tabId}`);
  if (targetSection) {
    targetSection.style.display = 'block';
  }

  renderMyPageMockData(tabId);
}

function renderMyPageMockData(tabId) {

  if (typeof currentUser === 'undefined') {
    window.currentUser = { id: 1, name: "테스트 유저" };
  }
  if (typeof posts === 'undefined') {
    window.posts = [];
  }

  if (tabId === 'pdf') {
    const pdfList = document.getElementById('mypage-pdf-list');
    pdfList.innerHTML = `
      <div class="note-card" style="--ncolor: var(--accent);">
        <div class="note-meta">
          <span class="note-subject" style="background:rgba(99,179,237,0.1); color:var(--accent);">운영체제</span>
          <span class="note-date">2026.05.28</span>
        </div>
        <div class="note-title">CPU 스케줄링 및 데드락 챕터 요약</div>
        <div class="note-q" style="background:var(--bg); border:1px solid var(--border);">
          핵심 키워드: 프로세스, 선점형 스케줄링, 교착상태 4가지 조건...
        </div>
        <button class="btn-secondary" style="margin-top:14px; width:100%;">요약본 다시 보기</button>
      </div>
      <div class="note-card" style="--ncolor: var(--accent);">
        <div class="note-meta">
          <span class="note-subject" style="background:rgba(99,179,237,0.1); color:var(--accent);">프로젝트 기획</span>
          <span class="note-date">2026.05.20</span>
        </div>
        <div class="note-title">지역 관광 활성화 캐시백 정책 자료</div>
        <div class="note-q" style="background:var(--bg); border:1px solid var(--border);">
          핵심 키워드: 방문자 통계, 인센티브 구조, 문제 정의...
        </div>
        <button class="btn-secondary" style="margin-top:14px; width:100%;">요약본 다시 보기</button>
      </div>
    `;
  } 
  else if (tabId === 'quiz') {
    const quizList = document.getElementById('mypage-quiz-list');
    quizList.innerHTML = `
      <div class="note-card" style="--ncolor: var(--accent3);">
        <div class="note-meta">
          <span class="note-subject" style="background:rgba(246,173,85,0.1); color:var(--accent3);">알고리즘</span>
          <span class="note-date">2026.05.25</span>
        </div>
        <div class="note-title">트리 탐색 서술형 3문제 세트</div>
        <div class="note-q" style="background:var(--bg); border:1px solid var(--border);">
          생성 난이도: 어려움 (Hard)<br>맞춘 문제: 2 / 3
        </div>
        <button class="btn-secondary" style="margin-top:14px; width:100%;">결과 리포트 보기</button>
      </div>
    `;
  }

  else if (tabId === 'feedback') {
    loadMyFeedbackLogs();
  }

  else if (tabId === 'posts') {

    const postList =
      document.getElementById(
        'mypage-post-list'
      );

    const myPosts = posts.filter(
      p => {

        return Number(p.authorId)
          === Number(currentUser.id);
      }
    );

    postList.innerHTML =
      myPosts.length > 0
        ? myPosts.map(p => `
            <div
              onclick="
                showPage('board');
                viewPostDetail(${p.id});
              "
              style="
                background:#1e293b;
                border:1px solid #334155;
                border-radius:12px;
                padding:18px;
                margin-bottom:14px;
                cursor:pointer;
                transition:0.2s;
              "
            >

              <div style="
                font-size:18px;
                font-weight:700;
                color:white;
                margin-bottom:10px;
              ">
                ${p.title}
              </div>

              <div style="
                display:flex;
                gap:14px;
                font-size:13px;
                color:#94a3b8;
              ">
                <span>
                  📅 ${p.date || '-'}
                </span>

                <span>
                  👁️ ${p.views ?? 0}
                </span>

                <span>
                  👍 ${p.likes ?? 0}
                </span>
              </div>

            </div>
          `).join('')
        : `
          <div style="
            text-align:center;
            padding:40px;
            color:#94a3b8;
          ">
            작성한 게시글이 없습니다.
          </div>
        `;
  }
  else if (tabId === 'comments') {

    const commentList =
      document.getElementById(
        'mypage-comment-list'
      );

    const myComments = [];

    posts.forEach(post => {

      (post.comments || []).forEach(c => {

        if (
          Number(c.authorId) ===
          Number(currentUser.id)
        ) {

          myComments.push({
            postId: post.id,
            postTitle: post.title,
            comment: c.text,
            date: c.date
          });
        }
      });
    });

    commentList.innerHTML =
      myComments.length
        ? myComments.map(c => `
            <div
              class="post-item"
              onclick="
                showPage('board');
                viewPostDetail(${c.postId});
              "
            >

              <div class="post-main">

                <div style="
                  font-size:13px;
                  color:var(--text2);
                  margin-bottom:6px;
                ">
                  게시글:
                  ${c.postTitle}
                </div>

                <div class="post-title"
                  style="
                    font-weight:500;
                    font-size:15px;
                  ">
                  ${c.comment}
                </div>

                <div class="post-info">
                  <span>
                    📅 ${c.date}
                  </span>
                </div>

              </div>

            </div>
          `).join('')
        : `
          <div style="
            text-align:center;
            padding:40px;
            color:var(--text3);
          ">
            작성한 댓글이 없습니다.
          </div>
        `;
  }
}

async function loadMyFeedbackLogs() {
  const feedbackList = document.getElementById('mypage-feedback-list');
  if (!feedbackList) return;

  const user = JSON.parse(localStorage.getItem("currentUser") || "null");

  if (!user || !user.id) {
    feedbackList.innerHTML = `
      <div style="text-align:center; padding:40px; color:var(--text3);">
         로그인 후 AI 피드백 기록을 확인할 수 있습니다.
         </div>
      `;
    return;
  }

  try {
    const response = await fetch("api/pdf/reverse-log", {
      headers: {
        "X-User-Id": String(user.id)
      }
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const logs = await response.json();

    if (!Array.isArray(logs) || logs.length === 0) {
      feedbackList.innerHTML = `
        <div style="text-align:center; padding:40px; color:var(--text3);">
           저장된 AI 피드백 기록이 없습니다.
        </div>
     `;
      return;
    }

    feedbackList.innerHTML = logs.map(log => `
       <div class="note-card" style="--ncolor: var(--accent5);">
           <div class="note-meta">
             <span class="note-subject" style="background:rgba(183,148,244,0.12); color:var(--accent5);">
               AI 피드백
             </span>
             <span class="note-date">${formatMyPageDate(log.createdAt)}</span>
           </div>
           
           <div class="note-title">AI 설명 평가 기록</div>
           
           <div class="note-q" style="background:var(--bg); border:1px solid var(--border);">
             <strong>질문</strong><br>
             ${escapeMyPageHtml(log.reverseQuestion || '')}
            </div>
            
            <div class="not-correct">
             AI 피드백:<br>
             ${escapeMyPageHtml(log.aiFeedback || '').replace(/\n/g, '<br>')}
            </div>
           </div>
           `).join('');
  } catch (error) {
    console.error(error);
    feedbackList.innerHTML = `
    <div style="text-align:center; padding:40px; color:var(--accent4);">
     AI 피드백 기록을 불러오지 못했습니다.
    </div>
   `;
  }
}

function formatMyPageDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString();
}

function escapeMyPageHtml(value) {
  return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
}

document.addEventListener('DOMContentLoaded', () => {
  renderMyPageMockData('pdf');
});

document.addEventListener('click', e => {
  const mypageBtn = e.target.closest('[onclick*="mypage"]');
  if (mypageBtn) {
    const firstTab = document.querySelector('#mypage-tabs .btab:nth-child(1)');
    switchMyPageTab('pdf', firstTab); 
  }
});
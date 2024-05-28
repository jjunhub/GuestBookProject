document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:8080/posts')
        .then(response => response.json())
        .then(data => {
            console.log('Success: ', data.result);
            const dataList = document.getElementById('data-list');
            data.result.forEach(item => {
                const listItem = createDataItem(item);
                dataList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error('Error: ', error);
            const dataList = document.getElementById('data-list');
            if (dataList) {
                dataList.remove();
            }
        });
});

document.getElementById('upload-btn').addEventListener('click', function () {
    const title = document.getElementById('input-title').value;
    const content = document.getElementById('input-content').value;

    fetch('http://localhost:8080/posts', {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({
            title, content
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success: ', data);
            location.reload();
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
});

function createDataItem(data) {
    const item = document.createElement('div');
    item.className = 'data-item';
    item.setAttribute('data-post-id', data.postId); // postId를 data-item에 할당

    // HTML 구조에 좋아요 버튼 추가
    item.innerHTML = `
<div class="data-item-container">
    <div class="data-item-header">
        <h4 class="data-item-title">${data.title}</h4>
        <button class="like-button" aria-label="Like this post">
            ${data.likes} 👍
        </button>
    </div>
    <p>${data.content}</p>
</div>`;

    // 좋아요 버튼에 이벤트 리스너 추가
    const likeButton = item.querySelector('.like-button');
    likeButton.addEventListener('click', function(event) {
        event.stopPropagation(); // 상위 요소로의 이벤트 전파 방지
        const postId = item.getAttribute('data-post-id');
        fetch(`http://localhost:8080/posts/${postId}/likes`, {
            method: 'PUT'
        })
            .then(response => response.json())
            .then(updatedData => {
                // 이전 값에다가 +1을 해서 업데이트
                likeButton.textContent = `${data.likes + 1} 👍`;
                console.log('Like updated:', updatedData);
                likeButton.disabled = true;
            })
            .catch(error => {
                console.error('Error updating likes:', error);
            });
    });

    return item;
}

const dataList = document.getElementById('data-list');
dataList.addEventListener('click', function (event) {
    if (event.target.className.includes('data-item-title')) {
        const postId = event.target.closest('.data-item').getAttribute('data-post-id'); // postId 추출
        fetch(`http://localhost:8080/posts/${postId}`) // 상세 정보를 가져오는 GET 요청
            .then(response => response.json())
            .then(data => {
                updateModal(data); // 모달 업데이트 함수 호®출
                document.getElementById('modal-dim').style.display = 'block'; // 모달 표시
            })
            .catch(error => {
                console.error('Error fetching post details:', error);
            });
    }
});

const modal = document.getElementById("modal-dim");

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

function updateModal(data) {
    const modal = document.getElementById('modal-dim');
    modal.querySelector('.header').textContent = data.title; // 제목 설정
    modal.querySelector('.timestamp').textContent = data.createdAt; // 생성 시간 설정

    // 'Like' 버튼 이벤트 리스너 추가
    const likeButton = modal.querySelector('.like-button');
    likeButton.onclick = () => {
        console.log('Like button clicked!'); // 테스트를 위한 콘솔 로그
        fetch(`http://localhost:8080/posts/${data.postId}/likes`, {
            method: 'PUT'
        })
            .then(response => response.json())
            .then(updatedData => {
                console.log('Like updated:', updatedData);
                likeButton.textContent = `${data.likes + 1} 👍`; // 좋아요 수 업데이트
                likeButton.disabled = true; // 버튼 비활성화
            })
            .catch(error => {
                console.error('Error updating likes:', error);
            });
    };

    // 'Cancel' 버튼 이벤트 리스너 추가
    const cancelButton = modal.querySelector('.cancel-button');
    cancelButton.onclick = () => {
        modal.style.display = 'none'; // 모달 닫기
    };
}
document.querySelector('.search-btn').addEventListener('click', function () {
    const searchInput = document.getElementById('searchField').value; // 올바른 ID를 사용
    fetch(`http://localhost:8080/posts?keyword=${encodeURIComponent(searchInput)}`)
        .then(response => response.json())
        .then(data => {
            console.log('Search results:', data.result);
            const dataList = document.getElementById('data-list');
            dataList.innerHTML = ''; // 기존 데이터 초기화

            data.result.forEach(item => {
                const listItem = createDataItem(item);
                dataList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error searching posts:', error);
        });
});

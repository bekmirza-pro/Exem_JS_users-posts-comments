const makeElament = (selector, parent = document) => parent.querySelector(selector);
const createDOM = (element) => document.createElement(element);


const elUserList = makeElament('.user_list');
const elPostsList = makeElament('.posts_list');
const elCommentsList = makeElament('.comments_list');

const elUserTemplate = makeElament('.user_template').content;
const elPostsTemplate = makeElament('.posts_template').content;
const elCommentsTemplate = makeElament('.comments_template').content;


//==================> Render Users  <=========================

function renderUsers(UsersArr, element) {
    element.innerHTML = null;
    const fragment = document.createDocumentFragment();

    UsersArr.forEach(user => {

        const UserTemplate = elUserTemplate.cloneNode(true);
        makeElament('.id', UserTemplate).textContent = user.id;
        makeElament('.name', UserTemplate).textContent = user.name;
        makeElament('.user_name', UserTemplate).textContent = user.username;
        makeElament('.email', UserTemplate).textContent = user.email;
        makeElament('.address', UserTemplate).textContent = user.address.street + ',  ' + user.address.suite + ',  ' +
            user.address.city + ',  ' + user.address.zipcode;
        makeElament('.link', UserTemplate).setAttribute('href', 'https://www.google.com/maps/place/' + user.address.geo.lat + ',' + user.address.geo.lng);
        makeElament('.phone', UserTemplate).textContent = user.phone;
        makeElament('.website', UserTemplate).textContent = user.website;
        makeElament('.company_name', UserTemplate).textContent = user.company.name;
        makeElament('.company_catchPhrase', UserTemplate).textContent = user.company.catchPhrase;
        makeElament('.company_bs', UserTemplate).textContent = user.company.bs;

        const elUsersItem = makeElament('.users-item', UserTemplate);
        elUsersItem.dataset.user_id = user.id;

        elUsersItem.addEventListener('click', (evt) => {
            const userId = evt.target.dataset.user_id;

            async function fetchPosts() {

                const respons = await fetch('https://jsonplaceholder.typicode.com/posts');

                const data = await respons.json();
                const PostsArr = data;

                if (PostsArr.length) {
                    renderPosts(PostsArr, elPostsList);
                }

                const foundPost = PostsArr.filter(post => post.userId == userId);
                renderPosts(foundPost, elPostsList);

            };
            fetchPosts();
        })
        fragment.appendChild(UserTemplate);
    });
    element.appendChild(fragment);
};


async function fetchUsers() {

    const respons = await fetch('https://jsonplaceholder.typicode.com/users');

    const data = await respons.json();
    const UsersArr = data;

    if (UsersArr.length) {
        renderUsers(UsersArr, elUserList);
    }
};
fetchUsers();



//==================> Render Posts  <======================

function renderPosts(PostsArr, element) {
    element.innerHTML = null;
    const fragment = document.createDocumentFragment();

    PostsArr.forEach(post => {

        const PostsTemplate = elPostsTemplate.cloneNode(true);

        makeElament('.userId', PostsTemplate).textContent = post.userId;
        makeElament('.Id', PostsTemplate).textContent = post.id;
        makeElament('.title', PostsTemplate).textContent = post.title;
        makeElament('.body', PostsTemplate).textContent = post.body;

        const elPostsItem = makeElament('.posts_item', PostsTemplate);
        elPostsItem.dataset.post_id = post.id;

        elPostsItem.addEventListener('click', (evt) => {
            const postId = evt.target.dataset.post_id;


            async function fetchComments() {

                const respons = await fetch('https://jsonplaceholder.typicode.com/comments');

                const data = await respons.json();
                const CommentsArr = data;

                if (CommentsArr.length) {
                    renderComments(CommentsArr, elCommentsList)
                }

                const foundComment = CommentsArr.filter(comment => comment.postId == postId);
                renderComments(foundComment, elCommentsList);
            };
            fetchComments();
        })
        fragment.appendChild(PostsTemplate);
    });
    element.appendChild(fragment);
}


async function fetchPosts() {

    const respons = await fetch('https://jsonplaceholder.typicode.com/posts');

    const data = await respons.json();
    const PostsArr = data;

    if (PostsArr.length) {
        renderPosts(PostsArr, elPostsList);
    }
};
fetchPosts();


//============================> Render Comments <======================


function renderComments(CommentsArr, element) {
    element.innerHTML = null;
    const fragment = document.createDocumentFragment();

    CommentsArr.forEach(comment => {

        const CmmentsTemplate = elCommentsTemplate.cloneNode(true);

        makeElament('.postId', CmmentsTemplate).textContent = comment.postId;
        makeElament('.Ids', CmmentsTemplate).textContent = comment.id;
        makeElament('.name_comments', CmmentsTemplate).textContent = comment.name;
        makeElament('.email_comments', CmmentsTemplate).textContent = comment.email;
        makeElament('.body_comments', CmmentsTemplate).textContent = comment.body;

        fragment.appendChild(CmmentsTemplate);
    });
    element.appendChild(fragment);
}


async function fetchComments() {

    const respons = await fetch('https://jsonplaceholder.typicode.com/comments');

    const data = await respons.json();
    const CommentsArr = data;

    if (CommentsArr.length) {
        renderComments(CommentsArr, elCommentsList)
    }
};

fetchComments();



//==================> Mashq qo `shimcha ball uchun 😅😅 <=====================


const numbersArr = [1, 1, 2, 2, 7, 7, 4, 9, 9, 10, 11, 11, 11, 11, 11];

function numbers(arr) {
    let maxNumber = arr[0];

    for (let i = 0; i < arr.length; i++)
        if (arr[i] > maxNumber)
            maxNumber = arr[i];

    return arr.indexOf(maxNumber);
}

console.log(numbers(numbersArr));
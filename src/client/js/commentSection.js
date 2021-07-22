const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll(".video__comments span");

// const Btn = form.querySelector("button");
//★
const addComment = (text, newCommentId) => {
    const videoComments = document.querySelector(".video__comments ul");
    const commentBox = document.createElement("li");
    const newComment = document.createElement("span")
    const deleteIcon = document.createElement("span")

    deleteIcon.innerText = "★"
    newComment.innerText = text;
    commentBox.classList.add("video__comment");
    deleteIcon.dataset.id = newCommentId;
    commentBox.appendChild(newComment);
    commentBox.appendChild(deleteIcon);
    videoComments.prepend(commentBox);
    
    deleteIcon.addEventListener('click', handleDeltecomment);
}

const handleSubmit= async(event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const {id} = videoContainer.dataset;
    const text = textarea.value;
    if(text === ""){
        return;
    }
    const response = await fetch(`/api/videos/${id}/comment`,{
        method: "POST",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify({
            text: text,
            rating: "5",
        })
    });
    if(response.status === 201) {
        const {newCommentId} = await response.json()
        //make fake comment
        addComment(text, newCommentId);
    }
    textarea.value = "";
}
const handleDeltecomment = async(event) => {
    const commentId = event.target.dataset.id
    const ok = await fetch(`/api/videos/${commentId}/deleteComment`,{
        method: "POST",
      //not use beacause of cookie is automatically goging   
    })
    if(ok !== 200){
        console.log('not deleting');
    }
    console.log(event.path);

    
}
if(form){
    form.addEventListener('submit',handleSubmit);
}
deleteBtn.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', handleDeltecomment);

})

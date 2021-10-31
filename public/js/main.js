window.addEventListener('DOMContentLoaded', (e) => {
    const wrapper = document.querySelector('.columns');
    getItems('/assets/data/index.json').then((res) => {
        res.data.items.map((v,i) => wrapper.innerHTML += buildItem(v));
    });
});

backHistory = () => {
    window.history.go(-1);
}


buildItem = (data) => {
    let template =
    `<div class="column is-2">
        <div class="card">
            <div class="card-content">
                <div class="content">
                <img src="${data.poster}"/>
                ${data.name}
                <a class="button is-light" href="/open/${data.file}?name=${data.name}">Ver</a>
                </div>
            </div>
        </div>
    </div>`;
    return template;
}

getItems = async (endpoint) => {
    try {
        let response = await fetch(endpoint)
        if (!response.ok) // or check for response.status
            throw new Error(response.statusText);
        let body = await response.json(); // or .json() or whatever
        return body;
        // process body
    } catch (err) {
        console.log(err)
    }
}

generateFrame = (url) => {
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", "https://fembed.com/v/"+url);
    ifrm.setAttribute("frameborder",0);
    ifrm.style.width = "100%";
    ifrm.style.height = "100%";
    document.querySelector('#player').appendChild(ifrm);
}

generateVideo = (id) => {
   /* var video = document.createElement("video");
    video.setAttribute("src", "/api/v/"+id);
    video.setAttribute("controls",true);
    video.setAttribute("preload",true);
    document.querySelector('#player').appendChild(video);*/
    window.location.href(location.hostname+'/api/v/'+id);
}


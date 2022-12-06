Array.prototype.shuffle = function () {
    let a = this;
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

async function load() {
    var n = 0;
    let BotList = await fetch(`/api/bots/list`);
    BotList = await BotList.json()
    Botlist = BotList.shuffle();;
    //let topvoted = BotList.filter(bot => bot.vote > 0);;
    //BotList = BotList.sort((a, b) => b.vote - a.vote);;

    $('#loading').css("display", "none");

    let selection = BotList.slice(n, n + 10);
    loadMore(selection);

    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
            n += 10;
            loadMore(BotList.slice(n, n + 10));
        }
    });
};

function loadMore(res) {
    res.forEach(function (bot) {
        if (bot.state == "unverified") return;
        if (bot.cert && bot.vanityURL) {
            let html = `
        <div class="card">
            <img src="${bot.logo}" class="icon">
            <br>
            <span class="badge"><i class="fas fa-badge-check"></i> Certified Bot</span>
            <h2 class="title">
                ${bot.username}
                <a class="certlikes" href="/bots/like/${bot.vanityURL}">
                    <i class="far fa-heart"></i>${bot.vote || 0}   
                </a>            
            </h2>
            <p class="botdesc">${bot.description}</p>
            <a href="/bots/${bot.vanityURL}" class="small button">View bot info</a>
        </div>`
        document.getElementById('cards').insertAdjacentHTML("beforeend", html)
        } else if (bot.cert && !bot.vanityURL) {
            let html = `
            <div class="card">
                <img src="${bot.logo}" class="icon">
                <br>
                <span class="badge"><i class="fas fa-badge-check"></i> Certified Bot</span>
                <h2 class="title">
                    ${bot.username}
                    <a class="certlikes" href="/bots/like/${bot.botid}">
                        <i class="far fa-heart"></i>${bot.vote || 0}   
                    </a>            
                </h2>
                <p class="botdesc">${bot.description}</p>
                <a href="/bots/${bot.botid}" class="small button">View bot info</a>
            </div>`
            document.getElementById('cards').insertAdjacentHTML("beforeend", html)    
        }
        if(bot.cert) return;
        let html = `
        <div class="card">
            <img src="${bot.logo}" class="icon">
            <h2 class="title">
                ${bot.username}
                <a class="likes" href="/bots/like/${bot.botid}">
                    <i class="far fa-heart"></i>${bot.vote || 0}
                </a>
            </h2>
            <p class="desc">${bot.description}</p>
            <br>
            <br>
            <a href="/bots/${bot.botid}" class="small button">View bot info</a>
        </div>`

        document.getElementById('cards').insertAdjacentHTML("beforeend", html)
    })
}

function search() {
    if (document.getElementById('search').contentEditable === "false") return;
    let s = String(document.getElementById('search').innerHTML.toLowerCase()).replaceAll('<br>', "");
    let cards = document.getElementById('cards');
    cards.style.display = "none";
    if (document.getElementById('loading')) document.getElementById('loading').display = "block";
    if (cards) {
        let totalCards = 0;
        let cardsVisible = 0;

        let list = cards.children;
        for (var i = 1; i < list.length; i++) {
            totalCards++
            let card = list[i];
            let title = card.children[1].innerHTML.toLowerCase();
            let desc = card.children[2].innerHTML.toLowerCase();
            if (!title.includes(s) && !desc.includes(s)) card.style.display = "none";
            else {
                card.style.display = "inline-block";
                cardsVisible++;
            }
        }

        if (cardsVisible === 0) {
            document.getElementById('searchMore').innerHTML = `No bots found. Would you like to <a href="/bots/search/?q=${s}">search all bots</a>?`;
            document.getElementById('searchMore').style.display = "block";
        } else {
            document.getElementById('searchMore').innerHTML = `Would you like to <a href="/bots/search/?q=${s}">search all bots</a>`
            document.getElementById('searchMore').style.display = "block";
        }

        if (document.getElementById('search').innerHTML === "") {
            document.getElementById('searchMore').style.display = "none";
            for (var i = 1; i < list.length; i++) {
                let card = list[i];
                card.style.display = "inline-block";
            }
        }
    }
    if (document.getElementById('loading')) document.getElementById('loading').display = "none";
    cards.style.display = "block";
}
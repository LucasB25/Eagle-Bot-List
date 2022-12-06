Array.prototype.shuffle = function() {
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
  BotList = BotList.sort((a, b) => b.likes - a.likes);;

  $('#loading').css("display", "none");

  let selection = BotList.slice(n, n + 10);
  loadMore(selection);

  $(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
      n += 10;
      loadMore(BotList.slice(n, n + 10));
    }
  });
};

function loadMore(res) {
  res.forEach(function(bot) {
    if (bot.state == "unverified") return;

    let html = `
<div class="card botcard" style="transform: translate(0px, 0px); opacity: 1;">
<div class="card-body p-3 pb-2 botcard-hassplash" style="border-radius: 4px 4px 0px 0px; background: linear-gradient(rgba(48, 48, 48, 0.3) 50%, rgb(48, 48, 48) 98%), url(&quot;${bot.banner}&quot;);">
    <!--  -->
    <div class="row">
      <div class="col pr-0 imgcol">
        <div class="w-100 text-center">
          <img class="cardimg" draggable="false" loading="lazy" src="${bot.logo}" alt="Bot Avatar"/>
        </div>
      </div>
      <div class="col flexcen">
        <div class="w-100">
          <div class="botcount mb-2 text-damp text-bold" data-toggle="tooltip" data-placement="left" title="Votes This Month">
            <span class="float-left text-white h-100"><i class="fad fa-chevron-up pt-1 pb-1"></i></span>
            </span>${bot.likes || 0}
          </div>
          <div class="botcount text-damp text-bold" data-toggle="tooltip" data-placement="left" title="Server Count">
            <span class="float-left text-white h-100"><i class="fad fa-list pt-1 pb-1"></i></span>
            N/A
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card-body pt-0 pb-0">
    <h4 class="mb-0 text-center pt-1">${bot.username}</h4>
    <p class="mb-2 text-center text-muted botdesc">${bot.description}</p>
  </div>
  <hr class="mt-3 mb-1 bg-secondary" />
  <div class="card-body pt-0 pb-0 text-damp text-right bottags">
  </div>
  <hr class="mt-1 mb-3 bg-secondary" />
  <div class="card-body pt-0 botcard-btnholder">
      
    <a class="btn btn-sm btn-blue btn-block" href="/bots/${bot.botid}/">View Bot</a>
    <div class="btn-group btn-block">
      <a class="btn btn-sm btn-secondary" style="width:50%;" href="/bots/like/${bot.botid}/">Vote</a>
      <a class="btn btn-sm btn-secondary" style="border-left:1px solid #2B2B2B; width:50%;" href="https://discord.com/oauth2/authorize?client_id=${bot.botid}&amp;scope=bot&amp;permissions=0">Invite</a>
    </div>
      
    </div>
  </div>
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

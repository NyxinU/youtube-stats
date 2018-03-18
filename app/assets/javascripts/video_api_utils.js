let pathname = window.location.pathname.split('/')[2];


const fetchVideos = (q = '') => (
  $.ajax({
    method: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
      eventType: 'live',
      maxResults: '25',
      part: 'snippet',
      q: q,
      type: 'video',
      key: 'AIzaSyCjRlPajc732yUb3iefXTXZoh3GfMqDeb4',
    }
  })
).then(data => {
  
  data.items.forEach(item => {
    let {id, snippet} = item;
    let $div = $("<div>", {id: id.videoId});
    let $img = $("<img>", {src: snippet.thumbnails.medium.url, class: "video-thumbnail"});
    let $vidTitle = $("<p>", {class: "video-title"});
    let $channelTitle = $("<p>", {class: "channel-title"});
    let $status = $("<p>", { class: "video-status"});
    $img.add($vidTitle).click(() => {
      $(location).attr("href", `/video/${id.videoId}`);
    });
    $vidTitle.text(`${snippet.title}`);
    $channelTitle.text(`${snippet.channelTitle}`);
    $status.text("LIVE NOW");
    $div.append($img, $vidTitle, $channelTitle, $status);
    $("#videos-index-container").append($div);
  });
});

const fetchVideoDetails = () => (
  $.ajax({
    method: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/videos',
    data: {
      id: `${pathname}`,
      part: 'liveStreamingDetails, snippet',
      key: 'AIzaSyCjRlPajc732yUb3iefXTXZoh3GfMqDeb4'
    }
  }).then((data) => {
    let { liveStreamingDetails, snippet } = data.items[0];
    fetchLiveChatMessages(liveStreamingDetails.activeLiveChatId);
    $("#video-show-title").text(`${snippet.title}`);
    $("#video-show-concurrentViewers").text(`${liveStreamingDetails.concurrentViewers} watching now`);
    $("#video-show-channelTitle").text(`${snippet.channelTitle}`);
  })
);

const fetchVideo = () => {
  let src = `https://www.youtube.com/embed/${pathname}?autoplay=0`;

  $('<iframe>', {
      src:src,
      id:"ytplayer",
      type:"text/html",
      width:"640",
      height:"360",
      frameborder:"0"
  }).appendTo('#video-player');
};

const fetchLiveChatMessages = (id) => {
  $.ajax({
    method: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/liveChat/messages',
    data: {
      liveChatId: id,
      part: 'id, snippet, authorDetails',
      maxResults: 200,      
      key: 'AIzaSyCjRlPajc732yUb3iefXTXZoh3GfMqDeb4'
    }
  }).then((messages) => {
    messages.items.forEach(message => {
      createLiveChatMessage(message);
      appendMessage(message);
    });
    setTimeout(fetchLiveChatMessages(id), 1000);
  });
};

// const fetchLiveChatMessagesFromDB = (id) => {
//   $.ajax({
//     method: 'GET',
//     url: '/messages',
//     data: { liveChatId: id}
//   });
// };

const createLiveChatMessage = ( message ) => {
  $.ajax({
    method: 'POST',
    url: '/messages',
    data: { message:{
      uid: message.id,
      author: message.authorDetails.displayName,
      live_chat_id: message.snippet.liveChatId,
      display_message: message.snippet.displayMessage,
      published_at: message.snippet.publishedAt
    }}
  });
};

const appendMessage = (message) => {
  if($('#' + message.id).length === 0){
    let $author = $("<label>", {for: message.id});
    let $message = $("<li>", { id: message.id });
    $author.text(`${message.authorDetails.displayName}`);
    $message.text(`${message.snippet.displayMessage}`);
    $("#chat").append($author, $message);
    updateScroll();
  }
};

let scrolled = false;
const updateScroll = () => {
  if (!scrolled) {
    let $chat = $("#chat");
    $chat.scrollTop = $chat.scrollHeight;
  }
};

$("#chat").on('scroll', () => {
  scrolled = true;
});

// EiEKGFVDU0o0Z2tWQzZOcnZJSTh1bXp0ZjBPdxIFL2xpdmU
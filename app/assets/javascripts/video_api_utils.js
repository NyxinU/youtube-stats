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
    let $vidTitle = $("<label>", {class: "video-title"});
    let $channelTitle = $("<label>", {class: "channel-title"});
    let $status = $("<label>", { class: "video-status"});
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
    console.log(data);
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
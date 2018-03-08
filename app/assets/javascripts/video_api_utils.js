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
    $vidTitle.text(`${snippet.title}`);
    $channelTitle.text(`${snippet.channelTitle}`);
    $status.text("LIVE NOW");
    $div.append($img, $vidTitle, $channelTitle, $status);
    $("#videos-container").append($div);
    // console.log($status);
  });
});

const fetchVideo = id => (
  $.ajax({
    method: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/videos',
    data: {
      id: `${id}`,
      part: 'liveStreamingDetails',
      key: 'AIzaSyCjRlPajc732yUb3iefXTXZoh3GfMqDeb4'
    }
  })
);
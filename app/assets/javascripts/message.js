$(function(){

  function autoupdate(){
  var message_id = $('.list').last().data('message-id');
  if(window.location.href.match(/\/groups\/\d+\/messages/)){
    if(fail)return false;
    $.ajax({
      url: location.href,
      type : 'GET',
      data : { message: {id: message_id} },
      dataType: 'json'
    })

    .done(function(last){
      var insertHTML = '';
      last.messages.forEach(function(message){
        insertHTML += buildHTML(message);
        $(".main-middle-content").append(insertHTML);
        $(".main-middle-content").animate({scrollTop:$(".main-middle-content")[0].scrollHeight}, "swing");
        return false;
      });
    })
    .fail(function(last){
      alert('自動更新に失敗しました');
      fail = true;
    });
  }
 }

  function buildHTML(message){
    if (message.image.url == null ){
      message.image.url = ''
    }
    var html =
    `<ul class = "list" data-message-id= "${message.id}">
      <li class = "list__name">
        <p>
          ${message.user_name}
        </p>
      </li>
      <li class = "list__time">
        <p>
          ${message.created_at}
        </p>
      </li>
      <li class = "list__message">
        <p class = "list__message__content">
          ${message.content}
        </p>
        <img src= "${message.image.url}"/, class = "list__message__image" >
      </li>
    </ul>`
    return html;
  }

fail = ""
  setInterval(autoupdate, 5000);

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-middle-content').append(html);
      $('#message_content').val('');
      $('#message_image').val('');
      $(".form_submit").prop('disabled', false);
      $(".main-middle-content").animate({scrollTop:$(".main-middle-content")[0].scrollHeight}, "swing");
    })
    .fail(function(){
      alert('メッセージの送信が失敗しました');
    })
    return false;
  });
});

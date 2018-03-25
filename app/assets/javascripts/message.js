$(function(){
  function buildHTML(message){
    if (message.image.url == null ){
      message.image.url = ''
    }
    var html =
    `<div class = "main-middle-content">
      <ul class = "list">
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
      </ul>
    </div>`
    return html;
  }
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
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-middle-content').append(html)
      $('#message-content').val('')
      $('#message-image.url').val('')
      $(".submit").prop("disabled", false)
      $(".main-middle-content").animate({scrollTop:$(".main-middle-content")[0].scrollHeight}, 500, "swing");
      alert('送信が完了しました')
    })
    .fail(function(){
      alert('失敗しました');
    })
  })
});

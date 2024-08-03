import { shotsContent } from "../duck/constant.js"

$(document).ready(function () {
  // Logic for opening navbar
  $('.hamburger').click(() => {
    $("nav").slideToggle("500");
  })

  // Logic for adding active css on nav links
  let prevActiveLink = null;
  $("nav li a").click((e) => {
    if((prevActiveLink)?.hasClass('active')) {
      $(prevActiveLink).removeClass('active');
    }

    prevActiveLink = $(e.target).parent();
    $(e.target).parent().addClass('active');


    if($(window).innerWidth() <= 768) {
      $('nav').slideToggle('500')
    }
  });

  // Logic to change tabs for commmposite reels
  $(".ap-reel-tab").each((index, tab) => {
    $(tab).click((e) => {
        e.preventDefault();
        $(".ap-reel-tab-item.active video").trigger('pause');
        // Update active tab
        $(".ap-reel-tab.active").removeClass('active');
        $(".ap-reel-tab").eq(index).addClass('active');
        // Update active tab item
        $(".ap-reel-tab-item.active").removeClass('active');
        $(".ap-reel-tab-item").eq(index).addClass('active');
    });
  });

  // Logic for opening shots modal
  $('.compositing-shots li figure').click((e) => {
    const imgSrc = $(e.target).find('img').attr('src');
    const elemIndex = $(e.target).parent().index();

    let liHtml = '';
    shotsContent[elemIndex].desc.forEach(elem => {
      liHtml += `<li>${elem}</li>`
    });

    const modalHtml = `
    <section class="shots-modal">
      <div class="backdrop close-shots-modal"></div>
      <div class="modal-content">
        <span class="close-shots-modal" title="Close">
          <i class="fa-solid fa-xmark"></i>
        </span>
        <h2>${shotsContent[elemIndex].name}</h2>
        <ul>${liHtml}</ul>
        <figure class="modal-image">
            <img src="${imgSrc}" alt="modal-image">
        </figure>
      </div>
    </section>
    `;

    $('body main').append(modalHtml);

    $('.close-shots-modal').click(() => {
        $('.shots-modal').fadeOut(500, () => {
          $('.shots-modal').remove();
      });
    })
  });

  // Logic to open gallery modal
  $('.view-gallery').click(e => {
    const modalHtml = `
    <section class="gallery-modal">
      <div class="backdrop close-gallery"></div>
      <div class="gallery-modal-content">
        <figure>
            <img src="./assets/images/collage-3.jpg" alt="gallery collage">
        </figure>
      </div>
    </section>
    `;

    $('body main').append(modalHtml);

    $('.close-gallery').click(() => {
        $('.gallery-modal').fadeOut(400, () => {
          $('.gallery-modal').remove();
      });
    });
  });

  // Logic to add bg color to header on certain scroll
  if ($(window)[0].innerWidth <= 768) {
    $('header').addClass('header-bg');
  } else  {
    $(document).scroll(() => {
      if($(window).scrollTop() >= 100) {
        $('header').addClass('header-bg');
      } else {
        $('header').removeClass('header-bg');
      }
    })
  }
});

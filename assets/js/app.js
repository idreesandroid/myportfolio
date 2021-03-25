(function($) {
    $(document).ready(function() {
        //tinymce.init({ selector:'textarea',branding: false });
        var base_url = (window.location.host == 'localhost') ? 'http://localhost/makeatour' : 'https://'+window.location.host;

        /* Nadeem Scripts*/ 
        var animate_to = function(selector){
            $('html,body').animate({scrollTop:($(selector).offset().top-100)+'px'},500);
        };
        $('body').on('click','.leave_review_button',function(){
            animate_to('.leave_a_review_wrapper');
        });
        
        
        $('.easypaisa_main_buttons_wrapper .payment_icon').each(function(){
            $(this).click(function(){
                var tab = $(this).attr('data-tab');
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                $('.'+tab).siblings().hide();
                $('.invite_wrapper').slideDown('fast');
                $('.'+tab).show();
                $('.'+tab+":first").find('label').trigger('click');

            });
        });
        $("#upcoming").owlCarousel({
          nav: true,
          responsiveClass:true,
          navText: ["<img src='assets/images/right2.svg'>","<img src='assets/images/right1.svg'>"],
          responsive:{
                0:{
                    items:1,
                    nav:true
                },
                600:{
                    items:2,
                    nav:false
                },
                1000:{
                    items:3,
                    nav:true,
                    loop:false
                }
            }
        });
        $('body').on('submit','.form.submit_tour_review_form',function(){
            var submit_tour_review_form = $('.ui.form.submit_tour_review_form');
            var is_error = false;
            $('.rating_instance_wrap').each(function(){
                if(!$('input',this).is(':checked')){
                    submit_tour_review_form.find('.ui.message.error').show().html('<ul class="list"><li>Please rate on each category. </li></ul>');
                    is_error = true;
                }
            });
            if(is_error == false){
            var data = submit_tour_review_form.serialize();
            var rating1 = $('input[name=rating1]:checked').val();
            var rating2 = $('input[name=rating2]:checked').val();
            var rating3 = $('input[name=rating3]:checked').val();
            var rating4 = $('input[name=rating4]:checked').val();
            data += '&rating1='+rating1+'&rating2='+rating2+'&rating3='+rating3+'&rating4='+rating4;
            submit_tour_review_form.addClass('loading');
            var xhr = $.ajax({
                type: "POST",
                url: base_url+'/add-tour-rating',
                data: data,
                success: function(data){
                    data = JSON.parse(data);
                    submit_tour_review_form.removeClass('loading');
                    if(data.success == true){
                        //$('#loginfirst .modal-footer button').trigger('click');
                        //$('#myModal').modal();
                        alertify.success(data.msg);
                    }else{
                        alertify.error(data.msg);
                    }
                    
                },
                error: function(){
                    ajax_login_form.removeClass('loading');
                    alertify.error(data.msg);
                }
            });
            }   
            return false;
            
        });
        $('body').on('click','.apply_coupon_code_button',function(){
            var code = $('.coupon_code_text').val();

            if(code !=''){
                var form = $(this).closest('form').addClass('loading');
                $('.coupon_code_text').parent().removeClass('error');
                $.ajax({
                    url: base_url+"/ajax/apply_coupon_code",
                    method: 'POST',
                    data: {code:code},
                    success: function(data) {
                        form.removeClass('loading');
                        data = JSON.parse(data);

                        if(data.success== true){
                            alertify.success(data.message);

                            if(data.coupon_type == 'percentage'){
                                $('.apply_coupon_code_wrapper').attr('data-type',data.coupon_type);
                                $('.apply_coupon_code_wrapper').attr('data-p',data.coupon_value);
                                $('.apply_coupon_code_wrapper').attr('data-cat',data.coupon_category);
                                calculate_price();
                            }else if(data.coupon_type == 'lumpsum'){
                                $('.apply_coupon_code_wrapper').attr('data-type',data.coupon_type);
                                $('.apply_coupon_code_wrapper').attr('data-p',data.coupon_value);
                                $('.apply_coupon_code_wrapper').attr('data-cat',data.coupon_category);
                                calculate_price();
                            }
                        }else{
                            alertify.error(data.message);
                        }
                        

                    },error: function(){
                        form.removeClass('loading');
                        alertify.error('Some error occured. Please try again later.');
                    }
                });
            }else{
                $('.coupon_code_text').parent().addClass('error');
            }
        });

        $('.hvr-radial-in.regBtn, .fliper-btn').on('click', function(event) {
            event.preventDefault();             
        });

    
        $('body').on('click', '.trigger_to_login', function() {
            $('.load_login_model').trigger('click');

        });
        $(document).ready(function() {
          $(".hvr-radial-in.regBtn").on('click', function(){
                setTimeout(function() {
                  $("p.text_center .fliper-btn").click();
                }, 50);
              });
        });
        $('body').on('click', '.trigger_to_register', function() {
            $('.load_login_model').trigger('click');
            $('.fliper-btn').trigger('click');
        });
        $('body').on('change', '.payment_method_options .payment_method', function() {
            var tab = $('.payment_method_options .payment_method:checked').val();
            $('.'+tab).show().siblings().hide();

        });
        $('body').on('click', '.tours_listing_filter_wrapper .filter_item', function() {

            $(this).toggleClass('active');
            $(this).siblings().removeClass('active');
            var tab_class = $(this).attr('data-class');
            $('.'+tab_class).slideToggle('fast');
            $('.'+tab_class).siblings().slideUp('fast');

        });
        $('body').on('click', '.book_this_tours', function() {
            var t = $(this);
            var tour_id = t.attr('data-id');
            t.closest('.card').addClass('form ui loading');
            $.ajax({
                url: base_url+"/ajax/book_this_tour",
                method: 'POST',
                data: {tour_id:tour_id},
                success: function(data) {
                    t.closest('.card').removeClass('form ui loading');
                    data = JSON.parse(data);
                    if(data.is_loggedin == false){
                        $('.load_login_model').trigger('click');
                        alertify.error(data.message);
                    }

                }
            });
        });

 
    var tour_form_fields_validation = {
        full_name: {
            identifier: "name",
            rules: [
            {type: 'maxLength[25]', prompt: 'Maximum 25 digits are allowed.'},
            {type: 'empty', prompt: 'Please provide the tourist name.'}
            ]
        },
        cnic: {
            identifier: "nic",
            optional : true,
            rules: [
            {type: 'maxLength[13]', prompt: 'Maximum 13 digits are allowed.'},
            {type: 'integer', prompt: 'Please enter valid numbers.'}
            ]
        },
    };
    $('body').on('click', '.tour_add_person_button', function() {
    // add other logic here.
    var new_person = $('.hidden_person_wrapper').html();
    $('.person_main_wrapper').append(new_person);
    $('.person_main_wrapper .show_me').slideDown('fast',function(){
        $(this).removeClass('show_me');
    });
    
   
    var i = 0;
    $('.person_main_wrapper .person_wrapper').each(function(){
        var no = (i+1);
        $(this).find('.person_number').html(no);
        $(this).find('.person_pickup_location').attr('name','pickup_location_'+(no));
        $(this).find('.if_under_18').attr('name','under_18['+(no)+']');
        $(this).find('.person_pickup_location').attr('name','pickup_location['+(no)+']');
        $(this).find('.person_cnic').attr('name','cnic['+(no)+']');
        $(this).find('.person_name').attr('name','full_name['+(no)+']');

        i++;
    });
   
    var show_remove_button = ( i>1 ) ? true: false;
    $('.person_main_wrapper .person_wrapper').each(function(){
        if(show_remove_button == true) {
            $(this).find('.remove_person').show();
        }else{
            $(this).find('.remove_person').hide();
        }
        i++;
    });
});
    $('body').on('click', '.remove_person', function() {
    // add other logic here.
    $(this).closest('.person_wrapper').slideUp('fast',function(){
        $(this).remove();
        var i = 0;
        $('.person_main_wrapper .person_wrapper').each(function(){
            $(this).find('.person_number').html(i+1);
            i++;
        });
        var show_remove_button = ( i>1 ) ? true: false;
        $('.person_main_wrapper .person_wrapper').each(function(){
            if(show_remove_button == true) {
                $(this).find('.remove_person').show();
            }else{
                $(this).find('.remove_person').hide();
            }
            i++;
        });
        calculate_price();
    });
});
    $('body').on('change', '.person_pickup_locations .person_pickup_location', function() {
        calculate_price();

    });
    var get_location = function(id, elem){
        var data = $('#book_tour_form').attr('tour-data');
        var locations = JSON.parse(data);
        if(locations.locations.length>0){

            for (var i = 0; i < locations.locations.length; i++) {
                if(locations.locations[i].id == id)
                    return locations.locations[i];
            }
        }
        return false;
    };
    
    

var calculate_price = function(){
        var price = 0;
        var total = 0;
        var total_person = 0;
        $('.invoice_summary_body').html('');
        var other_city_total = 0;


        $('.person_main_wrapper .person_wrapper').each(function(){
            var elem = $(this);
            var person_name = elem.find('.person_name');
            var person_cnic = elem.find('.person_cnic');
            var if_under_18 = elem.find('.if_under_18');
            var person_pickup_location = elem.find('.person_pickup_locations .person_pickup_location:checked').val();
            var error = false;
            if(person_name.val().trim() == ''){
                error = true;
            }
            if(!if_under_18.is(':checked')){
                if(person_cnic.val().trim() == ''){
                    error = true;
                }
            }
            var location_price = 0;
            if(error == false){
                var location_obj = {};

                if(person_pickup_location !=undefined){
                    location_obj = get_location(person_pickup_location, elem);
                }
                total_person++;
                $('.invoice_summary_body_hidden .invoice_tourist span').html(total_person);
                $('.invoice_summary_body_hidden .person_name').html(person_name.val());
                var itm = $('.invoice_summary_body_hidden .person_hidden_item').clone().appendTo('.invoice_summary_body')
                .removeClass('person_hidden_item');


                if(location_obj.id != undefined){
                    var if_discount = (location_obj.discounted_amout > 0) ? location_obj.discounted_amout : location_obj.price;
                    var obj_price = if_discount >0 ? parseInt(if_discount): 0;
                    var total = parseInt(price)+obj_price;
                    itm.find('.person_location_wrapper_'+location_obj.id).siblings('.individual_total')
                    .find('span')
                    .html(total);
                    itm.find('.person_location_wrapper_'+location_obj.id).show().siblings('.person_location_wrapper').hide();
                    other_city_total = (other_city_total + obj_price);
                }else{
                    itm.find('.person_location_wrapper').hide();
                    itm.find('.person_location_wrapper').siblings('.individual_total')
                    .find('span')
                    .html(parseInt(price));
                }
                itm.show();

            }


        });
        var sub_total = (parseInt((price*total_person)+other_city_total ));
        var discounted_amout = 0;
        var if_discount_by_coupon_code = $('.apply_coupon_code_wrapper').attr('data-p');
        if(if_discount_by_coupon_code>0){
            var coupon_type = $('.apply_coupon_code_wrapper').attr('data-type');
            var coupon_cat = $('.apply_coupon_code_wrapper').attr('data-cat');
            if(coupon_type == 'percentage'){
                if(coupon_cat == 3){
                    var elem = $('.person_main_wrapper .person_wrapper:first-child');
                    var person_pickup_location = elem.find('.person_pickup_locations .person_pickup_location:checked').val();
                    var location_obj = {};

                    if(person_pickup_location !=undefined){
                        location_obj = get_location(person_pickup_location, elem);
                    }
                    if(location_obj.id !=undefined){
                        var if_discount = (location_obj.discounted_amout > 0) ? location_obj.discounted_amout : location_obj.price;
                        var obj_price = if_discount >0 ? parseInt(if_discount): 0;
                        discounted_amout = ((if_discount_by_coupon_code/100)*obj_price);
                    }
                }else{

                    discounted_amout = ((if_discount_by_coupon_code/100)*sub_total);
                }
            }else if(coupon_type == 'lumpsum'){
                discounted_amout = if_discount_by_coupon_code;

            }
        }

        var total = (parseInt((sub_total)-discounted_amout ));
        $('.invoice_summary_total span').html(total);
        $('.invoice_summary_discount span').html('-'+discounted_amout);
        $('.invoice_summary_sub_total span').html(sub_total);
    };
    $('body').on('change', '.if_under_18', function() {
        // add other logic here.
        if($(this).is(":checked")){
            var wrapper = $(this).closest('.person_wrapper');
            wrapper.find('.person_cnic').attr('disabled',true);
            wrapper.find('.person_cnic').closest('.field').removeClass('error');
        }else{
            var wrapper = $(this).closest('.person_wrapper');
            wrapper.find('.person_cnic').attr('disabled',false);
        }
        calculate_price();
    });
    $('body').on('click','.show_tour_booking_persons',function(){
        var ths = $(this);
        ths.closest('tr').next('.hide_me').slideToggle('fast');
    });
    $('body').on('submit','#book_tour_form',function(){
        /*set pointer to variable*/
        var invoice_form = $(this);

        var error = false;
        $('.person_main_wrapper .person_wrapper').each(function(){
            var elem = $(this);
            /* load objects for further use*/
            var person_name = elem.find('.person_name');
            var person_cnic = elem.find('.person_cnic');
            var if_under_18 = elem.find('.if_under_18');
            /* if name was provided */
            if(person_name.val().trim() == ''){
                person_name.val('');
                person_name.closest('.field').addClass('error');
                error = true;
            }else{
                person_name.closest('.field').removeClass('error');
            }
            /* if cnic was provided in case of adult*/
            /* if under 18 cnic field is not required anymore*/
            if(!if_under_18.is(':checked')){
                if(person_cnic.val().trim() == ''){
                    person_cnic.val('');
                    person_cnic.closest('.field').addClass('error');
                    error = true;
                }else{
                    person_cnic.closest('.field').removeClass('error');
                }
            }
        });
        if(error == false){


            var data = invoice_form.serialize();
            invoice_form.addClass('loading');
            $.ajax({
                url: base_url+"/ajax/book_this_tour",
                method: 'POST',
                data: data,
                success: function(data) {
                    invoice_form.removeClass('loading');
                    data = JSON.parse(data);
                    if(data.is_loggedin == false){
                        $('.load_login_model').trigger('click');
                        alertify.error(data.message);
                    }else if(data.is_loggedin == true){
                        alertify.success(data.message);
                        setTimeout(function(){
                            window.location = data.url;
                        },3000);
                    }

                },error: function(){
                    invoice_form.removeClass('loading');
                    alertify.error('Some error occured. Please try again later.');
                }
            });
        }
        return false;


    });
    $('body').on('click','.load_more_tours',function(){
        var t = $(this);
        var active = $('.lazy_loading_pagination li.active').next().find('a');
        var page = active.attr('data-ci-pagination-page');
        var wrap = $('.mat_tour_wraper');
        var data = $('.filter_tours_form').serialize();


        wrap.addClass('form ui loading');
        $.ajax({
            type: "POST",
            url: base_url+'/ajax_load_more_tours/'+page ,
            data: data+'&page='+page,
            success: function(data){
                wrap.removeClass('form ui loading');
                data = JSON.parse(data);
                if(data.success == true){
                    if(data.count > 0 ){
                        $('.tours_grids_listing_wrapper').append(data.html);
                        $('.lazy_loading_pagination').html(data.pagination).show();
                        if_next = $('.lazy_loading_pagination .pagination li.active').next();
                        console.log('next');
                        console.log(if_next);
                        console.log('next');
                        if(!if_next.length){
                            t.hide();
                        }
                    } else {
                        $('.tours_grids_listing_wrapper').html('<div class="alert alert-warning">No tours found under this filter.</div>');
                        $('.lazy_loading_pagination').hide();
                    }
                }
            },
            error: function(){
                wrap.removeClass('form ui loading');
            }
        });
        return false;
    });
    $('body').on('click','.lazy_loading_pagination a',function(){


        frm.addClass('loading');
        $.ajax({
            type: "POST",
            url: url ,
            data: {'_token':$('#token').val()},
            success: function(data){
                frm.removeClass('loading');
                if(data.success == true){
                    $('.tutors_listing_wrap .lazy_loading_pagination').before(data.content);

                }
            },
            error: function(){
                frm.removeClass('loading');
            }
        });
        return false;
    });
    $('body').on('keyup','.person_name',function(){
        /*remove error if was applied iously*/
        $(this).closest('.field').removeClass('error');
        /* calculate price */
        calculate_price();

    });
    $('body').on('click','.load_more_tours',function(){
        /*remove error if was applied iously*/
        $(this).closest('.field').removeClass('error');
        /* calculate price */
        calculate_price();

    });
    $('body').on('keyup','.person_cnic',function(){
        /*remove error if was applied iously*/
        $(this).closest('.field').removeClass('error');
        var val = $(this).val();
        /* calculate price */
        if(val.length == 13){
            calculate_price();
        }

    });
    $('body').on('blur','.person_cnic',function(){
        /*remove error if was applied iously*/
        $(this).closest('.field').removeClass('error');
        var val = $(this).val();
        /* calculate price */
        if(val.length == 13){
            calculate_price();
        }

    });
    /* Nadeem Scripts*/
    
    // $('.typelable').on('click', function(event) {
    // event.preventDefault();
    // $("#as_referralCode").addClass('active_now').removeClass('rc_hidden');
    // $("#selectusr").addClass('selectusr_hiden').removeClass('active_now');
    // // $("#as_referralCode").val()='';
    // var selected = $("#selectusr option[value='null']");
    // var selected = $("#selectusr option[value='tg']");
    // var selected = $("#selectusr option[value='ba']");
    // var selected = $("#selectusr option[value='to']");
    // if (selected) {
    // $("#selectusr option:selected").removeAttr("selected");
    // }
    
    // });
    // $('.typelable.sp').on('click', function(event) {
    // event.preventDefault();
    // $("#as_referralCode").addClass('rc_hidden').removeClass('active_now');
    // $("#selectusr").addClass('active_now').removeClass('selectusr_hiden');
    // var refcheck = $("#as_referralCode").val();
    // if (refcheck) {
    // $("#as_referralCode").val('');
    // }
    // });
    
    $('#faq-back-to-top').on('click', function(event) {
        $("html, body").animate({
            scrollTop: 0
        }, 2000);
    });
    //for swiping
    
    $(".slide-container").on("swiperight", function() {
        $("input:checked + .slide-container .nav_slider label.").trigger("click");
    });
    $(".slide-container").on("swipeleft", function() {
        $("input:checked + .slide-container .nav_slider label.next").trigger("click");
    });
    //for sticky menu
    
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        var top_pos = 200;
        $(".header_logo img").css({'transform' : 'translateY('+-scrollTop+'px)'});
        if (scrollTop > top_pos) {
            $(".header_logo img").css({'transform' : 'translateY(0px)'});
            $(".header_logo").addClass("sticky_logo");
            $(".main_navbar").addClass("sticky_menu");

        } else {
            $(".main_navbar").removeClass("sticky_menu");
            $(".header_logo").removeClass("sticky_logo");
        }
        var pos = $('.tour_book_now_button').position();
        if(pos !=undefined){
            if(scrollTop > pos.top+50){
                if(!$('.tour_book_now_button').hasClass('fixed_tour_buttons'))
                   $('.tour_book_now_button').addClass('fixed_tour_buttons');
            }else{
                $('.tour_book_now_button').removeClass('fixed_tour_buttons');
            }
        }
    });
    
    
    $(function(){      
       
    });
    $(".menu_item.have_child").on("click", function(event) {
        event.preventDefault();
    });
    $(".menu_item.have_child a").on("click", function(event) {
        event.preventDefault();
        $(this).next().slideToggle();
        $(this).parent().siblings().children().next().slideUp();
    });
    $(".site_navigation i").on("click", function() {
        $('.menu-wrap ').css("right", 0);
        $('.slide_overlay ').css("left", 0);
    });
    $(".nav-toggle").on("click", function(event) {
        event.preventDefault();
        $('.slide_overlay ').css("left", "-100%");
        $('.menu-wrap ').css("right", "-100%");
    });
    
    
    
    
    
    // function to set navigation settings ends here
    // Picture slider
    $('.next').on('click', function(){
       $('.slide-container').removeClass('prev');

       $(this).closest( ".slide-container" ).addClass('prev');
     });
     $('.prev').on('click', function(){
       $('.slide-container').removeClass('prev');
     var slide_no = $(this).attr( "for" ).match(/\d+/);
      $('#slide-img-'+slide_no).addClass('prev') ;  
     });

    // Picture slider ends here
    
    $('.fliper-btn').click(function() {
        $('.flip').find('.card').toggleClass('flipped');
    });
    
    
    $(document).on('submit', '#user_form', function(event) {
        event.preventDefault();
        var firstName = $('#first_name').val();
        var lastName = $('#last_name').val();
        var extension = $('#user_image').val().split('.').pop().toLowerCase();
    // console.log(extension);
    if (extension != '') {
        if (jQuery.inArray(extension, ['gif', 'png', 'jpg', 'jpeg']) == -1) {
            alert("Invalid Image File");
            $('#user_image').val('');
            return false;
        }
    }
    if (firstName != '' && lastName != '') {
        $.ajax({
            url: "<?php echo base_url(); ?>crud/user_action",
            method: 'POST',
            data: new FormData(this),
            contentType: false,
            processData: false,
            success: function(data) {
                alert(data);
                $('#user_form')[0].reset();
                $('#userModal').modal('hide');
                dataTable.ajax.reload();
            }
        });
    } else {
        alert("Bother Fields are Required");
    }
});
    
    // compied form header
    $("#sub_rooms").on('click', function() {
        var counter = parseInt($("#hidden_rooms").val());
        if (counter >= 1)
            counter--;
        $("#hidden_rooms").val(counter);
        $("#count_rooms").html(counter);
    });
    $("#add_rooms").on('click', function() {
        var counter = parseInt($("#hidden_rooms").val());
        if (counter <= 50) {
            counter++;
            $("#hidden_rooms").val(counter);
            $("#count_rooms").html(counter);
        }
    });
    
    
    $("#sub_camps").on('click', function() {
        var counter = parseInt($("#hidden_camps").val());
        if (counter >= 1)
            counter--;
        $("#hidden_camps").val(counter);
        $("#count_camps").html(counter);
    });
    $("#add_camps").on('click', function() {
        var counter = parseInt($("#hidden_camps").val());
        if (counter <= 50) {
    // console.log(counter);
    counter++;
    $("#hidden_camps").val(counter);
    $("#count_camps").html(counter);
}
});
    
    $("#sub_adults").on('click', function() {
        var counter = parseInt($("#hidden_adults").val());
        if (counter >= 1)
            counter--;
        $("#hidden_adults").val(counter);
        $("#count_adults").html(counter);
    });
    $("#add_adults").on('click', function() {
        var counter = parseInt($("#hidden_adults").val());
        if (counter <= 50) {
    // console.log(counter);
    counter++;
    $("#hidden_adults").val(counter);
    $("#count_adults").html(counter);
}
});
    
    
    $("#sub_childrens").on('click', function() {
        var counter = parseInt($("#hidden_childrens").val());
        if (counter >= 1)
            counter--;
        $("#hidden_childrens").val(counter);
        $("#count_childrens").html(counter);
    });
    $("#add_childrens").on('click', function() {
        var counter = parseInt($("#hidden_childrens").val());
        if (counter <= 50) {
    // console.log(counter);
    counter++;
    $("#hidden_childrens").val(counter);
    $("#count_childrens").html(counter);
}
});
    
    
   
   
    
    $('.ui.fluid.dropdown').dropdown();
  
 
    $('.destination_selected').on('click', function() {
        $('.hide_activity').addClass('hide_it');
        $('.hide_destination').removeClass('hide_it');
    //$('#activity_checked').val("");
});
    $('.activity_selected').on('click', function() {
        $('.hide_destination').addClass('hide_it');
        $('.hide_activity').removeClass('hide_it');
    //$('#destinationss').val("");
});
    
    $('.accommodation_selected').on('click', function() {
        $('.hide_camping').addClass('hide_it');
        $('.hide_rooms').removeClass('hide_it');
        $('#hidden_camps').val("0");
        $('.camps_ount').html("0");
    //$('#camps_selected option:selected').remove();
});
    $('.camping_selected').on('click', function() {
        $('.hide_rooms').addClass('hide_it');
        $('.hide_camping').removeClass('hide_it');
        $('#hidden_rooms').val("0");
        $('.room_count').html("0");
    //$('.rooms_selected option:seid="rooms_selected" lected').remove();
    
});
    $(".now_tour_has_bookings").on('click', function(){
        alertify.alert("This Tour Now Has Bookings","You can not update tour itinerary after you get bookings. Please contact Make A Tour to request changes. Or this tour has expired");
    });
    
    $(".transport_require").on('click', function() {
        if ($(".transport_require").hasClass("checked")) {
            $('.which_model').removeClass('hide_it');
            $('.custom_modal').removeClass('hide_it');
            $('.add_class').addClass('transport_commun');
            $('.which_transport').removeClass('hide_showing');
            $('.upchecked, .prado').prop('checked', true);
        } else {
    // console.log('inside else');
    $('.which_model').addClass('hide_it');
    $('.which_transport').addClass('hide_showing');
    $('.add_class').removeClass('transport_commun');
    $('.custom_modal').addClass('hide_it');
    $('.enter_custom_modal').addClass('hide_showing');
    //$('input[name="updown_model"]','input[name="transport_types"]').prop('checked',false);
    $('.unset_model, .unset_transport, .unset_custom_modal').prop('checked', false);
    $('#unset_custom_vehacle').val("");
}
});
    $('.which_model').on('click', function() {
        $('.which_transport').removeClass('hide_showing');
        $('.enter_custom_modal').addClass('hide_showing');
    //$('#unset_custom_vehacle').attr('required', false);
    $('#unset_custom_vehacle').val("");
});
    $('.custom_modal').on('click', function() {
        $('.which_transport').addClass('hide_showing');
        $('.enter_custom_modal').removeClass('hide_showing');
    //$('#unset_custom_vehacle').attr('required', true);
    //$('.unset_transport').prop('checked',false);
});
    
    
    $(".food_require").on('click', function() {
        if ($(".food_require").hasClass("checked")) {
            $('.which_food').removeClass('hide_it');
            $('.custom_food').removeClass('hide_it');
            $('.add_border_class').addClass('food_commun');
            $('.checkstandard, .checkfood').prop('checked', true);
            $('.which_time_food').removeClass('hide_showing');
        } else {
            $('.which_food').addClass('hide_it');
            $('.which_time_food').addClass('hide_showing');
            $('.add_border_class').removeClass('food_commun');
            $('.custom_food').addClass('hide_it');
            $('.enter_custom_food').addClass('hide_showing');
    //$('input[name="updown_model"]','input[name="transport_types"]').prop('checked',false);
    $('.unset_food_type, .unset_food_time, .unset_custom_food').prop('checked', false);
    $('#unset_custom_food').val("");
}
});
    $('.which_food').on('click', function() {
        $('.which_time_food').removeClass('hide_showing');
        $('.enter_custom_food').addClass('hide_showing');
        $('#unset_custom_food').val("");
        $('#unset_custom_food').attr('required', false);
        $('.checkfood').prop('checked', true);
    });
    $('.custom_food').on('click', function() {
        $('.which_time_food').addClass('hide_showing');
        $('.enter_custom_food').removeClass('hide_showing');
        $('.unset_food_time').prop('checked', false);
    //$('#unset_custom_food').attr('required', true);
});
    
    //load blog post on scroll
    
    
    //load blog post on scroll ends
    
    // Operator profile update
    $('body').on('click', '.edit_profile_btn', function() {
        $('.user_profile_image_field').trigger('click');
    });
    $('body').on('change', '.user_profile_image_field', function() {
        $('.edit_user_profile_image').submit();
    });
    
    // Operator profile update ends
    
    // Operator profile update validation


//load blog post on scroll
    
    
    //load blog post on scroll ends
    //Tour itinerary image update

    $('body').on('click', '.edit_itinary_btn', function() {
         $(this).closest('.find_closest_itinerary').find('.itinerary_image_field').trigger('click');
        //$('.itinerary_image_field').trigger('click');
    });
    $('body').on('change', '.itinerary_image_field', function() {
        //$('.edit_user_itinerary_image').submit();
        $(this).closest('.find_closest_itinerary').find('.edit_user_itinerary_image').submit();
    });
  
    // Itinerary image update
    
    // Operator profile update validation
    
    
    
    // Operator profile update validation ends
    
    
    $(document).on('submit', '#updateUser', function(event) {
        event.preventDefault();
        $("#updateUser").addClass('loading'); 
        $.ajax({
            url: "operators/operator_profile/update_operator_profile",
            method: 'POST',
            dataType: 'json',
            processData: false,
            contentType: false,
            data: new FormData(this),

            success: function(opeResonse) {
                if (opeResonse.sucess == 'true') {
                    $("#updateUser").removeClass('loading'); 
                    $('.operatorUpdateSucess').html('');
                    $('.operatorUpdateSucess').append(opeResonse['updateResponse']);
                    window.setTimeout(function() {
                        location.reload()
                    }, 1000);
    //$('#enter_mcq')[0].reset();
    //console.log('i am in if');
} else {
    $("#updateUser").removeClass('loading'); 
    $('.operatorUpdateError').html('');
    $('.operatorUpdateError').append(opeResonse['updateResponse']);
    //console.log('i am in tour else');
    //$('#myModal').modal('hide');
    //location.reload();
}
}
});
    });
    
    $(document).on('submit', '#operatorActivation', function(event) {
        event.preventDefault();
        $.ajax({
            url: "operators/operator_profile/operator_activation_request",
            method: 'POST',
            dataType: 'json',
            processData: false,
            contentType: false,
            data: new FormData(this),

            success: function(opeActiRes) {
                if (opeActiRes.success == 'true') {
                    $('.operatorActivicationSucess').append(opeActiRes['oprPosResponse']);

                } else {
                    $('.operatorActivicationError').append(opeActiRes['oprActiResponse']);
                }
            }
        });
    });
    
    // adding class for different brower for front-page header animation
    
    isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
    isFirefox = typeof InstallTrigger !== 'undefined';
    // Safari 3.0+
    isSafari = /constructor/i.test(window.HTMLElement) || (function(p) {
        return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || safari.pushNotification);
    // Internet Explorer 6-11
    isIE = /*@cc_on!@*/ false || !!document.documentMode;
    // Edge 20+
    isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1+
    isChrome = !!window.chrome && !!window.chrome.webstore;
    // Blink engine detection
    isBlink = (isChrome || isOpera) && !!window.CSS;
    
    if (isFirefox) {
        $(".find_everything").addClass('isFirefox');
    }
    if (isOpera) {
        $(".find_everything").addClass('isOpera');
    }
    if (isSafari) {
        $(".find_everything").addClass('isSafari');
    }
    if (isIE) {
        $(".find_everything").addClass('isIE');
    }
    if (isChrome) {
        $(".find_everything").addClass('isChrome');
    }
    if (isEdge) {
        $(".find_everything").addClass('isEdge');
    }
    
    // for the faq page
    
    var docwidth = $( document ).width();
    if(docwidth < 769){
        $(".find_trip span").css('font-family', 'High Tower Text');
        $(".cd-faq").css({'padding-top' : '50px', 'box-shadow' : 'none'});
        $(".cd-faq-categories").css({'padding-left' : 0});
        $(".cd-faq-categories li").on("click",function(event){
            event.preventDefault();
            $(".cd-faq-items").addClass("slide-in");
            $(".cd-faq-items.slide-in").find("a").on("click", function(event){
                event.preventDefault();
            });
            $(".cd-close-panel").addClass("move-left");
            var get_id = $(this).find("a").attr('href');
            $(get_id).addClass("selected").siblings().removeClass("selected");
        });
        $(".cd-close-panel").on("click",function(event){
            event.preventDefault();
            $(this).removeClass("move-left");
            $(".cd-faq-items").removeClass("slide-in");
        });

    }
    
    else {

        $(window).scroll(function (event) {


            var from_top_pos = $('.cd-faq-items');
            if (from_top_pos.length){
                var form_top_off = from_top_pos.offset().top;
            }

            var hgt = $(".cd-faq-items").height();
            var scroll_first = $(window).scrollTop();
            var top_wrapper_height = $(".top_wraper").height();
            var categories_height = $(".cd-faq-categories").height();

            var stop_before_header = form_top_off - top_wrapper_height;
            var cd_faq = $(".cd-faq").width();
            var winwidth = $(window).width();
            var leftval = (winwidth - cd_faq)/2;
            if(scroll_first < stop_before_header){
                $(".cd-faq-categories").removeClass("is-fixed");
                $(".cd-faq-categories").css({'transform' : 'translateY(0px)','left': 0});
            }

            else if(scroll_first > stop_before_header){


                $(".cd-faq-categories").addClass("is-fixed");
                $(".cd-faq-categories").css({'transform' : 'translateY(0px)',
                    'left' : leftval+"px"});
                var change_tran_val = hgt + form_top_off - top_wrapper_height - categories_height;
                if (scroll_first > change_tran_val){
                    var newscvar = (change_tran_val-scroll_first) + 'px';
                    $(".cd-faq-categories").css({'transform' : 'translateY('+newscvar+')'});

                }
            }

            var scroll = $(window).scrollTop();

            var il_tour_offset = $('#il-tour');
            if (il_tour_offset.length){
                var var_il_tour_offset = il_tour_offset.offset().top;
            }
            var il_tour = var_il_tour_offset-top_wrapper_height;

            var crea_il_tuo_tour_offset = $('#crea-il-tuo-tour');
            if (crea_il_tuo_tour_offset.length){
                var var_crea_il_tuo_tour_offset = crea_il_tuo_tour_offset.offset().top;
            }

            var crea_il_tuo_tour = var_crea_il_tuo_tour_offset-top_wrapper_height;


            var servizi_inclusi_offset = $('#servizi-inclusi');
            if (servizi_inclusi_offset.length){
                var var_servizi_inclusi_offset = servizi_inclusi_offset.offset().top;
            }

            var servizi_inclusi = var_servizi_inclusi_offset-top_wrapper_height;

            var prenotazioni_offset = $('#prenotazioni');
            if (prenotazioni_offset.length){
                var var_prenotazioni_offset = prenotazioni_offset.offset().top;
            }

            var prenotazioni = var_prenotazioni_offset-top_wrapper_height;

            var pagamenti_offset = $('#pagamenti');
            if (pagamenti_offset.length){
                var var_pagamenti_offset = pagamenti_offset.offset().top;
            }



            var pagamenti = var_pagamenti_offset-top_wrapper_height;
            if(scroll < il_tour){
                var li_tour = $(".cd-faq-categories li a[href$='#il-tour']");
                $(li_tour).addClass("selected");
                $(li_tour).parent().siblings().find("a").removeClass('selected');
            }else if(scroll < crea_il_tuo_tour){
                var vrea_li_tuo = $(".cd-faq-categories li a[href$='#crea-il-tuo-tour']");
                $(vrea_li_tuo).addClass("selected");
                $(vrea_li_tuo).parent().siblings().find("a").removeClass('selected');

            }else if(scroll < servizi_inclusi){
                var servizi_inclusi = $(".cd-faq-categories li a[href$='#servizi-inclusi']");
                $(servizi_inclusi).addClass("selected");
                $(servizi_inclusi).parent().siblings().find("a").removeClass('selected');

            }else if(scroll < prenotazioni){
                var prenotazioni = $(".cd-faq-categories li a[href$='#prenotazioni']");
                $(prenotazioni).addClass("selected");
                $(prenotazioni).parent().siblings().find("a").removeClass('selected');
            }else if(scroll < pagamenti){
                var pagamenti = $(".cd-faq-categories li a[href$='#pagamenti']");
                $(pagamenti).addClass("selected");
                $(pagamenti).parent().siblings().find("a").removeClass('selected');
            }
        });

$(".cd-faq-categories li a[href$='#il-tour']").on("click",function(event){
    event.preventDefault();
    var top_wrapper_height = $(".top_wraper").height();
    var il_tour = $("#il-tour").offset().top-top_wrapper_height;
    $("html, body").animate({ scrollTop: il_tour }, 2000);
    $(this).addClass("selected");
    $(this).parent().siblings().find("a").removeClass('selected');
    
});
$(".cd-faq-categories li a[href$='#crea-il-tuo-tour']").on("click",function(event){
    event.preventDefault();
    var top_wrapper_height = $(".top_wraper").height();
    var crea_il_tuo_tour = $("#crea-il-tuo-tour").offset().top-top_wrapper_height;
    
    $("html, body").animate({ scrollTop: crea_il_tuo_tour }, 2000);
    $(this).addClass("selected");
    $(this).parent().siblings().find("a").removeClass('selected');
    
});
$(".cd-faq-categories li a[href$='#servizi-inclusi']").on("click",function(event){
    event.preventDefault();
    var top_wrapper_height = $(".top_wraper").height();
    var servizi_inclusi = $("#servizi-inclusi").offset().top-top_wrapper_height;
    
    $("html, body").animate({ scrollTop: servizi_inclusi }, 2000);
    $(this).addClass("selected");
    $(this).parent().siblings().find("a").removeClass('selected');
    
});
$(".cd-faq-categories li a[href$='#prenotazioni']").on("click",function(event){
    event.preventDefault();
    var top_wrapper_height = $(".top_wraper").height();
    var prenotazioni = $("#prenotazioni").offset().top-top_wrapper_height;
    
    $("html, body").animate({ scrollTop: prenotazioni }, 2000);
    $(this).addClass("selected");
    $(this).parent().siblings().find("a").removeClass('selected');
    
});
$(".cd-faq-categories li a[href$='#pagamenti']").on("click",function(event){
    event.preventDefault();
    var top_wrapper_height = $(".top_wraper").height();
    var pagamenti = $("#pagamenti").offset().top-top_wrapper_height;
    $("html, body").animate({ scrollTop: pagamenti }, 2000);
    $(this).addClass("selected");
    $(this).parent().siblings().find("a").removeClass('selected');
    
});



$(".cd-faq-categories.is-fixed li").on("click",function(event){
    event.preventDefault();
    $(this).find("a").addClass('selected').parent().siblings().find("a").removeClass('selected');
    
});


$(".cd-faq-items ul li").on("click",function(event){
    event.preventDefault();
    $(this).toggleClass('content-visible');
    $(this).find("div").slideToggle();
});
}





  
    
    
    
    var controller = new ScrollMagic.Controller();
    var tube = $(".tube").outerHeight();
    var greyHgt = tube - 150;
    // create a scene
    var scene = new ScrollMagic.Scene({triggerElement: "#car", duration: greyHgt})
    .setPin("#car") // pins the element for the the scene's duration
    .addTo(controller); // assign the scene to the controller
    
    
    
    
    
    
    /*Sikandar Scripts*/
    $('select#userType').on('change', function(event) {
        event.preventDefault();
        var userType = $('#userType').val();
        if(userType==1)
        {
            $("#referralCode").removeClass('hidden');
            $("#fullname").attr("placeholder", "Full Name");
            $(".sellect_gender").removeClass('hidden');
        }else if (userType==2)
        {
            $("#referralCode").addClass('hidden');
            $("#referralCode").val("");
            $("#fullname").attr("placeholder", "Tour Operator Name");
            $(".sellect_gender").addClass('hidden');
        }else{
            $("#referralCode").addClass('hidden');
            $("#referralCode").val("");
            $("#fullname").attr("placeholder", "Full Name");
            $(".sellect_gender").removeClass('hidden');
        }
    });
    $('#forget_model')
    .modal('show');


    $('body').on('click', '.trigger_to_custom_tour_book', function() {
            $('.design_my_tour').trigger('click');

        });
    $('body').on('click', '.triger_register_today', function() {
            $('.load_login_model').trigger('click');

        }); 
    $('body').on('click', '#order_custom_tour', function() {
            $('.design_my_tour').trigger('click');

        });
    
    // $('body').on('click','.load_forget_password_overlay',function(){
    // $('#myModal').modal('hide');
    // console.log('hi there');
    // setTimeout(function(){
    // $('.forget_modal').modal('show');
    // console.log('hi alex');
    // },500);
    // return false;
    // });
    /*Sikandar Scripts ends here*/

    
    
});
})(jQuery);
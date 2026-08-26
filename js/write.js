//ফর্মে সাবমিট হ্যান্ডলার এবং Django API-তে fetch কল যুক্ত করা হয়েছে।
$(document).ready(function() {
    // AOS Initialize
    AOS.init({
        offset: 0,
        delay: 500,
        duration: 500,
    });

    // Material ScrollTop
    $('body').materialScrollTop();

    // Slick Slider
    $('.test_slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        centerMode: true,
        centerPadding: '40px',
        arrows: true,
        dots: false,
        responsive: [
            {
                breakpoint: 1399,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false
                }
            }
        ]
    });

    // Taxi Ride Booking Form Submit Event Handling
    $('#taxiBookingForm').on('submit', function(e) {
        e.preventDefault(); // পেজ রিফ্রেশ হওয়া বন্ধ করবে

        // ইনপুট থেকে ডাটা নিয়ে JSON অবজেক্ট তৈরি
        const bookingData = {
            name: $('#passenger_name').val(),
            phone: $('#phone_number').val(),
            pickup: $('#pickup_location').val(),
            dropoff: $('#dropoff_location').val()
        };

        // Django API Route
        fetch('http://127.0.0.1:8000/api/book/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('আপনার ট্যাক্সি বুকিং সফল হয়েছে! Booking ID: ' + data.booking_id);
                $('#taxiBookingForm')[0].reset(); // ফর্ম ফাঁকা করবে
            } else {
                alert('ত্রুটি: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি! নিশ্চিত করুন Django Server চালু আছে।');
        });
    });
});
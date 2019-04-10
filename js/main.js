$(document).ready(function () {
    var meetings = [
        { "organizer": "Abc", "duration": "30" },
        { "organizer": "Def", "duration": "60" },
        { "organizer": "Ghi", "duration": "120" },
        { "organizer": "Jkl", "duration": "5" },
        { "organizer": "Mno", "duration": "30" },
        { "organizer": "Pqr", "duration": "60" },
        { "organizer": "Sto", "duration": "75" },
        { "organizer": "Uvw", "duration": "90" },
        { "organizer": "Xyz", "duration": "30" },
        { "organizer": "Bcd", "duration": "45" },
        { "organizer": "Efg", "duration": "60" },
        { "organizer": "Fgh", "duration": "30" },
        { "organizer": "Swo", "duration": "150" },
        { "organizer": "Tgb", "duration": "180" },
        { "organizer": "Okm", "duration": "240" }
    ]
  
    var meetingRooms = [{ room: [], durationAvaialble: [180, 240] }, { room: [], durationAvaialble: [180, 240] }, { room: [], durationAvaialble: [180, 240] }, { room: [], durationAvaialble: [180, 240] }, { room: [], durationAvaialble: [180, 240] }, { room: [], durationAvaialble: [180, 240] }];


    let sortedMeetings = meetings.slice(0).sort((a, b) => b.duration - a.duration);


    $.each(sortedMeetings, function (index, value) {

        $.each(meetingRooms, function (index, rooms) {

            if (value.duration <= rooms.durationAvaialble[0]) {
                rooms.durationAvaialble[0] = rooms.durationAvaialble[0] - value.duration;
                value["time"] = "Morning";
                rooms.room.push(value);
                return false;
            } else if (value.duration <= rooms.durationAvaialble[1]) {
                rooms.durationAvaialble[1] = rooms.durationAvaialble[1] - value.duration;
                value["time"] = "Afternoon";
                rooms.room.push(value);
                return false;
            } else {
                console.log("you cannot book this meeting room");
            }

        })

    });

    //display Logic
    $.each(meetingRooms, function (index, value) {
        if(value.room.length != 0){
            $(".meeting").append("<h4>MEETING ROOM "+(index+1)+"</h4>")
            $.each(value.room, function (index, rooms) {
                $(".meeting").append('<div class="alert alert-primary" role="alert">Organizer : '+rooms.organizer+'<br>Duration : '+rooms.duration+'<br>Session Time : '+rooms.time+'</div>')                

            });
        }
    });

});

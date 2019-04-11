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
    ],
        meetingRooms = [],
        morningStart = 9,
        afternoonStart = 1,
        sessionDuration=[180, 240];
    
    let sortedMeetings = meetings.slice(0).sort((a, b) => b.duration - a.duration);

    $.each(sortedMeetings, function (index, value) {
        meetingRooms.push({ room: [], durationAvaialble: [180, 240] });       
        $.each(meetingRooms, function (index, rooms) {            
            if (value.duration <= rooms.durationAvaialble[0]) {
                if(rooms.durationAvaialble[0] == sessionDuration[0]){
                    value["startTime"]=convertMinutesToHHMM(morningStart*60);
                    value["endTime"]=convertMinutesToHHMM((morningStart*60)+Number(value.duration));
                }else if(rooms.durationAvaialble[0] != sessionDuration[0]){
                    var tempStartTime=(morningStart*60)+(sessionDuration[0]-rooms.durationAvaialble[0]);
                    value["startTime"]=convertMinutesToHHMM(tempStartTime);
                    value["endTime"]=convertMinutesToHHMM(tempStartTime+Number(value.duration));
                }
                rooms.durationAvaialble[0] = rooms.durationAvaialble[0] - Number(value.duration);;
                value["time"] = "Morning";
                rooms.room.push(value);
                return false;
            } else if (value.duration <= rooms.durationAvaialble[1]) {
                if(rooms.durationAvaialble[1] == sessionDuration[1]){
                    value["startTime"]=convertMinutesToHHMM(afternoonStart*60);
                    value["endTime"]=convertMinutesToHHMM((afternoonStart*60)+Number(value.duration));
                }else if(rooms.durationAvaialble[1] != sessionDuration[1]){
                    var tempStartTime=(afternoonStart*60)+(sessionDuration[1]-rooms.durationAvaialble[1]);
                    value["startTime"]=convertMinutesToHHMM(tempStartTime);
                    value["endTime"]=convertMinutesToHHMM(tempStartTime+Number(value.duration));
                }
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
        if (value.room.length != 0) {
            $(".meeting").append("<h4>MEETING ROOM " + (index + 1) + "</h4>")
            var tempMeetingRoom=value.room;
            tempMeetingRoom = tempMeetingRoom.sort(function(a, b){
                if(a.time < b.time) { return 1; }
                if(a.time > b.time) { return -1; }
                return 0;
            });
            $.each(value.room, function (index, rooms) {
                $(".meeting").append('<div class="alert alert-primary" role="alert">Organizer : '
                 + rooms.organizer + '<br>Timing : ' 
                 + rooms.startTime+" - "+rooms.endTime+'<br>Duration : '
                 + rooms.duration + '<br>Session : ' 
                 + rooms.time + '</div>');
            });
        }
    }); 

});
function convertMinutesToHHMM (minutes){
    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return h + ':' + m;
}

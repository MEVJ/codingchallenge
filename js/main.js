$(document).ready(function () {
    start();
});

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
    morningSessionDuration=180,
    afternoonSessionDuration=240,
    sessionDuration = [morningSessionDuration, afternoonSessionDuration];
let sortedMeetings = meetings.slice(0).sort((a, b) => b.duration - a.duration);

function start() {
    $.each(sortedMeetings, function (index, value) {
        meetingRooms.push({ room: [], durationAvaialble: [morningSessionDuration, afternoonSessionDuration] });
        $.each(meetingRooms, function (index, rooms) {
            if (value.duration <= rooms.durationAvaialble[0]) {
                var startEndTime = calculateTiming(rooms.durationAvaialble[0], value.duration, 0, morningStart)
                value["startTime"] = startEndTime.startTime;
                value["endTime"] = startEndTime.endTime
                value["time"] = "Morning";
                rooms.durationAvaialble[0] = rooms.durationAvaialble[0] - Number(value.duration);;             
                rooms.room.push(value);
                return false;
            } else if (value.duration <= rooms.durationAvaialble[1]) {
                var startEndTime = calculateTiming(rooms.durationAvaialble[1], value.duration, 1, afternoonStart)
                value["startTime"] = startEndTime.startTime;
                value["endTime"] = startEndTime.endTime
                value["time"] = "Afternoon";
                rooms.durationAvaialble[1] = rooms.durationAvaialble[1] - value.duration;
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
            var tempMeetingRoom = value.room;
            tempMeetingRoom = tempMeetingRoom.sort(function (a, b) {
                if (a.time < b.time) { return 1; }
                if (a.time > b.time) { return -1; }
                return 0;
            });
            $.each(value.room, function (index, rooms) {
                $(".meeting").append('<div class="alert alert-primary" role="alert">Organizer : '
                    + rooms.organizer + '<br>Timing : '
                    + rooms.startTime + " - " + rooms.endTime + '<br>Duration : '
                    + rooms.duration + '<br>Session : '
                    + rooms.time + '</div>');
            });
        }
    });
}
// calculate start and end time
function calculateTiming(durationAvailable, meetingDuration, index, session) {

    if (durationAvailable == sessionDuration[index]) {
        var startTime = convertMinutesToHHMM(session * 60);
        var endTime = convertMinutesToHHMM((session * 60) + Number(meetingDuration));
        return { "startTime": startTime, "endTime": endTime };
    } else if (durationAvailable != sessionDuration[index]) {
        var tempStartTime = (session * 60) + (sessionDuration[index] - durationAvailable);
        var startTime = convertMinutesToHHMM(tempStartTime);
        var endTime = convertMinutesToHHMM(tempStartTime + Number(meetingDuration));
        return { "startTime": startTime, "endTime": endTime };
    }

}
//convert minutes to HH:MM format
function convertMinutesToHHMM(minutes) {
    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return h + ':' + m;
}

var Application = {
    initApplication: function () {
        $(window).load('pageinit', '#page-one', function () {
            Application.initShowNationality();
        })
        $(document).on('click', '#nation-list', function () {
            var nation_id = $(this).data('nationid');
            Application.initShowTeamList(nation_id);
        })
        $(document).on('click', '#team-list', function () {
            var nation_id = $(this).data('nationid');
            var team_id = $(this).data('teamid');
            Application.initShowPositionList(nation_id, team_id);
        })
        $(document).on('click', '#player-list', function () {
            var nation_id = $(this).data('nationid');
            var team_id = $(this).data('teamid');
            var position_id = $(this).data('positionid');
            Application.initShowPlayerList(nation_id, team_id, position_id);
        })
        $(document).on('click', '#detail-player', function () {
            var player_id = $(this).data('playerid');
            Application.initShowDetailPlayer(player_id);
        })
    },
    initShowNationality: function () {
        $.ajax({
            url: 'http://masazka.com/ajax',
            type: 'get',
            beforeSend: function () {
                $.mobile.loading('show', {
                    text: 'Please wait while retrieving data...',
                    textVisible: true
                });
            },
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var appendList = '<li>' +
                        '<a href="#page-two?id=' + data[i].id + '" target="_self" id="nation-list" data-nationid="' + data[i].id + '">' +
                        '<img src="img/nationality/' + data[i].id + '.png" class="ui-li-icon">' +
                        data[i].nationality +
                        '</a></li>';
                    $('#list-nationality').append(appendList);
                }
                $('#list-nationality').listview('refresh');
            },
            complete: function () {
                $.mobile.loading('hide');
            }
        });

    },
    initShowTeamList: function (nation_id) {
        $.ajax({
            url: 'http://masazka.com/ajax/' + nation_id,
            type: 'get',
            beforeSend: function () {
                $('#list-team').empty();
                $.mobile.loading('show', {
                    text: 'Please wait while retrieving data...',
                    textVisible: true
                });
            },
            success: function (data) {
                var default_src = "'img/team/default.png'";
                for (var i = 0; i < data.length; i++) {
                    var appendList = '<li>' +
                        '<a href="#page-three?id=' + data[i].team + '" target="_self" id="team-list" data-nationid="' + data[i].nationality + '" data-teamid="' + data[i].team + '">' +
                        '<img src="img/team/' + data[i].team + '.png" class="ui-li-icon" onerror="this.src=' + default_src + '">' +
                        data[i].team_name +
                        '</a></li>';
                    $('#list-team').append(appendList);
                }
                $('#list-team').listview('refresh');
            },
            complete: function () {
                $.mobile.loading('hide');
            }
        });

    },
    initShowPositionList: function (nation_id, team_id) {
        $.ajax({
            url: 'http://masazka.com/ajax/' + nation_id + '/' + team_id,
            type: 'get',
            beforeSend: function () {
                $('#list-position').empty();
                $.mobile.loading('show', {
                    text: 'Please wait while retrieving data...',
                    textVisible: true
                });
            },
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var appendList = '<li>' +
                        '<a href="#page-four?id=' + data[i].position + '" target="_self" id="player-list" data-nationid="' + data[i].nationality + '" data-teamid="' + data[i].team + '" data-positionid="' + data[i].position + '">' +
                        '<h2>' + data[i].pos + '</h2>' +
                        '</a></li>';
                    $('#list-position').append(appendList);
                }
                $('#list-position').listview('refresh');
            },
            complete: function () {
                $.mobile.loading('hide');
            }
        });

    },
    initShowPlayerList: function (nation_id, team_id, position_id) {
        $.ajax({
            url: 'http://masazka.com/ajax/' + nation_id + '/' + team_id + '/' + position_id,
            type: 'get',
            beforeSend: function () {
                $('#list-player').empty();
                $.mobile.loading('show', {
                    text: 'Please wait while retrieving data...',
                    textVisible: true
                });
            },
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var appendList = '<li>' +
                        '<a href="#page-five?id=' + data[i].id + '" target="_self" id="detail-player" data-playerid="' + data[i].id + '">' +
                        '<h2>' + data[i].name + '</h2>' +
                        '</a></li>';
                    $('#list-player').append(appendList);
                }
                $('#list-player').listview('refresh');
            },
            complete: function () {
                $.mobile.loading('hide');
            }
        });

    },
    initShowDetailPlayer: function (player_id) {
        $.ajax({
            url: 'http://masazka.com/ajax/detail/' + player_id,
            type: 'get',
            beforeSend: function () {
                $.mobile.loading('show', {
                    text: 'Please wait while retrieving data...',
                    textVisible: true
                });
            },
            success: function (data) {
                $('#table-player tbody').empty();
                var appendDetail = '<tr>' +
                    '<td><b class="ui-table-cell-label">Name</b>' + data[0].name + '</t>' +
                    '<td><b class="ui-table-cell-label">Birthday</b>' + data[0].birthday + '</td>' +
                    '<td><b class="ui-table-cell-label">Nationality</b>' + data[0].nationality + '</td>' +
                    '<td><b class="ui-table-cell-label">Team</b>' + data[0].team + '</td>' +
                    '<td><b class="ui-table-cell-label">Position</b>' + data[0].position + '</td>' +
                    '<td><b class="ui-table-cell-label">Height</b>' + data[0].height + ' cm </td>' +
                    '<td><b class="ui-table-cell-label">Weight</b>' + data[0].weight + ' kg</td></tr>';
                $('#table-player').append(appendDetail);
            },
            complete: function () {
                $.mobile.loading('hide');
            }
        });
    }
}
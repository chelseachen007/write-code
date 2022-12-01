function Player(name, teamColor) {
	this.name = name; // 角色名字
	this.teamColor = teamColor; // 队伍颜色
	this.state = "alive"; // 玩家生存状态
}
Player.prototype.win = function () {
	console.log(this.name + " won ");
};
Player.prototype.lose = function () {
	console.log(this.name + " lost");
};
/*******************玩家死亡*****************/
Player.prototype.die = function () {
	this.state = "dead";
	playerDirector.reciveMessage("playerDead", this); // 给中介者发送消息，玩家死亡
};
/*******************移除玩家*****************/
Player.prototype.remove = function () {
	playerDirector.reciveMessage("removePlayer", this); // 给中介者发送消息，移除一个玩家
};
/*******************玩家换队*****************/
Player.prototype.changeTeam = function (color) {
	playerDirector.reciveMessage("changeTeam", this, color); // 给中介者发送消息，玩家换队
};
// 再继续改写之前创建玩家对象的工厂函数，可以看到，因为工厂函数里不再需要给创建的玩
// 家对象设置队友和敌人，这个工厂函数几乎失去了工厂的意义：
var playerFactory = function (name, teamColor) {
	var newPlayer = new Player(name, teamColor); // 创造一个新的玩家对象
	playerDirector.reciveMessage("addPlayer", newPlayer); // 给中介者发送消息，新增玩家
	return newPlayer;
};

var playerDirector = (function () {
	var players = {}, // 保存所有玩家
		operations = {}; // 中介者可以执行的操作
	/****************新增一个玩家***************************/
	operations.addPlayer = function (player) {
		var teamColor = player.teamColor; // 玩家的队伍颜色
		players[teamColor] = players[teamColor] || []; // 如果该颜色的玩家还没有成立队伍，则
		新成立一个队伍;
		players[teamColor].push(player); // 添加玩家进队伍
	};
	/****************移除一个玩家***************************/
	operations.removePlayer = function (player) {
		var teamColor = player.teamColor, // 玩家的队伍颜色
			teamPlayers = players[teamColor] || []; // 该队伍所有成员
		for (var i = teamPlayers.length - 1; i >= 0; i--) {
			// 遍历删除

			if (teamPlayers[i] === player) {
				teamPlayers.splice(i, 1);
			}
		}
	};
	/****************玩家换队***************************/
	operations.changeTeam = function (player, newTeamColor) {
		// 玩家换队
		operations.removePlayer(player); // 从原队伍中删除
		player.teamColor = newTeamColor; // 改变队伍颜色
		operations.addPlayer(player); // 增加到新队伍中
	};
	operations.playerDead = function (player) {
		// 玩家死亡
		var teamColor = player.teamColor,
			teamPlayers = players[teamColor]; // 玩家所在队伍
		var all_dead = true;
		for (var i = 0, player; (player = teamPlayers[i++]); ) {
			if (player.state !== "dead") {
				all_dead = false;
				break;
			}
		}
		if (all_dead === true) {
			// 全部死亡
			for (var i = 0, player; (player = teamPlayers[i++]); ) {
				player.lose(); // 本队所有玩家 lose
			}
			for (var color in players) {
				if (color !== teamColor) {
					var teamPlayers = players[color]; // 其他队伍的玩家
					for (var i = 0, player; (player = teamPlayers[i++]); ) {
						player.win(); // 其他队伍所有玩家 win
					}
				}
			}
		}
	};
	var reciveMessage = function () {
		var message = Array.prototype.shift.call(arguments); // arguments 的第一个参数为消息名称
		operations[message].apply(this, arguments);
	};
	return {
		reciveMessage: reciveMessage,
	};
})();

// 红队：
var player1 = playerFactory("皮蛋", "red"),
	player2 = playerFactory("小乖", "red"),
	player3 = playerFactory("宝宝", "red"),
	player4 = playerFactory("小强", "red");
// 蓝队：
var player5 = playerFactory("黑妞", "blue"),
	player6 = playerFactory("葱头", "blue"),
	player7 = playerFactory("胖墩", "blue"),
	player8 = playerFactory("海盗", "blue");
player1.die();
player2.die();
player3.die();
player4.die();
